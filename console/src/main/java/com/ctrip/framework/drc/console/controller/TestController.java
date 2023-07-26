package com.ctrip.framework.drc.console.controller;


import com.ctrip.framework.drc.console.dto.BuildMhaDto;
import com.ctrip.framework.drc.console.dto.MhaInstanceGroupDto;
import com.ctrip.framework.drc.console.dto.MhaMachineDto;
import com.ctrip.framework.drc.console.service.SSOService;
import com.ctrip.framework.drc.console.service.impl.AccessServiceImpl;
import com.ctrip.framework.drc.console.service.impl.DrcMaintenanceServiceImpl;
import com.ctrip.framework.drc.core.http.ApiResult;
import com.ctrip.framework.drc.core.monitor.reporter.DefaultEventMonitorHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Map;


/**
 * @author maojiawei
 * @version 1.0
 * date: 2020-07-28
 */
@RestController
@RequestMapping("/test")
public class TestController {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private AccessServiceImpl accessServiceImp;

    @Autowired
    private DrcMaintenanceServiceImpl drcMaintenanceService;
    
    @Autowired
    private SSOService ssoServiceImpl;

    @GetMapping()
    public ApiResult preCheck(@RequestBody String requestBody) {
        logger.info("[API] precheck : {}", requestBody);
        return ApiResult.getSuccessInstance(true);
    }

    @PostConstruct
    public void init(){
        int a= 0;
        System.out.println(a);
        logger.info("test controller initing");
    }

    
}
