(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d224feb"],{e307:function(e,t,r){"use strict";r.r(t);var c=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("base-component",[r("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[r("BreadcrumbItem",{attrs:{to:"/home"}},[e._v("首页")]),r("BreadcrumbItem",{attrs:{to:"/drcResource"}},[e._v("DRC资源管理")])],1),r("Content",{staticClass:"content",style:{padding:"10px",background:"#fff",margin:"50px 0 1px 185px",zIndex:"1"}},[r("div",{style:{padding:"1px 1px",height:"100%"}},[r("Row",[r("i-col",{attrs:{span:"12"}},[r("Form",{ref:"drcResource",staticStyle:{float:"left","margin-top":"50px"},attrs:{model:e.drcResource,rules:e.ruleDrcResource,"label-width":250}},[r("FormItem",{attrs:{label:"类型",prop:"type"}},[r("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择资源类型"},model:{value:e.drcResource.type,callback:function(t){e.$set(e.drcResource,"type",t)},expression:"drcResource.type"}},e._l(e.drcResource.typeList,(function(t){return r("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1),r("FormItem",{attrs:{label:"dc",prop:"dc"}},[r("Select",{staticStyle:{width:"200px"},attrs:{filterable:"","allow-create":"",placeholder:"请选择资源所在机房"},on:{"on-create":e.handleCreateDc},model:{value:e.drcResource.dc,callback:function(t){e.$set(e.drcResource,"dc",t)},expression:"drcResource.dc"}},e._l(e.drcZoneList,(function(t){return r("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1),r("FormItem",{staticStyle:{width:"450px"},attrs:{label:"ip",prop:"ip"}},[r("Input",{attrs:{placeholder:"请输入资源ip"},model:{value:e.drcResource.ip,callback:function(t){e.$set(e.drcResource,"ip",t)},expression:"drcResource.ip"}})],1),r("FormItem",[r("Button",{on:{click:function(t){return e.handleReset()}}},[e._v("重置")]),r("br"),r("br"),r("Button",{attrs:{type:"primary"},on:{click:function(t){e.reviewInputResource()}}},[e._v("录入")])],1),r("Modal",{attrs:{title:"录入确认"},on:{"on-ok":e.inputResource},model:{value:e.drcResource.reviewModal,callback:function(t){e.$set(e.drcResource,"reviewModal",t)},expression:"drcResource.reviewModal"}},[e._v(" 确认录入资源"+e._s(this.drcResource.ip)+"吗？所在机房："+e._s(this.drcResource.dc)+"，类型："+e._s(this.drcResource.type)+" ")]),r("Modal",{attrs:{title:"录入结果"},model:{value:e.drcResource.resultModal,callback:function(t){e.$set(e.drcResource,"resultModal",t)},expression:"drcResource.resultModal"}},[e._v(" "+e._s(this.result)+" ")])],1)],1)],1)],1)])],1)},s=[],o={name:"drcResource",data:function(){return{status:"",title:"",message:"",hasResp:!1,drcResource:{reviewModal:!1,ip:"",type:"",dc:"",typeList:[{value:"R",label:"Replicator"},{value:"A",label:"Applier"}]},ruleDrcResource:{ip:[{required:!0,message:"ip不能为空",trigger:"blur"}],type:[{required:!0,message:"ip不能为空",trigger:"blur"}],dc:[{required:!0,message:"dc不能为空",trigger:"blur"}]},drcZoneList:this.constant.dcList,result:""}},methods:{reviewInputResource:function(){console.log("review input "+this.drcResource.type+"("+this.drcResource.ip+") in "+this.drcResource.dc),this.drcResource.reviewModal=!0},inputResource:function(){var e=this,t="/api/drc/v1/meta/resource/ips/"+this.drcResource.ip+"/dcs/"+this.drcResource.dc+"/descriptions/"+this.drcResource.type;console.log("do input "+this.drcResource.type+"("+this.drcResource.ip+") in "+this.drcResource.dc),console.log(t),this.axios.post(t).then((function(t){console.log("show result"),console.log(t.data),e.result=t.data.data,e.drcResource.reviewModal=!1,e.drcResource.resultModal=!0}))},handleCreateDc:function(e){console.log("customize add dc: "+e),this.drcZoneList.push({value:e,label:e}),console.log(this.drcZoneList)},handleReset:function(){console.log("reset input request type: "+this.drcResource.type+", ip: "+this.drcResource.ip+", dc: "+this.drcResource.dc+"."),this.drcResource.ip="",this.drcResource.type="",this.drcResource.dc="",this.result="",console.log("reset input request type result: "+this.drcResource.type+", ip: "+this.drcResource.ip+", dc: "+this.drcResource.dc+".")}},created:function(){}},i=o,l=r("2877"),u=Object(l["a"])(i,c,s,!1,null,"51755345",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d224feb.2553b2bb.js.map