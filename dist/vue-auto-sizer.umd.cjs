(function(d,_){typeof exports=="object"&&typeof module<"u"?_(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],_):(d=typeof globalThis<"u"?globalThis:d||self,_(d.AutoSizer={},d.Vue))})(this,function(d,_){"use strict";function N(t,o){var r;typeof o<"u"?r=o:typeof window<"u"?r=window:typeof self<"u"?r=self:r=global;var a=typeof r.document<"u"&&r.document.attachEvent;if(!a){var h=function(){var e=r.requestAnimationFrame||r.mozRequestAnimationFrame||r.webkitRequestAnimationFrame||function(i){return r.setTimeout(i,20)};return function(i){return e(i)}}(),f=function(){var e=r.cancelAnimationFrame||r.mozCancelAnimationFrame||r.webkitCancelAnimationFrame||r.clearTimeout;return function(i){return e(i)}}(),c=function(e){var i=e.__resizeTriggers__,s=i.firstElementChild,n=i.lastElementChild,l=s.firstElementChild;n.scrollLeft=n.scrollWidth,n.scrollTop=n.scrollHeight,l.style.width=s.offsetWidth+1+"px",l.style.height=s.offsetHeight+1+"px",s.scrollLeft=s.scrollWidth,s.scrollTop=s.scrollHeight},p=function(e){return e.offsetWidth!==e.__resizeLast__.width||e.offsetHeight!==e.__resizeLast__.height},z=function(e){if(!(e.target.className&&typeof e.target.className.indexOf=="function"&&e.target.className.indexOf("contract-trigger")<0&&e.target.className.indexOf("expand-trigger")<0)){var i=this;c(this),this.__resizeRAF__&&f(this.__resizeRAF__),this.__resizeRAF__=h(function(){p(i)&&(i.__resizeLast__.width=i.offsetWidth,i.__resizeLast__.height=i.offsetHeight,i.__resizeListeners__.forEach(function(s){s.call(i,e)}))})}},u=!1,m="",v="animationstart",w="Webkit Moz O ms".split(" "),C="webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),E="",L=r.document.createElement("fakeelement");if(L.style.animationName!==void 0&&(u=!0),u===!1){for(var g=0;g<w.length;g++)if(L.style[w[g]+"AnimationName"]!==void 0){E=w[g],m="-"+E.toLowerCase()+"-",v=C[g],u=!0;break}}var y="resizeanim",H="@"+m+"keyframes "+y+" { from { opacity: 0; } to { opacity: 0; } } ",W=m+"animation: 1ms "+y+"; "}var k=function(e){if(!e.getElementById("detectElementResize")){var i=(H||"")+".resize-triggers { "+(W||"")+'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',s=e.head||e.getElementsByTagName("head")[0],n=e.createElement("style");n.id="detectElementResize",n.type="text/css",t!=null&&n.setAttribute("nonce",t),n.styleSheet?n.styleSheet.cssText=i:n.appendChild(e.createTextNode(i)),s.appendChild(n)}},x=function(e,i){if(a)e.attachEvent("onresize",i);else{if(!e.__resizeTriggers__){var s=e.ownerDocument,n=r.getComputedStyle(e);n&&n.position==="static"&&(e.style.position="relative"),k(s),e.__resizeLast__={},e.__resizeListeners__=[],(e.__resizeTriggers__=s.createElement("div")).className="resize-triggers";var l=s.createElement("div");l.className="expand-trigger",l.appendChild(s.createElement("div"));var b=s.createElement("div");b.className="contract-trigger",e.__resizeTriggers__.appendChild(l),e.__resizeTriggers__.appendChild(b),e.appendChild(e.__resizeTriggers__),c(e),e.addEventListener("scroll",z,!0),v&&(e.__resizeTriggers__.__animationListener__=function(B){B.animationName===y&&c(e)},e.__resizeTriggers__.addEventListener(v,e.__resizeTriggers__.__animationListener__))}e.__resizeListeners__.push(i)}},F=function(e,i){if(a)e.detachEvent("onresize",i);else if(e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(i),1),!e.__resizeListeners__.length){e.removeEventListener("scroll",z,!0),e.__resizeTriggers__.__animationListener__&&(e.__resizeTriggers__.removeEventListener(v,e.__resizeTriggers__.__animationListener__),e.__resizeTriggers__.__animationListener__=null);try{e.__resizeTriggers__=!e.removeChild(e.__resizeTriggers__)}catch{}}};return{addResizeListener:x,removeResizeListener:F}}const R=(t,o)=>{const r=t.__vccOpts||t;for(const[a,h]of o)r[a]=h;return r},S={name:"AutoSizer",props:{defaultHeight:Number,defaultWidth:Number,disableHeight:{type:Boolean,default:!1},disableWidth:{type:Boolean,default:!1},nonce:String,onResize:{type:Function,default:()=>{}}},data(){return{height:this.defaultHeight||0,width:this.defaultWidth||0}},computed:{outerStyle:function(){const t={overflow:"visible"};return this.disableHeight||(t.height=0),this.disableWidth||(t.width=0),t},childParams:function(){const t={};return this.disableHeight||(t.height=this.height),this.disableWidth||(t.width=this.width),t}},mounted(){const t=this.$refs.autoSizer;t&&t.parentNode&&t.parentElement.ownerDocument&&t.parentNode.ownerDocument.defaultView&&t.parentNode instanceof t.parentNode.ownerDocument.defaultView.HTMLElement&&(this._parentNode=t.parentNode,this._window=t.parentNode.ownerDocument.defaultView,this._detectElementResize=N(this.nonce,this._window),this._detectElementResize.addResizeListener(this._parentNode,this._onResize),this._onResize())},beforeDestroy(){this._detectElementResize&&this._parentNode&&this._detectElementResize.removeResizeListener(this._parentNode,this._onResize)},methods:{_onResize(){if(this._parentNode){const t=this._parentNode.offsetHeight||0,o=this._parentNode.offsetWidth||0,a=(this._window||window).getComputedStyle(this._parentNode)||{},h=parseInt(a.paddingLeft,10)||0,f=parseInt(a.paddingRight,10)||0,c=parseInt(a.paddingTop,10)||0,p=parseInt(a.paddingBottom,10)||0,z=t-c-p,u=o-h-f;(!this._disableHeight&&this.height!==z||!this._disableWidth&&this.width!==u)&&(this.height=t-c-p,this.width=o-h-f,this.onResize({height:t,width:o}))}}}};function T(t,o,r,a,h,f){return _.openBlock(),_.createElementBlock("div",{ref:"autoSizer",style:_.normalizeStyle({...f.outerStyle})},[_.renderSlot(t.$slots,"default",{size:f.childParams})],4)}const A=R(S,[["render",T]]);d.AutoSizer=A,Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});
