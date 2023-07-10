package com.ctrip.framework.drc.console.service.v2.impl;

import com.ctrip.framework.drc.console.dao.RowsFilterTblDao;
import com.ctrip.framework.drc.console.dao.entity.RowsFilterTbl;
import com.ctrip.framework.drc.console.dao.entity.v2.RowsFilterTblV2;
import com.ctrip.framework.drc.console.dao.v2.RowsFilterTblV2Dao;
import com.ctrip.framework.drc.console.enums.RowsFilterModeEnum;
import com.ctrip.framework.drc.console.service.impl.RowsFilterServiceImpl;
import com.ctrip.framework.drc.console.service.v2.RowsFilterServiceV2;
import com.ctrip.framework.drc.core.meta.RowsFilterConfig;
import com.ctrip.framework.drc.core.monitor.reporter.DefaultTransactionMonitorHolder;
import com.ctrip.framework.drc.core.server.common.enums.RowsFilterType;
import com.ctrip.framework.drc.core.service.utils.JsonUtils;
import com.google.common.collect.Lists;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by dengquanliang
 * 2023/5/30 10:39
 */
@Service
public class RowsFilterServiceV2Impl implements RowsFilterServiceV2 {
    public static final Logger logger = LoggerFactory.getLogger(RowsFilterServiceImpl.class);

    @Autowired
    private RowsFilterTblV2Dao rowsFilterTblDao;

    @Override
    public List<RowsFilterConfig> generateRowsFiltersConfig(String tableName, List<Long> rowsFilterIds) throws SQLException {
        List<RowsFilterTblV2> rowsFilterTbls = rowsFilterTblDao.queryByIds(rowsFilterIds);
        List<RowsFilterConfig> rowsFilterConfigs = rowsFilterTbls.stream().map(source -> {
            RowsFilterConfig target = new RowsFilterConfig();
            target.setTables(tableName);
            target.setMode(RowsFilterModeEnum.getNameByCode(source.getMode()));

            String configsJson = source.getConfigs();
            target.setConfigs(JsonUtils.fromJson(configsJson, RowsFilterConfig.Configs.class));
            return target;
        }).collect(Collectors.toList());
        return rowsFilterConfigs;
    }
}
