package com.ctrip.framework.drc.replicator.impl.oubound.filter;

import com.ctrip.framework.drc.core.driver.binlog.constant.LogEventType;
import com.ctrip.framework.drc.core.driver.binlog.impl.TableMapLogEvent;
import com.ctrip.framework.drc.core.driver.util.LogEventUtils;
import com.ctrip.framework.drc.core.monitor.entity.TrafficStatisticKey;
import com.ctrip.framework.drc.core.monitor.kpi.OutboundMonitorReport;
import com.ctrip.framework.drc.core.server.common.filter.AbstractLogEventFilter;

import static com.ctrip.framework.drc.core.driver.binlog.constant.LogEventType.*;

/**
 * Created by jixinwang on 2023/10/25
 */
public class MonitorFilter extends AbstractLogEventFilter<OutboundLogEventContext> {

    private OutboundMonitorReport outboundMonitorReport;

    private String registerKey;

    private String consumeType;

    private String srcRegion;

    private String dstRegion;

    private long transactionSize;

    private long tableMapSize;

    private String tableName;

    public MonitorFilter(OutboundFilterChainContext context) {
        this.outboundMonitorReport = context.getOutboundMonitorReport();
        this.registerKey = context.getRegisterKey();
        this.consumeType = context.getConsumeType().name();
        this.srcRegion = context.getSrcRegion();
        this.dstRegion = context.getDstRegion();
    }

    @Override
    public boolean doFilter(OutboundLogEventContext value) {
        doNext(value, value.isSkipEvent());

        if (value.isSkipEvent() || value.isInExcludeGroup()) {
            return false;
        }

        LogEventType eventType = value.getEventType();

        if (gtid_log_event == eventType) {
            transactionSize = value.getEventSize();
            outboundMonitorReport.addOutboundGtid(registerKey, value.getGtid());
            outboundMonitorReport.addOneCount();
        } else if (table_map_log_event == eventType) {
            tableMapSize = value.getFilteredSize();
            tableName = ((TableMapLogEvent) value.getLogEvent()).getSchemaNameDotTableName();
        } else if (LogEventUtils.isRowsEvent(eventType)) {
            transactionSize += value.getFilteredSize() + tableMapSize;
            tableMapSize = 0;
        } else if (xid_log_event == eventType) {
            transactionSize += value.getEventSize();
            tableMapSize = 0;
            outboundMonitorReport.updateTrafficStatistic(new TrafficStatisticKey(tableName, srcRegion, dstRegion, consumeType), transactionSize);
        }

        return false;
    }
}
