(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13df612e","chunk-6304b0b8"],{"057f":function(t,e,a){var r=a("fc6a"),n=a("241c").f,i={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],l=function(t){try{return n(t)}catch(e){return o.slice()}};t.exports.f=function(t){return o&&"[object Window]"==i.call(t)?l(t):n(r(t))}},"3ca3":function(t,e,a){"use strict";var r=a("6547").charAt,n=a("69f3"),i=a("7dd0"),o="String Iterator",l=n.set,s=n.getterFor(o);i(String,"String",(function(t){l(this,{type:o,string:String(t),index:0})}),(function(){var t,e=s(this),a=e.string,n=e.index;return n>=a.length?{value:void 0,done:!0}:(t=r(a,n),e.index+=t.length,{value:t,done:!1})}))},"53ca":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));a("a4d3"),a("e01a"),a("d28b"),a("e260"),a("d3b7"),a("3ca3"),a("ddb0");function r(t){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}},6547:function(t,e,a){var r=a("a691"),n=a("1d80"),i=function(t){return function(e,a){var i,o,l=String(n(e)),s=r(a),c=l.length;return s<0||s>=c?t?"":void 0:(i=l.charCodeAt(s),i<55296||i>56319||s+1===c||(o=l.charCodeAt(s+1))<56320||o>57343?t?l.charAt(s):i:t?l.slice(s,s+2):o-56320+(i-55296<<10)+65536)}};t.exports={codeAt:i(!1),charAt:i(!0)}},"746f":function(t,e,a){var r=a("428f"),n=a("5135"),i=a("e538"),o=a("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});n(e,t)||o(e,t,{value:i.f(t)})}},a4d3:function(t,e,a){"use strict";var r=a("23e7"),n=a("da84"),i=a("d066"),o=a("c430"),l=a("83ab"),s=a("4930"),c=a("fdbf"),u=a("d039"),p=a("5135"),d=a("e8b5"),f=a("861d"),g=a("825a"),m=a("7b0b"),b=a("fc6a"),y=a("c04e"),v=a("5c6c"),h=a("7c73"),S=a("df75"),w=a("241c"),R=a("057f"),x=a("7418"),N=a("06cf"),k=a("9bf2"),I=a("d1e7"),D=a("9112"),P=a("6eeb"),T=a("5692"),_=a("f772"),L=a("d012"),O=a("90e3"),q=a("b622"),C=a("e538"),M=a("746f"),B=a("d44e"),F=a("69f3"),$=a("b727").forEach,j=_("hidden"),z="Symbol",E="prototype",A=q("toPrimitive"),G=F.set,V=F.getterFor(z),H=Object[E],J=n.Symbol,U=i("JSON","stringify"),Q=N.f,W=k.f,K=R.f,X=I.f,Y=T("symbols"),Z=T("op-symbols"),tt=T("string-to-symbol-registry"),et=T("symbol-to-string-registry"),at=T("wks"),rt=n.QObject,nt=!rt||!rt[E]||!rt[E].findChild,it=l&&u((function(){return 7!=h(W({},"a",{get:function(){return W(this,"a",{value:7}).a}})).a}))?function(t,e,a){var r=Q(H,e);r&&delete H[e],W(t,e,a),r&&t!==H&&W(H,e,r)}:W,ot=function(t,e){var a=Y[t]=h(J[E]);return G(a,{type:z,tag:t,description:e}),l||(a.description=e),a},lt=c?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof J},st=function(t,e,a){t===H&&st(Z,e,a),g(t);var r=y(e,!0);return g(a),p(Y,r)?(a.enumerable?(p(t,j)&&t[j][r]&&(t[j][r]=!1),a=h(a,{enumerable:v(0,!1)})):(p(t,j)||W(t,j,v(1,{})),t[j][r]=!0),it(t,r,a)):W(t,r,a)},ct=function(t,e){g(t);var a=b(e),r=S(a).concat(gt(a));return $(r,(function(e){l&&!pt.call(a,e)||st(t,e,a[e])})),t},ut=function(t,e){return void 0===e?h(t):ct(h(t),e)},pt=function(t){var e=y(t,!0),a=X.call(this,e);return!(this===H&&p(Y,e)&&!p(Z,e))&&(!(a||!p(this,e)||!p(Y,e)||p(this,j)&&this[j][e])||a)},dt=function(t,e){var a=b(t),r=y(e,!0);if(a!==H||!p(Y,r)||p(Z,r)){var n=Q(a,r);return!n||!p(Y,r)||p(a,j)&&a[j][r]||(n.enumerable=!0),n}},ft=function(t){var e=K(b(t)),a=[];return $(e,(function(t){p(Y,t)||p(L,t)||a.push(t)})),a},gt=function(t){var e=t===H,a=K(e?Z:b(t)),r=[];return $(a,(function(t){!p(Y,t)||e&&!p(H,t)||r.push(Y[t])})),r};if(s||(J=function(){if(this instanceof J)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=O(t),a=function(t){this===H&&a.call(Z,t),p(this,j)&&p(this[j],e)&&(this[j][e]=!1),it(this,e,v(1,t))};return l&&nt&&it(H,e,{configurable:!0,set:a}),ot(e,t)},P(J[E],"toString",(function(){return V(this).tag})),P(J,"withoutSetter",(function(t){return ot(O(t),t)})),I.f=pt,k.f=st,N.f=dt,w.f=R.f=ft,x.f=gt,C.f=function(t){return ot(q(t),t)},l&&(W(J[E],"description",{configurable:!0,get:function(){return V(this).description}}),o||P(H,"propertyIsEnumerable",pt,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!s,sham:!s},{Symbol:J}),$(S(at),(function(t){M(t)})),r({target:z,stat:!0,forced:!s},{for:function(t){var e=String(t);if(p(tt,e))return tt[e];var a=J(e);return tt[e]=a,et[a]=e,a},keyFor:function(t){if(!lt(t))throw TypeError(t+" is not a symbol");if(p(et,t))return et[t]},useSetter:function(){nt=!0},useSimple:function(){nt=!1}}),r({target:"Object",stat:!0,forced:!s,sham:!l},{create:ut,defineProperty:st,defineProperties:ct,getOwnPropertyDescriptor:dt}),r({target:"Object",stat:!0,forced:!s},{getOwnPropertyNames:ft,getOwnPropertySymbols:gt}),r({target:"Object",stat:!0,forced:u((function(){x.f(1)}))},{getOwnPropertySymbols:function(t){return x.f(m(t))}}),U){var mt=!s||u((function(){var t=J();return"[null]"!=U([t])||"{}"!=U({a:t})||"{}"!=U(Object(t))}));r({target:"JSON",stat:!0,forced:mt},{stringify:function(t,e,a){var r,n=[t],i=1;while(arguments.length>i)n.push(arguments[i++]);if(r=e,(f(e)||void 0!==t)&&!lt(t))return d(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!lt(e))return e}),n[1]=e,U.apply(null,n)}})}J[E][A]||D(J[E],A,J[E].valueOf),B(J,z),L[j]=!0},d28b:function(t,e,a){var r=a("746f");r("iterator")},ddb0:function(t,e,a){var r=a("da84"),n=a("fdbc"),i=a("e260"),o=a("9112"),l=a("b622"),s=l("iterator"),c=l("toStringTag"),u=i.values;for(var p in n){var d=r[p],f=d&&d.prototype;if(f){if(f[s]!==u)try{o(f,s,u)}catch(m){f[s]=u}if(f[c]||o(f,c,p),n[p])for(var g in i)if(f[g]!==i[g])try{o(f,g,i[g])}catch(m){f[g]=i[g]}}}},e01a:function(t,e,a){"use strict";var r=a("23e7"),n=a("83ab"),i=a("da84"),o=a("5135"),l=a("861d"),s=a("9bf2").f,c=a("e893"),u=i.Symbol;if(n&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var p={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new u(t):void 0===t?u():u(t);return""===t&&(p[e]=!0),e};c(d,u);var f=d.prototype=u.prototype;f.constructor=d;var g=f.toString,m="Symbol(test)"==String(u("test")),b=/^Symbol\((.*)\)[^)]+$/;s(f,"description",{configurable:!0,get:function(){var t=l(this)?this.valueOf():this,e=g.call(t);if(o(p,t))return"";var a=m?e.slice(7,-1):e.replace(b,"$1");return""===a?void 0:a}}),r({global:!0,forced:!0},{Symbol:d})}},e538:function(t,e,a){var r=a("b622");e.f=r},f6df:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("base-component",[a("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[a("BreadcrumbItem",{attrs:{to:"/home"}},[t._v("首页")]),a("BreadcrumbItem",[t._v("DRC审批")])],1),a("Content",{staticClass:"content",style:{padding:"10px",background:"#fff",margin:"50px 0 1px 185px",zIndex:"1"}},[a("div",{staticStyle:{padding:"1px 1px"}},[a("Row",{attrs:{gutter:10,align:"middle"}},[a("Col",{attrs:{span:"20"}},[a("Card",{attrs:{padding:5},scopedSlots:t._u([{key:"title",fn:function(){return[t._v("查询条件")]},proxy:!0}])},[a("Row",{attrs:{gutter:10}},[a("Col",{attrs:{span:"3"}},[a("Select",{attrs:{filterable:"",clearable:"",placeholder:"源region"},model:{value:t.queryParam.srcRegion,callback:function(e){t.$set(t.queryParam,"srcRegion",e)},expression:"queryParam.srcRegion"}},t._l(t.regions,(function(e){return a("Option",{key:e.regionName,attrs:{value:e.regionName}},[t._v(" "+t._s(e.regionName)+" ")])})),1)],1),a("Col",{attrs:{span:"3"}},[a("Select",{attrs:{filterable:"",clearable:"",placeholder:"目标region"},model:{value:t.queryParam.dstRegion,callback:function(e){t.$set(t.queryParam,"dstRegion",e)},expression:"queryParam.dstRegion"}},t._l(t.regions,(function(e){return a("Option",{key:e.regionName,attrs:{value:e.regionName}},[t._v(" "+t._s(e.regionName)+" ")])})),1)],1),a("Col",{attrs:{span:"6"}},[a("Input",{attrs:{prefix:"ios-search",placeholder:"库名"},on:{"on-enter":t.getData},model:{value:t.queryParam.dbName,callback:function(e){t.$set(t.queryParam,"dbName",e)},expression:"queryParam.dbName"}})],1),a("Col",{attrs:{span:"6"}},[a("Input",{attrs:{prefix:"ios-search",placeholder:"表名"},on:{"on-enter":t.getData},model:{value:t.queryParam.tableName,callback:function(e){t.$set(t.queryParam,"tableName",e)},expression:"queryParam.tableName"}})],1),a("Col",{attrs:{span:"3"}},[a("Select",{attrs:{filterable:"",clearable:"",placeholder:"过滤类型"},on:{"on-change":t.getData},model:{value:t.queryParam.filterType,callback:function(e){t.$set(t.queryParam,"filterType",e)},expression:"queryParam.filterType"}},t._l(t.filterTypeOpts,(function(e){return a("Option",{key:e.val,attrs:{value:e.val}},[t._v(t._s(e.val))])})),1)],1),a("Col",{attrs:{span:"3"}},[a("Select",{attrs:{filterable:"",clearable:"",placeholder:"审批结果"},on:{"on-change":t.getData},model:{value:t.queryParam.approvalResult,callback:function(e){t.$set(t.queryParam,"approvalResult",e)},expression:"queryParam.approvalResult"}},t._l(t.approvalResultOpts,(function(e){return a("Option",{key:e.val,attrs:{value:e.val}},[t._v(t._s(e.name))])})),1)],1)],1)],1)],1),a("Col",{attrs:{span:"2"}},[a("Button",{attrs:{type:"primary",icon:"ios-search",loading:t.dataLoading},on:{click:t.getData}},[t._v("查询")]),a("Button",{staticStyle:{"margin-top":"20px"},attrs:{icon:"md-refresh"},on:{click:t.resetParam}},[t._v("重置 ")])],1)],1),a("br"),a("Row",{staticStyle:{background:"#fdfdff",border:"1px solid #e8eaec"}},[a("Col",{staticStyle:{display:"flex",float:"left",margin:"5px"},attrs:{span:"2"}},[a("Button",{attrs:{type:"default",icon:"md-create"},on:{click:t.applicationBuild}},[t._v(" 申请DRC ")])],1)],1),a("Table",{attrs:{stripe:"",border:"",columns:t.columns,data:t.tableData},scopedSlots:t._u([{key:"action",fn:function(e){var r=e.row,n=e.index;return[a("Dropdown",{attrs:{transfer:!0,placement:"bottom-start"},scopedSlots:t._u([{key:"list",fn:function(){return[a("DropdownMenu",[a("DropdownItem",[a("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.getDetail(r,n)}}},[t._v(" 详情 ")])],1),a("DropdownItem",[a("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"success",size:"small"},on:{click:function(e){return t.copy(r,n)}}},[t._v(" 复制 ")])],1),a("DropdownItem",[a("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"error",size:"small"},on:{click:function(e){return t.preDelete(r,n)}}},[t._v(" 废弃 ")])],1),a("DropdownItem",[a("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"warning",size:"small"},on:{click:function(e){return t.sendEmail(r,n)}}},[t._v(" 发送邮件 ")])],1)],1)]},proxy:!0}],null,!0)},[a("Button",{attrs:{type:"default",icon:"ios-hammer"}},[t._v(" 操作 "),a("Icon",{attrs:{type:"ios-arrow-down"}})],1)],1)]}}])}),a("div",{staticStyle:{"text-align":"center",margin:"16px 0"}},[a("Page",{attrs:{transfer:!0,total:t.total,current:t.current,"page-size-opts":[10,20,50,100],"page-size":10,"show-total":"","show-sizer":"","show-elevator":""},on:{"update:current":function(e){t.current=e},"on-change":t.getData,"on-page-size-change":t.handleChangeSize}})],1),a("Modal",{attrs:{title:"确认删除以下申请单",width:"800px"},on:{"on-ok":t.deleteForm,"on-cancel":t.clearDeleteInfo},model:{value:t.deleteInfo.deleteModal,callback:function(e){t.$set(t.deleteInfo,"deleteModal",e)},expression:"deleteInfo.deleteModal"}},[a("p",[t._v("同步DB: "+t._s(t.deleteInfo.dbName))]),a("p",[t._v("同步表: "+t._s(t.deleteInfo.tableName))]),a("p",[t._v("同步方向: "+t._s(t.deleteInfo.srcRegion)+" => "+t._s(t.deleteInfo.dstRegion))])])],1)])],1)},n=[],i=(a("a4d3"),a("e01a"),a("d3b7"),a("53ca")),o={name:"applicationForm",data:function(){return{deleteInfo:{deleteModal:!1,dbName:null,tableName:null,srcRegion:null,dstRegion:null,applicationFormId:null},editable:!1,clearable:!1,dataLoading:!1,regions:[],queryParam:{dbName:null,tableName:null,srcRegion:null,dstRegion:null,approvalResult:null,filterType:null},tableData:[],columns:[{title:"同步DB",key:"dbName",tooltip:!0,width:200},{title:"同步表",key:"tableName",tooltip:!0},{title:"BU",key:"buName",width:150,align:"center"},{title:"同步方向",key:"region",width:150,align:"center",render:function(t,e){var a=e.row,r=a.srcRegion+"->"+a.dstRegion;return t("Tag",{props:{color:"blue"}},r)}},{title:"过滤方式",key:"filterType",width:150,align:"center",render:function(t,e){var a="blue",r=e.row.filterType;return"ALL"===r?a="blue":"UDL"===r&&(a="volcano"),t("Tag",{props:{color:a}},r)}},{title:"是否刷存量",key:"flushExistingData",width:150,align:"center",render:function(t,e){var a=e.row.flushExistingData,r="blue",n="";return 0===a?(r="blue",n="否"):1===a&&(r="volcano",n="是"),t("Tag",{props:{color:r}},n)}},{title:"是否使用给定位点",key:"useGivenGtid",width:150,align:"center",render:function(t,e){var a=e.row.useGivenGtid,r="",n="";return 0===a?(r="blue",n="否"):1===a&&(r="volcano",n="是"),t("Tag",{props:{color:r}},n)}},{title:"提交时间",key:"createTime",width:200,sortable:!0},{title:"审批结果",key:"approvalResult",width:150,align:"center",render:function(t,e){var a=e.row.approvalResult,r="cyan",n="";return 1===a?(r="green",n="通过"):2===a?(r="volcano",n="未通过"):3===a?(r="blue",n="未审批"):0===a&&(n="审批中"),t("Tag",{props:{color:r}},n)}},{title:"操作",slot:"action",width:200,align:"center"}],total:0,current:1,size:10,pageSizeOpts:[10,20,50,100],approvalResultOpts:[{name:"审批中",val:0},{name:"通过",val:1},{name:"未通过",val:2},{name:"未审批",val:3}],filterTypeOpts:[{val:"ALL"},{val:"UDL"}]}},methods:{sendEmail:function(t,e){var a=this;this.axios.post("/api/drc/v2/application/email?applicationFormId="+t.applicationFormId).then((function(t){var e=t.data;!1===e.data?a.$Message.error("发送邮件失败！"):a.$Message.success("发送邮件成功")}))},preDelete:function(t,e){this.deleteInfo={deleteModal:!0,dbName:t.dbName,tableName:t.tableName,srcRegion:t.srcRegion,dstRegion:t.dstRegion,applicationFormId:t.applicationFormId}},clearDeleteInfo:function(){this.deleteInfo={deleteModal:!1,dbName:null,tableName:null,srcRegion:null,dstRegion:null,applicationFormId:null}},deleteForm:function(){var t=this;this.axios.delete("/api/drc/v2/application/?applicationFormId="+this.deleteInfo.applicationFormId).then((function(e){var a=e.data;1===a.status?t.$Message.error("操作失败！"+a.message):t.getData()}))},applicationBuild:function(){var t=this.$router.resolve({path:"/applicationBuild"});window.open(t.href,"_blank")},getData:function(){var t=this,e={dbName:this.queryParam.dbName,tableName:this.queryParam.tableName,srcRegion:this.queryParam.srcRegion,dstRegion:this.queryParam.dstRegion,approvalResult:this.queryParam.approvalResult,filterType:this.queryParam.filterType,pageReq:{pageSize:this.size,pageIndex:this.current}},a=this.flattenObj(e);this.dataLoading=!0,this.axios.get("/api/drc/v2/application/list",{params:a}).then((function(e){var a=e.data,r=a.pageReq;1===a.status?t.$Message.error("查询失败"):0===a.data.length||0===r.totalCount?(t.total=0,t.current=1,t.tableData=a.data,t.$Message.warning("查询结果为空")):(t.total=r.totalCount,t.current=r.pageIndex,t.tableData=a.data,t.$Message.success("查询成功"))})).finally((function(){t.dataLoading=!1}))},flattenObj:function(t){var e={};for(var a in t)if("object"!==Object(i["a"])(t[a])||Array.isArray(t[a]))e[a]=t[a];else{var r=this.flattenObj(t[a]);for(var n in r)e[a+"."+n]=r[n]}return e},resetParam:function(){this.queryParam={dbName:null,tableName:null,srcRegion:null,dstRegion:null,approvalResult:null,filterType:null}},getDetail:function(t,e){var a=this.$router.resolve({path:"/applicationBuild",query:{applicationFormId:t.applicationFormId,showDetail:!0,dbName:t.dbName,tableName:t.tableName,srcRegion:t.srcRegion,dstRegion:t.dstRegion,filterType:t.filterType,buName:t.buName,tps:t.tps,description:t.description,disruptionImpact:t.disruptionImpact,tag:t.tag,flushExistingData:t.flushExistingData,orderRelated:t.orderRelated,gtidInit:t.gtidInit,remark:t.remark,applicant:t.applicant}});window.open(a.href,"_blank")},copy:function(t,e){var a=this.$router.resolve({path:"/applicationBuild",query:{dbName:t.dbName,tableName:t.tableName,srcRegion:t.srcRegion,dstRegion:t.dstRegion,filterType:t.filterType,buName:t.buName,tps:t.tps,description:t.description,disruptionImpact:t.disruptionImpact,tag:t.tag,flushExistingData:t.flushExistingData,orderRelated:t.orderRelated,remark:t.remark,applicant:t.applicant,applicationFormId:t.applicationFormId}});window.open(a.href,"_blank")},handleChangeSize:function(t){var e=this;this.size=t,this.$nextTick((function(){e.getData()}))},getRegions:function(){var t=this;this.axios.get("/api/drc/v2/meta/regions/all").then((function(e){t.regions=e.data.data}))}},created:function(){this.getRegions(),this.getData()}},l=o,s=a("2877"),c=Object(s["a"])(l,r,n,!1,null,"379d80bd",null);e["default"]=c.exports},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-13df612e.0de41caa.js.map