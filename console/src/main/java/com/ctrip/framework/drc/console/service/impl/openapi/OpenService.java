package com.ctrip.framework.drc.console.service.impl.openapi;

import com.ctrip.framework.drc.console.dao.entity.MachineTbl;
import com.ctrip.framework.drc.console.vo.response.*;
import com.ctrip.framework.drc.core.http.ApiResult;
import com.ctrip.framework.drc.core.http.HttpUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created by jixinwang on 2021/7/14
 */
@Service
public class OpenService {

    public MhaListApiResult getMhas(String uri, Map<String, String> params) {
        return HttpUtils.get(uri, MhaListApiResult.class, params);
    }

    public MhaNamesResponseVo getMhaNamesToBeMonitored(String uri) {
        return HttpUtils.get(uri, MhaNamesResponseVo.class);
    }
    
    public UuidResponseVo getUUIDFromRemoteDC(String uri, Map<String, Object> params) {
        return HttpUtils.get(uri,UuidResponseVo.class,params);
    }

    public ApiResult<String> updateUuidByMachineTbl(String uri, MachineTbl machineTbl) {
        return HttpUtils.post(uri, machineTbl, ApiResult.class);
    }
}
