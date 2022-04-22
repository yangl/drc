package com.ctrip.framework.drc.core.server.common;

import com.ctrip.framework.drc.core.driver.binlog.LogEvent;
import com.ctrip.framework.drc.core.driver.binlog.constant.LogEventType;
import com.ctrip.framework.drc.core.driver.util.LogEventUtils;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.CompositeByteBuf;
import io.netty.buffer.PooledByteBufAllocator;
import io.netty.buffer.Unpooled;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

import static com.ctrip.framework.drc.core.driver.binlog.constant.LogEventHeaderLength.eventHeaderLengthVersionGt1;

/**
 * @Author limingdong
 * @create 2022/4/22
 */
public class EventReader {

    private static final Logger logger = LoggerFactory.getLogger(EventReader.class);

    public static void readEvent(FileChannel fileChannel, LogEvent logEvent) {
        CompositeByteBuf compositeByteBuf = PooledByteBufAllocator.DEFAULT.compositeDirectBuffer();
        try {
            ByteBuf headByteBuf = EventReader.readHeader(fileChannel);
            long eventSize = LogEventUtils.parseNextLogEventSize(headByteBuf);
            ByteBuf bodyByteBuf = EventReader.readBody(fileChannel, eventSize);
            compositeByteBuf.addComponents(true, headByteBuf, bodyByteBuf);
            logEvent.read(compositeByteBuf);
        } finally {
            compositeByteBuf.release();
        }
    }

    public static CompositeByteBuf readEvent(FileChannel fileChannel, long eventSize, LogEvent logEvent, ByteBuf headByteBuf) {
        ByteBuf bodyByteBuf = readBody(fileChannel, eventSize); //read all eventSize
        CompositeByteBuf compositeByteBuf = PooledByteBufAllocator.DEFAULT.compositeDirectBuffer();
        compositeByteBuf.addComponents(true, headByteBuf, bodyByteBuf);
        logEvent.read(compositeByteBuf);
        return compositeByteBuf;
    }

    public static ByteBuf readBody(FileChannel fileChannel, long eventSize) {
        int bodySize = (int) eventSize - eventHeaderLengthVersionGt1;
        return doRead(fileChannel, bodySize);

    }

    public static ByteBuf readHeader(FileChannel fileChannel) {
        return doRead(fileChannel, eventHeaderLengthVersionGt1);
    }

    private static ByteBuf doRead(FileChannel fileChannel, int readSize) {
        try {
            ByteBuffer headBuffer = ByteBuffer.allocateDirect(readSize);
            ByteBuf byteBuf = Unpooled.wrappedBuffer(headBuffer);
            readFixSize(fileChannel, headBuffer, byteBuf, readSize);
            return byteBuf;
        } catch (Throwable t) {
            logger.error("doRead error and readSize {}", readSize, t);
            throw t;
        }
    }

    private static boolean readFixSize(FileChannel fileChannel, ByteBuffer byteBuffer, ByteBuf byteBuf, int expectedSize) {
        int MAX_TIMES = 10;
        int readTime = 0;
        int remindSize = expectedSize;
        int size = 0;
        try {
            do {
                size = fileChannel.read(byteBuffer);
                if (remindSize == size) {
                    if (readTime > 0) {
                        long eventSize = LogEventUtils.parseNextLogEventSize(byteBuf);
                        LogEventType eventType = LogEventUtils.parseNextLogEventType(byteBuf);
                        logger.warn("Event type is {} and size is {}", eventType, eventSize);
                    }
                    return true;
                }
                logger.warn("Event size {} less than {}", size, remindSize);
                if (size > 0) {
                    remindSize -= size;
                }
                readTime++;
                Thread.sleep(1 << readTime);
            } while (readTime < MAX_TIMES);
            logger.error("Remind event size {} to be read", remindSize);
        } catch (Exception e) {
            logger.error("readFixSize error with size {}, remind size {}", size, remindSize, e);
        }
        return false;
    }
}
