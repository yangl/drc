package com.ctrip.framework.drc.core.server.config.applier.dto;

import com.ctrip.framework.drc.core.meta.ApplierMeta;
import com.ctrip.framework.drc.core.meta.DataMediaConfig;
import com.ctrip.framework.drc.core.server.config.ApplierRegistryKey;
import com.ctrip.framework.drc.core.utils.NameUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.commons.lang3.StringUtils;

import java.util.Objects;

/**
 * @Author Slight
 * Nov 07, 2019
 */
public class ApplierConfigDto extends ApplierMeta {

    private static final int DEFAULT_APPLY_COUNT = 10;
    private static final int TRANSACTION_TABLE_APPLY_COUNT = 100;
    private static final int DB_TRANSACTION_TABLE_APPLY_COUNT = 20;

    private int gaqSize;
    private int workerCount;
    private int workerSize;
    private String gtidExecuted;
    private String managerIp;
    private int managerPort;
    private String includedDbs;
    private String nameFilter;
    private String nameMapping;
    private String routeInfo;
    private String skipEvent;
    private int applyMode;
    private String properties;

    private DataMediaConfig dataMediaConfig;

    public String getManagerIp() {
        return managerIp;
    }

    public void setManagerIp(String managerIp) {
        this.managerIp = managerIp;
    }

    public int getManagerPort() {
        return managerPort;
    }

    public void setManagerPort(int managerPort) {
        this.managerPort = managerPort;
    }

    public String getGtidExecuted() {
        return gtidExecuted;
    }

    public void setGtidExecuted(String gtidExecuted) {
        this.gtidExecuted = gtidExecuted;
    }

    public int getGaqSize() {
        return gaqSize;
    }

    public void setGaqSize(int gaqSize) {
        this.gaqSize = gaqSize;
    }

    public int getWorkerCount() {
        Integer concurrency = getDataMediaConfig().getConcurrency();
        if (concurrency != null && concurrency > 0) {
            workerCount = concurrency;
        }

        if (workerCount > 0) {
            return workerCount;
        } else {
            int applyParallel;
            switch (ApplyMode.getApplyMode(applyMode)) {
                case transaction_table:
                    applyParallel = TRANSACTION_TABLE_APPLY_COUNT;
                    break;
                case db_transaction_table:
                    applyParallel = DB_TRANSACTION_TABLE_APPLY_COUNT;
                    break;
                default:
                    applyParallel = DEFAULT_APPLY_COUNT;
            }
            return applyParallel;
        }
    }

    public void setWorkerCount(int workerCount) {
        this.workerCount = workerCount;
    }

    public int getWorkerSize() {
        return workerSize;
    }

    public void setWorkerSize(int workerSize) {
        this.workerSize = workerSize;
    }

    public String getIncludedDbs() {
        return includedDbs;
    }

    public void setIncludedDbs(String includedDbs) {
        this.includedDbs = includedDbs;
    }

    public String getNameFilter() {
        return nameFilter;
    }

    public void setNameFilter(String nameFilter) {
        this.nameFilter = nameFilter;
    }

    public String getNameMapping() {
        return nameMapping;
    }

    public void setNameMapping(String nameMapping) {
        this.nameMapping = nameMapping;
    }

    public String getRouteInfo() {
        return routeInfo;
    }

    public void setRouteInfo(String routeInfo) {
        this.routeInfo = routeInfo;
    }

    public String getSkipEvent() {
        return skipEvent;
    }

    public void setSkipEvent(String skipEvent) {
        this.skipEvent = skipEvent;
    }

    public int getApplyMode() {
        return applyMode;
    }

    public void setApplyMode(int applyMode) {
        this.applyMode = applyMode;
    }

    public String getProperties() {
        return properties;
    }

    public void setProperties(String properties) {
        this.properties = properties;
    }

    public DataMediaConfig getDataMediaConfig() {
        if (dataMediaConfig == null) {
            try {
                dataMediaConfig = DataMediaConfig.from(getRegistryKey(), properties);
            } catch (Exception e) {
                throw new RuntimeException("parse dataMediaConfig error: ", e);
            }
        }
        return dataMediaConfig;
    }

    public void setDataMediaConfig(DataMediaConfig dataMediaConfig) {
        this.dataMediaConfig = dataMediaConfig;
    }

    @JsonIgnore
    public String getRegistryKey() {
        String registerKey = ApplierRegistryKey.from(target.mhaName, super.getCluster(), replicator.mhaName);
        registerKey = NameUtils.dotSchemaIfNeed(registerKey, applyMode, includedDbs);
        return registerKey;
    }

    @Override
    public String toString() {
        return "ApplierConfigDto{" +
                "gaqSize=" + gaqSize +
                ", workerCount=" + workerCount +
                ", workerSize=" + workerSize +
                ", gtidExecuted='" + gtidExecuted + '\'' +
                ", includedDbs='" + includedDbs + '\'' +
                ", nameFilter='" + nameFilter + '\'' +
                ", nameMapping='" + nameMapping + '\'' +
                ", routeInfo='" + routeInfo + '\'' +
                ", managerIp='" + managerIp + '\'' +
                ", managerPort=" + managerPort +
                ", mhaName=" + mhaName +
                ", replicator=" + replicator +
                ", target=" + target +
                ", name='" + name + '\'' +
                ", port=" + port +
                ", ip='" + ip + '\'' +
                ", idc='" + idc + '\'' +
                ", cluster='" + cluster + '\'' +
                ", applyMode='" + applyMode + '\'' +
                ", properties='" + properties + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ApplierConfigDto)) return false;
        if (!super.equals(o)) return false;
        ApplierConfigDto that = (ApplierConfigDto) o;
        if (StringUtils.isBlank(gtidExecuted) && StringUtils.isNotBlank(that.gtidExecuted)) return false;
        return gaqSize == that.gaqSize &&
                workerCount == that.workerCount &&
                workerSize == that.workerSize &&
                Objects.equals(replicator.ip, that.replicator.ip) &&
                replicator.port == that.replicator.port &&
                Objects.equals(target.ip, that.target.ip) &&
                Objects.equals(includedDbs, that.includedDbs) &&
                Objects.equals(nameFilter, that.nameFilter) &&
                Objects.equals(nameMapping, that.nameMapping) &&
                Objects.equals(routeInfo, that.routeInfo) &&
                target.port == that.target.port &&
                applyMode == that.applyMode &&
                Objects.equals(properties, that.properties);
    }

    public boolean equalsIgnoreProperties(Object o) {
        if (this == o) return true;
        if (!(o instanceof ApplierConfigDto)) return false;
        if (!super.equals(o)) return false;
        ApplierConfigDto that = (ApplierConfigDto) o;
        if (StringUtils.isBlank(gtidExecuted) && StringUtils.isNotBlank(that.gtidExecuted)) return false;
        return gaqSize == that.gaqSize &&
                workerCount == that.workerCount &&
                workerSize == that.workerSize &&
                Objects.equals(replicator.ip, that.replicator.ip) &&
                replicator.port == that.replicator.port &&
                Objects.equals(target.ip, that.target.ip) &&
                Objects.equals(includedDbs, that.includedDbs) &&
                Objects.equals(nameMapping, that.nameMapping) &&
                Objects.equals(routeInfo, that.routeInfo) &&
                target.port == that.target.port &&
                applyMode == that.applyMode;
    }

    public boolean equalsProperties(Object o) {
        ApplierConfigDto that = (ApplierConfigDto) o;
        return Objects.equals(nameFilter, that.nameFilter) &&
                Objects.equals(properties, that.properties);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), gaqSize, workerCount, workerSize, replicator.ip, replicator.port, target.ip, includedDbs, nameFilter, nameMapping, routeInfo, target.port, applyMode, properties);
    }
}
