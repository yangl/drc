(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d6cffc00"],{4368:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-component",[a("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[a("BreadcrumbItem",{attrs:{to:"/home"}},[e._v("首页")])],1),a("Content",{staticClass:"content",style:{padding:"10px",background:"#fff",margin:"50px 0 1px 185px",zIndex:"1"}},[a("div",{staticStyle:{padding:"1px 1px"}},[a("Row",{attrs:{gutter:10,align:"middle"}},[a("Col",{attrs:{span:"16"}},[a("Card",{attrs:{padding:5},scopedSlots:e._u([{key:"title",fn:function(){return[e._v("查询条件")]},proxy:!0}])},[a("Row",{attrs:{gutter:10}},[a("Col",{attrs:{span:"8"}},[a("Input",{attrs:{prefix:"ios-search",placeholder:"ip"},on:{"on-enter":e.getResources},model:{value:e.queryParam.ip,callback:function(t){e.$set(e.queryParam,"ip",t)},expression:"queryParam.ip"}})],1),a("Col",{attrs:{span:"4"}},[a("Select",{attrs:{filterable:"",clearable:"",placeholder:"类型"},on:{"on-change":e.getResources},model:{value:e.queryParam.type,callback:function(t){e.$set(e.queryParam,"type",t)},expression:"queryParam.type"}},e._l(e.typeList,(function(t){return a("Option",{key:t.val,attrs:{value:t.val}},[e._v(e._s(t.name))])})),1)],1),a("Col",{attrs:{span:"4"}},[a("Select",{attrs:{filterable:"",clearable:"",placeholder:"地域"},on:{"on-change":e.getResources},model:{value:e.queryParam.region,callback:function(t){e.$set(e.queryParam,"region",t)},expression:"queryParam.region"}},e._l(e.regions,(function(t){return a("Option",{key:t.regionName,attrs:{value:t.regionName}},[e._v(" "+e._s(t.regionName)+" ")])})),1)],1),a("Col",{attrs:{span:"4"}},[a("Select",{attrs:{filterable:"",clearable:"",placeholder:"tag"},on:{"on-change":e.getResources},model:{value:e.queryParam.tag,callback:function(t){e.$set(e.queryParam,"tag",t)},expression:"queryParam.tag"}},e._l(e.tagList,(function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])})),1)],1),a("Col",{attrs:{span:"4"}},[a("Select",{attrs:{filterable:"",clearable:"",placeholder:"启用状态"},on:{"on-change":e.getResources},model:{value:e.queryParam.active,callback:function(t){e.$set(e.queryParam,"active",t)},expression:"queryParam.active"}},e._l(e.activeList,(function(t){return a("Option",{key:t.val,attrs:{value:t.val}},[e._v(e._s(t.name))])})),1)],1)],1)],1)],1),a("Col",{attrs:{span:"1"}},[a("Button",{attrs:{type:"primary",icon:"ios-search",loading:e.dataLoading},on:{click:e.getResources}},[e._v("查询")]),a("Button",{staticStyle:{"margin-top":"20px"},attrs:{icon:"md-refresh",loading:e.dataLoading},on:{click:e.resetParam}},[e._v("重置")])],1)],1),a("br"),a("Row",{staticStyle:{background:"#fdfdff",border:"1px solid #e8eaec"}},[a("Col",{staticStyle:{display:"flex",float:"left",margin:"5px"},attrs:{span:"2"}},[a("Dropdown",{attrs:{placement:"bottom-start"},scopedSlots:e._u([{key:"list",fn:function(){return[a("DropdownMenu",[a("DropdownItem",{nativeOn:{click:function(t){return function(){e.$router.push({path:"/drcResource"})}.apply(null,arguments)}}},[e._v("资源录入")])],1)]},proxy:!0}])},[a("Button",{attrs:{type:"default",icon:"ios-hammer"}},[e._v(" 操作 "),a("Icon",{attrs:{type:"ios-arrow-down"}})],1)],1)],1)],1),a("Table",{attrs:{stripe:"",border:"",columns:e.columns,data:e.resources},scopedSlots:e._u([{key:"action",fn:function(t){var n=t.row,r=t.index;return[a("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"error",size:"small"},on:{click:function(t){return e.preDeleteResource(n,r)}}},[e._v(" 下线 ")])]}}])}),a("div",{staticStyle:{"text-align":"center",margin:"16px 0"}},[a("Page",{attrs:{transfer:!0,total:e.total,current:e.current,"page-size-opts":[10,20,50,100],"page-size":10,"show-total":"","show-sizer":"","show-elevator":""},on:{"update:current":function(t){e.current=t},"on-change":e.getResources,"on-page-size-change":e.handleChangeSize}})],1),a("Modal",{attrs:{title:"确认删除以下机器资源"},on:{"on-ok":e.deleteResource,"on-cancel":e.clearDeleteResource},model:{value:e.deleteResourceModal,callback:function(t){e.deleteResourceModal=t},expression:"deleteResourceModal"}},[a("p",[e._v('ip: "'+e._s(e.deleteResourceInfo.ip)+'" ,tag: "'+e._s(e.deleteResourceInfo.tag)+'" az: "'+e._s(e.deleteResourceInfo.az)+'"')]),a("p",[a("span",[e._v("部署实例数量: ")]),a("span",{staticStyle:{color:"red","font-size":"20px"}},[e._v(e._s(e.deleteResourceInfo.instanceNum))])])]),a("Modal",{attrs:{title:"关联mha"},model:{value:e.showMha,callback:function(t){e.showMha=t},expression:"showMha"}},[a("List",e._l(e.mhaInfo,(function(t){return a("ListItem",{key:t,attrs:{value:t}},[e._v(e._s(t))])})),1)],1),a("Modal",{attrs:{title:"关联mha复制链路"},model:{value:e.showMhaReplication,callback:function(t){e.showMhaReplication=t},expression:"showMhaReplication"}},[a("List",e._l(e.mhaReplicationInfo,(function(t){return a("ListItem",{key:t,attrs:{value:t}},[e._v(" "+e._s(t.srcMhaName)+"("+e._s(t.srcDcName)+") ==> "+e._s(t.dstMhaName)+"("+e._s(t.dstDcName)+") ")])})),1)],1)],1)])],1)},r=[],s=(a("d3b7"),a("53ca")),o=(a("f629"),a("7a7a"),a("d5e0"),a("697e"),a("cbc8"),{name:"resourceV2",data:function(){var e=this;return{columns:[{title:"类型",key:"type",width:80,render:function(t,a){var n=a.row,r="none",s="error",o=!1;switch(n.type){case 0:r="R",s="info";break;case 1:r="A",s="success";break;default:r="无",o=!0;break}return t("Button",{props:{type:s,size:"small",disabled:o},on:{click:function(){e.showModal(n)}}},r)}},{title:"ip",key:"ip"},{title:"tag",key:"tag"},{title:"AZ",key:"az",sortable:!0},{title:"部署实例数量",key:"instanceNum",sortable:!0},{title:"启用状态",key:"active",sortable:!0,align:"center",render:function(t,a){var n=a.row;return t("i-switch",{props:{size:"large",value:1===n.active,beforeChange:e.handleBeforeChange},scopedSlots:{open:function(){return t("span","开启")},close:function(){return t("span","关闭")}},on:{"on-change":function(){e.switchActiveStatus(n.resourceId,n.active)}}})}},{title:"操作",slot:"action",align:"center"}],total:0,current:1,size:10,resources:[],typeList:[{name:"Replicator",val:0},{name:"Applier",val:1}],activeList:[{name:"启用",val:1},{name:"停用",val:0}],regions:[],tagList:this.constant.tagList,deleteResourceModal:!1,showMha:!1,showMhaReplication:!1,mhaInfo:[],mhaReplicationInfo:[],deleteResourceInfo:{resourceId:null,ip:"",tag:"",az:"",instanceNum:0},queryParam:{ip:"",type:null,tag:"",active:null,region:"",pageReq:{pageSize:10,pageIndex:1}},replicationDetail:{show:!1,data:null,darkMode:!0,lineWrap:!1,row:{}},dataLoading:!0}},computed:{},methods:{showModal:function(e){0===e.type?this.getRelatedMha(e):1===e.type&&this.getRelatedMhaReplication(e)},getRegions:function(){var e=this;this.axios.get("/api/drc/v2/meta/regions/all").then((function(t){e.regions=t.data.data}))},resetParam:function(){this.queryParam={ip:"",type:null,tag:"",active:null,region:"",pageReq:{pageSize:10,pageIndex:1}},this.getResources()},getRelatedMha:function(e){var t=this;this.axios.get("/api/drc/v2/resource/mha?resourceId="+e.resourceId).then((function(e){0===e.data.status?t.mhaInfo=e.data.data:t.$Message.warning("查询异常")})),this.showMha=!0},getRelatedMhaReplication:function(e){var t=this;this.axios.get("/api/drc/v2/resource/mhaReplication?resourceId="+e.resourceId).then((function(e){0===e.data.status?t.mhaReplicationInfo=e.data.data:t.$Message.warning("查询异常")})),this.showMhaReplication=!0},getResources:function(){var e=this,t={ip:this.queryParam.ip,type:this.queryParam.type,tag:this.queryParam.tag,active:this.queryParam.active,region:this.queryParam.region,pageReq:{pageSize:this.size,pageIndex:this.current}},a=this.flattenObj(t);e.dataLoading=!0,e.axios.get("/api/drc/v2/resource/all",{params:a}).then((function(t){var a=t.data,n=t.data.pageReq;1===a.status?e.$Message.error("查询异常: "+a.message):0===a.data.length||0===n.totalCount?(e.total=0,e.current=1,e.resources=[],e.$Message.warning("查询结果为空")):(e.total=n.totalCount,e.current=n.pageIndex,e.resources=a.data,e.$Message.success("查询成功"))})).catch((function(t){e.$Message.error("查询异常: "+t)})).finally((function(){e.dataLoading=!1}))},handleChangeSize:function(e){var t=this;this.size=e,this.$nextTick((function(){t.getResources()}))},handleBeforeChange:function(){var e=this;return console.log("handleBeforeChange:",this.switchOneInfo),new Promise((function(t){e.$Modal.confirm({title:"切换确认",content:"您确认要切换开关状态吗？",onOk:function(){t()}})}))},preDeleteResource:function(e,t){this.deleteResourceInfo={resourceId:e.resourceId,ip:e.ip,tag:e.tag,az:e.az,instanceNum:e.instanceNum},this.deleteResourceModal=!0},clearDeleteResource:function(){this.deleteResourceInfo={resourceId:null,ip:"",tag:"",az:"",instanceNum:0}},deleteResource:function(e,t){var a=this;this.axios.delete("/api/drc/v2/resource/?resourceId="+this.deleteResourceInfo.resourceId).then((function(e){0===e.data.status?(a.$Message.success("删除成功"),a.getResources()):a.$Message.warning("下线失败 "+e.data.message)}))},switchActiveStatus:function(e,t){0===t?this.activeResource(e):this.deactivateResource(e)},deactivateResource:function(e){var t=this;this.axios.post("/api/drc/v2/resource/deactivate?resourceId="+e).then((function(e){0===e.data.status?t.$Message.success("已停用"):t.$Message.warning("停用失败"),t.getResources()}))},activeResource:function(e){var t=this;this.axios.post("/api/drc/v2/resource/active?resourceId="+e).then((function(e){0===e.data.status?t.$Message.success("已启用"):t.$Message.warning("启用失败"),t.getResources()}))},flattenObj:function(e){var t={};for(var a in e)if("object"!==Object(s["a"])(e[a])||Array.isArray(e[a]))t[a]=e[a];else{var n=this.flattenObj(e[a]);for(var r in n)t[a+"."+r]=n[r]}return t}},created:function(){this.getResources(),this.getRegions()}}),i=o,c=(a("a50a"),a("2877")),l=Object(c["a"])(i,n,r,!1,null,"f4905ba0",null);t["default"]=l.exports},"53ca":function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a("a4d3"),a("e01a"),a("d28b"),a("e260"),a("d3b7"),a("3ca3"),a("ddb0");function n(e){return n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}},a50a:function(e,t,a){"use strict";a("f220")},f220:function(e,t,a){}}]);
//# sourceMappingURL=chunk-d6cffc00.d91571fb.js.map