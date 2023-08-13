package com.ctrip.framework.drc.console.service.v2;

import com.ctrip.framework.drc.console.dao.*;
import com.ctrip.framework.drc.console.dao.entity.v2.MhaReplicationTbl;
import com.ctrip.framework.drc.console.dao.entity.v2.MhaTblV2;
import com.ctrip.framework.drc.console.dao.v2.*;
import com.ctrip.framework.drc.console.monitor.delay.config.MonitorTableSourceProvider;
import com.ctrip.framework.drc.console.param.v2.DbReplicationBuildParam;
import com.ctrip.framework.drc.console.param.v2.DrcBuildBaseParam;
import com.ctrip.framework.drc.console.param.v2.DrcBuildParam;
import com.ctrip.framework.drc.console.param.v2.DrcMhaBuildParam;
import com.ctrip.framework.drc.console.service.impl.MetaInfoServiceImpl;
import com.ctrip.framework.drc.console.service.v2.impl.DrcBuildServiceV2Impl;
import com.google.common.collect.Lists;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static com.ctrip.framework.drc.console.service.v2.MigrateEntityBuilder.*;

/**
 * Created by dengquanliang
 * 2023/8/11 21:58
 */
public class DrcBuildServiceV2Test {
    @InjectMocks
    private DrcBuildServiceV2Impl drcBuildServiceV2;
    @Mock
    private MonitorTableSourceProvider monitorTableSourceProvider;
    @Mock
    private MetaInfoServiceImpl metaInfoService;
    @Mock
    private MhaDbMappingService mhaDbMappingService;
    @Mock
    private MhaTblV2Dao mhaTblDao;
    @Mock
    private MhaReplicationTblDao mhaReplicationTblDao;
    @Mock
    private ReplicatorGroupTblDao replicatorGroupTblDao;
    @Mock
    private ReplicatorTblDao replicatorTblDao;
    @Mock
    private ApplierGroupTblV2Dao applierGroupTblDao;
    @Mock
    private ApplierTblV2Dao applierTblDao;
    @Mock
    private ResourceTblDao resourceTblDao;
    @Mock
    private DbTblDao dbTblDao;
    @Mock
    private MhaDbMappingTblDao mhaDbMappingTblDao;
    @Mock
    private DbReplicationTblDao dbReplicationTblDao;
    @Mock
    private DbReplicationFilterMappingTblDao dbReplicationFilterMappingTblDao;
    @Mock
    private ColumnsFilterTblV2Dao columnFilterTblV2Dao;
    @Mock
    private RowsFilterTblV2Dao rowsFilterTblV2Dao;
    @Mock
    private BuTblDao buTblDao;
    @Mock
    private DcTblDao dcTblDao;
    @Mock
    private CacheMetaService cacheMetaService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testBuildMha() throws Exception {
        Mockito.when(buTblDao.queryByBuName(Mockito.anyString())).thenReturn(getBuTbl());
        Mockito.when(dcTblDao.queryByDcName(Mockito.anyString())).thenReturn(getDcTbls().get(0));
        Mockito.when(mhaTblDao.queryByMhaName(Mockito.anyString())).thenReturn(null);
        Mockito.when(mhaTblDao.insertWithReturnId(Mockito.any(MhaTblV2.class))).thenReturn(1L);
        Mockito.when(mhaReplicationTblDao.queryByMhaId(Mockito.anyLong(), Mockito.anyLong(), Mockito.anyInt())).thenReturn(null);
        Mockito.when(mhaReplicationTblDao.insert(Mockito.any(MhaReplicationTbl.class))).thenReturn(1);

        drcBuildServiceV2.buildMha(new DrcMhaBuildParam("srcMha", "dstMha", "srcDc", "dstDc", "BBZ"));
        Mockito.verify(mhaTblDao, Mockito.never()).update(Mockito.any(MhaTblV2.class));
    }

    @Test
    public void testBuildDrc() throws Exception {
        DrcBuildBaseParam srcParam = new DrcBuildBaseParam("srcMha", Lists.newArrayList("127.0.0.1"),
                Lists.newArrayList("127.0.0.1"), "rGtid", "aGtid");
        DrcBuildBaseParam dstParam = new DrcBuildBaseParam("dstMha", Lists.newArrayList("127.0.0.1"),
                Lists.newArrayList("127.0.0.1"), "rGtid", "aGtid");
        DrcBuildParam param = new DrcBuildParam();
        param.setSrcBuildParam(srcParam);
        param.setDstBuildParam(dstParam);
        List<MhaTblV2> mhaTblV2s = getMhaTblV2s();

        Mockito.when(mhaTblDao.queryByMhaName(Mockito.eq("srcMha"), Mockito.anyInt())).thenReturn(mhaTblV2s.get(0));
        Mockito.when(mhaTblDao.queryByMhaName(Mockito.eq("dstMha"), Mockito.anyInt())).thenReturn(mhaTblV2s.get(0));
        Mockito.when(mhaTblDao.update(Mockito.any(MhaTblV2.class))).thenReturn(1);

        Mockito.when(replicatorGroupTblDao.queryByMhaId(Mockito.anyLong())).thenReturn(null);
        Mockito.when(replicatorGroupTblDao.insertWithReturnId(Mockito.any())).thenReturn(200L);

        Mockito.when(applierGroupTblDao.queryByMhaReplicationId(Mockito.anyLong())).thenReturn(null);
        Mockito.when(applierGroupTblDao.insertWithReturnId(Mockito.any())).thenReturn(200L);

        Mockito.when(replicatorTblDao.queryByRGroupIds(Mockito.anyList(), Mockito.anyInt())).thenReturn(new ArrayList<>());
        Mockito.when(replicatorTblDao.batchInsert(Mockito.anyList())).thenReturn(new int[1]);

        Mockito.when(applierTblDao.queryByApplierGroupId(Mockito.anyLong(), Mockito.anyInt())).thenReturn(new ArrayList<>());
        Mockito.when(applierTblDao.batchInsert(Mockito.anyList())).thenReturn(new int[1]);

        Mockito.when(resourceTblDao.queryByIps(Mockito.anyList())).thenReturn(getResourceTbls());
        Mockito.when(mhaReplicationTblDao.insertWithReturnId(Mockito.any())).thenReturn(200L);
        Mockito.when(mhaReplicationTblDao.insert(Mockito.any(MhaReplicationTbl.class))).thenReturn(1);
        Mockito.when(mhaReplicationTblDao.queryByMhaId(Mockito.anyLong(), Mockito.anyLong(), Mockito.anyInt())).thenReturn(getMhaReplicationTbls().get(0));
        Mockito.when(mhaReplicationTblDao.update(Mockito.any(MhaReplicationTbl.class))).thenReturn(1);

        drcBuildServiceV2.buildDrc(param);

        Mockito.verify(replicatorTblDao, Mockito.never()).batchUpdate(Mockito.anyList());
        Mockito.verify(replicatorTblDao, Mockito.times(2)).batchInsert(Mockito.anyList());
        Mockito.verify(applierTblDao, Mockito.never()).batchUpdate(Mockito.anyList());
        Mockito.verify(applierTblDao, Mockito.times(2)).batchInsert(Mockito.anyList());

        Mockito.verify(replicatorGroupTblDao, Mockito.times(2)).insertWithReturnId(Mockito.any());
        Mockito.verify(replicatorGroupTblDao, Mockito.never()).update(Mockito.anyList());
        Mockito.verify(applierGroupTblDao, Mockito.times(2)).insertWithReturnId(Mockito.any());
        Mockito.verify(applierGroupTblDao, Mockito.never()).update(Mockito.anyList());

        Mockito.verify(mhaReplicationTblDao, Mockito.times(2)).update(Mockito.any(MhaReplicationTbl.class));
        Mockito.verify(mhaTblDao, Mockito.times(2)).update(Mockito.any(MhaTblV2.class));
    }

    @Test
    public void testConfigureDbReplications() throws Exception {
        DbReplicationBuildParam param = new DbReplicationBuildParam("srcMha", "dstMha", "db", "table");

        List<MhaTblV2> mhaTblV2s = getMhaTblV2s();
        Mockito.when(mhaTblDao.queryByMhaName(Mockito.eq("srcMha"), Mockito.anyInt())).thenReturn(mhaTblV2s.get(0));
        Mockito.when(mhaTblDao.queryByMhaName(Mockito.eq("dstMha"), Mockito.anyInt())).thenReturn(mhaTblV2s.get(0));

        Mockito.when(mhaDbMappingService.buildMhaDbMappings(Mockito.any(), Mockito.any(), Mockito.anyString())).thenReturn(Lists.newArrayList("db200"));

        Mockito.when(mhaDbMappingTblDao.queryByMhaId(Mockito.anyLong())).thenReturn(getMhaDbMappingTbls1());
        Mockito.when(dbTblDao.queryByDbNames(Mockito.anyList())).thenReturn(getDbTbls());
        Mockito.when(dbReplicationTblDao.queryByMappingIds(Mockito.anyList(), Mockito.anyList(), Mockito.anyInt())).thenReturn(new ArrayList<>());
        Mockito.doNothing().when(dbReplicationTblDao).batchInsertWithReturnId(Mockito.anyList());

        List<Long> results = drcBuildServiceV2.configureDbReplications(param);
        Assert.assertNotNull(results);
        Mockito.verify(dbReplicationTblDao, Mockito.times(1)).batchInsertWithReturnId(Mockito.any());

    }

}
