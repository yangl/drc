package com.ctrip.framework.drc.core.driver.binlog.manager.task;

import com.ctrip.framework.drc.core.driver.binlog.manager.exception.DdlException;
import com.ctrip.framework.drc.core.monitor.entity.BaseEndpointEntity;
import com.ctrip.framework.drc.core.monitor.reporter.DefaultEventMonitorHolder;
import com.ctrip.framework.drc.core.monitor.reporter.DefaultReporterHolder;
import com.ctrip.xpipe.api.endpoint.Endpoint;
import com.ctrip.xpipe.utils.VisibleForTesting;
import org.apache.commons.lang3.StringUtils;
import org.apache.tomcat.jdbc.pool.DataSource;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.concurrent.ExecutorService;

/**
 * @Author limingdong
 * @create 2021/4/7
 */
public class SchemeApplyTask extends AbstractSchemaTask<Boolean> implements NamedCallable<Boolean> {

    public static final String DDL_SQL = "use %s;";

    private String schema;

    private String ddl;

    private ExecutorService ddlMonitorExecutorService;

    private BaseEndpointEntity baseEndpointEntity;

    public SchemeApplyTask(Endpoint inMemoryEndpoint, DataSource inMemoryDataSource, String schema, String ddl, ExecutorService ddlMonitorExecutorService, BaseEndpointEntity baseEndpointEntity) {
        super(inMemoryEndpoint, inMemoryDataSource);
        this.schema = schema;
        this.ddl = ddl;
        this.ddlMonitorExecutorService = ddlMonitorExecutorService;
        this.baseEndpointEntity = baseEndpointEntity;
    }

    @Override
    public void afterException(Throwable t) {
        super.afterException(t);
        DDL_LOGGER.warn("apply {} failed {}", ddl, t);
        DefaultEventMonitorHolder.getInstance().logEvent("DRC.ddl.failed", String.format("DDL:%s\nEXCEPTION:%s", ddl, t.getCause()));
    }

    @Override
    public Boolean call() throws Exception {
        boolean res = true;
        if (!StringUtils.startsWithIgnoreCase(StringUtils.trim(ddl), "flush")
                && !StringUtils.startsWithIgnoreCase(StringUtils.trim(ddl), "grant")
                && !StringUtils.startsWithIgnoreCase(StringUtils.trim(ddl), "revoke")
                && !StringUtils.startsWithIgnoreCase(StringUtils.trim(ddl), "create user")
                && !StringUtils.startsWithIgnoreCase(StringUtils.trim(ddl), "alter user")
                && !StringUtils.startsWithIgnoreCase(StringUtils.trim(ddl), "drop user")) {
            if (StringUtils.isNotEmpty(schema)) {
                doExecute(String.format(DDL_SQL, schema));
            }

            res = doExecute(ddl);
            ddlMonitorExecutorService.submit(() -> {
                try {
                    DefaultReporterHolder.getInstance().reportAlterTable(baseEndpointEntity, 1L);
                } catch (Exception e) {
                    DDL_LOGGER.error("hickwallReporter error for {}", ddl, e);
                }
            });
        }
        return res;
    }

    @SuppressWarnings("findbugs:RCN_REDUNDANT_NULLCHECK_WOULD_HAVE_BEEN_A_NPE")
    private boolean doExecute(String query) throws DdlException {
        try (Connection connection = inMemoryDataSource.getConnection()) {
            try (Statement statement = connection.createStatement()) {
                return statement.execute(query);
            }
        } catch (SQLException e) {
            String message = e.getMessage();
            if (StringUtils.isNotBlank(message) && message.contains("Unknown database") && StringUtils.isNotBlank(query) && query.contains("use")) {
                DDL_LOGGER.info("[Ignore] sql '{}' exception", query);
                return true;
            }
            if (StringUtils.isNotBlank(message) && message.contains("No database selected") && StringUtils.isNotBlank(query) && query.contains("/* generated by server */")) {
                DDL_LOGGER.info("[Ignore] sql '{}' exception", query);
                return true;
            }
            DDL_LOGGER.error("Execute sql {} error", query, e);
            throw new DdlException(e);
        }

    }

    @VisibleForTesting
    public void setDdl(String ddl) {
        this.ddl = ddl;
    }

    @VisibleForTesting
    public String getDdl() {
        return ddl;
    }
}
