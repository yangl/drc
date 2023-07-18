package com.ctrip.framework.drc.console.service.v2.impl.migrate;

import com.ctrip.framework.drc.console.config.DefaultConsoleConfig;
import com.ctrip.framework.drc.console.config.MhaGrayConfig;
import com.ctrip.framework.drc.console.monitor.AbstractMonitor;
import com.ctrip.framework.drc.console.monitor.delay.config.DbClusterSourceProvider;
import com.ctrip.framework.drc.console.monitor.delay.config.v2.MetaProviderV2;
import com.ctrip.framework.drc.console.service.DrcBuildService;
import com.ctrip.framework.drc.console.service.v2.MetaGrayService;
import com.ctrip.framework.drc.core.entity.DbCluster;
import com.ctrip.framework.drc.core.entity.Dc;
import com.ctrip.framework.drc.core.entity.Drc;
import com.ctrip.framework.drc.core.server.utils.ThreadUtils;
import com.ctrip.framework.drc.core.transform.DefaultSaxParser;
import com.google.common.collect.Lists;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

/**
 * @ClassName MetaGrayServiceImpl
 * @Author haodongPan
 * @Date 2023/6/28 14:56
 * @Version: $
 */
@Service
public class MetaGrayServiceImpl extends AbstractMonitor implements MetaGrayService {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired private MetaProviderV2 metaProviderV2;

    @Autowired private DbClusterSourceProvider metaProviderV1;

    @Autowired private DrcBuildService drcBuildService;

    @Autowired private DefaultConsoleConfig consoleConfig;

    @Autowired private MhaGrayConfig mhaGrayConfig;

    private StringBuilder recorder;
    private final ExecutorService comparators = ThreadUtils.newCachedThreadPool("metaCompare");
    private final ReentrantLock lock = new ReentrantLock();

    private volatile Drc grayDrc;


    @Override
    public Drc getDrc(String dcId)  {
        Dc dc = getDrc().findDc(dcId);
        Drc drcWithOneDc = new Drc();
        drcWithOneDc.addDc(dc);
        return drcWithOneDc;
    }

    @Override
    public void initialize() {
        setInitialDelay(30);
        setPeriod(30);
        setTimeUnit(TimeUnit.SECONDS);
        super.initialize();
    }

    @Override
    public synchronized void scheduledTask() {
        try {
            long start = System.currentTimeMillis();
            logger.info("[[tag=metaGray]] refreshDrc start");
            grayDrc = refreshDrc();
            logger.info("[[tag=metaGray]] refreshDrc end,cost:{}",System.currentTimeMillis() - start);
        } catch (Throwable t) {
            logger.error("[[tag=metaGray]] refresh gray drc fail", t);
        }
    }

    public synchronized Drc refreshDrc()  {
        Drc oldDrc = metaProviderV1.getDrc();
        Set<String> publicCloudRegion = consoleConfig.getPublicCloudRegion();
        String localRegion = consoleConfig.getRegion();
        if (publicCloudRegion.contains(localRegion)) { //cloud region use remoteConfig,which already recombination
            return oldDrc;
        }
        try {
            if (mhaGrayConfig.getDbClusterGraySwitch()) {
                Drc drcCopy = DefaultSaxParser.parse(oldDrc.toString());
                int memoryAddress1 = System.identityHashCode(oldDrc);
                int memoryAddress2 = System.identityHashCode(drcCopy);
                boolean anotherObject = !(drcCopy == oldDrc) && !(memoryAddress1 == memoryAddress2);
                logger.info("[[tag=metaGray]] drc deep copy res:{}",anotherObject);
                for (String dbClusterId : mhaGrayConfig.getGrayDbClusterSet()) {
                    Dc newDc = metaProviderV2.getDcBy(dbClusterId);
                    DbCluster newDcDbCluster = newDc.findDbCluster(dbClusterId);

                    if(!mhaGrayConfig.getDbClusterGrayCompareSwitch()  || metaConsistent(dbClusterId)) {
                        Dc dcCopy = drcCopy.findDc(newDc.getId());
                        logger.info("[[tag=metaGray]] gray dbClusterId:{},oldDbCluster:{},newDbCluster:{}",dbClusterId,
                                dcCopy.findDbCluster(dbClusterId),newDcDbCluster);
                        dcCopy.removeDbCluster(dbClusterId);
                        dcCopy.addDbCluster(newDcDbCluster);
                    } else {
                        logger.error("[[tag=metaGray]] dbClusterId:{} xml not equals ,do nothing", dbClusterId);
                    }
                }
                return drcCopy;
            }
        } catch (Throwable e) {
            logger.error("[[tag=metaGray]] gray new meta fail,use old meta", e);
        }
        return oldDrc;
    }

    @Override
    public Drc getDrc()  {
        if (null == grayDrc) {
            grayDrc = refreshDrc();
        }
        return grayDrc;
    }


    @Override
    public DbClusterCompareRes compareDbCluster(String dbClusterId) {
        DbClusterCompareRes res = new DbClusterCompareRes();
        try {
            DbCluster oldDbCluster =  metaProviderV1.getDcBy(dbClusterId).findDbCluster(dbClusterId);
            DbCluster newDbCluster =  metaProviderV2.getDcBy(dbClusterId).findDbCluster(dbClusterId);
            res.setOldDbCluster(oldDbCluster);
            res.setNewDbCluster(newDbCluster);
            String compareRes = new DbClusterComparator(
                    oldDbCluster, newDbCluster, drcBuildService,
                    consoleConfig.getCostTimeTraceSwitch(),consoleConfig.getLocalConfigCloudDc()).call();

            res.setCompareRes(compareRes);
        } catch (Exception e) {
            logger.error("[[tag=metaCompare]] compare dbCluster fail:{}",dbClusterId,e);
            res.setCompareRes("compare fail");
        }
        return res;
    }

    private boolean metaConsistent(String dbClusterId) {
        DbClusterCompareRes res = compareDbCluster(dbClusterId);
        String compareRes = res.getCompareRes();
        return !(compareRes.contains("not equal") || compareRes.contains("empty") || compareRes.contains("fail"));
    }

    @Override
    public String compareDrcMeta()  {
        try {
            lock.lock();
            Drc newDrc = metaProviderV2.getDrc();
            Drc oldDrc = metaProviderV1.getDrc();
            recorder = new StringBuilder();
            compareLogically(oldDrc, newDrc);
        } finally {
            lock.unlock();
            logger.warn("[[tag=metaCompare]] res:{}",recorder.toString());
        }
        return recorder.toString();
    }


    protected void compareLogically(Drc oldDrc,Drc newDrc) {
        Map<String, Dc> oldDcs = oldDrc.getDcs();
        Map<String, Dc> newDcs = newDrc.getDcs();
        if (oldDcs.size() != newDcs.size()) {
            recorder.append("MetaDcs size is not equal!");
        }
        for (Entry<String, Dc> dcEntry : oldDcs.entrySet()) {
            String dcId = dcEntry.getKey();
            recorder.append("\n[CompareDc]:").append(dcId);

            Dc oldDc = dcEntry.getValue();
            Dc newDc = newDcs.getOrDefault(dcId, null);
            if (null == newDc) {
                recorder.append("\nnewMetaDc is empty!");
                continue;
            }

            if (!oldDc.getRoutes().equals(newDc.getRoutes())) {
                recorder.append("\nRoute is not equal!");
            }
            if (!oldDc.getClusterManagers().equals(newDc.getClusterManagers())) {
                recorder.append("\nClusterManagers is not equal!");
            }
            if (!oldDc.getZkServer().equals(newDc.getZkServer())) {
                recorder.append("\nZkServer is not equal!");
            }

            Map<String, DbCluster> oldDbClusters = oldDc.getDbClusters();
            Map<String, DbCluster> newDbClusters = newDc.getDbClusters();
            if (oldDbClusters.size() != newDbClusters.size()) {
                recorder.append("\nDbCluster size is not equal!");
            }

            List<Future<String>> recorderFutures = Lists.newArrayList();

            for (Entry<String, DbCluster> dbClusterEntry : oldDbClusters.entrySet()) {
                String dbClusterId = dbClusterEntry.getKey();

                DbCluster oldDbCluster = dbClusterEntry.getValue();
                DbCluster newDbCluster = newDbClusters.getOrDefault(dbClusterId, null);

                recorderFutures.add(comparators.submit(
                        new DbClusterComparator(
                                oldDbCluster, newDbCluster, drcBuildService, consoleConfig.getCostTimeTraceSwitch(),
                                consoleConfig.getLocalConfigCloudDc()
                        )));

                if (recorderFutures.size() >= consoleConfig.getMetaCompareParallel()) {
                    Iterator<Future<String>> iterator = recorderFutures.iterator();
                    while (iterator.hasNext()) {
                        Future<String> dbClusterRes = iterator.next();
                        try {
                            recorder.append(dbClusterRes.get());
                            iterator.remove();
                        } catch (InterruptedException | ExecutionException e) {
                            logger.error("[[tag=xmlCompare]] compare DbCluster fail in parallel", e);
                            recorder.append("compare DbCluster fail in parallel before:").append(oldDbCluster.getId());
                        }

                    }
                }

            }

            // rest
            if (!CollectionUtils.isEmpty(recorderFutures)) {
                for (Future<String> recorderFuture : recorderFutures) {
                    try {
                        recorder.append(recorderFuture.get());
                    } catch (Exception e) {
                        logger.error("[[tag=xmlCompare]] compare DbCluster fail in parallel", e);
                        recorder.append("compare DbCluster fail in parallel");
                    }
                }
            }
        }
    }


}
