(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f5fdbf8"],{"25f0":function(e,t,n){"use strict";var a=n("6eeb"),r=n("825a"),o=n("d039"),i=n("ad6d"),s="toString",c=RegExp.prototype,l=c[s],u=o((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),d=l.name!=s;(u||d)&&a(RegExp.prototype,s,(function(){var e=r(this),t=String(e.source),n=e.flags,a=String(void 0===n&&e instanceof RegExp&&!("flags"in c)?i.call(e):n);return"/"+t+"/"+a}),{unsafe:!0})},2909:function(e,t,n){"use strict";function a(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}n.d(t,"a",(function(){return i}));n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("e260"),n("d3b7"),n("25f0"),n("3ca3"),n("ddb0");function r(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function i(e){return a(e)||r(e)||o()}},3420:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("base-component",[n("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[n("BreadcrumbItem",{attrs:{to:"/home"}},[e._v("首页")]),n("BreadcrumbItem",{attrs:{to:"/v2/messengersV2"}},[e._v("MQ投递集群")])],1),n("Content",{staticClass:"content",style:{padding:"10px",background:"#fff",margin:"50px 0 1px 185px",zIndex:"1"}},[n("div",{staticStyle:{padding:"1px 1px"}},[n("Card",[n("Table",{attrs:{loading:e.dataLoading,stripe:"",columns:e.columns,data:e.dataWithPage,border:""},scopedSlots:e._u([{key:"action",fn:function(t){var a=t.row,r=t.index;return[n("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"success",size:"small"},on:{click:function(t){return e.checkConfig(a,r)}}},[e._v("查看 ")]),n("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary",size:"small"},on:{click:function(t){return e.goToLink(a,r)}}},[e._v("修改")]),n("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"error",size:"small"},on:{click:function(t){return e.previewRemoveConfig(a,r)}}},[e._v(" 删除 ")])]}}])}),n("div",{staticStyle:{"text-align":"center",margin:"16px 0"}},[n("Page",{attrs:{transfer:!0,total:e.total,current:e.current,"page-size":e.size,"page-size-opts":[10,20,40,80,100],"show-sizer":"","show-elevator":""},on:{"update:current":function(t){e.current=t},"on-page-size-change":e.handleChangeSize}})],1)],1)],1),n("Drawer",{attrs:{title:"DRC配置",width:"80",closable:!0},scopedSlots:e._u([{key:"header",fn:function(){return[e._v(" 查看详情 "),n("div",{staticStyle:{float:"right","margin-right":"100px"}},[e._v(" 自动换行 "),n("i-switch",{model:{value:e.cluster.drawer.lineWrap,callback:function(t){e.$set(e.cluster.drawer,"lineWrap",t)},expression:"cluster.drawer.lineWrap"}}),e._v(" 黑夜模式 "),n("i-switch",{model:{value:e.cluster.drawer.darkMode,callback:function(t){e.$set(e.cluster.drawer,"darkMode",t)},expression:"cluster.drawer.darkMode"}})],1)]},proxy:!0}]),model:{value:e.cluster.drawer.show,callback:function(t){e.$set(e.cluster.drawer,"show",t)},expression:"cluster.drawer.show"}},[n("div",{attrs:{id:"xmlCode"}},[n("codemirror",{staticClass:"code",attrs:{options:{mode:"xml",theme:e.cluster.drawer.darkMode?"monokai":"default",autofocus:!0,lineWrapping:e.cluster.drawer.lineWrap,readOnly:!0,lineNumbers:!0,foldGutter:!0,styleActiveLine:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"]}},model:{value:e.cluster.drawer.data,callback:function(t){e.$set(e.cluster.drawer,"data",t)},expression:"cluster.drawer.data"}})],1)]),n("Modal",{attrs:{title:"删除DRC配置",width:"1200px"},on:{"on-ok":e.removeConfig,"on-cancel":e.clearRemoveConfig},model:{value:e.cluster.modal.remove,callback:function(t){e.$set(e.cluster.modal,"remove",t)},expression:"cluster.modal.remove"}},[n("Form",{staticStyle:{width:"100%"}},[n("FormItem",{attrs:{label:"确认删除改Messenger吗？"}},[n("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.cluster.config,callback:function(t){e.$set(e.cluster,"config",t)},expression:"cluster.config"}})],1)],1)],1)],1)],1)},r=[],o=(n("fb6a"),n("d3b7"),n("2909")),i=(n("7a7a"),n("d5e0"),n("697e"),n("cbc8"),{name:"messengers",data:function(){var e=this;return{cluster:{modal:{remove:!1,show:!1,data:""},drawer:{lineWrap:!1,darkMode:!0,show:!1,data:""},mhaToBeRemoved:""},total:0,current:1,size:100,tableData:[],switchOneInfo:{},columns:[{title:"序号",width:75,align:"center",render:function(t,n){return t("span",n.index+1+(e.current-1)*e.size)}},{title:"集群名",key:"mhaName"},{title:"部门",key:"bu",width:100,render:function(e,t){var n=t.row,a="blue",r=n.bu;return e("Tag",{props:{color:a}},r)}},{title:"监控",key:"monitorSwitch",width:100,align:"center",render:function(t,n){var a=n.row;return t("i-switch",{props:{size:"large",value:1===a.monitorSwitch,beforeChange:e.handleBeforeChange},scopedSlots:{open:function(){return t("span","开启")},close:function(){return t("span","关闭")}},on:{"on-change":function(){e.switchMonitor(a)}},nativeOn:{mousedown:function(){e.switchOneInfo={monitorSwitch:a.monitorSwitch}}}})}},{title:"操作",slot:"action",align:"center"}],dataLoading:!1}},computed:{dataWithPage:function(){var e=this.tableData,t=this.current*this.size-this.size,n=t+this.size;return Object(o["a"])(e).slice(t,n)}},methods:{getAllMessengerVos:function(){var e=this;this.dataLoading=!0,this.axios.get("/api/drc/v2/messenger/all").then((function(t){1!==t.data.status?(e.tableData=t.data.data,e.total=e.tableData.length,e.$Message.success("查询成功")):e.$Message.error("查询失败："+t.message)})).catch((function(t){e.$Message.error("查询异常: "+t)})).finally((function(){e.dataLoading=!1}))},handleChangeSize:function(e){this.size=e},goToLink:function(e,t){console.log("go to change messenger config for "+e.mhaName),this.$router.push({path:"/v2/buildMessengerV2",query:{step:"3",mhaName:e.mhaName}})},checkConfig:function(e,t){var n=this;console.log(e.mhaName),this.dataLoading=!0,this.axios.get("/api/drc/v2/meta/queryConfig/mhaMessenger",{params:{mhaName:e.mhaName}}).then((function(e){1!==e.data.status?(n.cluster.drawer.data=e.data.data,n.cluster.drawer.show=!0,n.$Message.success("查询成功")):n.$Message.error("查询失败："+e.message)})).catch((function(e){n.$Message.error("查询异常: "+e)})).finally((function(){n.dataLoading=!1}))},previewRemoveConfig:function(e,t){var n=this;this.cluster.mhaToBeRemoved=e.mhaName,console.log(e.mhaName),this.$Spin.show({render:function(e){return e("div",[e("Icon",{class:"demo-spin-icon-load",props:{size:18}}),e("div","请稍等...")])}}),this.axios.get("/api/drc/v2/meta/queryConfig/mhaMessenger",{params:{mhaName:e.mhaName}}).then((function(e){var t=e.data.data;console.log(t),n.cluster.config=t,n.$Spin.hide(),n.cluster.modal.remove=!0}))},removeConfig:function(){var e=this;console.log("mhaToBeRemoved",this.cluster.mhaToBeRemoved),this.$Spin.show({render:function(e){return e("div",[e("Icon",{class:"demo-spin-icon-load",props:{size:18}}),e("div","请稍等...")])}}),this.axios.delete("/api/drc/v2/messenger/deleteMha/?mhaName="+this.cluster.mhaToBeRemoved).then((function(t){0===t.data.status?location.reload():alert("删除失败: "+t.data.message),e.$Spin.hide()})),this.clearRemoveConfig()},clearRemoveConfig:function(){this.cluster.mhaToBeRemoved=""},handleBeforeChange:function(){var e=this;return console.log("handleBeforeChange:",this.switchOneInfo),new Promise((function(t){e.$Modal.confirm({title:"切换确认",content:"您确认要切换开关状态吗？",onOk:function(){t()}})}))},switchMonitor:function(e){var t=0===e.monitorSwitch?"on":"off";this.switchMonitors(e.mhaName,t)},switchMonitors:function(e,t){var n=this;console.log(e),this.axios.post("/api/drc/v2/monitor/switch/"+e+"/"+t).then((function(e){0===e.data.status?(console.log(t),"on"===t?n.$Message.success("监控开启成功"):n.$Message.success("监控关闭成功")):n.$Message.warning("监控操作失败"),n.getAllMessengerVos()}))}},created:function(){this.getAllMessengerVos()}}),s=i,c=(n("77b2"),n("2877")),l=Object(c["a"])(s,a,r,!1,null,"70490d04",null);t["default"]=l.exports},"4df4":function(e,t,n){"use strict";var a=n("0366"),r=n("7b0b"),o=n("9bdd"),i=n("e95a"),s=n("50c4"),c=n("8418"),l=n("35a1");e.exports=function(e){var t,n,u,d,f,h,m=r(e),g="function"==typeof this?this:Array,p=arguments.length,v=p>1?arguments[1]:void 0,w=void 0!==v,b=l(m),y=0;if(w&&(v=a(v,p>2?arguments[2]:void 0,2)),void 0==b||g==Array&&i(b))for(t=s(m.length),n=new g(t);t>y;y++)h=w?v(m[y],y):m[y],c(n,y,h);else for(d=b.call(m),f=d.next,n=new g;!(u=f.call(d)).done;y++)h=w?o(d,v,[u.value,y],!0):u.value,c(n,y,h);return n.length=y,n}},"77b2":function(e,t,n){"use strict";n("a859")},8418:function(e,t,n){"use strict";var a=n("c04e"),r=n("9bf2"),o=n("5c6c");e.exports=function(e,t,n){var i=a(t);i in e?r.f(e,i,o(0,n)):e[i]=n}},a630:function(e,t,n){var a=n("23e7"),r=n("4df4"),o=n("1c7e"),i=!o((function(e){Array.from(e)}));a({target:"Array",stat:!0,forced:i},{from:r})},a859:function(e,t,n){},ad6d:function(e,t,n){"use strict";var a=n("825a");e.exports=function(){var e=a(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},fb6a:function(e,t,n){"use strict";var a=n("23e7"),r=n("861d"),o=n("e8b5"),i=n("23cb"),s=n("50c4"),c=n("fc6a"),l=n("8418"),u=n("b622"),d=n("1dde"),f=n("ae40"),h=d("slice"),m=f("slice",{ACCESSORS:!0,0:0,1:2}),g=u("species"),p=[].slice,v=Math.max;a({target:"Array",proto:!0,forced:!h||!m},{slice:function(e,t){var n,a,u,d=c(this),f=s(d.length),h=i(e,f),m=i(void 0===t?f:t,f);if(o(d)&&(n=d.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)?r(n)&&(n=n[g],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return p.call(d,h,m);for(a=new(void 0===n?Array:n)(v(m-h,0)),u=0;h<m;h++,u++)h in d&&l(a,u,d[h]);return a.length=u,a}})}}]);
//# sourceMappingURL=chunk-2f5fdbf8.ae863456.js.map