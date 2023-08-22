package com.ctrip.framework.drc.console.dao.v2;

import com.ctrip.framework.drc.console.dao.AbstractDao;
import com.ctrip.framework.drc.console.dao.entity.v2.MhaDbMappingTbl;
import com.ctrip.framework.drc.console.enums.BooleanEnum;
import com.ctrip.platform.dal.dao.DalHints;
import com.ctrip.platform.dal.dao.sqlbuilder.SelectSqlBuilder;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by dengquanliang
 * 2023/5/25 12:02
 */
@Repository
public class MhaDbMappingTblDao extends AbstractDao<MhaDbMappingTbl> {

    private static final String ID = "id";
    private static final String DELETED = "deleted";
    private static final String MHA_ID = "mha_id";
    private static final String DB_ID = "db_id";

    public MhaDbMappingTblDao() throws SQLException {
        super(MhaDbMappingTbl.class);
    }

    public List<MhaDbMappingTbl> queryByIds(List<Long> ids) throws SQLException {
        if (CollectionUtils.isEmpty(ids)) {
            return new ArrayList<>();
        }
        SelectSqlBuilder sqlBuilder = new SelectSqlBuilder();
        sqlBuilder.selectAll().in(ID, ids, Types.BIGINT).and().equal(DELETED, BooleanEnum.FALSE.getCode(), Types.TINYINT);
        return client.query(sqlBuilder, new DalHints());
    }

    public List<MhaDbMappingTbl> queryByDbId(Long dbId) throws SQLException {
        if (dbId == null || dbId == 0L) {
            throw new IllegalArgumentException("dbId is null or 0");
        }
        SelectSqlBuilder sqlBuilder = new SelectSqlBuilder();
        sqlBuilder.selectAll().equal(DB_ID, dbId, Types.BIGINT).and().equal(DELETED, BooleanEnum.FALSE.getCode(), Types.TINYINT);
        return client.query(sqlBuilder, new DalHints());
    }

    public MhaDbMappingTbl queryByDbIdAndMhaId(Long dbId,Long mhaId) throws SQLException {
        if (dbId == null || dbId == 0L || mhaId == null || mhaId == 0L) {
            throw new IllegalArgumentException("dbId,mhaId is null or 0");
        }
        SelectSqlBuilder sqlBuilder = new SelectSqlBuilder();
        sqlBuilder.selectAll().equal(DB_ID, dbId, Types.BIGINT).
                and().equal(MHA_ID, mhaId, Types.BIGINT).
                and().equal(DELETED, BooleanEnum.FALSE.getCode(), Types.TINYINT);
        List<MhaDbMappingTbl> query = client.query(sqlBuilder, new DalHints());
        return CollectionUtils.isEmpty(query) ? null : query.get(0);
    }

    public List<MhaDbMappingTbl> queryByMhaId(long mhaId) throws SQLException {
        SelectSqlBuilder sqlBuilder = new SelectSqlBuilder();
        sqlBuilder.selectAll().equal(MHA_ID, mhaId, Types.BIGINT).and().equal(DELETED, BooleanEnum.FALSE.getCode(), Types.TINYINT);
        return client.query(sqlBuilder, new DalHints());
    }

    public List<MhaDbMappingTbl> queryByMhaIds(List<Long> mhaIds) throws SQLException {
        SelectSqlBuilder sqlBuilder = new SelectSqlBuilder();
        sqlBuilder.selectAll().in(MHA_ID, mhaIds, Types.BIGINT).and().equal(DELETED, BooleanEnum.FALSE.getCode(), Types.TINYINT);
        return client.query(sqlBuilder, new DalHints());
    }
}
