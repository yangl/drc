(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-03a611a7"],{"159b":function(t,e,n){var a=n("da84"),r=n("fdbc"),s=n("17c2"),o=n("9112");for(var c in r){var i=a[c],l=i&&i.prototype;if(l&&l.forEach!==s)try{o(l,"forEach",s)}catch(u){l.forEach=s}}},"17c2":function(t,e,n){"use strict";var a=n("b727").forEach,r=n("a640"),s=n("ae40"),o=r("forEach"),c=s("forEach");t.exports=o&&c?[].forEach:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}},4160:function(t,e,n){"use strict";var a=n("23e7"),r=n("17c2");a({target:"Array",proto:!0,forced:[].forEach!=r},{forEach:r})},a640:function(t,e,n){"use strict";var a=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&a((function(){n.call(null,e||function(){throw 1},1)}))}},dc40:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("base-component",[n("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[n("BreadcrumbItem",{attrs:{to:"/home"}},[t._v("首页")]),n("BreadcrumbItem",{attrs:{to:"/clusters"}},[t._v("MHA集群")])],1),n("Content",{staticClass:"content",style:{padding:"10px",background:"#fff",margin:"50px 0 1px 185px",zIndex:"1"}},[n("div",{staticStyle:{padding:"1px 1px"}},[n("i-input",{style:{margin:"10px, 0, 0, 0",width:"200px"},attrs:{placeholder:"输入MHA集群名称"},on:{input:t.getCluster},model:{value:t.keyWord,callback:function(e){t.keyWord=e},expression:"keyWord"}},[n("Icon",{attrs:{slot:"prefix",type:"ios-search"},slot:"prefix"})],1),n("Table",{attrs:{stripe:"",columns:t.columns,data:t.clusters[t.current-1]},scopedSlots:t._u([{key:"drcStatus",fn:function(e){return[n("Tag",{attrs:{color:"default"}},[t._v("未接入")])]}},{key:"action",fn:function(e){var a=e.row,r=e.index;return[n("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"warning",size:"small"},on:{click:function(e){return t.preCheck(a,r)}}},[t._v("预检测")]),n("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.doApply(a,r)}}},[t._v("显示详情")]),n("Modal",{attrs:{title:"预检测结果",width:"900px"},model:{value:t.cluster.modal,callback:function(e){t.$set(t.cluster,"modal",e)},expression:"cluster.modal"}},[n("Form",{staticStyle:{width:"100%"}},[n("FormItem",{attrs:{label:"不含ON UPDATE的表"}},[n("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:t.cluster.noOnUpdate,callback:function(e){t.$set(t.cluster,"noOnUpdate",e)},expression:"cluster.noOnUpdate"}})],1),n("FormItem",{attrs:{label:"ON UPDATE字段未加索引的表"}},[n("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:t.cluster.noOnUpdateKey,callback:function(e){t.$set(t.cluster,"noOnUpdateKey",e)},expression:"cluster.noOnUpdateKey"}})],1),n("FormItem",{attrs:{label:"不含PK或者UK的表"}},[n("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:t.cluster.noPkUk,callback:function(e){t.$set(t.cluster,"noPkUk",e)},expression:"cluster.noPkUk"}})],1),n("FormItem",{attrs:{label:"GTID_MODE"}},[n("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:t.cluster.gtidMode,callback:function(e){t.$set(t.cluster,"gtidMode",e)},expression:"cluster.gtidMode"}})],1),n("FormItem",{attrs:{label:"BINLOG_TRANSACTION_DEPENDENCY"}},[n("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:t.cluster.binlogTransactionDependency,callback:function(e){t.$set(t.cluster,"binlogTransactionDependency",e)},expression:"cluster.binlogTransactionDependency"}})],1),n("FormItem",{attrs:{label:"APPROVED TRUNCATE LIST"}},[n("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:t.cluster.approvedTruncatelist,callback:function(e){t.$set(t.cluster,"approvedTruncatelist",e)},expression:"cluster.approvedTruncatelist"}})],1)],1)],1)]}}])}),n("div",{staticStyle:{"text-align":"center",margin:"16px 0"}},[n("Page",{attrs:{transfer:!0,total:t.total,current:t.current,"show-sizer":""},on:{"update:current":function(e){t.current=e},"on-change":t.getCluster,"on-page-size-change":t.handleChangeSize}})],1)],1)])],1)},r=[],s=(n("4160"),n("159b"),{name:"Application",data:function(){var t=this;return{cluster:{noOnUpdate:"",noOnUpdateKey:"",noPkUk:"",gtidMode:"",binlogTransactionDependency:"",approvedTruncatelist:"",modal:!1},columns:[{title:"序号",width:75,align:"center",render:function(e,n){return e("span",n.index+1+(t.current-1)*t.size)}},{title:"集群名称",key:"cluster"},{title:"集群区域",key:"zoneId"},{title:"状态",slot:"drcStatus",align:"center"},{title:"操作",slot:"action",align:"center"}],clusters:[],total:0,current:1,size:10,keyWord:""}},computed:{},methods:{getCluster:function(){var t=this;t.axios.get("/api/drc/v1/mha/mhanames?keyWord="+this.keyWord).then((function(e){console.log(e),t.total=e.data.data.length;var n=0,a=[];t.clusters=[],e.data.data.forEach((function(e,r){n===t.size-1?(a.push({cluster:e.cluster,zoneId:e.zoneId}),t.clusters.push(a),n=0,a=[]):(a.push({cluster:e.cluster,zoneId:e.zoneId}),n++)})),t.clusters.push(a)}))},handleChangeSize:function(t){var e=this;this.size=t,this.$nextTick((function(){e.getCluster()}))},doApply:function(t,e){console.log(t.cluster);var n="";switch(t.zoneId){case"上海欧阳IDC(电信)":n="shaoy";break;case"上海金钟路B栋":n="shajz";break;case"上海日阪IDC(联通)":n="sharb";break;case"上海金桥IDC(联通)":n="shajq";break;case"上海福泉路":n="shafq";break;case"南通星湖大道":n="ntgxh";break}this.$router.push({path:"/access",query:{clustername:t.cluster,zoneId:n}})},preCheck:function(t,e){var n=this;console.log(t.cluster),this.$Spin.show({render:function(t){return t("div",[t("Icon",{class:"demo-spin-icon-load",props:{size:18}}),t("div","检测中，请稍等...")])}}),this.axios.post("/api/drc/v1/access/precheck",{clustername:t.cluster}).then((function(t){var e=t.data.data.result;console.log(e),n.cluster.noOnUpdate=e.noOnUpdate,n.cluster.noOnUpdateKey=e.noOnUpdateKey,n.cluster.noPkUk=e.noPkUk,n.cluster.gtidMode=e.gtidMode,n.cluster.binlogTransactionDependency=e.binlogTransactionDependency,n.cluster.approvedTruncatelist=e.approvedTruncatelist,n.$Spin.hide(),n.cluster.modal=!0}))}},created:function(){this.getCluster()}}),o=s,c=n("2877"),i=Object(c["a"])(o,a,r,!1,null,"0950b862",null);e["default"]=i.exports},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-03a611a7.469a5394.js.map