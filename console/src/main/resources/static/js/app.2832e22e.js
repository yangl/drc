(function(e){function t(t){for(var a,s,c=t[0],u=t[1],i=t[2],l=0,d=[];l<c.length;l++)s=c[l],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&d.push(o[s][0]),o[s]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);f&&f(t);while(d.length)d.shift()();return r.push.apply(r,i||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(a=!1)}a&&(r.splice(t--,1),e=u(u.s=n[0]))}return e}var a={},s={app:0},o={app:0},r=[];function c(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-03a611a7":"a1641cdd","chunk-04c19552":"0dbf3815","chunk-2d0ba349":"185c4354","chunk-2d213917":"13046c49","chunk-08975e91":"58dc24b2","chunk-26815b40":"f2bcce68","chunk-362d7764":"fd159eb0","chunk-e5c2c0ee":"e58cf3e4","chunk-e6bbd90c":"1a04d47f","chunk-0ca2e1cf":"0a440e7e","chunk-1bc4b1c6":"748fea89","chunk-2249f9e6":"11953a95","chunk-2d0aeeec":"1f69f7e9","chunk-2d0e2cd7":"d8a857a0","chunk-2d224feb":"5a164088","chunk-2e4ca447":"faa8c446","chunk-31faf75c":"bb4aac5c","chunk-48cc6893":"891e7cbb","chunk-524b19d8":"52b3e4a4","chunk-5c39384b":"e3ec0423","chunk-6217ecc0":"ae8540bf","chunk-6cc33546":"198b7759","chunk-7014bbe6":"73937149","chunk-74447852":"f4ecbf48","chunk-7f8cb47a":"dd35b7ee","chunk-a879f464":"4e8e7366"}[e]+".js"}function u(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-08975e91":1,"chunk-26815b40":1,"chunk-362d7764":1,"chunk-e5c2c0ee":1,"chunk-e6bbd90c":1,"chunk-1bc4b1c6":1,"chunk-7014bbe6":1};s[e]?t.push(s[e]):0!==s[e]&&n[e]&&t.push(s[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-03a611a7":"31d6cfe0","chunk-04c19552":"31d6cfe0","chunk-2d0ba349":"31d6cfe0","chunk-2d213917":"31d6cfe0","chunk-08975e91":"607bef4f","chunk-26815b40":"621c031f","chunk-362d7764":"4f8d874d","chunk-e5c2c0ee":"0f1047af","chunk-e6bbd90c":"0f1047af","chunk-0ca2e1cf":"31d6cfe0","chunk-1bc4b1c6":"ed6be5ec","chunk-2249f9e6":"31d6cfe0","chunk-2d0aeeec":"31d6cfe0","chunk-2d0e2cd7":"31d6cfe0","chunk-2d224feb":"31d6cfe0","chunk-2e4ca447":"31d6cfe0","chunk-31faf75c":"31d6cfe0","chunk-48cc6893":"31d6cfe0","chunk-524b19d8":"31d6cfe0","chunk-5c39384b":"31d6cfe0","chunk-6217ecc0":"31d6cfe0","chunk-6cc33546":"31d6cfe0","chunk-7014bbe6":"f1c85b73","chunk-74447852":"31d6cfe0","chunk-7f8cb47a":"31d6cfe0","chunk-a879f464":"31d6cfe0"}[e]+".css",o=u.p+a,r=document.getElementsByTagName("link"),c=0;c<r.length;c++){var i=r[c],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===a||l===o))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){i=d[c],l=i.getAttribute("data-href");if(l===a||l===o)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||o,r=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=a,delete s[e],f.parentNode.removeChild(f),n(r)},f.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){s[e]=0})));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var r=new Promise((function(t,n){a=o[e]=[t,n]}));t.push(a[2]=r);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(e);var d=new Error;i=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+s+")",d.name="ChunkLoadError",d.type=a,d.request=s,n[1](d)}o[e]=void 0}};var f=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=a,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)u.d(n,a,function(t){return e[t]}.bind(null,a));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var d=0;d<i.length;d++)t(i[d]);var f=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"1fbf":function(e,t,n){"use strict";n("781a")},"2d96":function(e,t,n){},4678:function(e,t,n){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function s(e){var t=o(e);return n(t)}function o(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}s.keys=function(){return Object.keys(a)},s.resolve=o,e.exports=s,s.id="4678"},5190:function(e,t,n){e.exports=n.p+"img/ctrip.85f81a21.png"},"56d7":function(e,t,n){"use strict";n.r(t);n("4de4"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),s=(n("d3b7"),n("bc3a")),o=n.n(s),r={},c=o.a.create(r);c.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),c.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)})),Plugin.install=function(e,t){e.axios=c,window.axios=c,Object.defineProperties(e.prototype,{axios:{get:function(){return c}},$axios:{get:function(){return c}}})},a["default"].use(Plugin);Plugin;var u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},i=[],l={},d=l,f=(n("034f"),n("2877")),p=Object(f["a"])(d,u,i,!1,null,null,null),m=p.exports,h=n("8c4f");a["default"].use(h["a"]);var b=[{path:"/home",component:function(){return n.e("chunk-a879f464").then(n.bind(null,"6511"))}},{path:"/monitor",component:function(){return Promise.all([n.e("chunk-08975e91"),n.e("chunk-26815b40")]).then(n.bind(null,"0d19"))}},{path:"/apply",component:function(){return n.e("chunk-2e4ca447").then(n.bind(null,"e3ac"))}},{path:"/clusters",component:function(){return n.e("chunk-03a611a7").then(n.bind(null,"dc40"))}},{path:"/drcclusters",component:function(){return Promise.all([n.e("chunk-04c19552"),n.e("chunk-2d213917")]).then(n.bind(null,"acdc"))}},{path:"/deletedDrcClusters",component:function(){return Promise.all([n.e("chunk-04c19552"),n.e("chunk-2d0ba349")]).then(n.bind(null,"35e6"))}},{path:"/access",component:function(){return n.e("chunk-1bc4b1c6").then(n.bind(null,"93f4"))}},{path:"/proxyRouteCluster",component:function(){return n.e("chunk-74447852").then(n.bind(null,"f4c1"))}},{path:"/proxyRouteManagement",component:function(){return n.e("chunk-0ca2e1cf").then(n.bind(null,"48f5"))}},{path:"/manage",component:function(){return n.e("chunk-2d0aeeec").then(n.bind(null,"0bbf"))}},{path:"/drcResource",name:"drcResource",component:function(){return n.e("chunk-2d224feb").then(n.bind(null,"e307"))}},{path:"/proxyResource",name:"proxyResource",component:function(){return n.e("chunk-2d0e2cd7").then(n.bind(null,"7ff8"))}},{path:"/conflict",name:"conflict",component:function(){return Promise.all([n.e("chunk-08975e91"),n.e("chunk-362d7764")]).then(n.bind(null,"c3fb"))}},{path:"/incrementDataConsistencyCheck",name:"incrementDataConsistencyCheck",component:function(){return n.e("chunk-31faf75c").then(n.bind(null,"4038"))}},{path:"/fullDataConsistencyCheckTest",name:"fullDataConsistencyCheckTest",component:function(){return n.e("chunk-48cc6893").then(n.bind(null,"cf9c"))}},{path:"/fullDataConsistencyResultTest",name:"fullDataConsistencyResultTest",component:function(){return n.e("chunk-6217ecc0").then(n.bind(null,"4235"))}},{path:"/fullDataConsistencyCheck",name:"fullDataConsistencyCheck",component:function(){return n.e("chunk-7f8cb47a").then(n.bind(null,"1043"))}},{path:"/fullDataConsistencyCluster",name:"fullDataConsistencyCluster",component:function(){return n.e("chunk-6cc33546").then(n.bind(null,"3f14"))}},{path:"/fullDataConsistencyResult",name:"fullDataConsistencyResult",component:function(){return Promise.all([n.e("chunk-08975e91"),n.e("chunk-e6bbd90c")]).then(n.bind(null,"0dae"))}},{path:"/incrementDataConsistencyCluster",name:"incrementDataConsistencyCluster",component:function(){return n.e("chunk-2249f9e6").then(n.bind(null,"6925"))}},{path:"/incrementDataConsistencyResult",name:"incrementDataConsistencyResult",component:function(){return n.e("chunk-7014bbe6").then(n.bind(null,"79c8"))}},{path:"/incrementDataConsistencyHandle",name:"incrementDataConsistencyHandle",component:function(){return Promise.all([n.e("chunk-08975e91"),n.e("chunk-e5c2c0ee")]).then(n.bind(null,"af8f"))}},{path:"/unitRouteVerificationCluster",name:"unitRouteVerificationCluster",component:function(){return n.e("chunk-5c39384b").then(n.bind(null,"8045"))}},{path:"/unitRouteVerificationResult",name:"unitRouteVerificationResult",component:function(){return n.e("chunk-524b19d8").then(n.bind(null,"ff40"))}},{path:"/",redirect:"/home"}],g=new h["a"]({routes:b}),v=g,k=n("2f62");a["default"].use(k["a"]);var j=new k["a"].Store({state:{},mutations:{},actions:{},modules:{}}),y=n("f825"),C=n.n(y);n("f8ce");a["default"].use(C.a);var I=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Layout",[a("Header",{staticClass:"header"},[a("Row",[a("i-col",{attrs:{span:"4",offset:"1"}},[a("img",{staticClass:"logo",attrs:{src:n("5190"),alt:"logo"}})]),a("i-col",{attrs:{span:"14"}},[a("Menu",{attrs:{mode:"horizontal","active-name":e.activeName}},[a("MenuItem",{attrs:{name:"/home",to:"/home"}},[e._v("DRC")]),a("MenuItem",{attrs:{name:"/apply",to:"/apply"}},[e._v("用户接入")]),a("MenuItem",{attrs:{name:"/monitor",to:"/monitor"}},[e._v("监控告警")]),a("MenuItem",{attrs:{name:"/manage",to:"/manage"}},[e._v("审批管理")])],1)],1),a("i-col",{attrs:{span:"4"}},[a("Row",[a("i-col",{attrs:{span:"12"}},[a("Dropdown",[a("a",{attrs:{href:"javascript:void(0)"}},[e._v(" 帮助 "),a("Icon",{attrs:{type:"ios-arrow-down"}})],1),a("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[a("DropdownItem",[e._v("帮助1")]),a("DropdownItem",[e._v("帮助2")])],1)],1)],1),a("i-col",{attrs:{span:"12"}},[a("Dropdown",[a("a",{attrs:{href:"javascript:void(0)"}},[e._v(" "+e._s(e.userName)+" "),a("Icon",{attrs:{type:"ios-arrow-down"}})],1),a("DropdownMenu",{attrs:{slot:"list"},slot:"list"},[a("DropdownItem",[e._v("注销")])],1)],1)],1)],1)],1)],1)],1),a("Layout",[a("Sider",{staticClass:"sider",class:{"sider-hide":e.isCollapsed},attrs:{width:"240",collapsible:""},model:{value:e.isCollapsed,callback:function(t){e.isCollapsed=t},expression:"isCollapsed"}},[a("Menu",{staticClass:"sider-menu",attrs:{theme:"dark","active-name":"option2"}},[a("MenuItem",{attrs:{name:"option1"}},[a("Icon",{attrs:{type:"ios-search"}}),a("span",[e._v("Option 1")])],1),a("MenuItem",{attrs:{name:"option2"}},[a("Icon",{attrs:{type:"ios-apps"}}),a("span",[e._v("Option 2")])],1),a("MenuItem",{attrs:{name:"option3"}},[a("Icon",{attrs:{type:"ios-bookmark"}}),a("span",[e._v("Option 3")])],1)],1)],1),a("Content",{staticClass:"content",class:{"content-expand":e.isCollapsed}},[a("Card",{staticStyle:{"margin-top":"16px"}},[e._t("default")],2)],1)],1)],1)},_=[],D={data:function(){return{activeName:this.$route.path,isCollapsed:!1,userName:""}},created:function(){this.activeName=this.$route.path}},x=D,M=(n("1fbf"),Object(f["a"])(x,I,_,!1,null,null,null)),N=M.exports,w=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"layout"},[a("Layout",[a("Header",{staticClass:"header"},[a("Row",[a("i-col",{attrs:{span:"4"}},[a("img",{staticClass:"layout-logo",attrs:{src:n("5190"),alt:"logo",to:"/home"},on:{click:e.linkHome}})]),a("i-col",{attrs:{span:"16"}},[a("Menu",{attrs:{mode:"horizontal",theme:"dark","active-name":e.activeName}},[a("MenuItem",{attrs:{name:"/home",to:"/home"}},[a("Icon",{attrs:{type:"ios-navigate"}}),e._v(" 监控大盘 ")],1),a("MenuItem",{attrs:{name:"/apply",to:"/apply"}},[a("Icon",{attrs:{type:"ios-keypad"}}),e._v(" 集群列表 ")],1),a("Submenu",{attrs:{name:"1"}},[a("template",{slot:"title"},[a("Icon",{attrs:{type:"ios-analytics"}}),e._v(" 自助运维 ")],1),a("MenuItem",{attrs:{name:"/monitor",to:"/monitor"}},[e._v("日志展示")])],2),a("MenuItem",{attrs:{name:"/manage",to:"/manage"}},[a("Icon",{attrs:{type:"ios-paper"}}),e._v(" 审批管理 ")],1)],1)],1),a("i-col",{attrs:{span:"4"}},[a("Menu",{attrs:{mode:"horizontal",theme:"dark","active-name":e.activeName}},[a("Submenu",{attrs:{name:"2"}},[a("template",{slot:"title"},[e._v(" 帮助 ")]),a("MenuItem",[e._v("帮助1")]),a("MenuItem",[e._v("帮助2")])],2),a("Submenu",{attrs:{name:"3"}},[a("template",{slot:"title"},[e._v(" "+e._s(e.userName)+" ")]),a("MenuItem",[a("a",{staticClass:"a",attrs:{href:e.logoutUrl}},[e._v("注销")])])],2)],1)],1)],1)],1),a("Layout",[a("div",{staticClass:"side-title"},[a("h2",{style:{margin:"15px 0 0 15px"}},[e._v("我的应用")])]),a("Sider",{staticClass:"sider",class:{"sider-hide":e.isCollapsed},style:{background:"#fff"},attrs:{"hide-trigger":"",collapsible:""},model:{value:e.isCollapsed,callback:function(t){e.isCollapsed=t},expression:"isCollapsed"}},[a("ul",{staticClass:"group-list",attrs:{id:"userName"}},e._l(e.appData,(function(t){return a("li",{key:t.appId,class:{active:e.categoryIndex==t.appId},on:{click:function(n){return e.sendMsgToParent(t.appId,e.index)}}},[a("div",{staticClass:"group-box"},[a("div",{staticClass:"group-text"},[a("div",[a("div",{staticClass:"group-name"},[e._v(e._s(t.appId))]),a("div",{staticClass:"group-des"},[e._v(e._s(t.appName))])])])])])})),0)]),a("Layout",{style:{padding:"60px 12px 24px 24px",height:"100%"}},[e._t("default")],2)],1)],1)],1)},S=[],R={data:function(){return{activeName:this.$route.path,isCollapsed:!1,appTotal:0,categoryIndex:0,logoutUrlFirstLogin:"",userNameFirstLogin:"",appDataFirstLogin:""}},created:function(){this.activeName=this.$route.path,this.getUserName(),this.getAppData(),this.getLogoutUrl()},methods:{linkHome:function(){this.$router.push({path:"/home"})},getUserName:function(){if(!sessionStorage.getItem("userName")){var e=this;this.axios.get("/api/sso/v1").then((function(t){console.log(t.data.data),e.userNameFirstLogin=t.data.data,sessionStorage.setItem("userName",t.data.data)}))}},getAppData:function(){var e=this;if(!sessionStorage.getItem("appData")){var t=this;this.axios.get("/api/sso/v1").then((function(n){console.log(n.data.data);var a=n.data.data;e.axios.post("/api/app/v1/"+a).then((function(e){console.log("start test"),console.log(e.data.data.data),t.appTotal=e.data.data.total,t.appDataFirstLogin=e.data.data.data,sessionStorage.setItem("appData",JSON.stringify(e.data.data.data)),console.log(t.appTotal),console.log(t.appData)}))}))}},sendMsgToParent:function(e){this.categoryIndex=e,this.$emit("listenToChildEvent",e)},getLogoutUrl:function(){if(!sessionStorage.getItem("logoutUrl")){var e=this;this.axios.get("/api/sso/v1/logout").then((function(t){console.log(t.data.data),e.logoutUrlFirstLogin=t.data.data,sessionStorage.setItem("logoutUrl",t.data.data)}))}}},computed:{userName:function(){return sessionStorage.getItem("userName")?sessionStorage.getItem("userName"):this.userNameFirstLogin},appData:function(){return sessionStorage.getItem("appData")?JSON.parse(sessionStorage.getItem("appData")):this.appDataFirstLogin},logoutUrl:function(){return sessionStorage.getItem("logoutUrl")?sessionStorage.getItem("logoutUrl"):this.logoutUrlFirstLogin}},mounted:function(){console.log("mounted"),console.log(this.appData)}},L=R,U=(n("b0e9"),Object(f["a"])(L,w,S,!1,null,"3d696692",null)),z=U.exports,O=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"layout"},[a("Layout",[a("Sider",{staticClass:"sider",attrs:{breakpoint:"md"}},[a("img",{staticClass:"layout-logo",attrs:{src:n("5190"),alt:"logo",to:"/home"},on:{click:e.linkHome}}),a("Menu",{style:{margin:"60px 0 0 0"},attrs:{"active-name":e.isFather?e.fatherMenu:e.activeName,"open-names":e.isFather?e.subMenuName:e.openNames,theme:"dark",width:"auto"}},[a("MenuItem",{attrs:{name:"/home",to:"/home"}},[a("Icon",{attrs:{type:"ios-navigate"}}),a("span",[e._v("监控大盘")])],1),a("Submenu",{attrs:{name:"0"}},[a("template",{slot:"title"},[a("Icon",{attrs:{type:"ios-apps"}}),e._v(" 集群管理 ")],1),a("MenuItem",{attrs:{name:"/clusters",to:"/clusters"}},[a("span",[e._v("MHA集群")])]),a("MenuItem",{attrs:{name:"/drcclusters",to:"/drcclusters"}},[a("span",[e._v("DRC集群")])]),a("MenuItem",{attrs:{name:"/deletedDrcClusters",to:"/deletedDrcClusters"}},[a("span",[e._v("DRC回滚")])]),a("MenuItem",{attrs:{name:"/apply",to:"/apply"}},[a("span",[e._v("DAL集群")])]),a("MenuItem",{attrs:{name:"/access",to:"/access"}},[a("span",[e._v("搭建DRC")])]),a("MenuItem",{attrs:{name:"/proxyRouteCluster",to:"/proxyRouteCluster"}},[a("span",[e._v("Proxy路由")])])],2),a("Submenu",{attrs:{name:"1"}},[a("template",{slot:"title"},[a("Icon",{attrs:{type:"ios-analytics"}}),e._v(" 自助运维 ")],1),a("MenuItem",{attrs:{name:"/monitor",to:"/monitor"}},[a("span",[e._v("冲突处理")])]),a("MenuItem",{attrs:{name:"/incrementDataConsistencyResult",to:"/incrementDataConsistencyResult"}},[a("span",[e._v("实时数据一致性校验")])]),a("MenuItem",{attrs:{name:"/fullDataConsistencyCluster",to:"/fullDataConsistencyCluster"}},[a("span",[e._v("手工数据一致性校验")])]),a("MenuItem",{attrs:{name:"/unitRouteVerificationCluster",to:"/unitRouteVerificationCluster"}},[a("span",[e._v("单元化路由校验")])])],2),a("MenuItem",{attrs:{name:"/manage",to:"/manage"}},[a("Icon",{attrs:{type:"ios-paper"}}),a("span",[e._v("审批管理")])],1),a("Submenu",{attrs:{name:"2"}},[a("template",{slot:"title"},[a("Icon",{attrs:{type:"ios-paper"}}),e._v(" 资源管理 ")],1),a("MenuItem",{attrs:{name:"/drcResource",to:"/drcResource"}},[a("span",[e._v("DRC资源")])]),a("MenuItem",{attrs:{name:"/proxyResource",to:"/proxyResource"}},[a("span",[e._v("Proxy资源")])])],2)],1)],1),a("Layout",[a("Header",{staticClass:"header"},[a("Row",[a("i-col",{attrs:{span:"4",push:"21"}},[a("Menu",{attrs:{mode:"horizontal","active-name":e.activeName}},[a("Submenu",{attrs:{name:"2"}},[a("template",{slot:"title"},[e._v(" 帮助 ")]),a("MenuItem",{attrs:{name:"help1"}},[e._v("帮助1")]),a("MenuItem",{attrs:{name:"help2"}},[e._v("帮助2")])],2),a("Submenu",{attrs:{name:"3"}},[a("template",{slot:"title"},[e._v(" "+e._s(e.userName)+" ")]),a("MenuItem",{attrs:{name:"logout"}},[a("a",{staticClass:"a",attrs:{href:e.logoutUrl}},[e._v("注销")])])],2)],1)],1)],1)],1),a("Layout",{style:{padding:"60px 12px 24px 24px",height:"100%"}},[e._t("default")],2)],1)],1)],1)},P=[],F={props:{isFather:{type:Boolean,default:!1},subMenuName:{type:Array,default:function(){return[]}},fatherMenu:{type:String,default:""}},data:function(){return{activeName:this.$route.path,openNames:[],appTotal:0,categoryIndex:0,logoutUrlFirstLogin:"",userNameFirstLogin:"",appDataFirstLogin:""}},created:function(){switch(this.$route.path){default:this.openNames=[""];break;case"/apply":case"/clusters":case"/drcclusters":case"/deletedDrcClusters":case"/proxyRouteCluster":case"/proxyRouteManagement":case"/access":this.openNames=["0"];break;case"/incrementDataConsistencyResult":case"/incrementDataConsistencyHandle":case"/incrementDataConsistencyCluster":case"/incrementDataConsistencyCheck":case"/monitor":this.openNames=["1"];break;case"/drcResource":this.openNames=["2"];break;case"/proxyResource":this.openNames=["2"];break}this.activeName=this.$route.path,this.getUserName(),this.getLogoutUrl()},methods:{linkHome:function(){this.$router.push({path:"/home"})},getUserName:function(){if(!sessionStorage.getItem("userName")){var e=this;this.axios.get("/api/drc/v1/user/current").then((function(t){console.log(t.data.data),e.userNameFirstLogin=t.data.data,sessionStorage.setItem("userName",t.data.data)}))}},getLogoutUrl:function(){if(!sessionStorage.getItem("logoutUrl")){var e=this;this.axios.get("/api/drc/v1/user/logout").then((function(t){console.log(t.data.data),e.logoutUrlFirstLogin=t.data.data,sessionStorage.setItem("logoutUrl",t.data.data)}))}}},computed:{userName:function(){return sessionStorage.getItem("userName")?sessionStorage.getItem("userName"):this.userNameFirstLogin},logoutUrl:function(){return sessionStorage.getItem("logoutUrl")?sessionStorage.getItem("logoutUrl"):this.logoutUrlFirstLogin}}},T=F,E=(n("fe83"),Object(f["a"])(T,O,P,!1,null,"76d335f1",null)),$=E.exports,H=n("c1df"),A=n.n(H),V=n("8f94"),q=n.n(V);n("a7be");a["default"].config.productionTip=!1,a["default"].component("dev-article",N),a["default"].component("page-layout",z),a["default"].component("base-component",$),a["default"].use(q.a),a["default"].filter("dateFormat",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YYYY-MM-DD HH:mm:ss";return A()(e).format(t)})),new a["default"]({router:v,store:j,render:function(e){return e(m)}}).$mount("#app")},"781a":function(e,t,n){},"85ec":function(e,t,n){},"872e":function(e,t,n){},b0e9:function(e,t,n){"use strict";n("872e")},fe83:function(e,t,n){"use strict";n("2d96")}});
//# sourceMappingURL=app.2832e22e.js.map