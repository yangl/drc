package com.ctrip.framework.drc.console.service.log;

import com.ctrip.framework.drc.console.config.DomainConfig;
import com.ctrip.framework.drc.console.dao.DbTblDao;
import com.ctrip.framework.drc.console.dao.entity.DbTbl;
import com.ctrip.framework.drc.console.monitor.AbstractLeaderAwareMonitor;
import com.ctrip.framework.drc.console.service.impl.api.ApiContainer;
import com.ctrip.framework.drc.console.service.v2.MhaServiceV2;
import com.ctrip.framework.drc.console.utils.EnvUtils;
import com.ctrip.framework.drc.core.monitor.reporter.DefaultTransactionMonitorHolder;
import com.ctrip.framework.drc.core.service.email.Email;
import com.ctrip.framework.drc.core.service.email.EmailResponse;
import com.ctrip.framework.drc.core.service.email.EmailService;
import com.ctrip.framework.drc.core.service.ops.OPSApiService;
import com.ctrip.framework.drc.core.service.statistics.traffic.HickWallConflictCount;
import com.google.common.collect.Lists;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * @ClassName ConflictAlarm
 * @Author haodongPan
 * @Date 2023/11/22 15:18
 * @Version: $
 */
@Component
@Order(3)
public class ConflictAlarm extends AbstractLeaderAwareMonitor {
    
    @Autowired
    private ConflictLogService conflictLogService; 
    @Autowired
    private DbTblDao dbTblDao;
    @Autowired
    private MhaServiceV2 mhaServiceV2;
    @Autowired
    private DomainConfig domainConfig;
    
    private OPSApiService opsApiService = ApiContainer.getOPSApiServiceImpl();
    private EmailService emailService = ApiContainer.getEmailServiceImpl();
    private static final String EMAIL_STANDARD_FIRST_LINE= "DRC数据同步冲突预警。1分钟冲突统计：%s";
    private static final String EMAIL_STANDARD_SECOND_LINE= "库表名：%s,同步链路：%s";
    private static final String EMAIL_STANDARD_THIRD_LINE = "监控：%s";
    private static final String EMAIL_STANDARD_FOURTH_LINE = "DRC自助处理：%s";

    @Override
    public void initialize() {
        setInitialDelay(5);
        setPeriod(60);
        setTimeUnit(TimeUnit.SECONDS);
    }

    @Override
    public void scheduledTask() {
        try {
            if (isRegionLeader) {
                logger.info("[[task=ConflictAlarm]] is leader");
                DefaultTransactionMonitorHolder.getInstance().logTransaction("DRC.console.conflict", "checkConflict", this::checkConflict);
            } else {
                logger.info("[[task=ConflictAlarm]]not a leader do nothing");
            }
        } catch (Throwable t) {
            logger.error("[[task=ConflictAlarm]]error", t);
        }
    }
    
    protected void checkConflict() throws IOException, SQLException {
        String hickwallApi = domainConfig.getTrafficFromHickWall();
        String opsAccessToken = domainConfig.getOpsAccessToken();
        if (EnvUtils.fat()) {
            hickwallApi = domainConfig.getTrafficFromHickWallFat();
            opsAccessToken = domainConfig.getOpsAccessTokenFat();
        }
        List<HickWallConflictCount> commitTrxCounts = opsApiService.getConflictCount(hickwallApi, opsAccessToken, true, true, 1);
        List<HickWallConflictCount> rollbackTrxCounts = opsApiService.getConflictCount(hickwallApi, opsAccessToken, true, false, 1);
        List<HickWallConflictCount> commitRowsCounts = opsApiService.getConflictCount(hickwallApi, opsAccessToken, false, true, 1);
        List<HickWallConflictCount> rollbackRowsCounts = opsApiService.getConflictCount(hickwallApi, opsAccessToken, false, false, 1);
        checkConflictCount(commitTrxCounts,ConflictCountType.CONFLICT_COMMIT_TRX);
        checkConflictCount(rollbackTrxCounts,ConflictCountType.CONFLICT_ROLLBACK_TRX);
        checkConflictCount(commitRowsCounts,ConflictCountType.CONFLICT_COMMIT_ROW);
        checkConflictCount(rollbackRowsCounts,ConflictCountType.CONFLICT_ROLLBACK_ROW);
    }
    
    
    private void checkConflictCount(List<HickWallConflictCount> cflRowCounts,ConflictCountType type) throws SQLException{
        for (HickWallConflictCount cflTableRowCount : cflRowCounts) {
            Long count = cflTableRowCount.getCount();
            if (isTriggerAlarm(count,type)) {
                String db = cflTableRowCount.getDb();
                String table = cflTableRowCount.getTable();
                if (conflictLogService.isInBlackListWithCache(db, table)) {
                    continue;
                }
                String srcMha = cflTableRowCount.getSrcMha();
                String dstMha = cflTableRowCount.getDestMha();
                String srcRegion = mhaServiceV2.getRegion(srcMha);
                String dstRegion = mhaServiceV2.getRegion(dstMha);

                logger.warn("[[task=ConflictAlarm]]type:{}, db:{}, table:{}, count:{}",type.name(),db, table, count);
                if (!domainConfig.getSendConflictAlarmEmailSwitch()) {
                    continue;
                }
                Email email = generateEmail(db, table, srcMha, dstMha, srcRegion, dstRegion, type, count);
                EmailResponse emailResponse = emailService.sendEmail(email);
                if (emailResponse.isSuccess()) {
                    logger.info("[[task=ConflictAlarm]]send email success, db:{}, table:{}, count:{}", db, table, count);
                } else {
                    logger.error("[[task=ConflictAlarm]]send email failed, db:{}, table:{}, count:{}", db, table, count);
                }
            }
        }
    }
    
   
    private Email generateEmail(String db, String table, String srcMha, String dstMha, String srcRegion, String dstRegion, ConflictCountType type, Long count) throws SQLException{
        List<DbTbl> dbTbls = dbTblDao.queryByDbNames(Lists.newArrayList(db));
        if (dbTbls.isEmpty()) {
            logger.error("[[task=ConflictAlarm]]db:{} not found in drc", db);
            return null;
        }
        Email email = new Email();
        email.setSubject("DRC Conflict Alarm");
        email.setSender(domainConfig.getConflictAlarmSenderEmail());
        if (domainConfig.getSendDbOwnerConflictEmailToSwitch()) {
            email.addRecipient(dbTbls.get(0).getDbOwner() + "@trip.com");
            domainConfig.getConflictAlarmCCEmails().forEach(email::addCc);
        } else {
            domainConfig.getConflictAlarmCCEmails().forEach(email::addRecipient);
        }
        String line1 = String.format(EMAIL_STANDARD_FIRST_LINE, type + ":" + count);
        String line2 = String.format(EMAIL_STANDARD_SECOND_LINE, db + "." + table, srcMha + "(" + srcRegion + ")" + "=>" + dstMha + "(" + dstRegion + ")");
        String line3 = String.format(EMAIL_STANDARD_THIRD_LINE, domainConfig.getDrcHickwallMonitorUrl() + "&var-mha=" + srcMha);
        String line4 = String.format(EMAIL_STANDARD_FOURTH_LINE, domainConfig.getDrcConflictHandleUrl());
        email.setBodyContent(line1 + "\n" + line2 + "\n" + line3 + "\n" + line4);
        return email;
    }
  
    
    private boolean isTriggerAlarm(Long count,ConflictCountType type) {
        switch (type) {
            case CONFLICT_COMMIT_TRX:
                return count >= domainConfig.getConflictCommitTrxThreshold();
            case CONFLICT_ROLLBACK_TRX:
                return count >= domainConfig.getConflictRollbackTrxThreshold();
            case CONFLICT_COMMIT_ROW:
                return count >= domainConfig.getConflictCommitRowThreshold();
            case CONFLICT_ROLLBACK_ROW:
                return count >= domainConfig.getConflictRollbackRowThreshold();
            default:
                return false;
        }
    }
    
    
}
