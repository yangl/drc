package com.ctrip.framework.drc.applier.activity.event;

import com.ctrip.framework.drc.applier.event.ApplierDrcTableMapEvent;
import com.ctrip.framework.drc.applier.event.ApplierTableMapEvent;
import com.ctrip.framework.drc.applier.event.ApplierWriteRowsEvent;
import com.ctrip.framework.drc.applier.resource.position.TransactionTable;
import com.ctrip.framework.drc.applier.resource.position.TransactionTableResource;
import com.ctrip.framework.drc.core.driver.binlog.gtid.GtidSet;
import com.ctrip.framework.drc.fetcher.event.ApplierDrcGtidEvent;
import com.ctrip.framework.drc.fetcher.event.ApplierGtidEvent;
import com.ctrip.framework.drc.fetcher.event.ApplierXidEvent;
import com.ctrip.framework.drc.fetcher.resource.context.NetworkContextResource;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

import static com.ctrip.framework.drc.applier.resource.position.TransactionTableResource.TRANSACTION_TABLE_SIZE;
import static org.mockito.Mockito.times;

/**
 * Created by jixinwang on 2022/2/9
 */
public class TransactionTableApplierDumpEventActivityTest {

    private TransactionTableApplierDumpEventActivity dumpEventActivity;

    private TransactionTable transactionTable = Mockito.mock(TransactionTableResource.class);

    @Before
    public void setUp() {
        dumpEventActivity = new TransactionTableApplierDumpEventActivity();
        dumpEventActivity.transactionTable = transactionTable;
    }

    @Test
    public void updateGtidSet() throws Exception {
        NetworkContextResource networkContextResource = new NetworkContextResource();
        networkContextResource.initialize();
        dumpEventActivity.setContext(networkContextResource);
        dumpEventActivity.updateGtidSet("45c8023b-888d-11ec-9f82-b8cef68a4636:4733");
        GtidSet gtidSet = networkContextResource.fetchGtidSet();
        Assert.assertEquals("45c8023b-888d-11ec-9f82-b8cef68a4636:4733", gtidSet.toString());
    }

    @Test
    public void testShouldSkip() throws Exception {
        ApplierGtidEvent gtidEvent1 = new ApplierGtidEvent("45c8023b-888d-11ec-9f82-b8cef68a4636:4734");
        ApplierTableMapEvent tableMapEvent =  new ApplierTableMapEvent();
        ApplierWriteRowsEvent writeRowsEvent =  new ApplierWriteRowsEvent();
        ApplierXidEvent xidEvent = new ApplierXidEvent();

        ApplierGtidEvent gtidEvent2 = new ApplierGtidEvent("45c8023b-888d-11ec-9f82-b8cef68a4636:4741");

        ApplierDrcGtidEvent drcGtidEvent = new ApplierDrcGtidEvent();
        ApplierDrcTableMapEvent drcTableMapEvent = new ApplierDrcTableMapEvent();

        NetworkContextResource networkContextResource = new NetworkContextResource();
        networkContextResource.initialize();
        dumpEventActivity.setContext(networkContextResource);
        dumpEventActivity.updateGtidSet(new GtidSet("45c8023b-888d-11ec-9f82-b8cef68a4636:1-4733"));
        Mockito.when(transactionTable.mergeRecord("45c8023b-888d-11ec-9f82-b8cef68a4636", true)).thenReturn(new GtidSet("45c8023b-888d-11ec-9f82-b8cef68a4636:1-4740"));

        dumpEventActivity.handleApplierGtidEvent(gtidEvent1);
        Assert.assertEquals("45c8023b-888d-11ec-9f82-b8cef68a4636:1-4740", networkContextResource.fetchGtidSet().toString());

        Assert.assertTrue(dumpEventActivity.shouldSkip(gtidEvent1));
        Assert.assertTrue(dumpEventActivity.shouldSkip(tableMapEvent));
        Assert.assertTrue(dumpEventActivity.shouldSkip(writeRowsEvent));
        Assert.assertTrue(dumpEventActivity.shouldSkip(xidEvent));

        Assert.assertFalse(dumpEventActivity.shouldSkip(drcTableMapEvent));
        Assert.assertTrue(dumpEventActivity.shouldSkip(drcGtidEvent));

        Assert.assertFalse(dumpEventActivity.shouldSkip(gtidEvent2));
        Assert.assertFalse(dumpEventActivity.shouldSkip(tableMapEvent));
        Assert.assertFalse(dumpEventActivity.shouldSkip(writeRowsEvent));
        Assert.assertFalse(dumpEventActivity.shouldSkip(xidEvent));

        ApplierGtidEvent gtidEvent3 = new ApplierGtidEvent("45c8023b-888d-11ec-9f82-b8cef68a4636:4742");
        Assert.assertTrue(dumpEventActivity.isNeedFilter());
        dumpEventActivity.handleApplierGtidEvent(gtidEvent2);
        Assert.assertTrue(dumpEventActivity.isNeedFilter());
        for(int i = 0; i < TRANSACTION_TABLE_SIZE; i++) {
            dumpEventActivity.handleApplierGtidEvent(gtidEvent3);
        }
        Assert.assertFalse(dumpEventActivity.isNeedFilter());
    }

    @Test
    public void testCompensateGap() throws Exception {
        ApplierGtidEvent gtidEvent1 = new ApplierGtidEvent("45c8023b-888d-11ec-9f82-b8cef68a4636:100");

        NetworkContextResource networkContextResource = new NetworkContextResource();
        networkContextResource.initialize();
        dumpEventActivity.setContext(networkContextResource);
        Mockito.when(transactionTable.mergeRecord("45c8023b-888d-11ec-9f82-b8cef68a4636", true)).thenReturn(new GtidSet("45c8023b-888d-11ec-9f82-b8cef68a4636:1-90"));

        dumpEventActivity.handleApplierGtidEvent(gtidEvent1);
        Mockito.verify(transactionTable, times(100 - 1 - 90)).recordToMemory(Mockito.anyString());

        ApplierGtidEvent gtidEvent2 = new ApplierGtidEvent("45c8023b-888d-11ec-9f82-b8cef68a4636:101");
        dumpEventActivity.handleApplierGtidEvent(gtidEvent2);
        Mockito.verify(transactionTable, times(9)).recordToMemory(Mockito.anyString());

        ApplierGtidEvent gtidEvent3 = new ApplierGtidEvent("45c8023b-888d-11ec-9f82-b8cef68a4636:105");
        dumpEventActivity.handleApplierGtidEvent(gtidEvent3);
        Mockito.verify(transactionTable, times(9 + (105 - 1 - 101))).recordToMemory(Mockito.anyString());

        ApplierGtidEvent gtidEvent4 = new ApplierGtidEvent("55c8023b-888d-11ec-9f82-b8cef68a4638:1");
        Mockito.when(transactionTable.mergeRecord("55c8023b-888d-11ec-9f82-b8cef68a4638", true)).thenReturn(new GtidSet(""));
        dumpEventActivity.handleApplierGtidEvent(gtidEvent4);
    }
}
