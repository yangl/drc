package com.ctrip.framework.drc.console.enums;

/**
 * Created by dengquanliang
 * 2023/11/30 14:46
 */
public enum MysqlAccountTypeEnum {
    DRC_CONSOLE(0),
    DRC_WRITE(1),
    DRC_READ(2),
    ;

    private int code;

    MysqlAccountTypeEnum(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
