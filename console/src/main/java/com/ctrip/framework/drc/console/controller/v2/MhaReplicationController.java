package com.ctrip.framework.drc.console.controller.v2;

import com.ctrip.framework.drc.console.dao.entity.BuTbl;
import com.ctrip.framework.drc.console.dao.entity.v2.MhaReplicationTbl;
import com.ctrip.framework.drc.console.dao.entity.v2.MhaTblV2;
import com.ctrip.framework.drc.console.enums.ReadableErrorDefEnum;
import com.ctrip.framework.drc.console.param.v2.MhaReplicationQuery;
import com.ctrip.framework.drc.console.pojo.domain.DcDo;
import com.ctrip.framework.drc.console.service.v2.MetaInfoServiceV2;
import com.ctrip.framework.drc.console.service.v2.MhaReplicationServiceV2;
import com.ctrip.framework.drc.console.service.v2.MhaServiceV2;
import com.ctrip.framework.drc.console.utils.ConsoleExceptionUtils;
import com.ctrip.framework.drc.console.vo.display.v2.MhaGroupPairVo;
import com.ctrip.framework.drc.console.vo.display.v2.MhaVo;
import com.ctrip.framework.drc.console.vo.request.MhaQueryDto;
import com.ctrip.framework.drc.console.vo.request.MhaReplicationQueryDto;
import com.ctrip.framework.drc.core.http.ApiResult;
import com.ctrip.framework.drc.core.http.PageResult;
import com.google.common.collect.Lists;
import com.google.common.collect.Sets;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/drc/v2/replication/")
public class MhaReplicationController {
    private static final Logger logger = LoggerFactory.getLogger(MhaReplicationController.class);

    private static final Integer DEFAULT_REPLICATION_STATUS = 1;

    @Autowired
    private MhaReplicationServiceV2 mhaReplicationServiceV2;

    @Autowired
    private MhaServiceV2 mhaServiceV2;

    @Autowired
    private MetaInfoServiceV2 metaInfoServiceV2;


    @GetMapping("queryMhaRelated")
    @SuppressWarnings("unchecked")
    public ApiResult<List<MhaGroupPairVo>> queryMhaReplications(@RequestParam(name = "relatedMhaId") Long relatedMhaId) {
        logger.info("[meta] queryMhaReplications:{}", relatedMhaId);
        try {
            if (relatedMhaId == null || relatedMhaId <= 0) {
                throw ConsoleExceptionUtils.message(ReadableErrorDefEnum.REQUEST_PARAM_INVALID, "relatedMhaId不可为空，请联系开发！");
            }

            // query related replications
            List<MhaReplicationTbl> data = mhaReplicationServiceV2.queryRelatedReplications(relatedMhaId);
            if (CollectionUtils.isEmpty(data)) {
                return ApiResult.getSuccessInstance(Collections.emptyList());
            }

            // query mha detail
            Set<Long> mhaIdSet = Sets.newHashSet();
            mhaIdSet.addAll(data.stream().map(MhaReplicationTbl::getSrcMhaId).collect(Collectors.toSet()));
            mhaIdSet.addAll(data.stream().map(MhaReplicationTbl::getDstMhaId).collect(Collectors.toSet()));
            Map<Long, MhaTblV2> mhaTblMap = mhaServiceV2.queryMhaByIds(Lists.newArrayList(mhaIdSet));

            // fill
            return ApiResult.getSuccessInstance(this.buildVo(data, mhaTblMap));
        } catch (Exception e) {
            logger.error("queryMhaReplications error", e);
            return ApiResult.getFailInstance(null, e.getMessage());
        }
    }

    @GetMapping("query")
    @SuppressWarnings("unchecked")
    public ApiResult<PageResult<MhaGroupPairVo>> queryMhaReplicationsByPage(MhaReplicationQueryDto queryDto) {
        logger.info("[meta] get allOrderedGroup,drcGroupQueryDto:{}", queryDto.toString());
        try {
            MhaReplicationQuery query = new MhaReplicationQuery();
            query.setPageIndex(queryDto.getPageIndex());
            query.setPageSize(queryDto.getPageSize());

            // convert query condition
            MhaQueryDto srcMha = queryDto.getSrcMha();
            if (srcMha != null && srcMha.isConditionalQuery()) {
                Map<Long, MhaTblV2> mhaTblV2Map = mhaServiceV2.query(StringUtils.trim(srcMha.getName()), srcMha.getBuId(), srcMha.getRegionId());
                if (CollectionUtils.isEmpty(mhaTblV2Map)) {
                    return ApiResult.getSuccessInstance(PageResult.emptyResult());
                }
                query.setSrcMhaIdList(Lists.newArrayList(mhaTblV2Map.keySet()));
            }
            MhaQueryDto dstMha = queryDto.getDstMha();
            if (dstMha != null && dstMha.isConditionalQuery()) {
                Map<Long, MhaTblV2> mhaTblV2Map = mhaServiceV2.query(StringUtils.trim(dstMha.getName()), dstMha.getBuId(), dstMha.getRegionId());
                if (CollectionUtils.isEmpty(mhaTblV2Map)) {
                    return ApiResult.getSuccessInstance(PageResult.emptyResult());
                }
                query.setDstMhaIdList(Lists.newArrayList(mhaTblV2Map.keySet()));
            }

            // query replication
            PageResult<MhaReplicationTbl> tblPageResult = mhaReplicationServiceV2.queryByPage(query);
            List<MhaReplicationTbl> data = tblPageResult.getData();
            if (tblPageResult.getTotalCount() == 0) {
                return ApiResult.getSuccessInstance(PageResult.emptyResult());
            }

            // query mha detail information
            Set<Long> mhaIdSet = Sets.newHashSet();
            mhaIdSet.addAll(data.stream().map(MhaReplicationTbl::getSrcMhaId).collect(Collectors.toSet()));
            mhaIdSet.addAll(data.stream().map(MhaReplicationTbl::getDstMhaId).collect(Collectors.toSet()));
            Map<Long, MhaTblV2> mhaTblMap = mhaServiceV2.queryMhaByIds(Lists.newArrayList(mhaIdSet));

            List<MhaGroupPairVo> res = this.buildVo(data, mhaTblMap);
            return ApiResult.getSuccessInstance(
                    PageResult.newInstance(res, tblPageResult.getPageIndex(), tblPageResult.getPageSize(), tblPageResult.getTotalCount())
            );
        } catch (Exception e) {
            logger.error("queryMhaReplicationsByPage error", e);
            return ApiResult.getFailInstance(null, e.getMessage());
        }
    }

    private List<MhaGroupPairVo> buildVo(List<MhaReplicationTbl> replicationTblList, Map<Long, MhaTblV2> mhaTblMap) {
        // prepare meta data
        List<DcDo> dcDos = metaInfoServiceV2.queryAllDcWithCache();
        List<BuTbl> buTbls = metaInfoServiceV2.queryAllBuWithCache();

        Map<Long, DcDo> dcMap = dcDos.stream().collect(Collectors.toMap(DcDo::getDcId, Function.identity()));
        Map<Long, BuTbl> buMap = buTbls.stream().collect(Collectors.toMap(BuTbl::getId, Function.identity()));

        return replicationTblList.stream().map(replicationTbl -> {
            MhaGroupPairVo vo = new MhaGroupPairVo();
            MhaTblV2 srcMhaTbl = mhaTblMap.get(replicationTbl.getSrcMhaId());
            MhaTblV2 dstMhaTbl = mhaTblMap.get(replicationTbl.getDstMhaId());

            // pre-check data integrity
            if (srcMhaTbl == null) {
                throw ConsoleExceptionUtils.message(
                        ReadableErrorDefEnum.QUERY_DATA_INCOMPLETE,
                        String.format("srcMhaTbl 不存在. replicationTbl:%s, srcMhaTblId:%d", replicationTbl, replicationTbl.getSrcMhaId())
                );
            }
            if (dstMhaTbl == null) {
                throw ConsoleExceptionUtils.message(
                        ReadableErrorDefEnum.QUERY_DATA_INCOMPLETE,
                        String.format("dstMhaTbl 不存在. replicationTbl:%s, dstMhaTblId:%d", replicationTbl, replicationTbl.getDstMhaId())
                );
            }
            // set vo: mha
            vo.setSrcMha(MhaVo.from(srcMhaTbl, dcMap.get(srcMhaTbl.getDcId()), buMap.get(srcMhaTbl.getBuId())));
            vo.setDstMha(MhaVo.from(dstMhaTbl, dcMap.get(dstMhaTbl.getDcId()), buMap.get(dstMhaTbl.getBuId())));

            // set vo: replication
            vo.setReplicationId(String.valueOf(replicationTbl.getId()));
            vo.setDatachangeLasttime(replicationTbl.getDatachangeLasttime().getTime());
            vo.setStatus(DEFAULT_REPLICATION_STATUS);
            return vo;
        }).collect(Collectors.toList());
    }
}
