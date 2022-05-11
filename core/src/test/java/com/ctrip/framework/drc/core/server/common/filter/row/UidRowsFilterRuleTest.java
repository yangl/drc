package com.ctrip.framework.drc.core.server.common.filter.row;

import com.ctrip.framework.drc.core.meta.RowsFilterConfig;
import com.ctrip.framework.drc.core.server.common.enums.RowsFilterType;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

/**
 * @Author limingdong
 * @create 2022/5/10
 */
public class UidRowsFilterRuleTest extends AbstractEventTest {

    private UidRowsFilterRule uidRowsFilterRule;

    @Before
    public void setUp() throws Exception {
        super.setUp();
        List<RowsFilterConfig> rowsFilterConfigList = dataMediaConfig.getRowsFilters();
        RowsFilterConfig rowsFilterConfig = rowsFilterConfigList.get(0);
        uidRowsFilterRule = new UidRowsFilterRule(rowsFilterConfig);
    }

    @Override
    protected RowsFilterType getRowsFilterType() {
        return RowsFilterType.TripUid;
    }

    @Test
    public void filterRows() throws Exception {
        // LocalUidService
        RowsFilterResult<List<List<Object>>> res = uidRowsFilterRule.filterRows(writeRowsEvent, drcTableMapLogEvent);
        Assert.assertTrue(res.isNoRowFiltered());
    }

}