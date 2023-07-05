package com.ctrip.framework.drc.console.exception;

import java.sql.SQLException;

/**
 * Created by dengquanliang
 * 2023/7/5 14:36
 */
public class ConsoleException extends SQLException {
    public ConsoleException() {}

    public ConsoleException(String message) {
        super(message);
    }

    public ConsoleException(Throwable cause) {
        super(cause);
    }

    public ConsoleException(String message, Throwable cause) {
        super(message, cause);
    }
}
