package com.ctrip.framework.drc.console.service.v2;

import com.ctrip.framework.drc.console.dao.entity.*;
import com.ctrip.framework.drc.console.dao.entity.v2.*;
import com.google.common.collect.Lists;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by dengquanliang
 * 2023/6/15 11:35
 */
public class MigrateEntityBuilder {

    public static List<MhaTbl> getMhaTbls() {
        List<MhaTbl> mhaTbls = new ArrayList<>();
        for (int i = 100; i < 110; i++) {
            MhaTbl mhaTbl = new MhaTbl();
            mhaTbl.setId(Long.valueOf(i));
            mhaTbl.setMhaName("mha" + i);
            mhaTbl.setDeleted(0);
            mhaTbls.add(mhaTbl);
        }
        return mhaTbls;
    }

    public static List<MhaGroupTbl> getMhaGroups() {
        List<MhaGroupTbl> mhaGroups = new ArrayList<>();
        for (int i = 100; i < 105; i++) {
            MhaGroupTbl mhaGroupTbl = new MhaGroupTbl();
            mhaGroupTbl.setId(Long.valueOf(i));
            mhaGroupTbl.setDeleted(0);
            mhaGroups.add(mhaGroupTbl);
        }
        return mhaGroups;
    }

    public static List<GroupMappingTbl> getGroupMappings() {
        List<GroupMappingTbl> groupMappings = new ArrayList<>();
        for (int i = 100; i < 110; i++) {
            GroupMappingTbl groupMappingTbl = new GroupMappingTbl();
            groupMappingTbl.setDeleted(0);
            groupMappingTbl.setId(Long.valueOf(i));
            int mhaGroupId = i < 105 ? i : 209 - i;
            groupMappingTbl.setMhaGroupId(Long.valueOf(mhaGroupId));
            groupMappingTbl.setMhaId(Long.valueOf(i));

            groupMappings.add(groupMappingTbl);
        }
        return groupMappings;
    }

    public static List<ClusterTbl> getClusterTbls() {
        List<ClusterTbl> clusterTbls = new ArrayList<>();
        for (int i = 100; i < 110; i++) {
            ClusterTbl clusterTbl = new ClusterTbl();
            clusterTbl.setDeleted(0);
            clusterTbl.setId(Long.valueOf(i));
            clusterTbl.setClusterName("cluster" + i);
            clusterTbls.add(clusterTbl);
        }
        return clusterTbls;
    }

    public static List<ClusterMhaMapTbl> getClusterMhaMapTbl() {
        List<ClusterMhaMapTbl> clusterMhaMapTbls = new ArrayList<>();
        for (int i = 100; i < 110; i++) {
            ClusterMhaMapTbl clusterMhaMapTbl = new ClusterMhaMapTbl();
            clusterMhaMapTbl.setDeleted(0);
            clusterMhaMapTbl.setClusterId(Long.valueOf(i));
            clusterMhaMapTbl.setMhaId(Long.valueOf(i));
            clusterMhaMapTbls.add(clusterMhaMapTbl);
        }
        return clusterMhaMapTbls;
    }

    public static List<ReplicatorGroupTbl> getReplicatorGroupTbls() {
        List<ReplicatorGroupTbl> replicatorGroupTbls = new ArrayList<>();
        for (int i = 100; i < 110; i++) {
            ReplicatorGroupTbl replicatorGroupTbl = new ReplicatorGroupTbl();
            replicatorGroupTbl.setDeleted(0);
            replicatorGroupTbl.setMhaId(Long.valueOf(i));
            replicatorGroupTbl.setId(Long.valueOf(i));
            replicatorGroupTbls.add(replicatorGroupTbl);
        }
        return replicatorGroupTbls;
    }

    public static List<ApplierGroupTbl> getApplierGroupTbls() {
        List<ApplierGroupTbl> applierGroupTbls = new ArrayList<>();
        for (int i = 100; i < 110; i++) {
            ApplierGroupTbl applierGroupTbl = new ApplierGroupTbl();
            applierGroupTbl.setDeleted(0);
            applierGroupTbl.setId(Long.valueOf(i));
            applierGroupTbl.setReplicatorGroupId(Long.valueOf(i));
            applierGroupTbl.setMhaId(Long.valueOf(209 - i));
            applierGroupTbls.add(applierGroupTbl);
            applierGroupTbl.setNameFilter("testDb\\.table" + i);
            applierGroupTbl.setNameMapping("test.db,test.db1");
        }
        return applierGroupTbls;
    }

    public static List<ApplierTbl> getApplierTbls() {
        List<ApplierTbl> applierTbls = new ArrayList<>();
        for (int i = 100; i < 110; i++) {
            ApplierTbl applierTbl = new ApplierTbl();
            applierTbl.setApplierGroupId(Long.valueOf(i));
            applierTbl.setDeleted(0);
            applierTbl.setId(Long.valueOf(i));
            applierTbls.add(applierTbl);
        }
        return applierTbls;
    }

    public static List<MhaReplicationTbl> getMhaReplicationTbls() {
        MhaReplicationTbl mhaReplicationTbl = new MhaReplicationTbl();
        mhaReplicationTbl.setDeleted(0);
        mhaReplicationTbl.setId(100L);
        mhaReplicationTbl.setSrcMhaId(100L);
        mhaReplicationTbl.setDstMhaId(109L);
        return Lists.newArrayList(mhaReplicationTbl);
    }

    public static List<DataMediaTbl> getDataMediaTbls() {
        DataMediaTbl tbl1 = new DataMediaTbl();
        tbl1.setId(100L);
        tbl1.setDeleted(0);
        tbl1.setNamespcae("db100");
        tbl1.setName("table1");
        tbl1.setApplierGroupId(100L);

        return Lists.newArrayList(tbl1);
    }

    public static List<RowsFilterMappingTbl> getRowsFilterMappings() {
        RowsFilterMappingTbl tbl = new RowsFilterMappingTbl();
        tbl.setId(100L);
        tbl.setDeleted(0);
        tbl.setApplierGroupId(100L);
        tbl.setRowsFilterId(100L);
        tbl.setDataMediaId(100L);
        return Lists.newArrayList(tbl);
    }

    public static List<RowsFilterMappingTbl> getRowsFilterMapping() {
        List<RowsFilterMappingTbl> rowsFilterMappingTbls = new ArrayList<>();
        for (int i = 106; i < 110; i++) {
            RowsFilterMappingTbl tbl = new RowsFilterMappingTbl();
            tbl.setApplierGroupId(Long.valueOf(i));
            tbl.setDeleted(0);
            tbl.setDataMediaId(Long.valueOf(i));
            rowsFilterMappingTbls.add(tbl);
        }

        return rowsFilterMappingTbls;
    }

    public static List<ColumnsFilterTbl> getColumnsFilterTbls() {
        List<ColumnsFilterTbl> tbls = new ArrayList<>();
        for (int i = 100; i < 110; i++) {
            ColumnsFilterTbl tbl = new ColumnsFilterTbl();
            tbl.setDeleted(0);
            tbl.setId(Long.valueOf(i));
            tbl.setMode("exclude");
            tbls.add(tbl);
            tbl.setDataMediaId(Long.valueOf(i));
        }
        return tbls;
    }

    public static ColumnsFilterTblV2 getColumnsFilterTblV2() {
        ColumnsFilterTblV2 tbl = new ColumnsFilterTblV2();
        tbl.setDeleted(0);
        tbl.setId(100L);
        return tbl;
    }

    public static MhaReplicationTbl getMhaReplicationTbl() {
        MhaReplicationTbl tbl = new MhaReplicationTbl();
        tbl.setDeleted(0);
        tbl.setSrcMhaId(100L);
        tbl.setDstMhaId(101L);
        tbl.setId(100L);
        return tbl;
    }

    public static List<MhaDbMappingTbl> getMhaDbMappingTbls() {
        List<MhaDbMappingTbl> tbls = new ArrayList<>();
        for (int i = 100; i <= 101; i++) {
            MhaDbMappingTbl tbl = new MhaDbMappingTbl();
            tbl.setDeleted(0);
            tbl.setMhaId(Long.valueOf(i));
            tbl.setDbId(100L);
            tbl.setId(Long.valueOf(i));
            tbls.add(tbl);
        }
        return tbls;
    }

    public static List<DbTbl> getDbTbls() {
        List<DbTbl> tbls = new ArrayList<>();
        for (int i = 100; i <= 101; i++) {
            DbTbl tbl = new DbTbl();
            tbl.setDeleted(0);
            tbl.setDbName("db" + i);
            tbl.setId(Long.valueOf(i));
            tbls.add(tbl);
        }

        return tbls;
    }

    public static MessengerGroupTbl getMessengerGroup() {
        MessengerGroupTbl tbl = new MessengerGroupTbl();
        tbl.setDeleted(0);
        tbl.setId(100L);
        tbl.setMhaId(100L);
        return tbl;
    }

    public static DataMediaPairTbl getDataMediaPairTbl() {
        DataMediaPairTbl tbl = new DataMediaPairTbl();
        tbl.setDeleted(0);
        tbl.setId(100L);
        tbl.setGroupId(100L);
        tbl.setSrcDataMediaName("db100\\.table1");
        tbl.setDestDataMediaName("topic");
        tbl.setProperties("properties");
        return tbl;
    }

    public static List<DbReplicationTbl> getDbReplicationTbls() {
        DbReplicationTbl tbl1 = new DbReplicationTbl();
        tbl1.setDeleted(0);
        tbl1.setReplicationType(0);
        tbl1.setSrcLogicTableName("table1");
        tbl1.setSrcMhaDbMappingId(100L);
        tbl1.setDstLogicTableName("table2");
        tbl1.setDstMhaDbMappingId(101L);
        tbl1.setId(100L);

        DbReplicationTbl tbl2 = new DbReplicationTbl();
        tbl2.setDeleted(0);
        tbl2.setReplicationType(1);
        tbl2.setSrcLogicTableName("table1");
        tbl2.setSrcMhaDbMappingId(100L);
        tbl2.setDstLogicTableName("topic");
        tbl2.setDstMhaDbMappingId(-1L);
        tbl2.setId(101L);

        return Lists.newArrayList(tbl1, tbl2);
    }

    public static List<MessengerFilterTbl> getMessengerFilters() {
        MessengerFilterTbl tbl = new MessengerFilterTbl();
        tbl.setDeleted(0);
        tbl.setId(100L);
        tbl.setProperties("properties");
        return Lists.newArrayList(tbl);
    }

}
