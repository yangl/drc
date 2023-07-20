package com.ctrip.framework.drc.console.service.v2.impl.migrate;


import com.ctrip.framework.drc.console.config.DefaultConsoleConfig;
import com.ctrip.framework.drc.console.monitor.delay.config.DbClusterSourceProvider;
import com.ctrip.framework.drc.console.monitor.delay.config.v2.MetaProviderV2;
import com.ctrip.framework.drc.console.service.DrcBuildService;
import com.ctrip.framework.drc.core.entity.Drc;
import com.ctrip.framework.drc.core.transform.DefaultSaxParser;
import com.ctrip.xpipe.utils.FileUtils;
import java.io.InputStream;
import org.assertj.core.util.Lists;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

public class MetaServiceV2ImplTest {

    @InjectMocks private MetaServiceV2Impl metaService;
    
    @Mock private MetaProviderV2 metaProviderV2;

    @Mock private DbClusterSourceProvider metaProviderV1;

    @Mock private DrcBuildService drcBuildService;

    @Mock private DefaultConsoleConfig consoleConfig;
    
    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.openMocks(this);
        InputStream ins = FileUtils.getFileInputStream("oldMeta.xml");
        Drc oldDrc = DefaultSaxParser.parse(ins);

        ins = FileUtils.getFileInputStream("newMeta.xml");
        Drc newDrc = DefaultSaxParser.parse(ins);

        
        Mockito.when(metaProviderV1.getDrc()).thenReturn(oldDrc);
        Mockito.when(metaProviderV2.getDrc()).thenReturn(newDrc);


        // for old meta
        Mockito.when(drcBuildService.queryTablesWithNameFilter(Mockito.eq("mha1"),Mockito.eq("db1\\.t2,db2\\.t2")))
                .thenReturn(Lists.newArrayList("db1.t2","db2.t2"));
        Mockito.when(drcBuildService.queryTablesWithNameFilter(Mockito.eq("mha3"),Mockito.eq("nameMappingshard0[1-2]db\\.t[1-8]")))
                .thenReturn(Lists.newArrayList("nameMappingshard01db.t1","nameMappingshard02db.t1"));
        Mockito.when(drcBuildService.queryTablesWithNameFilter(Mockito.eq("mha2"),Mockito.eq("nameMappingshard0[1-2]db\\.s[1-8],rowsFiltersharddb[1-2]\\.s[1-8],columnsFiltershardb[1-2]\\..*")))
                .thenReturn(Lists.newArrayList("nameMappingshard01db.s1","nameMappingshard02db.s1","rowsFiltersharddb1.s1","rowsFiltersharddb2.s1","columnsFiltershardb1.s1","columnsFiltershardb2.s1"));
        Mockito.when(drcBuildService.queryTablesWithNameFilter(Mockito.eq("mha2"),Mockito.eq("rowsFiltersharddb[1-2]\\.s[1-8]")))
                .thenReturn(Lists.newArrayList("rowsFiltersharddb1.s1","rowsFiltersharddb2.s1"));
        Mockito.when(drcBuildService.queryTablesWithNameFilter(Mockito.eq("mha2"),Mockito.eq("columnsFiltershardb[1-2]\\..*")))
                .thenReturn(Lists.newArrayList("columnsFiltershardb1.s1","columnsFiltershardb2.s1"));
        
        // for new meta
        Mockito.when(drcBuildService.queryTablesWithNameFilter(Mockito.eq("mha1"),Mockito.eq("db1\\.t2,db2\\.t2")))
                .thenReturn(Lists.newArrayList("db1.t2","db2.t2"));
        Mockito.when(drcBuildService.queryTablesWithNameFilter(Mockito.eq("mha3"),Mockito.eq("nameMappingshard01db\\.t[1-8],nameMappingshard02db\\.t[1-8]")))
                .thenReturn(Lists.newArrayList("nameMappingshard01db.t1","nameMappingshard02db.t1"));
        Mockito.when(drcBuildService.queryTablesWithNameFilter(Mockito.eq("mha2"),Mockito.eq("nameMappingshard01db\\.s[1-8],nameMappingshard02db\\.s[1-8],rowsFiltersharddb1\\.s[1-8],rowsFiltersharddb2\\.s[1-8],columnsFiltershardb1\\..*,columnsFiltershardb2\\..*")))
                .thenReturn(Lists.newArrayList("nameMappingshard01db.s1","nameMappingshard02db.s1","rowsFiltersharddb1.s1","rowsFiltersharddb2.s1","columnsFiltershardb1.s1","columnsFiltershardb2.s1"));
        Mockito.when(drcBuildService.queryTablesWithNameFilter(Mockito.eq("mha2"),Mockito.eq("rowsFiltersharddb1\\.s[1-8],rowsFiltersharddb2\\.s[1-8]")))
                .thenReturn(Lists.newArrayList("rowsFiltersharddb1.s1","rowsFiltersharddb2.s1"));
        Mockito.when(drcBuildService.queryTablesWithNameFilter(Mockito.eq("mha2"),Mockito.eq("columnsFiltershardb1\\..*,columnsFiltershardb2\\..*")))
                .thenReturn(Lists.newArrayList("columnsFiltershardb1.s1","columnsFiltershardb2.s1"));
        
        
        Mockito.when(consoleConfig.getMetaCompareParallel()).thenReturn(5);
    }

    

    @Test
    public void testCompareLogically() {
        String compareRecorder = metaService.compareDrcMeta();
        boolean equals = !(compareRecorder.contains("not equal") || compareRecorder.contains("empty"));
        Assert.assertTrue(equals);
    }
}