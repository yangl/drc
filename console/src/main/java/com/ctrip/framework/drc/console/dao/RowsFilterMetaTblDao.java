package com.ctrip.framework.drc.console.dao;

import com.ctrip.framework.drc.console.dao.entity.RowsFilterMetaTbl;
import com.ctrip.framework.drc.console.enums.BooleanEnum;
import com.ctrip.platform.dal.dao.sqlbuilder.SelectSqlBuilder;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.sql.Types;

/**
 * Created by dengquanliang
 * 2023/4/23 19:47
 */
@Repository
public class RowsFilterMetaTblDao extends AbstractDao<RowsFilterMetaTbl> {

    private static final String ID = "id";
    private static final String META_FILTER_NAME = "meta_filter_name";
    private static final String DELETED = "deleted";

    public RowsFilterMetaTblDao(Class<RowsFilterMetaTbl> clazz) throws SQLException {
        super(clazz);
    }

    public RowsFilterMetaTbl queryByMetaFilterName(String metaFilterName) throws SQLException {
        SelectSqlBuilder sqlBuilder = new SelectSqlBuilder();
        sqlBuilder.selectAll().equal(META_FILTER_NAME, metaFilterName, Types.VARCHAR).and().equal(DELETED, BooleanEnum.FALSE.getCode(), Types.TINYINT);
        return client.queryFirst(sqlBuilder, null);
    }

    public RowsFilterMetaTbl queryById(Long id) throws SQLException {
        SelectSqlBuilder sqlBuilder = new SelectSqlBuilder();
        sqlBuilder.selectAll().equal(ID, id, Types.BIGINT).and().equal(DELETED, BooleanEnum.FALSE.getCode(), Types.TINYINT);
        return client.queryFirst(sqlBuilder, null);
    }

}
