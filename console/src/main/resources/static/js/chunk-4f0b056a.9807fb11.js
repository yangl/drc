(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f0b056a","chunk-6304b0b8"],{"057f":function(t,e,o){var n=o("fc6a"),r=o("241c").f,i={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return r(t)}catch(e){return s.slice()}};t.exports.f=function(t){return s&&"[object Window]"==i.call(t)?a(t):r(n(t))}},1276:function(t,e,o){"use strict";var n=o("d784"),r=o("44e7"),i=o("825a"),s=o("1d80"),a=o("4840"),l=o("8aa5"),c=o("50c4"),u=o("14c3"),f=o("9263"),d=o("d039"),m=[].push,h=Math.min,g=4294967295,p=!d((function(){return!RegExp(g,"y")}));n("split",2,(function(t,e,o){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,o){var n=String(s(this)),i=void 0===o?g:o>>>0;if(0===i)return[];if(void 0===t)return[n];if(!r(t))return e.call(n,t,i);var a,l,c,u=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),h=0,p=new RegExp(t.source,d+"g");while(a=f.call(p,n)){if(l=p.lastIndex,l>h&&(u.push(n.slice(h,a.index)),a.length>1&&a.index<n.length&&m.apply(u,a.slice(1)),c=a[0].length,h=l,u.length>=i))break;p.lastIndex===a.index&&p.lastIndex++}return h===n.length?!c&&p.test("")||u.push(""):u.push(n.slice(h)),u.length>i?u.slice(0,i):u}:"0".split(void 0,0).length?function(t,o){return void 0===t&&0===o?[]:e.call(this,t,o)}:e,[function(e,o){var r=s(this),i=void 0==e?void 0:e[t];return void 0!==i?i.call(e,r,o):n.call(String(r),e,o)},function(t,r){var s=o(n,t,this,r,n!==e);if(s.done)return s.value;var f=i(t),d=String(this),m=a(f,RegExp),b=f.unicode,v=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(p?"y":"g"),C=new m(p?f:"^(?:"+f.source+")",v),w=void 0===r?g:r>>>0;if(0===w)return[];if(0===d.length)return null===u(C,d)?[d]:[];var y=0,I=0,F=[];while(I<d.length){C.lastIndex=p?I:0;var x,S=u(C,p?d:d.slice(I));if(null===S||(x=h(c(C.lastIndex+(p?0:I)),d.length))===y)I=l(d,I,b);else{if(F.push(d.slice(y,I)),F.length===w)return F;for(var N=1;N<=S.length-1;N++)if(F.push(S[N]),F.length===w)return F;I=y=x}}return F.push(d.slice(y)),F}]}),!p)},"14c3":function(t,e,o){var n=o("c6b6"),r=o("9263");t.exports=function(t,e){var o=t.exec;if("function"===typeof o){var i=o.call(t,e);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==n(t))throw TypeError("RegExp#exec called on incompatible receiver");return r.call(t,e)}},"25f0":function(t,e,o){"use strict";var n=o("6eeb"),r=o("825a"),i=o("d039"),s=o("ad6d"),a="toString",l=RegExp.prototype,c=l[a],u=i((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),f=c.name!=a;(u||f)&&n(RegExp.prototype,a,(function(){var t=r(this),e=String(t.source),o=t.flags,n=String(void 0===o&&t instanceof RegExp&&!("flags"in l)?s.call(t):o);return"/"+e+"/"+n}),{unsafe:!0})},2909:function(t,e,o){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,o=new Array(t.length);e<t.length;e++)o[e]=t[e];return o}}o.d(e,"a",(function(){return s}));o("a4d3"),o("e01a"),o("d28b"),o("a630"),o("e260"),o("d3b7"),o("25f0"),o("3ca3"),o("ddb0");function r(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function s(t){return n(t)||r(t)||i()}},"3ca3":function(t,e,o){"use strict";var n=o("6547").charAt,r=o("69f3"),i=o("7dd0"),s="String Iterator",a=r.set,l=r.getterFor(s);i(String,"String",(function(t){a(this,{type:s,string:String(t),index:0})}),(function(){var t,e=l(this),o=e.string,r=e.index;return r>=o.length?{value:void 0,done:!0}:(t=n(o,r),e.index+=t.length,{value:t,done:!1})}))},"44e7":function(t,e,o){var n=o("861d"),r=o("c6b6"),i=o("b622"),s=i("match");t.exports=function(t){var e;return n(t)&&(void 0!==(e=t[s])?!!e:"RegExp"==r(t))}},"4df4":function(t,e,o){"use strict";var n=o("0366"),r=o("7b0b"),i=o("9bdd"),s=o("e95a"),a=o("50c4"),l=o("8418"),c=o("35a1");t.exports=function(t){var e,o,u,f,d,m,h=r(t),g="function"==typeof this?this:Array,p=arguments.length,b=p>1?arguments[1]:void 0,v=void 0!==b,C=c(h),w=0;if(v&&(b=n(b,p>2?arguments[2]:void 0,2)),void 0==C||g==Array&&s(C))for(e=a(h.length),o=new g(e);e>w;w++)m=v?b(h[w],w):h[w],l(o,w,m);else for(f=C.call(h),d=f.next,o=new g;!(u=d.call(f)).done;w++)m=v?i(f,b,[u.value,w],!0):u.value,l(o,w,m);return o.length=w,o}},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,o){var n=o("1d80"),r=o("5899"),i="["+r+"]",s=RegExp("^"+i+i+"*"),a=RegExp(i+i+"*$"),l=function(t){return function(e){var o=String(n(e));return 1&t&&(o=o.replace(s,"")),2&t&&(o=o.replace(a,"")),o}};t.exports={start:l(1),end:l(2),trim:l(3)}},6547:function(t,e,o){var n=o("a691"),r=o("1d80"),i=function(t){return function(e,o){var i,s,a=String(r(e)),l=n(o),c=a.length;return l<0||l>=c?t?"":void 0:(i=a.charCodeAt(l),i<55296||i>56319||l+1===c||(s=a.charCodeAt(l+1))<56320||s>57343?t?a.charAt(l):i:t?a.slice(l,l+2):s-56320+(i-55296<<10)+65536)}};t.exports={codeAt:i(!1),charAt:i(!0)}},7156:function(t,e,o){var n=o("861d"),r=o("d2bb");t.exports=function(t,e,o){var i,s;return r&&"function"==typeof(i=e.constructor)&&i!==o&&n(s=i.prototype)&&s!==o.prototype&&r(t,s),t}},"746f":function(t,e,o){var n=o("428f"),r=o("5135"),i=o("e538"),s=o("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});r(e,t)||s(e,t,{value:i.f(t)})}},8418:function(t,e,o){"use strict";var n=o("c04e"),r=o("9bf2"),i=o("5c6c");t.exports=function(t,e,o){var s=n(e);s in t?r.f(t,s,i(0,o)):t[s]=o}},"8aa5":function(t,e,o){"use strict";var n=o("6547").charAt;t.exports=function(t,e,o){return e+(o?n(t,e).length:1)}},9263:function(t,e,o){"use strict";var n=o("ad6d"),r=o("9f7f"),i=RegExp.prototype.exec,s=String.prototype.replace,a=i,l=function(){var t=/a/,e=/b*/g;return i.call(t,"a"),i.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),c=r.UNSUPPORTED_Y||r.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],f=l||u||c;f&&(a=function(t){var e,o,r,a,f=this,d=c&&f.sticky,m=n.call(f),h=f.source,g=0,p=t;return d&&(m=m.replace("y",""),-1===m.indexOf("g")&&(m+="g"),p=String(t).slice(f.lastIndex),f.lastIndex>0&&(!f.multiline||f.multiline&&"\n"!==t[f.lastIndex-1])&&(h="(?: "+h+")",p=" "+p,g++),o=new RegExp("^(?:"+h+")",m)),u&&(o=new RegExp("^"+h+"$(?!\\s)",m)),l&&(e=f.lastIndex),r=i.call(d?o:f,p),d?r?(r.input=r.input.slice(g),r[0]=r[0].slice(g),r.index=f.lastIndex,f.lastIndex+=r[0].length):f.lastIndex=0:l&&r&&(f.lastIndex=f.global?r.index+r[0].length:e),u&&r&&r.length>1&&s.call(r[0],o,(function(){for(a=1;a<arguments.length-2;a++)void 0===arguments[a]&&(r[a]=void 0)})),r}),t.exports=a},"9c67":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("base-component",[o("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[o("BreadcrumbItem",{attrs:{to:{path:"/v2/mhaReplications",query:{srcMhaName:this.commonInfo.srcMhaName,dstMhaName:this.commonInfo.dstMhaName,preciseSearchMode:!0}}}},[t._v("首页 ")]),o("BreadcrumbItem",{attrs:{to:{path:"/drcV2",query:{step:3,srcMhaName:this.commonInfo.srcMhaName,dstMhaName:this.commonInfo.dstMhaName,srcDc:this.commonInfo.srcDc,dstDc:this.commonInfo.dstDc,order:this.commonInfo.order}}}},[t._v("DRC配置V2 ")]),o("BreadcrumbItem",{attrs:{to:{path:"/dbTables",query:{srcMhaName:this.commonInfo.srcMhaName,dstMhaName:this.commonInfo.dstMhaName,srcDc:this.commonInfo.srcDc,dstDc:this.commonInfo.dstDc}}}},[t._v("同步表 ")]),o("BreadcrumbItem",[t._v("同步表配置")])],1),o("Content",{staticClass:"content",style:{padding:"10px",background:"#ffffff",margin:"50px 0 1px 185px",zIndex:"1"}},[o("span",{staticStyle:{"margin-top":"10px",color:"#464c5b","font-weight":"600"}},[t._v(t._s(t.commonInfo.srcMhaName)+"("+t._s(t.commonInfo.srcDc)+") ==> "+t._s(t.commonInfo.dstMhaName)+"("+t._s(t.commonInfo.dstDc)+")")]),o("br"),o("br"),t.showMsg?o("Alert",{attrs:{type:"warning","show-icon":"",closable:""},scopedSlots:t._u([{key:"desc",fn:function(){return[t._v(t._s(t.message))]},proxy:!0}],null,!1,964728714)},[t._v(" "+t._s(t.title)+" ")]):t._e(),o("Row",{attrs:{gutter:10,align:"middle"}},[o("Col",{attrs:{span:"13"}},[o("Form",{ref:"commonInfo",attrs:{model:t.commonInfo,rules:t.ruleInline,"label-width":100}},[o("FormItem",{attrs:{prop:"dbName",label:"库名",required:!0}},[o("Input",{attrs:{type:"text",readonly:t.update,placeholder:"请输入库名（支持正则）"},model:{value:t.commonInfo.dbName,callback:function(e){t.$set(t.commonInfo,"dbName",e)},expression:"commonInfo.dbName"}})],1),o("FormItem",{attrs:{prop:"tableName",label:"表名",required:!0}},[o("Input",{attrs:{type:"text",readonly:t.show,placeholder:"请输入表名（支持正则）"},model:{value:t.commonInfo.tableName,callback:function(e){t.$set(t.commonInfo,"tableName",e)},expression:"commonInfo.tableName"}})],1),o("FormItem",{attrs:{label:"行过滤"}},[o("i-switch",{attrs:{disabled:t.show,size:"large"},scopedSlots:t._u([{key:"open",fn:function(){return[o("span",[t._v("On")])]},proxy:!0},{key:"close",fn:function(){return[o("span",[t._v("Off")])]},proxy:!0}]),model:{value:t.formItem.switch.rowsFilter,callback:function(e){t.$set(t.formItem.switch,"rowsFilter",e)},expression:"formItem.switch.rowsFilter"}})],1),t.formItem.switch.rowsFilter?o("Card",{staticStyle:{"margin-left":"100px"},scopedSlots:t._u([{key:"title",fn:function(){return[o("Icon",{attrs:{type:"md-settings"}}),t._v(" 行过滤配置 ")]},proxy:!0}],null,!1,2915474430)},[o("FormItem",{attrs:{label:"模式"}},[o("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择行过滤模式"},model:{value:t.rowsFilterConfig.mode,callback:function(e){t.$set(t.rowsFilterConfig,"mode",e)},expression:"rowsFilterConfig.mode"}},t._l(t.rowsFilterConfig.modes,(function(e){return o("Option",{key:e.mode,attrs:{value:e.mode}},[t._v(t._s(e.name)+" ")])})),1)],1),1!==t.rowsFilterConfig.mode||0===t.rowsFilterConfig.fetchMode?o("FormItem",{attrs:{label:"规则内容"}},[1!==t.rowsFilterConfig.mode?o("Input",{staticStyle:{width:"250px"},attrs:{type:"textarea",placeholder:"请输入行过滤内容"},model:{value:t.rowsFilterConfig.context,callback:function(e){t.$set(t.rowsFilterConfig,"context",e)},expression:"rowsFilterConfig.context"}}):t._e(),1===t.rowsFilterConfig.mode&&0===t.rowsFilterConfig.fetchMode?o("Select",{staticStyle:{width:"200px"},attrs:{multiple:"",placeholder:"Region 选择"},model:{value:t.configInTripUid.regionsChosen,callback:function(e){t.$set(t.configInTripUid,"regionsChosen",e)},expression:"configInTripUid.regionsChosen"}},t._l(t.rowsFilterConfig.regionsForChose,(function(e){return o("Option",{key:e,attrs:{value:e}},[t._v(t._s(e))])})),1):t._e()],1):t._e(),1===t.rowsFilterConfig.mode?o("FormItem",{attrs:{label:"空处理"}},[o("Checkbox",{model:{value:t.rowsFilterConfig.illegalArgument,callback:function(e){t.$set(t.rowsFilterConfig,"illegalArgument",e)},expression:"rowsFilterConfig.illegalArgument"}},[t._v("【字段为空时】同步")])],1):t._e(),1===t.rowsFilterConfig.mode?o("Divider",[t._v("UDL配置")]):t._e(),1===t.rowsFilterConfig.mode?o("FormItem",{attrs:{label:"UDL字段"}},[o("Select",{staticStyle:{width:"200px"},attrs:{filterable:"","allow-create":"",multiple:"",placeholder:"不选默认则无UDL配置"},on:{"on-create":t.handleCreateUDLColumn},model:{value:t.rowsFilterConfig.udlColumns,callback:function(e){t.$set(t.rowsFilterConfig,"udlColumns",e)},expression:"rowsFilterConfig.udlColumns"}},t._l(t.columnsForChose,(function(e){return o("Option",{key:e,attrs:{value:e}},[t._v(t._s(e))])})),1)],1):t._e(),1===t.rowsFilterConfig.mode&&0!==t.rowsFilterConfig.udlColumns.length?o("FormItem",{attrs:{label:"DRC UDL策略id"}},[o("Select",{staticStyle:{width:"200px"},attrs:{filterable:"","allow-create":"",placeholder:"请选择ucs策略id"},model:{value:t.rowsFilterConfig.drcStrategyId,callback:function(e){t.$set(t.rowsFilterConfig,"drcStrategyId",e)},expression:"rowsFilterConfig.drcStrategyId"}},t._l(t.rowsFilterConfig.drcStrategyIdsForChose,(function(e){return o("Option",{key:e,attrs:{value:e}},[t._v(t._s(e)+" ")])})),1)],1):t._e(),1===t.rowsFilterConfig.mode?o("Divider",[t._v("UID配置")]):t._e(),1!==t.rowsFilterConfig.mode?o("FormItem",{attrs:{label:"相关字段"}},[o("Select",{staticStyle:{width:"200px"},attrs:{filterable:"","allow-create":"",multiple:"",placeholder:"选择相关字段"},on:{"on-create":t.handleCreateUDLColumn},model:{value:t.rowsFilterConfig.columns,callback:function(e){t.$set(t.rowsFilterConfig,"columns",e)},expression:"rowsFilterConfig.columns"}},t._l(t.columnsForChose,(function(t){return o("Option",{key:t,attrs:{value:t,lable:t}})})),1)],1):t._e(),1===t.rowsFilterConfig.mode?o("FormItem",{attrs:{label:"UID字段"}},[o("Select",{staticStyle:{width:"200px"},attrs:{filterable:"","allow-create":"",multiple:"",placeholder:"不选默认则无UID配置"},on:{"on-create":t.handleCreateUDLColumn},model:{value:t.rowsFilterConfig.columns,callback:function(e){t.$set(t.rowsFilterConfig,"columns",e)},expression:"rowsFilterConfig.columns"}},t._l(t.columnsForChose,(function(e){return o("Option",{key:e,attrs:{value:e}},[t._v(t._s(e))])})),1)],1):t._e(),1===t.rowsFilterConfig.mode?o("FormItem",{attrs:{label:"fetchMode"}},[o("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择"},on:{"on-change":function(e){return t.fetchModeChange()}},model:{value:t.rowsFilterConfig.fetchMode,callback:function(e){t.$set(t.rowsFilterConfig,"fetchMode",e)},expression:"rowsFilterConfig.fetchMode"}},t._l(t.rowsFilterConfig.fetchModeForChose,(function(e){return o("Option",{key:e.k,attrs:{value:e.v}},[t._v(t._s(e.k)+" ")])})),1)],1):t._e()],1):t._e(),o("FormItem",{attrs:{label:"字段过滤"}},[o("i-switch",{attrs:{disabled:t.show,size:"large"},scopedSlots:t._u([{key:"open",fn:function(){return[o("span",[t._v("On")])]},proxy:!0},{key:"close",fn:function(){return[o("span",[t._v("Off")])]},proxy:!0}]),model:{value:t.formItem.switch.columnsFilter,callback:function(e){t.$set(t.formItem.switch,"columnsFilter",e)},expression:"formItem.switch.columnsFilter"}})],1),t.formItem.switch.columnsFilter?o("Card",{staticStyle:{"margin-left":"100px"},scopedSlots:t._u([{key:"title",fn:function(){return[o("Icon",{attrs:{type:"md-settings"}}),t._v(" 字段过滤配置 ")]},proxy:!0}],null,!1,495830608)},[o("FormItem",{attrs:{label:"模式"}},[o("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择字段过滤模式"},model:{value:t.columnsFilterConfig.mode,callback:function(e){t.$set(t.columnsFilterConfig,"mode",e)},expression:"columnsFilterConfig.mode"}},t._l(t.columnsFilterConfig.modes,(function(e){return o("Option",{key:e.mode,attrs:{value:e.mode}},[t._v(t._s(e.name)+" ")])})),1)],1),o("FormItem",{attrs:{label:"字段"}},[o("Select",{staticStyle:{width:"200px"},attrs:{filterable:"","allow-create":"",multiple:"",placeholder:"选择相关的字段"},on:{"on-create":t.handleCreateUDLColumn},model:{value:t.columnsFilterConfig.columns,callback:function(e){t.$set(t.columnsFilterConfig,"columns",e)},expression:"columnsFilterConfig.columns"}},t._l(t.columnsForChose,(function(e){return o("Option",{key:e,attrs:{value:e}},[t._v(t._s(e))])})),1)],1)],1):t._e(),o("br"),t.show?t._e():o("FormItem",[o("Button",{attrs:{type:"primary",loading:t.dataLoading},on:{click:t.submitAll}},[t._v("提交")])],1)],1)],1),o("Col",{attrs:{span:"11"}},[o("Divider",{staticStyle:{"margin-top":"1px"}},[t._v("预览：同步表")]),o("Button",{attrs:{type:"primary",loading:t.tableLoading},on:{click:t.checkMysqlTablesInSrcMha}},[t._v("检查同步表")]),o("Table",{attrs:{size:"small",height:t.tableHeight,loading:t.tableLoading,stripe:"",columns:t.nameFilterCheck.columns,data:t.dataWithPage,border:""}}),o("div",[o("Page",{attrs:{transfer:!0,total:t.commonInfo.tableData.length,current:t.nameFilterCheck.current,"page-size-opts":t.nameFilterCheck.pageSizeOpts,"page-size":this.nameFilterCheck.size,"show-total":"","show-sizer":"","show-elevator":""},on:{"update:current":function(e){return t.$set(t.nameFilterCheck,"current",e)},"on-page-size-change":t.handleChangeSize}})],1)],1)],1)],1)],1)},r=[],i=(o("a15b"),o("fb6a"),o("a9e3"),o("ac1f"),o("1276"),o("2909")),s={data:function(){return{currentStep:0,dataLoading:!1,tableLoading:!1,update:!1,batchUpdate:!1,show:!1,message:"",showMsg:!1,title:"",tableHeight:80,rowsFilterConfig:{mode:1,drcStrategyId:0,routeStrategyId:0,udlColumns:[],columns:[],context:"",illegalArgument:!1,fetchMode:0,modes:[{name:"trip_udl",mode:1},{name:"java_regex",mode:0},{name:"aviator_regex",mode:3},{name:"custom",mode:4}],regionsForChose:["SIN","SH","FRA"],drcStrategyIdsForChose:[2000000002],fetchModeForChose:[{k:"RPC调用",v:0},{k:"BlackList",v:1},{k:"WhiteList",v:2},{k:"BlackListGlobal",v:3}]},columnsForChose:[],configInTripUid:{regionsChosen:[]},columnsFilterConfig:{mode:Number,columns:[],modes:[{name:"exclude",mode:0},{name:"include",mode:1},{name:"regex",mode:2}]},formItem:{switch:{rowsFilter:!1,columnsFilter:!1}},commonInfo:{srcMhaName:"",srcMhaId:0,dstMhaName:"",srcDc:"",dstDc:"",order:!0,testIds:[],dbReplicationIds:[],dbReplicationId:0,dbName:"",tableName:"",tableData:[],rowsFilterDetail:{mode:"trip-uld",row:null},colsFilterDetail:{mode:null,row:null},switch:{rowsFilter:!1,columnsFilter:!1}},ruleInline:{dbName:[{required:!0,message:"请输入库名",trigger:"blur"}],tableName:[{required:!0,message:"请输入表名",trigger:"blur"}]},nameFilterCheck:{columns:[{title:"序号",width:75,align:"center",fixed:"left",render:function(t,e){return t("span",e.index+1)}},{title:"库名",key:"schema",resizable:!0},{title:"表名",key:"table",resizable:!0},{title:"结果",align:"center",render:function(t,e){var o=e.row,n="ok"!==o.res?"volcano":"green",r=o.res;return t("Tag",{props:{color:n}},r)}}],total:0,current:1,size:10,pageSizeOpts:[10,20,50,100]}}},methods:{submitAll:function(){var t=this;console.log("dbReplicationId: "+this.commonInfo.dbReplicationId),console.log("dbReplicationIds: "+this.commonInfo.dbReplicationIds),console.log("testIds: "+this.commonInfo.testIds),this.dataLoading=!0;var e=this.getRowsFilterParam(),o=this.getColumnsFilterParam(),n={dbReplicationIds:this.commonInfo.dbReplicationIds,srcMhaName:this.commonInfo.srcMhaName,dstMhaName:this.commonInfo.dstMhaName,dbName:this.commonInfo.dbName,tableName:this.commonInfo.tableName,rowsFilterCreateParam:e,columnsFilterCreateParam:o};this.axios.post("/api/drc/v2/config/dbReplications",n).then((function(e){t.dataLoading=!1,1===e.data.status?t.$Message.error({content:"提交失败! "+e.data.message,duration:2}):(t.update=!0,t.show=!0,t.$Message.success("提交成功！"))}))},checkMysqlTablesInSrcMha:function(){this.nameFilterCheck.current=1,this.getCommonColumns(),this.checkMySqlTables(this.commonInfo.srcMhaName,this.commonInfo.dbName+"\\."+this.commonInfo.tableName)},checkMySqlTables:function(t,e){var o=this;console.log("nameFilter:"+e),null==e&&(e=""),this.tableLoading=!0,this.axios.get("/api/drc/v2/mysql/preCheckMySqlTables?mha="+t+"&nameFilter="+e).then((function(t){o.tableLoading=!1,o.commonInfo.tableData=t.data.data,o.commonInfo.tableData.length<10?o.tableHeight=40*(o.commonInfo.tableData.length+1):o.tableHeight=440}))},handleChangeSize:function(t){this.nameFilterCheck.size=t},getRowsFilterParam:function(){if(!this.formItem.switch.rowsFilter)return null;if(1===this.rowsFilterConfig.mode){if(0===this.rowsFilterConfig.columns.length&&0===this.rowsFilterConfig.udlColumns.length)return void this.$Message.warning("uid 与 uld字段不能同时为空！");if(1===this.rowsFilterConfig.fetchMode||2===this.rowsFilterConfig.fetchMode||3===this.rowsFilterConfig.fetchMode?this.rowsFilterConfig.context="//filter by config":this.rowsFilterConfig.context=this.configInTripUid.regionsChosen.join(","),0===this.rowsFilterConfig.fetchMode&&(""===this.rowsFilterConfig.context||void 0===this.rowsFilterConfig.context||"//filter by config"===this.rowsFilterConfig.context))return void this.$Message.warning("context 不能为空！")}if(""!==this.rowsFilterConfig.mode&&void 0!==this.rowsFilterConfig.mode&&(0!==this.rowsFilterConfig.columns.length||0!==this.rowsFilterConfig.udlColumns.length)){var t={dbName:this.dbName,tableName:this.tableName,mode:this.rowsFilterConfig.mode,columns:0===this.rowsFilterConfig.columns.length?null:this.rowsFilterConfig.columns,udlColumns:0===this.rowsFilterConfig.udlColumns.length?null:this.rowsFilterConfig.udlColumns,drcStrategyId:0===this.rowsFilterConfig.udlColumns.length?null:this.rowsFilterConfig.drcStrategyId,routeStrategyId:this.rowsFilterConfig.routeStrategyId,illegalArgument:this.rowsFilterConfig.illegalArgument,fetchMode:this.rowsFilterConfig.fetchMode,context:""===this.rowsFilterConfig.context?null:this.rowsFilterConfig.context};return t}this.$Message.warning("缺少行过滤配置 禁止提交")},getRowsFilterConfig:function(){var t=this;this.axios.get("/api/drc/v2/config/rowsFilter?dbReplicationId="+this.commonInfo.dbReplicationId).then((function(e){if(1===e.data.status)t.$Message.error("查询行过滤配置失败!");else{var o=e.data.data;null==o||(t.formItem.switch.rowsFilter=!0,t.rowsFilterConfig.context=o.context,1===o.mode?t.configInTripUid.regionsChosen=o.context.split(","):t.configInTripUid={regionsChosen:[]},t.rowsFilterConfig.mode=o.mode,t.rowsFilterConfig.columns=null===o.columns?[]:o.columns,0!==o.udlColumns.length&&(t.rowsFilterConfig.udlColumns=o.udlColumns),t.rowsFilterConfig.drcStrategyId=0===o.drcStrategyId?null:o.drcStrategyId,t.rowsFilterConfig.routeStrategyId=o.routeStrategyId,t.rowsFilterConfig.illegalArgument=o.illegalArgument,t.rowsFilterConfig.fetchMode=o.fetchMode)}}))},getCommonColumns:function(){var t=this;this.axios.get("/api/drc/v2/mysql/commonColumns?&mhaName="+this.commonInfo.srcMhaName+"&namespace="+this.commonInfo.dbName+"&name="+this.commonInfo.tableName).then((function(e){1===e.data.status?(t.$Message.error("查询公共列名失败，请手动添加！"),t.columnsForChose=[]):(console.log(e.data.data),t.columnsForChose=e.data.data,0===t.columnsForChose.length&&t.$Message.warning("查询无公共字段！"))}))},fetchModeChange:function(){1===this.rowsFilterConfig.fetchMode||3===this.rowsFilterConfig.fetchMode?this.rowsFilterConfig.illegalArgument=!0:this.rowsFilterConfig.illegalArgument=!1},getColumnsFilterParam:function(){if(this.formItem.switch.columnsFilter){var t={mode:this.columnsFilterConfig.mode,columns:this.columnsFilterConfig.columns};return t}return null},getColumnsFilterConfig:function(){var t=this;this.axios.get("/api/drc/v2/config/columnsFilter?dbReplicationId="+this.commonInfo.dbReplicationId).then((function(e){if(1===e.data.status)t.$Message.error("查询字段过滤配置失败!");else{var o=e.data.data;null==o||(t.columnsFilterConfig.mode=o.mode,t.columnsFilterConfig.columns=o.columns,t.formItem.switch.columnsFilter=!0)}}))},contains:function(t,e){var o=t.length;while(o--)if(t[o]===e)return!0;return!1},handleCreateUDLColumn:function(t){var e=this;this.showMsg=!1,"无UDL"===t||this.contains(this.columnsForChose,t)?alert("已有项禁止创建"):""!==t&&void 0!==t&&null!==t?this.axios.get("/api/drc/v2/mysql//columnCheck?mhaName="+this.commonInfo.srcMhaName+"&namespace="+this.commonInfo.dbName+"&name="+this.commonInfo.tableName+"&column="+t).then((function(o){if(1===o.data.status)e.$Message.error("查询字段:"+t+"失败！"+o.data.data),e.columnsForChose.push(t);else{var n=o.data.data;0!==n.length&&(e.showMsg=!0,e.title="以下表无字段"+t,e.message=n),e.columnsForChose.push(t)}})):alert("字段不能为空")},handleCreateColumn:function(t){this.contains(this.columnsForChose,t)?alert("已有项禁止创建"):""!==t&&void 0!==t&&null!==t?this.columnsForChose.push(t):alert("字段不能为空")},notice:function(){this.batchUpdate&&void 0!==this.commonInfo.dbReplicationIds&&this.$Message.info("共选中"+this.commonInfo.dbReplicationIds.length+"行")},init:function(){this.notice(),void 0!==this.commonInfo.dbReplicationId&&(this.getRowsFilterConfig(),this.getColumnsFilterConfig())}},computed:{dataWithPage:function(){var t=this.commonInfo.tableData,e=this.nameFilterCheck.current*this.nameFilterCheck.size-this.nameFilterCheck.size,o=e+this.nameFilterCheck.size;return Object(i["a"])(t).slice(e,o)}},created:function(){var t=[];void 0!==this.$route.query.dbReplicationIds&&(t=JSON.parse(this.$route.query.dbReplicationIds)),console.log("dbReplicationIds:"+t),this.commonInfo={srcMhaName:this.$route.query.srcMhaName,srcMhaId:this.$route.query.srcMhaId,dstMhaName:this.$route.query.dstMhaName,srcDc:this.$route.query.srcDc,dstDc:this.$route.query.dstDc,dbName:this.$route.query.dbName,tableName:this.$route.query.tableName,dbReplicationId:this.$route.query.dbReplicationId,dbReplicationIds:t,tableData:[]},this.update=this.$route.query.update,this.batchUpdate=this.$route.query.batchUpdate,this.show=this.$route.query.show;var e=void 0!==this.commonInfo.dbName&&void 0!==this.commonInfo.tableName;e&&this.checkMysqlTablesInSrcMha(),console.log("commonInfo"),console.log(this.commonInfo),this.init()}},a=s,l=o("2877"),c=Object(l["a"])(a,n,r,!1,null,null,null);e["default"]=c.exports},"9f7f":function(t,e,o){"use strict";var n=o("d039");function r(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=n((function(){var t=r("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=n((function(){var t=r("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a15b:function(t,e,o){"use strict";var n=o("23e7"),r=o("44ad"),i=o("fc6a"),s=o("a640"),a=[].join,l=r!=Object,c=s("join",",");n({target:"Array",proto:!0,forced:l||!c},{join:function(t){return a.call(i(this),void 0===t?",":t)}})},a4d3:function(t,e,o){"use strict";var n=o("23e7"),r=o("da84"),i=o("d066"),s=o("c430"),a=o("83ab"),l=o("4930"),c=o("fdbf"),u=o("d039"),f=o("5135"),d=o("e8b5"),m=o("861d"),h=o("825a"),g=o("7b0b"),p=o("fc6a"),b=o("c04e"),v=o("5c6c"),C=o("7c73"),w=o("df75"),y=o("241c"),I=o("057f"),F=o("7418"),x=o("06cf"),S=o("9bf2"),N=o("d1e7"),_=o("9112"),M=o("6eeb"),k=o("5692"),R=o("f772"),E=o("d012"),A=o("90e3"),L=o("b622"),D=o("e538"),O=o("746f"),$=o("d44e"),T=o("69f3"),P=o("b727").forEach,U=R("hidden"),q="Symbol",j="prototype",z=L("toPrimitive"),B=T.set,V=T.getterFor(q),G=Object[j],H=r.Symbol,J=i("JSON","stringify"),W=x.f,Y=S.f,K=I.f,X=N.f,Q=k("symbols"),Z=k("op-symbols"),tt=k("string-to-symbol-registry"),et=k("symbol-to-string-registry"),ot=k("wks"),nt=r.QObject,rt=!nt||!nt[j]||!nt[j].findChild,it=a&&u((function(){return 7!=C(Y({},"a",{get:function(){return Y(this,"a",{value:7}).a}})).a}))?function(t,e,o){var n=W(G,e);n&&delete G[e],Y(t,e,o),n&&t!==G&&Y(G,e,n)}:Y,st=function(t,e){var o=Q[t]=C(H[j]);return B(o,{type:q,tag:t,description:e}),a||(o.description=e),o},at=c?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof H},lt=function(t,e,o){t===G&&lt(Z,e,o),h(t);var n=b(e,!0);return h(o),f(Q,n)?(o.enumerable?(f(t,U)&&t[U][n]&&(t[U][n]=!1),o=C(o,{enumerable:v(0,!1)})):(f(t,U)||Y(t,U,v(1,{})),t[U][n]=!0),it(t,n,o)):Y(t,n,o)},ct=function(t,e){h(t);var o=p(e),n=w(o).concat(ht(o));return P(n,(function(e){a&&!ft.call(o,e)||lt(t,e,o[e])})),t},ut=function(t,e){return void 0===e?C(t):ct(C(t),e)},ft=function(t){var e=b(t,!0),o=X.call(this,e);return!(this===G&&f(Q,e)&&!f(Z,e))&&(!(o||!f(this,e)||!f(Q,e)||f(this,U)&&this[U][e])||o)},dt=function(t,e){var o=p(t),n=b(e,!0);if(o!==G||!f(Q,n)||f(Z,n)){var r=W(o,n);return!r||!f(Q,n)||f(o,U)&&o[U][n]||(r.enumerable=!0),r}},mt=function(t){var e=K(p(t)),o=[];return P(e,(function(t){f(Q,t)||f(E,t)||o.push(t)})),o},ht=function(t){var e=t===G,o=K(e?Z:p(t)),n=[];return P(o,(function(t){!f(Q,t)||e&&!f(G,t)||n.push(Q[t])})),n};if(l||(H=function(){if(this instanceof H)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=A(t),o=function(t){this===G&&o.call(Z,t),f(this,U)&&f(this[U],e)&&(this[U][e]=!1),it(this,e,v(1,t))};return a&&rt&&it(G,e,{configurable:!0,set:o}),st(e,t)},M(H[j],"toString",(function(){return V(this).tag})),M(H,"withoutSetter",(function(t){return st(A(t),t)})),N.f=ft,S.f=lt,x.f=dt,y.f=I.f=mt,F.f=ht,D.f=function(t){return st(L(t),t)},a&&(Y(H[j],"description",{configurable:!0,get:function(){return V(this).description}}),s||M(G,"propertyIsEnumerable",ft,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!l,sham:!l},{Symbol:H}),P(w(ot),(function(t){O(t)})),n({target:q,stat:!0,forced:!l},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var o=H(e);return tt[e]=o,et[o]=e,o},keyFor:function(t){if(!at(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){rt=!0},useSimple:function(){rt=!1}}),n({target:"Object",stat:!0,forced:!l,sham:!a},{create:ut,defineProperty:lt,defineProperties:ct,getOwnPropertyDescriptor:dt}),n({target:"Object",stat:!0,forced:!l},{getOwnPropertyNames:mt,getOwnPropertySymbols:ht}),n({target:"Object",stat:!0,forced:u((function(){F.f(1)}))},{getOwnPropertySymbols:function(t){return F.f(g(t))}}),J){var gt=!l||u((function(){var t=H();return"[null]"!=J([t])||"{}"!=J({a:t})||"{}"!=J(Object(t))}));n({target:"JSON",stat:!0,forced:gt},{stringify:function(t,e,o){var n,r=[t],i=1;while(arguments.length>i)r.push(arguments[i++]);if(n=e,(m(e)||void 0!==t)&&!at(t))return d(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!at(e))return e}),r[1]=e,J.apply(null,r)}})}H[j][z]||_(H[j],z,H[j].valueOf),$(H,q),E[U]=!0},a630:function(t,e,o){var n=o("23e7"),r=o("4df4"),i=o("1c7e"),s=!i((function(t){Array.from(t)}));n({target:"Array",stat:!0,forced:s},{from:r})},a640:function(t,e,o){"use strict";var n=o("d039");t.exports=function(t,e){var o=[][t];return!!o&&n((function(){o.call(null,e||function(){throw 1},1)}))}},a9e3:function(t,e,o){"use strict";var n=o("83ab"),r=o("da84"),i=o("94ca"),s=o("6eeb"),a=o("5135"),l=o("c6b6"),c=o("7156"),u=o("c04e"),f=o("d039"),d=o("7c73"),m=o("241c").f,h=o("06cf").f,g=o("9bf2").f,p=o("58a8").trim,b="Number",v=r[b],C=v.prototype,w=l(d(C))==b,y=function(t){var e,o,n,r,i,s,a,l,c=u(t,!1);if("string"==typeof c&&c.length>2)if(c=p(c),e=c.charCodeAt(0),43===e||45===e){if(o=c.charCodeAt(2),88===o||120===o)return NaN}else if(48===e){switch(c.charCodeAt(1)){case 66:case 98:n=2,r=49;break;case 79:case 111:n=8,r=55;break;default:return+c}for(i=c.slice(2),s=i.length,a=0;a<s;a++)if(l=i.charCodeAt(a),l<48||l>r)return NaN;return parseInt(i,n)}return+c};if(i(b,!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var I,F=function(t){var e=arguments.length<1?0:t,o=this;return o instanceof F&&(w?f((function(){C.valueOf.call(o)})):l(o)!=b)?c(new v(y(e)),o,F):y(e)},x=n?m(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;x.length>S;S++)a(v,I=x[S])&&!a(F,I)&&g(F,I,h(v,I));F.prototype=C,C.constructor=F,s(r,b,F)}},ac1f:function(t,e,o){"use strict";var n=o("23e7"),r=o("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==r},{exec:r})},ad6d:function(t,e,o){"use strict";var n=o("825a");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},d28b:function(t,e,o){var n=o("746f");n("iterator")},d784:function(t,e,o){"use strict";o("ac1f");var n=o("6eeb"),r=o("d039"),i=o("b622"),s=o("9263"),a=o("9112"),l=i("species"),c=!r((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),f=i("replace"),d=function(){return!!/./[f]&&""===/./[f]("a","$0")}(),m=!r((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var o="ab".split(t);return 2!==o.length||"a"!==o[0]||"b"!==o[1]}));t.exports=function(t,e,o,f){var h=i(t),g=!r((function(){var e={};return e[h]=function(){return 7},7!=""[t](e)})),p=g&&!r((function(){var e=!1,o=/a/;return"split"===t&&(o={},o.constructor={},o.constructor[l]=function(){return o},o.flags="",o[h]=/./[h]),o.exec=function(){return e=!0,null},o[h](""),!e}));if(!g||!p||"replace"===t&&(!c||!u||d)||"split"===t&&!m){var b=/./[h],v=o(h,""[t],(function(t,e,o,n,r){return e.exec===s?g&&!r?{done:!0,value:b.call(e,o,n)}:{done:!0,value:t.call(o,e,n)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:d}),C=v[0],w=v[1];n(String.prototype,t,C),n(RegExp.prototype,h,2==e?function(t,e){return w.call(t,this,e)}:function(t){return w.call(t,this)})}f&&a(RegExp.prototype[h],"sham",!0)}},ddb0:function(t,e,o){var n=o("da84"),r=o("fdbc"),i=o("e260"),s=o("9112"),a=o("b622"),l=a("iterator"),c=a("toStringTag"),u=i.values;for(var f in r){var d=n[f],m=d&&d.prototype;if(m){if(m[l]!==u)try{s(m,l,u)}catch(g){m[l]=u}if(m[c]||s(m,c,f),r[f])for(var h in i)if(m[h]!==i[h])try{s(m,h,i[h])}catch(g){m[h]=i[h]}}}},e01a:function(t,e,o){"use strict";var n=o("23e7"),r=o("83ab"),i=o("da84"),s=o("5135"),a=o("861d"),l=o("9bf2").f,c=o("e893"),u=i.Symbol;if(r&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var f={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new u(t):void 0===t?u():u(t);return""===t&&(f[e]=!0),e};c(d,u);var m=d.prototype=u.prototype;m.constructor=d;var h=m.toString,g="Symbol(test)"==String(u("test")),p=/^Symbol\((.*)\)[^)]+$/;l(m,"description",{configurable:!0,get:function(){var t=a(this)?this.valueOf():this,e=h.call(t);if(s(f,t))return"";var o=g?e.slice(7,-1):e.replace(p,"$1");return""===o?void 0:o}}),n({global:!0,forced:!0},{Symbol:d})}},e538:function(t,e,o){var n=o("b622");e.f=n},fb6a:function(t,e,o){"use strict";var n=o("23e7"),r=o("861d"),i=o("e8b5"),s=o("23cb"),a=o("50c4"),l=o("fc6a"),c=o("8418"),u=o("b622"),f=o("1dde"),d=o("ae40"),m=f("slice"),h=d("slice",{ACCESSORS:!0,0:0,1:2}),g=u("species"),p=[].slice,b=Math.max;n({target:"Array",proto:!0,forced:!m||!h},{slice:function(t,e){var o,n,u,f=l(this),d=a(f.length),m=s(t,d),h=s(void 0===e?d:e,d);if(i(f)&&(o=f.constructor,"function"!=typeof o||o!==Array&&!i(o.prototype)?r(o)&&(o=o[g],null===o&&(o=void 0)):o=void 0,o===Array||void 0===o))return p.call(f,m,h);for(n=new(void 0===o?Array:o)(b(h-m,0)),u=0;m<h;m++,u++)m in f&&c(n,u,f[m]);return n.length=u,n}})},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-4f0b056a.9807fb11.js.map