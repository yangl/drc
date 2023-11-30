package com.ctrip.framework.drc.console.controller.v2;

import com.ctrip.framework.drc.console.param.NameFilterSplitParam;
import com.ctrip.framework.drc.console.param.v2.MhaDbMappingMigrateParam;
import com.ctrip.framework.drc.console.service.v2.MetaMigrateService;
import com.ctrip.framework.drc.console.vo.api.MhaNameFilterVo;
import com.ctrip.framework.drc.console.vo.response.migrate.MhaDbMappingResult;
import com.ctrip.framework.drc.console.vo.response.migrate.MigrateResult;
import com.ctrip.framework.drc.core.http.ApiResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Created by dengquanliang
 * 2023/6/16 17:58
 */
@RestController
@RequestMapping("/api/drc/v2/migrate")
public class MigrateController {

    private final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private MetaMigrateService metaMigrateService;

    @GetMapping ("/nameMapping")
    public ApiResult<List<MhaNameFilterVo>> checkNameMapping() {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.checkNameMapping());
        } catch (Exception e) {
            logger.error("checkNameMapping fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @GetMapping ("/nameFilter")
    public ApiResult<List<MhaNameFilterVo>> checkMhaFilter() {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.checkMhaFilter());
        } catch (Exception e) {
            logger.error("checkMhaFilter fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/nameFilter")
    public ApiResult<Integer> splitNameFilter(@RequestBody List<NameFilterSplitParam> paramList) {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.splitNameFilter(paramList));
        } catch (Exception e) {
            logger.error("splitNameFilter fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/nameMapping")
    public ApiResult<MigrateResult> splitNameFilterWithNameMapping() {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.splitNameFilterWithNameMapping());
        } catch (Exception e) {
            logger.error("splitNameFilterWithNameMapping fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/region")
    public ApiResult<Integer> batchInsertRegions(@RequestBody List<String> regionNames) {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.batchInsertRegions(regionNames));
        } catch (Exception e) {
            logger.error("batchInsertRegions fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/dc")
    public ApiResult<Integer> setDcRegions(@RequestBody Map<String, String> dcRegionMa) {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.batchUpdateDcRegions(dcRegionMa));
        } catch (Exception e) {
            logger.error("setDcRegions fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/mha")
    public ApiResult<MigrateResult> migrateMhaTbl() {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.migrateMhaTbl());
        } catch (Exception e) {
            logger.error("migrateMhaTbl fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/mhaReplication")
    public ApiResult<MigrateResult> migrateMhaReplication() {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.migrateMhaReplication());
        } catch (Exception e) {
            logger.error("migrateMhaReplication fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/applierGroup")
    public ApiResult<MigrateResult> migrateApplierGroup() {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.migrateApplierGroup());
        } catch (Exception e) {
            logger.error("migrateApplierGroup fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/applier")
    public ApiResult<MigrateResult> migrateApplier() {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.migrateApplier());
        } catch (Exception e) {
            logger.error("migrateApplier fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @GetMapping ("/mhaDbMapping")
    public ApiResult<MhaDbMappingResult> checkMhaDbMapping() {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.checkMhaDbMapping());
        } catch (Exception e) {
            logger.error("checkMhaDbMapping fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/mhaDbMapping")
    public ApiResult<MigrateResult> migrateMhaDbMapping(@RequestBody List<String> dbBlackList) {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.migrateMhaDbMapping(dbBlackList));
        } catch (Exception e) {
            logger.error("migrateMhaDbMapping fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/columnsFilter")
    public ApiResult<MigrateResult> migrateColumnsFilter() {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.migrateColumnsFilter());
        } catch (Exception e) {
            logger.error("migrateColumnsFilter fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/rowsFilter")
    public ApiResult<MigrateResult> migrateRowsFilter() {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.migrateRowsFilter());
        } catch (Exception e) {
            logger.error("migrateRowsFilter fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/dbReplication")
    public ApiResult<MigrateResult> migrateDbReplicationTbl(@RequestBody List<String> vpcMhaNames) {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.migrateDbReplicationTbl(vpcMhaNames));
        } catch (Exception e) {
            logger.error("migrateDbReplicationTbl fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/messengerGroup")
    public ApiResult<MigrateResult> migrateMessengerGroup() {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.migrateMessengerGroup());
        } catch (Exception e) {
            logger.error("migrateMessengerGroup fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/messengerFilter")
    public ApiResult<MigrateResult> migrateMessengerFilter() {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.migrateMessengerFilter());
        } catch (Exception e) {
            logger.error("migrateMessengerFilter fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/dbReplicationFilterMapping")
    public ApiResult<MigrateResult> migrateDbReplicationFilterMapping() {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.migrateDbReplicationFilterMapping());
        } catch (Exception e) {
            logger.error("migrateDbReplicationFilterMapping fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/manual/mhaDbMapping")
    public ApiResult<MigrateResult> manualMigrateMhaDbMapping(@RequestBody List<String> mhaNames) {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.manualMigrateMhaDbMapping(mhaNames));
        } catch (Exception e) {
            logger.error("manualMigrateMhaDbMapping fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/manual/db")
    public ApiResult<MigrateResult> manualMigrateDbs(@RequestBody List<String> dbs) {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.manualMigrateDbs(dbs));
        } catch (Exception e) {
            logger.error("manualMigrateDbs fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @PostMapping("/manual/vpc/mhaDbMapping")
    public ApiResult<MigrateResult> manualMigrateVPCMhaDbMapping(@RequestBody MhaDbMappingMigrateParam param) {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.manualMigrateVPCMhaDbMapping(param));
        } catch (Exception e) {
            logger.error("manualMigrateVPCMhaDbMapping fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }

    @GetMapping ("/vpc/mha")
    public ApiResult<List<MhaNameFilterVo>> checkVPCMha(@RequestBody List<String> mhaNames) {
        try {
            return ApiResult.getSuccessInstance(metaMigrateService.checkVPCMha(mhaNames));
        } catch (Exception e) {
            logger.error("checkVPCMha fail: {}", e);
            return ApiResult.getFailInstance(e.getMessage());
        }
    }
}