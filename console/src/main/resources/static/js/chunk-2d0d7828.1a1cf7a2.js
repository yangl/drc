(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d7828"],{"76b5":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("base-component",[t("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[t("BreadcrumbItem",{attrs:{to:"/home"}},[e._v("首页")]),t("BreadcrumbItem",{attrs:{to:"/access"}},[e._v("搭建DRC")])],1),t("Content",{staticClass:"content",style:{padding:"10px",background:"#ffffff",margin:"50px 0 1px 185px",zIndex:"1",top:"500px"}},[[t("Steps",{staticStyle:{width:"90%","margin-left":"50px","margin-bottom":"15px","margin-top":"50px"},attrs:{current:e.current}},[t("Step",{style:{cursor:"pointer"},attrs:{title:"新建DRC集群",content:"新建复制集群"},nativeOn:{click:function(a){return e.jumpTo(0)}}}),t("Step",{style:{cursor:"pointer"},attrs:{title:"mha配置",content:"mha添加db信息"},nativeOn:{click:function(a){return e.jumpTo(1)}}}),t("Step",{style:{cursor:"pointer"},attrs:{title:"建立双向复制",content:"配置Replicator和Applier建立集群双向复制"},nativeOn:{click:function(a){return e.jumpTo(2)}}}),t("Step",{style:{cursor:"pointer"},attrs:{title:"完成",content:"已完成DRC接入"},nativeOn:{click:function(a){return e.jumpTo(3)}}})],1)],0===e.current?t("buildV2",e._b({on:{oldClusterChanged:e.updateOldCluster,newClusterChanged:e.updateNewCluster,newDrcZoneChanged:e.updateNewZone,oldDrcZoneChanged:e.updateOldZone}},"buildV2",e.clusterPair,!1)):e._e(),1===e.current?t("mhaConfig",e._b({on:{envChanged:e.updateEnv,oldClusterChanged:e.updateOldCluster,newClusterChanged:e.updateNewCluster}},"mhaConfig",e.clusterPair,!1)):e._e(),2===e.current?t("drc",e._b({on:{envChanged:e.updateEnv,oldClusterChanged:e.updateOldCluster,newClusterChanged:e.updateNewCluster}},"drc",e.clusterPair,!1)):e._e(),3===e.current?t("complete"):e._e(),t("Divider"),t("div",{staticStyle:{padding:"1px 1px",height:"100px","margin-top":"75px"}},[t("div",[e.current>0?t("Button",{staticStyle:{position:"absolute",left:"465px"},attrs:{type:"primary"},on:{click:e.prev}},[e._v(" 上一步 ")]):e._e(),e.current<3?t("Button",{staticStyle:{position:"absolute",left:"790px"},attrs:{type:"primary"},on:{click:e.next}},[e._v(" 下一步 ")]):e._e()],1)])],2)],1)},i=[],s=(t("a9e3"),function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[e.hasResp?t("Alert",{staticStyle:{width:"65%","margin-left":"250px"},attrs:{type:e.status,"show-icon":""}},[e._v(" "+e._s(e.title)+" "),t("span",{attrs:{slot:"desc"},domProps:{innerHTML:e._s(e.message)},slot:"desc"})]):e._e(),t("Form",{ref:"build",staticStyle:{"margin-top":"50px"},attrs:{model:e.build,rules:e.ruleBuild,"label-width":250}},[t("FormItem",{staticStyle:{width:"600px"},attrs:{label:"源Mha集群名",prop:"oldClusterName"}},[t("Input",{attrs:{placeholder:"请输入源集群名"},on:{input:e.changeOldMha},model:{value:e.build.oldClusterName,callback:function(a){e.$set(e.build,"oldClusterName",a)},expression:"build.oldClusterName"}})],1),t("FormItem",{attrs:{label:"源集群机房区域",prop:"oldDrcZone"}},[t("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择机房区域"},on:{input:e.changeOldZone},model:{value:e.build.oldDrcZone,callback:function(a){e.$set(e.build,"oldDrcZone",a)},expression:"build.oldDrcZone"}},e._l(e.build.drcZoneList,(function(a){return t("Option",{key:a.value,attrs:{value:a.value}},[e._v(e._s(a.label))])})),1)],1),t("FormItem",{staticStyle:{width:"600px"},attrs:{label:"新Mha集群名",prop:"newClusterName"}},[t("Input",{attrs:{placeholder:"请输入新集群名"},on:{input:e.changeNewMha},model:{value:e.build.newClusterName,callback:function(a){e.$set(e.build,"newClusterName",a)},expression:"build.newClusterName"}})],1),t("FormItem",{attrs:{label:"新集群机房区域",prop:"newDrcZone"}},[t("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择机房区域"},on:{input:e.changeNewZone},model:{value:e.build.newDrcZone,callback:function(a){e.$set(e.build,"newDrcZone",a)},expression:"build.newDrcZone"}},e._l(e.build.drcZoneList,(function(a){return t("Option",{key:a.value,attrs:{value:a.value}},[e._v(e._s(a.label))])})),1)],1),t("FormItem",{staticStyle:{width:"600px"},attrs:{label:"BU名",prop:"bu"}},[t("Input",{attrs:{placeholder:"请输入BU名，自动绑定route策略"},on:{input:e.changeBu},model:{value:e.build.bu,callback:function(a){e.$set(e.build,"bu",a)},expression:"build.bu"}})],1),t("FormItem",{staticStyle:{width:"600px"},attrs:{label:"DAL Cluster名",prop:"dalclustername"}},[t("Input",{attrs:{placeholder:"请输入DAL Cluster名"},on:{input:e.changeDalClusterName},model:{value:e.build.dalclustername,callback:function(a){e.$set(e.build,"dalclustername",a)},expression:"build.dalclustername"}})],1),t("FormItem",{staticStyle:{width:"600px"},attrs:{label:"appid",prop:"appid"}},[t("Input",{attrs:{placeholder:"请输入appid"},on:{input:e.changeAppId},model:{value:e.build.appid,callback:function(a){e.$set(e.build,"appid",a)},expression:"build.appid"}})],1),t("FormItem",[t("Button",{on:{click:function(a){return e.handleReset("build")}}},[e._v("重置")]),t("Button",{staticStyle:{"margin-left":"150px"},attrs:{type:"primary"},on:{click:function(a){return e.changeModal("build")}}},[e._v("新建DRC同步集群")]),t("Modal",{attrs:{title:"创建DRC"},on:{"on-ok":function(a){return e.postBuild("build")}},model:{value:e.build.modal,callback:function(a){e.$set(e.build,"modal",a)},expression:"build.modal"}},[t("p",[e._v('确定创建新DRC "'+e._s(e.build.oldClusterName+e.build.newClusterName)+'" 吗？并且设置BU/DAL Cluster/appid为 "'+e._s(e.build.bu)+'"/"'+e._s(e.build.dalclustername)+'"/"'+e._s(e.build.appid)+'"')])])],1)],1)],1)}),l=[],r={name:"buildV2",props:{oldClusterName:String,newClusterName:String,oldDrcZone:String,newDrcZone:String},data:function(){return{status:"",title:"",message:"",hasResp:!1,build:{modal:!1,oldClusterName:this.oldClusterName,newClusterName:this.newClusterName,bu:"",dalclustername:"",appid:"",oldDrcZone:this.oldDrcZone,newDrcZone:this.newDrcZone,drcZoneList:[{value:"shaoy",label:"上海欧阳"},{value:"shaxy",label:"上海新源"},{value:"sharb",label:"上海日版"},{value:"shajq",label:"上海金桥"},{value:"shafq",label:"上海福泉"},{value:"shajz",label:"上海金钟"},{value:"ntgxh",label:"南通星湖大道"},{value:"fraaws",label:"法兰克福AWS"},{value:"shali",label:"上海阿里"},{value:"sinibuaws",label:"IBU-VPC"},{value:"sinibualiyun",label:"IBU-VPC(aliyun)"},{value:"sinaws",label:"新加坡AWS"}]},ruleBuild:{oldClusterName:[{required:!0,message:"源集群名不能为空",trigger:"blur"}],newClusterName:[{required:!0,message:"新集群名不能为空",trigger:"blur"}],oldDrcZone:[{required:!0,message:"选择源集群区域",trigger:"change"}],newDrcZone:[{required:!0,message:"选择新集群区域",trigger:"change"}],bu:[{required:!0,message:"BU名不能为空",trigger:"blur"}],dalclustername:[{required:!0,message:"DAL Cluster名不能为空",trigger:"blur"}],appid:[{required:!0,message:"cluster appid不能为空",trigger:"blur"}]}}},methods:{postBuild:function(e){var a=this,t=this;t.$refs[e].validate((function(e){e?(a.hasResp=!1,t.axios.post("/api/drc/v1/access/mha/standalone",{buName:a.build.bu,dalClusterName:a.build.dalclustername,appid:a.build.appid,originalMha:a.build.oldClusterName,originalMhaDc:a.build.oldDrcZone,newBuiltMha:a.build.newClusterName,newBuiltMhaDc:a.build.newDrcZone}).then((function(e){t.hasResp=!0,0===e.data.status?(t.status="success",t.title="集群创建完成!",t.message=e.data.message):(t.status="error",t.title="集群创建失败!",t.message=e.data.message)}))):t.$Message.error("仍有必填项未填!")}))},handleReset:function(e){this.$refs[e].resetFields()},changeOldMha:function(){this.$emit("oldClusterChanged",this.build.oldClusterName)},changeNewMha:function(){this.$emit("newClusterChanged",this.build.newClusterName)},changeOldZone:function(){this.$emit("oldDrcZoneChanged",this.build.oldDrcZone)},changeNewZone:function(){this.$emit("newDrcZoneChanged",this.build.newDrcZone)},changeBu:function(){this.$emit("buChanged",this.build.bu)},changeDalClusterName:function(){this.$emit("dalclusternameChanged",this.build.dalclustername)},changeAppId:function(){this.$emit("appidChanged",this.build.appid)},changeModal:function(e){var a=this;this.$refs[e].validate((function(e){e?a.build.modal=!0:a.$Message.error("仍有必填项未填!")}))}}},o=r,c=t("2877"),u=Object(c["a"])(o,s,l,!1,null,"79b3e534",null),h=u.exports,d=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[e.hasResp?t("Alert",{staticStyle:{width:"65%","margin-left":"250px"},attrs:{type:e.status,"show-icon":""}},[e._v(" "+e._s(e.title)+" "),t("span",{attrs:{slot:"desc"},domProps:{innerHTML:e._s(e.message)},slot:"desc"})]):e._e(),t("Row",[t("i-col",{attrs:{span:"12"}},[t("Form",{ref:"oldMhaMachine",staticStyle:{float:"left","margin-top":"50px"},attrs:{model:e.oldMhaMachine,rules:e.ruleMhaMachine,"label-width":250}},[t("FormItem",{staticStyle:{width:"600px"},attrs:{label:"源集群名",prop:"mhaName"}},[t("Input",{attrs:{placeholder:"请输入源集群名"},on:{input:e.changeOldMha},model:{value:e.oldMhaMachine.mhaName,callback:function(a){e.$set(e.oldMhaMachine,"mhaName",a)},expression:"oldMhaMachine.mhaName"}})],1),t("FormItem",{attrs:{label:"添加Ip",prop:"ip"}},[t("Input",{attrs:{number:"",placeholder:"请输入录入DB的IP"},model:{value:e.oldMhaMachine.ip,callback:function(a){e.$set(e.oldMhaMachine,"ip",a)},expression:"oldMhaMachine.ip"}})],1),t("FormItem",{attrs:{label:"Port",prop:"port"}},[t("Input",{attrs:{placeholder:"请输入录入DB端口"},model:{value:e.oldMhaMachine.port,callback:function(a){e.$set(e.oldMhaMachine,"port",a)},expression:"oldMhaMachine.port"}})],1),t("FormItem",{attrs:{label:"DB机房",prop:"idc"}},[t("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择db机房区域"},model:{value:e.oldMhaMachine.idc,callback:function(a){e.$set(e.oldMhaMachine,"idc",a)},expression:"oldMhaMachine.idc"}},e._l(e.selectOption.drcZoneList,(function(a){return t("Option",{key:a.key,attrs:{value:a.value}},[e._v(e._s(a.key))])})),1)],1),t("FormItem",{attrs:{label:"UUID",prop:"uuid"}},[t("Input",{attrs:{placeholder:"请输入录入DB的uuid"},model:{value:e.oldMhaMachine.uuid,callback:function(a){e.$set(e.oldMhaMachine,"uuid",a)},expression:"oldMhaMachine.uuid"}}),t("Button",{on:{click:e.queryOldMhaMachineUuid}},[e._v("连接查询")]),e.hasTest1?t("span",[t("Icon",{attrs:{type:e.testSuccess1?"ios-checkmark-circle":"ios-close-circle",color:e.testSuccess1?"green":"red"}}),e._v(" "+e._s(e.testSuccess1?"连接查询成功":"连接查询失败，请手动输入uuid")+" ")],1):e._e()],1),t("FormItem",{attrs:{label:"Master",prop:"master"}},[t("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"是否为Master"},model:{value:e.oldMhaMachine.master,callback:function(a){e.$set(e.oldMhaMachine,"master",a)},expression:"oldMhaMachine.master"}},e._l(e.selectOption.isMaster,(function(a){return t("Option",{key:a.key,attrs:{value:a.value}},[e._v(e._s(a.key))])})),1)],1),t("FormItem",[t("Button",{attrs:{type:"primary"},on:{click:function(a){e.preCheckOldMhaMachine("oldMhaMachine")}}},[e._v("录入DB")]),t("br"),t("br")],1)],1)],1),t("i-col",{attrs:{span:"12"}},[t("Form",{ref:"newMhaMachine",staticStyle:{float:"left","margin-top":"50px"},attrs:{model:e.newMhaMachine,rules:e.ruleMhaMachine,"label-width":250}},[t("FormItem",{staticStyle:{width:"600px"},attrs:{label:"新集群名",prop:"mhaName"}},[t("Input",{attrs:{placeholder:"请输入源集群名"},on:{input:e.changeNewMha},model:{value:e.newMhaMachine.mhaName,callback:function(a){e.$set(e.newMhaMachine,"mhaName",a)},expression:"newMhaMachine.mhaName"}})],1),t("FormItem",{attrs:{label:"添加Ip",prop:"ip"}},[t("Input",{attrs:{placeholder:"请输入录入DB的IP"},model:{value:e.newMhaMachine.ip,callback:function(a){e.$set(e.newMhaMachine,"ip",a)},expression:"newMhaMachine.ip"}})],1),t("FormItem",{attrs:{label:"Port",prop:"port"}},[t("Input",{attrs:{number:"",placeholder:"请输入录入DB端口"},model:{value:e.newMhaMachine.port,callback:function(a){e.$set(e.newMhaMachine,"port",a)},expression:"newMhaMachine.port"}})],1),t("FormItem",{attrs:{label:"DB机房",prop:"idc"}},[t("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择db机房区域"},model:{value:e.newMhaMachine.idc,callback:function(a){e.$set(e.newMhaMachine,"idc",a)},expression:"newMhaMachine.idc"}},e._l(e.selectOption.drcZoneList,(function(a){return t("Option",{key:a.key,attrs:{boolean:"",value:a.value}},[e._v(e._s(a.key))])})),1)],1),t("FormItem",{attrs:{label:"UUID",prop:"uuid"}},[t("Input",{attrs:{placeholder:"请输入录入DB的uuid"},model:{value:e.newMhaMachine.uuid,callback:function(a){e.$set(e.newMhaMachine,"uuid",a)},expression:"newMhaMachine.uuid"}}),t("Button",{on:{click:e.queryNewMhaMachineUuid}},[e._v("连接查询")]),e.hasTest2?t("span",[t("Icon",{attrs:{type:e.testSuccess2?"ios-checkmark-circle":"ios-close-circle",color:e.testSuccess2?"green":"red"}}),e._v(" "+e._s(e.testSuccess2?"连接查询成功":"连接查询失败，请手动输入uuid")+" ")],1):e._e()],1),t("FormItem",{attrs:{label:"Master",prop:"master"}},[t("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"是否为Master"},model:{value:e.newMhaMachine.master,callback:function(a){e.$set(e.newMhaMachine,"master",a)},expression:"newMhaMachine.master"}},e._l(e.selectOption.isMaster,(function(a){return t("Option",{key:a.key,attrs:{value:a.value}},[e._v(e._s(a.key))])})),1)],1),t("FormItem",[t("Button",{attrs:{type:"primary"},on:{click:function(a){e.preCheckNewMhaMachine("newMhaMachine")}}},[e._v("录入DB")]),t("br"),t("br")],1)],1)],1)],1),t("Modal",{attrs:{title:"录入左侧Mha Db信息"},on:{"on-ok":e.submitOldMhaMachine},model:{value:e.oldMhaMachine.modal,callback:function(a){e.$set(e.oldMhaMachine,"modal",a)},expression:"oldMhaMachine.modal"}},[t("p",[e._v("Mha: "+e._s(e.oldMhaMachine.mhaName)+" ")]),t("p",[e._v(" db信息 [host: "+e._s(e.oldMhaMachine.ip)+":"+e._s(e.oldMhaMachine.port)+"]")]),t("p",[e._v(" db信息 [isMaster:"+e._s(e.oldMhaMachine.master)+"]")]),t("p",[e._v(" db信息 [idc:"+e._s(e.oldMhaMachine.idc)+"]")]),t("p",[e._v(" db信息 [uuid:"+e._s(e.oldMhaMachine.uuid)+"]")])]),t("Modal",{attrs:{title:"录入右侧Mha Db信息"},on:{"on-ok":e.submitNewMhaMachine},model:{value:e.newMhaMachine.modal,callback:function(a){e.$set(e.newMhaMachine,"modal",a)},expression:"newMhaMachine.modal"}},[t("p",[e._v("Mha: "+e._s(e.newMhaMachine.mhaName)+" ")]),t("p",[e._v(" db信息 [host: "+e._s(e.newMhaMachine.ip)+":"+e._s(e.newMhaMachine.port)+"]")]),t("p",[e._v(" db信息 [isMaster:"+e._s(e.newMhaMachine.master)+"]")]),t("p",[e._v(" db信息 [idc:"+e._s(e.newMhaMachine.idc)+"]")]),t("p",[e._v(" db信息 [uuid:"+e._s(e.newMhaMachine.uuid)+"]")])])],1)},p=[],m={name:"mhaConfig",props:{oldClusterName:String,newClusterName:String,oldDrcZone:String,newDrcZone:String},data:function(){var e=function(e,a,t){if(!/^[0-9]+$/.test(a))return t(new Error("请填写整数port"));t()},a=function(e,a,t){if(!/0|1/.test(a))return t(new Error("请填写整数port"));t()};return{result:"",status:"",title:"",message:"",hasResp:!1,hasTest1:!1,testSuccess1:!1,hasTest2:!1,testSuccess2:!1,oldMhaMachine:{modal:!1,mhaName:this.oldClusterName,zoneId:this.oldDrcZone,ip:"",port:"",idc:this.oldDrcZone,uuid:"",master:1},newMhaMachine:{modal:!1,mhaName:this.newClusterName,zoneId:this.newDrcZone,ip:"",port:"",idc:this.newDrcZone,uuid:"",master:1},ruleMhaMachine:{mhaName:[{required:!0,message:"mha集群名不能为空",trigger:"blur"}],ip:[{required:!0,message:"ip不能为空",trigger:"blur"}],port:[{required:!0,validator:e,trigger:"blur"}],idc:[{required:!0,message:"选择db区域",trigger:"blur"}],uuid:[{required:!0,message:"uuid不能为空",trigger:"blur"}],master:[{required:!0,validator:a,trigger:"blur"}]},selectOption:{isMaster:[{key:"Master",value:1},{key:"Slave",value:0}],drcZoneList:[{value:"shaoy",key:"上海欧阳"},{value:"shaxy",key:"上海新源"},{value:"sharb",key:"上海日版"},{value:"shajq",key:"上海金桥"},{value:"shafq",key:"上海福泉"},{value:"shajz",key:"上海金钟"},{value:"ntgxh",key:"南通星湖大道"},{value:"ntgxy",key:"南通xy"},{value:"fraaws",key:"法兰克福AWS"},{value:"shali",key:"上海阿里"},{value:"sinibuaws",key:"IBU-VPC"},{value:"sinibualiyun",label:"IBU-VPC(aliyun)"},{value:"sinaws",key:"新加坡AWS"}]}}},methods:{changeOldMha:function(){this.$emit("oldClusterChanged",this.oldMhaMachine.mhaName)},changeNewMha:function(){this.$emit("newClusterChanged",this.newMhaMachine.mhaName)},queryOldMhaMachineUuid:function(){var e=this,a=this;console.log("/api/drc/v1/mha/"+this.oldMhaMachine.mhaName+","+this.newMhaMachine.mhaName+"/uuid/"+this.oldMhaMachine.ip+"/"+this.oldMhaMachine.port+"/"+this.oldMhaMachine.master),a.axios.get("/api/drc/v1/mha/"+this.oldMhaMachine.mhaName+","+this.newMhaMachine.mhaName+"/uuid/"+this.oldMhaMachine.ip+"/"+this.oldMhaMachine.port+"/"+this.oldMhaMachine.master).then((function(a){e.hasTest1=!0,0===a.data.status?(e.oldMhaMachine.uuid=a.data.data,e.testSuccess1=!0):e.testSuccess1=!1}))},queryNewMhaMachineUuid:function(){var e=this,a=this;a.axios.get("/api/drc/v1/mha/"+this.oldMhaMachine.mhaName+","+this.newMhaMachine.mhaName+"/uuid/"+this.newMhaMachine.ip+"/"+this.newMhaMachine.port+"/"+this.oldMhaMachine.master).then((function(a){e.hasTest2=!0,0===a.data.status?(e.newMhaMachine.uuid=a.data.data,e.testSuccess2=!0):e.testSuccess2=!1}))},preCheckOldMhaMachine:function(e){var a=this;this.$refs[e].validate((function(e){e?a.oldMhaMachine.modal=!0:a.$Message.error("仍有必填项未填!")}))},submitOldMhaMachine:function(){var e=this,a=this;a.axios.post("/api/drc/v1/access/mha/machineInfo",{mhaName:this.oldMhaMachine.mhaName,master:this.oldMhaMachine.master,mySQLInstance:{ip:this.oldMhaMachine.ip,port:this.oldMhaMachine.port,idc:this.oldMhaMachine.idc,uuid:this.oldMhaMachine.uuid}}).then((function(t){a.hasResp=!0,0===t.data.status?(a.status="success",a.title="mha:"+e.oldMhaMachine.mhaName+"录入db成功!",a.message=t.data.message):(a.status="error",a.title="mha:"+e.oldMhaMachine.mhaName+"录入db失败!",a.message=t.data.message)}))},preCheckNewMhaMachine:function(e){var a=this;this.$refs[e].validate((function(e){e?a.newMhaMachine.modal=!0:a.$Message.error("仍有必填项未填!")}))},submitNewMhaMachine:function(){var e=this,a=this;a.axios.post("/api/drc/v1/access/mha/machineInfo",{mhaName:this.newMhaMachine.mhaName,master:this.newMhaMachine.master,mySQLInstance:{ip:this.newMhaMachine.ip,port:this.newMhaMachine.port,idc:this.newMhaMachine.idc,uuid:this.newMhaMachine.uuid}}).then((function(t){a.hasResp=!0,0===t.data.status?(a.status="success",a.title="mha:"+e.newMhaMachine.mhaName+"录入db成功!",a.message=t.data.message):(a.status="error",a.title="mha:"+e.newMhaMachine.mhaName+"录入db失败!",a.message=t.data.message)}))}}},M=m,b=Object(c["a"])(M,d,p,!1,null,"9033949e",null),w=b.exports,v=t("39ba"),g=t("e537"),f={components:{buildV2:h,mhaConfig:w,drc:v["a"],complete:g["a"]},data:function(){return{current:0,clusterPair:{oldClusterName:"",newClusterName:"",env:"",oldDrcZone:"",newDrcZone:""}}},methods:{jumpTo:function(e){this.current=e,this.hasResp=!1},next:function(){this.current=this.current+1,this.hasResp=!1},prev:function(){this.current=this.current-1,this.hasResp=!1},updateOldCluster:function(e){this.clusterPair.oldClusterName=e},updateNewCluster:function(e){this.clusterPair.newClusterName=e},updateOldZone:function(e){this.clusterPair.oldDrcZone=e},updateNewZone:function(e){this.clusterPair.newDrcZone=e},updateEnv:function(e){this.clusterPair.env=e}},created:function(){var e=this.$route.query.step;"undefined"===typeof e?console.log("curStep undefined, do nothing"):this.jumpTo(Number(e))}},C=f,y=Object(c["a"])(C,n,i,!1,null,"5316675b",null);a["default"]=y.exports}}]);
//# sourceMappingURL=chunk-2d0d7828.1a1cf7a2.js.map