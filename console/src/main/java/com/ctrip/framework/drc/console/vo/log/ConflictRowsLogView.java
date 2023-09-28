package com.ctrip.framework.drc.console.vo.log;

/**
 * Created by dengquanliang
 * 2023/9/26 15:19
 */
public class ConflictRowsLogView {
    private Long conflictRowsLogId;
    private String dbName;
    private String tableName;
    private String handleTime;
    private Integer rowResult;
    private String srcDc;
    private String dstDc;

    public Long getConflictRowsLogId() {
        return conflictRowsLogId;
    }

    public void setConflictRowsLogId(Long conflictRowsLogId) {
        this.conflictRowsLogId = conflictRowsLogId;
    }

    public String getDbName() {
        return dbName;
    }

    public void setDbName(String dbName) {
        this.dbName = dbName;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getHandleTime() {
        return handleTime;
    }

    public void setHandleTime(String handleTime) {
        this.handleTime = handleTime;
    }

    public Integer getRowResult() {
        return rowResult;
    }

    public void setRowResult(Integer rowResult) {
        this.rowResult = rowResult;
    }

    public String getSrcDc() {
        return srcDc;
    }

    public void setSrcDc(String srcDc) {
        this.srcDc = srcDc;
    }

    public String getDstDc() {
        return dstDc;
    }

    public void setDstDc(String dstDc) {
        this.dstDc = dstDc;
    }
}
