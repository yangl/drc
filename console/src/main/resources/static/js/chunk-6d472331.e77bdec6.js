(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d472331"],{"159b":function(e,t,a){var r=a("da84"),l=a("fdbc"),s=a("17c2"),c=a("9112");for(var o in l){var d=r[o],i=d&&d.prototype;if(i&&i.forEach!==s)try{c(i,"forEach",s)}catch(n){i.forEach=s}}},"17c2":function(e,t,a){"use strict";var r=a("b727").forEach,l=a("a640"),s=a("ae40"),c=l("forEach"),o=s("forEach");e.exports=c&&o?[].forEach:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}},"39ba":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.hasResp?a("Alert",{staticStyle:{width:"65%","margin-left":"250px"},attrs:{type:e.status,"show-icon":""}},[e._v(" "+e._s(e.title)+" "),a("span",{attrs:{slot:"desc"},domProps:{innerHTML:e._s(e.message)},slot:"desc"})]):e._e(),a("Row",[a("i-col",{attrs:{span:"12"}},[a("Form",{ref:"drc1",staticStyle:{float:"left","margin-top":"50px"},attrs:{model:e.drc,rules:e.ruleDrc,"label-width":250}},[a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"源集群名",prop:"oldClusterName"}},[a("Input",{attrs:{placeholder:"请输入源集群名"},on:{input:e.changeOld},model:{value:e.drc.oldClusterName,callback:function(t){e.$set(e.drc,"oldClusterName",t)},expression:"drc.oldClusterName"}})],1),a("FormItem",{attrs:{label:"选择Replicator",prop:"replicator"}},[a("Select",{staticStyle:{width:"200px"},attrs:{multiple:"",placeholder:"选择源集群Replicator"},model:{value:e.drc.replicators.old,callback:function(t){e.$set(e.drc.replicators,"old",t)},expression:"drc.replicators.old"}},e._l(e.drc.replicatorlist.old,(function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])})),1)],1),a("FormItem",{attrs:{label:"选择Applier",prop:"applier"}},[a("Select",{staticStyle:{width:"200px"},attrs:{multiple:"",placeholder:"选择源集群Applier"},model:{value:e.drc.appliers.old,callback:function(t){e.$set(e.drc.appliers,"old",t)},expression:"drc.appliers.old"}},e._l(e.drc.applierlist.old,(function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])})),1)],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"设置ApplierTargetName",prop:"oldTargetName"}},[a("Input",{attrs:{placeholder:"请输入设置ApplierTargetName，不填默认为本侧dalcluster_name"},model:{value:e.drc.oldTargetName,callback:function(t){e.$set(e.drc,"oldTargetName",t)},expression:"drc.oldTargetName"}})],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"设置includedDbs",prop:"oldIncludedDbs"}},[a("Input",{attrs:{placeholder:"请输入DB列表，以逗号分隔，不填默认为全部DB"},model:{value:e.drc.oldIncludedDbs,callback:function(t){e.$set(e.drc,"oldIncludedDbs",t)},expression:"drc.oldIncludedDbs"}})],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"配置同步对象",prop:"oldNameFilter"}},[a("Input",{attrs:{type:"textarea",autosize:!0,placeholder:"请输入表名，支持正则表达式，以逗号分隔，不填默认为全部表"},model:{value:e.drc.oldNameFilter,callback:function(t){e.$set(e.drc,"oldNameFilter",t)},expression:"drc.oldNameFilter"}})],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"配置表名映射",prop:"oldNameMapping"}},[a("Input",{attrs:{type:"textarea",autosize:!0,placeholder:"请输入映射关系，如：srcDb1.srcTable1,destDb1.destTable1;srcDb2.srcTable2,destDb2.destTable2"},model:{value:e.drc.oldNameMapping,callback:function(t){e.$set(e.drc,"oldNameMapping",t)},expression:"drc.oldNameMapping"}})],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"设置executedGtid"}},[a("Input",{attrs:{placeholder:"请输入源集群executedGtid，不填自动获取本侧gtid"},model:{value:e.drc.oldExecutedGtid,callback:function(t){e.$set(e.drc,"oldExecutedGtid",t)},expression:"drc.oldExecutedGtid"}}),a("Button",{on:{click:e.queryNewMhaMachineGtid}},[e._v("查询对侧gtid")]),e.hasTest1?a("span",[a("Icon",{attrs:{type:e.testSuccess1?"ios-checkmark-circle":"ios-close-circle",color:e.testSuccess1?"green":"red"}}),e._v(" "+e._s(e.testSuccess1?"连接查询成功":"连接查询失败，请手动输入gtid")+" ")],1):e._e()],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"设置applyMode"}},[a("Select",{staticStyle:{width:"200px"},model:{value:e.drc.oldApplyMode,callback:function(t){e.$set(e.drc,"oldApplyMode",t)},expression:"drc.oldApplyMode"}},e._l(e.applyModeList,(function(t){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1)],1)],1),a("i-col",{attrs:{span:"12"}},[a("Form",{ref:"drc2",staticStyle:{float:"left","margin-top":"50px"},attrs:{model:e.drc,rules:e.ruleDrc,"label-width":250}},[a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"新集群名",prop:"newClusterName"}},[a("Input",{attrs:{placeholder:"请输入新集群名"},on:{input:e.changeNew},model:{value:e.drc.newClusterName,callback:function(t){e.$set(e.drc,"newClusterName",t)},expression:"drc.newClusterName"}})],1),a("FormItem",{attrs:{label:"选择Replicator",prop:"replicator"}},[a("Select",{staticStyle:{width:"200px"},attrs:{multiple:"",placeholder:"选择新集群Replicator"},model:{value:e.drc.replicators.new,callback:function(t){e.$set(e.drc.replicators,"new",t)},expression:"drc.replicators.new"}},e._l(e.drc.replicatorlist.new,(function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])})),1)],1),a("FormItem",{attrs:{label:"选择Applier",prop:"applier"}},[a("Select",{staticStyle:{width:"200px"},attrs:{multiple:"",placeholder:"选择新集群Applier"},model:{value:e.drc.appliers.new,callback:function(t){e.$set(e.drc.appliers,"new",t)},expression:"drc.appliers.new"}},e._l(e.drc.applierlist.new,(function(t){return a("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])})),1)],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"设置ApplierTargetName",prop:"newTargetName"}},[a("Input",{attrs:{placeholder:"请输入设置ApplierTargetName，不填默认为dalcluster_name"},model:{value:e.drc.newTargetName,callback:function(t){e.$set(e.drc,"newTargetName",t)},expression:"drc.newTargetName"}})],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"设置includedDbs",prop:"newIncludedDbs"}},[a("Input",{attrs:{placeholder:"请输入DB列表，以逗号分隔，不填默认全部DB"},model:{value:e.drc.newIncludedDbs,callback:function(t){e.$set(e.drc,"newIncludedDbs",t)},expression:"drc.newIncludedDbs"}})],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"配置同步对象",prop:"newNameFilter"}},[a("Input",{attrs:{type:"textarea",autosize:!0,placeholder:"请输入表名，支持正则表达式，以逗号分隔，不填默认为全部表"},model:{value:e.drc.newNameFilter,callback:function(t){e.$set(e.drc,"newNameFilter",t)},expression:"drc.newNameFilter"}})],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"配置表名映射",prop:"newNameMapping"}},[a("Input",{attrs:{type:"textarea",autosize:!0,placeholder:"请输入映射关系，如：srcDb1.srcTable1,destDb1.destTable1;srcDb2.srcTable2,destDb2.destTable2"},model:{value:e.drc.newNameMapping,callback:function(t){e.$set(e.drc,"newNameMapping",t)},expression:"drc.newNameMapping"}})],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"设置executedGtid"}},[a("Input",{attrs:{placeholder:"请输入新集群executedGtid，不填自动获取本侧gtid"},model:{value:e.drc.newExecutedGtid,callback:function(t){e.$set(e.drc,"newExecutedGtid",t)},expression:"drc.newExecutedGtid"}}),a("Button",{on:{click:e.queryOldMhaMachineGtid}},[e._v("查询对侧gtid")]),e.hasTest2?a("span",[a("Icon",{attrs:{type:e.testSuccess2?"ios-checkmark-circle":"ios-close-circle",color:e.testSuccess2?"green":"red"}}),e._v(" "+e._s(e.testSuccess2?"连接查询成功":"连接查询失败，请手动输入gtid")+" ")],1):e._e()],1),a("FormItem",{staticStyle:{width:"600px"},attrs:{label:"设置applyMode"}},[a("Select",{staticStyle:{width:"200px"},model:{value:e.drc.newApplyMode,callback:function(t){e.$set(e.drc,"newApplyMode",t)},expression:"drc.newApplyMode"}},e._l(e.applyModeList,(function(t){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1)],1)],1)],1),a("Form",{staticStyle:{"margin-top":"50px"},attrs:{"label-width":250}},[a("FormItem",[a("Button",{on:{click:function(t){e.handleReset("drc1"),e.handleReset("drc2")}}},[e._v("重置")]),a("br"),a("br"),a("Button",{attrs:{type:"primary"},on:{click:function(t){e.preCheckConfigure()}}},[e._v("提交")])],1),a("Modal",{attrs:{title:"确认配置信息",width:"900px"},on:{"on-ok":e.submitConfig},model:{value:e.drc.reviewModal,callback:function(t){e.$set(e.drc,"reviewModal",t)},expression:"drc.reviewModal"}},[a("Row",{attrs:{gutter:"5px"}},[a("i-col",{attrs:{span:"12"}},[a("Form",{staticStyle:{width:"80%"}},[a("FormItem",{attrs:{label:"源集群名"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.oldClusterName,callback:function(t){e.$set(e.drc,"oldClusterName",t)},expression:"drc.oldClusterName"}})],1),a("FormItem",{attrs:{label:"源集群端Replicator"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.replicators.old,callback:function(t){e.$set(e.drc.replicators,"old",t)},expression:"drc.replicators.old"}})],1),a("FormItem",{attrs:{label:"源集群端Applier"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.appliers.old,callback:function(t){e.$set(e.drc.appliers,"old",t)},expression:"drc.appliers.old"}})],1),a("FormItem",{attrs:{label:"源ApplierTargetName"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.oldTargetName,callback:function(t){e.$set(e.drc,"oldTargetName",t)},expression:"drc.oldTargetName"}})],1),a("FormItem",{attrs:{label:"源集群端includedDbs"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.oldIncludedDbs,callback:function(t){e.$set(e.drc,"oldIncludedDbs",t)},expression:"drc.oldIncludedDbs"}})],1),a("FormItem",{attrs:{label:"源集群端同步对象"}},[a("Input",{attrs:{type:"textarea",autosize:!0,readonly:""},model:{value:e.drc.oldNameFilter,callback:function(t){e.$set(e.drc,"oldNameFilter",t)},expression:"drc.oldNameFilter"}})],1),a("FormItem",{attrs:{label:"源集群端表名映射"}},[a("Input",{attrs:{type:"textarea",autosize:!0,readonly:""},model:{value:e.drc.oldNameMapping,callback:function(t){e.$set(e.drc,"oldNameMapping",t)},expression:"drc.oldNameMapping"}})],1),a("FormItem",{attrs:{label:"源集群端executedGtid"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.oldExecutedGtid,callback:function(t){e.$set(e.drc,"oldExecutedGtid",t)},expression:"drc.oldExecutedGtid"}})],1),a("FormItem",{attrs:{label:"源集群端applyMode"}},[a("Select",{attrs:{disabled:""},model:{value:e.drc.oldApplyMode,callback:function(t){e.$set(e.drc,"oldApplyMode",t)},expression:"drc.oldApplyMode"}},e._l(e.applyModeList,(function(t){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1)],1)],1),a("i-col",{attrs:{span:"12"}},[a("Form",{staticStyle:{width:"80%"}},[a("FormItem",{attrs:{label:"新集群名"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.newClusterName,callback:function(t){e.$set(e.drc,"newClusterName",t)},expression:"drc.newClusterName"}})],1),a("FormItem",{attrs:{label:"新集群端Replicator"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.replicators.new,callback:function(t){e.$set(e.drc.replicators,"new",t)},expression:"drc.replicators.new"}})],1),a("FormItem",{attrs:{label:"新集群端Applier"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.appliers.new,callback:function(t){e.$set(e.drc.appliers,"new",t)},expression:"drc.appliers.new"}})],1),a("FormItem",{attrs:{label:"新ApplierTargetName"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.newTargetName,callback:function(t){e.$set(e.drc,"newTargetName",t)},expression:"drc.newTargetName"}})],1),a("FormItem",{attrs:{label:"新集群端includedDbs"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.newIncludedDbs,callback:function(t){e.$set(e.drc,"newIncludedDbs",t)},expression:"drc.newIncludedDbs"}})],1),a("FormItem",{attrs:{label:"新集群端同步对象"}},[a("Input",{attrs:{type:"textarea",autosize:!0,readonly:""},model:{value:e.drc.newNameFilter,callback:function(t){e.$set(e.drc,"newNameFilter",t)},expression:"drc.newNameFilter"}})],1),a("FormItem",{attrs:{label:"新集群端表名映射"}},[a("Input",{attrs:{type:"textarea",autosize:!0,readonly:""},model:{value:e.drc.newNameMapping,callback:function(t){e.$set(e.drc,"newNameMapping",t)},expression:"drc.newNameMapping"}})],1),a("FormItem",{attrs:{label:"新集群端executedGtid"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.drc.newExecutedGtid,callback:function(t){e.$set(e.drc,"newExecutedGtid",t)},expression:"drc.newExecutedGtid"}})],1),a("FormItem",{attrs:{label:"新集群端applyMode"}},[a("Select",{attrs:{disabled:""},model:{value:e.drc.newApplyMode,callback:function(t){e.$set(e.drc,"newApplyMode",t)},expression:"drc.newApplyMode"}},e._l(e.applyModeList,(function(t){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1)],1)],1)],1)],1),a("Modal",{attrs:{title:"配置结果",width:"1200px"},model:{value:e.drc.resultModal,callback:function(t){e.$set(e.drc,"resultModal",t)},expression:"drc.resultModal"}},[a("Form",{staticStyle:{width:"100%"}},[a("FormItem",{attrs:{label:"集群配置"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:1,maxRows:30},readonly:""},model:{value:e.result,callback:function(t){e.result=t},expression:"result"}})],1)],1)],1),a("Modal",{attrs:{title:"存在一对多共用运行配置请确认",width:"900px"},on:{"on-ok":e.reviewConfigure},model:{value:e.drc.warnModal,callback:function(t){e.$set(e.drc,"warnModal",t)},expression:"drc.warnModal"}},[a("label",{staticStyle:{color:"black"}},[e._v("共用replicator配置的集群: ")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.drc.conflictMha,expression:"drc.conflictMha"}],domProps:{value:e.drc.conflictMha},on:{input:function(t){t.target.composing||e.$set(e.drc,"conflictMha",t.target.value)}}}),a("Divider"),a("div",[a("p",{staticStyle:{color:"red"}},[e._v("线上一对多replicator配置")]),a("ul",e._l(e.drc.replicators.share,(function(t){return a("ol",{key:t},[e._v(e._s(t))])})),0)]),a("Divider"),a("div",[a("p",{staticStyle:{color:"black"}},[e._v("修改后replicator配置")]),a("ul",e._l(e.drc.replicators.conflictCurrent,(function(t){return a("ol",{key:t},[e._v(e._s(t))])})),0)])],1)],1)],1)},l=[],s=(a("4160"),a("159b"),{name:"drc",props:{oldClusterName:String,newClusterName:String,env:String},data:function(){return{result:"",status:"",title:"",message:"",hasResp:!1,hasTest1:!1,testSuccess1:!1,hasTest2:!1,testSuccess2:!1,applyModeList:[{value:0,label:"SET_GTID (default)"},{value:1,label:"TRANSACTION_TABLE"}],drc:{reviewModal:!1,warnModal:!1,resultModal:!1,oldClusterName:this.oldClusterName,newClusterName:this.newClusterName,oldTargetName:this.oldTargetName,newTargetName:this.newTargetName,oldIncludedDbs:"",newIncludedDbs:"",oldNameFilter:"",oldNameMapping:"",newNameFilter:"",newNameMapping:"",oldExecutedGtid:"",newExecutedGtid:"",oldApplyMode:0,newApplyMode:0,env:this.env,needread:!1,columns:[{type:"selection",width:60,align:"center"},{title:"DB名",key:"name"}],dbNames:[],selectedDbs:[],envList:[{value:"product",label:"PRODUCT"},{value:"fat",label:"FAT"},{value:"lpt",label:"LPT"},{value:"uat",label:"UAT"}],replicatorlist:{old:[],new:[]},conflictMha:"",replicators:{old:[],new:[],share:[],conflictCurrent:[]},replicator:{},searchReplicatorIp:"",usedReplicatorPorts:"",applierlist:{old:[],new:[]},appliers:{old:[],new:[]},previewMeta:""},ruleDrc:{oldClusterName:[{required:!0,message:"源集群名不能为空",trigger:"blur"}],newClusterName:[{required:!0,message:"新集群名不能为空",trigger:"blur"}],env:[{required:!0,message:"环境不能为空",trigger:"blur"}],replicator:[{required:!0,message:"replicator不能为空",trigger:"blur"}],applier:[{required:!0,message:"applier不能为空",trigger:"blur"}]}}},methods:{handleReset:function(e){this.$refs[e].resetFields()},getResourcesInOld:function(){var e=this;this.axios.get("/api/drc/v1/meta/mhas/"+this.drc.oldClusterName+"/resources/all/types/R").then((function(t){console.log(t.data),e.drc.replicatorlist.old=[],t.data.data.forEach((function(t){return e.drc.replicatorlist.old.push(t)}))})),this.axios.get("/api/drc/v1/meta/mhas/"+this.drc.oldClusterName+"/resources/all/types/A").then((function(t){console.log(t.data),e.drc.applierlist.old=[],t.data.data.forEach((function(t){return e.drc.applierlist.old.push(t)}))}))},getResourcesInUseInOld:function(){var e=this;this.axios.get("/api/drc/v1/meta/resources/using/types/R?localMha="+this.drc.oldClusterName).then((function(t){console.log(e.drc.oldClusterName+" replicators "+t.data.data),e.drc.replicators.old=[],t.data.data.forEach((function(t){return e.drc.replicators.old.push(t)}))})),this.axios.get("/api/drc/v1/meta/resources/using/types/A?localMha="+this.drc.oldClusterName+"&remoteMha="+this.drc.newClusterName).then((function(t){console.log(e.drc.oldClusterName+" request "+e.drc.newClusterName+" appliers "+t.data.data),e.drc.appliers.old=[],t.data.data.forEach((function(t){return e.drc.appliers.old.push(t)}))})),this.axios.get("/api/drc/v1/meta/targetName?localMha="+this.drc.oldClusterName+"&remoteMha="+this.drc.newClusterName).then((function(t){console.log(e.drc.oldClusterName+" request "+e.drc.newClusterName+" targetName "+t.data.data),e.drc.oldTargetName=t.data.data})),this.axios.get("/api/drc/v1/meta/includeddbs?localMha="+this.drc.oldClusterName+"&remoteMha="+this.drc.newClusterName).then((function(t){console.log(e.drc.oldClusterName+" request "+e.drc.newClusterName+" includedbs "+t.data.data),e.drc.oldIncludedDbs=t.data.data})),this.axios.get("/api/drc/v1/meta/namefilter?localMha="+this.drc.oldClusterName+"&remoteMha="+this.drc.newClusterName).then((function(t){console.log(e.drc.oldClusterName+" request "+e.drc.newClusterName+" namefilter "+t.data.data),e.drc.oldNameFilter=t.data.data})),this.axios.get("/api/drc/v1/meta/namemapping?localMha="+this.drc.oldClusterName+"&remoteMha="+this.drc.newClusterName).then((function(t){console.log(e.drc.oldClusterName+" request "+e.drc.newClusterName+" namemapping "+t.data.data),e.drc.oldNameMapping=t.data.data})),this.axios.get("/api/drc/v1/meta/applymode?localMha="+this.drc.oldClusterName+"&remoteMha="+this.drc.newClusterName).then((function(t){console.log(e.drc.oldClusterName+" request "+e.drc.newClusterName+" applymode "+t.data.data),e.drc.oldApplyMode=t.data.data}))},getResourcesInNew:function(){var e=this;this.axios.get("/api/drc/v1/meta/mhas/"+this.drc.newClusterName+"/resources/all/types/R").then((function(t){console.log(t.data),e.drc.replicatorlist.new=[],t.data.data.forEach((function(t){return e.drc.replicatorlist.new.push(t)}))})),this.axios.get("/api/drc/v1/meta/mhas/"+this.drc.newClusterName+"/resources/all/types/A").then((function(t){console.log(t.data),e.drc.applierlist.new=[],t.data.data.forEach((function(t){return e.drc.applierlist.new.push(t)}))}))},getResourcesInUseInNew:function(){var e=this;this.axios.get("/api/drc/v1/meta/resources/using/types/R?localMha="+this.drc.newClusterName).then((function(t){console.log(e.drc.newClusterName+" replicators "+t.data.data),e.drc.replicators.new=[],t.data.data.forEach((function(t){return e.drc.replicators.new.push(t)}))})),this.axios.get("/api/drc/v1/meta/resources/using/types/A?localMha="+this.drc.newClusterName+"&remoteMha="+this.drc.oldClusterName).then((function(t){console.log(e.drc.newClusterName+" request "+e.drc.oldClusterName+" appliers "+t.data.data),e.drc.appliers.new=[],t.data.data.forEach((function(t){return e.drc.appliers.new.push(t)}))})),this.axios.get("/api/drc/v1/meta/targetName?localMha="+this.drc.newClusterName+"&remoteMha="+this.drc.oldClusterName).then((function(t){console.log(e.drc.newClusterName+" request "+e.drc.oldClusterName+" targetName "+t.data.data),e.drc.newTargetName=t.data.data})),this.axios.get("/api/drc/v1/meta/includeddbs?localMha="+this.drc.newClusterName+"&remoteMha="+this.drc.oldClusterName).then((function(t){console.log(e.drc.newClusterName+" request "+e.drc.oldClusterName+" includedbs "+t.data.data),e.drc.newIncludedDbs=t.data.data})),this.axios.get("/api/drc/v1/meta/namefilter?localMha="+this.drc.newClusterName+"&remoteMha="+this.drc.oldClusterName).then((function(t){console.log(e.drc.newClusterName+" request "+e.drc.oldClusterName+" namefilter "+t.data.data),e.drc.newNameFilter=t.data.data})),this.axios.get("/api/drc/v1/meta/namemapping?localMha="+this.drc.newClusterName+"&remoteMha="+this.drc.oldClusterName).then((function(t){console.log(e.drc.newClusterName+" request "+e.drc.oldClusterName+" namemapping "+t.data.data),e.drc.newNameMapping=t.data.data})),this.axios.get("/api/drc/v1/meta/applymode?localMha="+this.drc.newClusterName+"&remoteMha="+this.drc.oldClusterName).then((function(t){console.log(e.drc.newClusterName+" request "+e.drc.oldClusterName+" applymode "+t.data.data),e.drc.newApplyMode=t.data.data}))},queryOldMhaMachineGtid:function(){var e=this,t=this;console.log("/api/drc/v1/mha/"+this.drc.oldClusterName+","+this.drc.newClusterName+"/gtid/"+this.drc.oldClusterName),t.axios.get("/api/drc/v1/mha/"+this.drc.oldClusterName+","+this.drc.newClusterName+"/gtid/"+this.drc.oldClusterName).then((function(t){e.hasTest2=!0,0===t.data.status?(e.drc.newExecutedGtid=t.data.data,e.testSuccess2=!0):e.testSuccess2=!1}))},queryNewMhaMachineGtid:function(){var e=this,t=this;console.log("/api/drc/v1/mha/"+this.drc.oldClusterName+","+this.drc.newClusterName+"/gtid/"+this.drc.newClusterName),t.axios.get("/api/drc/v1/mha/"+this.drc.oldClusterName+","+this.drc.newClusterName+"/gtid/"+this.drc.newClusterName).then((function(t){e.hasTest1=!0,0===t.data.status?(e.drc.oldExecutedGtid=t.data.data,e.testSuccess1=!0):e.testSuccess1=!1}))},debug:function(){console.log("replicators: "+this.drc.replicatorlist),console.log("appliers: "+this.drc.applierlist)},searchUsedReplicatorPorts:function(){var e=this;this.axios.get("/api/drc/v1/meta/resources/ip/"+this.drc.searchReplicatorIp).then((function(t){console.log(t.data),e.drc.usedReplicatorPorts=[],t.data.data.forEach((function(t){return e.drc.usedReplicatorPorts.push(t)}))}))},changeSelection:function(){this.drc.selectedDbs=this.$refs.selection.getSelection()},changeOld:function(){this.$emit("oldClusterChanged",this.drc.oldClusterName),this.getResourcesInOld(),this.getResourcesInUseInOld()},changeNew:function(){this.$emit("newClusterChanged",this.drc.newClusterName),this.getResourcesInNew(),this.getResourcesInUseInNew()},start:function(){this.$Loading.start()},finish:function(){this.$Loading.finish()},error:function(){this.$Loading.error()},changeModal:function(e){var t=this;this.$refs[e].validate((function(e){e?t.drc.reviewModal=!0:t.$Message.error("仍有必填项未填!")}))},preCheckConfigure:function(){var e=this;console.log("preCheck"),this.axios.post("/api/drc/v1/meta/config/preCheck",{srcMha:this.drc.oldClusterName,destMha:this.drc.newClusterName,srcReplicatorIps:this.drc.replicators.old,srcApplierIps:this.drc.appliers.old,srcApplierIncludedDbs:this.drc.oldIncludedDbs,srcApplierApplyMode:this.drc.oldApplyMode,srcGtidExecuted:this.drc.oldExecutedGtid,destReplicatorIps:this.drc.replicators.new,destApplierIps:this.drc.appliers.new,destApplierIncludedDbs:this.drc.newIncludedDbs,destApplierApplyMode:this.drc.newApplyMode,destGtidExecuted:this.drc.newExecutedGtid}).then((function(t){var a=t.data.data;0===a.status?e.drc.reviewModal=!0:1===a.status?(e.drc.replicators.share=a.workingReplicatorIps,e.drc.replicators.conflictCurrent=a.conflictMha===e.oldClusterName?e.drc.replicators.old:e.drc.replicators.new,e.drc.conflictMha=a.conflictMha,e.drc.warnModal=!0):window.alert("config preCheck fail")}))},reviewConfigure:function(){this.drc.reviewModal=!0},submitConfig:function(){var e=this;console.log(this.drc.oldClusterName,this.drc.newClusterName),console.log(this.drc.replicators.old),console.log(this.drc.appliers.old),console.log(this.drc.oldIncludedDbs),console.log(this.drc.oldNameFilter),console.log(this.drc.oldNameMapping),console.log(this.drc.oldApplyMode),console.log(this.drc.oldExecutedGtid),console.log(this.drc.replicators.new),console.log(this.drc.appliers.new),console.log(this.drc.newIncludedDbs),console.log(this.drc.newNameFilter),console.log(this.drc.newNameMapping),console.log(this.drc.newApplyMode),console.log(this.drc.newExecutedGtid),console.log(this.drc.oldTargetName),console.log(this.drc.newTargetName),this.axios.post("/api/drc/v1/meta/config",{srcMha:this.drc.oldClusterName,destMha:this.drc.newClusterName,srcReplicatorIps:this.drc.replicators.old,srcApplierIps:this.drc.appliers.old,srcApplierIncludedDbs:this.drc.oldIncludedDbs,srcApplierNameFilter:this.drc.oldNameFilter,srcApplierNameMapping:this.drc.oldNameMapping,srcApplierApplyMode:this.drc.oldApplyMode,srcGtidExecuted:this.drc.oldExecutedGtid,srcClusterName:this.drc.oldTargetName,destReplicatorIps:this.drc.replicators.new,destApplierIps:this.drc.appliers.new,destApplierIncludedDbs:this.drc.newIncludedDbs,destApplierNameFilter:this.drc.newNameFilter,destApplierNameMapping:this.drc.newNameMapping,destApplierApplyMode:this.drc.newApplyMode,destGtidExecuted:this.drc.newExecutedGtid,destClusterName:this.drc.newTargetName}).then((function(t){console.log(t.data),e.result=t.data.data,e.drc.reviewModal=!1,e.drc.resultModal=!0}))}},created:function(){this.getResourcesInOld(),this.getResourcesInUseInOld(),this.getResourcesInNew(),this.getResourcesInUseInNew()}}),c=s,o=(a("47da"),a("2877")),d=Object(o["a"])(c,r,l,!1,null,"8343d1e0",null);t["a"]=d.exports},4160:function(e,t,a){"use strict";var r=a("23e7"),l=a("17c2");r({target:"Array",proto:!0,forced:[].forEach!=l},{forEach:l})},"47da":function(e,t,a){"use strict";a("a768")},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,a){var r=a("1d80"),l=a("5899"),s="["+l+"]",c=RegExp("^"+s+s+"*"),o=RegExp(s+s+"*$"),d=function(e){return function(t){var a=String(r(t));return 1&e&&(a=a.replace(c,"")),2&e&&(a=a.replace(o,"")),a}};e.exports={start:d(1),end:d(2),trim:d(3)}},7156:function(e,t,a){var r=a("861d"),l=a("d2bb");e.exports=function(e,t,a){var s,c;return l&&"function"==typeof(s=t.constructor)&&s!==a&&r(c=s.prototype)&&c!==a.prototype&&l(e,c),e}},a640:function(e,t,a){"use strict";var r=a("d039");e.exports=function(e,t){var a=[][e];return!!a&&r((function(){a.call(null,t||function(){throw 1},1)}))}},a768:function(e,t,a){},a9e3:function(e,t,a){"use strict";var r=a("83ab"),l=a("da84"),s=a("94ca"),c=a("6eeb"),o=a("5135"),d=a("c6b6"),i=a("7156"),n=a("c04e"),p=a("d039"),u=a("7c73"),m=a("241c").f,h=a("06cf").f,w=a("9bf2").f,f=a("58a8").trim,g="Number",N=l[g],b=N.prototype,x=d(u(b))==g,v=function(e){var t,a,r,l,s,c,o,d,i=n(e,!1);if("string"==typeof i&&i.length>2)if(i=f(i),t=i.charCodeAt(0),43===t||45===t){if(a=i.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(i.charCodeAt(1)){case 66:case 98:r=2,l=49;break;case 79:case 111:r=8,l=55;break;default:return+i}for(s=i.slice(2),c=s.length,o=0;o<c;o++)if(d=s.charCodeAt(o),d<48||d>l)return NaN;return parseInt(s,r)}return+i};if(s(g,!N(" 0o1")||!N("0b1")||N("+0x1"))){for(var y,I=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof I&&(x?p((function(){b.valueOf.call(a)})):d(a)!=g)?i(new N(v(t)),a,I):v(t)},M=r?m(N):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;M.length>C;C++)o(N,y=M[C])&&!o(I,y)&&w(I,y,h(N,y));I.prototype=b,b.constructor=I,c(l,g,I)}},b0c0:function(e,t,a){var r=a("83ab"),l=a("9bf2").f,s=Function.prototype,c=s.toString,o=/^\s*function ([^ (]*)/,d="name";!r||d in s||l(s,d,{configurable:!0,get:function(){try{return c.call(this).match(o)[1]}catch(e){return""}}})},e537:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{"margin-top":"100px"}},[a("Card",{staticStyle:{"margin-left":"250px",width:"650px"}},[a("div",{staticStyle:{"text-align":"center"}},[a("h3",[e._v("已完成DRC搭建流程！")])])])],1)},l=[],s={name:"complete",data:function(){return{}},methods:{}},c=s,o=a("2877"),d=Object(o["a"])(c,r,l,!1,null,"5da27c86",null);t["a"]=d.exports},fdbc:function(e,t){e.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-6d472331.e77bdec6.js.map