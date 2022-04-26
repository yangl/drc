package com.ctrip.framework.drc.core.server.common.filter.row;

import com.ctrip.framework.drc.core.driver.binlog.impl.TableMapLogEvent;
import com.ctrip.framework.drc.core.driver.binlog.impl.WriteRowsEvent;
import com.ctrip.framework.drc.core.driver.schema.data.Columns;
import com.ctrip.framework.drc.core.server.common.enums.RowFilterType;
import com.google.common.collect.Lists;
import io.netty.buffer.ByteBuf;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static com.ctrip.framework.drc.core.server.utils.RowsEventUtils.transformMetaAndType;

/**
 * @Author limingdong
 * @create 2022/4/26
 */
public class AbstractRowsFilterRuleTest extends AbstractEventTest {

    private AbstractRowsFilterRule rowsFilterRule = new TestRowsFilterRule(RowsFilterContext.from("registryKey",RowFilterType.Custom, "{\"drc1.insert1\":[\"id\", \"one\"]}"));

    private TableMapLogEvent tableMapLogEvent;

    private TableMapLogEvent drcTableMapLogEvent;

    private WriteRowsEvent writeRowsEvent;

    private List<List<Object>> result = Lists.newArrayList();


    @Before
    public void setUp() throws IOException {
        result.add(Lists.newArrayList("1", "2"));
        ByteBuf tByteBuf = tableMapEvent();
        tableMapLogEvent = new TableMapLogEvent().read(tByteBuf);
        ByteBuf wByteBuf = writeRowsEvent();
        writeRowsEvent = new WriteRowsEvent().read(wByteBuf);
        drcTableMapLogEvent = drcTableMapEvent();

        Columns originColumns = Columns.from(tableMapLogEvent.getColumns());
        Columns columns = Columns.from(drcTableMapLogEvent.getColumns());
        transformMetaAndType(originColumns, columns);
        writeRowsEvent.load(columns);
    }

    @Test
    public void filterRow() throws Exception {
        RowsFilterResult<List<List<Object>>> res = rowsFilterRule.filterRows(writeRowsEvent, drcTableMapLogEvent);
        Assert.assertFalse(res.isNoRowFiltered());
        Assert.assertEquals(res.getRes(), result);
    }

    class TestRowsFilterRule extends AbstractRowsFilterRule {

        public TestRowsFilterRule(RowsFilterContext rowsFilterContext) {
            super(rowsFilterContext);
        }

        @Override
        protected List<List<Object>> doFilterRows(List<List<Object>> values, Map<String, Integer> indices) {
            Assert.assertEquals(3, values.size());
            Assert.assertEquals(2, indices.size());  // id、one
            Assert.assertEquals(0, indices.get("id").intValue());  // id in index 0
            Assert.assertEquals(1, indices.get("one").intValue());  // one in index 1
            return result;
        }
    }
}