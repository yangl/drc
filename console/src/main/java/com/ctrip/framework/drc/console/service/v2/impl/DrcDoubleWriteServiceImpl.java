package com.ctrip.framework.drc.console.service.v2.impl;

import com.ctrip.framework.drc.console.config.DefaultConsoleConfig;
import com.ctrip.framework.drc.console.dao.*;
import com.ctrip.framework.drc.console.dao.entity.*;
import com.ctrip.framework.drc.console.dao.entity.v2.*;
import com.ctrip.framework.drc.console.dao.v2.*;
import com.ctrip.framework.drc.console.enums.*;
import com.ctrip.framework.drc.console.param.v2.MhaDbMappingMigrateParam;
import com.ctrip.framework.drc.console.service.DrcBuildService;
import com.ctrip.framework.drc.console.service.v2.DrcDoubleWriteService;
import com.ctrip.framework.drc.console.service.v2.MetaMigrateService;
import com.ctrip.framework.drc.console.utils.ConsoleExceptionUtils;
import com.ctrip.framework.drc.console.vo.response.migrate.MigrateResult;
import com.ctrip.framework.drc.core.monitor.reporter.DefaultEventMonitorHolder;
import com.ctrip.framework.drc.core.monitor.reporter.EventMonitor;
import com.ctrip.framework.drc.core.server.common.filter.table.aviator.AviatorRegexFilter;
import com.ctrip.framework.drc.core.server.utils.ThreadUtils;
import com.ctrip.framework.drc.core.service.utils.Constants;
import com.ctrip.platform.dal.dao.DalHints;
import com.ctrip.platform.dal.dao.annotation.DalTransactional;
import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import com.google.common.util.concurrent.ListeningExecutorService;
import com.google.common.util.concurrent.MoreExecutors;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Created by dengquanliang
 * 2023/7/5 15:01
 */
@Service
public class DrcDoubleWriteServiceImpl implements DrcDoubleWriteService {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private MhaTblV2Dao mhaTblV2Dao;
    @Autowired
    private MhaTblDao mhaTblDao;
    @Autowired
    private MhaGroupTblDao mhaGroupTblDao;
    @Autowired
    private GroupMappingTblDao groupMappingTblDao;
    @Autowired
    private ClusterTblDao clusterTblDao;
    @Autowired
    private ClusterMhaMapTblDao clusterMhaMapTblDao;
    @Autowired
    private MhaReplicationTblDao mhaReplicationTblDao;
    @Autowired
    private ApplierGroupTblV2Dao applierGroupTblV2Dao;
    @Autowired
    private ApplierGroupTblDao applierGroupTblDao;
    @Autowired
    private ApplierTblDao applierTblDao;
    @Autowired
    private ApplierTblV2Dao applierTblV2Dao;
    @Autowired
    private DbReplicationTblDao dbReplicationTblDao;
    @Autowired
    private MhaDbMappingTblDao mhaDbMappingTblDao;
    @Autowired
    private DbTblDao dbTblDao;
    @Autowired
    private DcTblDao dcTblDao;
    @Autowired
    private ReplicatorGroupTblDao replicatorGroupTblDao;
    @Autowired
    private DataMediaTblDao dataMediaTblDao;
    @Autowired
    private DataMediaPairTblDao dataMediaPairTblDao;
    @Autowired
    private MessengerGroupTblDao messengerGroupTblDao;
    @Autowired
    private MessengerTblDao messengerTblDao;
    @Autowired
    private MessengerFilterTblDao messengerFilterTblDao;
    @Autowired
    private RowsFilterMappingTblDao rowsFilterMappingTblDao;
    @Autowired
    private RegionTblDao regionTblDao;
    @Autowired
    private ColumnsFilterTblDao columnsFilterTblDao;
    @Autowired
    private ColumnsFilterTblV2Dao columnFilterTblV2Dao;
    @Autowired
    private RowsFilterTblDao rowsFilterTblDao;
    @Autowired
    private RowsFilterTblV2Dao rowsFilterTblV2Dao;
    @Autowired
    private DbReplicationFilterMappingTblDao dbReplicationFilterMappingTblDao;
    @Autowired
    private DrcBuildService drcBuildService;
    @Autowired
    private DefaultConsoleConfig defaultConsoleConfig;
    @Autowired
    private MetaMigrateService metaMigrateService;

    private EventMonitor eventMonitor = DefaultEventMonitorHolder.getInstance();
    private final ListeningExecutorService drcDoubleWriteExecutorService = MoreExecutors.listeningDecorator(ThreadUtils.newFixedThreadPool(5, "drcDoubleWrite"));
    private static final int TIME_OUT = 10;
    private static final int GROUP_SIZE = 2;
    private static final String DEFAULT_TABLE_NAME = ".*";

    @Override
    public void buildMha(Long mhaGroupId) throws Exception {
        logger.info("drc double write buildMha, mhaGroupId: {}", mhaGroupId);
        MhaGroupTbl mhaGroup = mhaGroupTblDao.queryById(mhaGroupId);
        List<GroupMappingTbl> groupMappings = groupMappingTblDao.queryByMhaGroupIds(Lists.newArrayList(mhaGroupId), BooleanEnum.FALSE.getCode());
        if (CollectionUtils.isEmpty(groupMappings) || groupMappings.size() != GROUP_SIZE) {
            logger.error("groupMapping not exist or contains more than 2 mha, mhaGroupId: {}", mhaGroupId);
            throw ConsoleExceptionUtils.message("groupMapping not exist or contains more than 2 mha");
        }
        long mhaId0 = groupMappings.get(0).getMhaId();
        long mhaId1 = groupMappings.get(1).getMhaId();

        MhaTbl mha0 = mhaTblDao.queryById(mhaId0);
        MhaTbl mha1 = mhaTblDao.queryById(mhaId1);
        if (mha0 == null || mha1 == null) {
            logger.error("mha not exist, mhaGroupId: {}, mhaId0: {}, mhaId1: {}", mhaGroupId, mhaId0, mhaId1);
            throw ConsoleExceptionUtils.message("mha not exist");
        }

        ClusterMhaMapTbl clusterMhaMap0 = clusterMhaMapTblDao.queryByMhaIds(Lists.newArrayList(mhaId0), BooleanEnum.FALSE.getCode()).get(0);
        ClusterMhaMapTbl clusterMhaMap1 = clusterMhaMapTblDao.queryByMhaIds(Lists.newArrayList(mhaId1), BooleanEnum.FALSE.getCode()).get(0);
        ClusterTbl clusterTbl0 = clusterTblDao.queryById(clusterMhaMap0.getClusterId());
        ClusterTbl clusterTbl1 = clusterTblDao.queryById(clusterMhaMap1.getClusterId());

        MhaTblV2 newMha0 = buildMhaTblV2(mha0, mhaGroup, clusterTbl0);
        MhaTblV2 newMha1 = buildMhaTblV2(mha1, mhaGroup, clusterTbl1);
        insertOrUpdateMha(newMha0);
        insertOrUpdateMha(newMha1);
    }

    @Override
    public void buildApplierGroup(Long applierGroupId) throws Exception {
        logger.info("drc double write buildApplierGroup, applierGroupId: {}", applierGroupId);
        ApplierGroupTbl applierGroupTbl = applierGroupTblDao.queryById(applierGroupId);
        ApplierGroupTblV2 existApplierGroup = applierGroupTblV2Dao.queryById(applierGroupId);

        ApplierGroupTblV2 newApplierGroupTbl = new ApplierGroupTblV2();
        newApplierGroupTbl.setId(applierGroupTbl.getId());
        newApplierGroupTbl.setMhaReplicationId(-1L);
        newApplierGroupTbl.setGtidInit(applierGroupTbl.getGtidExecuted());
        newApplierGroupTbl.setDeleted(BooleanEnum.FALSE.getCode());
        if (existApplierGroup != null) {
            applierGroupTblV2Dao.update(newApplierGroupTbl);
        } else {
            applierGroupTblV2Dao.insert(new DalHints().enableIdentityInsert(), newApplierGroupTbl);
        }

    }

    @Override
    @DalTransactional(logicDbName = "fxdrcmetadb_w")
    public void buildAppliers(Long applierGroupId) throws Exception {
        logger.info("drc double write buildAppliers, applierGroupId: {}", applierGroupId);
        List<ApplierTbl> applierTbls = applierTblDao.queryByApplierGroupIds(Lists.newArrayList(applierGroupId), BooleanEnum.FALSE.getCode());
        List<ApplierTblV2> existApplierTbls = applierTblV2Dao.queryByApplierGroupId(applierGroupId);
        List<Long> existApplierIds = existApplierTbls.stream().map(ApplierTblV2::getId).collect(Collectors.toList());

        if (!CollectionUtils.isEmpty(existApplierTbls)) {
            existApplierTbls.forEach(e -> {
                e.setDeleted(BooleanEnum.TRUE.getCode());
            });
            applierTblV2Dao.batchUpdate(existApplierTbls);
        }

        if (!CollectionUtils.isEmpty(applierTbls)) {
            for (ApplierTbl applierTbl : applierTbls) {
                ApplierTblV2 applierTblV2 = buildApplier(applierTbl);
                if (existApplierIds.contains(applierTblV2.getId())) {
                    applierTblV2Dao.update(applierTblV2);
                } else {
                    applierTblV2Dao.insert(new DalHints().enableIdentityInsert(), applierTblV2);
                }
            }
        }
    }

    @Override
    @DalTransactional(logicDbName = "fxdrcmetadb_w")
    public void buildMhaAndDbReplication(Long applierGroupId) throws Exception {
        logger.info("drc double write buildMhaReplication, applierGroupId: {}", applierGroupId);

        ApplierGroupTbl applierGroupTbl = applierGroupTblDao.queryById(applierGroupId);
        Pair<MhaTblV2, MhaTblV2> mhaPair = getMhaPair(applierGroupId);
        MhaTblV2 srcMha = mhaPair.getLeft();
        MhaTblV2 dstMha = mhaPair.getRight();
        List<ApplierTbl> applierTbls = applierTblDao.queryByApplierGroupIds(Lists.newArrayList(applierGroupId), BooleanEnum.FALSE.getCode());

        List<String> dbList = insertMhaDbMappings(applierGroupTbl, srcMha, dstMha);
        List<MhaDbMappingTbl> srcMhaDbMappings = mhaDbMappingTblDao.queryByMhaId(srcMha.getId());
        List<MhaDbMappingTbl> dstMhaDbMappings = mhaDbMappingTblDao.queryByMhaId(dstMha.getId());

        deleteReplication(srcMha.getId(), dstMha.getId(), srcMhaDbMappings, dstMhaDbMappings);

        if (CollectionUtils.isEmpty(applierTbls)) {
            logger.info("applierTbls is empty, applierGroupId: {}", applierGroupId);
            return;
        }

        long mhaReplicationId = insertOrUpdateMhaReplication(srcMha.getId(), applierGroupTbl.getMhaId());
        ApplierGroupTblV2 applierGroupTblV2 = applierGroupTblV2Dao.queryById(applierGroupId);
        applierGroupTblV2.setMhaReplicationId(mhaReplicationId);
        applierGroupTblV2Dao.update(applierGroupTblV2);

        List<DbReplicationTbl> dbReplicationTbls = insertDbReplications(applierGroupTbl, srcMhaDbMappings, dstMhaDbMappings, dbList);
        insertDbReplicationFilterMapping(dbReplicationTbls, applierGroupTbl, srcMhaDbMappings, dbList);
    }

    @Override
    @DalTransactional(logicDbName = "fxdrcmetadb_w")
    public void insertRowsFilter(Long applierGroupId, Long dataMediaId, Long rowsFilterId) throws Exception {
        logger.info("drc double write insertRowsFilter, applierGroupId: {}, dataMediaId: {}, rowsFilterId: {}", applierGroupId, dataMediaId, rowsFilterId);
        RowsFilterTbl rowsFilterTbl = rowsFilterTblDao.queryById(rowsFilterId, BooleanEnum.FALSE.getCode());
        Long newRowsFilterId = insertRowsFilter(rowsFilterTbl);

        List<Long> dbReplicationIds = getDbReplicationId(applierGroupId, dataMediaId);
        if (CollectionUtils.isEmpty(dbReplicationIds)) {
            throw ConsoleExceptionUtils.message("rowsFilter and nameFilter not match");
        }
        insertDbReplicationFilterMappings(applierGroupId, dataMediaId, newRowsFilterId, FilterTypeEnum.ROWS_FILTER.getCode());
    }

    @Override
    public void deleteRowsFilter(Long rowsFilterMappingId) throws Exception {
        logger.info("drc double write deleteRowsFilter, rowsFilterMappingId: {}", rowsFilterMappingId);
        RowsFilterMappingTbl rowFilterMappingTbl = rowsFilterMappingTblDao.queryById(rowsFilterMappingId);
        List<Long> dbReplicationIds = getDbReplicationId(rowFilterMappingTbl.getApplierGroupId(), rowFilterMappingTbl.getDataMediaId());
        if (CollectionUtils.isEmpty(dbReplicationIds)) {
            logger.error("rowsFilter and nameFilter not match, rowsFilterMappingId: {}", rowsFilterMappingId);
            throw ConsoleExceptionUtils.message("rowsFilter and nameFilter not match");
        }

        List<DbReplicationFilterMappingTbl> existFilterMappings = dbReplicationFilterMappingTblDao.queryByDbReplicationIds(dbReplicationIds);
        if (CollectionUtils.isEmpty(existFilterMappings)) {
            logger.error("DbReplicationFilterMapping not exist, rowsFilterMappingId: {}, dbReplicationIds: {}", rowsFilterMappingId, dbReplicationIds);
            throw ConsoleExceptionUtils.message("DbReplicationFilterMapping not exist");
        }

        existFilterMappings.forEach(e -> e.setDeleted(BooleanEnum.TRUE.getCode()));
        dbReplicationFilterMappingTblDao.batchUpdate(existFilterMappings);
    }

    @Override
    @DalTransactional(logicDbName = "fxdrcmetadb_w")
    public void insertOrUpdateColumnsFilter(Long dataMediaId) throws Exception {
        logger.info("drc double write insertOrUpdateColumnsFilter, dataMediaId: {}", dataMediaId);
        DataMediaTbl dataMediaTbl = dataMediaTblDao.queryById(dataMediaId);
        ColumnsFilterTbl columnsFilterTbl = columnsFilterTblDao.queryByDataMediaId(dataMediaId, BooleanEnum.FALSE.getCode());
        if (columnsFilterTbl == null) {
            logger.error("columnsFilter not exist, dataMediaId: {}", dataMediaId);
            throw ConsoleExceptionUtils.message("columnsFilter not exist!");
        }

        Long columnsFilterId = insertColumnsFilter(columnsFilterTbl);
        insertDbReplicationFilterMappings(dataMediaTbl.getApplierGroupId(), dataMediaId, columnsFilterId, FilterTypeEnum.COLUMNS_FILTER.getCode());
    }

    @Override
    public void deleteColumnsFilter(Long dataMediaId) throws Exception {
        logger.info("drc double write deleteColumnsFilter, dataMediaId: {}", dataMediaId);
        DataMediaTbl dataMediaTbl = dataMediaTblDao.queryById(dataMediaId);
        List<Long> dbReplicationIds = getDbReplicationId(dataMediaTbl.getApplierGroupId(), dataMediaId);
        if (CollectionUtils.isEmpty(dbReplicationIds)) {
            logger.error("dbReplications not exist, applierGroupId: {}, dataMediaId: {}", dataMediaTbl.getApplierGroupId(), dataMediaId);
            throw ConsoleExceptionUtils.message("dbReplications not exist");
        }
        List<DbReplicationFilterMappingTbl> existFilterMappings = dbReplicationFilterMappingTblDao.queryByDbReplicationIds(dbReplicationIds);
        if (CollectionUtils.isEmpty(existFilterMappings)) {
            logger.error("DbReplicationFilterMapping not exist, dataMediaId: {}, dbReplicationIds: {}", dataMediaId, dbReplicationIds);
            throw ConsoleExceptionUtils.message("DbReplicationFilterMapping not exist");
        }

        existFilterMappings.forEach(e -> e.setDeleted(BooleanEnum.TRUE.getCode()));
        dbReplicationFilterMappingTblDao.batchUpdate(existFilterMappings);
    }

    @Override
    public void buildMhaForMq(Long mhaId) throws Exception {
        logger.info("drc double write buildMhaForMq, mhaId: {}", mhaId);
        MhaTbl mhaTbl = mhaTblDao.queryById(mhaId);
        if (mhaTbl == null) {
            logger.error("mha not exist, mhaId: {}", mhaId);
            throw ConsoleExceptionUtils.message("mha not exist");
        }

        List<ClusterMhaMapTbl> clusterMhaMapTbls = clusterMhaMapTblDao.queryByMhaIds(Lists.newArrayList(mhaId), BooleanEnum.FALSE.getCode());
        List<GroupMappingTbl> groupMappingTbls = groupMappingTblDao.queryByMhaIds(Lists.newArrayList(mhaId), BooleanEnum.FALSE.getCode());
        if (CollectionUtils.isEmpty(clusterMhaMapTbls) || CollectionUtils.isEmpty(groupMappingTbls)) {
            logger.error("clusterMhaMapTbls or groupMappingTbls is empty, mhaId: {}", mhaId);
            throw ConsoleExceptionUtils.message("clusterMhaMap or groupMapping is empty");
        }

        ClusterTbl clusterTbl = clusterTblDao.queryById(clusterMhaMapTbls.get(0).getClusterId());
        MhaGroupTbl mhaGroupTbl = mhaGroupTblDao.queryById(groupMappingTbls.get(0).getMhaGroupId());
        MhaTblV2 mhaTblV2 = buildMhaTblV2(mhaTbl, mhaGroupTbl, clusterTbl);
        insertOrUpdateMha(mhaTblV2);
    }

    @Override
    @DalTransactional(logicDbName = "fxdrcmetadb_w")
    public void insertDbReplicationForMq(Long dataMediaPairId) throws Exception {
        logger.info("drc double write insertDbReplicationForMq, dataMediaPairId: {}", dataMediaPairId);
        DataMediaPairTbl dataMediaPairTbl = dataMediaPairTblDao.queryById(dataMediaPairId);
        if (dataMediaPairTbl == null) {
            logger.error("dataMediaPairTbl not exist, dataMediaPairId: {}", dataMediaPairId);
            throw ConsoleExceptionUtils.message("dataMediaPairTbl not exist");
        }
        MessengerGroupTbl messengerGroupTbl = messengerGroupTblDao.queryById(dataMediaPairTbl.getGroupId());
        if (messengerGroupTbl == null) {
            logger.error("messengerGroupTbl not exist, dataMediaPairId: {}, messengerGroupId: {}", dataMediaPairId, dataMediaPairTbl.getGroupId());
            throw ConsoleExceptionUtils.message("messengerGroupTbl not exist");
        }

        List<MessengerTbl> messengerTbls = messengerTblDao.queryByGroupId(messengerGroupTbl.getId());
        if (CollectionUtils.isEmpty(messengerTbls)) {
            logger.info("messenger not configured yet, dataMediaPairIdL {}, messengerGroupId: {}", dataMediaPairId, messengerGroupTbl.getId());
            return;
        }

        MhaTblV2 mhaTblV2 = mhaTblV2Dao.queryById(messengerGroupTbl.getMhaId());
        if (defaultConsoleConfig.getVpcMhaNames().contains(mhaTblV2.getMhaName())) {
            logger.info("buildDbReplicationForMq ignore vpcMha: {}", mhaTblV2.getMhaName());
            return;
        }

        insertMhaDbMappings(mhaTblV2.getMhaName(), dataMediaPairTbl.getSrcDataMediaName());
        Long messengerFilterId = insertMessengerFilter(dataMediaPairTbl);
        List<Long> dbReplicationIds = insertMessengerDbReplications(messengerGroupTbl, dataMediaPairTbl);

        List<DbReplicationFilterMappingTbl> dbReplicationFilterMappings = dbReplicationIds.stream()
                .map(dbReplicationId -> buildDbReplicationFilterMappingTbl(dbReplicationId, -1L, -1L, messengerFilterId))
                .collect(Collectors.toList());

        logger.info("batchInsert dbReplicationFilterMappings: {}", dbReplicationFilterMappings);
        dbReplicationFilterMappingTblDao.batchInsert(dbReplicationFilterMappings);
    }

    @Override
    @DalTransactional(logicDbName = "fxdrcmetadb_w")
    public void deleteDbReplicationForMq(Long dataMediaPairId) throws Exception {
        logger.info("drc double write deleteDbReplicationForMq, dataMediaPairId: {}", dataMediaPairId);
        DataMediaPairTbl dataMediaPairTbl = dataMediaPairTblDao.queryById(dataMediaPairId);
        if (dataMediaPairTbl == null) {
            logger.error("dataMediaPairTbl not exist, dataMediaPairId: {}", dataMediaPairId);
            throw ConsoleExceptionUtils.message("dataMediaPairTbl not exist");
        }
        MessengerGroupTbl messengerGroupTbl = messengerGroupTblDao.queryById(dataMediaPairTbl.getGroupId());
        if (messengerGroupTbl == null) {
            logger.error("messengerGroupTbl not exist, dataMediaPairId: {}, messengerGroupId: {}", dataMediaPairId, dataMediaPairTbl.getGroupId());
            throw ConsoleExceptionUtils.message("messengerGroupTbl not exist");
        }

        List<MessengerTbl> messengerTbls = messengerTblDao.queryByGroupId(messengerGroupTbl.getId());
        if (CollectionUtils.isEmpty(messengerTbls)) {
            logger.info("messenger not configured yet, dataMediaPairIdL {}, messengerGroupId: {}", dataMediaPairId, messengerGroupTbl.getId());
            return;
        }

        MhaTblV2 mhaTblV2 = mhaTblV2Dao.queryById(messengerGroupTbl.getMhaId());
        if (defaultConsoleConfig.getVpcMhaNames().contains(mhaTblV2.getMhaName())) {
            logger.info("deleteDbReplicationForMq ignore vpcMha: {}", mhaTblV2.getMhaName());
            return;
        }

        List<Long> dbReplicationIds = deleteMessengerDbReplications(messengerGroupTbl, dataMediaPairTbl);
        List<DbReplicationFilterMappingTbl> dbReplicationFilterMappingTbls = dbReplicationFilterMappingTblDao.queryByDbReplicationIds(dbReplicationIds);
        dbReplicationFilterMappingTbls.forEach(e -> e.setDeleted(BooleanEnum.TRUE.getCode()));
        logger.info("update dbReplicationFilterMappingTbls set deleted true, size: {}, dbReplicationFilterMappingTbls: {}", dbReplicationFilterMappingTbls.size(), dbReplicationFilterMappingTbls);
        dbReplicationFilterMappingTblDao.batchUpdate(dbReplicationFilterMappingTbls);
    }

    @Override
    @DalTransactional(logicDbName = "fxdrcmetadb_w")
    public void buildDbReplicationForMq(Long mhaId) throws Exception {
        logger.info("drc double write buildDbReplicationForMq, mhaId: {}", mhaId);
//        deleteDbReplications(mhaId);

        MessengerGroupTbl messengerGroupTbl = messengerGroupTblDao.queryByMhaId(mhaId, BooleanEnum.FALSE.getCode());
        List<MessengerTbl> messengerTbls = messengerTblDao.queryByGroupId(messengerGroupTbl.getId());
        if (CollectionUtils.isEmpty(messengerTbls)) {
            logger.info("messenger not configured yet, mhaId: {}", mhaId);
            return;
        }

        List<DataMediaPairTbl> dataMediaPairTbls = dataMediaPairTblDao.queryByGroupId(messengerGroupTbl.getId());
        if (CollectionUtils.isEmpty(dataMediaPairTbls)) {
            logger.info("dataMediaPairTbls is empty, messengerGroupId: {}", messengerGroupTbl.getId());
            return;
        }

        List<Long> srcMhaDbMappingIds = mhaDbMappingTblDao.queryByMhaId(mhaId).stream().map(MhaDbMappingTbl::getId).collect(Collectors.toList());
        List<DbReplicationTbl> dbReplicationTbls = dbReplicationTblDao.queryBySrcMappingIds(srcMhaDbMappingIds, ReplicationTypeEnum.DB_TO_MQ.getType());
        if (!CollectionUtils.isEmpty(dbReplicationTbls)) {
            logger.info("dbReplicationTbls has already configured, mhaId: {}", mhaId);
            return;
        }
        MhaTblV2 mhaTblV2 = mhaTblV2Dao.queryById(mhaId);
        List<String> dbNameFilters = dataMediaPairTbls.stream().map(DataMediaPairTbl::getSrcDataMediaName).collect(Collectors.toList());
        String dbNameFilter = Joiner.on(",").join(dbNameFilters);
        insertMhaDbMappings(mhaTblV2.getMhaName(), dbNameFilter);

        for (DataMediaPairTbl dataMediaPairTbl : dataMediaPairTbls) {
            Long messengerFilterId = insertMessengerFilter(dataMediaPairTbl);
            List<Long> dbReplicationIds = insertMessengerDbReplications(messengerGroupTbl, dataMediaPairTbl);

            List<DbReplicationFilterMappingTbl> dbReplicationFilterMappings = dbReplicationIds.stream()
                    .map(dbReplicationId -> buildDbReplicationFilterMappingTbl(dbReplicationId, -1L, -1L, messengerFilterId))
                    .collect(Collectors.toList());

            logger.info("batchInsert dbReplicationFilterMappings: {}", dbReplicationFilterMappings);
            dbReplicationFilterMappingTblDao.batchInsert(dbReplicationFilterMappings);
        }
    }

    private void deleteDbReplications(Long mhaId) throws Exception {
        List<Long> srcMhaDbMappingIds = mhaDbMappingTblDao.queryByMhaId(mhaId).stream().map(MhaDbMappingTbl::getId).collect(Collectors.toList());
        List<DbReplicationTbl> dbReplicationTbls = dbReplicationTblDao.queryBySrcMappingIds(srcMhaDbMappingIds, ReplicationTypeEnum.DB_TO_MQ.getType());
        if (CollectionUtils.isEmpty(dbReplicationTbls)) {
            return;
        }
        dbReplicationTbls.forEach(e -> e.setDeleted(BooleanEnum.TRUE.getCode()));
        logger.info("deleteDbReplications size: {}, dbReplications: {}", dbReplicationTbls.size(), dbReplicationTbls);
        dbReplicationTblDao.batchUpdate(dbReplicationTbls);

        List<Long> dbReplicationIds = dbReplicationTbls.stream().map(DbReplicationTbl::getId).collect(Collectors.toList());
        List<DbReplicationFilterMappingTbl> dbReplicationFilterMappingTbls = dbReplicationFilterMappingTblDao.queryByDbReplicationIds(dbReplicationIds);
        dbReplicationFilterMappingTbls.forEach(e -> e.setDeleted(BooleanEnum.TRUE.getCode()));
        logger.info("deleteDbReplicationFilterMappings size: {}, filterMappings: {}", dbReplicationFilterMappingTbls.size(), dbReplicationFilterMappingTbls);
        dbReplicationFilterMappingTblDao.batchUpdate(dbReplicationFilterMappingTbls);
    }

    public List<Long> deleteMessengerDbReplications(MessengerGroupTbl messengerGroupTbl, DataMediaPairTbl dataMediaPairTbl) throws Exception {
        logger.info("deleteMessengerDbReplications messengerGroupId: {}, dataMediaPairId: {}", messengerGroupTbl.getId(), dataMediaPairTbl.getId());
        List<DbReplicationTbl> dbReplicationTbls = getDbReplications(messengerGroupTbl, dataMediaPairTbl, false);
        List<Long> dbReplicationIds = dbReplicationTbls.stream().map(DbReplicationTbl::getId).collect(Collectors.toList());

        dbReplicationTbls.forEach(e -> e.setDeleted(BooleanEnum.TRUE.getCode()));
        logger.info("deleteMessengerDbReplications, size: {}, dbReplicationTbls: {}", dbReplicationTbls.size(), dbReplicationTbls);
        dbReplicationTblDao.batchUpdate(dbReplicationTbls);
        return dbReplicationIds;
    }

    private void insertMhaDbMappings(String mhaName, String nameFilter) throws Exception {
        List<String> dbList = drcBuildService.queryDbsWithNameFilter(mhaName, nameFilter);
        metaMigrateService.manualMigrateDbs(dbList);
        metaMigrateService.manualMigrateVPCMhaDbMapping(new MhaDbMappingMigrateParam(mhaName, dbList));
    }

    private List<Long> insertMessengerDbReplications(MessengerGroupTbl messengerGroupTbl, DataMediaPairTbl dataMediaPairTbl) throws Exception{
        logger.info("insertMessengerDbReplications messengerGroupId: {}, dataMediaPairId: {}", messengerGroupTbl.getId(), dataMediaPairTbl.getId());
        List<DbReplicationTbl> dbReplicationTbls = getDbReplications(messengerGroupTbl, dataMediaPairTbl, true);

        dbReplicationTblDao.batchInsertWithReturnId(dbReplicationTbls);
        logger.info("insertMessengerDbReplications size: {}, dbReplicationTbls: {}", dbReplicationTbls.size(), dbReplicationTbls);
        List<Long> dbReplicationIds = dbReplicationTbls.stream().map(DbReplicationTbl::getId).collect(Collectors.toList());
        return dbReplicationIds;
    }

    private List<DbReplicationTbl> getDbReplications(MessengerGroupTbl messengerGroupTbl, DataMediaPairTbl dataMediaPairTbl, boolean insert) throws Exception {
        List<MhaDbMappingTbl> mhaDbMappingTbls = mhaDbMappingTblDao.queryByMhaId(messengerGroupTbl.getMhaId());
        List<Long> dbIds = mhaDbMappingTbls.stream().map(MhaDbMappingTbl::getDbId).collect(Collectors.toList());
        List<DbTbl> dbTbls = dbTblDao.queryByIds(dbIds);

        List<String> dbNameFilters = Lists.newArrayList(dataMediaPairTbl.getSrcDataMediaName().split(","));
        List<DbReplicationTbl> dbReplicationTbls = new ArrayList<>();
        for (String dbNameFilter : dbNameFilters) {
            String[] dbTables = dbNameFilter.split(Constants.ESCAPE_CHARACTER_DOT_REGEX);
            String srcLogicTable = dbTables[1];

            AviatorRegexFilter aviatorRegexFilter = new AviatorRegexFilter(dbTables[0]);
            List<Long> srcDbIds = dbTbls.stream().filter(e -> aviatorRegexFilter.filter(e.getDbName())).map(DbTbl::getId).collect(Collectors.toList());
            List<Long> srcMhaDbMappingIds = mhaDbMappingTbls.stream().filter(e -> srcDbIds.contains(e.getDbId())).map(MhaDbMappingTbl::getId).collect(Collectors.toList());
            List<DbReplicationTbl> dbReplicationTblList;
            if (insert) {
                dbReplicationTblList = srcMhaDbMappingIds.stream()
                        .map(srcMhaDbMappingId -> buildDbReplicationTbl(srcLogicTable, dataMediaPairTbl.getDestDataMediaName(), srcMhaDbMappingId, -1L, ReplicationTypeEnum.DB_TO_MQ.getType()))
                        .collect(Collectors.toList());
            } else {
                dbReplicationTblList = dbReplicationTblDao.queryBy(srcMhaDbMappingIds, srcLogicTable, dataMediaPairTbl.getDestDataMediaName(), ReplicationTypeEnum.DB_TO_MQ.getType());
            }
            dbReplicationTbls.addAll(dbReplicationTblList);
        }
        return dbReplicationTbls;
    }

    private Long insertMessengerFilter(DataMediaPairTbl dataMediaPairTbl) throws Exception {
        List<MessengerFilterTbl> messengerFilterTbls = messengerFilterTblDao.queryAll().stream().filter(e -> e.getDeleted().equals(BooleanEnum.FALSE.getCode())).collect(Collectors.toList());
        Long messengerFilterId = null;
        for (MessengerFilterTbl messengerFilterTbl : messengerFilterTbls) {
            if (messengerFilterTbl.getProperties().equals(dataMediaPairTbl.getProperties())) {
                messengerFilterId = messengerFilterTbl.getId();
                break;
            }
        }
        if (messengerFilterId == null) {
            MessengerFilterTbl messengerFilterTbl = new MessengerFilterTbl();
            messengerFilterTbl.setDeleted(BooleanEnum.FALSE.getCode());
            messengerFilterTbl.setProperties(dataMediaPairTbl.getProperties());

            logger.info("insertMessengerFilter: {}", messengerFilterTbl);
            messengerFilterId = messengerFilterTblDao.insertWithReturnId(messengerFilterTbl);
        }

        return messengerFilterId;
    }

    private void insertDbReplicationFilterMappings(Long applierGroupId, Long dataMediaId, Long filterId, int filterType) throws Exception {
        List<Long> dbReplicationIds = getDbReplicationId(applierGroupId, dataMediaId);
        if (CollectionUtils.isEmpty(dbReplicationIds)) {
            logger.error("dbReplications not exist, applierGroupId: {}, dataMediaId: {}", applierGroupId, dataMediaId);
            throw ConsoleExceptionUtils.message("dbReplications not exist");
        }

        List<DbReplicationFilterMappingTbl> existFilterMappings = dbReplicationFilterMappingTblDao.queryByDbReplicationIds(dbReplicationIds);
        Map<Long, DbReplicationFilterMappingTbl> existFilterMappingMap = existFilterMappings.stream().collect(Collectors.toMap(DbReplicationFilterMappingTbl::getDbReplicationId, Function.identity()));

        List<DbReplicationFilterMappingTbl> insertTbls = new ArrayList<>();
        List<DbReplicationFilterMappingTbl> updateTbls = new ArrayList<>();
        for (long dbReplicationId : dbReplicationIds) {
            DbReplicationFilterMappingTbl dbReplicationFilterMappingTbl;
            if (existFilterMappingMap.containsKey(dbReplicationId)) {
                dbReplicationFilterMappingTbl = existFilterMappingMap.get(dbReplicationId);
                insertTbls.add(dbReplicationFilterMappingTbl);
            } else {
                dbReplicationFilterMappingTbl = new DbReplicationFilterMappingTbl();
                dbReplicationFilterMappingTbl.setDbReplicationId(dbReplicationId);
                dbReplicationFilterMappingTbl.setDeleted(BooleanEnum.FALSE.getCode());
                updateTbls.add(dbReplicationFilterMappingTbl);
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

        if (!CollectionUtils.isEmpty(insertTbls)) {
            logger.info("insertDbReplicationFilterMappings insertTbls: {}", insertTbls);
            dbReplicationFilterMappingTblDao.batchInsert(insertTbls);
        }
        if (!CollectionUtils.isEmpty(updateTbls)) {
            logger.info("insertDbReplicationFilterMappings updateTbls: {}", updateTbls);
            dbReplicationFilterMappingTblDao.update(updateTbls);
        }
    }

    private List<Long> getDbReplicationId(Long applierGroupId, Long dataMediaId) throws Exception {
        Pair<MhaTblV2, MhaTblV2> mhaPair = getMhaPair(applierGroupId);
        MhaTblV2 srcMha = mhaPair.getLeft();
        MhaTblV2 dstMha = mhaPair.getRight();
        List<MhaDbMappingTbl> srcMhaDbMappings = mhaDbMappingTblDao.queryByMhaId(srcMha.getId());
        List<MhaDbMappingTbl> dstMhaDbMappings = mhaDbMappingTblDao.queryByMhaId(dstMha.getId());
        List<Long> srcDbIds = srcMhaDbMappings.stream().map(MhaDbMappingTbl::getDbId).collect(Collectors.toList());
        List<DbTbl> dbTbls = dbTblDao.queryByIds(srcDbIds);
        Map<Long, String> dbMap = dbTbls.stream().collect(Collectors.toMap(DbTbl::getId, DbTbl::getDbName));
        Map<Long, MhaDbMappingTbl> srcMhaMappingMap = srcMhaDbMappings.stream().collect(Collectors.toMap(MhaDbMappingTbl::getId, Function.identity()));

        List<DbReplicationTbl> existDbReplications = getExistDbReplications(srcMhaDbMappings, dstMhaDbMappings);
        DataMediaTbl dataMediaTbl = dataMediaTblDao.queryById(dataMediaId);
        List<Long> dbReplicationIds = new ArrayList<>();
        for (DbReplicationTbl dbReplicationTbl : existDbReplications) {
            MhaDbMappingTbl srcMhaDbMapping = srcMhaMappingMap.get(dbReplicationTbl.getSrcMhaDbMappingId());
            String srcDbName = dbMap.get(srcMhaDbMapping.getDbId());
            String srcTableName = dbReplicationTbl.getSrcLogicTableName();

            if (filterMatch(dataMediaTbl, srcDbName, srcTableName)) {
                dbReplicationIds.add(dbReplicationTbl.getId());
            }
        }
        logger.info("getDbReplicationIds: {}", dbReplicationIds);
        return dbReplicationIds;
    }

    private Pair<MhaTblV2, MhaTblV2> getMhaPair(long applierGroupId) throws Exception {
        ApplierGroupTbl applierGroupTbl = applierGroupTblDao.queryById(applierGroupId);
        ReplicatorGroupTbl replicatorGroupTbl = replicatorGroupTblDao.queryById(applierGroupTbl.getReplicatorGroupId());
        MhaTblV2 srcMha = mhaTblV2Dao.queryById(replicatorGroupTbl.getMhaId());
        MhaTblV2 dstMha = mhaTblV2Dao.queryById(applierGroupTbl.getMhaId());

        return Pair.of(srcMha, dstMha);
    }

    private Long insertRowsFilter(RowsFilterTbl sourceRowsFilter) throws Exception {
        Long rowsFilterId = null;

        List<RowsFilterTblV2> existRowsFilters = rowsFilterTblV2Dao.queryByMode(RowsFilterModeEnum.getCodeByName(sourceRowsFilter.getMode()));
        for (RowsFilterTblV2 rowsFilterTblV2 : existRowsFilters) {
            if (sourceRowsFilter.getConfigs().equals(rowsFilterTblV2.getConfigs())) {
                rowsFilterId = rowsFilterTblV2.getId();
                break;
            }
        }
        if (rowsFilterId == null) {
            RowsFilterTblV2 rowsFilterTblV2 = new RowsFilterTblV2();
            rowsFilterTblV2.setConfigs(sourceRowsFilter.getConfigs());
            rowsFilterTblV2.setMode(RowsFilterModeEnum.getCodeByName(sourceRowsFilter.getMode()));
            rowsFilterTblV2.setDeleted(BooleanEnum.FALSE.getCode());
            rowsFilterId = rowsFilterTblV2Dao.insertReturnId(rowsFilterTblV2);
        }

        return rowsFilterId;
    }

    private Long insertColumnsFilter(ColumnsFilterTbl sourceColumnsFilter) throws Exception {
        Long columnsFilterId = null;
        List<ColumnsFilterTblV2> existColumnsFilters = columnFilterTblV2Dao.queryByMode(ColumnsFilterModeEnum.getCodeByName(sourceColumnsFilter.getMode()));
        for (ColumnsFilterTblV2 columnsFilter : existColumnsFilters) {
            if (columnsFilter.getColumns().equals(sourceColumnsFilter.getColumns())) {
                columnsFilterId = columnsFilter.getId();
                break;
            }
        }

        if (columnsFilterId == null) {
            ColumnsFilterTblV2 columnsFilterTblV2 = new ColumnsFilterTblV2();
            columnsFilterTblV2.setDeleted(BooleanEnum.FALSE.getCode());
            columnsFilterTblV2.setColumns(sourceColumnsFilter.getColumns());
            columnsFilterTblV2.setMode(ColumnsFilterModeEnum.getCodeByName(sourceColumnsFilter.getMode()));
            columnsFilterId = columnFilterTblV2Dao.insertReturnId(columnsFilterTblV2);
        }

        return columnsFilterId;
    }

    private void deleteReplication(long srcMhaId, long dstMhaId, List<MhaDbMappingTbl> srcMhaDbMappings, List<MhaDbMappingTbl> dstMhaDbMappings) throws Exception {
        MhaReplicationTbl existMhaReplication = mhaReplicationTblDao.queryByMhaId(srcMhaId, dstMhaId);
        if (existMhaReplication != null) {
            existMhaReplication.setDeleted(BooleanEnum.TRUE.getCode());
            mhaReplicationTblDao.update(existMhaReplication);
        }

        List<DbReplicationTbl> existDbReplications = getExistDbReplications(srcMhaDbMappings, dstMhaDbMappings);
        deleteDbReplications(existDbReplications);
    }

    private void insertDbReplicationFilterMapping(List<DbReplicationTbl> dbReplications, ApplierGroupTbl applierGroupTbl, List<MhaDbMappingTbl> srcMhaDbMappings, List<String> dbList) throws Exception {
        List<DataMediaTbl> dataMediaTbls = dataMediaTblDao.queryByAGroupId(applierGroupTbl.getId(), BooleanEnum.FALSE.getCode());
        List<RowsFilterMappingTbl> rowsFilterMappings = rowsFilterMappingTblDao.queryByApplierGroupIds(Lists.newArrayList(applierGroupTbl.getId()), BooleanEnum.FALSE.getCode());
        List<DbTbl> dbTbls = dbTblDao.queryByDbNames(dbList);
        Map<Long, String> dbMap = dbTbls.stream().collect(Collectors.toMap(DbTbl::getId, DbTbl::getDbName));
        Map<Long, MhaDbMappingTbl> srcMhaMappingMap = srcMhaDbMappings.stream().collect(Collectors.toMap(MhaDbMappingTbl::getId, Function.identity()));

        List<DbReplicationFilterMappingTbl> dbReplicationFilterMappingTbls = new ArrayList<>();
        for (DbReplicationTbl dbReplicationTbl : dbReplications) {
            long columnsFilterId = -1L;
            long rowsFilterId = -1L;

            MhaDbMappingTbl srcMhaDbMapping = srcMhaMappingMap.get(dbReplicationTbl.getSrcMhaDbMappingId());
            String srcDbName = dbMap.get(srcMhaDbMapping.getDbId());
            String srcTableName = dbReplicationTbl.getSrcLogicTableName();

            //columnsFilter
            DataMediaTbl columnsDataMediaTbl = dataMediaTbls.stream()
                    .filter(e -> filterMatch(e, srcDbName, srcTableName))
                    .findFirst()
                    .orElse(null);
            if (columnsDataMediaTbl != null) {
                ColumnsFilterTbl columnsFilter = columnsFilterTblDao.queryByDataMediaId(columnsDataMediaTbl.getId(), BooleanEnum.FALSE.getCode());
                List<ColumnsFilterTblV2> newColumnsFilters = columnFilterTblV2Dao.queryByMode(ColumnsFilterModeEnum.getCodeByName(columnsFilter.getMode()));
                columnsFilterId = newColumnsFilters.stream().filter(e -> e.getColumns().equals(columnsFilter.getColumns())).findFirst().get().getId();
            }

            //rowsFilter
            for (RowsFilterMappingTbl mapping : rowsFilterMappings) {
                DataMediaTbl rowsDataMediaTbl = dataMediaTblDao.queryById(mapping.getDataMediaId());
                if (filterMatch(rowsDataMediaTbl, srcDbName, srcTableName)) {
                    RowsFilterTbl rowsFilterTbl = rowsFilterTblDao.queryById(mapping.getRowsFilterId(), BooleanEnum.FALSE.getCode());
                    List<RowsFilterTblV2> newRowsFilters = rowsFilterTblV2Dao.queryByMode(RowsFilterModeEnum.getCodeByName(rowsFilterTbl.getMode()));
                    rowsFilterId = newRowsFilters.stream().filter(e -> e.getConfigs().equals(rowsFilterTbl.getConfigs())).findFirst().get().getId();
                    break;
                }
            }

            if (columnsFilterId != -1L || rowsFilterId != -1L) {
                dbReplicationFilterMappingTbls.add(buildDbReplicationFilterMappingTbl(dbReplicationTbl.getId(), rowsFilterId, columnsFilterId, -1L));
            }
        }

        if (!CollectionUtils.isEmpty(dbReplicationFilterMappingTbls)) {
            dbReplicationFilterMappingTblDao.batchInsert(dbReplicationFilterMappingTbls);
        }
    }

    private DbReplicationFilterMappingTbl buildDbReplicationFilterMappingTbl(long dbReplicationId, long rowsFilterId, long columnsFilterId, long messengerFilterId) {
        DbReplicationFilterMappingTbl dbReplicationFilterMappingTbl = new DbReplicationFilterMappingTbl();
        dbReplicationFilterMappingTbl.setDbReplicationId(dbReplicationId);
        dbReplicationFilterMappingTbl.setRowsFilterId(rowsFilterId);
        dbReplicationFilterMappingTbl.setColumnsFilterId(columnsFilterId);
        dbReplicationFilterMappingTbl.setMessengerFilterId(messengerFilterId);
        dbReplicationFilterMappingTbl.setDeleted(BooleanEnum.FALSE.getCode());

        return dbReplicationFilterMappingTbl;
    }

    private boolean filterMatch(DataMediaTbl dataMediaTbl, String db, String table) {
        AviatorRegexFilter regexFilter = new AviatorRegexFilter(dataMediaTbl.getNamespcae());
        return table.equals(dataMediaTbl.getName()) && regexFilter.filter(db);
    }

    private Long insertOrUpdateMhaReplication(Long srcMhaId, Long dstMhaId) throws Exception {
        MhaReplicationTbl mhaReplicationTbl = new MhaReplicationTbl();
        mhaReplicationTbl.setSrcMhaId(srcMhaId);
        mhaReplicationTbl.setDstMhaId(dstMhaId);
        mhaReplicationTbl.setDeleted(BooleanEnum.FALSE.getCode());

        Long mhaReplicationId = null;
        MhaReplicationTbl existMhaReplication = mhaReplicationTblDao.queryByMhaId(srcMhaId, dstMhaId);
        if (existMhaReplication != null) {
            mhaReplicationId = existMhaReplication.getId();
            mhaReplicationTblDao.update(mhaReplicationTbl);
        } else {
            mhaReplicationId = mhaReplicationTblDao.insertWithReturnId(mhaReplicationTbl);
        }
        return mhaReplicationId;
    }

    private List<DbReplicationTbl> insertDbReplications(ApplierGroupTbl applierGroupTbl, List<MhaDbMappingTbl> srcMhaDbMappings, List<MhaDbMappingTbl> dstMhaDbMappings, List<String> dbList) throws Exception {
        Map<Long, Long> srcMhaDbMappingMap = srcMhaDbMappings.stream().collect(Collectors.toMap(MhaDbMappingTbl::getDbId, MhaDbMappingTbl::getId));
        Map<Long, Long> dstMhaDbMappingMap = dstMhaDbMappings.stream().collect(Collectors.toMap(MhaDbMappingTbl::getDbId, MhaDbMappingTbl::getId));

        List<DbTbl> dbTbls = dbTblDao.queryByDbNames(dbList);
        Map<String, Long> dbMap = dbTbls.stream().collect(Collectors.toMap(DbTbl::getDbName, DbTbl::getId));

        Map<String, String> tableNameMappingMap = new HashMap<>();
        String nameMappings = applierGroupTbl.getNameMapping();
        if (StringUtils.isNotBlank(nameMappings)) {
            List<String> nameMappingList = Lists.newArrayList(nameMappings.split(";"));
            for (String nameMapping : nameMappingList) {
                String[] tables = nameMapping.split(",");
                tableNameMappingMap.put(tables[0].split("\\.")[1], tables[1].split("\\.")[1]);
            }
        }

        String nameFilter = applierGroupTbl.getNameFilter();
        List<DbReplicationTbl> dbReplicationTbls = new ArrayList<>();
        if (StringUtils.isBlank(nameFilter)) {
            dbReplicationTbls.addAll(buildDbReplications(dbList, dbMap, srcMhaDbMappingMap, dstMhaDbMappingMap, DEFAULT_TABLE_NAME, StringUtils.EMPTY));
        } else {
            List<String> dbFilterList = Lists.newArrayList(nameFilter.split(","));
            for (String dbFilter : dbFilterList) {
                String[] dbFullNames = dbFilter.split(Constants.ESCAPE_CHARACTER_DOT_REGEX);
                String srcTableName = dbFullNames[1];
                String dstTableName = tableNameMappingMap.getOrDefault(srcTableName, StringUtils.EMPTY);
                AviatorRegexFilter aviatorRegexFilter = new AviatorRegexFilter(dbFilter);
                List<String> dbNames = dbList.stream().filter(db -> aviatorRegexFilter.filter(db)).collect(Collectors.toList());

                dbReplicationTbls.addAll(buildDbReplications(dbNames, dbMap, srcMhaDbMappingMap, dstMhaDbMappingMap, srcTableName, dstTableName));
            }
        }

        dbReplicationTblDao.batchInsertWithReturnId(dbReplicationTbls);
        logger.info("insertDbReplications size: {}, dbReplicationTbls: {}", dbReplicationTbls.size(), dbReplicationTbls);
        return dbReplicationTbls;
    }

    private List<DbReplicationTbl> getExistDbReplications(List<MhaDbMappingTbl> srcMhaDbMappings, List<MhaDbMappingTbl> dstMhaDbMappings) throws Exception {
        List<Long> srcMhaDbMappingIds = srcMhaDbMappings.stream().map(MhaDbMappingTbl::getId).collect(Collectors.toList());
        List<Long> dstMhaDbMappingIds = dstMhaDbMappings.stream().map(MhaDbMappingTbl::getId).collect(Collectors.toList());

        List<DbReplicationTbl> existDbReplications = dbReplicationTblDao.queryByMappingIds(srcMhaDbMappingIds, dstMhaDbMappingIds, ReplicationTypeEnum.DB_TO_DB.getType());
        return existDbReplications;
    }

    private List<String> insertMhaDbMappings(ApplierGroupTbl applierGroupTbl, MhaTblV2 srcMha, MhaTblV2 dstMha) throws Exception {
        List<String> vpcMhaNames = defaultConsoleConfig.getVpcMhaNames();
        String nameFilter = applierGroupTbl.getNameFilter();
        if (vpcMhaNames.contains(srcMha.getMhaName()) || vpcMhaNames.contains(dstMha.getMhaName())) {
            return insertVpcMhaDbMappings(srcMha, dstMha, vpcMhaNames, nameFilter);
        } else {
            return insertMhaDbMappings(srcMha, dstMha, nameFilter);
        }
    }

    private List<String> insertMhaDbMappings(MhaTblV2 srcMha, MhaTblV2 dstMha, String nameFilter) throws Exception {
        List<String> srcDbList = drcBuildService.queryDbsWithNameFilter(srcMha.getMhaName(), nameFilter);
        List<String> dstDbList = drcBuildService.queryDbsWithNameFilter(dstMha.getMhaName(), nameFilter);
        if (!checkDbIsSame(srcDbList, dstDbList)) {
            logger.error("drc double write insertMhaDbMappings srcDb dstDb is not same, srcDbList: {}, dstDbList: {}", srcDbList, dstDbList);
            throw ConsoleExceptionUtils.message("srcMha dstMha contains different dbs");
        }

        MigrateResult migrateResult = metaMigrateService.manualMigrateDbs(srcDbList);
        logger.info("drc double write insertMhaDbMapping dbList: {}, migrateResult: {}", srcDbList, migrateResult);

        //insertMhaDbMappings
        metaMigrateService.manualMigrateVPCMhaDbMapping(new MhaDbMappingMigrateParam(srcMha.getMhaName(), srcDbList));
        metaMigrateService.manualMigrateVPCMhaDbMapping(new MhaDbMappingMigrateParam(dstMha.getMhaName(), dstDbList));

        return srcDbList;
    }

    private boolean checkDbIsSame(List<String> srcDbList, List<String> dstDbList) {
        if (CollectionUtils.isEmpty(srcDbList) || CollectionUtils.isEmpty(dstDbList)) {
            return false;
        }
        if (srcDbList.size() != dstDbList.size()) {
            return false;
        }
        Collections.sort(srcDbList);
        Collections.sort(dstDbList);
        return srcDbList.equals(dstDbList);
    }


    private List<String> insertVpcMhaDbMappings(MhaTblV2 srcMha, MhaTblV2 dstMha, List<String> vpcMhaNames, String nameFilter) throws Exception {
        String mhaName = vpcMhaNames.contains(srcMha.getMhaName()) ? dstMha.getMhaName() : srcMha.getMhaName();
        List<String> dbList = drcBuildService.queryDbsWithNameFilter(mhaName, nameFilter);
        MigrateResult migrateResult = metaMigrateService.manualMigrateDbs(dbList);
        logger.info("drc double write insertVpcMhaDbMappings dbList: {}, migrateResult: {}", dbList, migrateResult);

        //insertMhaDbMappings
        metaMigrateService.manualMigrateVPCMhaDbMapping(new MhaDbMappingMigrateParam(srcMha.getMhaName(), dbList));
        metaMigrateService.manualMigrateVPCMhaDbMapping(new MhaDbMappingMigrateParam(dstMha.getMhaName(), dbList));

        return dbList;
    }


    private void deleteDbReplications(List<DbReplicationTbl> existDbReplications) throws Exception {
        if (CollectionUtils.isEmpty(existDbReplications)) {
            return;
        }
        existDbReplications.forEach(e -> {
            e.setDeleted(BooleanEnum.TRUE.getCode());
        });
        dbReplicationTblDao.batchUpdate(existDbReplications);
        deleteDbReplicationFilterMappings(existDbReplications);
    }

    private void deleteDbReplicationFilterMappings(List<DbReplicationTbl> existDbReplications) throws Exception {
        List<Long> dbReplicationIds = existDbReplications.stream().map(DbReplicationTbl::getId).collect(Collectors.toList());
        List<DbReplicationFilterMappingTbl> existDbReplicationFilterMappings = dbReplicationFilterMappingTblDao.queryByDbReplicationIds(dbReplicationIds);
        if (CollectionUtils.isEmpty(existDbReplicationFilterMappings)) {
            return;
        }
        existDbReplicationFilterMappings.forEach(e -> {
            e.setDeleted(BooleanEnum.TRUE.getCode());
        });
        dbReplicationFilterMappingTblDao.batchUpdate(existDbReplicationFilterMappings);
    }


    private ApplierTblV2 buildApplier(ApplierTbl applierTbl) {
        ApplierTblV2 applierTblV2 = new ApplierTblV2();
        applierTblV2.setId(applierTbl.getId());
        applierTblV2.setApplierGroupId(applierTbl.getApplierGroupId());
        applierTblV2.setPort(applierTbl.getPort());
        applierTblV2.setResourceId(applierTbl.getResourceId());
        applierTblV2.setMaster(applierTbl.getMaster());
        applierTblV2.setDeleted(applierTbl.getDeleted());

        return applierTblV2;
    }

    private void insertOrUpdateMha(MhaTblV2 mhaTbl) throws Exception {
        MhaTblV2 oldMhaTbl = mhaTblV2Dao.queryById(mhaTbl.getId());
        if (oldMhaTbl != null) {
            mhaTblV2Dao.update(mhaTbl);
        } else {
            mhaTblV2Dao.insert(new DalHints().enableIdentityInsert(), mhaTbl);
        }
    }

    private MhaTblV2 buildMhaTblV2(MhaTbl mhaTbl, MhaGroupTbl mhaGroupTbl, ClusterTbl clusterTbl) {
        MhaTblV2 mhaTblV2 = new MhaTblV2();
        mhaTblV2.setId(mhaTbl.getId());
        mhaTblV2.setMhaName(mhaTbl.getMhaName());
        mhaTblV2.setDcId(mhaTbl.getDcId());
        mhaTblV2.setApplyMode(mhaTbl.getApplyMode());
        mhaTblV2.setMonitorSwitch(mhaTbl.getMonitorSwitch());
        mhaTblV2.setBuId(clusterTbl.getBuId());
        mhaTblV2.setClusterName(clusterTbl.getClusterName());
        mhaTblV2.setAppId(clusterTbl.getClusterAppId());
        mhaTblV2.setDeleted(BooleanEnum.FALSE.getCode());

        mhaTblV2.setReadUser(mhaGroupTbl.getReadUser());
        mhaTblV2.setReadPassword(mhaGroupTbl.getReadPassword());
        mhaTblV2.setWriteUser(mhaGroupTbl.getWriteUser());
        mhaTblV2.setWritePassword(mhaGroupTbl.getWritePassword());
        mhaTblV2.setMonitorUser(mhaGroupTbl.getMonitorUser());
        mhaTblV2.setMonitorPassword(mhaGroupTbl.getMonitorPassword());

        return mhaTblV2;
    }

    private List<DbReplicationTbl> buildDbReplications(List<String> dbList,
                                                       Map<String, Long> dbMap,
                                                       Map<Long, Long> srcMhaDbMappingMap,
                                                       Map<Long, Long> dstMhaDbMappingMap,
                                                       String srcTableName,
                                                       String dstTableName) {
        List<DbReplicationTbl> dbReplicationTbls = new ArrayList<>();
        for (String dbName : dbList) {
            long dbId = dbMap.get(dbName);
            long srcMhaDbMappingId = srcMhaDbMappingMap.get(dbId);
            long dstMhaDbMappingId = dstMhaDbMappingMap.get(dbId);
            dbReplicationTbls.add(buildDbReplicationTbl(srcTableName, dstTableName, srcMhaDbMappingId, dstMhaDbMappingId, ReplicationTypeEnum.DB_TO_DB.getType()));
        }
        return dbReplicationTbls;
    }

    private DbReplicationTbl buildDbReplicationTbl(String srcTableName, String dstTableName, long srcMhaDbMappingId, long dstMhaDbMappingId, int replicationType) {
        DbReplicationTbl dbReplicationTbl = new DbReplicationTbl();
        dbReplicationTbl.setSrcMhaDbMappingId(srcMhaDbMappingId);
        dbReplicationTbl.setDstMhaDbMappingId(dstMhaDbMappingId);
        dbReplicationTbl.setSrcLogicTableName(srcTableName);
        dbReplicationTbl.setDstLogicTableName(dstTableName);
        dbReplicationTbl.setReplicationType(replicationType);
        dbReplicationTbl.setDeleted(BooleanEnum.FALSE.getCode());
        return dbReplicationTbl;
    }
}
