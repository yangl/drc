package com.ctrip.framework.drc.console.param.v2;

import com.ctrip.framework.drc.core.http.PageReq;

public class MigrationTaskQuery extends PageReq {

    private String operator;
    private String status;
    private String oldMha;
    private String newMha;

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getOldMha() {
        return oldMha;
    }

    public void setOldMha(String oldMha) {
        this.oldMha = oldMha;
    }

    public String getNewMha() {
        return newMha;
    }

    public void setNewMha(String newMha) {
        this.newMha = newMha;
    }
}
