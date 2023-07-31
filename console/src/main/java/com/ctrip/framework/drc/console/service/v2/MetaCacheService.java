package com.ctrip.framework.drc.console.service.v2;

import com.ctrip.framework.drc.console.pojo.MonitorMetaInfo;
import com.ctrip.framework.drc.console.pojo.ReplicatorWrapper;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface MetaCacheService {

    Map<String, List<ReplicatorWrapper>> getAllReplicatorsInLocalRegion();

    Map<String, ReplicatorWrapper> getMasterReplicatorsToBeMonitored(List<String> mhaNamesToBeMonitored);

    Map<String, Set<String>> getMha2UuidsMap(Set<String> dcNames);

    MonitorMetaInfo getMonitorMetaInfo() throws SQLException;
}
