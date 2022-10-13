package com.ctrip.framework.drc.replicator.impl.inbound.filter.transaction;

import com.ctrip.framework.drc.core.driver.binlog.constant.LogEventType;
import com.ctrip.framework.drc.core.driver.binlog.impl.XidLogEvent;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.ByteBufAllocator;
import org.junit.Assert;
import org.junit.Test;

import static com.ctrip.framework.drc.core.driver.binlog.constant.LogEventType.xid_log_event;

/**
 * @Author limingdong
 * @create 2022/9/30
 */
public class TransactionTableMarkedXidLogEventTest {

    @Test
    public void readTest() {
        ByteBuf byteBuf = initByteBuf();
        XidLogEvent delegate = new XidLogEvent().read(byteBuf);
        TransactionTableMarkedXidLogEvent xidLogEvent = new TransactionTableMarkedXidLogEvent(delegate);

        // valid
        Assert.assertEquals(xid_log_event, LogEventType.getLogEventType(xidLogEvent.getLogEventHeader().getEventType()));
        Assert.assertEquals(1092, xidLogEvent.getXid());
        Assert.assertEquals("3ac7e582", Long.toHexString(xidLogEvent.getChecksum()));
        Assert.assertEquals(31, byteBuf.readerIndex());
        Assert.assertEquals(12, xidLogEvent.getPayloadBuf().readerIndex());
        Assert.assertEquals(19, xidLogEvent.getLogEventHeader().getHeaderBuf().readerIndex());
    }

    @Test
    public void constructXidLogEventAndWriteTest() {
        final XidLogEvent delegate = new XidLogEvent(1L, 100, 1092);
        TransactionTableMarkedXidLogEvent constructXidLogEvent = new TransactionTableMarkedXidLogEvent(delegate);

        final ByteBuf writeByteBuf = ByteBufAllocator.DEFAULT.directBuffer();
        constructXidLogEvent.write(byteBufs -> {
            for (ByteBuf byteBuf : byteBufs) {
                final byte[] bytes = new byte[byteBuf.writerIndex()];
                for (int i = 0; i < byteBuf.writerIndex(); i++) {
                    bytes[i] = byteBuf.getByte(i);
                }
                writeByteBuf.writeBytes(bytes);
            }
        });

        final TransactionTableMarkedXidLogEvent readXidLogEvent = new TransactionTableMarkedXidLogEvent(new XidLogEvent()).read(writeByteBuf);
        Assert.assertEquals(constructXidLogEvent, readXidLogEvent);
    }


    /*
     * # at 12246
     * #190911 11:35:26 server id 1  end_log_pos 12277 CRC32 0x3ac7e582        Xid = 1092
     *
     *  7e 6b 78 5d 10 01 00 00  00 1f 00 00 00 f5 2f 00
     *  00 00 00 44 04 00 00 00  00 00 00 82 e5 c7 3a
     */
    private ByteBuf initByteBuf() {
        final ByteBuf byteBuf = ByteBufAllocator.DEFAULT.directBuffer(35);
        byte[] bytes = new byte[] {
                (byte) 0x7e, (byte) 0x6b, (byte) 0x78, (byte) 0x5d, (byte) 0x10, (byte) 0x01, (byte) 0x00, (byte) 0x00,
                (byte) 0x00, (byte) 0x1f, (byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0xf5, (byte) 0x2f, (byte) 0x00,

                (byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x44, (byte) 0x04, (byte) 0x00, (byte) 0x00, (byte) 0x00,
                (byte) 0x00, (byte) 0x00, (byte) 0x00, (byte) 0x82, (byte) 0xe5, (byte) 0xc7, (byte) 0x3a
        };
        byteBuf.writeBytes(bytes);

        return byteBuf;
    }
}