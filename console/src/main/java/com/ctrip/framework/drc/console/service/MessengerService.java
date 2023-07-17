package com.ctrip.framework.drc.console.service;

import com.ctrip.framework.drc.console.dto.MqConfigDto;
import com.ctrip.framework.drc.console.vo.check.MqConfigCheckVo;
import com.ctrip.framework.drc.console.vo.check.MqConfigConflictTable;
import com.ctrip.framework.drc.console.vo.display.MessengerVo;
import com.ctrip.framework.drc.console.vo.display.MqConfigVo;
import com.ctrip.framework.drc.console.vo.api.MessengerInfo;
import com.ctrip.framework.drc.core.entity.Messenger;

import java.sql.SQLException;
import java.util.List;

public interface MessengerService {
    
    // meta
    List<Messenger> generateMessengers (Long mhaId) throws SQLException;

    
    // messenger
    List<MessengerVo> getAllMessengerVos() throws SQLException;

    List<String> getMessengerIps (Long mhaId) throws SQLException;
    
    String removeMessengerGroup(String mhaName) throws Exception;
    
    
    // mqConfig
    List<MqConfigVo> getMqConfigVos(Long messengerGroupId) throws SQLException;
    
    String processAddMqConfig(MqConfigDto dto) throws Exception;

    String processUpdateMqConfig(MqConfigDto dto) throws Exception;
    
    String processDeleteMqConfig(String dc, Long mqConfigId) throws Exception;

    MqConfigCheckVo checkMqConfig(MqConfigDto dto) throws SQLException;

    List<String> getBusFromQmq() throws Exception;
    
    // openApi
    List<MessengerInfo> getAllMessengersInfo() throws SQLException;

    String getMessengerGtidExecuted(String localMha) throws SQLException;

//    void addDalClusterMqConfigByDDL(String dc, String mhaName, String schema, String table) throws SQLException;
}
