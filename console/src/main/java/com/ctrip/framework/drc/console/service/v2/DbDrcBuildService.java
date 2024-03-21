package com.ctrip.framework.drc.console.service.v2;

import com.ctrip.framework.drc.console.dto.v3.*;
import com.ctrip.framework.drc.console.param.v2.DrcBuildBaseParam;
import com.ctrip.framework.drc.console.param.v2.DrcBuildParam;
import com.ctrip.framework.drc.console.vo.v2.ColumnsConfigView;
import com.ctrip.framework.drc.console.vo.v2.RowsFilterConfigView;
import com.ctrip.framework.drc.core.driver.binlog.gtid.GtidSet;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface DbDrcBuildService {

    List<DbApplierDto> getMhaDbAppliers(String srcMhaName, String dstMhaName);

    List<DbApplierDto> getMhaDbAppliers(List<MhaDbReplicationDto> replicationDtos);

    List<DbApplierDto> getMhaDbMessengers(String mhaName) throws Exception;

    /**
     * @param param drc build param
     * @return drc xml
     */
    String buildDbApplier(DrcBuildParam param) throws Exception;

    String buildDbMessenger(DrcBuildBaseParam param) throws Exception;

    boolean isDbApplierConfigurable(String mhaName);

    GtidSet getMhaDrcExecutedGtid(String srcMhaName, String dstMhaName) throws SQLException;

    Map<String, GtidSet> getDbDrcExecutedGtid(String srcMhaName, String dstMhaName) throws SQLException;

    String getMhaDrcExecutedGtidTruncate(String srcMhaName, String dstMhaName);

    String getDbDrcExecutedGtidTruncate(String srcMhaName, String dstMhaName);

    void autoConfigDbAppliers(String srcMha, String dstMha, List<String> dbNames, String initGtid) throws Exception;

    List<DbDrcConfigInfoDto> getExistDbReplicationDirections(String dbName);

    DbDrcConfigInfoDto getDbDrcConfig(String dbName, String srcRegionName, String dstRegionName);

    RowsFilterConfigView getRowsConfigViewById(long rowsFilterId);

    ColumnsConfigView getColumnsConfigViewById(long colsFilterId);

    void createDbReplication(DbReplicationCreateDto createDto) throws Exception;

    void createMhaDbDrcReplication(MhaDbReplicationCreateDto createDto) throws Exception;

    void editDbReplication(DbReplicationEditDto editDto) throws Exception;

    void deleteDbReplication(DbReplicationEditDto editDto) throws Exception;
}