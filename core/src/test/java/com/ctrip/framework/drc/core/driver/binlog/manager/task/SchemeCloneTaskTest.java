package com.ctrip.framework.drc.core.driver.binlog.manager.task;

import com.ctrip.framework.drc.core.driver.util.MySQLConstants;
import com.google.common.collect.Maps;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

import static com.ctrip.framework.drc.core.driver.binlog.manager.task.BatchTask.MAX_BATCH_SIZE;

/**
 * @Author limingdong
 * @create 2021/4/7
 */
public class SchemeCloneTaskTest extends AbstractSchemaTest {

    private Map<String, Map<String, String>> ddlSchemas = Maps.newHashMap();

    private static final String DB_NAME_1 = "drc3";

    private static final String DB_NAME_2 = "drc4";

    private static final String TABLE_NAME = "utname";

    private static final String TABLE_CREATE = "CREATE TABLE `%s`.`%s`(`id` int(11) NOT NULL AUTO_INCREMENT,`one` varchar(30) DEFAULT 'one',`two` varchar(1000) DEFAULT 'two',`three` char(30),`four` char(255),`datachange_lasttime` timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

    private int DB1_SIZE = MAX_BATCH_SIZE * 2 + 1;

    private int DB2_SIZE = MAX_BATCH_SIZE * 3 + 20;

    @Before
    public void setUp() throws Exception {
        super.setUp();

        Map<String, String> table1 = Maps.newHashMap();
        for (int i = 1; i <= DB1_SIZE; ++i) {
            String tableName = TABLE_NAME + i;
            table1.put(tableName, String.format(TABLE_CREATE, DB_NAME_1, tableName));
        }
        ddlSchemas.put(DB_NAME_1, table1);

        Map<String, String> table2 = Maps.newHashMap();
        for (int i = 1; i <= DB2_SIZE; ++i) {
            String tableName = TABLE_NAME + i;
            table2.put(tableName, String.format(TABLE_CREATE, DB_NAME_2, tableName));
        }
        ddlSchemas.put(DB_NAME_2, table2);
    }

    @Override
    protected AbstractSchemaTask getAbstractSchemaTask() {
        return new SchemeCloneTask(ddlSchemas, inMemoryEndpoint, inMemoryDataSource);
    }

    @Test
    public void testExecuteBatch() throws Exception {
        Connection connection = null;
        String excluded_db_1 = "drc1";
        String excluded_db_2 = "drc2";
        MySQLConstants.EXCLUDED_DB.add(excluded_db_1);
        MySQLConstants.EXCLUDED_DB.add(excluded_db_2);
        try {
            connection = inMemoryDataSource.getConnection();

            List<String> databases = query(connection, MySQLConstants.SHOW_DATABASES_QUERY);
            Assert.assertFalse(databases.contains(DB_NAME_1));
            Assert.assertFalse(databases.contains(DB_NAME_2));

            // create db
            boolean res = abstractSchemaTask.call();
            Assert.assertTrue(res);

            databases = query(connection, MySQLConstants.SHOW_DATABASES_QUERY);
            Assert.assertTrue(databases.contains(DB_NAME_1));
            Assert.assertTrue(databases.contains(DB_NAME_2));

            assertResultSize(connection, DB_NAME_1, DB1_SIZE);
            assertResultSize(connection, DB_NAME_2, DB2_SIZE);

            // clear schema
            SchemeClearTask task = new SchemeClearTask(inMemoryEndpoint, inMemoryDataSource);
            res = task.call();
            Assert.assertTrue(res);

            databases = query(connection, MySQLConstants.SHOW_DATABASES_QUERY);
            Assert.assertFalse(databases.contains(DB_NAME_1));
            Assert.assertFalse(databases.contains(DB_NAME_2));
        } finally {
            if (connection != null) {
                connection.close();
            }
            MySQLConstants.EXCLUDED_DB.remove(excluded_db_1);
            MySQLConstants.EXCLUDED_DB.remove(excluded_db_2);
        }
    }
}
