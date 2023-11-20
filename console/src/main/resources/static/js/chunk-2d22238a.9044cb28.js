(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22238a"],{ce4f:function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("base-component",[t("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[t("BreadcrumbItem",{attrs:{to:"/home"}},[e._v("首页")])],1),t("Content",{staticClass:"content",style:{padding:"10px",background:"#fff",margin:"50px 0 1px 185px",zIndex:"1"}},[t("Tabs",{model:{value:e.tabValue,callback:function(a){e.tabValue=a},expression:"tabValue"}},[t("TabPane",{attrs:{label:"冲突行",name:"rowsLog"}},[e.refresh?t("conflict-rows-log",{attrs:{gtid:e.gtid,"begin-handle-time":e.beginHandleTime,"end-handle-time":e.endHandleTime,searchMode:e.searchMode},on:{tabValueChanged:e.updateTabValue,gtidChanged:e.updateGtid,beginHandleTimeChanged:e.updateBeginHandleTime,endHandleTimeChanged:e.updateEndHandleTime}}):e._e()],1),t("TabPane",{attrs:{label:"冲突事务",name:"trxLog"}},[e.refresh?e._e():t("conflict-trx-log",{attrs:{gtid:e.gtid,"begin-handle-time":e.beginHandleTime,"end-handle-time":e.endHandleTime},on:{tabValueChanged:e.updateTabValue,gtidChanged:e.updateGtid,searchModeChanged:e.updateSearchMode,beginHandleTimeChanged:e.updateBeginHandleTime,endHandleTimeChanged:e.updateEndHandleTime}})],1)],1)],1)],1)},i=[],r=t("61b1"),l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticStyle:{padding:"1px 1px"}},[t("Row",{attrs:{gutter:10,align:"middle"}},[t("Col",{attrs:{span:"22"}},[t("Card",{attrs:{padding:5},scopedSlots:e._u([{key:"title",fn:function(){return[e._v("查询条件")]},proxy:!0}])},[t("Row",{attrs:{gutter:10}},[t("Col",{attrs:{span:"6"}},[t("Input",{attrs:{prefix:"ios-search",placeholder:"事务id"},on:{"on-enter":e.getTrxData},model:{value:e.queryParam.gtid,callback:function(a){e.$set(e.queryParam,"gtid",a)},expression:"queryParam.gtid"}})],1),t("Col",{attrs:{span:"4"}},[t("Input",{attrs:{prefix:"ios-search",placeholder:"库名"},on:{"on-enter":e.getTrxData},model:{value:e.queryParam.db,callback:function(a){e.$set(e.queryParam,"db",a)},expression:"queryParam.db"}})],1),t("Col",{attrs:{span:"3"}},[t("Input",{attrs:{prefix:"ios-search",placeholder:"源MHA"},on:{"on-enter":e.getTrxData},model:{value:e.queryParam.srcMhaName,callback:function(a){e.$set(e.queryParam,"srcMhaName",a)},expression:"queryParam.srcMhaName"}})],1),t("Col",{attrs:{span:"3"}},[t("Input",{attrs:{prefix:"ios-search",placeholder:"目标MHA"},on:{"on-enter":e.getTrxData},model:{value:e.queryParam.dstMhaName,callback:function(a){e.$set(e.queryParam,"dstMhaName",a)},expression:"queryParam.dstMhaName"}})],1),t("Col",{attrs:{span:"3"}},[t("DatePicker",{attrs:{type:"datetime",editable:e.editable,placeholder:"起始日期"},model:{value:e.queryParam.beginHandleTime,callback:function(a){e.$set(e.queryParam,"beginHandleTime",a)},expression:"queryParam.beginHandleTime"}})],1),t("Col",{attrs:{span:"3"}},[t("DatePicker",{attrs:{type:"datetime",editable:e.editable,placeholder:"结束日期"},model:{value:e.queryParam.endHandleTime,callback:function(a){e.$set(e.queryParam,"endHandleTime",a)},expression:"queryParam.endHandleTime"}})],1),t("Col",{attrs:{span:"2"}},[t("Select",{attrs:{filterable:"",clearable:"",placeholder:"执行结果"},model:{value:e.queryParam.trxResult,callback:function(a){e.$set(e.queryParam,"trxResult",a)},expression:"queryParam.trxResult"}},e._l(e.resultOpts,(function(a){return t("Option",{key:a.val,attrs:{value:a.val}},[e._v(e._s(a.name))])})),1)],1)],1)],1)],1),t("Col",{attrs:{span:"1"}},[t("Button",{attrs:{type:"primary",icon:"ios-search",loading:e.dataLoading},on:{click:e.getTrxData}},[e._v("查询")]),t("Button",{staticStyle:{"margin-top":"20px"},attrs:{icon:"md-refresh"},on:{click:e.resetParam}},[e._v("重置 ")])],1)],1),t("br"),t("Table",{attrs:{stripe:"",border:"",columns:e.columns,data:e.tableData},scopedSlots:e._u([{key:"action",fn:function(a){var n=a.row,i=a.index;return[t("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary",size:"small"},on:{click:function(a){return e.getLogDetail(n,i)}}},[e._v(" 详情 ")]),t("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"success",size:"small"},on:{click:function(a){return e.queryRowsLog(n,i)}}},[e._v(" 冲突行 ")])]}}])}),t("div",{staticStyle:{"text-align":"center",margin:"16px 0"}},[t("Page",{attrs:{transfer:!0,total:e.total,current:e.current,"page-size-opts":[10,20,50,100],"page-size":10,"show-total":"","show-sizer":"","show-elevator":""},on:{"update:current":function(a){e.current=a},"on-change":e.getTrxData,"on-page-size-change":e.handleChangeSize}})],1)],1)},s=[],d=(t("d3b7"),t("53ca")),o={name:"conflictTrxLog",props:{gtid:String,beginHandleTime:String,endHandleTime:String},data:function(){return{editable:!1,clearable:!1,dataLoading:!1,queryParam:{srcMhaName:null,dstMhaName:null,gtid:this.gtid,beginHandleTime:this.beginHandleTime,endHandleTime:this.endHandleTime,db:null,trxResult:null},tableData:[],columns:[{title:"事务ID",key:"gtid",tooltip:!0},{title:"库名",key:"db",width:200},{title:"源MHA",key:"srcMhaName",width:200},{title:"目标MHA",key:"dstMhaName",width:200},{title:"事务影响行数",key:"trxRowsNum",width:150,sortable:!0},{title:"冲突行数",key:"cflRowsNum",width:150,sortable:!0},{title:"事务提交时间",key:"handleTime",width:200,sortable:!0},{title:"执行结果",key:"trxResult",width:150,align:"center",render:function(e,a){var t=a.row,n=0===t.trxResult?"blue":"volcano",i=0===t.trxResult?"commit":"rollBack";return e("Tag",{props:{color:n}},i)}},{title:"操作",slot:"action",width:150,align:"center"}],total:0,current:1,size:10,pageSizeOpts:[10,20,50,100],resultOpts:[{name:"commit",val:0},{name:"rollBack",val:1}]}},methods:{getTrxData:function(){var e=this,a=this.queryParam.beginHandleTime,t=this.queryParam.endHandleTime,n=new Date(a).getTime(),i=new Date(t).getTime();if(console.log("beginTime: "+a),console.log("endTime: "+t),isNaN(n)||isNaN(i))this.$Message.warning("请选择时间范围!");else{var r={gtId:this.queryParam.gtid,db:this.queryParam.db,srcMhaName:this.queryParam.srcMhaName,dstMhaName:this.queryParam.dstMhaName,trxResult:this.queryParam.trxResult,beginHandleTime:n,endHandleTime:i,pageReq:{pageSize:this.size,pageIndex:this.current}},l=this.flattenObj(r);this.dataLoading=!0,this.axios.get("/api/drc/v2/log/conflict/trx",{params:l}).then((function(a){var t=a.data,n=t.pageReq;1===t.status?e.$Message.error("查询失败"):0===t.data.length||0===n.totalCount?(e.total=0,e.current=1,e.tableData=t.data,e.$Message.warning("查询结果为空")):(e.total=n.totalCount,e.current=n.pageIndex,e.tableData=t.data,e.$Message.success("查询成功"))})).finally((function(){e.dataLoading=!1}))}},flattenObj:function(e){var a={};for(var t in e)if("object"!==Object(d["a"])(e[t])||Array.isArray(e[t]))a[t]=e[t];else{var n=this.flattenObj(e[t]);for(var i in n)a[t+"."+i]=n[i]}return a},resetParam:function(){this.queryParam={srcMhaName:null,dstMhaName:null,gtid:null,beginHandleTime:this.beginHandleTime,endHandleTime:this.endHandleTime,trxResult:null}},queryRowsLog:function(e,a){this.$emit("tabValueChanged","rowsLog"),this.$emit("gtidChanged",e.gtid),this.$emit("searchModeChanged",!0),this.$emit("beginHandleTimeChanged",this.queryParam.beginHandleTime),this.$emit("endHandleTimeChanged",this.queryParam.endHandleTime)},getLogDetail:function(e,a){var t=this.$router.resolve({path:"/conflictLogDetail",query:{conflictTrxLogId:e.conflictTrxLogId,queryType:"0"}});window.open(t.href,"_blank")},handleChangeSize:function(e){var a=this;this.size=e,this.$nextTick((function(){a.getTrxData()}))}},created:function(){this.getTrxData()}},u=o,c=t("2877"),m=Object(c["a"])(u,l,s,!1,null,"b0efb004",null),g=m.exports,h={components:{conflictRowsLog:r["default"],conflictTrxLog:g},name:"conflictLog",data:function(){return{tabValue:"rowsLog",gtid:null,beginHandleTime:new Date((new Date).setMinutes(0,0,0)-36e5),endHandleTime:new Date((new Date).setHours(0,0,0,0)+864e5),refresh:!0,searchMode:!1}},watch:{tabValue:function(e,a){this.refresh="trxLog"===a}},methods:{jump:function(e){this.tabValue=e},updateTabValue:function(e){this.tabValue=e},updateGtid:function(e){this.gtid=e},updateBeginHandleTime:function(e){this.beginHandleTime=e},updateEndHandleTime:function(e){this.endHandleTime=e},updateSearchMode:function(e){this.searchMode=e}}},p=h,b=Object(c["a"])(p,n,i,!1,null,"61a0c1b7",null);a["default"]=b.exports}}]);
//# sourceMappingURL=chunk-2d22238a.9044cb28.js.map