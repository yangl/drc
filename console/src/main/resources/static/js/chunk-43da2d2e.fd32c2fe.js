(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-43da2d2e"],{"4ec9":function(e,t,n){"use strict";var o=n("6d61"),i=n("6566");e.exports=o("Map",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),i)},6566:function(e,t,n){"use strict";var o=n("9bf2").f,i=n("7c73"),r=n("e2cc"),s=n("0366"),a=n("19aa"),c=n("2266"),l=n("7dd0"),u=n("2626"),h=n("83ab"),d=n("f183").fastKey,f=n("69f3"),p=f.set,m=f.getterFor;e.exports={getConstructor:function(e,t,n,l){var u=e((function(e,o){a(e,u,t),p(e,{type:t,index:i(null),first:void 0,last:void 0,size:0}),h||(e.size=0),void 0!=o&&c(o,e[l],e,n)})),f=m(t),v=function(e,t,n){var o,i,r=f(e),s=g(e,t);return s?s.value=n:(r.last=s={index:i=d(t,!0),key:t,value:n,previous:o=r.last,next:void 0,removed:!1},r.first||(r.first=s),o&&(o.next=s),h?r.size++:e.size++,"F"!==i&&(r.index[i]=s)),e},g=function(e,t){var n,o=f(e),i=d(t);if("F"!==i)return o.index[i];for(n=o.first;n;n=n.next)if(n.key==t)return n};return r(u.prototype,{clear:function(){var e=this,t=f(e),n=t.index,o=t.first;while(o)o.removed=!0,o.previous&&(o.previous=o.previous.next=void 0),delete n[o.index],o=o.next;t.first=t.last=void 0,h?t.size=0:e.size=0},delete:function(e){var t=this,n=f(t),o=g(t,e);if(o){var i=o.next,r=o.previous;delete n.index[o.index],o.removed=!0,r&&(r.next=i),i&&(i.previous=r),n.first==o&&(n.first=i),n.last==o&&(n.last=r),h?n.size--:t.size--}return!!o},forEach:function(e){var t,n=f(this),o=s(e,arguments.length>1?arguments[1]:void 0,3);while(t=t?t.next:n.first){o(t.value,t.key,this);while(t&&t.removed)t=t.previous}},has:function(e){return!!g(this,e)}}),r(u.prototype,n?{get:function(e){var t=g(this,e);return t&&t.value},set:function(e,t){return v(this,0===e?0:e,t)}}:{add:function(e){return v(this,e=0===e?0:e,e)}}),h&&o(u.prototype,"size",{get:function(){return f(this).size}}),u},setStrong:function(e,t,n){var o=t+" Iterator",i=m(t),r=m(o);l(e,t,(function(e,t){p(this,{type:o,target:e,state:i(e),kind:t,last:void 0})}),(function(){var e=r(this),t=e.kind,n=e.last;while(n&&n.removed)n=n.previous;return e.target&&(e.last=n=n?n.next:e.state.first)?"keys"==t?{value:n.key,done:!1}:"values"==t?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(e.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),u(t)}}},"6d61":function(e,t,n){"use strict";var o=n("23e7"),i=n("da84"),r=n("94ca"),s=n("6eeb"),a=n("f183"),c=n("2266"),l=n("19aa"),u=n("861d"),h=n("d039"),d=n("1c7e"),f=n("d44e"),p=n("7156");e.exports=function(e,t,n){var m=-1!==e.indexOf("Map"),v=-1!==e.indexOf("Weak"),g=m?"set":"add",b=i[e],x=b&&b.prototype,w=b,C={},y=function(e){var t=x[e];s(x,e,"add"==e?function(e){return t.call(this,0===e?0:e),this}:"delete"==e?function(e){return!(v&&!u(e))&&t.call(this,0===e?0:e)}:"get"==e?function(e){return v&&!u(e)?void 0:t.call(this,0===e?0:e)}:"has"==e?function(e){return!(v&&!u(e))&&t.call(this,0===e?0:e)}:function(e,n){return t.call(this,0===e?0:e,n),this})};if(r(e,"function"!=typeof b||!(v||x.forEach&&!h((function(){(new b).entries().next()})))))w=n.getConstructor(t,e,m,g),a.REQUIRED=!0;else if(r(e,!0)){var M=new w,k=M[g](v?{}:-0,1)!=M,I=h((function(){M.has(1)})),S=d((function(e){new b(e)})),B=!v&&h((function(){var e=new b,t=5;while(t--)e[g](t,t);return!e.has(-0)}));S||(w=t((function(t,n){l(t,w,e);var o=p(new b,t,w);return void 0!=n&&c(n,o[g],o,m),o})),w.prototype=x,x.constructor=w),(I||B)&&(y("delete"),y("has"),m&&y("get")),(B||k)&&y(g),v&&x.clear&&delete x.clear}return C[e]=w,o({global:!0,forced:w!=b},C),f(w,e),v||n.setStrong(w,e,m),w}},7156:function(e,t,n){var o=n("861d"),i=n("d2bb");e.exports=function(e,t,n){var r,s;return i&&"function"==typeof(r=t.constructor)&&r!==n&&o(s=r.prototype)&&s!==n.prototype&&i(e,s),e}},acdc:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("base-component",[n("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[n("BreadcrumbItem",{attrs:{to:"/home"}},[e._v("首页")]),n("BreadcrumbItem",{attrs:{to:"/drcclusters"}},[e._v("DRC集群")])],1),n("Content",{staticClass:"content",style:{padding:"10px",background:"#fff",margin:"50px 0 1px 185px",zIndex:"1"}},[n("div",{staticStyle:{padding:"1px 1px"}},[n("Card",[e._v(" 机房: "),n("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"默认全部",multiple:""},on:{"on-change":e.getMhaGroups},model:{value:e.searchCondition.dcIds,callback:function(t){e.$set(e.searchCondition,"dcIds",t)},expression:"searchCondition.dcIds"}},e._l(e.dcs,(function(t){return n("Option",{key:t.dcName,attrs:{value:t.id}},[e._v(e._s(t.dcName))])})),1),e._v(" 部门："),n("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"默认全部"},on:{"on-change":e.getMhaGroups},model:{value:e.searchCondition.buId,callback:function(t){e.$set(e.searchCondition,"buId",t)},expression:"searchCondition.buId"}},e._l(e.bus,(function(t){return n("Option",{key:t.buName,attrs:{value:t.id}},[e._v(e._s(t.buName))])})),1),e._v(" 类型："),n("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"默认全部"},on:{"on-change":e.getMhaGroups},model:{value:e.searchCondition.type,callback:function(t){e.$set(e.searchCondition,"type",t)},expression:"searchCondition.type"}},e._l(e.searchOption.types,(function(t){return n("Option",{key:t.label,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1),n("br"),n("br"),e._v(" Mhas:"),n("Input",{style:{width:"200px",marginRight:"10px"},attrs:{placeholder:"默认全部，逗号分隔"},model:{value:e.searchCondition.mhas,callback:function(t){e.$set(e.searchCondition,"mhas",t)},expression:"searchCondition.mhas"}}),e._v(" cluster:"),n("Input",{style:{width:"200px",marginRight:"10px"},attrs:{placeholder:"默认全部"},model:{value:e.searchCondition.clusterName,callback:function(t){e.$set(e.searchCondition,"clusterName",t)},expression:"searchCondition.clusterName"}}),n("Button",{style:{marginLeft:"50px"},attrs:{type:"primary"},on:{click:e.getMhaGroups}},[e._v("查询")]),n("Button",{style:{marginLeft:"20px"},attrs:{type:"primary"},on:{click:e.reset}},[e._v("重置")]),n("br"),n("br"),n("Table",{attrs:{stripe:"",columns:e.columns,data:e.dataWithPage,border:"","span-method":e.handleSpan},scopedSlots:e._u([{key:"action",fn:function(t){var o=t.row,i=t.index;return[n("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"success",size:"small"},on:{click:function(t){return e.checkConfig(o,i)}}},[e._v("查看")]),n("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary",size:"small"},on:{click:function(t){return e.goToLink(o,i)}}},[e._v("修改")]),n("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"error",size:"small"},on:{click:function(t){return e.previewRemoveConfig(o,i)}}},[e._v("删除")])]}}])}),n("div",{staticStyle:{"text-align":"center",margin:"16px 0"}},[n("Page",{attrs:{transfer:!0,total:e.total,current:e.current,"page-size":e.size,"page-size-opts":[10,20,40,80,100],"show-sizer":"","show-elevator":""},on:{"update:current":function(t){e.current=t},"on-page-size-change":e.handleChangeSize}})],1)],1)],1),n("Modal",{attrs:{title:"DRC配置",width:"1200px"},model:{value:e.cluster.modal.config,callback:function(t){e.$set(e.cluster.modal,"config",t)},expression:"cluster.modal.config"}},[n("Form",{staticStyle:{width:"100%"}},[n("FormItem",{attrs:{label:"集群配置"}},[n("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.cluster.config,callback:function(t){e.$set(e.cluster,"config",t)},expression:"cluster.config"}})],1)],1)],1),n("Modal",{attrs:{title:"删除DRC配置",width:"1200px"},on:{"on-ok":e.removeConfig,"on-cancel":e.clearRemoveConfig},model:{value:e.cluster.modal.remove,callback:function(t){e.$set(e.cluster.modal,"remove",t)},expression:"cluster.modal.remove"}},[n("Form",{staticStyle:{width:"100%"}},[n("FormItem",{attrs:{label:"确认删除以下双向复制吗？"}},[n("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.cluster.config,callback:function(t){e.$set(e.cluster,"config",t)},expression:"cluster.config"}})],1)],1)],1)],1)],1)},i=[],r=(n("4160"),n("caad"),n("c975"),n("fb6a"),n("a434"),n("4ec9"),n("d3b7"),n("3ca3"),n("159b"),n("ddb0"),n("2909")),s={data:function(){var e=this;return{switchOneInfo:{},cluster:{config:"",mhaAToBeRemoved:"",mhaBToBeRemoved:"",modal:{config:!1,remove:!1}},columns:[{title:"序号",width:75,align:"center",render:function(t,n){return t("span",n.index+1+(e.current-1)*e.size)}},{title:"集群A",key:"srcMha"},{title:"集群B",key:"destMha"},{title:"类型",key:"type",width:100,render:function(e,t){var n=t.row,o="blue",i="duplex"===n.type?"双向":"simplex"===n.type?"单向":"null";return e("Tag",{props:{color:o}},i)}},{title:"部门",key:"buId",width:100,render:function(t,n){var o=n.row,i="blue",r=e.buIdMaps.get(o.buId);return t("Tag",{props:{color:i}},r)}},{title:"状态",key:"drcEstablishStatus",width:100,align:"center",render:function(e,t){var n=t.row,o=60===n.drcEstablishStatus?"blue":"volcano",i=60===n.drcEstablishStatus?"已接入":"未接入";return e("Tag",{props:{color:o}},i)}},{title:"集群A监控",key:"srcMhaMonitorSwitch",width:100,align:"center",render:function(t,n){var o=n.row;return t("i-switch",{props:{size:"large",value:1===o.srcMhaMonitorSwitch,beforeChange:e.handleBeforeChange},scopedSlots:{open:function(){return t("span","开启")},close:function(){return t("span","关闭")}},on:{"on-change":function(){e.switchMonitor(o.srcMha,o.srcMhaMonitorSwitch)}},nativeOn:{mousedown:function(){e.switchOneInfo={srcMhaMonitorSwitch:o.srcMhaMonitorSwitch}}}})}},{title:"集群B监控",key:"destMhaMonitorSwitch",width:100,align:"center",render:function(t,n){var o=n.row;return t("i-switch",{props:{size:"large",value:1===o.destMhaMonitorSwitch,beforeChange:e.handleBeforeChange},scopedSlots:{open:function(){return t("span","开启")},close:function(){return t("span","关闭")}},on:{"on-change":function(){e.switchMonitor(o.destMha,o.destMhaMonitorSwitch)}},nativeOn:{mousedown:function(){e.switchOneInfo={destMhaMonitorSwitch:o.destMhaMonitorSwitch}}}})}},{title:"操作",slot:"action",align:"center"}],mhaGroups:[],total:0,current:1,size:100,mergeColData:[],bus:[],buIdMaps:new Map,dcs:[],searchCondition:{mhas:null,dcIds:[],clusterName:null,buId:null,type:null},searchOption:{types:[{label:"单向",value:"simplex"},{label:"双向",value:"duplex"},{label:"未配置",value:"noConfig"}]}}},computed:{dataWithPage:function(){console.log("dataWithPage");var e=this.mhaGroups,t=this.mergeColData,n=this.current*this.size-this.size,o=n+this.size;o>=this.total&&(o=this.total);for(var i=n;i<o;i++)t[i]+i>o?e[i].mergeCol=o-i:e[i].mergeCol=t[i];if(n>=this.size)for(var s=n-this.size;s<n;s++)if(t[s]+s>n){e[n].mergeCol=t[s]+s-n;break}return Object(r["a"])(e).slice(n,o)}},methods:{handleSpan:function(e){var t=e.row,n=(e.column,e.rowIndex,e.columnIndex);if(1===n){var o=0===t.mergeCol?0:t.mergeCol,i=0===t.mergeCol?0:1;return[o,i]}},assembleData:function(e){var t=this;this.mergeColData=[],console.log("assembleData");var n=[];e.forEach((function(e){n.includes(e.srcMha)||n.push(e.srcMha)}));var o=[];n.forEach((function(e){o.push({srcMha:e,num:0})})),e.forEach((function(e){o.forEach((function(t){e.srcMha===t.srcMha&&t.num++}))})),e.forEach((function(e){o.forEach((function(o){e.srcMha===o.srcMha&&(n.includes(e.srcMha)?(e.mergeCol=o.num,t.mergeColData.push(e.mergeCol),n.splice(n.indexOf(o.srcMha),1)):(e.mergeCol=0,t.mergeColData.push(e.mergeCol)))}))}));var i=e;this.mhaGroups=i},getMhaGroups:function(){var e=this,t=this,n="/api/drc/v1/meta/orderedGroups/all?deleted=0";null!==this.searchCondition.mhas&&void 0!==this.searchCondition.mhas&&(n=n+"&mhas="+this.searchCondition.mhas),null!==this.searchCondition.dcIds&&void 0!==this.searchCondition.dcIds&&0!==this.searchCondition.dcIds.length&&(n=n+"&dcIds="+this.searchCondition.dcIds),null!==this.searchCondition.clusterName&&void 0!==this.searchCondition.clusterName&&(n=n+"&clusterName="+this.searchCondition.clusterName),null!==this.searchCondition.buId&&void 0!==this.searchCondition.buId&&(n=n+"&buId="+this.searchCondition.buId),null!==this.searchCondition.type&&void 0!==this.searchCondition.type&&(n=n+"&type="+this.searchCondition.type),this.axios.get(n).then((function(n){e.mhaGroups=n.data.data,t.total=e.mhaGroups.length,t.assembleData(e.mhaGroups)}))},reset:function(){this.searchCondition.mhas=null,this.searchCondition.dcIds=[],this.searchCondition.clusterName=null,this.searchCondition.buId=null,this.searchCondition.type=null},getBus:function(){var e=this;this.axios.get("/api/drc/v1/meta/bus/all").then((function(t){e.bus=t.data.data,e.buIdMaps=new Map,e.bus.forEach((function(t,n){e.buIdMaps.set(t.id,t.buName)}))}))},getDcs:function(){var e=this;this.axios.get("/api/drc/v1/meta/dcs/all").then((function(t){e.dcs=t.data.data,console.log(e.dcs)}))},handleChangeSize:function(e){this.size=e},goToLink:function(e,t){console.log("go to change config for "+e.srcMha+" and "+e.destMha),this.$router.push({path:"/accessV2",query:{step:"3",clustername:e.srcMha,newclustername:e.destMha}})},checkConfig:function(e,t){var n=this;console.log(e.srcMha),console.log(e.destMha),this.$Spin.show({render:function(e){return e("div",[e("Icon",{class:"demo-spin-icon-load",props:{size:18}}),e("div","请稍等...")])}}),this.axios.get("/api/drc/v1/meta/config/mhas/"+e.srcMha+","+e.destMha).then((function(e){var t=e.data.data;console.log(t),n.cluster.config=t,n.$Spin.hide(),n.cluster.modal.config=!0}))},previewRemoveConfig:function(e,t){var n=this;console.log(e.srcMha),console.log(e.destMha),this.cluster.mhaAToBeRemoved=e.srcMha,this.cluster.mhaBToBeRemoved=e.destMha,this.$Spin.show({render:function(e){return e("div",[e("Icon",{class:"demo-spin-icon-load",props:{size:18}}),e("div","请稍等...")])}}),this.axios.get("/api/drc/v1/meta/config/mhas/"+e.srcMha+","+e.destMha).then((function(e){var t=e.data.data;console.log(t),n.cluster.config=t,n.$Spin.hide(),n.cluster.modal.remove=!0}))},removeConfig:function(){var e=this;console.log("mhaAToBeRemoved",this.cluster.mhaAToBeRemoved),console.log("mhaBToBeRemoved",this.cluster.mhaBToBeRemoved),this.$Spin.show({render:function(e){return e("div",[e("Icon",{class:"demo-spin-icon-load",props:{size:18}}),e("div","请稍等...")])}}),this.axios.delete("/api/drc/v1/meta/config/remove/mhas/"+this.cluster.mhaAToBeRemoved+","+this.cluster.mhaBToBeRemoved).then((function(t){var n=t.data.data;console.log(n),n&&location.reload(),e.$Spin.hide()})),this.clearRemoveConfig()},clearRemoveConfig:function(){console.log("clear mhaAToBeRemoved",this.cluster.mhaAToBeRemoved),console.log("clear mhaBToBeRemoved",this.cluster.mhaBToBeRemoved),this.cluster.mhaAToBeRemoved="",this.cluster.mhaBToBeRemoved=""},moreOperation:function(e){this.$router.push({name:"incrementDataConsistencyCheck",query:{clusterA:e.srcMha,clusterB:e.destMha}})},handleBeforeChange:function(){var e=this;return console.log("handleBeforeChange:",this.switchOneInfo),new Promise((function(t){e.$Modal.confirm({title:"切换确认",content:"您确认要切换开关状态吗？",onOk:function(){t()}})}))},switchMonitor:function(e,t){var n=0===t?"on":"off";this.doSwitchMonitor(e,n)},doSwitchMonitor:function(e,t){var n=this;console.log(e),this.axios.post("/api/drc/v1/monitor/switch/"+e+"/"+t).then((function(e){0===e.data.status?(console.log(t),"on"===t?n.$Message.info("监控开启成功"):n.$Message.info("监控关闭成功")):n.$Message.info("监控操作失败"),n.getMhaGroups()}))}},created:function(){this.getMhaGroups(),this.getBus(),this.getDcs()}},a=s,c=n("2877"),l=Object(c["a"])(a,o,i,!1,null,null,null);t["default"]=l.exports},bb2f:function(e,t,n){var o=n("d039");e.exports=!o((function(){return Object.isExtensible(Object.preventExtensions({}))}))},f183:function(e,t,n){var o=n("d012"),i=n("861d"),r=n("5135"),s=n("9bf2").f,a=n("90e3"),c=n("bb2f"),l=a("meta"),u=0,h=Object.isExtensible||function(){return!0},d=function(e){s(e,l,{value:{objectID:"O"+ ++u,weakData:{}}})},f=function(e,t){if(!i(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!r(e,l)){if(!h(e))return"F";if(!t)return"E";d(e)}return e[l].objectID},p=function(e,t){if(!r(e,l)){if(!h(e))return!0;if(!t)return!1;d(e)}return e[l].weakData},m=function(e){return c&&v.REQUIRED&&h(e)&&!r(e,l)&&d(e),e},v=e.exports={REQUIRED:!1,fastKey:f,getWeakData:p,onFreeze:m};o[l]=!0}}]);
//# sourceMappingURL=chunk-43da2d2e.fd32c2fe.js.map