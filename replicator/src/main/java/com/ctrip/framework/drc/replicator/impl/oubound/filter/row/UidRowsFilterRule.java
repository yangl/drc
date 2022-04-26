package com.ctrip.framework.drc.replicator.impl.oubound.filter.row;

import com.ctrip.framework.drc.core.server.common.filter.row.AbstractRowsFilterRule;
import com.ctrip.framework.drc.core.server.common.filter.row.RowsFilterRule;

import java.util.List;
import java.util.Map;

/**
 * @Author limingdong
 * @create 2022/4/22
 */
public class UidRowsFilterRule extends AbstractRowsFilterRule implements RowsFilterRule<List<List<Object>>> {

    public UidRowsFilterRule(String registryKey, String context) {
        super(registryKey, context);
    }

    @Override
    protected List<List<Object>> doFilterRows(List<List<Object>> values, Map<String, Integer> indices) {
        // TODO
        return null;
    }
}
