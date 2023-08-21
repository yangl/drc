package com.ctrip.framework.drc.console.vo.display.v2;

import com.ctrip.framework.drc.console.dto.MhaDelayInfoDto;

public class DelayInfoVo {

    private Long srcLastUpdateTime;
    private Long dstLastUpdateTime;
    private Long value;

    public Long getSrcLastUpdateTime() {
        return srcLastUpdateTime;
    }

    public Long getDstLastUpdateTime() {
        return dstLastUpdateTime;
    }

    public Long getValue() {
        return value;
    }

    public static DelayInfoVo from(MhaDelayInfoDto mhaReplicationDelay) {
        DelayInfoVo vo = new DelayInfoVo();
        vo.srcLastUpdateTime = mhaReplicationDelay.getSrcLastUpdateTime();
        vo.dstLastUpdateTime = mhaReplicationDelay.getDstLastUpdateTime();
        vo.value = mhaReplicationDelay.getValue();
        return vo;
    }
}
