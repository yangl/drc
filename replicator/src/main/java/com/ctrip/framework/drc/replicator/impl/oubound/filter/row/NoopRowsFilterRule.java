package com.ctrip.framework.drc.replicator.impl.oubound.filter.row;

import com.ctrip.framework.drc.core.driver.binlog.impl.AbstractRowsEvent;
import com.ctrip.framework.drc.core.driver.binlog.impl.TableMapLogEvent;
import com.ctrip.framework.drc.core.server.common.filter.row.RowsFilterResult;
import com.ctrip.framework.drc.core.server.common.filter.row.RowsFilterRule;

/**
 * @Author limingdong
 * @create 2022/4/22
 */
public class NoopRowsFilterRule implements RowsFilterRule<Void> {

    public NoopRowsFilterRule(String context) {
    }

    @Override
    public RowsFilterResult<Void> filterRow(AbstractRowsEvent rowsEvent, TableMapLogEvent drcTableMapLogEvent) {
        return new RowsFilterResult(false);
    }
}
