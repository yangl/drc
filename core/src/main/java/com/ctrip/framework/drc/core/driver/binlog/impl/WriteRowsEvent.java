package com.ctrip.framework.drc.core.driver.binlog.impl;

import com.ctrip.framework.drc.core.driver.IoCache;
import com.ctrip.framework.drc.core.driver.binlog.LogEvent;
import io.netty.buffer.ByteBuf;

import java.io.IOException;
import java.util.List;

/**
 * Created by @author zhuYongMing on 2019/9/6.
 */
public class WriteRowsEvent extends AbstractRowsEvent {

    @Override
    public WriteRowsEvent read(ByteBuf byteBuf) {
        final LogEvent logEvent = super.read(byteBuf);
        if (null == logEvent) {
            return null;
        }

        return this;
    }

    public WriteRowsEvent() {
    }

    public WriteRowsEvent(WriteRowsEvent rowsEvent, List<TableMapLogEvent.Column> columns) throws IOException {
        super(rowsEvent, columns);
    }

    @Override
    public void write(IoCache ioCache) {
        super.write(ioCache);
    }

    @Override
    public List<List<Object>> getAfterPresentRowsValues() {
        throw new UnsupportedOperationException("WriteRowsEvent haven't after values");
    }

    @Override
    public List<Boolean> getAfterRowsKeysPresent() {
        throw new UnsupportedOperationException("WriteRowsEvent haven't after keys");
    }
}
