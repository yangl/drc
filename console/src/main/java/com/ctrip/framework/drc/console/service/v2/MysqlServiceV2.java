package com.ctrip.framework.drc.console.service.v2;

import com.ctrip.framework.drc.console.utils.MySqlUtils;
import com.ctrip.framework.drc.console.vo.check.TableCheckVo;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by dengquanliang
 * 2023/8/11 15:48
 */
public interface MysqlServiceV2 {
    // forward by mha
    String getMhaExecutedGtid(String mha);

    // forward by mha
    String getMhaPurgedGtid(String mha);

    // route By mha
    Map<String, Object> preCheckMySqlConfig(String mha) ;

    // route By mha
    List<TableCheckVo> preCheckMySqlTables(String mha, String nameFilter);

    List<MySqlUtils.TableSchemaName> getMatchTable(String mhaName,String nameFilter);

    // route By mha
    List<String> queryDbsWithNameFilter(String mha, String nameFilter);

    // route By mha
    List<String> queryTablesWithNameFilter(String mha, String nameFilter);

    // route By mhaName
    Set<String> getCommonColumnIn(String mhaName, String namespace, String name);

    Set<String> getTablesWithoutColumn(String column, String namespace, String name, String mhaName);
}
