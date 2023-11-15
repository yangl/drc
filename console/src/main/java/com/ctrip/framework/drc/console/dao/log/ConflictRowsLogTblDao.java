package com.ctrip.framework.drc.console.dao.log;

import com.ctrip.framework.drc.console.dao.AbstractDao;
import com.ctrip.framework.drc.console.dao.log.entity.ConflictRowsLogTbl;
import com.ctrip.framework.drc.console.param.log.ConflictRowsLogQueryParam;
import com.ctrip.platform.dal.dao.DalHints;
import com.ctrip.platform.dal.dao.sqlbuilder.MatchPattern;
import com.ctrip.platform.dal.dao.sqlbuilder.SelectSqlBuilder;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

/**
 * Created by dengquanliang
 * 2023/9/26 14:26
 */
@Repository
public class ConflictRowsLogTblDao extends AbstractDao<ConflictRowsLogTbl> {

    private static final String CONFLICT_TRX_LOG_ID = "conflict_trx_log_id";
    private static final String DB_NAME = "db_name";
    private static final String TABLE_NAME = "table_name";
    private static final String ROW_RESULT = "row_result";
    private static final String HANDLE_TIME = "handle_time";
    private static final String SRC_REGION = "src_region";
    private static final String DST_REGION = "dst_region";
    private static final String ID = "id";
    private static final String WHERE_SQL = "handle_time >= ? and handle_time <= ?";

    public ConflictRowsLogTblDao() throws SQLException {
        super(ConflictRowsLogTbl.class);
    }

    public List<ConflictRowsLogTbl> queryByParam(ConflictRowsLogQueryParam param) throws SQLException {
        SelectSqlBuilder sqlBuilder = buildSqlBuilder(param);
        sqlBuilder.selectCount();
        int count = client.count(sqlBuilder, new DalHints()).intValue();
        param.getPageReq().setTotalCount(count);

        sqlBuilder = buildSqlBuilder(param);
        sqlBuilder.selectAll().atPage(param.getPageReq().getPageIndex(), param.getPageReq().getPageSize()).orderBy(HANDLE_TIME, false);
        return queryList(sqlBuilder);
    }

    public List<ConflictRowsLogTbl> queryByTrxLogId(long trxLogId) throws SQLException {
        SelectSqlBuilder sqlBuilder = initSqlBuilder();
        sqlBuilder.and().equal(CONFLICT_TRX_LOG_ID, trxLogId, Types.BIGINT);
        return queryList(sqlBuilder);
    }

    public List<ConflictRowsLogTbl> queryByTrxLogIds(List<Long> trxLogIds) throws SQLException {
        SelectSqlBuilder sqlBuilder = initSqlBuilder();
        sqlBuilder.and().in(CONFLICT_TRX_LOG_ID, trxLogIds, Types.BIGINT);
        return queryList(sqlBuilder);
    }

    private SelectSqlBuilder buildSqlBuilder(ConflictRowsLogQueryParam param) throws SQLException {
        SelectSqlBuilder sqlBuilder = initSqlBuilder();
        sqlBuilder.and().equalNullable(CONFLICT_TRX_LOG_ID, param.getConflictTrxLogId(), Types.BIGINT)
                .and().inNullable(DB_NAME, param.getDbsWithPermission(), Types.VARCHAR)
                .and().likeNullable(TABLE_NAME, param.getTableName(), MatchPattern.CONTAINS, Types.VARCHAR)
                .and().equalNullable(SRC_REGION, param.getSrcRegion(), Types.VARCHAR)
                .and().equalNullable(DST_REGION, param.getDstRegion(), Types.VARCHAR)
                .and().equalNullable(ROW_RESULT, param.getRowResult(), Types.TINYINT);
        if (param.getBeginHandleTime() != null && param.getBeginHandleTime() > 0L) {
            sqlBuilder.and().greaterThan(HANDLE_TIME, param.getBeginHandleTime(), Types.BIGINT);
        }
        if (param.getEndHandleTime() != null && param.getEndHandleTime() > 0L) {
            sqlBuilder.and().lessThan(HANDLE_TIME, param.getEndHandleTime(), Types.BIGINT);
        }
        return sqlBuilder;
    }

    public int batchDeleteByHandleTime(long beginTime, long endTime) throws SQLException {
        return client.delete(WHERE_SQL, new DalHints(), beginTime, endTime);
    }
}
