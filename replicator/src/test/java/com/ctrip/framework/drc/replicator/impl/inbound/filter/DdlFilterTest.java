package com.ctrip.framework.drc.replicator.impl.inbound.filter;

import com.ctrip.framework.drc.core.driver.binlog.constant.QueryType;
import com.ctrip.framework.drc.core.driver.binlog.header.LogEventHeader;
import com.ctrip.framework.drc.core.driver.binlog.impl.DrcDdlLogEvent;
import com.ctrip.framework.drc.core.driver.binlog.impl.DrcSchemaSnapshotLogEvent;
import com.ctrip.framework.drc.core.driver.binlog.impl.QueryLogEvent;
import com.ctrip.framework.drc.core.driver.binlog.manager.ApplyResult;
import com.ctrip.framework.drc.core.driver.binlog.manager.SchemaManager;
import com.ctrip.framework.drc.core.driver.binlog.manager.TableInfo;
import com.ctrip.framework.drc.replicator.MockTest;
import com.ctrip.framework.drc.replicator.impl.monitor.MonitorManager;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import static com.ctrip.framework.drc.core.driver.binlog.constant.LogEventType.*;
import static com.ctrip.framework.drc.replicator.impl.inbound.filter.DdlFilter.DROP_TABLE;

/**
 * @Author limingdong
 * @create 2020/2/24
 */
public class DdlFilterTest extends MockTest {

    private DdlFilter ddlFilter;

    private InboundLogEventContext value;

    private static final String gtid = "xxxx:1";

    @Mock
    private QueryLogEvent queryLogEvent;

    @Mock
    private DrcSchemaSnapshotLogEvent schemaSnapshotLogEvent;

    @Mock
    private DrcDdlLogEvent drcDdlLogEvent;

    @Mock
    private SchemaManager schemaManager;

    @Mock
    private MonitorManager monitorManager;

    @Mock
    private QueryLogEvent.QueryStatus queryStatus;

    private LogEventHeader logEventHeader;

    private TableInfo tableInfo = new TableInfo();

    @Before
    public void setUp() {
        super.initMocks();
        when(schemaManager.apply(anyString(), anyString(), anyString(), any(QueryType.class), anyString())).thenReturn(ApplyResult.from(ApplyResult.Status.SUCCESS, ""));
        when(schemaManager.find(anyObject(), anyObject())).thenReturn(tableInfo);
        doNothing().when(schemaManager).persistColumnInfo(any(TableInfo.class), any(Boolean.class));
        doNothing().when(schemaManager).persistDdl(anyString(), anyString(), anyString());
        doNothing().when(monitorManager).onDdlEvent(anyString(), anyString(), anyString(), any(QueryType.class));

        ddlFilter = new DdlFilter(schemaManager, monitorManager, "registryKey");
        value = new InboundLogEventContext(queryLogEvent, null, new TransactionFlags(), gtid);

        logEventHeader = new LogEventHeader(query_log_event.getType(), 1L, 64, 12246);
    }

    @Test
    public void doFilter() {
        when(queryLogEvent.getLogEventHeader()).thenReturn(logEventHeader);
        Assert.assertFalse(ddlFilter.doFilter(value));
    }

    @Test
    public void doFilterFalse() {
        when(queryLogEvent.getQuery()).thenReturn(DdlFilter.BEGIN);
        Assert.assertFalse(ddlFilter.parseQueryEvent(queryLogEvent, gtid));

        when(queryLogEvent.getQuery()).thenReturn(DdlFilter.COMMIT);
        Assert.assertFalse(ddlFilter.parseQueryEvent(queryLogEvent, gtid));

        when(queryLogEvent.getQuery()).thenReturn(DdlFilter.XA_COMMIT);
        Assert.assertFalse(ddlFilter.parseQueryEvent(queryLogEvent, gtid));

        when(queryLogEvent.getQuery()).thenReturn(DdlFilter.XA_ROLLBACK);
        Assert.assertFalse(ddlFilter.parseQueryEvent(queryLogEvent, gtid));

        when(queryLogEvent.getQuery()).thenReturn(DdlFilter.XA_START);
        Assert.assertFalse(ddlFilter.parseQueryEvent(queryLogEvent, gtid));

        when(queryLogEvent.getQuery()).thenReturn(DdlFilter.XA_END);
        Assert.assertFalse(ddlFilter.parseQueryEvent(queryLogEvent, gtid));
    }

    @Test
    public void doFilterTrue() {

        String DROP_TABLE = "DROP TABLE IF EXISTS `ghostdb`.`_test1g_del` /* generated by server */";
        when(queryLogEvent.getQuery()).thenReturn(DROP_TABLE);
        Assert.assertFalse(ddlFilter.parseQueryEvent(queryLogEvent, gtid));

        String CREATE_TABLE = "create /* gh-ost */ table `ghostdb`.`_test1g_gho` like `ghostdb`.`test1g`";
        when(queryLogEvent.getQuery()).thenReturn(CREATE_TABLE);
        Assert.assertFalse(ddlFilter.parseQueryEvent(queryLogEvent, gtid));

        String ALTER_TABLE = "alter /* gh-ost */ table `ghostdb`.`_test1g_gho` ADD COLUMN addcol119 VARCHAR(255) DEFAULT NULL COMMENT '添加普通列测试'";
        when(queryLogEvent.getQuery()).thenReturn(ALTER_TABLE);
        Assert.assertFalse(ddlFilter.parseQueryEvent(queryLogEvent, gtid));

        String RENAME_TABLE = "rename /* gh-ost */ table `ghostdb`.`test1g` to `ghostdb`.`_test1g_del`, `ghostdb`.`_test1g_gho` to `ghostdb`.`test1g`";
        when(queryLogEvent.getQuery()).thenReturn(RENAME_TABLE);
        Assert.assertTrue(ddlFilter.parseQueryEvent(queryLogEvent, gtid));
    }

    @Test
    public void testCreateCharset() {
        String CREATE_TABLE = "create /* gh-ost */ table `ghostdb`.`_test1g_gho` like `ghostdb`.`test1g`";
        when(queryLogEvent.getQuery()).thenReturn(CREATE_TABLE);
        when(queryLogEvent.getQueryStatus()).thenReturn(queryStatus);
        when(queryStatus.getServerCollation()).thenReturn(33);  //utf8
        Assert.assertFalse(ddlFilter.parseQueryEvent(queryLogEvent, gtid));
        verify(schemaManager, times(1)).apply("ghostdb", "_test1g_gho", CREATE_TABLE, QueryType.CREATE, gtid);

        CREATE_TABLE = "CREATE TABLE `test1`.`insert7` (`id` int(11) NOT NULL AUTO_INCREMENT,`one` varchar(30) DEFAULT 'one',`two` varchar(1000) DEFAULT 'two',`three` char(30) DEFAULT NULL,`four` char(255) DEFAULT NULL,`datachange_lasttime` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',PRIMARY KEY (`id`)) ENGINE=InnoDB CHARSET=utf8";
        when(queryLogEvent.getQuery()).thenReturn(CREATE_TABLE);
        when(queryLogEvent.getSchemaName()).thenReturn("test1");
        when(queryStatus.getServerCollation()).thenReturn(45);  //utf8mb4
        Assert.assertTrue(ddlFilter.parseQueryEvent(queryLogEvent, gtid));
        verify(schemaManager, times(1)).apply("test1", "insert7", CREATE_TABLE, QueryType.CREATE, gtid);


        CREATE_TABLE = "CREATE TABLE `test1`.`insert7` (`id` int(11) NOT NULL AUTO_INCREMENT,`one` varchar(30) DEFAULT 'one',`two` varchar(1000) DEFAULT 'two',`three` char(30) DEFAULT NULL,`four` char(255) DEFAULT NULL,`datachange_lasttime` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',PRIMARY KEY (`id`)) ENGINE=InnoDB";
        String MODIFIED_CREATE_TABLE = "CREATE TABLE `test1`.`insert7` (`id` int(11) NOT NULL AUTO_INCREMENT,`one` varchar(30) DEFAULT 'one',`two` varchar(1000) DEFAULT 'two',`three` char(30) DEFAULT NULL,`four` char(255) DEFAULT NULL,`datachange_lasttime` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',PRIMARY KEY (`id`)) ENGINE=InnoDB CHARSET=utf8";
        when(queryLogEvent.getQuery()).thenReturn(CREATE_TABLE);
        when(queryLogEvent.getSchemaName()).thenReturn("test1");
        when(queryStatus.getServerCollation()).thenReturn(33);  //utf8
        Assert.assertTrue(ddlFilter.parseQueryEvent(queryLogEvent, gtid));
        verify(schemaManager, times(1)).apply("test1", "insert7", MODIFIED_CREATE_TABLE, QueryType.CREATE, gtid);

        CREATE_TABLE = "CREATE TABLE `test1`.`insert7` (`id` int(11) NOT NULL AUTO_INCREMENT,`one` varchar(30) DEFAULT 'one',`two` varchar(1000) DEFAULT 'two',`three` char(30) DEFAULT NULL,`four` char(255) DEFAULT NULL,`datachange_lasttime` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',PRIMARY KEY (`id`)) ENGINE=InnoDB";
        when(queryLogEvent.getQuery()).thenReturn(CREATE_TABLE);
        when(queryLogEvent.getSchemaName()).thenReturn("test1");
        when(queryStatus.getServerCollation()).thenReturn(45);  //utf8
        Assert.assertTrue(ddlFilter.parseQueryEvent(queryLogEvent, gtid));
        verify(schemaManager, times(1)).apply("test1", "insert7", CREATE_TABLE, QueryType.CREATE, gtid);

    }

    @Test
    public void testDrcSchemaSnapshotLogEvent() {
        LogEventHeader logEventHeader = new LogEventHeader(drc_schema_snapshot_log_event.getType(), 1L, 64, 12246);
        when(schemaSnapshotLogEvent.getLogEventHeader()).thenReturn(logEventHeader);
        when(schemaSnapshotLogEvent.getLogEventType()).thenReturn(drc_schema_snapshot_log_event);
        when(schemaManager.recovery(schemaSnapshotLogEvent, false)).thenReturn(true);
        InboundLogEventContext logEventWithGroupFlag = new InboundLogEventContext(schemaSnapshotLogEvent, null,  new TransactionFlags(), "");
        Assert.assertTrue(ddlFilter.doFilter(logEventWithGroupFlag));
    }

    @Test
    public void testDrcDdlLogEvent() {
        String ALTER_TABLE = "alter /* gh-ost */ table `ghostdb`.`_test1g_gho` ADD COLUMN addcol119 VARCHAR(255) DEFAULT NULL COMMENT '添加普通列测试'";
        LogEventHeader logEventHeader = new LogEventHeader(drc_ddl_log_event.getType(), 1L, 64, 12246);
        when(drcDdlLogEvent.getLogEventHeader()).thenReturn(logEventHeader);
        when(drcDdlLogEvent.getLogEventType()).thenReturn(drc_ddl_log_event);

        when(drcDdlLogEvent.getDdl()).thenReturn(ALTER_TABLE);
        when(drcDdlLogEvent.getSchema()).thenReturn("ghostdb");

        InboundLogEventContext logEventWithGroupFlag = new InboundLogEventContext(drcDdlLogEvent, null, new TransactionFlags(), gtid);
        Assert.assertFalse(ddlFilter.doFilter(logEventWithGroupFlag));
    }

    /**
     *  use drc4;
     *  CREATE TABLE drc1.test_identity (
     * `id` int(11) NOT NULL AUTO_INCREMENT,
     * `one` varchar(30) DEFAULT 'one',
     * `two` varchar(1000) DEFAULT 'two',
     * `three` char(30) DEFAULT NULL,
     * `four` char(255) DEFAULT NULL,
     * `datachange_lasttime` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT 'time',
     * PRIMARY KEY (`id`)
     * );
     */
    @Test
    public void testWrongNameLogEvent() {
        String wrongDbName = "drc4";
        String CREATE_TABLE = "CREATE TABLE drc1.test_identity (" +
                "`id` int(11) NOT NULL AUTO_INCREMENT," +
                "`one` varchar(30) DEFAULT 'one'," +
                "`two` varchar(1000) DEFAULT 'two'," +
                "`three` char(30) DEFAULT NULL," +
                "`four` char(255) DEFAULT NULL," +
                "`datachange_lasttime` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT 'time'," +
                "PRIMARY KEY (`id`)" +
                ");";

        String dbName = "drc1";
        String tableName = "test_identity";
        TableInfo tableInfo = new TableInfo();
        tableInfo.setDbName(dbName);
        tableInfo.setTableName(tableName);
        when(queryLogEvent.getQuery()).thenReturn(CREATE_TABLE);
        when(queryLogEvent.getSchemaName()).thenReturn(wrongDbName);
        when(schemaManager.find(dbName, tableName)).thenReturn(tableInfo);
        Assert.assertTrue(ddlFilter.parseQueryEvent(queryLogEvent, gtid));
        verify(schemaManager, times(1)).apply(dbName, tableName, CREATE_TABLE, QueryType.CREATE, gtid);
        verify(schemaManager, times(1)).persistColumnInfo(tableInfo, false);
    }

    @Test
    public void testConfigDb() {
        String ALTER_TABLE = "alter table `configdb`.`test1` ADD COLUMN addcol119 VARCHAR(255) DEFAULT NULL COMMENT '添加普通列测试'";
        when(queryLogEvent.getQuery()).thenReturn(ALTER_TABLE);
        Assert.assertFalse(ddlFilter.parseQueryEvent(queryLogEvent, gtid));
    }

    @Test
    public void testRenameWithUse() {
        String oriSchemaName = "drc1";
        String oriTableName = "insert1";
        String schemaName = "drc2";
        String tableName = "insert2";
        String RENAME_DDL = "rename table " + oriTableName + " to " + schemaName + "." + tableName + ";";

        TableInfo tableInfo = new TableInfo();
        tableInfo.setDbName(schemaName);
        tableInfo.setTableName(tableName);
        when(queryLogEvent.getQuery()).thenReturn(RENAME_DDL);
        when(queryLogEvent.getSchemaName()).thenReturn(oriSchemaName);
        when(schemaManager.find(schemaName, tableName)).thenReturn(tableInfo);
        when(schemaManager.apply(anyString(), anyString(), anyString(), any(QueryType.class), anyString())).thenReturn(ApplyResult.from(ApplyResult.Status.SUCCESS, RENAME_DDL));

        Assert.assertTrue(ddlFilter.parseQueryEvent(queryLogEvent, gtid));
        verify(schemaManager, times(1)).apply(oriSchemaName, tableName, RENAME_DDL, QueryType.RENAME, gtid);
        verify(schemaManager, times(1)).persistDdl(oriSchemaName, tableName, RENAME_DDL);
        verify(schemaManager, times(1)).persistColumnInfo(tableInfo, false);
    }

    @Test
    public void testAlterTablePartition() {
        String schemaName = "drc1";
        String tableName = "ts";
        String DDL = "CREATE TABLE ts (id INT, purchased DATE)\n" +
                "    PARTITION BY RANGE( YEAR(purchased) )\n" +
                "    SUBPARTITION BY HASH( TO_DAYS(purchased) ) (\n" +
                "        PARTITION p0 VALUES LESS THAN (1990) (\n" +
                "            SUBPARTITION s0,\n" +
                "            SUBPARTITION s1\n" +
                "        ),\n" +
                "        PARTITION p1 VALUES LESS THAN (2000) (\n" +
                "            SUBPARTITION s2,\n" +
                "            SUBPARTITION s3\n" +
                "        ),\n" +
                "        PARTITION p2 VALUES LESS THAN MAXVALUE (\n" +
                "            SUBPARTITION s4,\n" +
                "            SUBPARTITION s5\n" +
                "        )\n" +
                "    );";

        TableInfo tableInfo = new TableInfo();
        tableInfo.setDbName(schemaName);
        tableInfo.setTableName(tableName);
        when(queryLogEvent.getQuery()).thenReturn(DDL);
        when(queryLogEvent.getSchemaName()).thenReturn(schemaName);
        when(schemaManager.find(schemaName, tableName)).thenReturn(tableInfo);
        when(schemaManager.apply(schemaName, tableName, DDL, QueryType.CREATE, gtid)).thenReturn(ApplyResult.from(ApplyResult.Status.PARTITION_SKIP, DDL));

        Assert.assertFalse(ddlFilter.parseQueryEvent(queryLogEvent, gtid));
        verify(schemaManager, times(0)).persistDdl(schemaName, tableName, DDL);
    }

    @Test
    public void testCreateTablePartition() {
        String schemaName = "drc1";
        String tableName = "employees";
        String DDL = "CREATE TABLE employees (\n" +
                "    id INT NOT NULL,\n" +
                "    fname VARCHAR(30),\n" +
                "    lname VARCHAR(30),\n" +
                "    hired DATE NOT NULL DEFAULT '1970-01-01',\n" +
                "    separated DATE NOT NULL DEFAULT '9999-12-31',\n" +
                "    job_code INT,\n" +
                "    store_id INT\n" +
                ")\n" +
                "PARTITION BY HASH(store_id)\n" +
                "PARTITIONS 4;";

        TableInfo tableInfo = new TableInfo();
        tableInfo.setDbName(schemaName);
        tableInfo.setTableName(tableName);
        when(queryLogEvent.getQuery()).thenReturn(DDL);
        when(queryLogEvent.getSchemaName()).thenReturn(schemaName);
        when(schemaManager.find(schemaName, tableName)).thenReturn(tableInfo);
        when(schemaManager.apply(schemaName, tableName, DDL, QueryType.CREATE, gtid)).thenReturn(ApplyResult.from(ApplyResult.Status.SUCCESS, DDL));

        Assert.assertTrue(ddlFilter.parseQueryEvent(queryLogEvent, gtid));
        verify(schemaManager, times(1)).persistDdl(schemaName, tableName, DDL);
        verify(schemaManager, times(1)).persistColumnInfo(tableInfo, false);
    }

    @Test
    public void testRenameToBlackDbName() {
        String oriSchemaName = "drc1";
        String oriTableName = "_insert1_del";
        String schemaName = "configdb";
        String tableName = "insert2";
        String RENAME_DDL = "rename table " + oriSchemaName + "." + oriTableName + " to " + schemaName + "." + tableName + ";";

        TableInfo tableInfo = new TableInfo();
        tableInfo.setDbName(schemaName);
        tableInfo.setTableName(tableName);
        when(queryLogEvent.getQuery()).thenReturn(RENAME_DDL);
        when(queryLogEvent.getSchemaName()).thenReturn(null);
        when(schemaManager.find(schemaName, tableName)).thenReturn(tableInfo);
        when(schemaManager.apply(anyString(), anyString(), anyString(), any(QueryType.class), anyString())).thenReturn(ApplyResult.from(ApplyResult.Status.SUCCESS, RENAME_DDL));

        Assert.assertFalse(ddlFilter.parseQueryEvent(queryLogEvent, gtid));
        verify(schemaManager, times(1)).apply(oriSchemaName, oriTableName, String.format(DROP_TABLE, oriSchemaName, oriTableName), QueryType.ERASE, gtid);
        verify(schemaManager, times(0)).apply(oriSchemaName, tableName, RENAME_DDL, QueryType.RENAME, gtid);
        verify(schemaManager, times(0)).persistDdl(oriSchemaName, tableName, RENAME_DDL);
        verify(schemaManager, times(0)).persistColumnInfo(tableInfo, false);
    }

}
