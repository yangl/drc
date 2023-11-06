package com.ctrip.framework.drc.applier.activity.monitor;

import com.ctrip.framework.drc.applier.utils.ApplierDynamicConfig;
import com.ctrip.framework.drc.fetcher.activity.monitor.ReportActivity;
import com.ctrip.framework.drc.fetcher.conflict.ConflictTransactionLog;
import com.ctrip.framework.drc.fetcher.system.InstanceConfig;
import com.ctrip.framework.drc.core.http.ApiResult;
import com.google.common.collect.Lists;
import java.util.concurrent.LinkedBlockingQueue;
import org.springframework.http.*;
import org.springframework.web.client.RestOperations;

import java.util.List;

/**
 * Created by jixinwang on 2020/10/14
 */
public class ReportConflictActivity extends ReportActivity<ConflictTransactionLog, Boolean> {

    @InstanceConfig(path = "cluster")
    public String cluster = "unset";

    @InstanceConfig(path = "replicator.mhaName")
    public String srcMhaName = "unset";

    @InstanceConfig(path = "target.mhaName")
    public String destMhaName = "unset";
    
    // one brief log is about 250 bytes, 100000 logs is about 25M
    // {
    //		"srcMha": "mha1",
    //		"dstMha": "mha2",
    //		"gtid": "uuid1:1",
    //		"trxRowsNum": 1000,
    //		"cflRowsNum": 200,
    //		"trxRes": 0 
    //		"handleTime": 1695633004624, 
    //		"cflLogs": [ 
    //			{
    //				"db": "db",
    //				"table" : "table",
    //				"rawSql": "",
    //				"rawSqlRes": "",
    //				"dstRowRecord": "",
    //				"handleSql" "",
    //				"handleSqlRes": "",
    //				"rowRes": 0 
    //			}
    //		]
    // }
    private final LinkedBlockingQueue<ConflictTransactionLog> briefLogsQueue = new LinkedBlockingQueue<>(ApplierDynamicConfig.getInstance().getBriefLogsQueueSize());
    private final String conflictLogUploadUrl = ApplierDynamicConfig.getInstance().getConflictLogUploadUrl();

    @Override
    public void doReport(List<ConflictTransactionLog> taskList) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Lists.newArrayList(MediaType.APPLICATION_JSON));
        HttpEntity<Object> entity = new HttpEntity<Object>(taskList, headers);
        restTemplate.exchange(conflictLogUploadUrl, HttpMethod.POST, entity, ApiResult.class);
        if (!briefLogsQueue.isEmpty()) {
            List<ConflictTransactionLog> logs = Lists.newArrayList();
            HttpEntity<Object> briefLogs = new HttpEntity<Object>(logs, headers);
            briefLogsQueue.drainTo(logs,ApplierDynamicConfig.getInstance().getBriefLogsReportSize()); // todo add debug log
            restTemplate.exchange(conflictLogUploadUrl, HttpMethod.POST, briefLogs, ApiResult.class);
        }
    }

    @Override
    public boolean report(ConflictTransactionLog conflictTransactionLog) {
        String conflictLogUploadSwitch = ApplierDynamicConfig.getInstance().getConflictLogUploadSwitch();
         if ("on".equals(conflictLogUploadSwitch)) {
            conflictTransactionLog.setSrcMha(srcMhaName);
            conflictTransactionLog.setDstMha(destMhaName);
            conflictTransactionLog.setHandleTime(System.currentTimeMillis());
            if(!trySubmit(conflictTransactionLog)) {
                return reportBriefLog(conflictTransactionLog);
            }
            return true;
        }
        return false;
    }
    
    private boolean reportBriefLog(ConflictTransactionLog conflictTransactionLog) {
        conflictTransactionLog.brief();
        return briefLogsQueue.offer(conflictTransactionLog);
    }

    public void setRestTemplate(RestOperations restTemplate) {
        this.restTemplate = restTemplate;
    }
}
