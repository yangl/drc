(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c9377"],{"57cb":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("base-component",[o("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[o("BreadcrumbItem",{attrs:{to:"/home"}},[t._v("首页")]),o("BreadcrumbItem",{attrs:{to:"/mqConfigs"}},[t._v("Mq投递配置")])],1),o("Content",{staticClass:"content",style:{padding:"10px",background:"#fff",margin:"50px 0 1px 185px",zIndex:"1"}},[o("Row",[o("Col",{attrs:{span:"22"}},[o("span",{staticStyle:{"margin-top":"10px",color:"#464c5b","font-weight":"600"}},[t._v(t._s(t.drc.mhaName)+"-Messenger")])]),o("Col",{attrs:{span:"2"}},[o("Button",{staticStyle:{"margin-top":"10px","text-align":"right"},attrs:{type:"primary",ghost:""},on:{click:t.goToAddMqConfig}},[t._v("添加")])],1)],1),o("div",{style:{padding:"1px 1px",height:"100%"}},[[o("Table",{staticStyle:{"margin-top":"20px"},attrs:{stripe:"",columns:t.columns,data:t.mqConfigsData,border:""},scopedSlots:t._u([{key:"action",fn:function(e){var a=e.row,i=e.index;return[o("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"success",size:"small"},on:{click:function(e){return t.goToShowConfig(a,i)}}},[t._v("查看")]),o("Button",{staticStyle:{"margin-right":"5px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.goToUpdateConfig(a,i)}}},[t._v("修改")]),o("Button",{staticStyle:{"margin-right":"10px"},attrs:{type:"error",size:"small"},on:{click:function(e){return t.deleteConfig(a,i)}}},[t._v("删除")])]}}])})]],2)],1),o("Modal",{attrs:{title:"MQ 投递配置",width:"1000px"},scopedSlots:t._u([{key:"footer",fn:function(){return[o("Button",{attrs:{type:"text",size:"large"},on:{click:t.cancelSubmit}},[t._v("取消")]),o("Button",{attrs:{type:"primary"},on:{click:t.submitConfig}},[t._v("提交")])]},proxy:!0}]),model:{value:t.display.mqConfigModal,callback:function(e){t.$set(t.display,"mqConfigModal",e)},expression:"display.mqConfigModal"}},[o("Modal",{attrs:{title:"冲突配置",width:"500px"},model:{value:t.tagInfo.modal,callback:function(e){t.$set(t.tagInfo,"modal",e)},expression:"tagInfo.modal"}},[o("Table",{attrs:{columns:t.tagInfo.columns,data:t.tagInfo.conflictVos}})],1),o("Row",[o("Col",{attrs:{span:"2"}},[o("Button",{attrs:{type:"dashed",size:"large"},on:{click:t.goToNormalTopicApplication}},[t._v("标准")])],1),o("Col",{attrs:{span:"2"}},[o("Button",{attrs:{type:"dashed",size:"large"},on:{click:t.goToCustomTopicApplication}},[t._v("自定义")])],1)],1),o("Divider"),o("Row",{attrs:{gutter:10}},[o("Col",{attrs:{span:"16"}},[o("Card",[o("div",{attrs:{slot:"title"},slot:"title"},[o("span",[t._v("配置")])]),t.display.normalTopicForm?o("Form",{staticStyle:{"margin-top":"10px"},attrs:{model:t.mqConfig,"label-width":100}},[o("FormItem",{attrs:{label:"MQ主题"}},[o("Row",[o("Col",{attrs:{span:"5"}},[o("Select",{attrs:{filterable:"",placeholder:"选择部门"},model:{value:t.topic.bu,callback:function(e){t.$set(t.topic,"bu",e)},expression:"topic.bu"}},t._l(t.buForChosen,(function(e){return o("Option",{key:e,attrs:{value:e}},[t._v(t._s(e))])})),1)],1),o("Col",{attrs:{span:"6"}},[o("Input",{attrs:{placeholder:"库名"},scopedSlots:t._u([{key:"prepend",fn:function(){return[o("span",[t._v(".")])]},proxy:!0},{key:"append",fn:function(){return[o("span",[t._v(".")])]},proxy:!0}],null,!1,2636135903),model:{value:t.topic.db,callback:function(e){t.$set(t.topic,"db",e)},expression:"topic.db"}})],1),o("Col",{attrs:{span:"6"}},[o("Input",{attrs:{placeholder:"表名"},scopedSlots:t._u([{key:"prepend",fn:function(){return[o("span",[t._v(".")])]},proxy:!0},{key:"append",fn:function(){return[o("span",[t._v(".drc")])]},proxy:!0}],null,!1,4081703306),model:{value:t.topic.table,callback:function(e){t.$set(t.topic,"table",e)},expression:"topic.table"}})],1),o("Col",{attrs:{span:"4"}},[o("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"info"},on:{click:t.check}},[t._v("表校验")])],1)],1)],1),o("Row",[o("Col",{attrs:{span:"4"}},[o("FormItem",{attrs:{label:"刷缓存Binlog"}},[o("Checkbox",{on:{"on-change":t.refreshCacheChange},model:{value:t.mqConfig.refreshCache,callback:function(e){t.$set(t.mqConfig,"refreshCache",e)},expression:"mqConfig.refreshCache"}})],1)],1),o("Col",{attrs:{span:"4"}},[o("FormItem",{attrs:{label:"有序消息"}},[o("Checkbox",{attrs:{disabled:t.mqConfig.refreshCache},on:{"on-change":t.mqConfigOrderChange},model:{value:t.mqConfig.order,callback:function(e){t.$set(t.mqConfig,"order",e)},expression:"mqConfig.order"}})],1)],1),o("Col",{attrs:{span:"16"}},[t.mqConfig.order?o("FormItem",{attrs:{label:"字段"}},[o("Select",{staticStyle:{width:"200px"},attrs:{filterable:"","allow-create":"",placeholder:"选择有序相关字段"},on:{"on-create":t.handleCreateColumn},model:{value:t.mqConfig.orderKey,callback:function(e){t.$set(t.mqConfig,"orderKey",e)},expression:"mqConfig.orderKey"}},t._l(t.columnsForChose,(function(e){return o("Option",{key:e,attrs:{value:e}},[t._v(t._s(e))])})),1)],1):t._e()],1)],1),t.tagInfo.inputDisplay?o("FormItem",{attrs:{label:"tag"}},[o("Input",{staticStyle:{width:"350px"},attrs:{placeholder:"存在冲突配置，需要输入业务名（小写英文）区分"},model:{value:t.mqConfig.tag,callback:function(e){t.$set(t.mqConfig,"tag",e)},expression:"mqConfig.tag"}})],1):t._e()],1):t._e(),t.display.normalTopicForm?t._e():o("Form",{staticStyle:{"margin-top":"10px"},attrs:{model:t.mqConfig,"label-width":100}},[o("FormItem",{attrs:{label:"部门"}},[o("Select",{staticStyle:{width:"150px"},attrs:{filterable:"",placeholder:"选择部门"},model:{value:t.topic.bu,callback:function(e){t.$set(t.topic,"bu",e)},expression:"topic.bu"}},t._l(t.buForChosen,(function(e){return o("Option",{key:e,attrs:{value:e}},[t._v(t._s(e))])})),1)],1),o("FormItem",{attrs:{label:"库表名"}},[o("Row",[o("Col",{attrs:{span:"10"}},[o("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"库名（支持正则）"},scopedSlots:t._u([{key:"append",fn:function(){return[o("span",[t._v("\\.")])]},proxy:!0}],null,!1,3386892038),model:{value:t.topic.db,callback:function(e){t.$set(t.topic,"db",e)},expression:"topic.db"}})],1),o("Col",{attrs:{span:"10"}},[o("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"表名（支持正则）"},model:{value:t.topic.table,callback:function(e){t.$set(t.topic,"table",e)},expression:"topic.table"}})],1),o("Col",{attrs:{span:"4"}},[o("Button",{staticStyle:{"margin-left":"10px"},attrs:{type:"info"},on:{click:t.check}},[t._v("表校验")])],1)],1)],1),o("FormItem",{attrs:{label:"MQ主题"}},[o("Input",{staticStyle:{width:"350px"},attrs:{placeholder:"请输入自定义Topic"},model:{value:t.mqConfig.topic,callback:function(e){t.$set(t.mqConfig,"topic",e)},expression:"mqConfig.topic"}})],1),o("Row",[o("Col",{attrs:{span:"4"}},[o("FormItem",{attrs:{label:"刷缓存Binlog"}},[o("Checkbox",{on:{"on-change":t.refreshCacheChange},model:{value:t.mqConfig.refreshCache,callback:function(e){t.$set(t.mqConfig,"refreshCache",e)},expression:"mqConfig.refreshCache"}})],1)],1),o("Col",{attrs:{span:"4"}},[o("FormItem",{attrs:{label:"有序消息"}},[o("Checkbox",{attrs:{disabled:t.mqConfig.refreshCache},on:{"on-change":t.mqConfigOrderChange},model:{value:t.mqConfig.order,callback:function(e){t.$set(t.mqConfig,"order",e)},expression:"mqConfig.order"}})],1)],1),o("Col",{attrs:{span:"20"}},[t.mqConfig.order?o("FormItem",{attrs:{label:"字段"}},[o("Select",{staticStyle:{width:"200px"},attrs:{filterable:"","allow-create":"",placeholder:"选择有序相关字段"},on:{"on-create":t.handleCreateColumn},model:{value:t.mqConfig.orderKey,callback:function(e){t.$set(t.mqConfig,"orderKey",e)},expression:"mqConfig.orderKey"}},t._l(t.columnsForChose,(function(e){return o("Option",{key:e,attrs:{value:e}},[t._v(t._s(e))])})),1)],1):t._e()],1)],1),t.tagInfo.inputDisplay?o("FormItem",{attrs:{label:"tag"}},[o("Input",{staticStyle:{width:"350px"},attrs:{placeholder:"存在冲突，请输入业务名作为唯一标识（小写英文）"},model:{value:t.mqConfig.tag,callback:function(e){t.$set(t.mqConfig,"tag",e)},expression:"mqConfig.tag"}})],1):t._e()],1)],1)],1),o("Col",{attrs:{span:"8"}},[o("Card",[o("div",{attrs:{slot:"title"},slot:"title"},[o("span",[t._v("相关表")])]),o("Table",{attrs:{stripe:"",columns:t.columnsForTableCheck,data:t.dataWithPage,border:""}}),o("div",{staticStyle:{"text-align":"center",margin:"16px 0"}},[o("Page",{attrs:{transfer:!0,total:t.tableData.length,current:t.current,"page-size-opts":t.pageSizeOpts,"page-size":this.size,"show-total":"","show-sizer":"","show-elevator":""},on:{"update:current":function(e){t.current=e},"on-page-size-change":t.handleChangeSize}})],1)],1)],1)],1)],1)],1)},i=[],n=(o("fb6a"),o("ac1f"),o("8a79"),o("1276"),o("2909")),s={name:"mqConfigs.vue",data:function(){var t=this;return{customSize:10,drc:{mhaName:this.$route.query.mhaName,messengerGroupId:0},display:{mqConfigModal:!1,normalTopicForm:!1,showOnly:!1},mqConfig:{id:0,mqType:"qmq",table:"",topic:"",serialization:"json",persistent:!1,persistentDb:"",order:!1,orderKey:"",delayTime:0,processor:"",refreshCache:!1,tag:""},tagInfo:{inputDisplay:!1,modal:!1,conflictVos:[],columns:[{title:"序号",width:75,align:"center",fixed:"left",render:function(t,e){return t("span",e.index+1)}},{title:"标识",key:"tag",width:100},{title:"库表名",key:"table",width:200},{title:"主题",key:"topic",width:200}]},topic:{bu:"",db:"",table:""},mqConfigsData:[],columns:[{title:"序号",width:75,align:"center",fixed:"left",render:function(t,e){return t("span",e.index+1)}},{title:"类型",key:"mqType",render:function(t,e){var o=e.row,a="blue",i="qmq"===o.mqType?"QMQ":"Kafka";return t("Tag",{props:{color:a}},i)}},{title:"库表名",key:"table",width:200},{title:"主题",key:"topic",width:200},{title:"有序",key:"order",render:function(t,e){var o=e.row,a="blue",i=o.order?"有序":"无序";return t("Tag",{props:{color:a}},i)}},{title:"有序相关字段",key:"orderKey"},{title:"序列化",key:"serialization"},{title:"持久化消息",key:"persistent",render:function(t,e){var o=e.row,a="blue",i=o.persistent?"持久化":"非持久化";return t("Tag",{props:{color:a}},i)}},{title:"持久化dal",key:"persistentDb"},{title:"自定义处理",key:"processor"},{title:"业务标识",key:"tag"},{title:"操作",slot:"action",align:"center",width:200,fixed:"right"}],total:0,current:1,size:5,pageSizeOpts:[5,10,20,100],columnsForTableCheck:[{title:"序号",width:75,align:"center",render:function(e,o){return e("span",o.index+1+(t.current-1)*t.size)}},{title:"库表名",key:"directSchemaTableName"}],tableData:[],buForChosen:[],columnsForChose:[]}},methods:{goToShowConfig:function(t,e){this.mqInitConfigInitFormRow(t,e),this.check(),this.columnsForChose=[],this.columnsForChose.push(t.orderKey),this.display.showOnly=!0,this.display.mqConfigModal=!0},goToUpdateConfig:function(t,e){this.mqInitConfigInitFormRow(t,e),this.check(),this.columnsForChose=[],this.columnsForChose.push(t.orderKey),this.display.showOnly=!1,this.display.mqConfigModal=!0},deleteConfig:function(t,e){var o=this;this.axios.delete("/api/drc/v1/messenger/mqConfig/"+t.id+"/"+this.drc.mhaName).then((function(t){console.log(t.data),console.log(t.data.data),0===t.data.status?(alert("删除成功！"),o.getMqConfigs()):alert("操作失败！")}))},goToAddMqConfig:function(){this.mqConfigInit(),this.columnsForChose=[],this.display={showOnly:!1,normalTopicForm:!0,mqConfigModal:!0}},mqConfigInit:function(){this.mqConfig={id:0,mqType:"qmq",table:"",topic:"",serialization:"json",persistent:!1,persistentDb:"",order:!1,orderKey:"",delayTime:0,processor:"",refreshCache:!1,tag:""},this.topic={bu:"",db:"",table:""},this.tableData=[],this.tagInfo.inputDisplay=!1},mqInitConfigInitFormRow:function(t,e){this.mqConfig={id:t.id,mqType:t.mqType,table:t.table,topic:t.topic,serialization:t.serialization,persistent:t.persistent,persistentDb:t.persistentDb,order:t.order,orderKey:t.orderKey,delayTime:t.delayTime,processor:t.processor,refreshCache:!1,tag:null==t.tag?"":t.tag};var o=t.topic.split("."),a=t.table.split("\\.");this.topic={bu:o[0],db:a[0],table:a[1]},this.tagInfo.inputDisplay=null!=t.tag,this.display.normalTopicForm=t.topic.endsWith(".drc")},goToNormalTopicApplication:function(){this.display.normalTopicForm=!0},goToCustomTopicApplication:function(){this.display.normalTopicForm=!1},cancelSubmit:function(){this.display.mqConfigModal=!1},getCommonColumns:function(){var t=this;this.columnsForChose=[],null!=this.topic.db&&""!==this.topic.db&&null!=this.topic.table&&""!==this.topic.table?(console.log("/api/drc/v1/build/rowsFilter/commonColumns?&mhaName="+this.drc.mhaName+"&namespace="+this.topic.db+"&name="+this.topic.table),this.axios.get("/api/drc/v1/build/rowsFilter/commonColumns?&mhaName="+this.drc.mhaName+"&namespace="+this.topic.db+"&name="+this.topic.table).then((function(e){1===e.data.status?(alert("查询公共列名失败，请手动添加！"+e.data.data),t.columnsForChose=[]):(console.log(e.data.data),t.columnsForChose=e.data.data,0===t.columnsForChose.length&&alert("查询无公共字段！"))}))):alert("查询公共字段，db.talbe不能为空")},submitConfig:function(){var t=this;if(this.display.showOnly)alert("查看状态，禁止提交！");else if(null!=this.topic.db&&""!==this.topic.db)if(null!=this.topic.table&&""!==this.topic.table)if(!this.mqConfig.order||null!=this.mqConfig.orderKey&&""!==this.mqConfig.orderKey){if(this.display.normalTopicForm){if(1!==this.tableData.length)return void alert("标准topic 只能对应一张表,目前匹配表数量："+this.tableData.length)}else if(0===this.tableData.length)return void alert("未匹配到表");this.display.normalTopicForm?(this.mqConfig.table=this.topic.db+"\\."+this.topic.table,this.mqConfig.topic=this.topic.bu+"."+this.topic.db+"."+this.topic.table+".drc"):this.mqConfig.table=this.topic.db+"\\."+this.topic.table;var e={id:this.mqConfig.id,bu:this.topic.bu,mqType:this.mqConfig.mqType,table:this.mqConfig.table,topic:this.mqConfig.topic,serialization:this.mqConfig.serialization,persistent:this.mqConfig.persistent,persistentDb:""===this.mqConfig.persistentDb?null:this.mqConfig.persistentDb,order:this.mqConfig.order,orderKey:""===this.mqConfig.orderKey?null:this.mqConfig.orderKey,delayTime:null===this.mqConfig.delayTime?0:this.mqConfig.delayTime,processor:""===this.mqConfig.processor?null:this.processor,messengerGroupId:this.drc.messengerGroupId,mhaName:this.drc.mhaName,tag:""===this.mqConfig.tag?null:this.mqConfig.tag};this.tagInfo.conflictVos=[],this.axios.post("/api/drc/v1/messenger/mqConfig/check",e).then((function(o){if(1===o.data.status)window.alert("mqConfig 配置校验失败!   "+o.data.message);else{var a=o.data.data;a.allowSubmit?t.axios.post("/api/drc/v1/messenger/mqConfig",e).then((function(e){1===e.data.status?window.alert("mqConfig 提交失败!   "+e.data.message):(window.alert("提交成功!"+e.data.message),t.display.mqConfigModal=!1,t.getMqConfigs())})):(null!=a.tag&&(t.mqConfig.tag=a.tag),t.tagInfo.conflictVos=a.conflictTables,t.tagInfo.inputDisplay=!0,t.tagInfo.modal=!0)}}))}else alert("有序topic 相关字段不能为空");else alert("table 不能为空！");else alert("db 不能为空")},getOrInitSimplexDrc:function(){var t=this;console.log("/api/drc/v1/build/simplexDrc?srcMha="+this.drc.mhaName),this.axios.post("/api/drc/v1/build/simplexDrc?srcMha="+this.drc.mhaName).then((function(e){1===e.data.status?window.alert("获取或创建该方向同步失败!"):(t.drc.messengerGroupId=e.data.data,t.getMqConfigs(),t.getBuListFromQmq())}))},getMqConfigs:function(){var t=this;console.log(this.drc.messengerGroupId),this.axios.get("/api/drc/v1/messenger/mqConfigs/"+this.drc.messengerGroupId).then((function(e){1===e.data.status?window.alert("查询行过滤配置失败!"):t.mqConfigsData=e.data.data}))},getBuListFromQmq:function(){var t=this;this.axios.post("/api/drc/v1/messenger/qmq/bus").then((function(e){1===e.data.status?window.alert("从查询qmq 部门信息失败!"):t.buForChosen=e.data.data}))},refreshCacheChange:function(){this.mqConfig.refreshCache&&(this.mqConfig.order=!0,alert("刷缓存Binlog 需要有序topic 请联系QMQ团队配置!!!"),this.getCommonColumns())},mqConfigOrderChange:function(){this.mqConfig.order&&(alert("有序topic 需要联系QMQ团队配置!!!"),this.getCommonColumns())},check:function(){this.showMatchTables()},showMatchTables:function(){var t=this;""===this.topic.db||""===this.topic.table?window.alert("库表名不能为空"):(console.log("/api/drc/v1/build/dataMedia/check?namespace="+this.topic.db+"&name="+this.topic.table+"&mhaName="+this.drc.mhaName+"&type=0"),this.axios.get("/api/drc/v1/build/dataMedia/check?namespace="+this.topic.db+"&name="+this.topic.table+"&mhaName="+this.drc.mhaName+"&type=0").then((function(e){1===e.data.status?window.alert("查询匹配表失败"+e.data.data):(console.log(e.data.data),t.tableData=e.data.data,t.display.normalTopicForm&&1!==t.tableData.length&&(t.display.normalTopicForm=!1),0===t.tableData.length&&window.alert("无匹配表 或 查询匹配表失败"),t.getCommonColumns())})))},handleCreateColumn:function(t){var e=this;this.contains(this.columnsForChose,t)?alert("已有项禁止创建"):""!==t&&void 0!==t&&null!==t?(console.log("/api/drc/v1/build/dataMedia/columnCheck?mhaName="+this.drc.mhaName+"&namespace="+this.topic.db+"&name="+this.topic.table+"&column="+t),this.axios.get("/api/drc/v1/build/dataMedia/columnCheck?mhaName="+this.drc.mhaName+"&namespace="+this.topic.db+"&name="+this.topic.table+"&column="+t).then((function(o){if(1===o.data.status)alert("查询字段:"+t+"失败！"+o.data.data),e.columnsForChose.push(t);else{var a=o.data.data;0!==a.length&&alert("以下表无字段"+t+"如下:"+a),e.columnsForChose.push(t)}}))):alert("字段不能为空")},handleChangeSize:function(t){this.size=t},contains:function(t,e){var o=t.length;while(o--)if(t[o]===e)return!0;return!1}},computed:{dataWithPage:function(){var t=this.tableData,e=this.current*this.size-this.size,o=e+this.size;return Object(n["a"])(t).slice(e,o)}},created:function(){console.log(this.$route.query.mhaName),this.drc.mhaName=this.$route.query.mhaName,this.getOrInitSimplexDrc()}},r=s,l=o("2877"),c=Object(l["a"])(r,a,i,!1,null,"32b16110",null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0c9377.b3d9b87a.js.map