package com.ctrip.framework.drc.console.utils;

import com.ctrip.framework.drc.console.exception.ConsoleException;

/**
 * Created by dengquanliang
 * 2023/7/5 14:46
 */
public class ConsoleExceptionUtils {

    public static ConsoleException message(String message) {
        return new ConsoleException(message);
    }
}
