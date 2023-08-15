package com.ctrip.framework.drc.console.service.v2.impl;

import com.ctrip.framework.drc.console.config.ConsoleConfig;
import com.ctrip.framework.drc.console.dao.*;
import com.ctrip.framework.drc.console.dao.entity.*;
import com.ctrip.framework.drc.console.dao.entity.v2.*;
import com.ctrip.framework.drc.console.dao.v2.*;
import com.ctrip.framework.drc.console.dto.MessengerMetaDto;
import com.ctrip.framework.drc.console.enums.*;
import com.ctrip.framework.drc.console.monitor.delay.config.MonitorTableSourceProvider;
import com.ctrip.framework.drc.console.monitor.delay.config.v2.MetaProviderV2;
import com.ctrip.framework.drc.console.param.v2.*;
import com.ctrip.framework.drc.console.service.v2.*;
import com.ctrip.framework.drc.console.utils.ConsoleExceptionUtils;
import com.ctrip.framework.drc.console.utils.MySqlUtils;
import com.ctrip.framework.drc.console.utils.PreconditionUtils;
import com.ctrip.framework.drc.console.utils.XmlUtils;
import com.ctrip.framework.drc.console.vo.display.v2.MqConfigVo;
import com.ctrip.framework.drc.console.vo.v2.ColumnsConfigView;
import com.ctrip.framework.drc.console.vo.v2.DbReplicationView;
import com.ctrip.framework.drc.console.vo.v2.RowsFilterConfigView;
import com.ctrip.framework.drc.core.entity.Drc;
import com.ctrip.framework.drc.core.meta.RowsFilterConfig;
import com.ctrip.framework.drc.core.server.common.filter.row.UserFilterMode;
import com.ctrip.framework.drc.core.server.common.filter.table.aviator.AviatorRegexFilter;
import com.ctrip.framework.drc.core.server.config.applier.dto.ApplyMode;
import com.ctrip.framework.drc.core.server.utils.ThreadUtils;
import com.ctrip.framework.drc.core.service.utils.Constants;
import com.ctrip.framework.drc.core.service.utils.JsonUtils;
import com.ctrip.platform.dal.dao.annotation.DalTransactional;
import com.ctrip.xpipe.api.endpoint.Endpoint;
import com.google.common.collect.Lists;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.ctrip.framework.drc.console.config.ConsoleConfig.ADD_REMOVE_PAIR_SIZE;
import static com.ctrip.framework.drc.console.config.ConsoleConfig.DEFAULT_APPLIER_PORT;

/**
 * Created by dengquanliang
 * 2023/7/27 15:43
 */
@Service
public class DrcBuildServiceV2Impl implements DrcBuildServiceV2 {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private MonitorTableSourceProvider monitorTableSourceProvider;
    @Autowired
    private MetaInfoServiceV2 metaInfoService;
    @Autowired
    private MhaDbMappingService mhaDbMappingService;
    @Autowired
    private MhaTblV2Dao mhaTblDao;
    @Autowired
    private MhaReplicationTblDao mhaReplicationTblDao;
    @Autowired
    private ReplicatorGroupTblDao replicatorGroupTblDao;
    @Autowired
    private ReplicatorTblDao replicatorTblDao;
    @Autowired
    private ApplierGroupTblV2Dao applierGroupTblDao;
    @Autowired
    private ApplierTblV2Dao applierTblDao;
    @Autowired
    private ResourceTblDao resourceTblDao;
    @Autowired
    private DbTblDao dbTblDao;
    @Autowired
    private MhaDbMappingTblDao mhaDbMappingTblDao;
    @Autowired
    private DbReplicationTblDao dbReplicationTblDao;
    @Autowired
    private DbReplicationFilterMappingTblDao dbReplicationFilterMappingTblDao;
    @Autowired
    private ColumnsFilterTblV2Dao columnFilterTblV2Dao;
    @Autowired
    private RowsFilterTblV2Dao rowsFilterTblV2Dao;
    @Autowired
    private BuTblDao buTblDao;
    @Autowired
    private DcTblDao dcTblDao;
    @Autowired
    private CacheMetaService cacheMetaService;
    @Autowired
    private MessengerGroupTblDao messengerGroupTblDao;
    @Autowired
    private MessengerTblDao messengerTblDao;
    @Autowired
    private MetaProviderV2 metaProviderV2;
    @Autowired
    private MessengerServiceV2 messengerServiceV2;

    private final ExecutorService executorService = ThreadUtils.newFixedThreadPool(5,"drcMetaRefreshV2");
    private static final String CLUSTER_NAME_SUFFIX = "_dalcluster";
    private static final String DEFAULT_TABLE_NAME = ".*";

    @Override
    @DalTransactional(logicDbName = "fxdrcmetadb_w")
    public void buildMha(DrcMhaBuildParam param) throws Exception {
        checkDrcMhaBuildParam(param);
        BuTbl buTbl = buTblDao.queryByBuName(param.getBuName());
        if (buTbl == null) {
            throw ConsoleExceptionUtils.message(String.format("buName: %s not exist", param.getBuName()));
        }
        DcTbl srcDcTbl = dcTblDao.queryByDcName(param.getSrcDc());
        DcTbl dstDcTbl = dcTblDao.queryByDcName(param.getDstDc());
        if (srcDcTbl == null || dstDcTbl == null) {
            throw ConsoleExceptionUtils.message(String.format("srcDc: %s or dstDc: %s not exist", param.getSrcDc(), param.getDstDc()));
        }

        MhaTblV2 srcMha = buildMhaTbl(param.getSrcMhaName(), srcDcTbl.getId(), buTbl.getId());
        MhaTblV2 dstMha = buildMhaTbl(param.getDstMhaName(), dstDcTbl.getId(), buTbl.getId());

        long srcMhaId = insertMha(srcMha);
        long dstMhaId = insertMha(dstMha);
        insertMhaReplication(srcMhaId, dstMhaId);
        insertMhaReplication(dstMhaId, srcMhaId);
    }

    @Override
    public String buildDrc(DrcBuildParam param) throws Exception {
        submitDrc(param);

        Drc drc = metaInfoService.getDrcReplicationConfig(param.getSrcBuildParam().getMhaName(), param.getDstBuildParam().getMhaName());
        try {
            executorService.submit(() -> metaProviderV2.scheduledTask());
        } catch (Exception e) {
            logger.error("metaProvider scheduledTask error, {}", e);
        }
        return XmlUtils.formatXML(drc.toString());
    }

    @DalTransactional(logicDbName = "fxdrcmetadb_w")
    public void submitDrc(DrcBuildParam param) throws Exception {
        checkDrcBuildParam(param);
        DrcBuildBaseParam srcBuildParam = param.getSrcBuildParam();
        DrcBuildBaseParam dstBuildParam = param.getDstBuildParam();
        String srcMhaName = srcBuildParam.getMhaName();
        String dstMhaName = dstBuildParam.getMhaName();

        MhaTblV2 srcMha = mhaTblDao.queryByMhaName(srcMhaName, BooleanEnum.FALSE.getCode());
        MhaTblV2 dstMha = mhaTblDao.queryByMhaName(dstMhaName, BooleanEnum.FALSE.getCode());
        if (srcMha == null || dstMha == null) {
            throw ConsoleExceptionUtils.message("srcMha or dstMha not exist");
        }
        MhaReplicationTbl srcMhaReplication = mhaReplicationTblDao.queryByMhaId(srcMha.getId(), dstMha.getId(), BooleanEnum.FALSE.getCode());
        MhaReplicationTbl dstMhaReplication = mhaReplicationTblDao.queryByMhaId(dstMha.getId(), srcMha.getId(), BooleanEnum.FALSE.getCode());
        if (srcMhaReplication == null || dstMhaReplication == null) {
            throw ConsoleExceptionUtils.message(String.format("mhaReplication between %s and %s not exist", srcMhaName, dstMhaName));
        }

        configureReplicatorGroup(srcMha, srcBuildParam.getReplicatorInitGtid(), srcBuildParam.getReplicatorIps());
        configureReplicatorGroup(dstMha, dstBuildParam.getReplicatorInitGtid(), dstBuildParam.getReplicatorIps());

        configureApplierGroup(srcMhaReplication.getId(), dstBuildParam.getApplierInitGtid(), dstBuildParam.getApplierIps());
        configureApplierGroup(dstMhaReplication.getId(), srcBuildParam.getApplierInitGtid(), srcBuildParam.getApplierIps());

        if (!CollectionUtils.isEmpty(srcBuildParam.getApplierIps())) {
            dstMha.setMonitorSwitch(BooleanEnum.TRUE.getCode());
            dstMhaReplication.setDrcStatus(BooleanEnum.TRUE.getCode());
            mhaReplicationTblDao.update(dstMhaReplication);
            mhaTblDao.update(dstMha);
        }
        if (!CollectionUtils.isEmpty(dstBuildParam.getApplierIps())) {
            srcMha.setMonitorSwitch(BooleanEnum.TRUE.getCode());
            srcMhaReplication.setDrcStatus(BooleanEnum.TRUE.getCode());
            mhaReplicationTblDao.update(srcMhaReplication);
            mhaTblDao.update(srcMha);
        }
    }

    @Override
    @DalTransactional(logicDbName = "fxdrcmetadb_w")
    public List<Long> configureDbReplications(DbReplicationBuildParam param) throws Exception {
        checkDbReplicationBuildParam(param);
        MhaTblV2 srcMha = mhaTblDao.queryByMhaName(param.getSrcMhaName(), BooleanEnum.FALSE.getCode());
        MhaTblV2 dstMha = mhaTblDao.queryByMhaName(param.getDstMhaName(), BooleanEnum.FALSE.getCode());
        if (srcMha == null || dstMha == null) {
            throw ConsoleExceptionUtils.message("srcMha or dstMha not exist");
        }
        String nameFilter = param.getDbName() + "\\." + param.getTableName();
        List<String> dbList = mhaDbMappingService.buildMhaDbMappings(srcMha, dstMha, nameFilter);

        List<DbReplicationTbl> dbReplicationTbls = insertDbReplications(srcMha.getId(), dstMha.getId(), dbList, nameFilter);
        List<Long> dbReplicationIds = dbReplicationTbls.stream().map(DbReplicationTbl::getId).collect(Collectors.toList());
        return dbReplicationIds;
    }

    @Override
    public List<DbReplicationView> getDbReplicationView(String srcMhaName, String dstMhaName) throws Exception {
        MhaTblV2 srcMha = mhaTblDao.queryByMhaName(srcMhaName, BooleanEnum.FALSE.getCode());
        MhaTblV2 dstMha = mhaTblDao.queryByMhaName(dstMhaName, BooleanEnum.FALSE.getCode());
        if (srcMha == null || dstMha == null) {
            throw ConsoleExceptionUtils.message("srcMha or dstMha not exist");
        }

        List<DbReplicationView> views = new ArrayList<>();
        List<MhaDbMappingTbl> srcMhaDbMappings = mhaDbMappingTblDao.queryByMhaId(srcMha.getId());
        List<MhaDbMappingTbl> dstMhaDbMappings = mhaDbMappingTblDao.queryByMhaId(dstMha.getId());
        List<DbReplicationTbl> existDbReplications = getExistDbReplications(srcMhaDbMappings, dstMhaDbMappings);
        if (CollectionUtils.isEmpty(existDbReplications)) {
            return views;
        }

        List<Long> srcDbIds = srcMhaDbMappings.stream().map(MhaDbMappingTbl::getDbId).collect(Collectors.toList());
        List<DbTbl> dbTbls = dbTblDao.queryByIds(srcDbIds);
        Map<Long, String> dbTblMap = dbTbls.stream().collect(Collectors.toMap(DbTbl::getId, DbTbl::getDbName));
        Map<Long, Long> srcMhaDbMappingMap = srcMhaDbMappings.stream().collect(Collectors.toMap(MhaDbMappingTbl::getId, MhaDbMappingTbl::getDbId));

        views = existDbReplications.stream().map(source -> {
            DbReplicationView target = new DbReplicationView();
            target.setDbReplicationId(source.getId());
            target.setLogicTableName(source.getSrcLogicTableName());
            long dbId = srcMhaDbMappingMap.get(source.getSrcMhaDbMappingId());
            target.setDbName(dbTblMap.get(dbId));
            return target;
        }).collect(Collectors.toList());
        return views;
    }

    @Override
    @DalTransactional(logicDbName = "fxdrcmetadb_w")
    public void deleteDbReplications(long dbReplicationId) throws Exception {
        if (dbReplicationId == 0L) {
            throw ConsoleExceptionUtils.message("delete dbReplications are empty!");
        }
        List<DbReplicationTbl> dbReplicationTbls = dbReplicationTblDao.queryByIds(Lists.newArrayList(dbReplicationId));
        if (CollectionUtils.isEmpty(dbReplicationTbls)) {
            logger.info("dbReplicationTbls not exist");
            return;
        }
        dbReplicationTbls.forEach(e -> e.setDeleted(BooleanEnum.TRUE.getCode()));
        dbReplicationTblDao.batchUpdate(dbReplicationTbls);

        List<DbReplicationFilterMappingTbl> dbReplicationFilterMappingTbls = dbReplicationFilterMappingTblDao.queryByDbReplicationId(dbReplicationId);
        if (CollectionUtils.isEmpty(dbReplicationFilterMappingTbls)) {
            logger.info("dbReplicationFilterMappingTbls not exist");
            return;
        }
        dbReplicationFilterMappingTbls.forEach(e -> e.setDeleted(BooleanEnum.TRUE.getCode()));
        dbReplicationFilterMappingTblDao.batchUpdate(dbReplicationFilterMappingTbls);
    }

    @Override
    public void buildColumnsFilter(ColumnsFilterCreateParam param) throws Exception {
        checkColumnsFilterCreateParam(param);
        List<DbReplicationTbl> dbReplicationTbls = dbReplicationTblDao.queryByIds(param.getDbReplicationIds());
        if (CollectionUtils.isEmpty(dbReplicationTbls) || dbReplicationTbls.size() != param.getDbReplicationIds().size()) {
            throw ConsoleExceptionUtils.message("dbReplications not exist!");
        }

        long columnsFilterId = insertColumnsFilter(param.getMode(), param.getColumns());
        insertDbReplicationFilterMappings(param.getDbReplicationIds(), columnsFilterId, FilterTypeEnum.COLUMNS_FILTER.getCode());
    }

    @Override
    public ColumnsConfigView getColumnsConfigView(long dbReplicationId) throws Exception {
        ColumnsConfigView columnsConfigView = new ColumnsConfigView();
        List<DbReplicationFilterMappingTbl> dbReplicationFilterMappingTbls = dbReplicationFilterMappingTblDao.queryByDbReplicationId(dbReplicationId);
        if (CollectionUtils.isEmpty(dbReplicationFilterMappingTbls)) {
            return null;
        }
        long columnsFilterId = dbReplicationFilterMappingTbls.get(0).getColumnsFilterId();
        if (columnsFilterId == -1L) {
            return null;
        }

        ColumnsFilterTblV2 columnsFilterTblV2 = columnFilterTblV2Dao.queryById(columnsFilterId);
        columnsConfigView.setColumns(JsonUtils.fromJsonToList(columnsFilterTblV2.getColumns(), String.class));
        columnsConfigView.setMode(columnsFilterTblV2.getMode());
        return columnsConfigView;
    }

    @Override
    public void deleteColumnsFilter(List<Long> dbReplicationIds) throws Exception {
        List<DbReplicationFilterMappingTbl> existFilterMappings = getDbReplicationFilterMappings(dbReplicationIds);

        existFilterMappings.forEach(e -> {
            if (e.getRowsFilterId() != -1L) {
                e.setColumnsFilterId(-1L);
            } else {
                e.setDeleted(BooleanEnum.TRUE.getCode());
            }
        });
        dbReplicationFilterMappingTblDao.batchUpdate(existFilterMappings);

    }

    @Override
    public RowsFilterConfigView getRowsConfigView(long dbReplicationId) throws Exception {
        RowsFilterConfigView rowsFilterConfigView = new RowsFilterConfigView();
        List<DbReplicationFilterMappingTbl> dbReplicationFilterMappingTbls = dbReplicationFilterMappingTblDao.queryByDbReplicationId(dbReplicationId);
        if (CollectionUtils.isEmpty(dbReplicationFilterMappingTbls)) {
            return null;
        }
        long rowsFilterId = dbReplicationFilterMappingTbls.get(0).getRowsFilterId();
        if (rowsFilterId == -1L) {
            return null;
        }
        RowsFilterTblV2 rowsFilterTblV2 = rowsFilterTblV2Dao.queryById(rowsFilterId);
        rowsFilterConfigView.setMode(rowsFilterTblV2.getMode());

        RowsFilterConfig.Configs configs = JsonUtils.fromJson(rowsFilterTblV2.getConfigs(), RowsFilterConfig.Configs.class);
        rowsFilterConfigView.setDrcStrategyId(configs.getDrcStrategyId());
        rowsFilterConfigView.setRouteStrategyId(configs.getRouteStrategyId());

        List<RowsFilterConfig.Parameters> parametersList = configs.getParameterList();
        RowsFilterConfig.Parameters firstParameters = parametersList.get(0);
        if (rowsFilterTblV2.getMode().equals(RowsFilterModeEnum.TRIP_UDL.getCode())) {
            if (firstParameters.getUserFilterMode().equals(UserFilterMode.Udl.getName())) {
                rowsFilterConfigView.setUdlColumns(firstParameters.getColumns());
            } else if (firstParameters.getUserFilterMode().equals(UserFilterMode.Uid.getName())) {
                rowsFilterConfigView.setColumns(firstParameters.getColumns());
            }
            if (parametersList.size() > 1) {
                RowsFilterConfig.Parameters secondParameters = parametersList.get(1);
                if (secondParameters.getUserFilterMode().equals(UserFilterMode.Udl.getName())) {
                    rowsFilterConfigView.setUdlColumns(secondParameters.getColumns());
                } else if (secondParameters.getUserFilterMode().equals(UserFilterMode.Uid.getName())) {
                    rowsFilterConfigView.setColumns(secondParameters.getColumns());
                }
            }
        } else {
            rowsFilterConfigView.setColumns(firstParameters.getColumns());
        }

        rowsFilterConfigView.setContext(firstParameters.getContext());
        rowsFilterConfigView.setIllegalArgument(firstParameters.getIllegalArgument());
        rowsFilterConfigView.setFetchMode(firstParameters.getFetchMode());

        return rowsFilterConfigView;
    }

    public void buildRowsFilter(RowsFilterCreateParam param) throws Exception {
        checkRowsFilterCreateParam(param);
        List<DbReplicationTbl> dbReplicationTbls = dbReplicationTblDao.queryByIds(param.getDbReplicationIds());
        if (CollectionUtils.isEmpty(dbReplicationTbls) || dbReplicationTbls.size() != param.getDbReplicationIds().size()) {
            throw ConsoleExceptionUtils.message("dbReplications not exist!");
        }
        long rowsFilterId = insertRowsFilter(param);
        insertDbReplicationFilterMappings(param.getDbReplicationIds(), rowsFilterId, FilterTypeEnum.ROWS_FILTER.getCode());
    }

    @Override
    public void deleteRowsFilter(List<Long> dbReplicationIds) throws Exception {
        List<DbReplicationFilterMappingTbl> existFilterMappings = getDbReplicationFilterMappings(dbReplicationIds);

        existFilterMappings.forEach(e -> {
            if (e.getColumnsFilterId() != -1L) {
                e.setRowsFilterId(-1L);
            } else {
                e.setDeleted(BooleanEnum.TRUE.getCode());
            }
        });
        dbReplicationFilterMappingTblDao.batchUpdate(existFilterMappings);
    }


    @Override
    public List<String> getMhaAppliers(String srcMhaName, String dstMhaName) throws Exception {
        if (StringUtils.isBlank(srcMhaName) || StringUtils.isBlank(dstMhaName)) {
            return new ArrayList<>();
        }
        MhaTblV2 srcMha = mhaTblDao.queryByMhaName(srcMhaName, BooleanEnum.FALSE.getCode());
        MhaTblV2 dstMha = mhaTblDao.queryByMhaName(dstMhaName, BooleanEnum.FALSE.getCode());
        if (srcMha == null || dstMha == null) {
            return new ArrayList<>();
        }

        MhaReplicationTbl mhaReplicationTbl = mhaReplicationTblDao.queryByMhaId(srcMha.getId(), dstMha.getId());
        if (mhaReplicationTbl == null) {
            return new ArrayList<>();
        }
        ApplierGroupTblV2 applierGroupTbl = applierGroupTblDao.queryByMhaReplicationId(mhaReplicationTbl.getId(), BooleanEnum.FALSE.getCode());
        if (applierGroupTbl == null) {
            return new ArrayList<>();
        }
        List<ApplierTblV2> applierTbls = applierTblDao.queryByApplierGroupId(applierGroupTbl.getId(), BooleanEnum.FALSE.getCode());
        if (CollectionUtils.isEmpty(applierTbls)) {
            return new ArrayList<>();
        }
        List<Long> resourceIds = applierTbls.stream().map(ApplierTblV2::getResourceId).collect(Collectors.toList());
        List<ResourceTbl> resourceTbls = resourceTblDao.queryByIds(resourceIds);
        List<String> applierIps = resourceTbls.stream().map(ResourceTbl::getIp).collect(Collectors.toList());
        return applierIps;
    }

    @Override
    public String getApplierGtid(String srcMhaName, String dstMhaName) throws Exception {
        String applierGtid = "";
        if (StringUtils.isBlank(srcMhaName) || StringUtils.isBlank(dstMhaName)) {
            return applierGtid;
        }
        MhaTblV2 srcMha = mhaTblDao.queryByMhaName(srcMhaName, BooleanEnum.FALSE.getCode());
        MhaTblV2 dstMha = mhaTblDao.queryByMhaName(dstMhaName, BooleanEnum.FALSE.getCode());
        if (srcMha == null || dstMha == null) {
            return applierGtid;
        }

        MhaReplicationTbl mhaReplicationTbl = mhaReplicationTblDao.queryByMhaId(srcMha.getId(), dstMha.getId());
        if (mhaReplicationTbl == null) {
            return applierGtid;
        }
        ApplierGroupTblV2 applierGroupTbl = applierGroupTblDao.queryByMhaReplicationId(mhaReplicationTbl.getId(), BooleanEnum.FALSE.getCode());
        if (applierGroupTbl == null) {
            return applierGtid;
        }
        return applierGroupTbl.getGtidInit();
    }

    @Override
    public String buildMessengerDrc(MessengerMetaDto dto) throws Exception {
        this.doBuildMessengerDrc(dto);
        Drc drcMessengerConfig = metaInfoService.getDrcMessengerConfig(dto.getMhaName());
        try {
            executorService.submit(() -> metaProviderV2.scheduledTask());
        } catch (Exception e) {
            logger.error("metaProviderV2.scheduledTask error. req: " + dto, e);
        }
        return XmlUtils.formatXML(drcMessengerConfig.toString());
    }

    @DalTransactional(logicDbName = "fxdrcmetadb_w")
    public void doBuildMessengerDrc(MessengerMetaDto dto) throws Exception {

        // 0. check
        MhaTblV2 mhaTbl = mhaTblDao.queryByMhaName(dto.getMhaName(), BooleanEnum.FALSE.getCode());
        if (mhaTbl == null) {
            throw ConsoleExceptionUtils.message(ReadableErrorDefEnum.REQUEST_PARAM_INVALID, "mha not recorded");
        }
        List<MqConfigVo> mqConfigVos = messengerServiceV2.queryMhaMessengerConfigs(dto.getMhaName());
        if (CollectionUtils.isEmpty(mqConfigVos)) {
            throw ConsoleExceptionUtils.message(ReadableErrorDefEnum.REQUEST_PARAM_INVALID, "config mq before build drc!");
        }
        // 1. configure and persistent in database
        long replicatorGroupId = insertOrUpdateReplicatorGroup(mhaTbl.getId());
        configureReplicators(mhaTbl.getMhaName(), replicatorGroupId, dto.getrGtidExecuted(), dto.getReplicatorIps());
        configureMessengers(mhaTbl, replicatorGroupId, dto.getMessengerIps(), dto.getaGtidExecuted());
    }

    public Long configureMessengers(MhaTblV2 mhaTbl,
                                    Long replicatorGroupId,
                                    List<String> messengerIps,
                                    String gtidExecuted) throws SQLException {
        Long messengerGroupId = configureMessengerGroup(mhaTbl, replicatorGroupId, gtidExecuted);
        configureMessengerInstances(mhaTbl, messengerIps, messengerGroupId);
        return messengerGroupId;
    }

    protected Long configureMessengerGroup(MhaTblV2 mhaTbl, Long replicatorGroupId, String gtidExecuted) throws SQLException {
        String mhaName = mhaTbl.getMhaName();
        Long mhaId = mhaTbl.getId();
        logger.info("[[mha={}, mhaId={},replicatorGroupId={}]]configure or update messenger group", mhaName, mhaId, replicatorGroupId);
        return messengerGroupTblDao.upsertIfNotExist(mhaId, replicatorGroupId, formatGtid(gtidExecuted));
    }

    protected void configureMessengerInstances(MhaTblV2 mhaTbl, List<String> messengerIps, Long messengerGroupId) throws SQLException {
        String mhaName = mhaTbl.getMhaName();

        List<MessengerTbl> messengerTbls = messengerTblDao.queryByGroupId(messengerGroupId);
        List<Long> resourceIds = messengerTbls.stream().map(MessengerTbl::getResourceId).collect(Collectors.toList());

        List<ResourceTbl> resourceTbls = resourceTblDao.queryByIds(resourceIds);
        List<String> messengersInuse = resourceTbls.stream().map(ResourceTbl::getIp).collect(Collectors.toList());

        List<List<String>> addRemoveMessengerIpsPair = getRemoveAndAddInstanceIps(messengersInuse, messengerIps);
        if (ADD_REMOVE_PAIR_SIZE != addRemoveMessengerIpsPair.size()) {
            logger.info("[[mha={}]] wrong add remove messenger pair size {}!={}",
                    mhaName, addRemoveMessengerIpsPair.size(), ADD_REMOVE_PAIR_SIZE);
            return;
        }

        List<String> messengerIpsToBeAdded = addRemoveMessengerIpsPair.get(0);
        List<String> messengerIpsToBeRemoved = addRemoveMessengerIpsPair.get(1);
        logger.info("[[mha={}]]try add messenger {}, remove messenger {}", mhaName, messengerIpsToBeAdded, messengerIpsToBeRemoved);

        List<String> messengerInstancesAdded = addMessengerInstances(messengerIpsToBeAdded, mhaTbl, messengerGroupId);
        List<String> messengerInstancesRemoved = removeMessengerInstances(messengerIpsToBeRemoved, mhaName, messengerGroupId, resourceTbls, messengerTbls);
        logger.info("added M:{}, removed M:{}", messengerInstancesAdded, messengerInstancesRemoved);
    }

    protected List<String> addMessengerInstances(List<String> messengerIpsToBeAdded, MhaTblV2 mhaTbl, Long messengerGroupId) {
        logger.info("[[mha={}]]try add messengers {}", mhaTbl.getMhaName(), messengerIpsToBeAdded);
        List<String> messengerInstancesAdded = Lists.newArrayList();
        String mhaName = mhaTbl.getMhaName();
        try {
            List<ResourceTbl> resourceTbls = resourceTblDao.queryByIps(messengerIpsToBeAdded);
            Map<String, ResourceTbl> ipMap = resourceTbls.stream().collect(Collectors.toMap(ResourceTbl::getIp, e -> e));
            for (String ip : messengerIpsToBeAdded) {
                logger.info("[[mha={}]]add messenger: {}", mhaName, ip);
                ResourceTbl resourceTbl = ipMap.get(ip);
                if (null == resourceTbl) {
                    logger.info("[[mha={}]]UNLIKELY-messenger resource({}) should already be loaded", mhaName, ip);
                    continue;
                }
                logger.info("[[mha={}]]configure messenger instance: {}", mhaName, ip);
                messengerTblDao.insertMessenger(DEFAULT_APPLIER_PORT, resourceTbl.getId(), messengerGroupId);
                messengerInstancesAdded.add(ip);
            }
        } catch (SQLException e) {
            throw ConsoleExceptionUtils.message(ReadableErrorDefEnum.DAO_TBL_EXCEPTION, e);
        }
        return messengerInstancesAdded;
    }

    protected List<String> removeMessengerInstances(
            List<String> messengerIpsToBeRemoved,
            String mhaName, Long messengerGroupId,
            List<ResourceTbl> resourceTbls,
            List<MessengerTbl> messengerTbls) {
        logger.info("[[mha={}]] try remove messengers {}", mhaName, messengerIpsToBeRemoved);
        List<String> messengerInstancesRemoved = Lists.newArrayList();
        if (messengerIpsToBeRemoved.size() != 0) {
            for (String ip : messengerIpsToBeRemoved) {
                logger.info("[[mha={}]]remove messenger: {}", mhaName, ip);
                ResourceTbl resourceTbl = resourceTbls.stream().filter(p -> ip.equalsIgnoreCase(p.getIp())).findFirst().orElse(null);
                if (null == resourceTbl) {
                    logger.info("[[mha={}]]UNLIKELY-messenger resource({}) should already be loaded", mhaName, ip);
                    continue;
                }
                MessengerTbl messengerTbl = messengerTbls.stream()
                        .filter(p -> (messengerGroupId.equals(p.getMessengerGroupId()))
                                && resourceTbl.getId().equals(p.getResourceId()))
                        .findFirst().orElse(null);
                try {
                    assert null != messengerTbl;
                    messengerTbl.setDeleted(BooleanEnum.TRUE.getCode());
                    messengerTblDao.update(messengerTbl);
                    messengerInstancesRemoved.add(ip);
                } catch (Throwable t) {
                    logger.error("[[mha={}]]Failed remove messenger {}", mhaName, ip, t);
                }
            }
        }
        return messengerInstancesRemoved;
    }

    protected List<List<String>> getRemoveAndAddInstanceIps(List<String> ipsInUse, List<String> ipsNewConfigured) {
        List<List<String>> addRemoveReplicatorIpsPair = Lists.newArrayList();

        List<String> toBeAdded = Lists.newArrayList(ipsNewConfigured);
        toBeAdded.removeAll(Lists.newArrayList(ipsInUse));
        addRemoveReplicatorIpsPair.add(toBeAdded);

        List<String> toBeRemoved = Lists.newArrayList(ipsInUse);
        toBeRemoved.removeAll(Lists.newArrayList(ipsNewConfigured));
        addRemoveReplicatorIpsPair.add(toBeRemoved);

        return addRemoveReplicatorIpsPair;
    }

    private List<DbReplicationFilterMappingTbl> getDbReplicationFilterMappings(List<Long> dbReplicationIds) throws Exception {
        if (CollectionUtils.isEmpty(dbReplicationIds)) {
            throw ConsoleExceptionUtils.message("dbReplicationIds are empty!");
        }
        List<DbReplicationTbl> dbReplicationTbls = dbReplicationTblDao.queryByIds(dbReplicationIds);
        if (CollectionUtils.isEmpty(dbReplicationTbls) || dbReplicationTbls.size() != dbReplicationIds.size()) {
            throw ConsoleExceptionUtils.message("dbReplications not exist!");
        }

        List<DbReplicationFilterMappingTbl> existFilterMappings = dbReplicationFilterMappingTblDao.queryByDbReplicationIds(dbReplicationIds);
        if (CollectionUtils.isEmpty(existFilterMappings)) {
            logger.error("dbReplicationFilterMapping not exist, dbReplicationIds: {}", dbReplicationIds);
            throw ConsoleExceptionUtils.message("dbReplicationFilterMapping not exist!");
        }
        return existFilterMappings;
    }

    private long insertRowsFilter(RowsFilterCreateParam param) throws Exception {
        RowsFilterTblV2 rowsFilter = param.extractRowsFilterTbl();
        List<RowsFilterTblV2> existRowsFilters = rowsFilterTblV2Dao.queryByMode(param.getMode());
        for (RowsFilterTblV2 existRowsFilter : existRowsFilters) {
            if (rowsFilter.getConfigs().equals(existRowsFilter.getConfigs())) {
                return existRowsFilter.getId();
            }
        }

        long rowsFilterId = rowsFilterTblV2Dao.insertReturnId(rowsFilter);
        return rowsFilterId;
    }


    private void insertDbReplicationFilterMappings(List<Long> dbReplicationIds, long filterId, int filterType) throws Exception {
        List<DbReplicationFilterMappingTbl> existFilterMappings = dbReplicationFilterMappingTblDao.queryByDbReplicationIds(dbReplicationIds);
        Map<Long, DbReplicationFilterMappingTbl> existFilterMappingMap = existFilterMappings.stream().collect(Collectors.toMap(DbReplicationFilterMappingTbl::getDbReplicationId, Function.identity()));

        List<DbReplicationFilterMappingTbl> insertFilterMappings = new ArrayList<>();
        List<DbReplicationFilterMappingTbl> updateFilterMappings = new ArrayList<>();
        for (long dbReplicationId : dbReplicationIds) {
            DbReplicationFilterMappingTbl dbReplicationFilterMappingTbl;
            if (existFilterMappingMap.containsKey(dbReplicationId)) {
                dbReplicationFilterMappingTbl = existFilterMappingMap.get(dbReplicationId);
                updateFilterMappings.add(dbReplicationFilterMappingTbl);
            } else {
                dbReplicationFilterMappingTbl = new DbReplicationFilterMappingTbl();
                dbReplicationFilterMappingTbl.setDbReplicationId(dbReplicationId);
                dbReplicationFilterMappingTbl.setDeleted(BooleanEnum.FALSE.getCode());
                insertFilterMappings.add(dbReplicationFilterMappingTbl);
            }

            switch (FilterTypeEnum.getByCode(filterType)) {
                case ROWS_FILTER:
                    dbReplicationFilterMappingTbl.setRowsFilterId(filterId);
                    break;
                case COLUMNS_FILTER:
                    dbReplicationFilterMappingTbl.setColumnsFilterId(filterId);
                    break;
                default:
                    break;
            }
        }

        if (!CollectionUtils.isEmpty(insertFilterMappings)) {
            logger.info("insertDbReplicationFilterMappings insertFilterMappings: {}", insertFilterMappings);
            dbReplicationFilterMappingTblDao.batchInsert(insertFilterMappings);
        }
        if (!CollectionUtils.isEmpty(updateFilterMappings)) {
            logger.info("insertDbReplicationFilterMappings updateFilterMappings: {}", updateFilterMappings);
            dbReplicationFilterMappingTblDao.batchUpdate(updateFilterMappings);
        }
    }

    private long insertColumnsFilter(int mode, List<String> columns) throws Exception {
        String columnsJson = JsonUtils.toJson(columns);
        List<ColumnsFilterTblV2> existColumnsFilters = columnFilterTblV2Dao.queryByMode(mode);
        for (ColumnsFilterTblV2 columnsFilter : existColumnsFilters) {
            if (columnsFilter.getColumns().equals(columnsJson)) {
                return columnsFilter.getId();
            }
        }

        ColumnsFilterTblV2 columnsFilterTblV2 = new ColumnsFilterTblV2();
        columnsFilterTblV2.setDeleted(BooleanEnum.FALSE.getCode());
        columnsFilterTblV2.setColumns(columnsJson);
        columnsFilterTblV2.setMode(mode);
        long columnsFilterId = columnFilterTblV2Dao.insertReturnId(columnsFilterTblV2);
        return columnsFilterId;
    }

    private List<DbReplicationTbl> insertDbReplications(long srcMhaId, long dstMhaId, List<String> dbList, String nameFilter) throws Exception {
        List<MhaDbMappingTbl> srcMhaDbMappings = mhaDbMappingTblDao.queryByMhaId(srcMhaId);
        List<MhaDbMappingTbl> dstMhaDbMappings = mhaDbMappingTblDao.queryByMhaId(dstMhaId);
        Map<Long, Long> srcMhaDbMappingMap = srcMhaDbMappings.stream().collect(Collectors.toMap(MhaDbMappingTbl::getDbId, MhaDbMappingTbl::getId));
        Map<Long, Long> dstMhaDbMappingMap = dstMhaDbMappings.stream().collect(Collectors.toMap(MhaDbMappingTbl::getDbId, MhaDbMappingTbl::getId));

        List<DbTbl> dbTbls = dbTblDao.queryByDbNames(dbList);
        Map<String, Long> dbMap = dbTbls.stream().collect(Collectors.toMap(DbTbl::getDbName, DbTbl::getId));

        List<DbReplicationTbl> dbReplicationTbls = new ArrayList<>();
        if (StringUtils.isBlank(nameFilter)) {
            dbReplicationTbls.addAll(buildDbReplications(dbList, dbMap, srcMhaDbMappingMap, dstMhaDbMappingMap, DEFAULT_TABLE_NAME));
        } else {
            String[] dbFullNames = nameFilter.split(Constants.ESCAPE_CHARACTER_DOT_REGEX);
            String srcTableName = dbFullNames[1];
            AviatorRegexFilter aviatorRegexFilter = new AviatorRegexFilter(dbFullNames[0]);
            List<String> dbNames = dbList.stream().filter(db -> aviatorRegexFilter.filter(db)).collect(Collectors.toList());

            dbReplicationTbls.addAll(buildDbReplications(dbNames, dbMap, srcMhaDbMappingMap, dstMhaDbMappingMap, srcTableName));
        }

        checkDbReplicationExist(dbReplicationTbls, srcMhaDbMappings, dstMhaDbMappings);
        dbReplicationTblDao.batchInsertWithReturnId(dbReplicationTbls);
        logger.info("insertDbReplications size: {}, dbReplicationTbls: {}", dbReplicationTbls.size(), dbReplicationTbls);
        return dbReplicationTbls;
    }

    private void checkDbReplicationExist(List<DbReplicationTbl> dbReplicationTbls,
                                         List<MhaDbMappingTbl> srcMhaDbMappings,
                                         List<MhaDbMappingTbl> dstMhaDbMappings) throws Exception {
        List<DbReplicationTbl> existDbReplications = getExistDbReplications(srcMhaDbMappings, dstMhaDbMappings);
        if (CollectionUtils.isEmpty(existDbReplications)) {
            return;
        }

        List<Long> existDbReplicationIds = new ArrayList<>();
        for (DbReplicationTbl dbReplicationTbl : dbReplicationTbls) {
            for (DbReplicationTbl existDbReplication : existDbReplications) {
                if (dbReplicationTbl.getSrcMhaDbMappingId().equals(existDbReplication.getSrcMhaDbMappingId())
                        && dbReplicationTbl.getDstMhaDbMappingId().equals(existDbReplication.getDstMhaDbMappingId())
                        && dbReplicationTbl.getSrcLogicTableName().equals(existDbReplication.getSrcLogicTableName())) {
                    existDbReplicationIds.add(existDbReplication.getId());
                }
            }
        }

        if (!CollectionUtils.isEmpty(existDbReplicationIds)) {
            logger.error("dbReplication already exist, existDbReplicationIds: {}", existDbReplicationIds);
            throw ConsoleExceptionUtils.message(String.format("dbReplication already exist, existDbReplicationIds: %s", existDbReplicationIds));
        }
    }

    private List<DbReplicationTbl> getExistDbReplications(List<MhaDbMappingTbl> srcMhaDbMappings, List<MhaDbMappingTbl> dstMhaDbMappings) throws Exception {
        List<Long> srcMhaDbMappingIds = srcMhaDbMappings.stream().map(MhaDbMappingTbl::getId).collect(Collectors.toList());
        List<Long> dstMhaDbMappingIds = dstMhaDbMappings.stream().map(MhaDbMappingTbl::getId).collect(Collectors.toList());

        List<DbReplicationTbl> existDbReplications = dbReplicationTblDao.queryByMappingIds(srcMhaDbMappingIds, dstMhaDbMappingIds, ReplicationTypeEnum.DB_TO_DB.getType());
        return existDbReplications;
    }

    private List<DbReplicationTbl> buildDbReplications(List<String> dbList,
                                                       Map<String, Long> dbMap,
                                                       Map<Long, Long> srcMhaDbMappingMap,
                                                       Map<Long, Long> dstMhaDbMappingMap,
                                                       String srcTableName) {
        List<DbReplicationTbl> dbReplicationTbls = new ArrayList<>();
        for (String dbName : dbList) {
            long dbId = dbMap.get(dbName);
            long srcMhaDbMappingId = srcMhaDbMappingMap.get(dbId);
            long dstMhaDbMappingId = dstMhaDbMappingMap.get(dbId);
            dbReplicationTbls.add(buildDbReplicationTbl(srcTableName, srcMhaDbMappingId, dstMhaDbMappingId, ReplicationTypeEnum.DB_TO_DB.getType()));
        }
        return dbReplicationTbls;
    }

    private DbReplicationTbl buildDbReplicationTbl(String srcTableName, long srcMhaDbMappingId, long dstMhaDbMappingId, int replicationType) {
        DbReplicationTbl dbReplicationTbl = new DbReplicationTbl();
        dbReplicationTbl.setSrcMhaDbMappingId(srcMhaDbMappingId);
        dbReplicationTbl.setDstMhaDbMappingId(dstMhaDbMappingId);
        dbReplicationTbl.setSrcLogicTableName(srcTableName);
        dbReplicationTbl.setDstLogicTableName("");
        dbReplicationTbl.setReplicationType(replicationType);
        dbReplicationTbl.setDeleted(BooleanEnum.FALSE.getCode());
        return dbReplicationTbl;
    }

    private void configureApplierGroup(long mhaReplicationId, String applierInitGtid, List<String> applierIps) throws Exception {
        long applierGroupId = insertOrUpdateApplierGroup(mhaReplicationId, applierInitGtid);
        configureAppliers(applierGroupId, applierIps);
    }

    private void configureAppliers(long applierGroupId, List<String> applierIps) throws Exception {
        List<ApplierTblV2> existAppliers = applierTblDao.queryByApplierGroupId(applierGroupId, BooleanEnum.FALSE.getCode());
        if (!CollectionUtils.isEmpty(existAppliers)) {
            logger.info("delete appliers: {}", existAppliers);
            existAppliers.forEach(e -> e.setDeleted(BooleanEnum.TRUE.getCode()));
            applierTblDao.batchUpdate(existAppliers);
        }

        if (CollectionUtils.isEmpty(applierIps)) {
            return;
        }

        List<ResourceTbl> resourceTbls = resourceTblDao.queryByIps(applierIps);
        Map<String, Long> resourceTblMap = resourceTbls.stream().collect(Collectors.toMap(ResourceTbl::getIp, ResourceTbl::getId));

        List<ApplierTblV2> applierTbls = applierIps.stream().map(ip -> {
            ApplierTblV2 applierTbl = new ApplierTblV2();
            applierTbl.setApplierGroupId(applierGroupId);
            applierTbl.setPort(ConsoleConfig.DEFAULT_APPLIER_PORT);
            applierTbl.setMaster(BooleanEnum.FALSE.getCode());
            applierTbl.setResourceId(resourceTblMap.get(ip));
            applierTbl.setDeleted(BooleanEnum.FALSE.getCode());

            return applierTbl;
        }).collect(Collectors.toList());

        logger.info("insert applierIps: {}", applierIps);
        applierTblDao.batchInsert(applierTbls);
    }

    private long insertOrUpdateApplierGroup(long mhaReplicationId, String applierInitGtid) throws Exception {
        long applierGroupId;
        ApplierGroupTblV2 existApplierGroup = applierGroupTblDao.queryByMhaReplicationId(mhaReplicationId);
        if (existApplierGroup == null) {
            logger.info("buildDrc insert applierGroup, mhaReplicationId: {}", mhaReplicationId);
            ApplierGroupTblV2 applierGroupTbl = new ApplierGroupTblV2();
            applierGroupTbl.setMhaReplicationId(mhaReplicationId);
            applierGroupTbl.setGtidInit(applierInitGtid);
            applierGroupTbl.setDeleted(BooleanEnum.FALSE.getCode());

            applierGroupId = applierGroupTblDao.insertWithReturnId(applierGroupTbl);
        } else {
            applierGroupId = existApplierGroup.getId();
            existApplierGroup.setGtidInit(applierInitGtid);
            existApplierGroup.setDeleted(BooleanEnum.FALSE.getCode());
            applierGroupTblDao.update(existApplierGroup);
        }
        return applierGroupId;
    }

    private void configureReplicatorGroup(MhaTblV2 mhaTblV2, String replicatorInitGtid, List<String> replicatorIps) throws Exception {
        long replicatorGroupId = insertOrUpdateReplicatorGroup(mhaTblV2.getId());
        configureReplicators(mhaTblV2.getMhaName(), replicatorGroupId, replicatorInitGtid, replicatorIps);
    }

    private void configureReplicators(String mhaName, long replicatorGroupId, String replicatorInitGtid, List<String> replicatorIps) throws Exception {
        List<ReplicatorTbl> existReplicators = replicatorTblDao.queryByRGroupIds(Lists.newArrayList(replicatorGroupId), BooleanEnum.FALSE.getCode());
        if (!CollectionUtils.isEmpty(existReplicators)) {
            logger.info("delete replicators: {}", existReplicators);
            existReplicators.forEach(e -> e.setDeleted(BooleanEnum.TRUE.getCode()));
            replicatorTblDao.batchUpdate(existReplicators);
        }

        if (CollectionUtils.isEmpty(replicatorIps)) {
            return;
        }
        List<ResourceTbl> resourceTbls = resourceTblDao.queryByIps(replicatorIps);
        Map<String, Long> resourceTblMap = resourceTbls.stream().collect(Collectors.toMap(ResourceTbl::getIp, ResourceTbl::getId));

        List<ReplicatorTbl> replicatorTbls = new ArrayList<>();
        for (String ip : replicatorIps) {
            ReplicatorTbl replicatorTbl = new ReplicatorTbl();
            replicatorTbl.setRelicatorGroupId(replicatorGroupId);
            String gtidInit = StringUtils.isNotBlank(replicatorInitGtid) ? formatGtid(replicatorInitGtid) : getNativeGtid(mhaName);
            replicatorTbl.setGtidInit(gtidInit);
            replicatorTbl.setResourceId(resourceTblMap.get(ip));
            replicatorTbl.setPort(ConsoleConfig.DEFAULT_REPLICATOR_PORT);
            replicatorTbl.setApplierPort(metaInfoService.findAvailableApplierPort(ip));
            replicatorTbl.setMaster(BooleanEnum.FALSE.getCode());
            replicatorTbl.setDeleted(BooleanEnum.FALSE.getCode());

            replicatorTbls.add(replicatorTbl);
        }

        logger.info("insert replicatorIps: {}", replicatorIps);
        replicatorTblDao.batchInsert(replicatorTbls);
    }

    private String formatGtid(String gtid) {
        if (gtid == null) {
            return null;
        }
        gtid = gtid.replace("#", "");
        return XmlUtils.replaceBlank(gtid);
    }

    public String getNativeGtid(String mhaName) {
        Endpoint endpoint = cacheMetaService.getMasterEndpoint(mhaName);
        return MySqlUtils.getExecutedGtid(endpoint);
    }

    private long insertOrUpdateReplicatorGroup(long mhaId) throws Exception {
        long replicatorGroupId;
        ReplicatorGroupTbl existReplicatorGroup = replicatorGroupTblDao.queryByMhaId(mhaId);
        if (existReplicatorGroup == null) {
            logger.info("buildDrc insert replicatorGroup, mhaId: {}", mhaId);
            ReplicatorGroupTbl replicatorGroupTbl = new ReplicatorGroupTbl();
            replicatorGroupTbl.setMhaId(mhaId);
            replicatorGroupTbl.setDeleted(BooleanEnum.FALSE.getCode());
            return replicatorGroupTblDao.insertWithReturnId(replicatorGroupTbl);
        } else {
            replicatorGroupId = existReplicatorGroup.getId();
            if (existReplicatorGroup.getDeleted().equals(BooleanEnum.TRUE.getCode())) {
                existReplicatorGroup.setDeleted(BooleanEnum.FALSE.getCode());
                replicatorGroupTblDao.update(existReplicatorGroup);
            }
        }
        return replicatorGroupId;
    }

    private void insertMhaReplication(long srcMhaId, long dstMhaId) throws Exception {
        MhaReplicationTbl existMhaReplication = mhaReplicationTblDao.queryByMhaId(srcMhaId, dstMhaId);
        if (existMhaReplication != null) {
            if (existMhaReplication.getDeleted().equals(BooleanEnum.FALSE.getCode())) {
                logger.info("mhaReplication already exist, srcMhaId: {}, dstMhaId: {}", srcMhaId, dstMhaId);
                return;
            } else {
                existMhaReplication.setDeleted(BooleanEnum.FALSE.getCode());
                logger.info("recover mhaReplication, srcMhaId: {}, dstMhaId: {}", srcMhaId, dstMhaId);
                mhaReplicationTblDao.update(existMhaReplication);
            }

        } else {
            MhaReplicationTbl mhaReplicationTbl = new MhaReplicationTbl();
            mhaReplicationTbl.setSrcMhaId(srcMhaId);
            mhaReplicationTbl.setDstMhaId(dstMhaId);
            mhaReplicationTbl.setDeleted(BooleanEnum.FALSE.getCode());
            mhaReplicationTbl.setDrcStatus(BooleanEnum.FALSE.getCode());

            logger.info("insertMhaReplication srcMhaId: {}, dstMhaId: {}", srcMhaId, dstMhaId);
            mhaReplicationTblDao.insert(mhaReplicationTbl);
        }
    }

    private long insertMha(MhaTblV2 mhaTblV2) throws Exception {
        MhaTblV2 existMhaTbl = mhaTblDao.queryByMhaName(mhaTblV2.getMhaName());
        if (null == existMhaTbl) {
            return mhaTblDao.insertWithReturnId(mhaTblV2);
        } else if (existMhaTbl.getDeleted().equals(BooleanEnum.TRUE.getCode())) {
            existMhaTbl.setDeleted(BooleanEnum.FALSE.getCode());
            mhaTblDao.update(existMhaTbl);
        }
        return existMhaTbl.getId();
    }

    private MhaTblV2 buildMhaTbl(String mhaName, long dcId, long buId) {
        String clusterName = mhaName + CLUSTER_NAME_SUFFIX;
        MhaTblV2 mhaTblV2 = new MhaTblV2();
        mhaTblV2.setMhaName(mhaName);
        mhaTblV2.setDcId(dcId);
        mhaTblV2.setApplyMode(ApplyMode.transaction_table.getType());
        mhaTblV2.setMonitorSwitch(BooleanEnum.FALSE.getCode());
        mhaTblV2.setBuId(buId);
        mhaTblV2.setClusterName(clusterName);
        mhaTblV2.setAppId(-1L);
        mhaTblV2.setDeleted(BooleanEnum.FALSE.getCode());

        mhaTblV2.setReadUser(monitorTableSourceProvider.getReadUserVal());
        mhaTblV2.setReadPassword(monitorTableSourceProvider.getReadPasswordVal());
        mhaTblV2.setWriteUser(monitorTableSourceProvider.getWriteUserVal());
        mhaTblV2.setWritePassword(monitorTableSourceProvider.getWritePasswordVal());
        mhaTblV2.setMonitorUser(monitorTableSourceProvider.getMonitorUserVal());
        mhaTblV2.setMonitorPassword(monitorTableSourceProvider.getMonitorPasswordVal());

        return mhaTblV2;
    }

    private void checkDrcBuildParam(DrcBuildParam param) {
        PreconditionUtils.checkNotNull(param);
        PreconditionUtils.checkString(param.getSrcBuildParam().getMhaName(), "srcMhaName requires not empty!");
        PreconditionUtils.checkString(param.getDstBuildParam().getMhaName(), "dstMhaName requires not empty!");
        PreconditionUtils.checkArgument(!param.getSrcBuildParam().getMhaName().equals(param.getDstBuildParam().getMhaName()), "srcMha and dstMha are same!");
    }

    private void checkDrcMhaBuildParam(DrcMhaBuildParam param) {
        PreconditionUtils.checkNotNull(param);
        PreconditionUtils.checkString(param.getSrcMhaName(), "srcMhaName requires not empty!");
        PreconditionUtils.checkString(param.getDstMhaName(), "dstMhaName requires not empty!");
        PreconditionUtils.checkString(param.getBuName(), "buName requires not null!");
        PreconditionUtils.checkString(param.getSrcDc(), "srcDc requires not null!");
        PreconditionUtils.checkString(param.getDstDc(), "dstDcId requires not null!");
    }

    private void checkDbReplicationBuildParam(DbReplicationBuildParam param) {
        PreconditionUtils.checkNotNull(param);
        PreconditionUtils.checkString(param.getSrcMhaName(), "srcMhaName requires not empty!");
        PreconditionUtils.checkString(param.getDstMhaName(), "dstMhaName requires not empty!");
        PreconditionUtils.checkString(param.getDbName(), "dbName requires not empty!");
        PreconditionUtils.checkString(param.getTableName(), "tableName requires not empty!");
    }

    private void checkColumnsFilterCreateParam(ColumnsFilterCreateParam param) {
        PreconditionUtils.checkArgument(!CollectionUtils.isEmpty(param.getDbReplicationIds()), "dbReplicationIds require not empty!");
        PreconditionUtils.checkArgument(!CollectionUtils.isEmpty(param.getColumns()), "columns require not empty!");
        PreconditionUtils.checkArgument(ColumnsFilterModeEnum.checkMode(param.getMode()), "columnsFilter mode not support!");
    }

    private void checkRowsFilterCreateParam(RowsFilterCreateParam param) {
        PreconditionUtils.checkArgument(!CollectionUtils.isEmpty(param.getDbReplicationIds()), "dbReplicationIds require not empty!");
        PreconditionUtils.checkArgument(RowsFilterModeEnum.checkMode(param.getMode()), "rowsFilter mode not support!");
    }
}
