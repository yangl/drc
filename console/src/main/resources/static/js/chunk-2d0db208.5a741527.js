(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0db208"],{"6f13":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("base-component",[a("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[a("BreadcrumbItem",{attrs:{to:"/home"}},[e._v("首页")]),a("BreadcrumbItem",{attrs:{to:"/buildMessenger"}},[e._v("Messenger配置")])],1),a("Content",{staticClass:"content",style:{padding:"10px",background:"#ffffff",margin:"50px 0 1px 185px",zIndex:"1",top:"500px"}},[[a("Steps",{staticStyle:{width:"90%","margin-left":"50px","margin-bottom":"15px","margin-top":"50px"},attrs:{current:e.current}},[a("Step",{style:{cursor:"pointer"},attrs:{title:"录入Mha",content:"新建MQ同步"},nativeOn:{click:function(t){return e.jumpTo(0)}}}),a("Step",{style:{cursor:"pointer"},attrs:{title:"mha配置",content:"mha录入db信息"},nativeOn:{click:function(t){return e.jumpTo(1)}}}),a("Step",{style:{cursor:"pointer"},attrs:{title:"预检测",content:"检测mha配置"},nativeOn:{click:function(t){return e.jumpTo(2)}}}),a("Step",{style:{cursor:"pointer"},attrs:{title:"建立同步",content:"配置Replicator和Messenger实例"},nativeOn:{click:function(t){return e.jumpTo(3)}}}),a("Step",{style:{cursor:"pointer"},attrs:{title:"完成",content:"已完成MQ同步配置"},nativeOn:{click:function(t){return e.jumpTo(4)}}})],1)],0===e.current?a("mhaInit",e._b({on:{mhaNameChanged:e.updateMhaName,dcChanged:e.updateDc}},"mhaInit",e.sharedInfo,!1)):e._e(),1===e.current?a("mhaConfig",e._b({on:{mhaNameChanged:e.updateMhaName,dcChanged:e.updateDc}},"mhaConfig",e.sharedInfo,!1)):e._e(),2===e.current?a("preCheck",e._b({},"preCheck",e.sharedInfo,!1)):e._e(),3===e.current?a("drcConfig",e._b({},"drcConfig",e.sharedInfo,!1)):e._e(),4===e.current?a("complete"):e._e(),a("Divider"),a("div",{staticStyle:{padding:"1px 1px",height:"100px","margin-top":"75px"}},[a("div",[e.current>0?a("Button",{staticStyle:{position:"absolute",left:"465px"},attrs:{type:"primary"},on:{click:e.prev}},[e._v(" 上一步 ")]):e._e(),e.current<4?a("Button",{staticStyle:{position:"absolute",left:"790px"},attrs:{type:"primary"},on:{click:e.next}},[e._v(" 下一步 ")]):e._e()],1)])],2)],1)},r=[],o=(a("a9e3"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.hasResp?a("Alert",{staticStyle:{width:"65%","margin-left":"250px"},attrs:{type:e.status,"show-icon":""}},[e._v(" "+e._s(e.title)+" "),a("span",{attrs:{slot:"desc"},domProps:{innerHTML:e._s(e.message)},slot:"desc"})]):e._e(),a("Form",{ref:"mhaInfo",staticStyle:{"margin-top":"50px"},attrs:{model:e.mhaInfo,rules:e.ruleOfMhaInfo,"label-width":250}},[a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"Mha名称",prop:"mhaName"}},[a("Input",{attrs:{placeholder:"请输入集群名"},on:{input:e.changeMhaName},model:{value:e.mhaInfo.mhaName,callback:function(t){e.$set(e.mhaInfo,"mhaName",t)},expression:"mhaInfo.mhaName"}})],1),a("FormItem",{attrs:{label:"源集群机房区域",prop:"dc"}},[a("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择机房区域"},on:{input:e.changeDc},model:{value:e.mhaInfo.dc,callback:function(t){e.$set(e.mhaInfo,"dc",t)},expression:"mhaInfo.dc"}},e._l(e.mhaInfo.drcZoneList,(function(t){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"BU名",prop:"bu"}},[a("Input",{attrs:{placeholder:"请输入BU名，自动绑定route策略"},model:{value:e.mhaInfo.bu,callback:function(t){e.$set(e.mhaInfo,"bu",t)},expression:"mhaInfo.bu"}})],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"DAL Cluster名",prop:"dalclustername"}},[a("Input",{attrs:{placeholder:"请输入DAL Cluster名"},model:{value:e.mhaInfo.dalclustername,callback:function(t){e.$set(e.mhaInfo,"dalclustername",t)},expression:"mhaInfo.dalclustername"}})],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"appid",prop:"appid"}},[a("Input",{attrs:{placeholder:"请输入appid"},model:{value:e.mhaInfo.appid,callback:function(t){e.$set(e.mhaInfo,"appid",t)},expression:"mhaInfo.appid"}})],1),a("FormItem",[a("Button",{on:{click:function(t){return e.handleReset("mhaInfo")}}},[e._v("重置")]),a("Button",{staticStyle:{"margin-left":"150px"},attrs:{type:"primary"},on:{click:function(t){return e.changeModal("mhaInfo")}}},[e._v("录入Mha信息")]),a("Modal",{attrs:{title:"录入mha相关信息"},on:{"on-ok":function(t){return e.postMhaInfo("mhaInfo")}},model:{value:e.mhaInfo.modal,callback:function(t){e.$set(e.mhaInfo,"modal",t)},expression:"mhaInfo.modal"}},[a("p",[e._v(' 确定录入Mha: "'+e._s(e.mhaInfo.mhaName)+'" 吗？ 并且设置DC:"'+e._s(e.mhaInfo.dc)+'" BU:"'+e._s(e.mhaInfo.bu)+'" DAL Cluster:"'+e._s(e.mhaInfo.dalclustername)+'" appid"'+e._s(e.mhaInfo.appid)+'" ')])])],1)],1)],1)}),s=[],i={name:"mhaInit.vue",props:{mhaName:String,dc:String},data:function(){return{mhaInfo:{modal:!1,mhaName:this.mhaName,dc:this.dc,bu:"",dalclustername:"",appid:"",drcZoneList:this.constant.dcList},status:"",title:"",message:"",hasResp:!1,ruleOfMhaInfo:{mhaName:[{required:!0,message:"源集群名不能为空",trigger:"blur"}],dc:[{required:!0,message:"新集群名不能为空",trigger:"blur"}],bu:[{required:!0,message:"BU名不能为空",trigger:"blur"}],dalclustername:[{required:!0,message:"DAL Cluster名不能为空",trigger:"blur"}],appid:[{required:!0,message:"cluster appid不能为空",trigger:"blur"}]}}},methods:{postMhaInfo:function(e){var t=this,a=this;a.$refs[e].validate((function(e){e?(t.hasResp=!1,console.log("/api/drc/v1/mha/"),a.axios.post("/api/drc/v1/mha/",{buName:t.mhaInfo.bu,dalClusterName:t.mhaInfo.dalclustername,appid:t.mhaInfo.appid,mhaName:t.mhaInfo.mhaName,dc:t.mhaInfo.dc}).then((function(e){a.hasResp=!0,0===e.data.status?(a.status="success",a.title="Mha录入完成!",a.message=e.data.message):(a.status="error",a.title="Mha录入失败!",a.message=e.data.message)}))):a.$Message.error("仍有必填项未填!")}))},handleReset:function(e){this.$refs[e].resetFields()},changeMhaName:function(){this.$emit("mhaNameChanged",this.mhaInfo.mhaName)},changeDc:function(){this.$emit("dcChanged",this.mhaInfo.dc)},changeModal:function(e){var t=this;this.$refs[e].validate((function(e){e?t.mhaInfo.modal=!0:t.$Message.error("仍有必填项未填!")}))}}},c=i,l=a("2877"),d=Object(l["a"])(c,o,s,!1,null,"4e27d876",null),u=d.exports,m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.hasResp?a("Alert",{staticStyle:{width:"65%","margin-left":"250px"},attrs:{type:e.status,"show-icon":""}},[e._v(" "+e._s(e.title)+" "),a("span",{attrs:{slot:"desc"},domProps:{innerHTML:e._s(e.message)},slot:"desc"})]):e._e(),a("Form",{ref:"dbInfo",staticStyle:{float:"left","margin-top":"50px"},attrs:{model:e.dbInfo,rules:e.ruleMhaMachine,"label-width":250}},[a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"源集群名",prop:"mhaName"}},[a("Input",{attrs:{placeholder:"请输入源集群名"},on:{input:e.changeMhaName},model:{value:e.dbInfo.mhaName,callback:function(t){e.$set(e.dbInfo,"mhaName",t)},expression:"dbInfo.mhaName"}})],1),a("FormItem",{attrs:{label:"添加Ip",prop:"ip"}},[a("Input",{attrs:{number:"",placeholder:"请输入录入DB的IP"},model:{value:e.dbInfo.ip,callback:function(t){e.$set(e.dbInfo,"ip",t)},expression:"dbInfo.ip"}})],1),a("FormItem",{attrs:{label:"Port",prop:"port"}},[a("Input",{attrs:{placeholder:"请输入录入DB端口"},model:{value:e.dbInfo.port,callback:function(t){e.$set(e.dbInfo,"port",t)},expression:"dbInfo.port"}})],1),a("FormItem",{attrs:{label:"DB机房",prop:"idc"}},[a("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"选择机房区域"},on:{input:e.changeDc},model:{value:e.dbInfo.idc,callback:function(t){e.$set(e.dbInfo,"idc",t)},expression:"dbInfo.idc"}},e._l(e.selectOption.drcZoneList,(function(t){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1),a("FormItem",{attrs:{label:"UUID",prop:"uuid"}},[a("Input",{attrs:{placeholder:"请输入录入DB的uuid"},model:{value:e.dbInfo.uuid,callback:function(t){e.$set(e.dbInfo,"uuid",t)},expression:"dbInfo.uuid"}}),a("Button",{on:{click:e.queryUuid}},[e._v("连接查询")]),e.hasTest1?a("span",[a("Icon",{attrs:{type:e.testSuccess1?"ios-checkmark-circle":"ios-close-circle",color:e.testSuccess1?"green":"red"}}),e._v(" "+e._s(e.testSuccess1?"连接查询成功":"连接查询失败，请手动输入uuid")+" ")],1):e._e()],1),a("FormItem",{attrs:{label:"Master",prop:"master"}},[a("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"是否为Master"},model:{value:e.dbInfo.master,callback:function(t){e.$set(e.dbInfo,"master",t)},expression:"dbInfo.master"}},e._l(e.selectOption.isMaster,(function(t){return a("Option",{key:t.key,attrs:{value:t.value}},[e._v(e._s(t.key))])})),1)],1),a("FormItem",[a("Button",{attrs:{type:"primary"},on:{click:function(t){e.preCheckDbInfo("dbInfo")}}},[e._v("录入DB")]),a("br"),a("br")],1)],1),a("Modal",{attrs:{title:"录入左侧Mha Db信息"},on:{"on-ok":e.submitDbInfo},model:{value:e.dbInfo.modal,callback:function(t){e.$set(e.dbInfo,"modal",t)},expression:"dbInfo.modal"}},[a("p",[e._v("Mha: "+e._s(e.dbInfo.mhaName)+" ")]),a("p",[e._v(" db信息 [host: "+e._s(e.dbInfo.ip)+":"+e._s(e.dbInfo.port)+"]")]),a("p",[e._v(" db信息 [isMaster:"+e._s(e.dbInfo.master)+"]")]),a("p",[e._v(" db信息 [idc:"+e._s(e.dbInfo.idc)+"]")]),a("p",[e._v(" db信息 [uuid:"+e._s(e.dbInfo.uuid)+"]")])])],1)},h=[],p={name:"mhaConfig",props:{mhaName:String,dc:String},data:function(){var e=function(e,t,a){if(!/^[0-9]+$/.test(t))return a(new Error("请填写整数port"));a()},t=function(e,t,a){if(!/0|1/.test(t))return a(new Error("请填写整数port"));a()};return{result:"",status:"",title:"",message:"",hasResp:!1,hasTest1:!1,testSuccess1:!1,hasTest2:!1,testSuccess2:!1,dbInfo:{modal:!1,mhaName:this.mhaName,ip:"",port:"",idc:this.dc,uuid:"",master:1},selectOption:{isMaster:[{key:"Master",value:1},{key:"Slave",value:0}],drcZoneList:this.constant.dcList},ruleMhaMachine:{mhaName:[{required:!0,message:"mha集群名不能为空",trigger:"blur"}],ip:[{required:!0,message:"ip不能为空",trigger:"blur"}],port:[{required:!0,validator:e,trigger:"blur"}],idc:[{required:!0,message:"选择db区域",trigger:"blur"}],uuid:[{required:!0,message:"uuid不能为空",trigger:"blur"}],master:[{required:!0,validator:t,trigger:"blur"}]}}},methods:{queryUuid:function(){var e=this,t=this;console.log("/api/drc/v1/mha/uuid/"+this.dbInfo.mhaName+"/"+this.dbInfo.ip+"/"+this.dbInfo.port+"/"+this.dbInfo.master),t.axios.get("/api/drc/v1/mha/uuid/"+this.dbInfo.mhaName+"/"+this.dbInfo.ip+"/"+this.dbInfo.port+"/"+this.dbInfo.master).then((function(t){e.hasTest1=!0,0===t.data.status?(e.dbInfo.uuid=t.data.data,e.testSuccess1=!0):e.testSuccess1=!1}))},preCheckDbInfo:function(e){var t=this;this.$refs[e].validate((function(e){e?t.dbInfo.modal=!0:t.$Message.error("仍有必填项未填!")}))},submitDbInfo:function(){var e=this,t=this;t.axios.post("/api/drc/v1/access/mha/machineInfo",{mhaName:this.dbInfo.mhaName,master:this.dbInfo.master,mySQLInstance:{ip:this.dbInfo.ip,port:this.dbInfo.port,idc:this.dbInfo.idc,uuid:this.dbInfo.uuid}}).then((function(a){t.hasResp=!0,0===a.data.status?(t.status="success",t.title="mha:"+e.dbInfo.mhaName+"录入db成功!",t.message=a.data.message):(t.status="error",t.title="mha:"+e.dbInfo.mhaName+"录入db失败!",t.message=a.data.message)}))},changeMhaName:function(){this.$emit("mhaNameChanged",this.dbInfo.mhaName)},changeDc:function(){this.$emit("dcChanged",this.dbInfo.idc)}}},f=p,g=Object(l["a"])(f,m,h,!1,null,"1ab46500",null),b=g.exports,I=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Form",{staticStyle:{float:"left","margin-top":"50px"},attrs:{model:e.mhaInfo,"label-width":250}},[a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"源集群名",prop:"mhaName"}},[a("Row",[a("Col",{attrs:{span:"16"}},[a("Input",{attrs:{readonly:"",placeholder:"请输入源集群名"},model:{value:e.mhaInfo.mhaName,callback:function(t){e.$set(e.mhaInfo,"mhaName",t)},expression:"mhaInfo.mhaName"}})],1),a("Col",{attrs:{span:"5"}},[a("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",ghost:""},on:{click:function(t){return e.checkMySqlConfig(e.mhaInfo)}}},[e._v("配置校验")])],1)],1)],1),a("FormItem",{attrs:{label:"同步表",prop:"ip"}},[a("Row",[a("Col",{attrs:{span:"16"}},[a("Input",{attrs:{placeholder:"支持正则，默认全部"},model:{value:e.mhaInfo.nameFilter,callback:function(t){e.$set(e.mhaInfo,"nameFilter",t)},expression:"mhaInfo.nameFilter"}})],1),a("Col",{attrs:{span:"5"}},[a("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",ghost:""},on:{click:function(t){return e.checkMySqlTables(e.mhaInfo)}}},[e._v("表校验")])],1)],1)],1)],1),a("Modal",{attrs:{title:"预检测结果",width:"900px"},model:{value:e.configCheck.modal,callback:function(t){e.$set(e.configCheck,"modal",t)},expression:"configCheck.modal"}},[a("Form",{staticStyle:{width:"100%"}},[a("FormItem",{attrs:{label:"BINLOG [SHOULD BE: ON]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.binlogMode,callback:function(t){e.$set(e.configCheck,"binlogMode",t)},expression:"configCheck.binlogMode"}})],1),a("FormItem",{attrs:{label:"BINLOG_FORMAT  [SHOULD BE: ROW]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.binlogFormat,callback:function(t){e.$set(e.configCheck,"binlogFormat",t)},expression:"configCheck.binlogFormat"}})],1),a("FormItem",{attrs:{label:"binlogVersion1  [SHOULD BE: OFF]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.binlogVersion1,callback:function(t){e.$set(e.configCheck,"binlogVersion1",t)},expression:"configCheck.binlogVersion1"}})],1),a("FormItem",{attrs:{label:"BTD [SHOULD BE: writeSet]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.binlogTransactionDependency,callback:function(t){e.$set(e.configCheck,"binlogTransactionDependency",t)},expression:"configCheck.binlogTransactionDependency"}})],1),a("FormItem",{attrs:{label:"BinlogRowImage [SHOULD BE: FULL]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.binlogRowImage,callback:function(t){e.$set(e.configCheck,"binlogRowImage",t)},expression:"configCheck.binlogRowImage"}})],1),a("FormItem",{attrs:{label:"BTDHS [SHOULD BE: 100k]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.binlogTransactionDependencyHistorySize,callback:function(t){e.$set(e.configCheck,"binlogTransactionDependencyHistorySize",t)},expression:"configCheck.binlogTransactionDependencyHistorySize"}})],1),a("FormItem",{attrs:{label:"GTID_MODE [SHOULD BE: ON]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.gtidMode,callback:function(t){e.$set(e.configCheck,"gtidMode",t)},expression:"configCheck.gtidMode"}})],1),a("FormItem",{attrs:{label:"DRC系统表数量 [SHOULD BE: 1/2]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.drcTables,callback:function(t){e.$set(e.configCheck,"drcTables",t)},expression:"configCheck.drcTables"}})],1),a("FormItem",{attrs:{label:"自增步长"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.autoIncrementStep,callback:function(t){e.$set(e.configCheck,"autoIncrementStep",t)},expression:"configCheck.autoIncrementStep"}})],1),a("FormItem",{attrs:{label:"自增offSet"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.autoIncrementOffset,callback:function(t){e.$set(e.configCheck,"autoIncrementOffset",t)},expression:"configCheck.autoIncrementOffset"}})],1),a("FormItem",{attrs:{label:"DRC3对帐号 [SHOULD BE: three accounts ready]"}},[a("Input",{attrs:{readonly:""},model:{value:e.configCheck.drcAccounts,callback:function(t){e.$set(e.configCheck,"drcAccounts",t)},expression:"configCheck.drcAccounts"}})],1)],1)],1),a("Modal",{attrs:{title:"表检验",width:"1000px"},model:{value:e.tablesCheckModal,callback:function(t){e.tablesCheckModal=t},expression:"tablesCheckModal"}},[a("Card",[a("div",{attrs:{slot:"title"},slot:"title"},[a("span",[e._v("相关表")])]),a("Table",{attrs:{stripe:"",columns:e.columns,data:e.dataWithPage,border:""}}),a("div",{staticStyle:{"text-align":"center",margin:"16px 0"}},[a("Page",{attrs:{transfer:!0,total:e.tableData.length,current:e.current,"page-size-opts":e.pageSizeOpts,"page-size":this.size,"show-total":"","show-sizer":"","show-elevator":""},on:{"update:current":function(t){e.current=t},"on-page-size-change":e.handleChangeSize}})],1)],1)],1)],1)},v=[],k=(a("fb6a"),a("2909")),y={name:"preCheck",props:{mhaName:String,dc:String},data:function(){return{mhaInfo:{mhaName:this.mhaName,nameFilter:""},configCheck:{binlogMode:"",binlogFormat:"",binlogVersion1:"",binlogTransactionDependency:"",binlogRowImage:"",binlogTransactionDependencyHistorySize:0,gtidMode:"",drcTables:0,autoIncrementStep:0,autoIncrementOffset:0,drcAccounts:"",modal:!1},tablesCheckModal:!1,tableData:[],columns:[{title:"序号",width:75,align:"center",fixed:"left",render:function(e,t){return e("span",t.index+1)}},{title:"库名",key:"schema"},{title:"表名",key:"table"},{title:"无OnUpdate字段",key:"noOnUpdateColumn",width:100,align:"center",render:function(e,t){var a=t.row,n=a.noOnUpdateColumn?"True":"";return e("span",n)}},{title:"无OnUpdate字段索引",key:"noOnUpdateKey",width:100,align:"center",render:function(e,t){var a=t.row,n=a.noOnUpdateKey?"True":"";return e("span",n)}},{title:"无PkUk",key:"noPkUk",width:100,align:"center",render:function(e,t){var a=t.row,n=a.noPkUk?"True":"";return e("span",n)}},{title:"支持Truncate",key:"approveTruncate",width:100,align:"center",render:function(e,t){var a=t.row,n=a.approveTruncate?"True":"";return e("span",n)}},{title:"存在DefaultTime为0",key:"timeDefaultZero",width:100,align:"center",render:function(e,t){var a=t.row,n=a.timeDefaultZero?"True":"";return e("span",n)}},{title:"结果",width:100,align:"center",render:function(e,t){var a=t.row,n=a.noOnUpdateColumn||a.noOnUpdateKey||a.noPkUk||a.approveTruncate||a.timeDefaultZero,r=n?"volcano":"green",o=n?"错误":"正常";return e("Tag",{props:{color:r}},o)}}],total:0,current:1,size:5,pageSizeOpts:[5,10,20,100]}},computed:{dataWithPage:function(){var e=this.tableData,t=this.current*this.size-this.size,a=t+this.size;return Object(k["a"])(e).slice(t,a)}},methods:{checkMySqlConfig:function(e){var t=this;this.$Spin.show({render:function(e){return e("div",[e("Icon",{class:"demo-spin-icon-load",props:{size:18}}),e("div","检测中，请稍等...")])}}),this.axios.get("/api/drc/v1/build/preCheckMySqlConfig?mha="+this.mhaInfo.mhaName).then((function(e){console.log(e);var a=e.data.data;console.log(a),t.configCheck.binlogMode=a.binlogMode,t.configCheck.binlogFormat=a.binlogFormat,t.configCheck.binlogVersion1=a.binlogVersion1,t.configCheck.binlogTransactionDependency=a.binlogTransactionDependency,t.configCheck.binlogRowImage=a.binlogRowImage,t.configCheck.binlogTransactionDependencyHistorySize=a.binlogTransactionDependencyHistorySize,t.configCheck.gtidMode=a.gtidMode,t.configCheck.drcTables=a.drcTables,t.configCheck.autoIncrementStep=a.autoIncrementStep,t.configCheck.autoIncrementOffset=a.autoIncrementOffset,t.configCheck.drcAccounts=a.drcAccounts,t.$Spin.hide(),t.configCheck.modal=!0}))},checkMySqlTables:function(e){var t=this;this.$Spin.show({render:function(e){return e("div",[e("Icon",{class:"demo-spin-icon-load",props:{size:18}}),e("div","检测中，请稍等...")])}}),setTimeout((function(){t.$Spin.hide()}),8e4),this.axios.get("/api/drc/v1/build/preCheckMySqlTables?mha="+this.mhaInfo.mhaName+"&nameFilter="+this.mhaInfo.nameFilter).then((function(e){t.tableData=e.data.data,t.$Spin.hide(),t.tablesCheckModal=!0}))},handleChangeSize:function(e){this.size=e}}},x=y,C=Object(l["a"])(x,I,v,!1,null,"7e6c2dae",null),S=C.exports,M=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Row",[a("Form",{ref:"drc1",staticStyle:{float:"left","margin-top":"50px"},attrs:{model:e.drc,"label-width":250}},[a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"集群名",prop:"mhaName"}},[a("Input",{attrs:{readonly:"",placeholder:"请输入集群名"},model:{value:e.drc.mhaName,callback:function(t){e.$set(e.drc,"mhaName",t)},expression:"drc.mhaName"}})],1),a("FormItem",{attrs:{label:"选择Replicator",prop:"replicator"}},[a("Select",{staticStyle:{width:"200px"},attrs:{multiple:"",placeholder:"选择集群Replicator"},model:{value:e.drc.replicators,callback:function(t){e.$set(e.drc,"replicators",t)},expression:"drc.replicators"}},e._l(e.drc.replicatorList,(function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])})),1)],1),a("FormItem",{attrs:{label:"选择Messenger",prop:"messenger"}},[a("Select",{staticStyle:{width:"200px"},attrs:{multiple:"",placeholder:"选择集群Messenger"},model:{value:e.drc.messengers,callback:function(t){e.$set(e.drc,"messengers",t)},expression:"drc.messengers"}},e._l(e.drc.messengerList,(function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])})),1)],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"mq配置"}},[a("Button",{attrs:{type:"primary",ghost:""},on:{click:e.goToMqConfigs}},[e._v("mq配置")])],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"设置executedGtid"}},[a("Input",{attrs:{placeholder:"请输入源集群executedGtid，不填自动获取本侧gtid"},model:{value:e.drc.gtidExecuted,callback:function(t){e.$set(e.drc,"gtidExecuted",t)},expression:"drc.gtidExecuted"}}),e.hasTest1?a("span",[a("Icon",{attrs:{type:e.testSuccess1?"ios-checkmark-circle":"ios-close-circle",color:e.testSuccess1?"green":"red"}}),e._v(" "+e._s(e.testSuccess1?"连接查询成功":"连接查询失败，请手动输入gtid")+" ")],1):e._e()],1)],1)],1),a("Form",{staticStyle:{"margin-top":"50px"},attrs:{"label-width":250}},[a("FormItem",[a("Row",[a("Col",{attrs:{span:"6"}},[a("Button",{on:{click:function(t){return e.handleReset("drc1")}}},[e._v("重置")])],1),a("Col",{attrs:{span:"6"}},[a("Button",{attrs:{type:"primary"},on:{click:function(t){e.preCheckConfigure()}}},[e._v("提交")])],1)],1)],1),a("Modal",{attrs:{title:"确认配置信息",width:"900px"},on:{"on-ok":e.submitConfig},model:{value:e.drc.reviewModal,callback:function(t){e.$set(e.drc,"reviewModal",t)},expression:"drc.reviewModal"}},[a("Form",{staticStyle:{width:"80%"}},[a("FormItem",{attrs:{label:"集群名"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.mhaName,callback:function(t){e.$set(e.drc,"mhaName",t)},expression:"drc.mhaName"}})],1),a("FormItem",{attrs:{label:"集群Replicator"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.replicators,callback:function(t){e.$set(e.drc,"replicators",t)},expression:"drc.replicators"}})],1),a("FormItem",{attrs:{label:"集群Messenger"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.messengers,callback:function(t){e.$set(e.drc,"messengers",t)},expression:"drc.messengers"}})],1),a("FormItem",{attrs:{label:"Messenger集群executedGtid"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.gtidExecuted,callback:function(t){e.$set(e.drc,"gtidExecuted",t)},expression:"drc.gtidExecuted"}})],1)],1)],1),a("Modal",{attrs:{title:"配置结果",width:"1200px"},model:{value:e.drc.resultModal,callback:function(t){e.$set(e.drc,"resultModal",t)},expression:"drc.resultModal"}},[a("Form",{staticStyle:{width:"100%"}},[a("FormItem",{attrs:{label:"集群配置"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.result,callback:function(t){e.result=t},expression:"result"}})],1)],1)],1),a("Modal",{attrs:{title:"存在一对多共用运行配置请确认",width:"900px"},on:{"on-ok":e.reviewConfigure},model:{value:e.drc.warnModal,callback:function(t){e.$set(e.drc,"warnModal",t)},expression:"drc.warnModal"}},[a("label",{staticStyle:{color:"black"}},[e._v("共用replicator配置的集群: ")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.drc.conflictMha,expression:"drc.conflictMha"}],domProps:{value:e.drc.conflictMha},on:{input:function(t){t.target.composing||e.$set(e.drc,"conflictMha",t.target.value)}}}),a("Divider"),a("div",[a("p",{staticStyle:{color:"red"}},[e._v("线上一对多replicator配置")]),a("ul",e._l(e.drc.replicators.share,(function(t){return a("ol",{key:t},[e._v(e._s(t))])})),0)]),a("Divider"),a("div",[a("p",{staticStyle:{color:"black"}},[e._v("修改后replicator配置")]),a("ul",e._l(e.drc.replicators.conflictCurrent,(function(t){return a("ol",{key:t},[e._v(e._s(t))])})),0)])],1)],1)],1)},w=[],_=(a("4160"),a("159b"),{name:"drcConfig.vue",props:{mhaName:String,dc:String},data:function(){return{hasTest1:!1,testSuccess1:!1,result:!1,drc:{reviewModal:!1,warnModal:!1,mhaName:this.mhaName,gtidExecuted:"",replicators:{},messengers:{},replicatorList:{},messengerList:{}}}},methods:{getResources:function(){var e=this;this.axios.get("/api/drc/v1/meta/mhas/"+this.drc.mhaName+"/resources/all/types/R").then((function(t){console.log(t.data),e.drc.replicatorList=[],t.data.data.forEach((function(t){return e.drc.replicatorList.push(t)}))})),this.axios.get("/api/drc/v1/meta/mhas/"+this.drc.mhaName+"/resources/all/types/A").then((function(t){console.log(t.data),e.drc.messengerList=[],t.data.data.forEach((function(t){return e.drc.messengerList.push(t)}))}))},getResourcesInUse:function(){var e=this;this.axios.get("/api/drc/v1/meta/resources/using/types/R?localMha="+this.drc.mhaName).then((function(t){console.log(e.drc.mhaName+" replicators "+t.data.data),e.drc.replicators=[],t.data.data.forEach((function(t){return e.drc.replicators.push(t)}))})),this.axios.get("/api/drc/v1/meta/resources/using/types/A?localMha="+this.drc.mhaName).then((function(t){console.log(e.drc.mhaName+" messengers "+t.data.data),e.drc.messengers=[],t.data.data.forEach((function(t){return e.drc.messengers.push(t)}))}))},goToMqConfigs:function(){console.log("go to change mq config for "+this.drc.mhaName),this.$router.push({path:"/mqConfigs",query:{mhaName:this.drc.mhaName}})},handleReset:function(e){this.$refs[e].resetFields()},preCheckConfigure:function(){var e=this;this.axios.post("/api/drc/v1/build/replicatorIps/check",{mhaName:this.drc.mhaName,replicatorIps:this.drc.replicators,messengerIps:this.drc.messengers,gtidExecuted:this.drc.gtidExecuted}).then((function(t){var a=t.data.data;0===a.status?e.drc.reviewModal=!0:1===a.status?(e.drc.replicators.share=a.workingReplicatorIps,e.drc.replicators.conflictCurrent=e.drc.replicators,e.drc.conflictMha=a.conflictMha,e.drc.warnModal=!0):window.alert("config preCheck fail")}))},submitConfig:function(){var e=this;this.axios.post("/api/drc/v1/build/config",{mhaName:this.drc.mhaName,replicatorIps:this.drc.replicators,messengerIps:this.drc.messengers,gtidExecuted:this.drc.gtidExecuted}).then((function(t){console.log(t.data),e.result=t.data.data,e.drc.reviewModal=!1,e.drc.resultModal=!0}))},reviewConfigure:function(){this.drc.reviewModal=!0}},created:function(){this.getResources(),this.getResourcesInUse()}}),N=_,$=Object(l["a"])(N,M,w,!1,null,"924d01c8",null),F=$.exports,D=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"margin-top":"100px"}},[a("Card",{staticStyle:{"margin-left":"250px",width:"650px"}},[a("div",{staticStyle:{"text-align":"center"}},[a("h3",[e._v("已完成DRC搭建流程！")])])])],1)},O=[],T={name:"complete",data:function(){return{}},methods:{}},R=T,B=Object(l["a"])(R,D,O,!1,null,"2a3c7d4b",null),L=B.exports,E={name:"buildMhaMessenger.vue",components:{mhaInit:u,mhaConfig:b,preCheck:S,drcConfig:F,complete:L},data:function(){return{current:0,sharedInfo:{mhaName:this.$route.query.mhaName,dc:""}}},methods:{jumpTo:function(e){this.current=e,this.hasResp=!1},next:function(){this.current=this.current+1,this.hasResp=!1},prev:function(){this.current=this.current-1,this.hasResp=!1},updateMhaName:function(e){this.sharedInfo.mhaName=e},updateDc:function(e){this.sharedInfo.dc=e}},created:function(){var e=this.$route.query.step;"undefined"===typeof e?console.log("curStep undefined, do nothing"):this.jumpTo(Number(e))}},U=E,q=Object(l["a"])(U,n,r,!1,null,"58376696",null);t["default"]=q.exports}}]);
//# sourceMappingURL=chunk-2d0db208.5a741527.js.map