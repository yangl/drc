(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5c39384b"],{"057f":function(t,e,n){var i=n("fc6a"),r=n("241c").f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return r(t)}catch(e){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==o.call(t)?c(t):r(i(t))}},"25f0":function(t,e,n){"use strict";var i=n("6eeb"),r=n("825a"),o=n("d039"),a=n("ad6d"),c="toString",s=RegExp.prototype,u=s[c],f=o((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),l=u.name!=c;(f||l)&&i(RegExp.prototype,c,(function(){var t=r(this),e=String(t.source),n=t.flags,i=String(void 0===n&&t instanceof RegExp&&!("flags"in s)?a.call(t):n);return"/"+e+"/"+i}),{unsafe:!0})},2909:function(t,e,n){"use strict";function i(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}n.d(e,"a",(function(){return a}));n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("e260"),n("d3b7"),n("25f0"),n("3ca3"),n("ddb0");function r(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function a(t){return i(t)||r(t)||o()}},"3ca3":function(t,e,n){"use strict";var i=n("6547").charAt,r=n("69f3"),o=n("7dd0"),a="String Iterator",c=r.set,s=r.getterFor(a);o(String,"String",(function(t){c(this,{type:a,string:String(t),index:0})}),(function(){var t,e=s(this),n=e.string,r=e.index;return r>=n.length?{value:void 0,done:!0}:(t=i(n,r),e.index+=t.length,{value:t,done:!1})}))},"4df4":function(t,e,n){"use strict";var i=n("0366"),r=n("7b0b"),o=n("9bdd"),a=n("e95a"),c=n("50c4"),s=n("8418"),u=n("35a1");t.exports=function(t){var e,n,f,l,d,h,p=r(t),g="function"==typeof this?this:Array,b=arguments.length,v=b>1?arguments[1]:void 0,y=void 0!==v,S=u(p),m=0;if(y&&(v=i(v,b>2?arguments[2]:void 0,2)),void 0==S||g==Array&&a(S))for(e=c(p.length),n=new g(e);e>m;m++)h=y?v(p[m],m):p[m],s(n,m,h);else for(l=S.call(p),d=l.next,n=new g;!(f=d.call(l)).done;m++)h=y?o(l,v,[f.value,m],!0):f.value,s(n,m,h);return n.length=m,n}},6547:function(t,e,n){var i=n("a691"),r=n("1d80"),o=function(t){return function(e,n){var o,a,c=String(r(e)),s=i(n),u=c.length;return s<0||s>=u?t?"":void 0:(o=c.charCodeAt(s),o<55296||o>56319||s+1===u||(a=c.charCodeAt(s+1))<56320||a>57343?t?c.charAt(s):o:t?c.slice(s,s+2):a-56320+(o-55296<<10)+65536)}};t.exports={codeAt:o(!1),charAt:o(!0)}},"68e5":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4NjAxNTYxQ0E2MkQxMUU2OUNEOUEwQzhCODY3MDdENyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4NjAxNTYxREE2MkQxMUU2OUNEOUEwQzhCODY3MDdENyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg2MDE1NjFBQTYyRDExRTY5Q0Q5QTBDOEI4NjcwN0Q3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg2MDE1NjFCQTYyRDExRTY5Q0Q5QTBDOEI4NjcwN0Q3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+OuaBRgAAArVJREFUeNp0k11Ik1EYx//vxz6abbiP9mV+ZLYFXihEMhoSZSJ0EVSEZYSERR+CEHRhJBRepUF2IZSGXQSBYdBFURR4k9GFllJ0EylzuNa2Fpttbi239/ScOV0LOhfvec7zPr/nnOec/yO4XC5BEGRZTqVS0Wg0kUgCDP8MWWU1Gc1mM5m5XI6+IjGSJMViMb/fn0gkyiTmMZYgBgk6ZTUSiSwtLRFDG3CMpuXl5WAwqCgKrXUippox2gi1AK2IM9WY2w+HlvPJZDIQCFCYKIpyOp0mZiN3uYpOhLMNOFWJeBZ2C6Di2EKK/6VCQqFQRUWFHApHGCsUoxMwUE8T5r9iIoCXEfzO4Xg1xptwYgZTP3hMPB43GAzcKpPwyIPX++BrAzuNsV2FnTvr0FEDDeAxYPoAmkwFv16v5/WlFfyS0ewBMng7j673qDdi5hhdGjar8VCLw09w9A36diMwi+AKMpnMek0CPnSBDaGllq8WuzF+CBoZTj0mO8HG4K3E9nJ4t+ZjBaF40ffawR7DUc7tldvw7ij4RQnRO4gOlryKuGF59wJO2PLY5RcY6cG1k2ishZLDxEeYW7HNUqoBfRme3wILgS1g8FzBuacena2w5O9s5ApYBg/61jWTf3E0urHwCtF3YBEwH9o8JUndVYjNgq2CnuliO/eoNZs4ShVKMqwmXD8P9hPsC/p70OBCXRU6DuLbNAfu96O7C0daOGY0bYHVav0797NhsBUex3k/2HewGG5cKgaoVCq32y2TrkkypLc172KYq2RyFBmGnTWobcPTYfQOFTG73S5LEi/O6XSSRgkm+9Nn9F7AwN1C0M2r8PmKjMPhIGVls1mB+o0ah3QdDodJb/jPUKvVNpttjSENS3RIPkkSubRa7WqWupSGstGhoqyxmI10Np1Ot8aQ948AAwDt2gZTYilp2gAAAABJRU5ErkJggg=="},"746f":function(t,e,n){var i=n("428f"),r=n("5135"),o=n("e538"),a=n("9bf2").f;t.exports=function(t){var e=i.Symbol||(i.Symbol={});r(e,t)||a(e,t,{value:o.f(t)})}},8045:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("base-component",{attrs:{isFather:t.isFather,subMenuName:["1"],fatherMenu:t.fatherMenu}},[i("Breadcrumb",{style:{margin:"15px 0 15px 185px",position:"fixed"}},[i("BreadcrumbItem",{attrs:{to:"/home"}},[t._v("首页")]),i("BreadcrumbItem",{attrs:{to:"/unitRouteVerificationCluster"}},[t._v("单元化路由校验")])],1),i("Content",{staticClass:"content",style:{padding:"10px",background:"#fff",margin:"50px 0 1px 185px",zIndex:"1"}},[i("div",{staticStyle:{padding:"1px 1px"}},[i("Table",{attrs:{stripe:"",columns:t.columns,data:t.dataWithPage},scopedSlots:t._u([{key:"result",fn:function(e){var r=e.row;return[i("div",[i("Button",{style:{margin:"5px 0px 20px 5px"},attrs:{type:"success",size:"small"},on:{click:function(e){return t.showCheckResult(r)}}},[t._v("查看")]),i("a",{attrs:{href:t.hickwall,target:"_blank"}},[i("img",{staticStyle:{margin:"20px 0px 0px 6px"},attrs:{src:n("68e5"),height:"23",width:"23"}})])],1)]}}])}),i("div",{staticStyle:{"text-align":"center",margin:"16px 0"}},[i("Page",{attrs:{transfer:!0,total:t.mhaGroups.length,current:t.current,"show-sizer":"","show-elevator":""},on:{"update:current":function(e){t.current=e},"on-page-size-change":t.handleChangeSize}})],1)],1)])],1)},r=[],o=(n("fb6a"),n("2909")),a={name:"unitRouteVerificationCluster",data:function(){var t=this;return{columns:[{title:"序号",width:75,align:"center",render:function(e,n){return e("span",n.index+1+(t.current-1)*t.size)}},{title:"集群A",key:"srcMha"},{title:"集群B",key:"destMha"},{title:"操作",key:"unitVerificationSwitch",width:200,align:"center",render:function(e,n){var i=n.row,r=0===i.unitVerificationSwitch?"info":"warning",o=0===i.unitVerificationSwitch?"开启校验":"校验中...";return e("Button",{props:{type:r,size:"small"},on:{click:function(){t.switchVerification(i)}}},o)}},{title:"校验结果",slot:"result",align:"center"}],mhaGroups:[],total:0,current:1,size:10,isFather:!0,fatherMenu:"/unitRouteVerificationCluster",hickwall:""}},computed:{dataWithPage:function(){var t=this.mhaGroups,e=this.current*this.size-this.size,n=e+this.size;return Object(o["a"])(t).slice(e,n)}},methods:{getMhaGroups:function(){var t=this;t.axios.get("/api/drc/v1/meta/orderedGroups/all?deleted=0").then((function(e){console.log(e),t.total=e.data.data.length,t.mhaGroups=e.data.data}))},handleChangeSize:function(t){this.size=t},switchVerification:function(t){var e=0===t.unitVerificationSwitch?"on":"off";this.axios.post("/api/drc/v1/monitor/unit/switches/"+e,{srcMha:t.srcMha,destMha:t.destMha}).then((function(e){console.log("show result"),console.log(e.data),0===e.data.status&&(t.unitVerificationSwitch=1-t.unitVerificationSwitch)}))},showCheckResult:function(t){this.$router.push({name:"unitRouteVerificationResult",query:{clusterA:t.srcMha,clusterB:t.destMha}})},setHickwallAddress:function(){var t=this;this.axios.get("/api/drc/v1/unit/result/hickwall").then((function(e){console.log(e.data.data),t.hickwall=e.data.data}))}},created:function(){this.getMhaGroups(),this.setHickwallAddress()}},c=a,s=n("2877"),u=Object(s["a"])(c,i,r,!1,null,"16a1b942",null);e["default"]=u.exports},8418:function(t,e,n){"use strict";var i=n("c04e"),r=n("9bf2"),o=n("5c6c");t.exports=function(t,e,n){var a=i(e);a in t?r.f(t,a,o(0,n)):t[a]=n}},a4d3:function(t,e,n){"use strict";var i=n("23e7"),r=n("da84"),o=n("d066"),a=n("c430"),c=n("83ab"),s=n("4930"),u=n("fdbf"),f=n("d039"),l=n("5135"),d=n("e8b5"),h=n("861d"),p=n("825a"),g=n("7b0b"),b=n("fc6a"),v=n("c04e"),y=n("5c6c"),S=n("7c73"),m=n("df75"),w=n("241c"),A=n("057f"),M=n("7418"),x=n("06cf"),O=n("9bf2"),R=n("d1e7"),G=n("9112"),E=n("6eeb"),k=n("5692"),j=n("f772"),L=n("d012"),N=n("90e3"),C=n("b622"),I=n("e538"),D=n("746f"),B=n("d44e"),T=n("69f3"),Y=n("b727").forEach,Z=j("hidden"),V="Symbol",P="prototype",F=C("toPrimitive"),J=T.set,W=T.getterFor(V),z=Object[P],U=r.Symbol,X=o("JSON","stringify"),Q=x.f,H=O.f,K=A.f,q=R.f,_=k("symbols"),$=k("op-symbols"),tt=k("string-to-symbol-registry"),et=k("symbol-to-string-registry"),nt=k("wks"),it=r.QObject,rt=!it||!it[P]||!it[P].findChild,ot=c&&f((function(){return 7!=S(H({},"a",{get:function(){return H(this,"a",{value:7}).a}})).a}))?function(t,e,n){var i=Q(z,e);i&&delete z[e],H(t,e,n),i&&t!==z&&H(z,e,i)}:H,at=function(t,e){var n=_[t]=S(U[P]);return J(n,{type:V,tag:t,description:e}),c||(n.description=e),n},ct=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof U},st=function(t,e,n){t===z&&st($,e,n),p(t);var i=v(e,!0);return p(n),l(_,i)?(n.enumerable?(l(t,Z)&&t[Z][i]&&(t[Z][i]=!1),n=S(n,{enumerable:y(0,!1)})):(l(t,Z)||H(t,Z,y(1,{})),t[Z][i]=!0),ot(t,i,n)):H(t,i,n)},ut=function(t,e){p(t);var n=b(e),i=m(n).concat(pt(n));return Y(i,(function(e){c&&!lt.call(n,e)||st(t,e,n[e])})),t},ft=function(t,e){return void 0===e?S(t):ut(S(t),e)},lt=function(t){var e=v(t,!0),n=q.call(this,e);return!(this===z&&l(_,e)&&!l($,e))&&(!(n||!l(this,e)||!l(_,e)||l(this,Z)&&this[Z][e])||n)},dt=function(t,e){var n=b(t),i=v(e,!0);if(n!==z||!l(_,i)||l($,i)){var r=Q(n,i);return!r||!l(_,i)||l(n,Z)&&n[Z][i]||(r.enumerable=!0),r}},ht=function(t){var e=K(b(t)),n=[];return Y(e,(function(t){l(_,t)||l(L,t)||n.push(t)})),n},pt=function(t){var e=t===z,n=K(e?$:b(t)),i=[];return Y(n,(function(t){!l(_,t)||e&&!l(z,t)||i.push(_[t])})),i};if(s||(U=function(){if(this instanceof U)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=N(t),n=function(t){this===z&&n.call($,t),l(this,Z)&&l(this[Z],e)&&(this[Z][e]=!1),ot(this,e,y(1,t))};return c&&rt&&ot(z,e,{configurable:!0,set:n}),at(e,t)},E(U[P],"toString",(function(){return W(this).tag})),E(U,"withoutSetter",(function(t){return at(N(t),t)})),R.f=lt,O.f=st,x.f=dt,w.f=A.f=ht,M.f=pt,I.f=function(t){return at(C(t),t)},c&&(H(U[P],"description",{configurable:!0,get:function(){return W(this).description}}),a||E(z,"propertyIsEnumerable",lt,{unsafe:!0}))),i({global:!0,wrap:!0,forced:!s,sham:!s},{Symbol:U}),Y(m(nt),(function(t){D(t)})),i({target:V,stat:!0,forced:!s},{for:function(t){var e=String(t);if(l(tt,e))return tt[e];var n=U(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!ct(t))throw TypeError(t+" is not a symbol");if(l(et,t))return et[t]},useSetter:function(){rt=!0},useSimple:function(){rt=!1}}),i({target:"Object",stat:!0,forced:!s,sham:!c},{create:ft,defineProperty:st,defineProperties:ut,getOwnPropertyDescriptor:dt}),i({target:"Object",stat:!0,forced:!s},{getOwnPropertyNames:ht,getOwnPropertySymbols:pt}),i({target:"Object",stat:!0,forced:f((function(){M.f(1)}))},{getOwnPropertySymbols:function(t){return M.f(g(t))}}),X){var gt=!s||f((function(){var t=U();return"[null]"!=X([t])||"{}"!=X({a:t})||"{}"!=X(Object(t))}));i({target:"JSON",stat:!0,forced:gt},{stringify:function(t,e,n){var i,r=[t],o=1;while(arguments.length>o)r.push(arguments[o++]);if(i=e,(h(e)||void 0!==t)&&!ct(t))return d(e)||(e=function(t,e){if("function"==typeof i&&(e=i.call(this,t,e)),!ct(e))return e}),r[1]=e,X.apply(null,r)}})}U[P][F]||G(U[P],F,U[P].valueOf),B(U,V),L[Z]=!0},a630:function(t,e,n){var i=n("23e7"),r=n("4df4"),o=n("1c7e"),a=!o((function(t){Array.from(t)}));i({target:"Array",stat:!0,forced:a},{from:r})},ad6d:function(t,e,n){"use strict";var i=n("825a");t.exports=function(){var t=i(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},d28b:function(t,e,n){var i=n("746f");i("iterator")},ddb0:function(t,e,n){var i=n("da84"),r=n("fdbc"),o=n("e260"),a=n("9112"),c=n("b622"),s=c("iterator"),u=c("toStringTag"),f=o.values;for(var l in r){var d=i[l],h=d&&d.prototype;if(h){if(h[s]!==f)try{a(h,s,f)}catch(g){h[s]=f}if(h[u]||a(h,u,l),r[l])for(var p in o)if(h[p]!==o[p])try{a(h,p,o[p])}catch(g){h[p]=o[p]}}}},e01a:function(t,e,n){"use strict";var i=n("23e7"),r=n("83ab"),o=n("da84"),a=n("5135"),c=n("861d"),s=n("9bf2").f,u=n("e893"),f=o.Symbol;if(r&&"function"==typeof f&&(!("description"in f.prototype)||void 0!==f().description)){var l={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new f(t):void 0===t?f():f(t);return""===t&&(l[e]=!0),e};u(d,f);var h=d.prototype=f.prototype;h.constructor=d;var p=h.toString,g="Symbol(test)"==String(f("test")),b=/^Symbol\((.*)\)[^)]+$/;s(h,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,e=p.call(t);if(a(l,t))return"";var n=g?e.slice(7,-1):e.replace(b,"$1");return""===n?void 0:n}}),i({global:!0,forced:!0},{Symbol:d})}},e538:function(t,e,n){var i=n("b622");e.f=i},fb6a:function(t,e,n){"use strict";var i=n("23e7"),r=n("861d"),o=n("e8b5"),a=n("23cb"),c=n("50c4"),s=n("fc6a"),u=n("8418"),f=n("b622"),l=n("1dde"),d=n("ae40"),h=l("slice"),p=d("slice",{ACCESSORS:!0,0:0,1:2}),g=f("species"),b=[].slice,v=Math.max;i({target:"Array",proto:!0,forced:!h||!p},{slice:function(t,e){var n,i,f,l=s(this),d=c(l.length),h=a(t,d),p=a(void 0===e?d:e,d);if(o(l)&&(n=l.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)?r(n)&&(n=n[g],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return b.call(l,h,p);for(i=new(void 0===n?Array:n)(v(p-h,0)),f=0;h<p;h++,f++)h in l&&u(i,f,l[h]);return i.length=f,i}})},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-5c39384b.0810d33f.js.map