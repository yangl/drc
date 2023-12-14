package com.ctrip.framework.drc.manager.ha.cluster.impl;

import com.ctrip.framework.drc.core.Constants;
import com.ctrip.framework.drc.core.entity.DbCluster;
import com.ctrip.framework.drc.core.entity.Messenger;
import com.ctrip.framework.drc.core.server.config.RegistryKey;
import com.ctrip.framework.drc.core.server.container.ZookeeperValue;
import com.ctrip.framework.drc.core.utils.NameUtils;
import com.ctrip.framework.drc.manager.ha.config.ClusterZkConfig;
import com.ctrip.framework.drc.manager.ha.meta.comparator.ClusterComparator;
import com.ctrip.framework.drc.manager.ha.meta.comparator.MessengerComparator;
import com.ctrip.xpipe.api.lifecycle.TopElement;
import com.ctrip.xpipe.api.observer.Observer;
import com.ctrip.xpipe.codec.JsonCodec;
import com.ctrip.xpipe.utils.ObjectUtils;
import org.apache.curator.framework.recipes.cache.ChildData;
import org.apache.curator.framework.recipes.locks.LockInternals;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Created by jixinwang on 2022/10/31
 */
@Component
public class MessengerInstanceElectorManager extends AbstractInstanceElectorManager implements InstanceElectorManager, Observer, TopElement {

    @Override
    protected String getLeaderPath(String clusterId) {
        return ClusterZkConfig.getApplierLeaderLatchPath(clusterId);
    }

    @Override
    protected String getType() {
        return Constants.ENTITY_MESSENGER;
    }

    @Override
    protected boolean watchIfNotWatched(String clusterId) {
        return currentMetaManager.watchMessengerIfNotWatched(clusterId);
    }

    @Override
    protected void handleClusterAdd(DbCluster dbCluster) {
        String clusterId = dbCluster.getId();
        try {
            List<Messenger> messengers = dbCluster.getMessengers();
            if (!messengers.isEmpty()) {
                for (Messenger messenger : messengers) {
                    String registryKey = NameUtils.getMessengerRegisterKey(clusterId, messenger);
                    observerClusterLeader(registryKey);
                }
            }
        } catch (Exception e) {
            logger.error("[handleClusterAdd]" + clusterId, e);
        }
    }

    @Override
    protected void handleClusterModified(ClusterComparator comparator) {
        String clusterId = comparator.getCurrent().getId();
        MessengerComparator messengerComparator = comparator.getMessengerComparator();
        Set<Messenger> addedMessenger = messengerComparator.getAdded();
        doObserveLeader(clusterId, addedMessenger);
    }

    private void doObserveLeader(String clusterId, Collection<Messenger> messengers) {
        for (Messenger messenger : messengers) {
            String registryKey = NameUtils.getMessengerRegisterKey(clusterId, messenger);
            observerClusterLeader(registryKey);
        }
    }

    protected void updateClusterLeader(String leaderLatchPath, List<ChildData> childrenData, String tmpClusterId) {
        RegistryKey registryKey = RegistryKey.from(tmpClusterId);
        String clusterId = registryKey.toString();
        logger.info("[Transfer][messenger] {} to {}", tmpClusterId, clusterId);

        List<String> childrenPaths = new LinkedList<>();
        childrenData.forEach(childData -> childrenPaths.add(childData.getPath()));

        logger.info("[updateShardLeader][messenger]{}, {}", tmpClusterId, childrenPaths);

        List<String> sortedChildren = LockInternals.getSortedChildren("latch-", sorter, childrenPaths);

        List<Messenger> survivalMessengers = new ArrayList<>(childrenData.size());

        String targetDB = RegistryKey.getTargetDB(tmpClusterId);

        for (String path : sortedChildren) {
            for (ChildData childData : childrenData) {
                if (path.equals(childData.getPath())) {
                    String data = new String(childData.getData());
                    ZookeeperValue zookeeperValue = JsonCodec.INSTANCE.decode(data, ZookeeperValue.class);
                    Messenger messenger = getMessenger(clusterId, zookeeperValue.getIp(), zookeeperValue.getPort(), targetDB);
                    if (messenger != null) {
                        survivalMessengers.add(messenger);
                        logger.info("[Survive] messenger {}:{}", zookeeperValue.getIp(), zookeeperValue.getPort());
                    } else {
                        logger.info("[Survive] messenger null for {}:{}", zookeeperValue.getIp(), zookeeperValue.getPort());
                    }
                    break;
                }
            }
        }

        if (survivalMessengers.size() != childrenData.size()) {
            throw new IllegalStateException(String.format("[children data not equal with survival messengers]%s, %s", childrenData, survivalMessengers));
        }

        InstanceActiveElectAlgorithm klea = instanceActiveElectAlgorithmManager.get(clusterId);
        Messenger activeMessenger = (Messenger) klea.select(clusterId, survivalMessengers);  //set master
        currentMetaManager.setSurviveMessengers(clusterId, survivalMessengers, activeMessenger);
    }

    private Messenger getMessenger(String clusterId, String ip, int port, String targetDB) {
        DbCluster dbCluster = regionCache.getCluster(clusterId);
        List<Messenger> messengerList = dbCluster.getMessengers();
        return messengerList.stream().filter(messenger ->
                messenger.getIp().equalsIgnoreCase(ip)
                        && messenger.getPort() == port
                        && (targetDB == null || ObjectUtils.equals(messenger.getIncludedDbs(), targetDB)))
                .findFirst().orElse(null);
    }
}
