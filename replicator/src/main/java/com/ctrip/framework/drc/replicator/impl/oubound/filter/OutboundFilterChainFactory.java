package com.ctrip.framework.drc.replicator.impl.oubound.filter;

import com.ctrip.framework.drc.core.server.common.filter.Filter;
import com.ctrip.framework.drc.core.server.common.filter.FilterChainFactory;

/**
 * @Author limingdong
 * @create 2022/4/22
 */
public class OutboundFilterChainFactory implements FilterChainFactory<OutboundFilterChainContext, OutboundLogEventContext> {

    @Override
    public Filter<OutboundLogEventContext> createFilterChain(OutboundFilterChainContext context) {
        SendFilter sendFilter = new SendFilter();

        ConsumeTypeFilter consumeTypeFilter = new ConsumeTypeFilter();
        sendFilter.setSuccessor(consumeTypeFilter);

        EventTypeFilter eventTypeFilter = new EventTypeFilter();
        consumeTypeFilter.setSuccessor(eventTypeFilter);

        TableFilter tableFilter = new TableFilter();
        eventTypeFilter.setSuccessor(tableFilter);


        LineFilter lineFilter = new LineFilter();
        eventTypeFilter.setSuccessor(lineFilter);

        return sendFilter;
    }
}
