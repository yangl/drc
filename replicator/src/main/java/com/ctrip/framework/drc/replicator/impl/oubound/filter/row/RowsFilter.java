package com.ctrip.framework.drc.replicator.impl.oubound.filter.row;

import com.ctrip.framework.drc.core.driver.binlog.impl.*;
import com.ctrip.framework.drc.core.driver.schema.data.Columns;
import com.ctrip.framework.drc.core.driver.util.LogEventUtils;
import com.ctrip.framework.drc.core.monitor.reporter.DefaultEventMonitorHolder;
import com.ctrip.framework.drc.core.server.common.EventReader;
import com.ctrip.framework.drc.core.server.common.filter.AbstractLogEventFilter;
import com.ctrip.framework.drc.core.server.common.filter.row.RowsFilterContext;
import com.ctrip.framework.drc.core.server.common.filter.row.RowsFilterResult;
import com.ctrip.framework.drc.core.server.common.filter.row.RowsFilterRule;
import com.ctrip.framework.drc.core.server.common.filter.row.RuleFactory;
import com.ctrip.framework.drc.replicator.impl.oubound.filter.OutboundLogEventContext;

import java.nio.channels.FileChannel;
import java.util.List;

import static com.ctrip.framework.drc.core.server.utils.RowsEventUtils.transformMetaAndType;

/**
 * @Author limingdong
 * @create 2022/4/22
 */
public class RowsFilter extends AbstractLogEventFilter<OutboundLogEventContext> {

    private RuleFactory ruleFactory = new DefaultRuleFactory();

    private String registryKey;

    private RowsFilterRule<List<List<Object>>> rowsFilterRule;

    public RowsFilter(RowsFilterContext filterContext) throws Exception {
        this.registryKey = filterContext.getRegistryKey();
        rowsFilterRule = ruleFactory.createRowsFilterRule(filterContext);
    }

    @Override
    public boolean doFilter(OutboundLogEventContext value) {
        boolean noRowFiltered = true;
        if (LogEventUtils.isRowsEvent(value.getEventType())) {
            switch (value.getEventType()) {
                case write_rows_event_v2:
                    noRowFiltered = handRowsEvent(value.getFileChannel(), new WriteRowsEvent(), value);
                    break;
                case update_rows_event_v2:
                    noRowFiltered = handRowsEvent(value.getFileChannel(), new UpdateRowsEvent(), value);
                    break;
                case delete_rows_event_v2:
                    noRowFiltered = handRowsEvent(value.getFileChannel(), new DeleteRowsEvent(), value);
                    break;
            }
        }
        value.setNoRowFiltered(noRowFiltered);
        return doNext(value, value.isNoRowFiltered());
    }

    private boolean handRowsEvent(FileChannel fileChannel, AbstractRowsEvent rowsEvent, OutboundLogEventContext value) {
        TableMapLogEvent drcTableMap = loadEvent(fileChannel, rowsEvent, value);
        int beforeSize = rowsEvent.getRows().size();
        RowsFilterResult<List<List<Object>>> rowsFilterResult = rowsFilterRule.filterRows(rowsEvent, drcTableMap);
        boolean noRowFiltered = rowsFilterResult.isNoRowFiltered();

        if (!noRowFiltered) {
            int afterSize;
            List<List<Object>> rows = rowsFilterResult.getRes();
            if (rows != null) {
                afterSize = rows.size();
                int filterNum = beforeSize - afterSize;
                DefaultEventMonitorHolder.getInstance().logEvent("DRC.replicator.rows.filter.event", registryKey);
                DefaultEventMonitorHolder.getInstance().logEvent("DRC.replicator.rows.filter.row", registryKey, filterNum);
                logger.info("[Filter] {} rows within {} for {}", filterNum, value.getGtid(), registryKey);
            }
            // TODO build event with rows
            value.setRowsEvent(rowsEvent);
        }

        return noRowFiltered;
    }

    private TableMapLogEvent loadEvent(FileChannel fileChannel, AbstractRowsEvent rowsEvent, OutboundLogEventContext value) {
        // load header
        value.backToHeader();
        EventReader.readEvent(fileChannel, rowsEvent);
        value.restorePosition();
        rowsEvent.loadPostHeader();

        long tableId = rowsEvent.getRowsEventPostHeader().getTableId();
        TableMapLogEvent tableMapLogEvent = value.getTableMapWithinTransaction(tableId);
        String tableName = tableMapLogEvent.getSchemaNameDotTableName();
        TableMapLogEvent drcTableMap = value.getDrcTableMap(tableName);

        // load payload
        Columns originColumns = Columns.from(tableMapLogEvent.getColumns());
        Columns columns = Columns.from(drcTableMap.getColumns());
        transformMetaAndType(originColumns, columns);
        rowsEvent.load(columns);

        return drcTableMap;
    }
}
