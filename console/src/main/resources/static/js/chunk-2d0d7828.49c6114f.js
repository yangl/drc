(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d7828"],{"76b5":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-component",[a("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[a("BreadcrumbItem",{attrs:{to:"/home"}},[e._v("首页")]),a("BreadcrumbItem",{attrs:{to:"/accessV2"}},[e._v("DRC配置")])],1),a("Content",{staticClass:"content",style:{padding:"10px",background:"#ffffff",margin:"50px 0 1px 185px",zIndex:"1",top:"500px"}},[[a("Steps",{staticStyle:{width:"90%","margin-left":"50px","margin-bottom":"15px","margin-top":"50px"},attrs:{current:e.current}},[a("Step",{style:{cursor:"pointer"},attrs:{title:"新建DRC集群",content:"新建同步DRC"},nativeOn:{click:function(t){return e.jumpTo(0)}}}),a("Step",{style:{cursor:"pointer"},attrs:{title:"mha配置",content:"mha录入db信息"},nativeOn:{click:function(t){return e.jumpTo(1)}}}),a("Step",{style:{cursor:"pointer"},attrs:{title:"预检测",content:"检测mha配置"},nativeOn:{click:function(t){return e.jumpTo(2)}}}),a("Step",{style:{cursor:"pointer"},attrs:{title:"建立同步",content:"配置Replicator和Applier实例"},nativeOn:{click:function(t){return e.jumpTo(3)}}}),a("Step",{style:{cursor:"pointer"},attrs:{title:"完成",content:"已完成DRC接入"},nativeOn:{click:function(t){return e.jumpTo(4)}}})],1)],0===e.current?a("buildV2",e._b({on:{oldClusterChanged:e.updateOldCluster,newClusterChanged:e.updateNewCluster,newDrcZoneChanged:e.updateNewZone,oldDrcZoneChanged:e.updateOldZone}},"buildV2",e.clusterPair,!1)):e._e(),1===e.current?a("mhaConfig",e._b({on:{envChanged:e.updateEnv,oldClusterChanged:e.updateOldCluster,newClusterChanged:e.updateNewCluster}},"mhaConfig",e.clusterPair,!1)):e._e(),2===e.current?a("preCheck",e._b({},"preCheck",e.clusterPair,!1)):e._e(),3===e.current?a("drc",e._b({on:{envChanged:e.updateEnv,oldClusterChanged:e.updateOldCluster,newClusterChanged:e.updateNewCluster}},"drc",e.clusterPair,!1)):e._e(),4===e.current?a("complete"):e._e(),a("Divider"),a("div",{staticStyle:{padding:"1px 1px",height:"100px","margin-top":"75px"}},[a("div",[e.current>0?a("Button",{staticStyle:{position:"absolute",left:"465px"},attrs:{type:"primary"},on:{click:e.prev}},[e._v(" 上一步 ")]):e._e(),e.current<4?a("Button",{staticStyle:{position:"absolute",left:"790px"},attrs:{type:"primary"},on:{click:e.next}},[e._v(" 下一步 ")]):e._e()],1)])],2)],1)},i=[],r=(a("a9e3"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.hasResp?a("Alert",{staticStyle:{width:"65%","margin-left":"250px"},attrs:{type:e.status,"show-icon":""}},[e._v(" "+e._s(e.title)+" "),a("span",{attrs:{slot:"desc"},domProps:{innerHTML:e._s(e.message)},slot:"desc"})]):e._e(),a("Form",{ref:"build",staticStyle:{"margin-top":"50px"},attrs:{model:e.build,rules:e.ruleBuild,"label-width":250}},[a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"源Mha集群名",prop:"oldClusterName"}},[a("Input",{attrs:{placeholder:"请输入源集群名"},on:{input:e.changeOldMha},model:{value:e.build.oldClusterName,callback:function(t){e.$set(e.build,"oldClusterName",t)},expression:"build.oldClusterName"}})],1),a("FormItem",{attrs:{label:"源集群机房区域",prop:"oldDrcZone"}},[a("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择机房区域"},on:{input:e.changeOldZone},model:{value:e.build.oldDrcZone,callback:function(t){e.$set(e.build,"oldDrcZone",t)},expression:"build.oldDrcZone"}},e._l(e.build.drcZoneList,(function(t){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"新Mha集群名",prop:"newClusterName"}},[a("Input",{attrs:{placeholder:"请输入新集群名"},on:{input:e.changeNewMha},model:{value:e.build.newClusterName,callback:function(t){e.$set(e.build,"newClusterName",t)},expression:"build.newClusterName"}})],1),a("FormItem",{attrs:{label:"新集群机房区域",prop:"newDrcZone"}},[a("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择机房区域"},on:{input:e.changeNewZone},model:{value:e.build.newDrcZone,callback:function(t){e.$set(e.build,"newDrcZone",t)},expression:"build.newDrcZone"}},e._l(e.build.drcZoneList,(function(t){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"BU名",prop:"bu"}},[a("Input",{attrs:{placeholder:"请输入BU名，自动绑定route策略"},on:{input:e.changeBu},model:{value:e.build.bu,callback:function(t){e.$set(e.build,"bu",t)},expression:"build.bu"}})],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"DAL Cluster名",prop:"dalclustername"}},[a("Input",{attrs:{placeholder:"请输入DAL Cluster名"},on:{input:e.changeDalClusterName},model:{value:e.build.dalclustername,callback:function(t){e.$set(e.build,"dalclustername",t)},expression:"build.dalclustername"}})],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"appid",prop:"appid"}},[a("Input",{attrs:{placeholder:"请输入appid"},on:{input:e.changeAppId},model:{value:e.build.appid,callback:function(t){e.$set(e.build,"appid",t)},expression:"build.appid"}})],1),a("FormItem",[a("Button",{on:{click:function(t){return e.handleReset("build")}}},[e._v("重置")]),a("Button",{staticStyle:{"margin-left":"150px"},attrs:{type:"primary"},on:{click:function(t){return e.changeModal("build")}}},[e._v("新建DRC同步集群")]),a("Modal",{attrs:{title:"创建DRC"},on:{"on-ok":function(t){return e.postBuild("build")}},model:{value:e.build.modal,callback:function(t){e.$set(e.build,"modal",t)},expression:"build.modal"}},[a("p",[e._v('确定创建新DRC "'+e._s(e.build.oldClusterName+e.build.newClusterName)+'" 吗？并且设置BU/DAL Cluster/appid为 "'+e._s(e.build.bu)+'"/"'+e._s(e.build.dalclustername)+'"/"'+e._s(e.build.appid)+'"')])])],1)],1)],1)}),s=[],o={name:"buildV2",props:{oldClusterName:String,newClusterName:String,oldDrcZone:String,newDrcZone:String},data:function(){return{status:"",title:"",message:"",hasResp:!1,build:{modal:!1,oldClusterName:this.oldClusterName,newClusterName:this.newClusterName,bu:"",dalclustername:"",appid:"",oldDrcZone:this.oldDrcZone,newDrcZone:this.newDrcZone,drcZoneList:this.constant.dcList},ruleBuild:{oldClusterName:[{required:!0,message:"源集群名不能为空",trigger:"blur"}],newClusterName:[{required:!0,message:"新集群名不能为空",trigger:"blur"}],oldDrcZone:[{required:!0,message:"选择源集群区域",trigger:"change"}],newDrcZone:[{required:!0,message:"选择新集群区域",trigger:"change"}],bu:[{required:!0,message:"BU名不能为空",trigger:"blur"}],dalclustername:[{required:!0,message:"DAL Cluster名不能为空",trigger:"blur"}],appid:[{required:!0,message:"cluster appid不能为空",trigger:"blur"}]}}},methods:{postBuild:function(e){var t=this,a=this;a.$refs[e].validate((function(e){e?(t.hasResp=!1,a.axios.post("/api/drc/v1/access/mha/standalone",{buName:t.build.bu,dalClusterName:t.build.dalclustername,appid:t.build.appid,originalMha:t.build.oldClusterName,originalMhaDc:t.build.oldDrcZone,newBuiltMha:t.build.newClusterName,newBuiltMhaDc:t.build.newDrcZone}).then((function(e){a.hasResp=!0,0===e.data.status?(a.status="success",a.title="集群创建完成!",a.message=e.data.message):(a.status="error",a.title="集群创建失败!",a.message=e.data.message)}))):a.$Message.error("仍有必填项未填!")}))},handleReset:function(e){this.$refs[e].resetFields()},changeOldMha:function(){this.$emit("oldClusterChanged",this.build.oldClusterName)},changeNewMha:function(){this.$emit("newClusterChanged",this.build.newClusterName)},changeOldZone:function(){this.$emit("oldDrcZoneChanged",this.build.oldDrcZone)},changeNewZone:function(){this.$emit("newDrcZoneChanged",this.build.newDrcZone)},changeBu:function(){this.$emit("buChanged",this.build.bu)},changeDalClusterName:function(){this.$emit("dalclusternameChanged",this.build.dalclustername)},changeAppId:function(){this.$emit("appidChanged",this.build.appid)},changeModal:function(e){var t=this;this.$refs[e].validate((function(e){e?t.build.modal=!0:t.$Message.error("仍有必填项未填!")}))}}},l=o,c=a("2877"),u=Object(c["a"])(l,r,s,!1,null,"7be0365c",null),h=u.exports,d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.hasResp?a("Alert",{staticStyle:{width:"65%","margin-left":"250px"},attrs:{type:e.status,"show-icon":""}},[e._v(" "+e._s(e.title)+" "),a("span",{attrs:{slot:"desc"},domProps:{innerHTML:e._s(e.message)},slot:"desc"})]):e._e(),a("Row",[a("i-col",{attrs:{span:"12"}},[a("Form",{ref:"oldMhaMachine",staticStyle:{float:"left","margin-top":"50px"},attrs:{model:e.oldMhaMachine,rules:e.ruleMhaMachine,"label-width":250}},[a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"源集群名",prop:"mhaName"}},[a("Input",{attrs:{placeholder:"请输入源集群名"},on:{input:e.changeOldMha},model:{value:e.oldMhaMachine.mhaName,callback:function(t){e.$set(e.oldMhaMachine,"mhaName",t)},expression:"oldMhaMachine.mhaName"}})],1),a("FormItem",{attrs:{label:"添加Ip",prop:"ip"}},[a("Input",{attrs:{number:"",placeholder:"请输入录入DB的IP"},model:{value:e.oldMhaMachine.ip,callback:function(t){e.$set(e.oldMhaMachine,"ip",t)},expression:"oldMhaMachine.ip"}})],1),a("FormItem",{attrs:{label:"Port",prop:"port"}},[a("Input",{attrs:{placeholder:"请输入录入DB端口"},model:{value:e.oldMhaMachine.port,callback:function(t){e.$set(e.oldMhaMachine,"port",t)},expression:"oldMhaMachine.port"}})],1),a("FormItem",{attrs:{label:"DB机房",prop:"idc"}},[a("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择db机房区域"},model:{value:e.oldMhaMachine.idc,callback:function(t){e.$set(e.oldMhaMachine,"idc",t)},expression:"oldMhaMachine.idc"}},e._l(e.selectOption.drcZoneList,(function(t){return a("Option",{key:t.key,attrs:{value:t.value}},[e._v(e._s(t.key))])})),1)],1),a("FormItem",{attrs:{label:"UUID",prop:"uuid"}},[a("Input",{attrs:{placeholder:"请输入录入DB的uuid"},model:{value:e.oldMhaMachine.uuid,callback:function(t){e.$set(e.oldMhaMachine,"uuid",t)},expression:"oldMhaMachine.uuid"}}),a("Button",{on:{click:e.queryOldMhaMachineUuid}},[e._v("连接查询")]),e.hasTest1?a("span",[a("Icon",{attrs:{type:e.testSuccess1?"ios-checkmark-circle":"ios-close-circle",color:e.testSuccess1?"green":"red"}}),e._v(" "+e._s(e.testSuccess1?"连接查询成功":"连接查询失败，请手动输入uuid")+" ")],1):e._e()],1),a("FormItem",{attrs:{label:"Master",prop:"master"}},[a("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"是否为Master"},model:{value:e.oldMhaMachine.master,callback:function(t){e.$set(e.oldMhaMachine,"master",t)},expression:"oldMhaMachine.master"}},e._l(e.selectOption.isMaster,(function(t){return a("Option",{key:t.key,attrs:{value:t.value}},[e._v(e._s(t.key))])})),1)],1),a("FormItem",[a("Button",{attrs:{type:"primary"},on:{click:function(t){e.preCheckOldMhaMachine("oldMhaMachine")}}},[e._v("录入DB")]),a("br"),a("br")],1)],1)],1),a("i-col",{attrs:{span:"12"}},[a("Form",{ref:"newMhaMachine",staticStyle:{float:"left","margin-top":"50px"},attrs:{model:e.newMhaMachine,rules:e.ruleMhaMachine,"label-width":250}},[a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"新集群名",prop:"mhaName"}},[a("Input",{attrs:{placeholder:"请输入源集群名"},on:{input:e.changeNewMha},model:{value:e.newMhaMachine.mhaName,callback:function(t){e.$set(e.newMhaMachine,"mhaName",t)},expression:"newMhaMachine.mhaName"}})],1),a("FormItem",{attrs:{label:"添加Ip",prop:"ip"}},[a("Input",{attrs:{placeholder:"请输入录入DB的IP"},model:{value:e.newMhaMachine.ip,callback:function(t){e.$set(e.newMhaMachine,"ip",t)},expression:"newMhaMachine.ip"}})],1),a("FormItem",{attrs:{label:"Port",prop:"port"}},[a("Input",{attrs:{number:"",placeholder:"请输入录入DB端口"},model:{value:e.newMhaMachine.port,callback:function(t){e.$set(e.newMhaMachine,"port",t)},expression:"newMhaMachine.port"}})],1),a("FormItem",{attrs:{label:"DB机房",prop:"idc"}},[a("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择db机房区域"},model:{value:e.newMhaMachine.idc,callback:function(t){e.$set(e.newMhaMachine,"idc",t)},expression:"newMhaMachine.idc"}},e._l(e.selectOption.drcZoneList,(function(t){return a("Option",{key:t.key,attrs:{boolean:"",value:t.value}},[e._v(e._s(t.key))])})),1)],1),a("FormItem",{attrs:{label:"UUID",prop:"uuid"}},[a("Input",{attrs:{placeholder:"请输入录入DB的uuid"},model:{value:e.newMhaMachine.uuid,callback:function(t){e.$set(e.newMhaMachine,"uuid",t)},expression:"newMhaMachine.uuid"}}),a("Button",{on:{click:e.queryNewMhaMachineUuid}},[e._v("连接查询")]),e.hasTest2?a("span",[a("Icon",{attrs:{type:e.testSuccess2?"ios-checkmark-circle":"ios-close-circle",color:e.testSuccess2?"green":"red"}}),e._v(" "+e._s(e.testSuccess2?"连接查询成功":"连接查询失败，请手动输入uuid")+" ")],1):e._e()],1),a("FormItem",{attrs:{label:"Master",prop:"master"}},[a("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"是否为Master"},model:{value:e.newMhaMachine.master,callback:function(t){e.$set(e.newMhaMachine,"master",t)},expression:"newMhaMachine.master"}},e._l(e.selectOption.isMaster,(function(t){return a("Option",{key:t.key,attrs:{value:t.value}},[e._v(e._s(t.key))])})),1)],1),a("FormItem",[a("Button",{attrs:{type:"primary"},on:{click:function(t){e.preCheckNewMhaMachine("newMhaMachine")}}},[e._v("录入DB")]),a("br"),a("br")],1)],1)],1)],1),a("Modal",{attrs:{title:"录入左侧Mha Db信息"},on:{"on-ok":e.submitOldMhaMachine},model:{value:e.oldMhaMachine.modal,callback:function(t){e.$set(e.oldMhaMachine,"modal",t)},expression:"oldMhaMachine.modal"}},[a("p",[e._v("Mha: "+e._s(e.oldMhaMachine.mhaName)+" ")]),a("p",[e._v(" db信息 [host: "+e._s(e.oldMhaMachine.ip)+":"+e._s(e.oldMhaMachine.port)+"]")]),a("p",[e._v(" db信息 [isMaster:"+e._s(e.oldMhaMachine.master)+"]")]),a("p",[e._v(" db信息 [idc:"+e._s(e.oldMhaMachine.idc)+"]")]),a("p",[e._v(" db信息 [uuid:"+e._s(e.oldMhaMachine.uuid)+"]")])]),a("Modal",{attrs:{title:"录入右侧Mha Db信息"},on:{"on-ok":e.submitNewMhaMachine},model:{value:e.newMhaMachine.modal,callback:function(t){e.$set(e.newMhaMachine,"modal",t)},expression:"newMhaMachine.modal"}},[a("p",[e._v("Mha: "+e._s(e.newMhaMachine.mhaName)+" ")]),a("p",[e._v(" db信息 [host: "+e._s(e.newMhaMachine.ip)+":"+e._s(e.newMhaMachine.port)+"]")]),a("p",[e._v(" db信息 [isMaster:"+e._s(e.newMhaMachine.master)+"]")]),a("p",[e._v(" db信息 [idc:"+e._s(e.newMhaMachine.idc)+"]")]),a("p",[e._v(" db信息 [uuid:"+e._s(e.newMhaMachine.uuid)+"]")])])],1)},p=[],m={name:"mhaConfig",props:{oldClusterName:String,newClusterName:String,oldDrcZone:String,newDrcZone:String},data:function(){var e=function(e,t,a){if(!/^[0-9]+$/.test(t))return a(new Error("请填写整数port"));a()},t=function(e,t,a){if(!/0|1/.test(t))return a(new Error("请填写整数port"));a()};return{result:"",status:"",title:"",message:"",hasResp:!1,hasTest1:!1,testSuccess1:!1,hasTest2:!1,testSuccess2:!1,oldMhaMachine:{modal:!1,mhaName:this.oldClusterName,zoneId:this.oldDrcZone,ip:"",port:"",idc:this.oldDrcZone,uuid:"",master:1},newMhaMachine:{modal:!1,mhaName:this.newClusterName,zoneId:this.newDrcZone,ip:"",port:"",idc:this.newDrcZone,uuid:"",master:1},ruleMhaMachine:{mhaName:[{required:!0,message:"mha集群名不能为空",trigger:"blur"}],ip:[{required:!0,message:"ip不能为空",trigger:"blur"}],port:[{required:!0,validator:e,trigger:"blur"}],idc:[{required:!0,message:"选择db区域",trigger:"blur"}],uuid:[{required:!0,message:"uuid不能为空",trigger:"blur"}],master:[{required:!0,validator:t,trigger:"blur"}]},selectOption:{isMaster:[{key:"Master",value:1},{key:"Slave",value:0}],drcZoneList:this.constant.dcList}}},methods:{changeOldMha:function(){this.$emit("oldClusterChanged",this.oldMhaMachine.mhaName)},changeNewMha:function(){this.$emit("newClusterChanged",this.newMhaMachine.mhaName)},queryOldMhaMachineUuid:function(){var e=this,t=this;console.log("/api/drc/v1/mha/uuid/"+this.oldMhaMachine.mhaName+","+this.newMhaMachine.mhaName+"/"+this.oldMhaMachine.ip+"/"+this.oldMhaMachine.port+"/"+this.oldMhaMachine.master),t.axios.get("/api/drc/v1/mha/uuid/"+this.oldMhaMachine.mhaName+","+this.newMhaMachine.mhaName+"/"+this.oldMhaMachine.ip+"/"+this.oldMhaMachine.port+"/"+this.oldMhaMachine.master).then((function(t){e.hasTest1=!0,0===t.data.status?(e.oldMhaMachine.uuid=t.data.data,e.testSuccess1=!0):e.testSuccess1=!1}))},queryNewMhaMachineUuid:function(){var e=this,t=this;t.axios.get("/api/drc/v1/mha/uuid/"+this.oldMhaMachine.mhaName+","+this.newMhaMachine.mhaName+"/"+this.newMhaMachine.ip+"/"+this.newMhaMachine.port+"/"+this.oldMhaMachine.master).then((function(t){e.hasTest2=!0,0===t.data.status?(e.newMhaMachine.uuid=t.data.data,e.testSuccess2=!0):e.testSuccess2=!1}))},preCheckOldMhaMachine:function(e){var t=this;this.$refs[e].validate((function(e){e?t.oldMhaMachine.modal=!0:t.$Message.error("仍有必填项未填!")}))},submitOldMhaMachine:function(){var e=this,t=this;t.axios.post("/api/drc/v1/access/mha/machineInfo",{mhaName:this.oldMhaMachine.mhaName,master:this.oldMhaMachine.master,mySQLInstance:{ip:this.oldMhaMachine.ip,port:this.oldMhaMachine.port,idc:this.oldMhaMachine.idc,uuid:this.oldMhaMachine.uuid}}).then((function(a){t.hasResp=!0,0===a.data.status?(t.status="success",t.title="mha:"+e.oldMhaMachine.mhaName+"录入db成功!",t.message=a.data.message):(t.status="error",t.title="mha:"+e.oldMhaMachine.mhaName+"录入db失败!",t.message=a.data.message)}))},preCheckNewMhaMachine:function(e){var t=this;this.$refs[e].validate((function(e){e?t.newMhaMachine.modal=!0:t.$Message.error("仍有必填项未填!")}))},submitNewMhaMachine:function(){var e=this,t=this;t.axios.post("/api/drc/v1/access/mha/machineInfo",{mhaName:this.newMhaMachine.mhaName,master:this.newMhaMachine.master,mySQLInstance:{ip:this.newMhaMachine.ip,port:this.newMhaMachine.port,idc:this.newMhaMachine.idc,uuid:this.newMhaMachine.uuid}}).then((function(a){t.hasResp=!0,0===a.data.status?(t.status="success",t.title="mha:"+e.newMhaMachine.mhaName+"录入db成功!",t.message=a.data.message):(t.status="error",t.title="mha:"+e.newMhaMachine.mhaName+"录入db失败!",t.message=a.data.message)}))}}},M=m,g=Object(c["a"])(M,d,p,!1,null,"78c152c8",null),b=g.exports,f=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Row",[a("i-col",{attrs:{span:"12"}},[a("Form",{staticStyle:{float:"left","margin-top":"50px"},attrs:{model:e.srcMha,"label-width":250}},[a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"源集群名",prop:"mhaName"}},[a("Row",[a("Col",{attrs:{span:"16"}},[a("Input",{attrs:{readonly:"",placeholder:"请输入源集群名"},model:{value:e.srcMha.mhaName,callback:function(t){e.$set(e.srcMha,"mhaName",t)},expression:"srcMha.mhaName"}})],1),a("Col",{attrs:{span:"5"}},[a("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",ghost:""},on:{click:function(t){return e.checkMySqlConfig(e.srcMha)}}},[e._v("配置校验")])],1)],1)],1),a("FormItem",{attrs:{label:"同步表",prop:"ip"}},[a("Row",[a("Col",{attrs:{span:"16"}},[a("Input",{attrs:{placeholder:"支持正则，默认全部"},model:{value:e.srcMha.nameFilter,callback:function(t){e.$set(e.srcMha,"nameFilter",t)},expression:"srcMha.nameFilter"}})],1),a("Col",{attrs:{span:"5"}},[a("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",ghost:""},on:{click:function(t){return e.checkMySqlTables(e.srcMha)}}},[e._v("表校验")])],1)],1)],1)],1)],1),a("i-col",{attrs:{span:"12"}},[a("Form",{staticStyle:{float:"left","margin-top":"50px"},attrs:{model:e.destMha,"label-width":250}},[a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"目标集群名",prop:"mhaName"}},[a("Row",[a("Col",{attrs:{span:"16"}},[a("Input",{attrs:{readonly:"",placeholder:"请输入源集群名"},model:{value:e.destMha.mhaName,callback:function(t){e.$set(e.destMha,"mhaName",t)},expression:"destMha.mhaName"}})],1),a("Col",{attrs:{span:"5"}},[a("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",ghost:""},on:{click:function(t){return e.checkMySqlConfig(e.destMha)}}},[e._v("配置校验")])],1)],1)],1),a("FormItem",{attrs:{label:"同步表",prop:"ip"}},[a("Row",[a("Col",{attrs:{span:"16"}},[a("Input",{attrs:{placeholder:"支持正则，默认全部"},model:{value:e.destMha.nameFilter,callback:function(t){e.$set(e.destMha,"nameFilter",t)},expression:"destMha.nameFilter"}})],1),a("Col",{attrs:{span:"5"}},[a("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",ghost:""},on:{click:function(t){return e.checkMySqlTables(e.destMha)}}},[e._v("表校验")])],1)],1)],1)],1)],1)],1),a("Modal",{attrs:{title:"预检测结果",width:"900px"},model:{value:e.configCheck.modal,callback:function(t){e.$set(e.configCheck,"modal",t)},expression:"configCheck.modal"}},[a("Form",{staticStyle:{width:"100%"}},[a("FormItem",{attrs:{label:"BINLOG [SHOULD BE: ON]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.binlogMode,callback:function(t){e.$set(e.configCheck,"binlogMode",t)},expression:"configCheck.binlogMode"}})],1),a("FormItem",{attrs:{label:"BINLOG_FORMAT  [SHOULD BE: ROW]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.binlogFormat,callback:function(t){e.$set(e.configCheck,"binlogFormat",t)},expression:"configCheck.binlogFormat"}})],1),a("FormItem",{attrs:{label:"binlogVersion1  [SHOULD BE: OFF]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.binlogVersion1,callback:function(t){e.$set(e.configCheck,"binlogVersion1",t)},expression:"configCheck.binlogVersion1"}})],1),a("FormItem",{attrs:{label:"BTD [SHOULD BE: writeSet]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.binlogTransactionDependency,callback:function(t){e.$set(e.configCheck,"binlogTransactionDependency",t)},expression:"configCheck.binlogTransactionDependency"}})],1),a("FormItem",{attrs:{label:"BinlogRowImage [SHOULD BE: FULL]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.binlogRowImage,callback:function(t){e.$set(e.configCheck,"binlogRowImage",t)},expression:"configCheck.binlogRowImage"}})],1),a("FormItem",{attrs:{label:"BTDHS [SHOULD BE: 100k]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.binlogTransactionDependencyHistorySize,callback:function(t){e.$set(e.configCheck,"binlogTransactionDependencyHistorySize",t)},expression:"configCheck.binlogTransactionDependencyHistorySize"}})],1),a("FormItem",{attrs:{label:"GTID_MODE [SHOULD BE: ON]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.gtidMode,callback:function(t){e.$set(e.configCheck,"gtidMode",t)},expression:"configCheck.gtidMode"}})],1),a("FormItem",{attrs:{label:"DRC系统表数量 [SHOULD BE: 1/2]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.drcTables,callback:function(t){e.$set(e.configCheck,"drcTables",t)},expression:"configCheck.drcTables"}})],1),a("FormItem",{attrs:{label:"自增步长"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.autoIncrementStep,callback:function(t){e.$set(e.configCheck,"autoIncrementStep",t)},expression:"configCheck.autoIncrementStep"}})],1),a("FormItem",{attrs:{label:"自增offSet"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.autoIncrementOffset,callback:function(t){e.$set(e.configCheck,"autoIncrementOffset",t)},expression:"configCheck.autoIncrementOffset"}})],1),a("FormItem",{attrs:{label:"DRC3对帐号 [SHOULD BE: three accounts ready]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.drcAccounts,callback:function(t){e.$set(e.configCheck,"drcAccounts",t)},expression:"configCheck.drcAccounts"}})],1)],1)],1),a("Modal",{attrs:{title:"表检验",width:"1000px"},model:{value:e.tablesCheckModal,callback:function(t){e.tablesCheckModal=t},expression:"tablesCheckModal"}},[a("Card",[a("div",{attrs:{slot:"title"},slot:"title"},[a("span",[e._v("相关表")])]),a("Table",{attrs:{stripe:"",columns:e.columns,data:e.dataWithPage,border:""}}),a("div",{staticStyle:{"text-align":"center",margin:"16px 0"}},[a("Page",{attrs:{transfer:!0,total:e.tableData.length,current:e.current,"page-size-opts":e.pageSizeOpts,"page-size":this.size,"show-total":"","show-sizer":"","show-elevator":""},on:{"update:current":function(t){e.current=t},"on-page-size-change":e.handleChangeSize}})],1)],1)],1)],1)},w=[],C=(a("fb6a"),a("2909")),k={name:"preCheck",props:{oldClusterName:String,newClusterName:String,oldDrcZone:String,newDrcZone:String},data:function(){return{srcMha:{mhaName:this.oldClusterName,nameFilter:""},destMha:{mhaName:this.newClusterName,nameFilter:""},configCheck:{binlogMode:"",binlogFormat:"",binlogVersion1:"",binlogTransactionDependency:"",binlogRowImage:"",binlogTransactionDependencyHistorySize:0,gtidMode:"",drcTables:0,autoIncrementStep:0,autoIncrementOffset:0,drcAccounts:"",modal:!1},tablesCheckModal:!1,tableData:[],columns:[{title:"序号",width:75,align:"center",fixed:"left",render:function(e,t){return e("span",t.index+1)}},{title:"库名",key:"schema"},{title:"表名",key:"table"},{title:"无OnUpdate字段",key:"noOnUpdateColumn",width:100,align:"center",render:function(e,t){var a=t.row,n=a.noOnUpdateColumn?"True":"";return e("span",n)}},{title:"无OnUpdate字段索引",key:"noOnUpdateKey",width:100,align:"center",render:function(e,t){var a=t.row,n=a.noOnUpdateKey?"True":"";return e("span",n)}},{title:"无PkUk",key:"noPkUk",width:100,align:"center",render:function(e,t){var a=t.row,n=a.noPkUk?"True":"";return e("span",n)}},{title:"支持Truncate",key:"approveTruncate",width:100,align:"center",render:function(e,t){var a=t.row,n=a.approveTruncate?"True":"";return e("span",n)}},{title:"存在DefaultTime为0",key:"timeDefaultZero",width:100,align:"center",render:function(e,t){var a=t.row,n=a.timeDefaultZero?"True":"";return e("span",n)}},{title:"结果",width:100,align:"center",render:function(e,t){var a=t.row,n=a.noOnUpdateColumn||a.noOnUpdateKey||a.noPkUk||a.approveTruncate||a.timeDefaultZero,i=n?"volcano":"green",r=n?"错误":"正常";return e("Tag",{props:{color:i}},r)}}],total:0,current:1,size:5,pageSizeOpts:[5,10,20,100]}},computed:{dataWithPage:function(){var e=this.tableData,t=this.current*this.size-this.size,a=t+this.size;return Object(C["a"])(e).slice(t,a)}},methods:{checkMySqlConfig:function(e){var t=this;this.$Spin.show({render:function(e){return e("div",[e("Icon",{class:"demo-spin-icon-load",props:{size:18}}),e("div","检测中，请稍等...")])}}),this.axios.get("/api/drc/v1/build/preCheckMySqlConfig?mha="+e.mhaName).then((function(e){console.log(e);var a=e.data.data;console.log(a),t.configCheck.binlogMode=a.binlogMode,t.configCheck.binlogFormat=a.binlogFormat,t.configCheck.binlogVersion1=a.binlogVersion1,t.configCheck.binlogTransactionDependency=a.binlogTransactionDependency,t.configCheck.binlogRowImage=a.binlogRowImage,t.configCheck.binlogTransactionDependencyHistorySize=a.binlogTransactionDependencyHistorySize,t.configCheck.gtidMode=a.gtidMode,t.configCheck.drcTables=a.drcTables,t.configCheck.autoIncrementStep=a.autoIncrementStep,t.configCheck.autoIncrementOffset=a.autoIncrementOffset,t.configCheck.drcAccounts=a.drcAccounts,t.$Spin.hide(),t.configCheck.modal=!0}))},checkMySqlTables:function(e){var t=this;this.$Spin.show({render:function(e){return e("div",[e("Icon",{class:"demo-spin-icon-load",props:{size:18}}),e("div","检测中，请稍等...")])}}),setTimeout((function(){t.$Spin.hide()}),8e4),this.axios.get("/api/drc/v1/build/preCheckMySqlTables?mha="+e.mhaName+"&nameFilter="+e.nameFilter).then((function(e){t.tableData=e.data.data,t.$Spin.hide(),t.tablesCheckModal=!0}))},handleChangeSize:function(e){this.size=e}}},v=k,y=Object(c["a"])(v,f,w,!1,null,"19a085a5",null),S=y.exports,I=a("39ba"),x=a("e537"),N={components:{buildV2:h,mhaConfig:b,preCheck:S,drc:I["a"],complete:x["a"]},data:function(){return{current:0,clusterPair:{oldClusterName:this.$route.query.clustername,newClusterName:this.$route.query.newclustername,env:"",oldDrcZone:"",newDrcZone:""}}},methods:{jumpTo:function(e){this.current=e,this.hasResp=!1},next:function(){this.current=this.current+1,this.hasResp=!1},prev:function(){this.current=this.current-1,this.hasResp=!1},updateOldCluster:function(e){this.clusterPair.oldClusterName=e},updateNewCluster:function(e){this.clusterPair.newClusterName=e},updateOldZone:function(e){this.clusterPair.oldDrcZone=e},updateNewZone:function(e){this.clusterPair.newDrcZone=e},updateEnv:function(e){this.clusterPair.env=e}},created:function(){var e=this.$route.query.step;"undefined"===typeof e?console.log("curStep undefined, do nothing"):this.jumpTo(Number(e))}},D=N,_=Object(c["a"])(D,n,i,!1,null,"09514e12",null);t["default"]=_.exports}}]);
//# sourceMappingURL=chunk-2d0d7828.49c6114f.js.map