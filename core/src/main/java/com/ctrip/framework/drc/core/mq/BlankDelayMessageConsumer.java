package com.ctrip.framework.drc.core.mq;

import java.util.Set;

/**
 * @ClassName BlankDelayMessageConsumer
 * @Author haodongPan
 * @Date 2022/11/10 16:08
 * @Version: $
 */
public class BlankDelayMessageConsumer implements DelayMessageConsumer {
    @Override
    public void initConsumer(String subject, String consumerGroup) {}

    @Override
    public boolean stopListen() {
        return false;
    }

    @Override
    public boolean resumeListen(Set<String> mhasToBeMonitored) {
        return false;
    }

    @Override
    public int getOrder() {
        return 1;
    }
}
