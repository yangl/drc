package com.ctrip.framework.drc.replicator.impl.oubound.handler;

import com.ctrip.framework.drc.core.driver.IoCache;
import com.ctrip.framework.drc.core.driver.binlog.HeartBeatCallBack;
import com.ctrip.framework.drc.core.driver.binlog.LogEvent;
import com.ctrip.framework.drc.core.driver.binlog.impl.DrcHeartbeatLogEvent;
import com.ctrip.framework.drc.core.driver.command.SERVER_COMMAND;
import com.ctrip.framework.drc.core.driver.command.ServerCommandPacket;
import com.ctrip.framework.drc.core.driver.command.handler.CommandHandler;
import com.ctrip.framework.drc.core.driver.command.handler.HeartBeatHandler;
import com.ctrip.framework.drc.core.driver.command.packet.client.HeartBeatResponsePacket;
import com.ctrip.framework.drc.core.monitor.reporter.DefaultEventMonitorHolder;
import com.ctrip.framework.drc.core.server.utils.ThreadUtils;
import com.ctrip.framework.drc.replicator.container.config.HeartBeatConfiguration;
import com.ctrip.xpipe.netty.commands.NettyClient;
import com.ctrip.xpipe.utils.VisibleForTesting;
import com.google.common.collect.Maps;
import io.netty.buffer.ByteBuf;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.util.concurrent.GenericFutureListener;

import java.util.Collection;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import static com.ctrip.framework.drc.core.server.config.SystemConfig.CONNECTION_IDLE_TIMEOUT_SECOND;
import static com.ctrip.framework.drc.core.server.config.SystemConfig.HEARTBEAT_LOGGER;

/**
 * @Author limingdong
 * @create 2022/3/29
 */
public class HeartBeatCommandHandler extends AbstractServerCommandHandler implements CommandHandler, HeartBeatHandler {

    private long EXPIRE_TIME = CONNECTION_IDLE_TIMEOUT_SECOND * 1000;

    private String registerKey;

    private ScheduledExecutorService heartBeatExecutorService;

    private ConcurrentMap<Channel, HeartBeatContext> responses = Maps.newConcurrentMap();

    private HeartBeatConfiguration heartBeatConfiguration = HeartBeatConfiguration.getInstance();

    public HeartBeatCommandHandler(String registerKey) {
        this.registerKey = registerKey;
    }

    @Override
    public void handle(ServerCommandPacket serverCommandPacket, NettyClient nettyClient) {
        HeartBeatResponsePacket heartBeatResponsePacket = (HeartBeatResponsePacket) serverCommandPacket;
        int autoRead = heartBeatResponsePacket.getAutoRead();
        if (autoRead != HeartBeatCallBack.AUTO_READ) {
            updateAutoRead(nettyClient.channel());
        } else {
            removeCachedChannel(nettyClient.channel());
        }
    }

    @Override
    public SERVER_COMMAND getCommandType() {
        return SERVER_COMMAND.COM_HEARTBEAT_RESPONSE;
    }

    @Override
    public void dispose() {
        responses.clear();
        heartBeatExecutorService.shutdown();
    }

    @Override
    public void initialize() {
        heartBeatExecutorService = ThreadUtils.newSingleThreadScheduledExecutor("HeartBeatResponse-" + registerKey);
        heartBeatExecutorService.scheduleWithFixedDelay(() -> {
            try {
                if (!heartBeatConfiguration.gray(registerKey)) {
                    responses.clear();
                    HEARTBEAT_LOGGER.info("[HeartBeat] scheduled service return due to not gray for {}", registerKey);
                    return;
                }
                if (responses.isEmpty()) {
                    HEARTBEAT_LOGGER.info("[HeartBeat] scheduled service return due to empty");
                    return;
                }
                Map<Channel, HeartBeatContext> copy = Maps.newHashMap(responses);
                for (Map.Entry<Channel, HeartBeatContext> entry : copy.entrySet()) {
                    Channel channel = entry.getKey();
                    if (expired(entry.getValue())) {
                        removeCachedChannel(channel);
                        channel.close();
                        HEARTBEAT_LOGGER.warn("[HeartBeat] expired for {} and close channel", channel);
                    }
                }
            } catch (Throwable t) {
                HEARTBEAT_LOGGER.error("[HeartBeat] check error");
            }
        }, 0, EXPIRE_TIME / 2, TimeUnit.MILLISECONDS);
    }

    @Override
    public void sendHeartBeat(Channel channel) {
        DrcHeartbeatLogEvent drcHeartbeatLogEvent = new DrcHeartbeatLogEvent(0);
        drcHeartbeatLogEvent.write(new IoCache() {
            @Override
            public void write(byte[] data) {
            }

            @Override
            public void write(Collection<ByteBuf> byteBufs) {
                for (ByteBuf byteBuf : byteBufs) {
                    byteBuf.readerIndex(0);
                    ChannelFuture future = channel.writeAndFlush(byteBuf);
                    future.addListener((GenericFutureListener) f -> {
                        if (!f.isSuccess()) {
                            removeCachedChannel(channel);
                            HEARTBEAT_LOGGER.error("[Remove] {} due to sending drcHeartbeatLogEvent error", channel);
                        } else {
                            HeartBeatContext context = newHeartBeatContext();
                            responses.putIfAbsent(channel, newHeartBeatContext());
                            HEARTBEAT_LOGGER.info("[Send] send heartbeat to {}:{}", channel, context.getTime());
                        }
                    });
                }
            }

            @Override
            public void write(Collection<ByteBuf> byteBuf, boolean isDdl) {
            }

            @Override
            public void write(LogEvent logEvent) {
            }
        });
        DefaultEventMonitorHolder.getInstance().logEvent("DRC.replicator.network.writeidle", channel.remoteAddress().toString());
    }

    private void removeCachedChannel(Channel channel) {
        HeartBeatContext heartBeatContext = responses.remove(channel);
        HEARTBEAT_LOGGER.info("[Remove] heartbeat for {}:{}", channel, heartBeatContext);
    }

    private void updateAutoRead(Channel channel) {
        HeartBeatContext heartBeatContext = responses.getOrDefault(channel, newHeartBeatContext());
        heartBeatContext.setAutoRead(HeartBeatCallBack.AUTO_READ_CLOSE);
        HEARTBEAT_LOGGER.info("[Update] heartbeat for {}:{}", channel, heartBeatContext);
    }

    private HeartBeatContext newHeartBeatContext() {
        return new HeartBeatContext(System.currentTimeMillis(), HeartBeatCallBack.AUTO_READ);
    }

    private boolean expired(HeartBeatContext heartBeatContext) {
        if (heartBeatContext.getAutoRead() != HeartBeatCallBack.AUTO_READ) {
            return false;
        }
        return System.currentTimeMillis() - heartBeatContext.getTime() > EXPIRE_TIME;
    }

    @VisibleForTesting
    public void setEXPIRE_TIME(long expireTime) {
        EXPIRE_TIME = expireTime;
    }

    @VisibleForTesting
    public ConcurrentMap<Channel, HeartBeatContext> getResponses() {
        return responses;
    }

    private static class HeartBeatContext {

        private long time;

        private int autoRead;

        public HeartBeatContext(long time, int autoRead) {
            this.time = time;
            this.autoRead = autoRead;
        }

        public long getTime() {
            return time;
        }

        public void setTime(long time) {
            this.time = time;
        }

        public int getAutoRead() {
            return autoRead;
        }

        public void setAutoRead(int autoRead) {
            this.autoRead = autoRead;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof HeartBeatContext)) return false;
            HeartBeatContext that = (HeartBeatContext) o;
            return time == that.time &&
                    autoRead == that.autoRead;
        }

        @Override
        public int hashCode() {

            return Objects.hash(time, autoRead);
        }

        @Override
        public String toString() {
            return "HeartBeatContext{" +
                    "time=" + time +
                    ", autoRead=" + autoRead +
                    '}';
        }
    }
}