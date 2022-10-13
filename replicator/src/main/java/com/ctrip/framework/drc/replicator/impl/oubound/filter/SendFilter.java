package com.ctrip.framework.drc.replicator.impl.oubound.filter;

import com.ctrip.framework.drc.core.server.common.filter.AbstractPostLogEventFilter;
import com.ctrip.framework.drc.replicator.impl.oubound.channel.BinlogFileRegion;
import io.netty.buffer.ByteBuf;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.util.concurrent.GenericFutureListener;

import static com.ctrip.framework.drc.core.driver.binlog.constant.LogEventHeaderLength.eventHeaderLengthVersionGt1;

/**
 * @Author limingdong
 * @create 2022/4/22
 */
public class SendFilter extends AbstractPostLogEventFilter<OutboundLogEventContext> {

    private Channel channel;

    public SendFilter(Channel channel) {
        this.channel = channel;
    }

    @Override
    public boolean doFilter(OutboundLogEventContext value) {
        boolean noRowFiltered = doNext(value, value.isNoRowFiltered());
        if (value.getCause() != null) {
            return noRowFiltered;
        }

        if (value.isSkipEvent()) {
            return true;
        }

        if (noRowFiltered) {
            channel.writeAndFlush(new BinlogFileRegion(value.getFileChannel(), value.getFileChannelPos() - eventHeaderLengthVersionGt1, value.getEventSize()).retain());
        } else {
            sendRowsEvent(value);
        }
        return noRowFiltered;
    }

    private void sendRowsEvent(OutboundLogEventContext value) {
        value.getRowsEvent().write(byteBufs -> {
            for (ByteBuf byteBuf : byteBufs) {
                byteBuf.readerIndex(0);
                ChannelFuture future = channel.writeAndFlush(byteBuf);
                future.addListener((GenericFutureListener) f -> {
                    if (!f.isSuccess()) {
                        channel.close();
                        logger.error("[Send] {} error", channel, f.cause());
                    }
                });
            }
        });
    }
}
