package com.ctrip.framework.drc.console.dto.v2;

import com.ctrip.framework.drc.console.dao.entity.v2.MhaReplicationTbl;
import com.ctrip.framework.drc.console.dao.entity.v2.MhaTblV2;

import java.util.Map;

public class MhaReplicationDto {
    private Long replicationId;
    private MhaDto srcMha;
    private MhaDto dstMha;

    /**
     * @see com.ctrip.framework.drc.console.enums.TransmissionTypeEnum
     */
    private String type;
    private Long datachangeLasttime;
    /**
     * 1: 已建立
     * 0: 未建立
     */
    private Integer status;

    public static MhaReplicationDto from(MhaReplicationTbl e, Map<Long, MhaTblV2> mhaMap) {
        MhaReplicationDto dto = new MhaReplicationDto();
        dto.setReplicationId(e.getId());
        dto.setDatachangeLasttime(e.getDatachangeLasttime().getTime());
        dto.setStatus(e.getDrcStatus());
        dto.setSrcMha(MhaDto.from(mhaMap.get(e.getSrcMhaId())));
        dto.setDstMha(MhaDto.from(mhaMap.get(e.getDstMhaId())));
        return dto;
    }

    public Long getReplicationId() {
        return replicationId;
    }

    public void setReplicationId(Long replicationId) {
        this.replicationId = replicationId;
    }

    public MhaDto getSrcMha() {
        return srcMha;
    }

    public void setSrcMha(MhaDto srcMha) {
        this.srcMha = srcMha;
    }

    public MhaDto getDstMha() {
        return dstMha;
    }

    public void setDstMha(MhaDto dstMha) {
        this.dstMha = dstMha;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getDatachangeLasttime() {
        return datachangeLasttime;
    }

    public void setDatachangeLasttime(Long datachangeLasttime) {
        this.datachangeLasttime = datachangeLasttime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
