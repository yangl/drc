package com.ctrip.framework.drc.console.service.impl;


import com.ctrip.framework.drc.console.aop.PossibleRemote;
import com.ctrip.framework.drc.console.config.DefaultConsoleConfig;
import com.ctrip.framework.drc.console.dao.ApplierGroupTblDao;
import com.ctrip.framework.drc.console.dao.DataMediaTblDao;
import com.ctrip.framework.drc.console.dao.RowsFilterMappingTblDao;
import com.ctrip.framework.drc.console.dao.RowsFilterTblDao;
import com.ctrip.framework.drc.console.dao.entity.ApplierGroupTbl;
import com.ctrip.framework.drc.console.dao.entity.DataMediaTbl;
import com.ctrip.framework.drc.console.dao.entity.RowsFilterMappingTbl;
import com.ctrip.framework.drc.console.dao.entity.RowsFilterTbl;
import com.ctrip.framework.drc.console.dto.RowsFilterConfigDto;
import com.ctrip.framework.drc.console.enums.BooleanEnum;
import com.ctrip.framework.drc.console.enums.DataMediaTypeEnum;
import com.ctrip.framework.drc.console.monitor.delay.config.DbClusterSourceProvider;
import com.ctrip.framework.drc.console.service.RowsFilterService;
import com.ctrip.framework.drc.console.service.v2.DrcDoubleWriteService;
import com.ctrip.framework.drc.console.utils.ConsoleExceptionUtils;
import com.ctrip.framework.drc.console.utils.MySqlUtils;
import com.ctrip.framework.drc.console.vo.display.RowsFilterMappingVo;
import com.ctrip.framework.drc.console.vo.response.migrate.MigrateResult;
import com.ctrip.framework.drc.core.meta.RowsFilterConfig;
import com.ctrip.framework.drc.core.meta.RowsFilterConfig.Configs;
import com.ctrip.framework.drc.core.meta.RowsFilterConfig.Parameters;
import com.ctrip.framework.drc.core.monitor.reporter.DefaultTransactionMonitorHolder;
import com.ctrip.framework.drc.core.server.common.enums.RowsFilterType;
import com.ctrip.framework.drc.core.server.common.filter.row.UserFilterMode;
import com.ctrip.framework.drc.core.server.common.filter.table.aviator.AviatorRegexFilter;
import com.ctrip.framework.drc.core.service.utils.JsonUtils;
import com.ctrip.platform.dal.dao.annotation.DalTransactional;
import com.ctrip.xpipe.api.endpoint.Endpoint;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @ClassName ConfigGeneratorServiceImpl
 * @Author haodongPan
 * @Date 2022/4/29 14:38
 * @Version: $
 */
@Service
public class RowsFilterServiceImpl implements RowsFilterService {
    public static final Logger logger = LoggerFactory.getLogger(RowsFilterServiceImpl.class);
    public static final String DB_NAME = "fxdrcmetadb_w";

    @Autowired
    private DataMediaTblDao dataMediaTblDao;

    @Autowired
    private RowsFilterMappingTblDao rowsFilterMappingTblDao;

    @Autowired
    private RowsFilterTblDao rowsFilterTblDao;

    @Autowired
    private DbClusterSourceProvider dbClusterSourceProvider;

    @Autowired
    private ApplierGroupTblDao applierGroupTblDao;

    @Autowired
    private DrcDoubleWriteService drcDoubleWriteService;

    @Autowired
    private DefaultConsoleConfig defaultConsoleConfig;

    private final String TRIP_UID = RowsFilterType.TripUid.getName();
    private final String TRIP_UDL = RowsFilterType.TripUdl.getName();
    private final int OLD_UCS_ID = 20001;
    private final int NEW_UCS_ID = 2000000002;

    @Override
    public List<RowsFilterConfig> generateRowsFiltersConfig(Long applierGroupId, int applierType) throws SQLException {
        List<RowsFilterConfig> rowsFilterConfigs = Lists.newArrayList();
        List<RowsFilterMappingTbl> rowsFilterMappingTbls =
                rowsFilterMappingTblDao.queryBy(applierGroupId, applierType, BooleanEnum.FALSE.getCode());

        for (RowsFilterMappingTbl mapping : rowsFilterMappingTbls) {
            RowsFilterConfig rowsFilterConfig = new RowsFilterConfig();
            DataMediaTbl dataMediaTbl = dataMediaTblDao.queryByIdsAndType(
                    Lists.newArrayList(mapping.getDataMediaId()), DataMediaTypeEnum.ROWS_FILTER.getType(), BooleanEnum.FALSE.getCode()
            ).get(0);
            rowsFilterConfig.setTables(dataMediaTbl.getFullName());

            RowsFilterTbl rowsFilterTbl = rowsFilterTblDao.queryById(mapping.getRowsFilterId(), BooleanEnum.FALSE.getCode());
            String originalMode = rowsFilterTbl.getMode();
            rowsFilterConfig.setMode(
                    TRIP_UID.equalsIgnoreCase(originalMode) ? TRIP_UDL : originalMode
            );
            String configsJson = rowsFilterTbl.getConfigs();
            if (StringUtils.isBlank(configsJson)) {
                // new rowsFilterConfig  trip_udl & configs & updateDb
                logger.info("[[tag=rowsFilter]] applierGroupId:{} migrate to new config", applierGroupId);
                Parameters parameters = JsonUtils.fromJson(rowsFilterTbl.getParameters(), Parameters.class);
                Configs configs = new Configs();
                configs.setParameterList(Lists.newArrayList(parameters));
                rowsFilterConfig.setConfigs(configs);

                migrateUdlConfigs(rowsFilterConfig, rowsFilterTbl);
            } else {
                rowsFilterConfig.setConfigs(JsonUtils.fromJson(configsJson, Configs.class));
            }
            rowsFilterConfigs.add(rowsFilterConfig);
        }

        return rowsFilterConfigs;
    }


    @Override
    public List<RowsFilterMappingVo> getRowsFilterMappingVos(Long applierGroupId, int applierType) throws SQLException {
        List<RowsFilterMappingVo> mappingVos = Lists.newArrayList();
        if (applierGroupId == null) {
            return mappingVos;
        }
        List<RowsFilterMappingTbl> rowsFilterMappingTbls =
                rowsFilterMappingTblDao.queryBy(applierGroupId, applierType, BooleanEnum.FALSE.getCode());
        for (RowsFilterMappingTbl mapping : rowsFilterMappingTbls) {
            List<DataMediaTbl> dataMediaTbls =
                    dataMediaTblDao.queryByIdsAndType(
                            Lists.newArrayList(mapping.getDataMediaId()),
                            DataMediaTypeEnum.ROWS_FILTER.getType(),
                            BooleanEnum.FALSE.getCode()
                    );
            RowsFilterTbl rowsFilterTbl =
                    rowsFilterTblDao.queryById(mapping.getRowsFilterId(), BooleanEnum.FALSE.getCode());
            if (!CollectionUtils.isEmpty(dataMediaTbls) && rowsFilterTbl != null) {
                mappingVos.add(new RowsFilterMappingVo(mapping, dataMediaTbls.get(0), rowsFilterTbl));
            }
        }
        return mappingVos;
    }

    @Override
    @DalTransactional(logicDbName = DB_NAME)
    public String addRowsFilterConfig(RowsFilterConfigDto rowsFilterConfigDto) throws Exception {
        DataMediaTbl dataMediaTbl = rowsFilterConfigDto.extractDataMediaTbl();
        if (!checkFilter(rowsFilterConfigDto.getApplierGroupId(), dataMediaTbl)) {
            throw ConsoleExceptionUtils.message("nameFilter and rowsFilter not match!");
        }
        RowsFilterTbl rowsFilterTbl = rowsFilterConfigDto.extractRowsFilterTbl();
        Long dataMediaId = dataMediaTblDao.insertReturnPk(dataMediaTbl);
        Long rowsFilterId = rowsFilterTblDao.insertReturnPk(rowsFilterTbl);
        RowsFilterMappingTbl mappingTbl = new RowsFilterMappingTbl();
        mappingTbl.setApplierGroupId(rowsFilterConfigDto.getApplierGroupId());
        mappingTbl.setDataMediaId(dataMediaId);
        mappingTbl.setRowsFilterId(rowsFilterId);
        int insert = rowsFilterMappingTblDao.insert(mappingTbl);

        if (defaultConsoleConfig.getDrcDoubleWriteSwitch().equals(DefaultConsoleConfig.SWITCH_ON)) {
            logger.info("drcDoubleWrite insertRowsFilter");
            drcDoubleWriteService.insertRowsFilter(rowsFilterConfigDto.getApplierGroupId(), dataMediaId, rowsFilterId);
        }

        return insert == 1 ? "insert rowsFilterConfig success" : "insert rowsFilterConfig fail";
    }

    @Override
    @DalTransactional(logicDbName = DB_NAME)
    public String updateRowsFilterConfig(RowsFilterConfigDto rowsFilterConfigDto) throws Exception {
        DataMediaTbl dataMediaTbl = rowsFilterConfigDto.extractDataMediaTbl();
        if (!checkFilter(rowsFilterConfigDto.getApplierGroupId(), dataMediaTbl)) {
            throw ConsoleExceptionUtils.message("nameFilter and rowsFilter not match!");
        }

        if (defaultConsoleConfig.getDrcDoubleWriteSwitch().equals(DefaultConsoleConfig.SWITCH_ON)) {
            logger.info("drcDoubleWrite deleteRowsFilter");
            drcDoubleWriteService.deleteRowsFilter(rowsFilterConfigDto.getId());
        }

        RowsFilterTbl rowsFilterTbl = rowsFilterConfigDto.extractRowsFilterTbl();
        int update0 = dataMediaTblDao.update(dataMediaTbl);
        int update1 = rowsFilterTblDao.update(rowsFilterTbl);

        if (defaultConsoleConfig.getDrcDoubleWriteSwitch().equals(DefaultConsoleConfig.SWITCH_ON)) {
            logger.info("drcDoubleWrite insertRowsFilter");
            drcDoubleWriteService.insertRowsFilter(rowsFilterConfigDto.getApplierGroupId(), rowsFilterConfigDto.getDataMediaId(), rowsFilterConfigDto.getRowsFilterId());
        }

        if (update0 + update1 == 2) {
            return "update rowsFilterConfig success";
        } else if (update0 == 1) {
            return "update dateMedia success";
        } else if (update1 == 1) {
            return "update rowsFilter success";
        } else {
            return "update rowsFilterConfig fail";
        }
    }

    @Override
    @DalTransactional(logicDbName = DB_NAME)
    public String deleteRowsFilterConfig(Long id) throws Exception {
        RowsFilterMappingTbl mappingTbl = rowsFilterMappingTblDao.queryByPk(id);
        mappingTbl.setDeleted(BooleanEnum.TRUE.getCode());
        RowsFilterTbl rowsFilterTbl = new RowsFilterTbl();
        rowsFilterTbl.setId(mappingTbl.getRowsFilterId());
        rowsFilterTbl.setDeleted(BooleanEnum.TRUE.getCode());
        DataMediaTbl dataMediaTbl = new DataMediaTbl();
        dataMediaTbl.setId(mappingTbl.getDataMediaId());
        dataMediaTbl.setDeleted(BooleanEnum.TRUE.getCode());
        int update0 = rowsFilterMappingTblDao.update(mappingTbl);
        int update1 = dataMediaTblDao.update(dataMediaTbl);
        int update2 = rowsFilterTblDao.update(rowsFilterTbl);

        if (defaultConsoleConfig.getDrcDoubleWriteSwitch().equals(DefaultConsoleConfig.SWITCH_ON)) {
            logger.info("drcDoubleWrite deleteRowsFilter");
            drcDoubleWriteService.deleteRowsFilter(id);
        }

        return update0 + update1 + update2 == 3 ? "delete rowsFilterConfig success" : "update rowsFilterConfig fail";
    }

    @Override
    @PossibleRemote(path = "/api/drc/v1/build/dataMedia/columnCheck")
    public List<String> getTablesWithoutColumn(String column, String namespace, String name, String mhaName) {
        List<String> tables = Lists.newArrayList();
        Endpoint endpoint = dbClusterSourceProvider.getMasterEndpoint(mhaName);
        List<MySqlUtils.TableSchemaName> tablesAfterRegexFilter =
                MySqlUtils.getTablesAfterRegexFilter(endpoint, new AviatorRegexFilter(namespace + "\\." + name));
        Map<String, Set<String>> allColumnsByTable = MySqlUtils.getAllColumnsByTable(endpoint, tablesAfterRegexFilter, true);
        for (Map.Entry<String, Set<String>> entry : allColumnsByTable.entrySet()) {
            String tableName = entry.getKey();
            if (!entry.getValue().contains(column)) {
                tables.add(tableName);
            }
        }
        return tables;
    }


    @Override
    public List<String> getLogicalTables(
            Long applierGroupId,
            int applierType,
            Long dataMediaId,
            String namespace,
            String name,
            String mhaName) throws SQLException {
        List<RowsFilterMappingVo> rowsFilterMappingVos = getRowsFilterMappingVos(applierGroupId, applierType);
        List<String> logicalTables = Lists.newArrayList();
        if (dataMediaId == 0) { // add
            logicalTables = rowsFilterMappingVos.stream().
                    map(mappingVo -> mappingVo.getNamespace() + "\\." + mappingVo.getName()).collect(Collectors.toList());
        } else { // update
            logicalTables = rowsFilterMappingVos.stream().
                    filter(p -> !p.getDataMediaId().equals(dataMediaId)).
                    map(mappingVo -> mappingVo.getNamespace() + "\\." + mappingVo.getName()).collect(Collectors.toList());
        }
        logicalTables.add(namespace + "\\." + name);
        return logicalTables;
    }

    @Override
    @PossibleRemote(path = "/api/drc/v1/build/dataMedia/conflictCheck/remote")
    public List<String> getConflictTables(String mhaName, String logicalTables) {
        String[] tables = logicalTables.split(",");
        Endpoint endpoint = dbClusterSourceProvider.getMasterEndpoint(mhaName);
        HashSet<String> allTable = Sets.newHashSet();
        ArrayList<String> conflictTables = Lists.newArrayList();
        for (String logicalTable : tables) {
            AviatorRegexFilter filter = new AviatorRegexFilter(logicalTable);
            List<String> tablesAfterFilter = MySqlUtils.getTablesAfterRegexFilter(endpoint, filter).stream().
                    map(MySqlUtils.TableSchemaName::getDirectSchemaTableName).collect(Collectors.toList());
            for (String table : tablesAfterFilter) {
                if (allTable.contains(table)) {
                    logger.warn("[[tag=checkTable]] contain common table: {}", table);
                    conflictTables.add(table);
                } else {
                    allTable.add(table);
                }
            }
        }
        return conflictTables;
    }

    @Override
    public List<Long> getMigrateRowsFilterIds() throws SQLException {
        List<Long> res = Lists.newArrayList();
        List<RowsFilterTbl> rowsFilterTbls = rowsFilterTblDao.queryAllByDeleted(BooleanEnum.FALSE.getCode());
        for (RowsFilterTbl rowsFilterTbl : rowsFilterTbls) {
            if (rowsFilterTbl.getMode().equalsIgnoreCase(TRIP_UDL)) {
                String configsJson = rowsFilterTbl.getConfigs();
                if (StringUtils.isBlank(configsJson)) {
                    throw new IllegalArgumentException("udl rowsFilter has empty configs,id:" + rowsFilterTbl.getId());
                } else {
                    Configs configs = JsonUtils.fromJson(configsJson, Configs.class);
                    List<Parameters> parameterList = configs.getParameterList();
                    for (Parameters parameters : parameterList) {
                        if (parameters.getUserFilterMode().equals(UserFilterMode.Udl.getName())) {
                            int currentStrategyId = configs.getDrcStrategyId();
                            if (currentStrategyId ==  OLD_UCS_ID) {
                                res.add(rowsFilterTbl.getId());
                            } else if (currentStrategyId ==  NEW_UCS_ID) {
                                logger.info("udl rowsFilter StrategyId already migrate,id:{}",rowsFilterTbl.getId());
                            } else {
                                throw new IllegalArgumentException("unexpected strategy,rowsFilter id:"  + rowsFilterTbl.getId());
                            }
                        }
                    }
                }
            }
        }
        return res;

    }

    @Override
    @DalTransactional(logicDbName = DB_NAME)
    public MigrateResult migrateUdlStrategyId(List<Long> rowsFilterIds) throws SQLException {
        List<RowsFilterTbl> rowsFilterTbls = rowsFilterTblDao.queryByIds(rowsFilterIds, BooleanEnum.FALSE.getCode());
        List<RowsFilterTbl> rowsFilterTblsToBeUpdated = Lists.newArrayList();
        for (RowsFilterTbl rowsFilterTbl : rowsFilterTbls) {
            if (rowsFilterTbl.getMode().equalsIgnoreCase(TRIP_UDL)) {
                String configsJson = rowsFilterTbl.getConfigs();
                if (StringUtils.isBlank(configsJson)) {
                    throw new IllegalArgumentException("udl rowsFilter has empty configs,id:" + rowsFilterTbl.getId());
                } else {
                    Configs configs = JsonUtils.fromJson(configsJson, Configs.class);
                    List<Parameters> parameterList = configs.getParameterList();
                    for (Parameters parameters : parameterList) {
                        if (parameters.getUserFilterMode().equals(UserFilterMode.Udl.getName())) {
                            int currentStrategyId = configs.getDrcStrategyId();
                            if (currentStrategyId ==  OLD_UCS_ID) {
                                configs.setDrcStrategyId(NEW_UCS_ID);
                                rowsFilterTbl.setConfigs(JsonUtils.toJson(configs));
                                rowsFilterTblsToBeUpdated.add(rowsFilterTbl);
                            } else if (currentStrategyId == NEW_UCS_ID) {
                                logger.info("udl rowsFilter StrategyId already migrate,id:{}",rowsFilterTbl.getId());
                            } else {
                                throw new IllegalArgumentException("unexpected strategy,rowsFilter id:" + rowsFilterTbl.getId());
                            }
                            break;
                        }
                    }
                }
            }
        }
        int[] updateRes = rowsFilterTblDao.batchUpdate(rowsFilterTblsToBeUpdated);
        return new MigrateResult(0, Arrays.stream(updateRes).sum(),0,rowsFilterTblsToBeUpdated.size());
    }
    

    private void migrateUdlConfigs(RowsFilterConfig rowsFilterConfig, RowsFilterTbl rowsFilterTbl) {
        try {
            DefaultTransactionMonitorHolder.getInstance().logTransaction(
                    "console.meta",
                    "udl.migrate.updateDb",
                    () -> {
                        String configsJson = JsonUtils.toJson(rowsFilterConfig.getConfigs());
                        RowsFilterTbl sampleWithConfigs = new RowsFilterTbl();
                        sampleWithConfigs.setId(rowsFilterTbl.getId());
                        sampleWithConfigs.setMode(rowsFilterConfig.getMode());
                        sampleWithConfigs.setConfigs(configsJson);
                        int updateRows = rowsFilterTblDao.update(sampleWithConfigs);
                        logger.info("[[tag=rowsFilter]] effect rows:{}," +
                                        "correct old rowsFilterTbl to udl_mode with id:{},config:{}",
                                updateRows, rowsFilterTbl.getId(), configsJson);
                    }
            );
        } catch (Exception e) {
            logger.error("[[tag=rowsFilter]] udl.migrate.updateDb fail,id:{}", rowsFilterTbl.getId(), e);
        }
    }

    private boolean checkFilter(Long applierGroupId, DataMediaTbl dataMediaTbl) throws SQLException {
        ApplierGroupTbl applierGroupTbl = applierGroupTblDao.queryByPk(applierGroupId);
        if (StringUtils.isBlank(applierGroupTbl.getNameFilter())) {
            return false;
        }
        List<String> nameFilters = Lists.newArrayList(applierGroupTbl.getNameFilter().split(","));
        return nameFilters.contains(dataMediaTbl.getFullName());
    }

}
