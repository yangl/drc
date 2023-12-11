package com.ctrip.framework.drc.console.service.v2.resource.impl;

import com.ctrip.framework.drc.console.config.DefaultConsoleConfig;
import com.ctrip.framework.drc.console.dao.BuTblDao;
import com.ctrip.framework.drc.console.dao.DcTblDao;
import com.ctrip.framework.drc.console.dao.ProxyTblDao;
import com.ctrip.framework.drc.console.dao.entity.ProxyTbl;
import com.ctrip.framework.drc.console.dto.ProxyDto;
import com.ctrip.framework.drc.console.enums.BooleanEnum;
import com.ctrip.framework.drc.console.service.v2.resource.ProxyService;
import com.ctrip.framework.drc.console.utils.ConsoleExceptionUtils;
import com.ctrip.framework.drc.core.http.ApiResult;
import com.google.common.collect.Lists;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by dengquanliang
 * 2023/12/6 20:26
 */
@Service
public class ProxyServiceImpl implements ProxyService {

    @Autowired
    private DefaultConsoleConfig consoleConfig;
    @Autowired
    private ProxyTblDao proxyTblDao;
    @Autowired
    private DcTblDao dcTblDao;
    @Autowired
    private BuTblDao buTblDao;

    @Override
    public List<String> getProxyUris(String dc) throws Exception {
        Set<String> dcsInSameRegion = consoleConfig.getDcsInSameRegion(dc);
        List<String> proxyUris = Lists.newArrayList();
        for (String InSameRegion : dcsInSameRegion) {
            Long dcId = dcTblDao.queryByDcName(InSameRegion).getId();
            proxyTblDao.queryByDcId(dcId, BooleanEnum.FALSE.getCode()).forEach(proxyTbl -> proxyUris.add(proxyTbl.getUri()));
        }
        return proxyUris;
    }

    @Override
    public List<String> getAllProxyUris() throws Exception {
        return proxyTblDao.queryAllExist().stream().map(ProxyTbl::getUri).collect(Collectors.toList());
    }

    @Override
    public ApiResult inputProxy(ProxyDto proxyDto) {
        try {
            proxyTblDao.upsert(toProxyTbl(proxyDto));
            return ApiResult.getSuccessInstance(String.format("input Proxy %s succeeded", proxyDto));
        } catch (Exception e) {
            return ApiResult.getFailInstance(String.format("input Proxy %s failed: %s", proxyDto, e));
        }
    }

    @Override
    public ApiResult deleteProxy(ProxyDto proxyDto) {
        try {
            ProxyTbl proxyTbl = toProxyTbl(proxyDto);
            proxyTbl.setDeleted(BooleanEnum.TRUE.getCode());
            proxyTblDao.upsert(toProxyTbl(proxyDto));
            return ApiResult.getSuccessInstance(String.format("delete Proxy %s succeeded", proxyDto));
        } catch (Exception e) {
            return ApiResult.getFailInstance(String.format("delete Proxy %s failed: %s", proxyDto, e));
        }
    }

    @Override
    public ApiResult inputDc(String dc) {
        try {
            dcTblDao.upsert(dc);
            return ApiResult.getSuccessInstance(String.format("input dc %s succeeded", dc));
        } catch (SQLException e) {
            return ApiResult.getFailInstance(String.format("input dc %s failed: %s", dc, e));
        }
    }

    @Override
    public ApiResult inputBu(String bu) {
        try {
            buTblDao.upsert(bu);
            return ApiResult.getSuccessInstance(String.format("input bu %s succeeded", bu));
        } catch (SQLException e) {
            return ApiResult.getFailInstance(String.format("input bu %s failed: %s", bu, e));
        }
    }

    private ProxyTbl toProxyTbl(ProxyDto proxyDto) throws Exception {

        if(!prerequisite(proxyDto)) {
            throw ConsoleExceptionUtils.message("all args should be not null: " + this);
        }

        ProxyTbl proxyTbl = new ProxyTbl();
        Long dcId = dcTblDao.upsert(proxyDto.getDc());
        proxyTbl.setDcId(dcId);
        proxyTbl.setUri(String.format("%s://%s:%s", proxyDto.getProtocol(), proxyDto.getIp(), proxyDto.getPort()));
        proxyTbl.setActive(BooleanEnum.TRUE.getCode());
        proxyTbl.setMonitorActive(BooleanEnum.FALSE.getCode());
        proxyTbl.setDeleted(BooleanEnum.FALSE.getCode());
        return proxyTbl;
    }

    private boolean prerequisite(ProxyDto proxyDto) {
        return StringUtils.isNotBlank(proxyDto.getDc())
                && StringUtils.isNotBlank(proxyDto.getProtocol())
                && StringUtils.isNotBlank(proxyDto.getIp())
                && StringUtils.isNotBlank(proxyDto.getPort());
    }
}
