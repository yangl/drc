(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ca2e1cf"],{"159b":function(t,r,e){var o=e("da84"),s=e("fdbc"),a=e("17c2"),i=e("9112");for(var u in s){var c=o[u],l=c&&c.prototype;if(l&&l.forEach!==a)try{i(l,"forEach",a)}catch(n){l.forEach=a}}},"17c2":function(t,r,e){"use strict";var o=e("b727").forEach,s=e("a640"),a=e("ae40"),i=s("forEach"),u=a("forEach");t.exports=i&&u?[].forEach:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}},4160:function(t,r,e){"use strict";var o=e("23e7"),s=e("17c2");o({target:"Array",proto:!0,forced:[].forEach!=s},{forEach:s})},"48f5":function(t,r,e){"use strict";e.r(r);var o=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("base-component",[e("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[e("BreadcrumbItem",{attrs:{to:"/home"}},[t._v("首页")]),e("BreadcrumbItem",{attrs:{to:"/proxyRouteManagement"}},[t._v("路由管理")])],1),e("Content",{staticClass:"content",style:{padding:"10px",background:"#fff",margin:"50px 0 1px 185px",zIndex:"1"}},[e("div",{staticStyle:{padding:"1px 1px"}},[e("Row",[e("i-col",{attrs:{span:"12"}},[e("Form",{ref:"route",staticStyle:{float:"left","margin-top":"50px"},attrs:{model:t.route,rules:t.ruleRoute,"label-width":250}},[e("FormItem",{staticStyle:{width:"500px"},attrs:{label:"BU",prop:"routeOrgName"}},[e("Input",{attrs:{disabled:t.updateStatus,placeholder:"请输入路由BU,不填默认为公用路由"},model:{value:t.route.routeOrgName,callback:function(r){t.$set(t.route,"routeOrgName",r)},expression:"route.routeOrgName"}})],1),e("FormItem",{attrs:{label:"源端机房",prop:"srcDcName"}},[e("Select",{staticStyle:{width:"250px"},attrs:{disabled:t.updateStatus,filterable:"","allow-create":"",placeholder:"请选择源端机房"},on:{"on-select":t.getProxyUrisInSrc,"on-create":t.handleCreateDc},model:{value:t.route.srcDcName,callback:function(r){t.$set(t.route,"srcDcName",r)},expression:"route.srcDcName"}},t._l(t.drcZoneList,(function(r){return e("Option",{key:r.value,attrs:{value:r.value}},[t._v(t._s(r.label))])})),1)],1),e("FormItem",{attrs:{label:"目标机房",prop:"dstDcName"}},[e("Select",{staticStyle:{width:"250px"},attrs:{disabled:t.updateStatus,filterable:"","allow-create":"",placeholder:"请选择目标机房"},on:{"on-select":t.getProxyUrisInDst,"on-create":t.handleCreateDc},model:{value:t.route.dstDcName,callback:function(r){t.$set(t.route,"dstDcName",r)},expression:"route.dstDcName"}},t._l(t.drcZoneList,(function(r){return e("Option",{key:r.value,attrs:{value:r.value}},[t._v(t._s(r.label))])})),1)],1),e("FormItem",{attrs:{label:"源端Proxy",prop:"srcProxyUris"}},[e("Select",{staticStyle:{width:"250px"},attrs:{filterable:"",multiple:"",placeholder:"请选择源端Proxy"},model:{value:t.route.proxyUris.src,callback:function(r){t.$set(t.route.proxyUris,"src",r)},expression:"route.proxyUris.src"}},t._l(t.route.proxyUriList.src,(function(r){return e("Option",{key:r,attrs:{value:r}},[t._v(t._s(r))])})),1)],1),e("FormItem",{attrs:{label:"中继Proxy",prop:"relayProxyUris"}},[e("Select",{staticStyle:{width:"250px"},attrs:{filterable:"",multiple:"",placeholder:"请选择中继Proxy"},model:{value:t.route.proxyUris.relay,callback:function(r){t.$set(t.route.proxyUris,"relay",r)},expression:"route.proxyUris.relay"}},t._l(t.route.proxyUriList.all,(function(r){return e("Option",{key:r,attrs:{value:r}},[t._v(t._s(r))])})),1)],1),e("FormItem",{attrs:{label:"目标Proxy",prop:"dstProxyUris"}},[e("Select",{staticStyle:{width:"250px"},attrs:{filterable:"",multiple:"",placeholder:"请选择目标Proxy"},model:{value:t.route.proxyUris.dst,callback:function(r){t.$set(t.route.proxyUris,"dst",r)},expression:"route.proxyUris.dst"}},t._l(t.route.proxyUriList.dst,(function(r){return e("Option",{key:r,attrs:{value:r}},[t._v(t._s(r))])})),1)],1),e("FormItem",{staticStyle:{width:"500px"},attrs:{label:"Tag",prop:"tag"}},[e("Input",{attrs:{disabled:t.updateStatus,placeholder:"请输入路由tag"},model:{value:t.route.tag,callback:function(r){t.$set(t.route,"tag",r)},expression:"route.tag"}})],1),e("FormItem",[e("Button",{on:{click:function(r){return t.handleReset()}}},[t._v("重置")]),e("br"),e("br"),e("Button",{attrs:{type:"primary"},on:{click:function(r){t.reviewInputResource()}}},[t._v("录入")])],1),e("Modal",{attrs:{title:"录入确认"},on:{"on-ok":function(r){return t.inputResource()}},model:{value:t.route.reviewModal,callback:function(r){t.$set(t.route,"reviewModal",r)},expression:"route.reviewModal"}},[t._v(" 对BU["+t._s(this.route.routeOrgName)+"]、tag["+t._s(this.route.tag)+"]、方向["+t._s(this.route.srcDcName)+"->"+t._s(this.route.dstDcName)+"]，确认新增/修改路由为源端Proxies："+t._s(this.route.proxyUris.src)+"，中继Proxies："+t._s(this.route.proxyUris.relay)+"，目标Proxies："+t._s(this.route.proxyUris.dst)+"吗？ ")]),e("Modal",{attrs:{title:"录入结果"},model:{value:t.route.resultModal,callback:function(r){t.$set(t.route,"resultModal",r)},expression:"route.resultModal"}},[t._v(" "+t._s(this.result)+" ")])],1)],1)],1)],1)])],1)},s=[],a=(e("4160"),e("159b"),{name:"proxyRouteManagement",data:function(){return{updateStatus:this.$route.query.updateStatus,route:{reviewModal:!1,resultModal:!1,routeOrgName:this.$route.query.routeOrgName,srcDcName:this.$route.query.srcDcName,dstDcName:this.$route.query.dstDcName,tag:this.$route.query.tag,proxyUris:{src:this.$route.query.srcProxyUris,relay:this.$route.query.relayProxyUris,dst:this.$route.query.dstProxyUris},proxyUriList:{src:[],all:[],dst:[]}},ruleRoute:{srcDcName:[{required:!0,message:"源端机房不能为空",trigger:"blur"}],dstDcName:[{required:!0,message:"目标机房不能为空",trigger:"blur"}],srcProxyUris:[{required:!0,message:"源端Proxy不能为空",trigger:"blur"}],dstProxyUris:[{required:!0,message:"目标Proxy不能为空",trigger:"blur"}],tag:[{required:!0,message:"tag不能为空",trigger:"blur"}]},drcZoneList:this.constant.dcList,result:""}},methods:{reviewInputResource:function(){this.route.reviewModal=!0},inputResource:function(){var t=this;this.axios.post("/api/drc/v1/meta/routes",{id:0,routeOrgName:this.route.routeOrgName,srcDcName:this.route.srcDcName,dstDcName:this.route.dstDcName,srcProxyUris:this.route.proxyUris.src,relayProxyUris:this.route.proxyUris.relay,dstProxyUris:this.route.proxyUris.dst,tag:this.route.tag}).then((function(r){console.log(r.data),t.result=r.data.data,t.route.reviewModal=!1,t.route.resultModal=!0}))},handleCreateDc:function(t){console.log("customize add dc: "+t),this.drcZoneList.push({value:t,label:t}),console.log(this.drcZoneList)},handleReset:function(){this.route.routeOrgName="",this.route.srcDcName="",this.route.dstDcName="",this.route.tag="",this.route.proxyUris.src=[],this.route.proxyUris.relay=[],this.route.proxyUris.dst=[]},getProxyUrisInSrc:function(t){var r=this,e="/api/drc/v1/meta/proxy/uris/dcs/"+t.value;console.log("uri: "+e),this.axios.get(e).then((function(t){console.log(t.data),r.route.proxyUriList.src=[],t.data.data.forEach((function(t){return r.route.proxyUriList.src.push(t)}))}))},getProxyUrisInDst:function(t){var r=this,e="/api/drc/v1/meta/proxy/uris/dcs/"+t.value;console.log("uri: "+e),this.axios.get(e).then((function(t){console.log(t.data),r.route.proxyUriList.dst=[],t.data.data.forEach((function(t){return r.route.proxyUriList.dst.push(t)}))}))},getProxyUrisInSrc2:function(){var t=this,r="/api/drc/v1/meta/proxy/uris/dcs/"+this.route.srcDcName;console.log("uri: "+r),this.axios.get(r).then((function(r){console.log(r.data),t.route.proxyUriList.src=[],r.data.data.forEach((function(r){return t.route.proxyUriList.src.push(r)}))}))},getProxyUrisInDst2:function(){var t=this,r="/api/drc/v1/meta/proxy/uris/dcs/"+this.route.dstDcName;console.log("uri: "+r),this.axios.get(r).then((function(r){console.log(r.data),t.route.proxyUriList.dst=[],r.data.data.forEach((function(r){return t.route.proxyUriList.dst.push(r)}))}))},getAllProxyUris:function(){var t=this,r="/api/drc/v1/meta/proxy/uris";console.log("uri: "+r),this.axios.get(r).then((function(r){console.log(r.data),t.route.proxyUriList.all=[],r.data.data.forEach((function(r){return t.route.proxyUriList.all.push(r)}))}))},getProxyUrisInUse:function(){var t=this,r="/api/drc/v1/meta/routes?routeOrgName="+this.route.routeOrgName+"&srcDcName="+this.route.srcDcName+"&dstDcName="+this.route.dstDcName+"&tag="+this.route.tag+"&deleted=0";console.log("uri: "+r),this.axios.get(r).then((function(r){console.log(r),t.route.proxyUris.src=[],t.route.proxyUris.relay=[],t.route.proxyUris.dst=[],0!==r.data.data.length&&(r.data.data[0].srcProxyUris.forEach((function(r){return t.route.proxyUris.src.push(r)})),r.data.data[0].relayProxyUris.forEach((function(r){return t.route.proxyUris.relay.push(r)})),r.data.data[0].dstProxyUris.forEach((function(r){return t.route.proxyUris.dst.push(r)})))}))}},created:function(){this.getProxyUrisInSrc2(),this.getAllProxyUris(),this.getProxyUrisInDst2(),this.getProxyUrisInUse()}}),i=a,u=e("2877"),c=Object(u["a"])(i,o,s,!1,null,"d438d41e",null);r["default"]=c.exports},a640:function(t,r,e){"use strict";var o=e("d039");t.exports=function(t,r){var e=[][t];return!!e&&o((function(){e.call(null,r||function(){throw 1},1)}))}},fdbc:function(t,r){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-0ca2e1cf.79105efa.js.map