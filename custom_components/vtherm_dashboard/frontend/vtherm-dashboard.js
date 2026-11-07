var mr=Object.defineProperty;var fr=Object.getOwnPropertyDescriptor;var u=(s,t,e,r)=>{for(var n=r>1?void 0:r?fr(t,e):t,i=s.length-1,a;i>=0;i--)(a=s[i])&&(n=(r?a(t,e,n):a(n))||n);return r&&n&&mr(t,e,n),n};var qe=globalThis,Re=qe.ShadowRoot&&(qe.ShadyCSS===void 0||qe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,De=Symbol(),yt=new WeakMap,_e=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==De)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Re&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=yt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&yt.set(e,t))}return t}toString(){return this.cssText}},_t=s=>new _e(typeof s=="string"?s:s+"",void 0,De),I=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((r,n,i)=>r+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[i+1],s[0]);return new _e(e,s,De)},bt=(s,t)=>{if(Re)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),n=qe.litNonce;n!==void 0&&r.setAttribute("nonce",n),r.textContent=e.cssText,s.appendChild(r)}},Ne=Re?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return _t(e)})(s):s;var{is:gr,defineProperty:vr,getOwnPropertyDescriptor:yr,getOwnPropertyNames:_r,getOwnPropertySymbols:br,getPrototypeOf:xr}=Object,Oe=globalThis,xt=Oe.trustedTypes,wr=xt?xt.emptyScript:"",$r=Oe.reactiveElementPolyfillSupport,be=(s,t)=>s,xe={toAttribute(s,t){switch(t){case Boolean:s=s?wr:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Me=(s,t)=>!gr(s,t),wt={attribute:!0,type:String,converter:xe,reflect:!1,useDefault:!1,hasChanged:Me};Symbol.metadata??=Symbol("metadata"),Oe.litPropertyMetadata??=new WeakMap;var K=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=wt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),n=this.getPropertyDescriptor(t,r,e);n!==void 0&&vr(this.prototype,t,n)}}static getPropertyDescriptor(t,e,r){let{get:n,set:i}=yr(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:n,set(a){let l=n?.call(this);i?.call(this,a),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??wt}static _$Ei(){if(this.hasOwnProperty(be("elementProperties")))return;let t=xr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(be("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(be("properties"))){let e=this.properties,r=[..._r(e),...br(e)];for(let n of r)this.createProperty(n,e[n])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,n]of e)this.elementProperties.set(r,n)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let n=this._$Eu(e,r);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let n of r)e.unshift(Ne(n))}else t!==void 0&&e.push(Ne(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return bt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,r);if(n!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:xe).toAttribute(e,r.type);this._$Em=t,i==null?this.removeAttribute(n):this.setAttribute(n,i),this._$Em=null}}_$AK(t,e){let r=this.constructor,n=r._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let i=r.getPropertyOptions(n),a=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:xe;this._$Em=n;let l=a.fromAttribute(e,i.type);this[n]=l??this._$Ej?.get(n)??l,this._$Em=null}}requestUpdate(t,e,r,n=!1,i){if(t!==void 0){let a=this.constructor;if(n===!1&&(i=this[t]),r??=a.getPropertyOptions(t),!((r.hasChanged??Me)(i,e)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:n,wrapped:i},a){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),i!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,i]of this._$Ep)this[n]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[n,i]of r){let{wrapped:a}=i,l=this[n];a!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,i,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};K.elementStyles=[],K.shadowRootOptions={mode:"open"},K[be("elementProperties")]=new Map,K[be("finalized")]=new Map,$r?.({ReactiveElement:K}),(Oe.reactiveElementVersions??=[]).push("2.1.2");var Ge=globalThis,$t=s=>s,Ie=Ge.trustedTypes,kt=Ie?Ie.createPolicy("lit-html",{createHTML:s=>s}):void 0,Pt="$lit$",Q=`lit$${Math.random().toFixed(9).slice(2)}$`,qt="?"+Q,kr=`<${qt}>`,ne=document,$e=()=>ne.createComment(""),ke=s=>s===null||typeof s!="object"&&typeof s!="function",Ke=Array.isArray,Sr=s=>Ke(s)||typeof s?.[Symbol.iterator]=="function",Ve=`[ 	
\f\r]`,we=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,St=/-->/g,Tt=/>/g,re=RegExp(`>|${Ve}(?:([^\\s"'>=/]+)(${Ve}*=${Ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),At=/'/g,Et=/"/g,Rt=/^(?:script|style|textarea|title)$/i,Ze=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),o=Ze(1),k=Ze(2),Jr=Ze(3),ie=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Ct=new WeakMap,se=ne.createTreeWalker(ne,129);function Ot(s,t){if(!Ke(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return kt!==void 0?kt.createHTML(t):t}var Tr=(s,t)=>{let e=s.length-1,r=[],n,i=t===2?"<svg>":t===3?"<math>":"",a=we;for(let l=0;l<e;l++){let c=s[l],d,h,p=-1,$=0;for(;$<c.length&&(a.lastIndex=$,h=a.exec(c),h!==null);)$=a.lastIndex,a===we?h[1]==="!--"?a=St:h[1]!==void 0?a=Tt:h[2]!==void 0?(Rt.test(h[2])&&(n=RegExp("</"+h[2],"g")),a=re):h[3]!==void 0&&(a=re):a===re?h[0]===">"?(a=n??we,p=-1):h[1]===void 0?p=-2:(p=a.lastIndex-h[2].length,d=h[1],a=h[3]===void 0?re:h[3]==='"'?Et:At):a===Et||a===At?a=re:a===St||a===Tt?a=we:(a=re,n=void 0);let f=a===re&&s[l+1].startsWith("/>")?" ":"";i+=a===we?c+kr:p>=0?(r.push(d),c.slice(0,p)+Pt+c.slice(p)+Q+f):c+Q+(p===-2?l:f)}return[Ot(s,i+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Se=class s{constructor({strings:t,_$litType$:e},r){let n;this.parts=[];let i=0,a=0,l=t.length-1,c=this.parts,[d,h]=Tr(t,e);if(this.el=s.createElement(d,r),se.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(n=se.nextNode())!==null&&c.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(let p of n.getAttributeNames())if(p.endsWith(Pt)){let $=h[a++],f=n.getAttribute(p).split(Q),_=/([.?@])?(.*)/.exec($);c.push({type:1,index:i,name:_[2],strings:f,ctor:_[1]==="."?Be:_[1]==="?"?Fe:_[1]==="@"?je:pe}),n.removeAttribute(p)}else p.startsWith(Q)&&(c.push({type:6,index:i}),n.removeAttribute(p));if(Rt.test(n.tagName)){let p=n.textContent.split(Q),$=p.length-1;if($>0){n.textContent=Ie?Ie.emptyScript:"";for(let f=0;f<$;f++)n.append(p[f],$e()),se.nextNode(),c.push({type:2,index:++i});n.append(p[$],$e())}}}else if(n.nodeType===8)if(n.data===qt)c.push({type:2,index:i});else{let p=-1;for(;(p=n.data.indexOf(Q,p+1))!==-1;)c.push({type:7,index:i}),p+=Q.length-1}i++}}static createElement(t,e){let r=ne.createElement("template");return r.innerHTML=t,r}};function de(s,t,e=s,r){if(t===ie)return t;let n=r!==void 0?e._$Co?.[r]:e._$Cl,i=ke(t)?void 0:t._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(s),n._$AT(s,e,r)),r!==void 0?(e._$Co??=[])[r]=n:e._$Cl=n),n!==void 0&&(t=de(s,n._$AS(s,t.values),n,r)),t}var Ue=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,n=(t?.creationScope??ne).importNode(e,!0);se.currentNode=n;let i=se.nextNode(),a=0,l=0,c=r[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new Te(i,i.nextSibling,this,t):c.type===1?d=new c.ctor(i,c.name,c.strings,this,t):c.type===6&&(d=new We(i,this,t)),this._$AV.push(d),c=r[++l]}a!==c?.index&&(i=se.nextNode(),a++)}return se.currentNode=ne,n}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},Te=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,n){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=de(this,t,e),ke(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==ie&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Sr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&ke(this._$AH)?this._$AA.nextSibling.data=t:this.T(ne.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,n=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Se.createElement(Ot(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===n)this._$AH.p(e);else{let i=new Ue(n,this),a=i.u(this.options);i.p(e),this.T(a),this._$AH=i}}_$AC(t){let e=Ct.get(t.strings);return e===void 0&&Ct.set(t.strings,e=new Se(t)),e}k(t){Ke(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,n=0;for(let i of t)n===e.length?e.push(r=new s(this.O($e()),this.O($e()),this,this.options)):r=e[n],r._$AI(i),n++;n<e.length&&(this._$AR(r&&r._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=$t(t).nextSibling;$t(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},pe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,n,i){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=m}_$AI(t,e=this,r,n){let i=this.strings,a=!1;if(i===void 0)t=de(this,t,e,0),a=!ke(t)||t!==this._$AH&&t!==ie,a&&(this._$AH=t);else{let l=t,c,d;for(t=i[0],c=0;c<i.length-1;c++)d=de(this,l[r+c],e,c),d===ie&&(d=this._$AH[c]),a||=!ke(d)||d!==this._$AH[c],d===m?t=m:t!==m&&(t+=(d??"")+i[c+1]),this._$AH[c]=d}a&&!n&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Be=class extends pe{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},Fe=class extends pe{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},je=class extends pe{constructor(t,e,r,n,i){super(t,e,r,n,i),this.type=5}_$AI(t,e=this){if((t=de(this,t,e,0)??m)===ie)return;let r=this._$AH,n=t===m&&r!==m||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==m&&(r===m||n);n&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},We=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){de(this,t)}};var Ar=Ge.litHtmlPolyfillSupport;Ar?.(Se,Te),(Ge.litHtmlVersions??=[]).push("3.3.3");var Mt=(s,t,e)=>{let r=e?.renderBefore??t,n=r._$litPart$;if(n===void 0){let i=e?.renderBefore??null;r._$litPart$=n=new Te(t.insertBefore($e(),i),i,void 0,e??{})}return n._$AI(s),n};var Xe=globalThis,O=class extends K{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ie}};O._$litElement$=!0,O.finalized=!0,Xe.litElementHydrateSupport?.({LitElement:O});var Er=Xe.litElementPolyfillSupport;Er?.({LitElement:O});(Xe.litElementVersions??=[]).push("4.2.2");var z=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};var Cr={attribute:!0,type:String,converter:xe,reflect:!1,hasChanged:Me},Pr=(s=Cr,t,e)=>{let{kind:r,metadata:n}=e,i=globalThis.litPropertyMetadata.get(n);if(i===void 0&&globalThis.litPropertyMetadata.set(n,i=new Map),r==="setter"&&((s=Object.create(s)).wrapped=!0),i.set(e.name,s),r==="accessor"){let{name:a}=e;return{set(l){let c=t.get.call(this);t.set.call(this,l),this.requestUpdate(a,c,s,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,s,l),l}}}if(r==="setter"){let{name:a}=e;return function(l){let c=this[a];t.call(this,l),this.requestUpdate(a,c,s,!0,l)}}throw Error("Unsupported decorator location: "+r)};function y(s){return(t,e)=>typeof e=="object"?Pr(s,t,e):((r,n,i)=>{let a=n.hasOwnProperty(i);return n.constructor.createProperty(i,r),a?Object.getOwnPropertyDescriptor(n,i):void 0})(s,t,e)}function S(s){return y({...s,state:!0,attribute:!1})}var ue="vtherm_dashboard",It=s=>s.callWS({type:`${ue}/list`}),Lt=(s,t)=>s.callWS({type:`${ue}/get`,entry_id:t}),Ht=(s,t)=>s.callWS({type:`${ue}/new`,thermostat_type:t}),Ye=(s,t)=>s.callWS({type:`${ue}/describe`,data:t}),zt=(s,t,e)=>s.callWS({type:`${ue}/save`,data:t,...e?{entry_id:e}:{}}),Qe=(s,t)=>s.callWS({type:`${ue}/presets`,...t?{entry_id:t}:{}});async function Dt(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;await customElements.whenDefined("partial-panel-resolver");let s=document.createElement("partial-panel-resolver");s.hass={panels:[{url_path:"tmp",component_name:"config"}]},s._updateRoutes(),await s.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config"),await document.createElement("ha-panel-config").routerOptions.routes.automation.load(),await customElements.whenDefined("ha-form")}var N={cards:{room:{title:"Room",subtitle:"What this thermostat is called and what it measures."},devices:{title:"Devices",subtitle:"The heaters, valves or climates this thermostat drives."},correction:{title:"Setpoint correction",subtitle:"The device's built-in sensor sits next to the heat, so VT raises or lowers the target it sends until your room sensor reaches your temperature."},heating:{title:"Heating control",subtitle:"How much and how often to heat."},presets:{title:"Presets",subtitle:"The target temperature of each preset."},window:{title:"Open window",subtitle:"What happens when a window opens."},motion:{title:"Room presence",subtitle:"In the Activity preset, the room uses one preset's temperature while someone is there and another's when it is empty. The preset itself stays Activity; other presets ignore the sensor."},presence:{title:"Away from home",subtitle:"Lower the temperature when nobody is home, using a person entity or a home occupancy sensor."},power:{title:"Power & energy",subtitle:"Device consumption and load shedding."},boiler:{title:"Central boiler",subtitle:"Turn the boiler on when any thermostat needs heat."},safety:{title:"Sensor loss & manual changes",subtitle:"What to do when the room thermometer goes quiet, and how long a manual change lasts."},auto_start_stop:{title:"Auto start/stop",subtitle:"Turn the climate off when it is not needed."},lock:{title:"Lock",subtitle:"Stop people or automations from changing this thermostat."},other:{title:"Other",subtitle:"Settings this page does not place yet."}},groups:{range:"Outdoor sensor and temperature range",valve:"Direct valve control",valve_limits:"Valve commands",sync:"Sync the device's internal temperature",tpi:"TPI coefficients",auto_tpi:"Auto-TPI learning",window_behaviour:"What happens",motion_detect:"Sensor",motion_behaviour:"What happens",shedding:"Load shedding",failure:"Heating failure detection"},fields:{name:{label:"Name",info:"Name of the thermostat and of its climate entity."},temperature_sensor_entity_id:{label:"Room temperature sensor",hint:"Where people sit, away from windows and the heater.",info:"The temperature VT regulates on. Place it in the middle of the living space: next to a window it reacts to drafts, next to the heater it reads too warm and the room stays cold."},humidity_sensor_entity_id:{label:"Humidity sensor",hint:"Optional. Shown on the thermostat, not used for heating.",info:"Exposes humidity on the thermostat card; it does not change regulation. When the room sensor's device also measures humidity, the panel pre-fills that sensor (VT's flow did this silently as 'enabled but empty')."},last_seen_temperature_sensor_entity_id:{label:"Sensor 'last seen' time",hint:"Optional. Prevents false alarms from sensors that only report changes.",info:"A datetime entity telling when the temperature sensor last checked in (many Zigbee sensors have 'last_seen'). Battery sensors stay silent while the temperature is stable; without this, VT may think the sensor died and switch to sensor-loss mode.",diagram:"safety"},external_temperature_sensor_entity_id:{label:"Outdoor temperature sensor",hint:"Used to heat more when it is cold outside.",info:"Feeds the outdoor part of the heating calculation (coef_ext). If it stops reporting, sensor-loss mode can trigger too, unless disabled globally in configuration.yaml."},temp_min:{label:"Lowest settable temperature",info:"The thermostat will not accept a target below this. Default 7 \xB0C."},temp_max:{label:"Highest settable temperature",info:"The thermostat will not accept a target above this. Default 35 \xB0C."},step_temperature:{label:"Temperature step",info:"How much one +/\u2212 press changes the target. Default 0.1 \xB0C."},underlying_entity_ids:{label:"Devices to control",info:`**over_switch**: switch, input_boolean, select or climate entities.
**over_valve**: number entities that set the valve opening.
**over_climate**: climate entities.`},ac_mode:{label:"Air conditioning",hint:"The device can cool.",info:"over_switch / over_valve: only cooling is offered. over_climate: heating and cooling, if the device supports both. Adds cooling (clim) presets."},inverse_switch_command:{label:"Inverted switch",hint:"For pilot-wire modules with a diode.",info:"On means heater off and off means heater on. Needed for some French pilot-wire setups (fil pilote) with a diode."},heater_keep_alive:{label:"Keep-alive interval (s)",hint:"Resend the current state regularly. Empty: off.",info:"Some devices switch themselves off if they hear nothing for a while. VT then repeats the current on/off command at this interval."},on_command_text:{label:"Custom on/off commands",hint:"Needed when a device is not a plain switch.",info:"Format command[/attribute[:value]], one per device, in the same order as the devices. Examples: select_option/option:comfort, set_hvac_mode/hvac_mode:heat. Plain switches use turn_on / turn_off automatically."},used_by_controls_central_boiler:{label:"Heated by the central boiler",hint:"Turns the boiler on when this room needs heat.",info:"Counts this thermostat's devices for the central boiler (configured in the central configuration). Rooms on electric heaters usually stay off."},auto_fan_mode:{label:"Boost fan when far from target",info:"Runs the device's fan at this level while the room is far from the target, so heat spreads faster. Falls back to the quietest mode once close."},auto_regulation_dtemp:{label:"Smallest change sent (\xB0)",hint:"Smaller target changes are not sent.",info:"Avoids sending a new target for every tiny change; some devices beep or drain batteries on each command. Too high and the correction stops working.",diagram:"send_threshold"},auto_regulation_periode_min:{label:"Minimum time between changes (min)",info:"A new target is sent at most this often.",diagram:"send_threshold"},opening_threshold_degree:{label:"Treat as closed below (%)",hint:"Requested openings below this close the valve.",info:"Requested opening below this value counts as 'no heat': the valve goes to its most closed position and the room counts as not heating (also for the central boiler).",diagram:"valve_curve"},min_opening_degrees:{label:"Minimum opening when heating (%)",hint:"One value per valve, comma separated.",info:"As soon as the room needs heat the valve opens at least this far. Use it for valves with a dead zone where the first % let no water through. Example: 15 or '15, 20'.",diagram:"valve_curve"},max_opening_degrees:{label:"Maximum opening (%)",hint:"One value per valve, comma separated.",info:"The valve never opens further. Limits flow, e.g. to balance radiators. Must be above the minimum opening.",diagram:"valve_curve"},max_closing_degree:{label:"How far the valve may close (%)",hint:"100 = fully closed.",info:"Set below 100 to always leave a little water flowing, e.g. 90 keeps 10 % open (quieter, protects the pump).",diagram:"valve_curve"},auto_regulation_mode:{label:"Correction strength",hint:"Start with Light, raise only if the room misses the target.",info:"The device regulates on its own sensor, which often sits next to the heat. VT shifts the target it sends so the room sensor reaches your temperature. Light: up to 1.5 \xB0, Medium: 2 \xB0, Strong: 3 \xB0. Expert uses values from configuration.yaml. 'Direct valve control' instead sets the valve opening itself (needs an opening entity). More correction means more energy and wear.",diagram:"correction"},auto_regulation_use_device_temp:{label:"Compensate the device's own sensor",hint:"Rarely needed. Try correction first.",info:"Adds (device temperature \u2212 room temperature) to the target. Example: room 18 \xB0, device reads 22 \xB0: VT sends 4 \xB0 more so the device actually heats. Unstable device sensors make this worse."},opening_degree_entity_ids:{label:"Valve opening entities",hint:"One per device, same order as the devices.",info:"The number entities that set each valve's opening."},closing_degree_entity_ids:{label:"Valve closing entities",hint:"Optional. All or none.",info:"If the valve also has a closing entity, VT sets it to 100 \u2212 opening."},sync_entity_ids:{label:"Entities to sync",hint:"One per device, same order as the devices.",info:"Either the device's temperature calibration entity (offset mode) or its external temperature input (direct mode). Some devices need an extra setting, e.g. Sonoff TRVZB: sensor_select = external."},sync_with_calibration:{label:"Use calibration offset",hint:"On: adjust the device's offset. Off: send the room temperature.",info:"Offset mode works with most TRVs (local_temperature_calibration). Direct mode needs a device that accepts an external temperature."},proportional_function:{label:"Algorithm",hint:"TPI is built in. Other algorithms are separate plugins.",info:"Only TPI ships with Versatile Thermostat. Other algorithms, such as **SmartPI** (learns the room; recommended by VT's author), are separate plugins you install first (versatile-thermostat.org/en/plugins). Once installed, they appear in this list."},cycle_min:{label:"Cycle length (min)",hint:"5 minutes suits most rooms; longer for slow heating.",info:"Every cycle VT works out how much heat the room needs and, for switches, keeps the heater on for that share of the cycle. Short cycles react faster but switch more often; slow heating (underfloor, storage heaters) needs longer cycles. Too short and the heater never warms up.",diagram:"tpi_cycle"},tpi_coef_int:{label:"Room gap factor (coef_int)",hint:"Higher: catches up faster. Lower if it overshoots.",info:"Heating share = coef_int \xD7 (target \u2212 room) + coef_ext \xD7 (target \u2212 outdoor). Reaching the target too slowly: raise it. Oscillating around the target: lower it. Default 0.6.",diagram:"tpi_formula"},tpi_coef_ext:{label:"Outdoor factor (coef_ext)",hint:"Raise if the room settles below target.",info:"Compensates heat lost to the outside. Settles below the target: raise it. Settles above: lower it. Default 0.01.",diagram:"tpi_formula"},minimal_activation_delay:{label:"Shortest on-time (s)",hint:"Shorter heating pulses are skipped.",info:"Avoids pulses too short for the heater to do anything. Default 10 s.",diagram:"min_on_off"},minimal_deactivation_delay:{label:"Shortest off-time (s)",hint:"Shorter pauses are skipped (stays on).",info:"Avoids flicking off for a few seconds. Default 0.",diagram:"min_on_off"},tpi_threshold_high:{label:"Stop heating above target + (\xB0)",hint:"0 = off. Needs the resume value too.",info:"If the room gets this much warmer than the target, heating stops completely until it falls below target + resume value. Both values must be set.",diagram:"tpi_thresholds"},tpi_threshold_low:{label:"Resume below target + (\xB0)",hint:"Must be smaller than the stop value.",info:"See 'Stop heating above target'.",diagram:"tpi_thresholds"},auto_tpi_learning_type:{label:"Learning type",hint:"Discovery for a new setup, Fine tuning to refine.",info:"Learning sessions take about 48 h and are started manually (service or Auto-TPI card). Discovery: fast, from scratch. Fine tuning: slow, small corrections."},auto_tpi_heating_rate:{label:"Heating rate (\xB0/h)",hint:"0 = measure it automatically.",info:"How fast the heater can warm the room at full power."},heater_heating_time:{label:"Warm-up time (min)",hint:"Time to reach full power, e.g. 5 for an electric radiator."},heater_cooling_time:{label:"Cool-down time (min)",hint:"Time to cool after stopping, e.g. 7 for an electric radiator."},auto_tpi_aggressiveness:{label:"Aggressiveness",hint:"Lower (e.g. 0.8) if it keeps overshooting.",info:"Scales the learned coefficients down. 1.0 = use them as learned."},auto_tpi_continuous_kext:{label:"Keep learning the outdoor factor",hint:"Slow background adjustment between sessions."},auto_tpi_enable_advanced_settings:{label:"Show learning parameters"},auto_tpi_avg_initial_weight:{label:"Weight of old values",hint:"1 = replace quickly, 50 = change slowly."},auto_tpi_ema_alpha:{label:"Alpha",hint:"Higher reacts faster to recent cycles."},auto_tpi_ema_decay_rate:{label:"Decay rate",hint:"Slows learning down over time."},auto_tpi_continuous_kext_alpha:{label:"Background learning speed",hint:"Default 0.04 \u2248 a few days to adapt."},use_presets_central_config:{label:"Use the central preset temperatures",hint:"Off: this room has its own Eco/Comfort/Boost temperatures.",info:"Preset temperatures are number entities on the thermostat, or on the central configuration when this is on."},use_central_mode:{label:"Follow the central mode switch",hint:"Lets one switch stop all rooms or set them to frost protection.",info:"The central configuration has a select (Auto, Stopped, Heat only, Cool only, Frost protection) that controls every thermostat with this on."},window_sensor_entity_id:{label:"Window sensor",hint:"A binary sensor or a group of them.",info:"For several windows, make a binary_sensor group."},window_delay:{label:"Wait before reacting (s)",hint:"Short airing does not stop the heating.",info:"The window must stay open this long before the action happens.",diagram:"window_delay"},window_off_delay:{label:"Wait after closing (s)",hint:"Empty: same as above.",info:"The window must stay closed this long before heating resumes.",diagram:"window_delay"},window_auto_open_threshold:{label:"Detect when falling faster than (\xB0/h)",hint:"Lower detects sooner, with more false alarms. Try 3.",info:"VT watches the temperature slope. A sudden drop beyond this rate counts as an open window. Not for hallways or rooms with normal big swings.",diagram:"window_slope"},window_auto_close_threshold:{label:"Consider closed when above (\xB0/h)",hint:"Usually 0: the temperature stops falling.",diagram:"window_slope"},window_auto_max_duration:{label:"Give up after (min)",hint:"Heating resumes even if it keeps cooling. Try 30\u201360.",diagram:"window_slope"},window_action:{label:"When open",hint:"Turn off, fan only, frost protection or eco.",info:"Frost protection and Eco change the target without changing the preset, so the preset shown can differ from the target."},motion_sensor_entity_id:{label:"Room presence sensor",hint:"A motion or occupancy (mmWave) sensor in this room.",info:`VT calls this feature "motion", but it only asks whether someone is in the room: on = someone there, off = empty. An occupancy sensor fits best; a motion sensor works too.

It only acts in the **Activity** preset, which appears once this card is set up. The preset stays Activity; only the target changes: the occupied preset's temperature while someone is there, the empty preset's once the room has been empty for a while. In Eco, Comfort, Boost or a manual temperature the sensor is ignored, so an explicitly chosen preset always wins.`},motion_preset:{label:"Temperature when occupied",diagram:"motion",hint:"The temperature of this preset is used; the selected preset stays Activity."},no_motion_preset:{label:"Temperature when empty",diagram:"motion",hint:"The temperature of this preset is used while the room is empty."},motion_delay:{label:"Occupied after (s)",hint:"Walking through does not count.",diagram:"motion"},motion_off_delay:{label:"Empty after (s)",diagram:"motion"},presence_sensor_entity_id:{label:"Home occupancy sensor",hint:"on/home = someone home, off/not_home = away.",info:"A person entity, or a binary sensor (a binary_sensor group works). A group of persons does not: VT's docs (French original too) recommend a template sensor for that. While away, the 'away' preset temperatures (separate entities) apply."},device_power:{label:"Device power",hint:"Total of all devices; same unit everywhere.",info:"Used for the energy sensors, load shedding and the central boiler."},power_unit:{label:"Unit"},power_sensor_entity_id:{label:"Home consumption sensor",hint:"Total power the home uses right now."},max_power_sensor_entity_id:{label:"Maximum allowed power sensor",hint:"Keep a margin below your main fuse.",info:"Not a safety feature: overload is still possible between sensor updates."},power_temp:{label:"Temperature while shedding"},safety_delay_min:{label:"Sensor silent for (min)",hint:"Then switch to a safe fixed power. Battery sensors: 120\u2013240.",info:"If no temperature arrives for this long, VT stops trusting the sensor. Set 'last seen' in Room to avoid false alarms.",diagram:"safety"},safety_default_on_percent:{label:"Fixed power during sensor loss",hint:"0.1 = 10 %. 0 risks freezing.",diagram:"safety"},safety_min_on_percent:{label:"Only when heating at least",hint:"0.5 = 50 %. Below this, sensor loss is ignored.",info:"A heater running low cannot overheat the room, so no need to react.",diagram:"safety"},manual_override_duration_min:{label:"Return to preset after a manual change (min)",hint:"0 = keep the manual temperature.",diagram:"override"},repair_incorrect_state:{label:"Resend ignored commands",hint:"For relays or valves that sometimes miss a command.",info:"Max 5 retries in a row; frequent repairs point to a hardware or network problem."},heating_failure_threshold:{label:"Heating hard means at least (%)",hint:"0.9 = 90 %.",diagram:"failure"},cooling_failure_threshold:{label:"Heating off means at most (%)",hint:"0 = 0 %.",diagram:"failure"},heating_failure_detection_delay:{label:"Alert after (min)",hint:"Raise for underfloor heating or large rooms.",diagram:"failure"},temperature_change_tolerance:{label:"Ignore changes smaller than (\xB0)",hint:"Filters sensor noise.",diagram:"failure"},failure_detection_enable_template:{label:"Only detect when (template)",hint:"Optional."},auto_start_stop_level:{label:"Reaction speed",hint:"Fast stops and restarts more often.",info:"Very slow \u2248 60 min between stop and restart, slow \u2248 30, medium \u2248 15, fast \u2248 7. Only restarts devices it stopped itself."},lock_users:{label:"Block changes from the UI",info:"Window actions, safety and load shedding keep working while locked."},lock_automations:{label:"Block automations and schedulers"},lock_code:{label:"PIN code",hint:"4 digits. Optional."},auto_relock_sec:{label:"Lock again after (s)",hint:"0 = stay unlocked."},"auto_regulation_dtemp@thermostat_over_valve":{label:"Smallest opening change sent (%)",hint:"Smaller changes are not sent to the valve.",info:"Limits how often the valve moves (noise, battery).",diagram:"send_threshold"},"auto_regulation_periode_min@thermostat_over_valve":{label:"Minimum time between valve updates (min)",info:"The valve gets a new opening at most this often.",diagram:"send_threshold"},"underlying_entity_ids@thermostat_over_switch":{label:"Devices to control",hint:"Several switches get shifted start times to smooth the power draw.",info:`**over_switch**: switch, input_boolean, select or climate entities.
**over_valve**: number entities that set the valve opening.
**over_climate**: climate entities.

With several switches each one still gets its full on-time; VT only shifts their start so fewer run at once (smoother power draw). At high demand they overlap.`,diagram:"stagger"}},diagrams:{tpi_cycle:{title:"Heating cycle",caption:"Each cycle, the heater runs for the share the algorithm asks for."},tpi_formula:{title:"How much to heat",caption:"Two stacked bars for an example: room gap \xD7 coef_int + outdoor gap \xD7 coef_ext = heating share, capped at 100 %."},tpi_thresholds:{title:"Stop and resume band",caption:"Temperature line above the target: crossing target+stop turns heating off, falling below target+resume turns it back on."},valve_curve:{title:"Requested vs sent opening",caption:"x: opening the algorithm wants, y: opening sent. Flat at the closed position until 'treat as closed', jumps to the minimum, rises, flattens at the maximum."},send_threshold:{title:"Only meaningful changes are sent",caption:"A wanted value wiggling, and the sent value as steps that only move when the change exceeds the threshold and enough time has passed."},window_delay:{title:"Window timeline",caption:"Window open bar; short opening below the wait: nothing; long opening: action after the wait, resumes after the closed wait."},window_slope:{title:"Temperature-drop detection",caption:"Temperature line with a sudden fall: slope beyond the threshold marks 'open', ends when the slope recovers or the max duration passes."},motion:{title:"Room presence timeline",caption:"A short pass does nothing; staying uses the occupied temperature; leaving returns to the empty temperature after the delay. The preset stays Activity."},safety:{title:"Sensor loss",caption:"Sensor report dots, then a gap longer than the delay: heating switches to the fixed power until a report arrives."},override:{title:"Manual change",caption:"Preset target line, a manual bump, back to the preset target after the duration."},failure:{title:"Heating failure",caption:"Heating share at \u2265 threshold for longer than the delay while temperature stays flat: alert."},correction:{title:"Setpoint correction",caption:"Room temp below target; the target sent to the device is raised by the correction, capped by strength."},stagger:{title:"Several heaters in one room",caption:"Each heater on for the same share of the cycle, start times shifted."},min_on_off:{title:"Shortest on- and off-time",caption:"Very short pulses are skipped; very short pauses keep heating."}},types:{thermostat_over_switch:{title:"Switch a heater on and off",body:"Versatile Thermostat turns the device on for part of each cycle, more when the room is colder.",examples:"Electric radiators, heating cables, relays, smart plugs, pilot-wire modules."},thermostat_over_valve:{title:"Set how far a valve opens",body:"Versatile Thermostat sends an opening percentage to the valve and adjusts it as the room warms up.",examples:"Radiator valves that expose their opening as a number (e.g. some Zigbee TRVs)."},thermostat_over_climate:{title:"Drive a device with its own thermostat",body:"The device regulates itself; Versatile Thermostat sets its target and corrects it using your room sensor.",examples:"Thermostatic radiator valves, air conditioners, heat pumps."},thermostat_central_config:{title:"Central configuration",body:"Shared defaults (outdoor sensor, presets, window and safety behaviour) that every VTherm can take over.",examples:"Create it first if you have several rooms."}},window:{question:"How should this room notice an open window?",off:"No detection",sensor:"Window sensor",drop:"Temperature drop"},presets:{preset:"Preset",normal:"Normal",away:"Away",cool:"Cooling",cool_away:"Cooling, away",frost:"Frost protection",eco:"Eco",comfort:"Comfort",boost:"Boost",from_central:"These temperatures come from the central configuration and apply to every thermostat that uses it.",saved_now:"Changes here apply immediately.",pending:"Save first: the thermostat creates its own preset temperatures when it stops using the central ones."},ui:{panel_title:"Versatile Thermostat",save:"Save",create:"Create",unsaved:"Unsaved changes",required_empty:"{n} required empty",saved:"Saved. The thermostat has been reloaded.",not_saved_incomplete:"Not saved: some required settings are still empty. They are marked in the index.",not_saved_rejected:"Not saved: Versatile Thermostat rejected a setting. It is marked below.",advanced:"Advanced settings",from_central:"From the central configuration",central_nothing:"Nothing set there, so Versatile Thermostat's defaults apply.",edit_central:"Edit the central configuration",override:"Override central configuration",state_off:"Off",state_error:"Error",state_empty:"{n} empty",state_central:"Central",turn_on:"Turn on",turn_off:"Turn off",new:"New",new_vtherm:"New VTherm",choose_type:"Choose a type",shared_defaults:"Shared defaults",no_climate:"No climate entity",not_loaded:"Not loaded",thermostats:"Thermostats",chooser_question:"What does this thermostat control?",chooser_no_central:"No central configuration yet. With several rooms, create it first: every thermostat can then take over its defaults.",empty:"No Versatile Thermostats yet. Use \u201CNew\u201D above to create the first one.",discard:"Discard the unsaved changes on this thermostat?",sections:"Sections",more_info:"More information"},live:{estimate:"estimate",loading:"Loading history\u2026",no_sensor:"Pick a temperature sensor to see this.",no_temperature:"No room temperature yet.",too_little_history:"Not enough recorded temperatures in this period.",range_24h:"in the last 24 h",range_7d:"in the last 7 days",now:"now",tpi_title:"Heating",room:"Room",target:"Target",outside:"Outside",of_each_cycle:"heating: {on} on per {cycle} cycle",stopped_threshold:"Stopped: the room is past the target by more than the stop/resume threshold.",forced_min_on:"{v} would be shorter than the shortest on-time, so it stays off.",forced_min_off:"{v} would leave a pause shorter than the shortest off-time, so it stays on.",capped:"Capped at {v} (max_on_percent).",tried_target:"Trying another target.",reset:"Back to the current one",vt_now:"VT now: {v}",vt_off:"thermostat is off",vt_safety:"safety mode share",window_title:"Replay",window_no_threshold:"Set a detection threshold to see when it would have triggered. The curve shows how fast the room cooled (\xB0/h).",window_detected:"would have detected an open window {range}.",window_never:"no open window detected {range}.",steepest:"Steepest drop: {v} ({at}).",ended_by_max:"Some ended by the maximum duration.",open_line:"open",close_line:"closed",window_caveat:"Only counts while heating; VT ignores drops when it is not heating.",safety_title:"Replay",room_sensor:"Room sensor",outside_sensor:"Outside sensor",longest:"longest {v}",safety_would:"silences longer than {delay} {range}.",safety_never:"silences longer than {delay} {range}.",safety_caveat:"Safety mode only starts if the thermostat was heating at least {v} at that moment.",safety_over_climate:"Over a climate device, VT never switches to safety mode: the device keeps regulating on its own. These settings have no effect here.",ago_24h:"24 h ago",ago_7d:"7 days ago",tab_now:"now",tpi_no_history:"History appears once the thermostat exists.",calc_room:"{gap} below target \xD7 {coef}",calc_outside:"{gap} colder outside \xD7 {coef}",no_outside:"no outside sensor",sum:"Sum",capped_100:"More than 100 % is capped: the heater runs the whole cycle.",below_0:"Below 0 % means no heating: the room is warm enough.",tpi_mean:"average heating share {range}, with these settings.",legend_request:"heating share",legend_room:"room part",legend_outside:"outside part",legend_vt:"VT recorded",tpi_vs_vt:"VT recorded {vt} on average over the same time; with these settings: {ours}. They differ when the settings changed, or in safety mode.",legend_slope:"slope (estimate)",legend_vt_slope:"VT recorded"}};var Nt={cards:{room:{title:"Pi\xE8ce",subtitle:"Le nom du thermostat et ce qu'il mesure."},devices:{title:"\xC9quipements",subtitle:"Les radiateurs, vannes ou climatiseurs pilot\xE9s."},correction:{title:"Correction de consigne",subtitle:"Le capteur int\xE9gr\xE9 de l'appareil est pr\xE8s de la chaleur : VT monte ou baisse la consigne envoy\xE9e jusqu'\xE0 ce que le capteur de la pi\xE8ce atteigne votre temp\xE9rature."},heating:{title:"R\xE9gulation",subtitle:"Combien et \xE0 quelle fr\xE9quence chauffer."},presets:{title:"Presets",subtitle:"La temp\xE9rature de chaque preset."},window:{title:"Fen\xEAtre ouverte",subtitle:"Ce qui se passe quand une fen\xEAtre s'ouvre."},motion:{title:"Pr\xE9sence dans la pi\xE8ce",subtitle:"En preset Activit\xE9, la pi\xE8ce prend la temp\xE9rature d'un preset quand quelqu'un est l\xE0 et celle d'un autre quand elle est vide. Le preset reste Activit\xE9 ; les autres presets ignorent le capteur."},presence:{title:"Absence du domicile",subtitle:"Baisser la temp\xE9rature quand personne n'est l\xE0, avec une entit\xE9 person ou un capteur de pr\xE9sence."},power:{title:"Puissance et \xE9nergie",subtitle:"Consommation de l'\xE9quipement et d\xE9lestage."},boiler:{title:"Chaudi\xE8re centrale",subtitle:"Allumer la chaudi\xE8re quand un thermostat demande de la chaleur."},safety:{title:"Capteur perdu et changements manuels",subtitle:"Que faire quand le thermom\xE8tre se tait, et combien de temps dure un changement manuel."},auto_start_stop:{title:"Arr\xEAt/d\xE9marrage auto",subtitle:"\xC9teindre le climatiseur quand il n'est pas utile."},lock:{title:"Verrouillage",subtitle:"Emp\xEAcher les personnes ou automatisations de modifier ce thermostat."},other:{title:"Autres",subtitle:"R\xE9glages que cette page ne place pas encore."}},groups:{range:"Capteur ext\xE9rieur et plage de temp\xE9rature",valve:"Contr\xF4le direct de la vanne",valve_limits:"Commandes de la vanne",sync:"Synchroniser la temp\xE9rature interne de l'appareil",tpi:"Coefficients TPI",auto_tpi:"Apprentissage Auto-TPI",window_behaviour:"Ce qui se passe",motion_detect:"Capteur",motion_behaviour:"Ce qui se passe",shedding:"D\xE9lestage",failure:"D\xE9tection de panne de chauffe"},fields:{name:{label:"Nom",info:"Nom du thermostat et de son entit\xE9 climate."},temperature_sensor_entity_id:{label:"Capteur de temp\xE9rature de la pi\xE8ce",hint:"L\xE0 o\xF9 l'on vit, loin des fen\xEAtres et du radiateur.",info:"La temp\xE9rature que VT r\xE9gule. Placez-le au milieu de la pi\xE8ce : pr\xE8s d'une fen\xEAtre il r\xE9agit aux courants d'air, pr\xE8s du radiateur il lit trop chaud et la pi\xE8ce reste froide."},humidity_sensor_entity_id:{label:"Capteur d'humidit\xE9",hint:"Facultatif. Affich\xE9 sur le thermostat, sans effet sur le chauffage.",info:"Expose l'humidit\xE9 sur le thermostat ; la r\xE9gulation n'en tient pas compte. Si l'appareil du capteur de temp\xE9rature mesure aussi l'humidit\xE9, le panneau propose ce capteur."},last_seen_temperature_sensor_entity_id:{label:"Dernier contact du capteur",hint:"Facultatif. \xC9vite les fausses alertes des capteurs qui n'envoient que les changements.",info:"Une entit\xE9 date/heure indiquant le dernier contact du capteur de temp\xE9rature (\xAB last_seen \xBB sur beaucoup de capteurs Zigbee). Un capteur sur pile reste muet tant que la temp\xE9rature ne bouge pas ; sans cette entit\xE9, VT peut croire qu'il est en panne et passer en mode capteur perdu.",diagram:"safety"},external_temperature_sensor_entity_id:{label:"Capteur de temp\xE9rature ext\xE9rieure",hint:"Pour chauffer plus quand il fait froid dehors.",info:"Alimente la partie ext\xE9rieure du calcul (coef_ext). S'il ne r\xE9pond plus, le mode capteur perdu peut aussi se d\xE9clencher, sauf si c'est d\xE9sactiv\xE9 dans configuration.yaml."},temp_min:{label:"Temp\xE9rature minimale r\xE9glable",info:"Le thermostat refuse une consigne plus basse. 7 \xB0C par d\xE9faut."},temp_max:{label:"Temp\xE9rature maximale r\xE9glable",info:"Le thermostat refuse une consigne plus haute. 35 \xB0C par d\xE9faut."},step_temperature:{label:"Pas de r\xE9glage",info:"Ce que change un appui sur +/\u2212. 0,1 \xB0C par d\xE9faut."},underlying_entity_ids:{label:"\xC9quipements pilot\xE9s",info:`**over_switch** : entit\xE9s switch, input_boolean, select ou climate.
**over_valve** : entit\xE9s number qui r\xE8glent l'ouverture de la vanne.
**over_climate** : entit\xE9s climate.`},ac_mode:{label:"Climatisation",hint:"L'appareil peut refroidir.",info:"over_switch / over_valve : seul le froid est propos\xE9. over_climate : chaud et froid si l'appareil les g\xE8re. Ajoute les presets de climatisation."},inverse_switch_command:{label:"Commande invers\xE9e",hint:"Pour les modules fil pilote avec diode.",info:"Allum\xE9 signifie radiateur \xE9teint et inversement. N\xE9cessaire pour certains montages fil pilote avec diode."},heater_keep_alive:{label:"Intervalle de maintien (s)",hint:"Renvoie l'\xE9tat r\xE9guli\xE8rement. Vide : d\xE9sactiv\xE9.",info:"Certains appareils s'\xE9teignent seuls s'ils ne re\xE7oivent rien. VT r\xE9p\xE8te alors la commande marche/arr\xEAt \xE0 cet intervalle."},on_command_text:{label:"Commandes marche/arr\xEAt personnalis\xE9es",hint:"N\xE9cessaires si un \xE9quipement n'est pas un simple switch.",info:"Format commande[/attribut[:valeur]], une par \xE9quipement, dans le m\xEAme ordre. Exemples : select_option/option:comfort, set_hvac_mode/hvac_mode:heat. Les switch utilisent turn_on / turn_off."},used_by_controls_central_boiler:{label:"Chauff\xE9e par la chaudi\xE8re centrale",hint:"Allume la chaudi\xE8re quand cette pi\xE8ce demande de la chaleur.",info:"Compte les \xE9quipements de ce thermostat pour la chaudi\xE8re centrale (r\xE9gl\xE9e dans la configuration centrale). Les pi\xE8ces chauff\xE9es \xE0 l'\xE9lectricit\xE9 restent en g\xE9n\xE9ral d\xE9sactiv\xE9es."},auto_fan_mode:{label:"Ventilation renforc\xE9e loin de la consigne",info:"Fait tourner le ventilateur \xE0 ce niveau tant que la pi\xE8ce est loin de la consigne, pour r\xE9partir la chaleur plus vite."},auto_regulation_dtemp:{label:"Plus petit changement envoy\xE9 (\xB0)",hint:"Les changements plus petits ne sont pas envoy\xE9s.",info:"Limite les commandes (bruit, piles). Avec une vanne Sonoff TRVZB, gardez au moins 3 %, sinon elle peut perdre son calibrage.",diagram:"send_threshold"},auto_regulation_periode_min:{label:"D\xE9lai minimum entre deux envois (min)",info:"Une nouvelle valeur est envoy\xE9e au plus \xE0 cette fr\xE9quence.",diagram:"send_threshold"},opening_threshold_degree:{label:"Consid\xE9r\xE9e ferm\xE9e en dessous de (%)",hint:"Une ouverture demand\xE9e plus petite ferme la vanne.",info:"En dessous, la demande compte comme \xAB pas de chauffe \xBB : la vanne va \xE0 sa position la plus ferm\xE9e et la pi\xE8ce ne compte pas comme chauffante (y compris pour la chaudi\xE8re).",diagram:"valve_curve"},min_opening_degrees:{label:"Ouverture minimale en chauffe (%)",hint:"Une valeur par vanne, s\xE9par\xE9es par des virgules.",info:"D\xE8s qu'il faut chauffer, la vanne s'ouvre au moins \xE0 ce niveau. Utile pour les vannes avec une zone morte. Exemple : 15 ou \xAB 15, 20 \xBB.",diagram:"valve_curve"},max_opening_degrees:{label:"Ouverture maximale (%)",hint:"Une valeur par vanne, s\xE9par\xE9es par des virgules.",info:"La vanne ne s'ouvre jamais plus. Limite le d\xE9bit, par exemple pour \xE9quilibrer les radiateurs. Doit d\xE9passer l'ouverture minimale.",diagram:"valve_curve"},max_closing_degree:{label:"Fermeture maximale (%)",hint:"100 = enti\xE8rement ferm\xE9e.",info:"En dessous de 100, un peu d'eau circule toujours, par exemple 90 garde 10 % d'ouverture (plus silencieux, prot\xE8ge le circulateur).",diagram:"valve_curve"},auto_regulation_mode:{label:"Force de la correction",hint:"Commencez par L\xE9g\xE8re, augmentez seulement si la consigne n'est pas atteinte.",info:"L'appareil r\xE9gule sur son propre capteur, souvent pr\xE8s de la source de chaleur. VT d\xE9cale la consigne envoy\xE9e pour que le capteur de la pi\xE8ce atteigne votre temp\xE9rature. L\xE9g\xE8re : jusqu'\xE0 1,5 \xB0, Moyenne : 2 \xB0, Forte : 3 \xB0. Expert utilise configuration.yaml. \xAB Contr\xF4le direct de la vanne \xBB r\xE8gle l'ouverture lui-m\xEAme. Plus de correction = plus d'\xE9nergie et d'usure.",diagram:"correction"},auto_regulation_use_device_temp:{label:"Compenser le capteur de l'appareil",hint:"Rarement utile. Essayez d'abord la correction.",info:"Ajoute (temp\xE9rature de l'appareil \u2212 temp\xE9rature de la pi\xE8ce) \xE0 la consigne. Exemple : pi\xE8ce 18 \xB0, appareil 22 \xB0 : VT envoie 4 \xB0 de plus pour que l'appareil chauffe vraiment."},opening_degree_entity_ids:{label:"Entit\xE9s d'ouverture de vanne",hint:"Une par \xE9quipement, dans le m\xEAme ordre.",info:"Les entit\xE9s number qui r\xE8glent l'ouverture de chaque vanne."},closing_degree_entity_ids:{label:"Entit\xE9s de fermeture de vanne",hint:"Facultatif. Toutes ou aucune.",info:"Si la vanne a aussi une entit\xE9 de fermeture, VT la r\xE8gle \xE0 100 \u2212 ouverture."},sync_entity_ids:{label:"Entit\xE9s \xE0 synchroniser",hint:"Une par \xE9quipement, dans le m\xEAme ordre.",info:"L'entit\xE9 de calibrage de l'appareil (mode d\xE9calage) ou son entr\xE9e de temp\xE9rature externe (mode direct). Certains appareils demandent un r\xE9glage en plus, par ex. Sonoff TRVZB : sensor_select = external."},sync_with_calibration:{label:"Utiliser le d\xE9calage de calibrage",hint:"Oui : ajuste le d\xE9calage de l'appareil. Non : envoie la temp\xE9rature de la pi\xE8ce.",info:"Le mode d\xE9calage marche avec la plupart des vannes (local_temperature_calibration). Le mode direct demande un appareil qui accepte une temp\xE9rature externe."},proportional_function:{label:"Algorithme",hint:"TPI est int\xE9gr\xE9. Les autres algorithmes sont des plugins \xE0 part.",info:"Seul TPI est fourni avec Versatile Thermostat. Les autres algorithmes, comme **SmartPI** (apprend la pi\xE8ce ; recommand\xE9 par l'auteur de VT), sont des plugins \xE0 installer d'abord (versatile-thermostat.org/fr/plugins). Une fois install\xE9s, ils apparaissent dans cette liste."},cycle_min:{label:"Dur\xE9e du cycle (min)",hint:"5 minutes conviennent \xE0 la plupart des pi\xE8ces ; plus pour un chauffage lent.",info:"\xC0 chaque cycle, VT calcule la chaleur n\xE9cessaire et, pour un interrupteur, garde le radiateur allum\xE9 pendant cette part du cycle. Des cycles courts r\xE9agissent plus vite mais commutent plus souvent ; un chauffage lent (plancher, accumulation) veut des cycles plus longs. Trop court, le radiateur ne chauffe jamais vraiment.",diagram:"tpi_cycle"},tpi_coef_int:{label:"Facteur \xE9cart pi\xE8ce (coef_int)",hint:"Plus haut : rattrape plus vite. Baissez s'il d\xE9passe.",info:"Part de chauffe = coef_int \xD7 (consigne \u2212 pi\xE8ce) + coef_ext \xD7 (consigne \u2212 ext\xE9rieur). Consigne atteinte trop lentement : augmentez. Oscillations : baissez. 0,6 par d\xE9faut.",diagram:"tpi_formula"},tpi_coef_ext:{label:"Facteur ext\xE9rieur (coef_ext)",hint:"Augmentez si la pi\xE8ce se stabilise sous la consigne.",info:"Compense les pertes vers l'ext\xE9rieur. Stabilis\xE9e en dessous : augmentez. Au-dessus : baissez. 0,01 par d\xE9faut.",diagram:"tpi_formula"},minimal_activation_delay:{label:"Dur\xE9e de marche minimale (s)",hint:"Les impulsions plus courtes sont ignor\xE9es.",info:"\xC9vite des impulsions trop courtes pour \xEAtre utiles. 10 s par d\xE9faut.",diagram:"min_on_off"},minimal_deactivation_delay:{label:"Dur\xE9e d'arr\xEAt minimale (s)",hint:"Les pauses plus courtes sont ignor\xE9es (reste allum\xE9).",info:"\xC9vite de couper quelques secondes seulement. 0 par d\xE9faut.",diagram:"min_on_off"},tpi_threshold_high:{label:"Arr\xEAt au-dessus de consigne + (\xB0)",hint:"0 = d\xE9sactiv\xE9. Il faut aussi la valeur de reprise.",info:"Si la pi\xE8ce d\xE9passe la consigne de cette valeur, la chauffe s'arr\xEAte compl\xE8tement jusqu'\xE0 redescendre sous consigne + reprise. Les deux valeurs sont n\xE9cessaires.",diagram:"tpi_thresholds"},tpi_threshold_low:{label:"Reprise sous consigne + (\xB0)",hint:"Doit \xEAtre plus petite que la valeur d'arr\xEAt.",info:"Voir \xAB Arr\xEAt au-dessus de consigne \xBB.",diagram:"tpi_thresholds"},auto_tpi_learning_type:{label:"Type d'apprentissage",hint:"D\xE9couverte pour une nouvelle installation, Affinage pour peaufiner.",info:"Une session dure environ 48 h et se lance \xE0 la main (service ou carte Auto-TPI). D\xE9couverte : rapide, depuis z\xE9ro. Affinage : lent, petites corrections."},auto_tpi_heating_rate:{label:"Vitesse de chauffe (\xB0/h)",hint:"0 = mesur\xE9e automatiquement.",info:"La vitesse \xE0 laquelle le radiateur chauffe la pi\xE8ce \xE0 pleine puissance."},heater_heating_time:{label:"Temps de mont\xE9e (min)",hint:"Temps pour atteindre la pleine puissance, ex. 5 pour un radiateur \xE9lectrique."},heater_cooling_time:{label:"Temps de refroidissement (min)",hint:"Temps pour refroidir apr\xE8s l'arr\xEAt, ex. 7 pour un radiateur \xE9lectrique."},auto_tpi_aggressiveness:{label:"Agressivit\xE9",hint:"Baissez (ex. 0,8) en cas de d\xE9passements r\xE9p\xE9t\xE9s.",info:"R\xE9duit les coefficients appris. 1,0 = tels qu'appris."},auto_tpi_continuous_kext:{label:"Apprentissage continu du facteur ext\xE9rieur",hint:"Ajustement lent en arri\xE8re-plan entre les sessions."},auto_tpi_enable_advanced_settings:{label:"Afficher les param\xE8tres d'apprentissage"},auto_tpi_avg_initial_weight:{label:"Poids des anciennes valeurs",hint:"1 = remplace vite, 50 = change lentement."},auto_tpi_ema_alpha:{label:"Alpha",hint:"Plus haut : r\xE9agit plus vite aux derniers cycles."},auto_tpi_ema_decay_rate:{label:"Taux de d\xE9croissance",hint:"Ralentit l'apprentissage avec le temps."},auto_tpi_continuous_kext_alpha:{label:"Vitesse de l'apprentissage continu",hint:"0,04 par d\xE9faut \u2248 quelques jours pour s'adapter."},use_presets_central_config:{label:"Utiliser les temp\xE9ratures de la configuration centrale",hint:"Non : cette pi\xE8ce a ses propres temp\xE9ratures \xC9co/Confort/Boost.",info:"Les temp\xE9ratures des presets sont des entit\xE9s number du thermostat, ou de la configuration centrale quand ceci est activ\xE9."},use_central_mode:{label:"Suivre le mode central",hint:"Un seul r\xE9glage peut arr\xEAter toutes les pi\xE8ces ou les mettre hors-gel.",info:"La configuration centrale a un select (Auto, Arr\xEAt, Chauffage seul, Froid seul, Hors-gel) qui pilote chaque thermostat o\xF9 ceci est activ\xE9."},window_sensor_entity_id:{label:"Capteur d'ouverture",hint:"Un binary_sensor ou un groupe.",info:"Pour plusieurs fen\xEAtres, cr\xE9ez un groupe de binary_sensor."},window_delay:{label:"Attente avant de r\xE9agir (s)",hint:"Une a\xE9ration courte n'arr\xEAte pas le chauffage.",info:"La fen\xEAtre doit rester ouverte ce temps avant l'action.",diagram:"window_delay"},window_off_delay:{label:"Attente apr\xE8s fermeture (s)",hint:"Vide : m\xEAme valeur que ci-dessus.",info:"La fen\xEAtre doit rester ferm\xE9e ce temps avant la reprise.",diagram:"window_delay"},window_auto_open_threshold:{label:"D\xE9tecter une baisse plus rapide que (\xB0/h)",hint:"Plus bas d\xE9tecte plus t\xF4t, avec plus de fausses alertes. Essayez 3.",info:"VT surveille la pente de la temp\xE9rature. Une chute brutale au-del\xE0 de ce rythme compte comme une fen\xEAtre ouverte. Pas pour les couloirs ou les pi\xE8ces aux variations normales fortes.",diagram:"window_slope"},window_auto_close_threshold:{label:"Consid\xE9r\xE9e ferm\xE9e au-dessus de (\xB0/h)",hint:"En g\xE9n\xE9ral 0 : la temp\xE9rature ne baisse plus.",diagram:"window_slope"},window_auto_max_duration:{label:"Abandonner apr\xE8s (min)",hint:"Le chauffage reprend m\xEAme si \xE7a refroidit encore. Essayez 30 \xE0 60.",diagram:"window_slope"},window_action:{label:"Fen\xEAtre ouverte",hint:"Arr\xEAt, ventilation seule, hors-gel ou \xE9co.",info:"Hors-gel et \xC9co changent la consigne sans changer le preset : le preset affich\xE9 peut diff\xE9rer de la consigne."},motion_sensor_entity_id:{label:"Capteur de pr\xE9sence de la pi\xE8ce",hint:"Un capteur de mouvement ou de pr\xE9sence (mmWave) dans cette pi\xE8ce.",info:`VT appelle cette fonction \xAB mouvement \xBB, mais elle demande seulement si quelqu'un est dans la pi\xE8ce : on = occup\xE9e, off = vide. Un capteur de pr\xE9sence convient le mieux ; un capteur de mouvement fonctionne aussi.

Elle n'agit qu'en preset **Activit\xE9**, qui appara\xEEt une fois cette carte configur\xE9e. Le preset reste Activit\xE9 ; seule la consigne change : la temp\xE9rature du preset \xAB occup\xE9e \xBB tant que quelqu'un est l\xE0, celle du preset \xAB vide \xBB quand la pi\xE8ce est vide depuis un moment. En \xC9co, Confort, Boost ou en temp\xE9rature manuelle, le capteur est ignor\xE9 : un preset choisi explicitement l'emporte toujours.`},motion_preset:{label:"Temp\xE9rature pi\xE8ce occup\xE9e",diagram:"motion",hint:"La temp\xE9rature de ce preset est utilis\xE9e ; le preset s\xE9lectionn\xE9 reste Activit\xE9."},no_motion_preset:{label:"Temp\xE9rature pi\xE8ce vide",diagram:"motion",hint:"La temp\xE9rature de ce preset est utilis\xE9e tant que la pi\xE8ce est vide."},motion_delay:{label:"Occup\xE9e apr\xE8s (s)",hint:"Un simple passage ne compte pas.",diagram:"motion"},motion_off_delay:{label:"Vide apr\xE8s (s)",diagram:"motion"},presence_sensor_entity_id:{label:"Capteur de pr\xE9sence au domicile",hint:"on/home = quelqu'un, off/not_home = absent.",info:"Une entit\xE9 person ou un binary_sensor (un groupe de binary_sensor fonctionne). Un groupe de personnes ne fonctionne pas : la documentation de VT recommande un template. En absence, les temp\xE9ratures \xAB absent \xBB des presets s'appliquent."},device_power:{label:"Puissance de l'\xE9quipement",hint:"Total de tous les \xE9quipements ; m\xEAme unit\xE9 partout.",info:"Utilis\xE9e pour les capteurs d'\xE9nergie, le d\xE9lestage et la chaudi\xE8re centrale."},power_unit:{label:"Unit\xE9"},power_sensor_entity_id:{label:"Capteur de consommation du logement",hint:"Puissance totale consomm\xE9e en ce moment."},max_power_sensor_entity_id:{label:"Capteur de puissance maximale autoris\xE9e",hint:"Gardez une marge sous votre abonnement.",info:"Ce n'est pas une s\xE9curit\xE9 : un d\xE9passement reste possible entre deux mesures."},power_temp:{label:"Temp\xE9rature pendant le d\xE9lestage"},safety_delay_min:{label:"Capteur muet depuis (min)",hint:"Puis puissance fixe de s\xE9curit\xE9. Capteurs sur pile : 120 \xE0 240.",info:"Sans temp\xE9rature pendant ce temps, VT ne fait plus confiance au capteur. Renseignez \xAB dernier contact \xBB dans Pi\xE8ce pour \xE9viter les fausses alertes.",diagram:"safety"},safety_default_on_percent:{label:"Puissance fixe en capteur perdu",hint:"0,1 = 10 %. 0 risque le gel.",diagram:"safety"},safety_min_on_percent:{label:"Seulement si la chauffe d\xE9passe",hint:"0,5 = 50 %. En dessous, la perte du capteur est ignor\xE9e.",info:"Un radiateur qui chauffe peu ne peut pas surchauffer la pi\xE8ce : inutile de r\xE9agir.",diagram:"safety"},manual_override_duration_min:{label:"Retour au preset apr\xE8s un changement manuel (min)",hint:"0 = garder la temp\xE9rature manuelle.",diagram:"override"},repair_incorrect_state:{label:"Renvoyer les commandes ignor\xE9es",hint:"Pour les relais ou vannes qui ratent parfois une commande.",info:"5 essais de suite au maximum ; des r\xE9parations fr\xE9quentes signalent un probl\xE8me mat\xE9riel ou r\xE9seau."},heating_failure_threshold:{label:"Chauffe forte = au moins",hint:"0,9 = 90 %.",diagram:"failure"},cooling_failure_threshold:{label:"Chauffe coup\xE9e = au plus",hint:"0 = 0 %.",diagram:"failure"},heating_failure_detection_delay:{label:"Alerter apr\xE8s (min)",hint:"Augmentez pour un plancher chauffant ou une grande pi\xE8ce.",diagram:"failure"},temperature_change_tolerance:{label:"Ignorer les variations sous (\xB0)",hint:"Filtre le bruit du capteur.",diagram:"failure"},failure_detection_enable_template:{label:"D\xE9tecter seulement si (template)",hint:"Facultatif."},auto_start_stop_level:{label:"Vitesse de r\xE9action",hint:"Rapide arr\xEAte et red\xE9marre plus souvent.",info:"Tr\xE8s lent \u2248 60 min entre arr\xEAt et red\xE9marrage, lent \u2248 30, moyen \u2248 15, rapide \u2248 7. Ne red\xE9marre que les appareils qu'il a arr\xEAt\xE9s lui-m\xEAme."},lock_users:{label:"Bloquer les changements depuis l'interface",info:"Fen\xEAtres, s\xE9curit\xE9 et d\xE9lestage continuent de fonctionner."},lock_automations:{label:"Bloquer les automatisations et programmateurs"},lock_code:{label:"Code PIN",hint:"4 chiffres. Facultatif."},auto_relock_sec:{label:"Reverrouiller apr\xE8s (s)",hint:"0 = reste d\xE9verrouill\xE9."},"auto_regulation_dtemp@thermostat_over_valve":{label:"Plus petit changement d'ouverture envoy\xE9 (%)",hint:"Les changements plus petits ne sont pas envoy\xE9s \xE0 la vanne.",info:"Limite les mouvements de la vanne (bruit, piles).",diagram:"send_threshold"},"auto_regulation_periode_min@thermostat_over_valve":{label:"D\xE9lai minimum entre deux ouvertures (min)",info:"La vanne re\xE7oit une nouvelle ouverture au plus \xE0 cette fr\xE9quence.",diagram:"send_threshold"},"underlying_entity_ids@thermostat_over_switch":{label:"\xC9quipements pilot\xE9s",hint:"Plusieurs interrupteurs d\xE9marrent en d\xE9cal\xE9 pour lisser la puissance.",info:`**over_switch** : entit\xE9s switch, input_boolean, select ou climate.
**over_valve** : entit\xE9s number qui r\xE8glent l'ouverture de la vanne.
**over_climate** : entit\xE9s climate.

Avec plusieurs interrupteurs, chacun garde tout son temps de chauffe ; VT d\xE9cale seulement leurs d\xE9parts pour qu'ils soient moins souvent allum\xE9s ensemble. \xC0 forte demande, ils se chevauchent.`,diagram:"stagger"}},diagrams:{tpi_cycle:{title:"Cycle de chauffe",caption:"\xC0 chaque cycle, le radiateur chauffe pendant la part demand\xE9e."},tpi_formula:{title:"Combien chauffer",caption:"\xC9cart pi\xE8ce \xD7 coef_int + \xE9cart ext\xE9rieur \xD7 coef_ext."},tpi_thresholds:{title:"Bande d'arr\xEAt et de reprise",caption:"Arr\xEAt au-dessus de consigne + arr\xEAt, reprise sous consigne + reprise."},valve_curve:{title:"Ouverture demand\xE9e et envoy\xE9e",caption:"Ferm\xE9e sous le seuil, puis au moins l'ouverture minimale, au plus la maximale."},send_threshold:{title:"Seuls les vrais changements sont envoy\xE9s",caption:"La valeur envoy\xE9e ne bouge que si l'\xE9cart d\xE9passe le seuil."},window_delay:{title:"Chronologie fen\xEAtre",caption:"Une ouverture courte ne fait rien ; une longue d\xE9clenche l'action apr\xE8s l'attente."},window_slope:{title:"D\xE9tection par chute de temp\xE9rature",caption:"Une chute brutale marque \xAB ouverte \xBB jusqu'\xE0 ce que la pente remonte."},motion:{title:"Chronologie de pr\xE9sence",caption:"Un passage ne fait rien ; rester applique la temp\xE9rature \xAB occup\xE9e \xBB ; partir r\xE9tablit la temp\xE9rature \xAB vide \xBB apr\xE8s le d\xE9lai. Le preset reste Activit\xE9."},safety:{title:"Capteur perdu",caption:"Silence plus long que le d\xE9lai : puissance fixe jusqu'au retour d'une mesure."},override:{title:"Changement manuel",caption:"Retour \xE0 la consigne du preset apr\xE8s la dur\xE9e."},failure:{title:"Panne de chauffe",caption:"Chauffe forte plus longtemps que le d\xE9lai sans hausse de temp\xE9rature : alerte."},correction:{title:"Correction de consigne",caption:"La consigne envoy\xE9e monte tant que la pi\xE8ce est sous la consigne."},stagger:{title:"Plusieurs radiateurs dans une pi\xE8ce",caption:"M\xEAme part de cycle pour chacun, d\xE9parts d\xE9cal\xE9s."},min_on_off:{title:"Dur\xE9es de marche et d'arr\xEAt minimales",caption:"Les impulsions trop courtes sont ignor\xE9es ; les pauses trop courtes aussi (reste allum\xE9)."}},types:{thermostat_over_switch:{title:"Allumer et \xE9teindre un radiateur",body:"Versatile Thermostat allume l'appareil une partie de chaque cycle, plus longtemps quand la pi\xE8ce est froide.",examples:"Radiateurs \xE9lectriques, c\xE2bles chauffants, relais, prises connect\xE9es, modules fil pilote."},thermostat_over_valve:{title:"R\xE9gler l'ouverture d'une vanne",body:"Versatile Thermostat envoie un pourcentage d'ouverture \xE0 la vanne et l'ajuste pendant que la pi\xE8ce chauffe.",examples:"Vannes de radiateur qui exposent leur ouverture en number (certaines vannes Zigbee)."},thermostat_over_climate:{title:"Piloter un appareil qui a son propre thermostat",body:"L'appareil r\xE9gule lui-m\xEAme ; Versatile Thermostat r\xE8gle sa consigne et la corrige avec votre capteur de pi\xE8ce.",examples:"T\xEAtes thermostatiques, climatiseurs, pompes \xE0 chaleur."},thermostat_central_config:{title:"Configuration centrale",body:"R\xE9glages partag\xE9s (capteur ext\xE9rieur, presets, fen\xEAtres, s\xE9curit\xE9) que chaque VTherm peut reprendre.",examples:"\xC0 cr\xE9er en premier si vous avez plusieurs pi\xE8ces."}},window:{question:"Comment cette pi\xE8ce rep\xE8re-t-elle une fen\xEAtre ouverte ?",off:"Pas de d\xE9tection",sensor:"Capteur d'ouverture",drop:"Chute de temp\xE9rature"},presets:{preset:"Preset",normal:"Normal",away:"Absent",cool:"Climatisation",cool_away:"Climatisation, absent",frost:"Hors-gel",eco:"\xC9co",comfort:"Confort",boost:"Boost",from_central:"Ces temp\xE9ratures viennent de la configuration centrale et s'appliquent \xE0 tous les thermostats qui l'utilisent.",saved_now:"Les changements ici s'appliquent imm\xE9diatement.",pending:"Enregistrez d'abord : le thermostat cr\xE9e ses propres temp\xE9ratures quand il n'utilise plus celles de la configuration centrale."},ui:{panel_title:"Versatile Thermostat",save:"Enregistrer",create:"Cr\xE9er",unsaved:"Modifications non enregistr\xE9es",required_empty:"{n} obligatoire(s) vide(s)",saved:"Enregistr\xE9. Le thermostat a \xE9t\xE9 recharg\xE9.",not_saved_incomplete:"Non enregistr\xE9 : des r\xE9glages obligatoires sont encore vides. Ils sont signal\xE9s dans l'index.",not_saved_rejected:"Non enregistr\xE9 : Versatile Thermostat a refus\xE9 un r\xE9glage. Il est signal\xE9 ci-dessous.",advanced:"R\xE9glages avanc\xE9s",from_central:"Depuis la configuration centrale",central_nothing:"Rien n'y est r\xE9gl\xE9 : les valeurs par d\xE9faut de Versatile Thermostat s'appliquent.",edit_central:"Modifier la configuration centrale",override:"Remplacer la configuration centrale",state_off:"D\xE9sactiv\xE9",state_error:"Erreur",state_empty:"{n} vide(s)",state_central:"Centrale",turn_on:"Activer",turn_off:"D\xE9sactiver",new:"Nouveau",new_vtherm:"Nouveau VTherm",choose_type:"Choisir un type",shared_defaults:"R\xE9glages partag\xE9s",no_climate:"Pas d'entit\xE9 climate",not_loaded:"Non charg\xE9",thermostats:"Thermostats",chooser_question:"Que pilote ce thermostat ?",chooser_no_central:"Pas encore de configuration centrale. Avec plusieurs pi\xE8ces, cr\xE9ez-la d'abord : chaque thermostat pourra reprendre ses r\xE9glages.",empty:"Aucun Versatile Thermostat pour l'instant. Utilisez \xAB Nouveau \xBB ci-dessus pour cr\xE9er le premier.",discard:"Abandonner les modifications non enregistr\xE9es de ce thermostat ?",sections:"Sections",more_info:"Plus d'informations"},live:{estimate:"estimation",loading:"Chargement de l'historique\u2026",no_sensor:"Choisissez un capteur de temp\xE9rature pour voir ceci.",no_temperature:"Pas encore de temp\xE9rature de la pi\xE8ce.",too_little_history:"Pas assez de temp\xE9ratures enregistr\xE9es sur cette p\xE9riode.",range_24h:"sur les derni\xE8res 24 h",range_7d:"sur les 7 derniers jours",now:"maintenant",tpi_title:"Chauffe",room:"Pi\xE8ce",target:"Consigne",outside:"Ext\xE9rieur",of_each_cycle:"chauffe : {on} par cycle de {cycle}",stopped_threshold:"Arr\xEAt\xE9 : la pi\xE8ce d\xE9passe la consigne de plus que le seuil d'arr\xEAt/reprise.",forced_min_on:"{v} serait plus court que la dur\xE9e minimale d'activation : reste \xE9teint.",forced_min_off:"{v} laisserait une pause plus courte que la dur\xE9e minimale de d\xE9sactivation : reste allum\xE9.",capped:"Plafonn\xE9 \xE0 {v} (max_on_percent).",tried_target:"Essai d'une autre consigne.",reset:"Revenir \xE0 l'actuelle",vt_now:"VT actuellement : {v}",vt_off:"thermostat \xE9teint",vt_safety:"part du mode s\xE9curit\xE9",window_title:"Rejeu",window_no_threshold:"R\xE9glez un seuil de d\xE9tection pour voir quand il se serait d\xE9clench\xE9. La courbe montre la vitesse de refroidissement (\xB0/h).",window_detected:"fen\xEAtre ouverte d\xE9tect\xE9e {range}.",window_never:"aucune fen\xEAtre ouverte d\xE9tect\xE9e {range}.",steepest:"Baisse la plus forte : {v} ({at}).",ended_by_max:"Certaines termin\xE9es par la dur\xE9e maximale.",open_line:"ouverte",close_line:"ferm\xE9e",window_caveat:"Ne compte que pendant la chauffe ; VT ignore les baisses quand il ne chauffe pas.",safety_title:"Rejeu",room_sensor:"Capteur de la pi\xE8ce",outside_sensor:"Capteur ext\xE9rieur",longest:"le plus long {v}",safety_would:"silences de plus de {delay} {range}.",safety_never:"silences de plus de {delay} {range}.",safety_caveat:"Le mode s\xE9curit\xE9 ne d\xE9marre que si le thermostat chauffait au moins \xE0 {v} \xE0 ce moment.",safety_over_climate:"Sur un \xE9quipement climate, VT ne passe jamais en mode s\xE9curit\xE9 : l'\xE9quipement continue de r\xE9guler seul. Ces r\xE9glages n'ont pas d'effet ici.",ago_24h:"il y a 24 h",ago_7d:"il y a 7 jours",tab_now:"maintenant",tpi_no_history:"L'historique appara\xEEt une fois le thermostat cr\xE9\xE9.",calc_room:"{gap} sous la consigne \xD7 {coef}",calc_outside:"{gap} plus froid dehors \xD7 {coef}",no_outside:"pas de capteur ext\xE9rieur",sum:"Somme",capped_100:"Au-del\xE0 de 100 %, c'est plafonn\xE9 : le chauffage tourne tout le cycle.",below_0:"Sous 0 %, pas de chauffe : la pi\xE8ce est assez chaude.",tpi_mean:"part de chauffe moyenne {range}, avec ces r\xE9glages.",legend_request:"part de chauffe",legend_room:"part pi\xE8ce",legend_outside:"part ext\xE9rieur",legend_vt:"enregistr\xE9 par VT",tpi_vs_vt:"VT a enregistr\xE9 {vt} en moyenne sur la m\xEAme p\xE9riode ; avec ces r\xE9glages : {ours}. L'\xE9cart vient de r\xE9glages modifi\xE9s ou du mode s\xE9curit\xE9.",legend_slope:"pente (estimation)",legend_vt_slope:"enregistr\xE9e par VT"}};var Vt={en:N,fr:Nt},G=N,Je="en";function Ut(s){Je=(s??"en").split("-")[0],G=Vt[Je]??N}var Or=()=>Je in Vt,Bt=(s,t)=>t?s.replace(/\{(\w+)\}/g,(e,r)=>String(t[r]??`{${r}}`)):s,w=(s,t)=>Bt(G.ui[s]??N.ui[s],t),et=s=>G.cards[s]??N.cards[s]??N.cards.other,Ft=s=>G.groups[s]??N.groups[s],jt=s=>G.types[s]??N.types[s],He=s=>G.window[s]??N.window[s],Z=s=>G.presets[s]??N.presets[s],g=(s,t)=>Bt(G.live[s]??N.live[s]??s,t),Wt=s=>G.diagrams[s]??N.diagrams[s];function tt(s,t){if(!Or())return;let e=G.fields;return t&&e[`${s}@${t}`]||e[s]}var Mr="component.versatile_thermostat";async function Gt(s){await Promise.all([s.loadBackendTranslation("config","versatile_thermostat"),s.loadBackendTranslation("selector","versatile_thermostat")])}function he(s,t,e){return s.localize(`${Mr}.${t}`,e)||""}var Kt=(s,t,e,r)=>he(s,`config.step.${t}.data.${e}`,r)||e,Zt=(s,t,e,r)=>he(s,`config.step.${t}.data_description.${e}`,r),rt=(s,t)=>he(s,`config.error.${t}`)||he(s,`options.error.${t}`)||t,Ae=(s,t)=>he(s,`selector.thermostat_type.options.${t}`)||t,Xt=s=>t=>he(s,`selector.${t}`);var ae="thermostat_central_config",st="choose",Ee={thermostat_central_config:"mdi:cog-transfer",thermostat_over_switch:"mdi:toggle-switch-outline",thermostat_over_climate:"mdi:thermostat",thermostat_over_valve:"mdi:pipe-valve"},Ir={heating:"var(--state-climate-heat-color, #ff8100)",cooling:"var(--state-climate-cool-color, #2b9af9)",idle:"var(--secondary-text-color)",off:"var(--disabled-text-color, #888)"},X=class extends O{constructor(){super(...arguments);this.entries=[]}select(e){this.dispatchEvent(new CustomEvent("vtherm-open",{detail:e,bubbles:!0,composed:!0}))}render(){return o`
      <div class="row" role="tablist" aria-label=${w("thermostats")}>
        ${this.entries.map(e=>this.tile(e))}
        ${this.newType?o`<div class="tile selected new" role="tab" aria-selected="true">
              <ha-icon icon=${Ee[this.newType]??"mdi:plus"}></ha-icon>
              <div class="main">
                <div class="name">${w("new_vtherm")}</div>
                <div class="sub">${Ee[this.newType]?Ae(this.hass,this.newType):w("choose_type")}</div>
              </div>
            </div>`:o`<button class="tile add" @click=${()=>this.select({newType:st})}>
              <ha-icon icon="mdi:plus"></ha-icon><span>${w("new")}</span>
            </button>`}
      </div>
    `}tile(e){let r=e.thermostat_type===ae,n=e.climate_entity_id?this.hass.states[e.climate_entity_id]:void 0,i=n?.attributes.hvac_action??(n?.state==="off"?"off":void 0),a=this.hass.config?.unit_system?.temperature??"\xB0",l=n?.attributes.current_temperature,c=n?.attributes.temperature,d=e.entry_id===this.selected&&!this.newType;return o`<button
      class="tile ${d?"selected":""} ${r?"central":""}"
      role="tab"
      aria-selected=${d}
      style=${i?`--action: ${Ir[i]??"var(--secondary-text-color)"}`:""}
      @click=${()=>this.select({entryId:e.entry_id})}
    >
      <ha-icon icon=${Ee[e.thermostat_type]??"mdi:thermostat"}></ha-icon>
      <div class="main">
        <div class="name">${e.title}</div>
        ${r?o`<div class="sub">${w("shared_defaults")}</div>`:n?o`<div class="temps">
                  <span class="cur">${l??"\u2013"}${a}</span><span class="arrow">→</span><span>${c??"\u2013"}${a}</span>
                </div>
                <div class="sub">
                  <span class="dot"></span>${this.statusText(n)}
                </div>`:o`<div class="sub">${e.loaded?w("no_climate"):w("not_loaded")}</div>`}
      </div>
    </button>`}statusText(e){if(e.state==="off")return this.hass.formatEntityState?.(e)??"off";let r=e.attributes.hvac_action?this.hass.formatEntityAttributeValue?.(e,"hvac_action")??e.attributes.hvac_action:"",n=e.attributes.preset_mode&&e.attributes.preset_mode!=="none"?this.hass.formatEntityAttributeValue?.(e,"preset_mode")??e.attributes.preset_mode:"";return[r,n].filter(Boolean).join(" \xB7 ")||(this.hass.formatEntityState?.(e)??e.state)}};X.styles=I`
    :host { display: block; }
    .row { display: flex; gap: 10px; overflow-x: auto; padding: 2px 2px 6px; scrollbar-width: thin; }
    .tile {
      all: unset; box-sizing: border-box; flex: 0 0 auto; display: flex; align-items: center; gap: 10px;
      min-width: 170px; max-width: 240px; padding: 10px 14px; border-radius: 12px; cursor: pointer;
      background: var(--ha-card-background, var(--card-background-color)); border: 1px solid var(--divider-color);
      position: relative; --mdc-icon-size: 22px;
    }
    .tile:hover { border-color: var(--secondary-text-color); }
    .tile:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .tile.selected { border-color: var(--primary-color); box-shadow: inset 0 0 0 1px var(--primary-color); }
    .tile > ha-icon { color: var(--action, var(--secondary-text-color)); }
    .tile.central > ha-icon { color: var(--secondary-text-color); }
    .main { min-width: 0; display: flex; flex-direction: column; gap: 1px; }
    .name { font-size: 15px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .temps { font-size: 14px; font-variant-numeric: tabular-nums; display: flex; gap: 4px; align-items: baseline; }
    .temps .cur { font-weight: 500; }
    .temps .arrow { color: var(--secondary-text-color); }
    .sub { font-size: 12px; color: var(--secondary-text-color); display: flex; align-items: center; gap: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--action, var(--secondary-text-color)); flex-shrink: 0; }
    .tile.add { min-width: 0; color: var(--primary-color); gap: 6px; font-size: 14px; }
    .tile.new { border-style: dashed; cursor: default; }
  `,u([y({attribute:!1})],X.prototype,"hass",2),u([y({attribute:!1})],X.prototype,"entries",2),u([y()],X.prototype,"selected",2),u([y()],X.prototype,"newType",2),X=u([z("vtherm-switcher")],X);var J=class extends O{constructor(){super(...arguments);this.types=[];this.hasCentral=!1}pick(e){this.dispatchEvent(new CustomEvent("vtherm-open",{detail:{newType:e},bubbles:!0,composed:!0}))}render(){let e=this.types.filter(n=>n!==ae),r=this.hasCentral?e:[ae,...e];return o`
      <h2>${w("chooser_question")}</h2>
      ${this.hasCentral?"":o`<p class="hint">${w("chooser_no_central")}</p>`}
      <div class="grid">
        ${r.map(n=>{let i=jt(n);return o`<button class="type ${n===ae?"central":""}" @click=${()=>this.pick(n)}>
            <ha-icon icon=${Ee[n]}></ha-icon>
            <span class="title">${i?.title??n}</span>
            <span class="body">${i?.body??""}</span>
            <span class="examples">${i?.examples??""}</span>
          </button>`})}
      </div>
    `}};J.styles=I`
    :host { display: block; max-width: 1100px; margin: 0 auto; padding: 8px 16px 32px; box-sizing: border-box; }
    h2 { font-size: 20px; font-weight: 500; margin: 8px 0 4px; }
    .hint { color: var(--secondary-text-color); margin: 0 0 16px; max-width: 70ch; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 16px; }
    .type {
      all: unset; box-sizing: border-box; cursor: pointer; display: flex; flex-direction: column; gap: 8px; padding: 20px;
      border-radius: 12px; border: 1px solid var(--divider-color); background: var(--ha-card-background, var(--card-background-color));
      --mdc-icon-size: 32px;
    }
    .type:hover { border-color: var(--primary-color); }
    .type:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .type ha-icon { color: var(--primary-color); }
    .title { font-size: 17px; font-weight: 500; }
    .body { font-size: 14px; color: var(--primary-text-color); line-height: 1.45; }
    .examples { font-size: 13px; color: var(--secondary-text-color); line-height: 1.4; }
    .type.central { border-style: dashed; }
  `,u([y({attribute:!1})],J.prototype,"hass",2),u([y({attribute:!1})],J.prototype,"types",2),u([y({type:Boolean})],J.prototype,"hasCentral",2),J=u([z("vtherm-type-chooser")],J);var C=240,M=96,E="var(--primary-color)",x="var(--warning-color)",V="var(--secondary-text-color)",me="var(--divider-color)",v=(s,t,e,r="start",n=V)=>k`<text x=${s} y=${t} fill=${n} font-size="9" text-anchor=${r}>${e}</text>`,Ce=(s,t=me,e="")=>k`<line x1="8" x2=${C-8} y1=${s} y2=${s} stroke=${t} stroke-width="1" stroke-dasharray=${e}></line>`,ee=()=>k`<line x1="8" x2=${C-8} y1=${M-14} y2=${M-14} stroke=${V} stroke-width="1"></line>`,Yt={tpi_cycle:()=>k`
    ${ee()}
    ${[0,1,2,3].map(s=>k`<line x1=${8+s*74.6} x2=${8+s*74.6} y1="20" y2=${M-10} stroke=${me}></line>`)}
    <rect x="8" y="40" width="44.8" height="28" fill=${E} rx="2"></rect>
    <rect x="82.6" y="40" width="22.4" height="28" fill=${E} rx="2"></rect>
    <rect x="157.2" y="40" width="59.7" height="28" fill=${E} rx="2"></rect>
    ${v(30,34,"60 %","middle")}${v(94,34,"30 %","middle")}${v(187,34,"80 %","middle")}
    <line x1="8" x2="82.6" y1="14" y2="14" stroke=${x} stroke-width="2"></line>${v(88,17,"cycle length","start",x)}
    ${v(C-8,M-3,"time","end")}
  `,min_on_off:()=>k`
    ${ee()}
    ${[0,1,2,3].map(s=>k`<line x1=${8+s*74.6} x2=${8+s*74.6} y1="24" y2=${M-10} stroke=${me}></line>`)}
    <rect x="8" y="44" width="4" height="26" fill="none" stroke=${x} stroke-dasharray="2 2"></rect>
    ${v(14,18,"pulse too short:","start",x)}${v(14,28,"stays off","start",x)}
    <rect x="82.6" y="44" width="37.3" height="26" fill=${E} rx="2"></rect>${v(101,40,"50 %","middle")}
    <rect x="157.2" y="44" width="68" height="26" fill=${E} rx="2"></rect>
    <rect x="225.2" y="44" width="6.6" height="26" fill=${x}></rect>
    ${v(C-8,18,"pause too short: stays on","end",x)}
    ${v(C-8,M-3,"time","end")}
  `,tpi_formula:()=>k`
    <rect x="8" y="30" width=${C-16} height="22" fill="none" stroke=${me} rx="3"></rect>
    <rect x="8" y="30" width=${(C-16)*.6} height="22" fill=${E} rx="3"></rect>
    <rect x=${8+(C-16)*.6} y="30" width=${(C-16)*.15} height="22" fill=${x}></rect>
    ${v(8,22,"room 1\xB0 below \xD7 coef_int 0.6 = 60 %","start",E)}
    ${v(8,68,"outside 15\xB0 colder \xD7 coef_ext 0.01 = 15 %","start",x)}
    ${v(8,84,"heats 75 % of each cycle (max 100 %)")}
  `,tpi_thresholds:()=>k`
    ${Ce(72)}${Ce(48,x,"3 3")}${Ce(28,x,"3 3")}
    <rect x="96" y="20" width="76" height="60" fill=${x} opacity="0.1"></rect>
    <path d="M8 80 C 50 70, 80 30, 110 24 S 160 30, 180 54 S 220 66, 232 62" fill="none" stroke=${E} stroke-width="2"></path>
    ${v(C-8,69,"target","end")}${v(C-8,45,"+ resume","end",x)}${v(C-8,25,"+ stop","end",x)}
    ${v(134,92,"heating off","middle",x)}
  `,valve_curve:()=>k`
    <line x1="24" x2="24" y1="8" y2=${M-14} stroke=${V}></line>${ee()}
    <line x1="24" x2=${C-8} y1="22" y2="22" stroke=${x} stroke-dasharray="3 3"></line>
    <path d="M24 ${M-14} L 96 ${M-14} L 96 60 L 196 22 L ${C-8} 22" fill="none" stroke=${E} stroke-width="2"></path>
    <line x1="96" x2="96" y1="60" y2=${M-14} stroke=${x} stroke-dasharray="3 3"></line>
    ${v(102,76,"closed below","start",x)}${v(92,58,"min opening","end",E)}${v(C-8,18,"max opening","end",x)}
    ${v(C-8,M-3,"requested \u2192","end")}${v(4,12,"sent \u2191")}
  `,send_threshold:()=>k`
    ${ee()}
    <path d="M8 66 Q 30 60, 46 64 T 84 52 T 120 46 T 150 50 T 190 30 T 232 34" fill="none" stroke=${V} stroke-width="1.5" stroke-dasharray="3 2"></path>
    <path d="M8 66 H 84 V 50 H 186 V 32 H 232" fill="none" stroke=${E} stroke-width="2"></path>
    ${v(8,14,"wanted","start",V)}${v(60,14,"sent: only when the change is big enough","start",E)}
  `,window_delay:()=>k`
    ${v(8,14,"window")}
    <rect x="30" y="20" width="18" height="12" fill=${V} rx="2"></rect>
    <rect x="96" y="20" width="96" height="12" fill=${V} rx="2"></rect>
    ${v(8,52,"heating")}
    <rect x="8" y="58" width="122" height="12" fill=${E} rx="2"></rect>
    <rect x="212" y="58" width="20" height="12" fill=${E} rx="2"></rect>
    <line x1="96" x2="130" y1="40" y2="40" stroke=${x} stroke-width="2"></line>${v(113,50,"wait","middle",x)}
    <line x1="192" x2="212" y1="40" y2="40" stroke=${x} stroke-width="2"></line>${v(202,50,"wait","middle",x)}
    ${v(39,46,"too short","middle")}
  `,window_slope:()=>k`
    ${ee()}
    <rect x="92" y="10" width="78" height=${M-24} fill=${x} opacity="0.12"></rect>
    <path d="M8 30 L 90 32 C 110 40, 120 66, 150 70 S 190 68, 232 66" fill="none" stroke=${E} stroke-width="2"></path>
    ${v(131,22,"open: drop faster","middle",x)}${v(131,32,"than the threshold","middle",x)}
    ${v(8,22,"room temperature","start",E)}${v(C-8,M-3,"time","end")}
  `,motion:()=>k`
    ${v(8,14,"someone in the room")}
    <rect x="24" y="20" width="10" height="10" fill=${V} rx="2"></rect>
    <rect x="70" y="20" width="90" height="10" fill=${V} rx="2"></rect>
    <path d="M8 76 H 100 V 50 H 200 V 76 H 232" fill="none" stroke=${E} stroke-width="2"></path>
    <line x1="70" x2="100" y1="40" y2="40" stroke=${x} stroke-width="2"></line>${v(85,46,"occupied","middle",x)}
    <line x1="160" x2="200" y1="40" y2="40" stroke=${x} stroke-width="2"></line>${v(180,46,"empty","middle",x)}
    ${v(104,62,"occupied temperature","start",E)}${v(8,90,"empty temperature (preset stays Activity)","start",E)}
  `,safety:()=>k`
    ${v(8,14,"sensor reports")}
    ${[14,34,54,74,204,224].map(s=>k`<circle cx=${s} cy="24" r="3" fill=${V}></circle>`)}
    <line x1="74" x2="150" y1="38" y2="38" stroke=${x} stroke-width="2"></line>${v(112,48,"silent longer than the delay","middle",x)}
    ${v(8,62,"heating")}
    <path d="M8 84 H 150 V 74 H 204 V 84" fill="none" stroke=${E} stroke-width="2"></path>
    <rect x="150" y="74" width="54" height="10" fill=${x} opacity="0.25"></rect>${v(177,70,"fixed %","middle",x)}
  `,override:()=>k`
    ${ee()}
    <path d="M8 60 H 70 V 30 H 170 V 60 H 232" fill="none" stroke=${E} stroke-width="2"></path>
    <line x1="70" x2="170" y1="20" y2="20" stroke=${x} stroke-width="2"></line>${v(120,14,"override duration","middle",x)}
    ${v(8,54,"preset")}${v(74,44,"manual change","start",E)}${v(C-8,M-3,"time","end")}
  `,failure:()=>k`
    ${v(8,14,"heating share")}
    <path d="M8 40 H 40 V 22 H 232" fill="none" stroke=${E} stroke-width="2"></path>
    ${Ce(28,x,"3 3")}${v(C-8,36,"threshold","end",x)}
    ${v(8,62,"room temperature")}
    <path d="M8 76 H 232" fill="none" stroke=${V} stroke-width="2"></path>
    <line x1="40" x2="170" y1="88" y2="88" stroke=${x} stroke-width="2"></line>${v(105,84,"delay","middle",x)}
    <circle cx="170" cy="76" r="5" fill=${x}></circle>${v(178,70,"alert","start",x)}
  `,correction:()=>k`
    ${ee()}${Ce(46,V,"3 3")}${v(C-8,42,"your target","end")}
    <path d="M8 76 C 60 74, 120 60, 232 48" fill="none" stroke=${V} stroke-width="2"></path>${v(8,70,"room")}
    <path d="M8 22 C 80 24, 160 34, 232 44" fill="none" stroke=${E} stroke-width="2"></path>${v(8,16,"sent to the device","start",E)}
  `,stagger:()=>k`
    ${ee()}
    <line x1="8" x2="8" y1="16" y2=${M-14} stroke=${me}></line><line x1=${C-8} x2=${C-8} y1="16" y2=${M-14} stroke=${me}></line>
    ${v(8,12,"one cycle, 30 % each")}
    <rect x="8" y="24" width="67" height="18" fill=${E} rx="2"></rect>${v(80,37,"heater 1")}
    <rect x="80" y="52" width="67" height="18" fill=${E} rx="2"></rect>${v(152,65,"heater 2")}
  `};function Qt(s){return s&&Yt[s]?Yt[s]():void 0}var Jt=`0 0 ${C} ${M}`;function at(s){if(s.selector)return s.selector;switch(s.type){case"boolean":return{boolean:{}};case"integer":return{number:{mode:"box",step:1}};case"float":return{number:{mode:"box",step:"any"}};case"select":return{select:{options:(s.options??[]).map(([t,e])=>({value:t,label:e}))}};default:return{text:{}}}}var Lr=s=>s.split(/\*\*(.+?)\*\*/g).map((t,e)=>e%2?o`<b>${t}</b>`:t),er=s=>Object.keys(at(s))[0],ot=s=>Object.values(at(s))[0]??{},fe=s=>er(s)==="boolean",tr=s=>ot(s).multiple===!0,it=s=>Array.isArray(s)?s:s?[String(s)]:[],nt=s=>it(ot(s).domain),L=class extends O{constructor(){super(...arguments);this.label="";this.hint="";this.info="";this.error="";this.disabled=!1;this.editing=!1}emit(e){this.dispatchEvent(new CustomEvent("field-changed",{detail:{key:this.schema.name,value:e},bubbles:!0,composed:!0}))}place(e){let r=e.currentTarget;r.classList.toggle("flip",r.getBoundingClientRect().left>window.innerWidth-340)}infoButton(){let e=Qt(this.diagram);if(!this.info&&!e)return m;let r=Wt(this.diagram??"");return o`<span class="info" tabindex="0" aria-label=${w("more_info")} @mouseenter=${this.place} @focus=${this.place} @click=${n=>n.preventDefault()}>
      <ha-icon icon="mdi:information-outline"></ha-icon>
      <span class="tip" role="tooltip">
        ${e?o`<span class="diagram">
              ${r?o`<span class="dtitle">${r.title}</span>`:m}
              <svg viewBox=${Jt} width="100%" role="img" aria-label=${r?.caption??""}>${e}</svg>
            </span>`:m}
        ${this.info?o`<span class="text">${Lr(this.info)}</span>`:m}
      </span>
    </span>`}render(){let e=!!this.schema.required,r=o`<span class="label">${this.label}${e&&!fe(this.schema)?o`<span class="req">*</span>`:m}</span>`;return fe(this.schema)?o`<div class="tile bool">
        <label class="row ${this.disabled?"disabled":""}">
          <ha-switch .checked=${!!this.value} .disabled=${this.disabled} @change=${n=>this.emit(n.target.checked)}></ha-switch>
          <span class="label">${this.label}${this.infoButton()}</span>
        </label>
        ${this.hint?o`<div class="hint">${this.hint}</div>`:m} ${this.renderError()}
      </div>`:o`<div class="tile ${this.error?"has-error":""}">
      <div class="head">${r}${this.infoButton()}</div>
      ${this.control()} ${this.hint?o`<div class="hint">${this.hint}</div>`:m} ${this.renderError()}
    </div>`}renderError(){return this.error?o`<div class="error">${this.error}</div>`:m}control(){let e=ot(this.schema);switch(er(this.schema)){case"number":return this.numberInput(e);case"text":return e.multiple?this.listInput():this.textInput();case"select":return this.selectInput(e);case"entity":return e.multiple?this.entityList():this.entityInput();default:return o`<ha-selector
          .hass=${this.hass}
          .selector=${at(this.schema)}
          .value=${this.value}
          .disabled=${this.disabled}
          @value-changed=${r=>{r.stopPropagation(),this.emit(r.detail.value)}}
        ></ha-selector>`}}numberInput(e){let r=this.schema.type==="integer";return o`<input
      class="in"
      type="number"
      inputmode="decimal"
      .value=${this.value===void 0||this.value===null?"":String(this.value)}
      step=${r?1:e.step&&e.step!=="any"?e.step:"any"}
      min=${e.min??""}
      max=${e.max??""}
      ?disabled=${this.disabled}
      @change=${n=>{let i=n.target.value;this.emit(i===""?void 0:r?parseInt(i,10):Number(i))}}
    />`}textInput(){return o`<input
      class="in"
      type="text"
      .value=${this.value??""}
      ?disabled=${this.disabled}
      @change=${e=>this.emit(e.target.value===""?void 0:e.target.value)}
    />`}selectInput(e){let r=(e.options??[]).map(i=>typeof i=="string"?{value:i,label:i}:i),n=i=>e.translation_key&&this.localizeValue?.(`${e.translation_key}.options.${i.value}`)||i.label;return o`<select class="in" ?disabled=${this.disabled} @change=${i=>this.emit(i.target.value||void 0)}>
      ${this.schema.required?m:o`<option value="" ?selected=${!this.value}>–</option>`}
      ${r.map(i=>o`<option value=${i.value} ?selected=${i.value===this.value}>${n(i)}</option>`)}
    </select>`}candidates(){let e=nt(this.schema);return Object.keys(this.hass.states).filter(r=>!e.length||e.includes(r.split(".")[0])).sort()}friendly(e){return this.hass.states[e]?.attributes.friendly_name}datalist(e){return o`<datalist id=${e}>
      ${this.candidates().map(r=>o`<option value=${r}>${this.friendly(r)??""}</option>`)}
    </datalist>`}entityInput(){let e=this.value??"",r=e&&!this.hass.states[e];return e&&!r&&!this.editing?o`<button class="in entity-shown" ?disabled=${this.disabled} title=${e} @click=${this.startEditing}>
        <span class="fname">${this.friendly(e)??e}</span><span class="eid">${e}</span>
      </button>`:o`<input
        class="in ${r?"warn":""}"
        list="opts"
        .value=${e}
        placeholder=${nt(this.schema).join(", ")}
        ?disabled=${this.disabled}
        @change=${n=>this.emit(n.target.value.trim()||void 0)}
        @blur=${()=>this.editing=!1}
      />
      ${this.datalist("opts")}`}async startEditing(){this.editing=!0,await this.updateComplete;let e=this.renderRoot.querySelector("input");e?.focus(),e?.select()}entityList(){let e=it(this.value);return o`<div class="chips in">
        ${e.map((r,n)=>o`<span class="chip ${this.hass.states[r]?"":"warn"}" title=${r}
            >${this.friendly(r)??r}
            ${this.disabled?m:o`<button aria-label="✕" @click=${()=>this.emit(e.filter((i,a)=>a!==n))}>✕</button>`}</span
          >`)}
        ${this.disabled?m:o`<input
              list="opts"
              placeholder="+ ${nt(this.schema).join(", ")}"
              @change=${r=>{let n=r.target.value.trim();r.target.value="",n&&!e.includes(n)&&this.emit([...e,n])}}
            />`}
      </div>
      ${this.datalist("opts")}`}listInput(){let e=it(this.value);return o`<div class="chips in">
      ${e.map((r,n)=>o`<span class="chip mono"
          >${r}${this.disabled?m:o`<button aria-label="✕" @click=${()=>this.emit(e.filter((i,a)=>a!==n))}>✕</button>`}</span
        >`)}
      ${this.disabled?m:o`<input
            placeholder="+"
            @change=${r=>{let n=r.target.value.trim();r.target.value="",n&&this.emit([...e,n])}}
          />`}
    </div>`}};L.styles=I`
    :host { display: block; }
    .tile { position: relative; display: flex; flex-direction: column; gap: 5px; padding: 8px 10px; border-radius: 8px; background: var(--vt-tile, rgba(127, 127, 127, 0.07)); height: 100%; box-sizing: border-box; }
    .tile.has-error { box-shadow: inset 0 0 0 1px var(--error-color); }
    .head { display: flex; align-items: center; gap: 4px; }
    .label .info { margin-left: 4px; vertical-align: middle; }
    .label { font-size: 12px; font-weight: 500; letter-spacing: 0.02em; color: var(--primary-text-color); display: inline-flex; align-items: center; gap: 2px; }
    .req { color: var(--secondary-text-color); }
    .bool { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 4px 6px; }
    .bool .row { display: flex; align-items: center; gap: 10px; cursor: pointer; }
    .bool .row.disabled { cursor: default; opacity: 0.8; }
    .bool .hint, .bool .error { flex-basis: 100%; }

    .in {
      box-sizing: border-box; width: 100%; height: 34px; padding: 0 10px; font: inherit; font-size: 14px;
      color: var(--primary-text-color); background: var(--input-fill-color, var(--secondary-background-color));
      border: 1px solid var(--divider-color); border-radius: 6px; outline: none;
    }
    .in:focus, .in:focus-within { border-color: var(--primary-color); }
    .in:disabled { opacity: 0.7; }
    .in.warn, .chip.warn { border-color: var(--warning-color); }
    select.in { padding-right: 4px; }
    .entity-shown { display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 0; cursor: text; text-align: left; line-height: 1.15; }
    .entity-shown .fname, .entity-shown .eid { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .entity-shown .fname { font-size: 13.5px; }
    .entity-shown .eid { font-size: 10.5px; color: var(--secondary-text-color); }
    .chips { height: auto; min-height: 34px; display: flex; flex-wrap: wrap; align-items: center; gap: 4px; padding: 4px 6px; }
    .chips input { flex: 1; min-width: 140px; border: none; background: none; font: inherit; font-size: 14px; color: var(--primary-text-color); outline: none; padding: 2px 4px; }
    .chip { display: inline-flex; align-items: center; gap: 4px; padding: 2px 4px 2px 10px; border-radius: 12px; font-size: 13px; border: 1px solid transparent; background: color-mix(in srgb, var(--primary-color) 22%, transparent); }
    .chip.mono { font-family: var(--code-font-family, monospace); font-size: 12px; }
    .chip button { all: unset; cursor: pointer; width: 18px; text-align: center; border-radius: 50%; font-size: 11px; color: var(--secondary-text-color); }
    .chip button:hover { color: var(--primary-text-color); }

    .info { position: relative; display: inline-flex; color: var(--secondary-text-color); --mdc-icon-size: 15px; cursor: help; outline: none; }
    .info:focus-visible ha-icon { color: var(--primary-color); }
    .tip {
      display: none; position: absolute; left: -12px; bottom: calc(100% + 6px);
      width: 300px; max-width: 80vw; padding: 10px 12px; border-radius: 8px; z-index: 10; flex-direction: column; gap: 8px;
      background: var(--card-background-color, #222); color: var(--primary-text-color);
      border: 1px solid var(--divider-color); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      font-size: 13px; line-height: 1.4; white-space: pre-line; pointer-events: none;
    }
    .info:hover .tip, .info:focus .tip { display: flex; }
    .info.flip .tip { left: auto; right: -12px; }
    .diagram { display: flex; flex-direction: column; gap: 4px; padding: 8px; border-radius: 6px; background: var(--secondary-background-color); }
    .dtitle { font-size: 12px; font-weight: 500; color: var(--secondary-text-color); }
    .hint { font-size: 11.5px; color: var(--secondary-text-color); line-height: 1.35; }
    .error { color: var(--error-color); font-size: 12px; }
  `,u([y({attribute:!1})],L.prototype,"hass",2),u([y({attribute:!1})],L.prototype,"schema",2),u([y({attribute:!1})],L.prototype,"value",2),u([y()],L.prototype,"label",2),u([y()],L.prototype,"hint",2),u([y()],L.prototype,"info",2),u([y()],L.prototype,"diagram",2),u([y()],L.prototype,"error",2),u([y({type:Boolean})],L.prototype,"disabled",2),u([y({attribute:!1})],L.prototype,"localizeValue",2),u([S()],L.prototype,"editing",2),L=u([z("vt-field")],L);function ct(s){let t=s.cooling?s.current-s.target:s.target-s.current,e=s.outside===null?0:s.cooling?s.outside-s.target:s.target-s.outside,r=s.slope===null?null:s.cooling?-s.slope:s.slope,n=s.coefInt*t,i=s.coefExt*e,l=s.thresholdLow!==0&&s.thresholdHigh!==0&&r!==null&&(r>0&&-t>s.thresholdHigh||r<0&&-t>s.thresholdLow),c=l?0:Math.min(1,Math.max(0,n+i));s.maxOnPercent!==null&&c>s.maxOnPercent&&(c=s.maxOnPercent);let d=s.cycleMin*60,h=c*d,p=null;return h>0&&h<s.minOnSec&&(h=0,p="min_on"),h<d&&d-h<s.minOffSec&&(h=d,p="min_off"),{roomPart:n,outsidePart:i,share:c,stoppedByThreshold:l,onSec:Math.floor(h),offSec:Math.floor(d-h),forcedByTiming:p}}var Hr=300,zr=.5,Dr=120,Nr=30,Vr=4,lt=(s,t)=>Math.round(s*10**t)/10**t;function rr(s,t){let e=[],r=null,n=0,i=null,a=null,l=null,c=0,d=(h,p,$)=>{if(i===null||a===null){i=p,a=h,c++;return}let f=(p-i)/1e3;if(f<=0)return;let _=(h-a)/(f/3600);Math.abs(_)>Dr||(l=lt(l===null?_:.2*l+.8*_,2),$&&(i=p),a=h,c++,c>=Vr&&e.push({t:p,slope:l}))};for(let{t:h,v:p}of s)if(p!==null){if(i!==null&&r!==null)for(let $=i+Nr*6e4;$<h;$+=t*6e4)d(r,$,!1);if(r===null)r=p;else{let $=(h-n)/1e3;if($>=0){let f=Math.min(1-Math.exp(Math.log(.5)*$/Hr),zr);r=lt(f*p+(1-f)*r,2)}}n=h,d(r,h,!0)}return e}function sr(s,t,e,r,n){if(t===null||!s.length)return[];let i=[],a=null,l=r?r*6e4:1/0;for(let{t:c,slope:d}of s)a!==null&&c-a>=l&&(i.push({start:a,end:a+l,byMaxDuration:!0}),a=null),a===null?d<-t&&(a=c):e!==null&&d>=e&&(i.push({start:a,end:c,byMaxDuration:!1}),a=null);return a!==null&&i.push({start:a,end:Math.min(n,a+l),byMaxDuration:a+l<=n}),i}function nr(s,t,e){let r=s.filter(c=>c.v!==null&&c.t>=t).map(c=>c.t),n=s.filter(c=>c.t<t),i=n.length&&n[n.length-1].v!==null?n[n.length-1].t:t,a=[],l=i;for(let c of r)a.push({start:l,end:c,open:!1}),l=c;return a.push({start:l,end:e,open:!0}),a}var ir=s=>s.reduce((t,e)=>!t||e.end-e.start>t.end-t.start?e:t,null);function Pe(s){let t=-1;return e=>{for(;t+1<s.length&&s[t+1].t<=e;)t++;return t>=0?s[t]:void 0}}function ar(s,t,e,r,n,i,a,l,c=300){let d=T=>T.filter(P=>P.v!==null),[h,p,$,f,_]=[Pe(d(s)),Pe(d(t)),Pe(e),Pe(d(r)),Pe(n)],A=[];for(let T=0;T<c;T++){let P=a+(l-a)*T/(c-1),ve=h(P)?.v,W=$(P),ye=_(P)?.v;if(ve==null||!W||W.target===null||W.mode==="off"||W.mode==="unavailable")continue;let le=ct({...i,current:ve,target:W.target,outside:p(P)?.v??null,slope:f(P)?.v??null,cooling:W.mode==="cool"});A.push({t:P,roomPart:le.roomPart,outsidePart:le.outsidePart,share:le.share,vt:ye==null?null:ye/100})}return A}var pt=36e5,ze={"24h":24*pt,"7d":168*pt},j=s=>{let t=typeof s=="number"?s:typeof s=="string"&&s.trim()!==""?Number(s):NaN;return Number.isFinite(t)?t:null},dt=new Map;function or(s,t,e,r=!1){let n=`${t}|${e}|${r}`,i=dt.get(n);if(i&&Date.now()-i.at<5*6e4)return i.data;let a=new Date,l=s.callWS({type:"history/history_during_period",start_time:new Date(a.getTime()-ze[e]).toISOString(),end_time:a.toISOString(),entity_ids:[t],minimal_response:!r,no_attributes:!r,significant_changes_only:!1}).then(c=>c[t]??[]);return l.catch(()=>dt.delete(n)),dt.set(n,{at:Date.now(),data:l}),l}var lr=s=>(s.lu??s.lc??0)*1e3,oe=async(s,t,e)=>t?(await or(s,t,e)).map(r=>({t:lr(r),v:j(r.s)})):[],Ur=async(s,t,e)=>(await or(s,t,e,!0)).map(r=>({t:lr(r),mode:r.s,target:j(r.a?.temperature)})),ge=(s,t,e)=>new Date(t).toLocaleString(s?.locale?.language??s?.language,{...e?{weekday:"short"}:{},hour:"2-digit",minute:"2-digit"}),ut=s=>{let t=Math.round(s/6e4);return t<60?`${t} min`:`${Math.floor(t/60)} h ${String(t%60).padStart(2,"0")}`},H=s=>`${Math.round(s*100)} %`,ht=I`
  :host { display: block; font-size: 13px; color: var(--primary-text-color); }
  .head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .head h4 { margin: 0; flex: 1; font-size: 12px; font-weight: 500; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.05em; }
  .est { font-size: 11px; padding: 1px 8px; border-radius: 10px; border: 1px dashed var(--divider-color); color: var(--secondary-text-color); }
  .seg { display: inline-flex; border: 1px solid var(--divider-color); border-radius: 6px; overflow: hidden; }
  .seg button { all: unset; cursor: pointer; padding: 1px 8px; font-size: 11px; color: var(--secondary-text-color); }
  .seg button + button { border-left: 1px solid var(--divider-color); }
  .seg button.on { background: var(--secondary-background-color); color: var(--primary-text-color); }
  .seg button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
  .big { font-size: 22px; font-variant-numeric: tabular-nums; }
  .muted { color: var(--secondary-text-color); }
  .row { display: flex; justify-content: space-between; gap: 8px; font-variant-numeric: tabular-nums; }
  p { margin: 6px 0 0; line-height: 1.45; }
  .warn { color: var(--warning-color); }
  .vt { margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--divider-color); color: var(--secondary-text-color); font-size: 12px; }
  svg { display: block; width: 100%; height: auto; overflow: visible; }
  svg text { font-size: 10px; fill: var(--secondary-text-color); }
  .tip { position: absolute; pointer-events: none; background: var(--card-background-color); border: 1px solid var(--divider-color);
    border-radius: 6px; padding: 3px 8px; font-size: 12px; white-space: nowrap; transform: translate(-50%, -100%); box-shadow: 0 2px 6px rgba(0,0,0,.25); }
  .chart { position: relative; margin-top: 16px; }
  .legend { display: flex; gap: 4px 12px; flex-wrap: wrap; font-size: 12px; color: var(--secondary-text-color); margin-top: 4px; }
  .sw { display: inline-block; width: 12px; height: 3px; border-radius: 2px; margin-right: 5px; vertical-align: 3px; }
  .sw.box { height: 10px; width: 10px; vertical-align: -1px; }
  .sw.dash { background: none !important; border-top: 2px dashed var(--secondary-text-color); height: 0; }
  .unit { position: absolute; left: 0; top: -12px; font-size: 10px; color: var(--secondary-text-color); }
`;function Br(s,t,e){let i={l:30,r:4,t:6,b:16},{from:a,until:l}=t,c=t.lines.flatMap(b=>b.points.map(R=>R.v)),d=Math.min(...c,...t.include??[],...(t.refs??[]).map(b=>b.v)),h=Math.max(...c,...t.include??[],...(t.refs??[]).map(b=>b.v));t.clamp&&([d,h]=[Math.max(d,t.clamp[0]),Math.min(h,t.clamp[1])]);let p=(h-d||1)*.06,[$,f]=[h+p,d-p],_=b=>i.l+(b-a)/(l-a)*(280-i.l-i.r),A=b=>i.t+($-Math.max(f,Math.min($,b)))/($-f)*(120-i.t-i.b),T=t.maxGapMs??1/0,P=b=>{let R=[];return b.forEach((Y,ce)=>ce&&Y.t-b[ce-1].t<=T?R[R.length-1].push(Y):R.push([Y])),R},ve=b=>b.map((R,Y)=>`${Y?"L":"M"}${_(R.t).toFixed(1)} ${A(R.v).toFixed(1)}`).join(""),W=(t.withDay?24:6)*pt,ye=[];for(let b=Math.ceil(a/W)*W;b<l;b+=W)ye.push(b);let le=t.lines[0]?.points??[];return o`<svg viewBox="0 0 ${280} ${120}" role="img" @pointermove=${b=>{if(!le.length)return;let R=b.currentTarget.getBoundingClientRect(),Y=a+((b.clientX-R.left)/R.width*280-i.l)/(280-i.l-i.r)*(l-a),ce=le.reduce((gt,vt)=>Math.abs(vt.t-Y)<Math.abs(gt.t-Y)?vt:gt),ft=R.width/280;e({x:_(ce.t)*ft,y:A(ce.v)*ft-6,text:t.hoverText(ce.t)})}} @pointerleave=${()=>e(void 0)}>
      ${(t.bands??[]).map(b=>k`<rect x=${_(b.start)} y=${i.t} width=${Math.max(3,_(b.end)-_(b.start))} height=${120-i.t-i.b}
          fill="var(--warning-color)" opacity="0.25"></rect>`)}
      <line x1=${i.l} x2=${280-i.r} y1=${A(0)} y2=${A(0)} stroke="var(--divider-color)"></line>
      ${(t.refs??[]).map(b=>k`<line x1=${i.l} x2=${280-i.r} y1=${A(b.v)} y2=${A(b.v)} stroke=${b.color} stroke-dasharray=${b.dash}></line>
          <text x=${280-i.r} y=${b.below?A(b.v)+11:A(b.v)-3} text-anchor="end">${b.label}</text>`)}
      ${t.lines.map(b=>P(b.points).map(R=>b.area?k`<path d=${`${ve(R)}L${_(R[R.length-1].t).toFixed(1)} ${A(0)}L${_(R[0].t).toFixed(1)} ${A(0)}Z`}
                fill=${b.color} opacity="0.15"></path>`:k`<path d=${ve(R)} fill="none" stroke=${b.color} stroke-width="2" stroke-dasharray=${b.dash??""}
                stroke-linejoin="round" stroke-linecap="round"></path>`))}
      <text x=${i.l-4} y=${A(h)+3} text-anchor="end">${t.fmt(h)}</text>
      ${d<0&&h>0&&Math.min(A(d)-A(0),A(0)-A(h))>10?k`<text x=${i.l-4} y=${A(0)+3} text-anchor="end">0</text>`:m}
      <text x=${i.l-4} y=${A(d)+3} text-anchor="end">${t.fmt(d)}</text>
      ${ye.map(b=>k`<text x=${_(b)} y=${117} text-anchor="middle">${ge(s,b,t.withDay).replace(/:00$/,"")}</text>`)}
    </svg>
    <div class="unit">${t.unit}</div>`}var te=class extends O{constructor(){super(...arguments);this.range="24h";this.tabs=["24h","7d"]}tabSwitch(){return o`<span class="seg" role="radiogroup">
      ${this.tabs.map(e=>o`<button role="radio" aria-checked=${e===this.range} class=${e===this.range?"on":""} @click=${()=>this.range=e}>
          ${e==="now"?g("tab_now"):e}
        </button>`)}
    </span>`}head(e){return o`<div class="head"><h4>${e}</h4>${this.tabSwitch()}<span class="est">${g("estimate")}</span></div>`}get rangeMs(){return this.range==="now"?0:ze[this.range]}chart(e){return o`<div class="chart">${Br(this.hass,e,r=>this.hover=r)}${this.tip()}</div>`}tip(){return this.hover?o`<div class="tip" style="left:${this.hover.x}px;top:${this.hover.y}px">${this.hover.text}</div>`:m}};u([y({attribute:!1})],te.prototype,"hass",2),u([S()],te.prototype,"range",2),u([S()],te.prototype,"hover",2);var U=class extends te{constructor(){super(...arguments);this.entities={};this.tabs=["now","24h","7d"];this.span={from:0,until:0}}willUpdate(e){this.range!=="now"&&(e.has("range")||e.has("sensorId")||e.has("outsideId")||e.has("entities"))&&this.load()}async load(){this.recorded=void 0,this.error=void 0;let e=this.range,r=Date.now();this.span={from:r-ze[e],until:r};let n=this.entities.climate;try{let[i,a,l,c,d]=await Promise.all([oe(this.hass,this.sensorId,e),oe(this.hass,this.outsideId,e),n?Ur(this.hass,n,e):Promise.resolve([]),oe(this.hass,this.entities.temperature_slope,e),oe(this.hass,this.entities.power_percent,e)]);this.recorded={room:i,outside:a,targets:l,slope:c,vt:d}}catch(i){this.error=i?.message??String(i)}}render(){let e=this.head(g("tpi_title"));return this.range==="now"?o`${e}${this.renderNow()}`:this.error?o`${e}<p class="warn">${this.error}</p>`:this.recorded?this.entities.climate?o`${e}${this.renderHistory()}`:o`${e}<p class="muted">${g("tpi_no_history")}</p>`:o`${e}<p class="muted">${g("loading")}</p>`}readings(){let e=l=>l?this.hass.states[l]:void 0,r=e(this.entities.climate),n=r?.attributes??{},i=n.specific_states??{},a=j(n.temperature);return{current:j(n.current_temperature)??j(e(this.sensorId)?.state),outside:j(i.ext_current_temperature)??j(e(this.outsideId)?.state),target:this.tryTarget??a??20,slope:j(i.temperature_slope),cooling:r?.state==="cool",off:r?.state==="off",maxOn:j(n.configuration?.max_on_percent),vtShare:j(n.on_percent),preset:n.preset_mode,unit:n.configuration?.temperature_unit??this.hass.config?.unit_system?.temperature??"\xB0C"}}renderNow(){let e=this.readings();if(e.current===null)return o`<p class="muted">${g("no_temperature")}</p>`;let r=this.settings,n=ct({current:e.current,target:e.target,outside:e.outside,slope:e.slope,cooling:e.cooling,coefInt:r.coefInt,coefExt:r.coefExt,thresholdLow:r.thresholdLow,thresholdHigh:r.thresholdHigh,maxOnPercent:e.maxOn,cycleMin:r.cycleMin,minOnSec:r.minOnSec,minOffSec:r.minOffSec}),i=n.onSec/(r.cycleMin*60),a=h=>`${h.toFixed(1)}\xB0`,l=h=>e.cooling?h-e.target:e.target-h,c=h=>e.cooling?`${a(h)} \u2212 ${a(e.target)}`:`${a(e.target)} \u2212 ${a(h)}`,d=n.roomPart+n.outsidePart;return o`
      <div class="row target-row">
        <span class="muted">${g("target")}</span>
        <span class="target">
          <button aria-label="−" @click=${()=>this.tryTarget=Math.round((e.target-.5)*10)/10}>−</button>
          <span class=${this.tryTarget!==void 0?"tried":""}>${e.target.toFixed(1)} ${e.unit}</span>
          <button aria-label="+" @click=${()=>this.tryTarget=Math.round((e.target+.5)*10)/10}>+</button>
        </span>
      </div>
      <div class="calc">
        <span class="lbl"><i class="sw box room"></i>${g("room")}</span>
        <span class="expr">(${c(e.current)}) × ${r.coefInt}</span>
        <span class="res">${H(n.roomPart)}</span>
        <span class="sub">${g("calc_room",{gap:a(l(e.current)),coef:"coef_int"})}</span>
        ${e.outside!==null?o`<span class="lbl"><i class="sw box out"></i>${g("outside")}</span>
              <span class="expr">(${c(e.outside)}) × ${r.coefExt}</span>
              <span class="res">${H(n.outsidePart)}</span>
              <span class="sub">${g("calc_outside",{gap:a(l(e.outside)),coef:"coef_ext"})}</span>`:o`<span class="lbl">${g("outside")}</span><span class="expr muted">${g("no_outside")}</span><span class="res">0 %</span>`}
        <span class="lbl total">${g("sum")}</span><span class="expr total"></span><span class="res total">${H(d)}</span>
      </div>
      ${this.bar(n.roomPart,n.outsidePart)}
      <div class="result">
        <span class="big">${H(i)}</span>
        <span class="muted">${g("of_each_cycle",{on:ut(n.onSec*1e3),cycle:`${r.cycleMin} min`})}</span>
      </div>
      ${!n.stoppedByThreshold&&d>1?o`<p class="muted">${g("capped_100")}</p>`:m}
      ${!n.stoppedByThreshold&&d<0?o`<p class="muted">${g("below_0")}</p>`:m}
      ${n.stoppedByThreshold?o`<p class="warn">${g("stopped_threshold")}</p>`:m}
      ${n.forcedByTiming==="min_on"?o`<p class="warn">${g("forced_min_on",{v:H(n.share)})}</p>`:m}
      ${n.forcedByTiming==="min_off"?o`<p class="warn">${g("forced_min_off",{v:H(n.share)})}</p>`:m}
      ${e.maxOn!==null&&n.share===e.maxOn&&d>e.maxOn?o`<p class="muted">${g("capped",{v:H(e.maxOn)})}</p>`:m}
      ${this.tryTarget!==void 0?o`<p class="muted">${g("tried_target")} <a href="#" @click=${this.resetTarget}>${g("reset")}</a></p>`:m}
      ${e.vtShare!==null&&this.entities.climate?o`<div class="vt">
            ${g("vt_now",{v:H(e.vtShare)})}${e.off?` \xB7 ${g("vt_off")}`:e.preset==="safety"?` \xB7 ${g("vt_safety")}`:""}
          </div>`:m}
    `}resetTarget(e){e.preventDefault(),this.tryTarget=void 0}bar(e,r){let i=c=>Math.max(0,Math.min(1,c)),a=i(e)*280,l=Math.max(0,i(e+r)-i(e))*280;return o`<svg viewBox="0 0 ${280} 22" role="img" aria-label=${g("tpi_title")}>
      <rect x="0" y="4" width=${280} height="14" rx="4" fill="var(--card-background-color)"></rect>
      ${a>0?k`<rect x="0" y="4" width=${Math.max(0,a-(l>0?2:0))} height="14" rx="4" fill="var(--primary-color)"></rect>`:m}
      ${l>0?k`<rect x=${a} y="4" width=${l} height="14" rx="4" fill="var(--warning-color)"></rect>`:m}
    </svg>`}renderHistory(){let e=this.recorded,r=this.settings,{from:n,until:i}=this.span,a=ar(e.room,e.outside,e.targets,e.slope,e.vt,{coefInt:r.coefInt,coefExt:r.coefExt,thresholdLow:r.thresholdLow,thresholdHigh:r.thresholdHigh,maxOnPercent:j(this.hass.states[this.entities.climate]?.attributes?.configuration?.max_on_percent),cycleMin:r.cycleMin,minOnSec:r.minOnSec,minOffSec:r.minOffSec},n,i);if(a.length<2)return o`<p class="muted">${g("too_little_history")}</p>`;let l=this.range!=="24h",c=f=>f.reduce((_,A)=>_+A,0)/(f.length||1),d=a.filter(f=>f.vt!==null),h=f=>a.find(_=>_.t===f),p=f=>a.flatMap(_=>f(_)===null?[]:[{t:_.t,v:f(_)*100}]),$=(i-n)/299;return o`
      <p><span class="big">${H(c(a.map(f=>f.share)))}</span> ${g("tpi_mean",{range:g(`range_${this.range}`)})}</p>
      ${this.chart({from:n,until:i,withDay:l,lines:[{points:p(f=>f.share),color:"var(--primary-text-color)",area:!0},{points:p(f=>f.roomPart),color:"var(--primary-color)"},{points:p(f=>f.outsidePart),color:"var(--warning-color)"},{points:p(f=>f.vt),color:"var(--secondary-text-color)",dash:"3 3"}],include:[0,100],clamp:[-100,150],fmt:f=>`${Math.round(f)}`,unit:"%",maxGapMs:$*1.5,hoverText:f=>{let _=h(f);return`${ge(this.hass,f,l)} \xB7 ${H(_.share)} = ${H(_.roomPart)} + ${H(_.outsidePart)}${_.vt!==null?` \xB7 VT ${H(_.vt)}`:""}`}})}
      <div class="legend">
        <span><i class="sw box req"></i>${g("legend_request")}</span>
        <span><i class="sw room"></i>${g("legend_room")}</span>
        <span><i class="sw out"></i>${g("legend_outside")}</span>
        ${d.length?o`<span><i class="sw dash"></i>${g("legend_vt")}</span>`:m}
      </div>
      ${d.length?o`<div class="vt">
            ${g("tpi_vs_vt",{ours:H(c(d.map(f=>f.share))),vt:H(c(d.map(f=>f.vt)))})}
          </div>`:m}
    `}};U.styles=[ht,I`
      .target { display: inline-flex; align-items: center; gap: 6px; }
      .target button { all: unset; cursor: pointer; width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 4px; border: 1px solid var(--divider-color); color: var(--secondary-text-color); font-size: 12px; }
      .target button:focus-visible { outline: 2px solid var(--primary-color); }
      .tried { color: var(--primary-color); }
      .calc { display: grid; grid-template-columns: auto 1fr auto; gap: 0 8px; margin: 8px 0 4px; font-variant-numeric: tabular-nums; align-items: baseline; }
      .calc .expr { color: var(--secondary-text-color); font-size: 12px; white-space: nowrap; }
      .calc .res { text-align: right; }
      .calc .sub { grid-column: 2 / -1; font-size: 11px; color: var(--secondary-text-color); margin-bottom: 4px; }
      .calc .total { border-top: 1px solid var(--divider-color); padding-top: 3px; margin-top: 2px; }
      .calc .lbl { white-space: nowrap; }
      .result { display: flex; align-items: baseline; gap: 8px; margin-top: 6px; flex-wrap: wrap; }
      .sw.room, .sw.box.room { background: var(--primary-color); }
      .sw.out, .sw.box.out { background: var(--warning-color); }
      .sw.box.req { background: color-mix(in srgb, var(--primary-text-color) 25%, transparent); }
      a { color: var(--primary-color); }
    `],u([y({attribute:!1})],U.prototype,"settings",2),u([y({attribute:!1})],U.prototype,"entities",2),u([y()],U.prototype,"sensorId",2),u([y()],U.prototype,"outsideId",2),u([S()],U.prototype,"tryTarget",2),u([S()],U.prototype,"recorded",2),u([S()],U.prototype,"error",2),U=u([z("vt-live-tpi")],U);var D=class extends te{constructor(){super(...arguments);this.openThreshold=null;this.closeThreshold=null;this.maxDurationMin=null;this.cycleMin=5;this.vtSlopes=[];this.span={from:0,until:0}}willUpdate(e){(e.has("sensorId")||e.has("slopeId")||e.has("range")||e.has("cycleMin"))&&this.load()}async load(){if(this.slopes=void 0,this.error=void 0,!this.sensorId)return;let e=this.range,r=Date.now();this.span={from:r-ze[e],until:r};try{let[n,i]=await Promise.all([oe(this.hass,this.sensorId,e),oe(this.hass,this.slopeId,e)]);this.vtSlopes=i,this.slopes=rr(n,this.cycleMin)}catch(n){this.error=n?.message??String(n)}}render(){let e=this.head(g("window_title"));if(!this.sensorId)return o`${e}<p class="muted">${g("no_sensor")}</p>`;if(this.error)return o`${e}<p class="warn">${this.error}</p>`;if(!this.slopes)return o`${e}<p class="muted">${g("loading")}</p>`;let{from:r,until:n}=this.span,i=this.slopes.filter(p=>p.t>=r);if(i.length<2)return o`${e}<p class="muted">${g("too_little_history")}</p>`;let a=sr(i,this.openThreshold,this.closeThreshold,this.maxDurationMin,n),l=i.reduce((p,$)=>$.slope<p.slope?$:p),c=this.range!=="24h",d=this.vtSlopes.filter(p=>p.v!==null&&p.t>=r).map(p=>({t:p.t,v:p.v})),h=new Map(i.map(p=>[p.t,p.slope]));return o`
      ${e}
      ${this.openThreshold===null?o`<p>${g("window_no_threshold")}</p>`:o`<p><span class="big">${a.length}×</span> ${g(a.length?"window_detected":"window_never",{range:g(`range_${this.range}`)})}</p>`}
      ${this.chart({from:r,until:n,withDay:c,lines:[{points:i.map(p=>({t:p.t,v:p.slope})),color:"var(--primary-color)"},...d.length?[{points:d,color:"var(--secondary-text-color)",dash:"3 3"}]:[]],refs:[...this.openThreshold!==null?[{v:-this.openThreshold,color:"var(--warning-color)",dash:"4 3",label:g("open_line"),below:!0}]:[],...this.closeThreshold!==null?[{v:this.closeThreshold,color:"var(--secondary-text-color)",dash:"2 3",label:g("close_line")}]:[]],bands:a,include:[-1,1],fmt:p=>p.toFixed(0),unit:"\xB0/h",hoverText:p=>`${ge(this.hass,p,c)} \xB7 ${h.get(p).toFixed(1)} \xB0/h`})}
      <div class="legend">
        <span><i class="sw room"></i>${g("legend_slope")}</span>
        ${d.length?o`<span><i class="sw dash"></i>${g("legend_vt_slope")}</span>`:m}
      </div>
      <p class="muted">
        ${g("steepest",{v:`${l.slope.toFixed(1)} \xB0/h`,at:ge(this.hass,l.t,c)})}
        ${a.some(p=>p.byMaxDuration)?o`<br />${g("ended_by_max")}`:m}
      </p>
      <p class="muted">${g("window_caveat")}</p>
    `}};D.styles=[ht,I`.sw.room { background: var(--primary-color); }`],u([y()],D.prototype,"sensorId",2),u([y()],D.prototype,"slopeId",2),u([y({type:Number})],D.prototype,"openThreshold",2),u([y({type:Number})],D.prototype,"closeThreshold",2),u([y({type:Number})],D.prototype,"maxDurationMin",2),u([y({type:Number})],D.prototype,"cycleMin",2),u([S()],D.prototype,"slopes",2),u([S()],D.prototype,"vtSlopes",2),u([S()],D.prototype,"error",2),D=u([z("vt-live-window")],D);var B=class extends te{constructor(){super(...arguments);this.delayMin=null;this.minOnPercent=null;this.overClimate=!1;this.span={from:0,until:0}}willUpdate(e){(e.has("sensorId")||e.has("outsideId")||e.has("range"))&&this.load()}async load(){this.gaps=void 0,this.error=void 0;let e=Date.now(),r=e-this.rangeMs;this.span={from:r,until:e};let n=[{id:this.sensorId,label:g("room_sensor")},{id:this.outsideId,label:g("outside_sensor")}].filter(i=>!!i.id);try{this.gaps=await Promise.all(n.map(async i=>({...i,gaps:nr(await oe(this.hass,i.id,this.range),r,e)})))}catch(i){this.error=i?.message??String(i)}}render(){let e=this.head(g("safety_title"));if(this.overClimate)return o`${e}<p>${g("safety_over_climate")}</p>`;if(!this.sensorId)return o`${e}<p class="muted">${g("no_sensor")}</p>`;if(this.error)return o`${e}<p class="warn">${this.error}</p>`;if(!this.gaps)return o`${e}<p class="muted">${g("loading")}</p>`;let r=(this.delayMin??0)*6e4,n=this.range!=="24h",i=this.delayMin?this.gaps.flatMap(a=>a.gaps.filter(l=>l.end-l.start>r)).length:0;return o`
      ${e}
      ${this.delayMin?o`<p>
            <span class="big">${i}×</span>
            ${g(i?"safety_would":"safety_never",{range:g(`range_${this.range}`),delay:`${this.delayMin} min`})}
          </p>`:m}
      ${this.gaps.map(a=>this.strip(a.label,a.gaps,r,n))}
      <div class="row ends"><span>${g(`ago_${this.range}`)}</span><span>${g("now")}</span></div>
      ${this.tip()}
      ${this.minOnPercent!==null?o`<p class="muted">${g("safety_caveat",{v:H(this.minOnPercent)})}</p>`:m}
    `}strip(e,r,n,i){let{from:l,until:c}=this.span,d=f=>(Math.max(f,l)-l)/(c-l)*280,h=ir(r),p=r.filter(f=>n&&f.end-f.start>n*.75),$=f=>_=>{let A=this.renderRoot.querySelector(".wrap"),T=_.currentTarget.getBoundingClientRect(),P=A?.getBoundingClientRect()??T;this.hover={x:T.left-P.left+T.width/2,y:T.top-P.top-4,text:`${ge(this.hass,f.start,i)} \u2192 ${f.open?g("now"):ge(this.hass,f.end,i)} \xB7 ${ut(f.end-f.start)}`}};return o`<div class="sensor">
      <div class="row"><span>${e}</span>
        <span class="muted">${h?g("longest",{v:ut(h.end-h.start)}):""}</span></div>
      <svg viewBox="0 0 ${280} 14" role="img" aria-label=${e}>
        <rect x="0" y="3" width=${280} height="8" rx="4" fill="var(--secondary-background-color)"></rect>
        ${p.map(f=>{let _=f.end-f.start>n;return k`<rect x=${d(f.start)} y=${_?1:3} width=${Math.max(3,d(f.end)-d(f.start))} height=${_?12:8} rx="3"
            fill=${_?"var(--warning-color)":"var(--secondary-text-color)"} opacity=${_?1:.45}
            @pointerenter=${$(f)} @pointerleave=${()=>this.hover=void 0}></rect>`})}
      </svg>
    </div>`}tip(){return o`<div class="wrap">${super.tip()}</div>`}};B.styles=[ht,I`
      :host { position: relative; }
      .sensor { margin-top: 8px; }
      .sensor svg { margin-top: 3px; }
      .ends { font-size: 10px; color: var(--secondary-text-color); margin-top: 2px; }
      .wrap { position: absolute; inset: 0; pointer-events: none; }
    `],u([y()],B.prototype,"sensorId",2),u([y()],B.prototype,"outsideId",2),u([y({type:Number})],B.prototype,"delayMin",2),u([y({type:Number})],B.prototype,"minOnPercent",2),u([y({type:Boolean})],B.prototype,"overClimate",2),u([S()],B.prototype,"gaps",2),u([S()],B.prototype,"error",2),B=u([z("vt-live-safety")],B);var mt=s=>s==null||s===""||Array.isArray(s)&&s.length===0;function Fr(s,t){return s.use_window_feature!==!0?"off":t&&t!=="off"?t:mt(s.window_sensor_entity_id)&&!mt(s.window_auto_open_threshold)?"drop":"sensor"}function jr(s,t,e,r){let{fields:n}=t;if(s.types&&!s.types.includes(e.thermostat_type))return null;let i=s.control,a=i?.type==="feature"&&i.key&&n[i.key]?i.key:void 0;if(a&&n[a].inherited)return null;let l=i?.type==="central"?i.key:i?.central,c=l&&n[l]?l:void 0,d=s.fields.filter(h=>n[h.key]&&!r.has(h.key)).map(h=>({...h,desc:n[h.key]}));return!d.length&&!a?null:{id:s.id,featureKey:a,featureOn:a?e[a]===!0:!0,centralKey:c,usesCentral:c?e[c]!==!1:!1,own:d.filter(h=>!h.desc.inherited),inherited:d.filter(h=>h.desc.inherited)}}function cr(s,t,e){let{fields:r}=s,n=new Set(s.layout.control_keys),i=new Set,a=[],l=d=>{d.groups.filter(T=>!T.types||T.types.includes(t.thermostat_type)).forEach(T=>T.fields.forEach(P=>i.add(P.key)));let h=d.control?.key&&r[d.control.key]?d.control.key:void 0,p,$=new Set,f=!1;if(d.method){if(d.method.feature&&!r[d.method.feature])return;let T=Fr(t,e);p={options:Object.keys(d.method.options),current:T},$=new Set(Object.entries(d.method.options).filter(([P])=>P!==T).flatMap(([,P])=>P)),f=T==="off"}let _=f?[]:d.groups.map(T=>jr(T,s,t,$)).filter(T=>!!T);if(!_.length&&!h&&!p&&!d.always)return;let A=new Set;_.forEach(T=>[...T.own,...T.inherited].forEach(P=>A.add(P.desc.step))),a.push({id:d.id,icon:d.icon??"mdi:dots-horizontal",featureKey:h,featureOn:h?t[h]===!0:!f,method:p,groups:_,steps:A})};s.layout.cards.forEach(l);let c=Object.keys(r).filter(d=>!i.has(d)&&!n.has(d));return c.length&&l({id:"other",groups:[{id:"other",control:null,fields:c.map(d=>({key:d,level:"common"}))}]}),a}var dr=s=>s.featureOn&&s.groups.some(t=>t.featureOn&&t.own.some(e=>e.desc.schema.required&&e.level!=="advanced"&&!fe(e.desc.schema)));function pr(s,t){let e={};for(let r of s){if(!r.featureOn)continue;let n=r.groups.filter(i=>i.featureOn).flatMap(i=>i.own).filter(i=>i.desc.schema.required&&mt(t[i.key])).map(i=>i.key);n.length&&(e[r.id]=n)}return e}function ur(s,t){let e=s;for(let[r,n]of Object.entries(t.fields))!n.inherited&&n.schema.default!==void 0&&e[r]===void 0&&(e===s&&(e={...s}),e[r]=n.schema.default);return e}var Wr=760,q=class extends O{constructor(){super(...arguments);this.narrow=!1;this.heading="";this.data={};this.dirty=!1;this.saving=!1;this.errors={};this.wide=!0;this.presets={own:{},central:{}};this.entities={};this.describeSeq=0;this.resizer=new ResizeObserver(([e])=>this.wide=e.contentRect.width>=Wr)}connectedCallback(){super.connectedCallback(),this.resizer.observe(this)}disconnectedCallback(){this.resizer.disconnect(),super.disconnectedCallback()}willUpdate(e){(e.has("entryId")||e.has("newType"))&&this.hass&&this.load()}async load(){this.loadError=void 0,this.banner=void 0,this.errors={},this.dirty=!1,this.windowMethod=void 0,this.layout=void 0,this.entities={};try{if(Qe(this.hass,this.entryId).then(e=>this.presets=e),this.entryId){let e=await Lt(this.hass,this.entryId);this.heading=e.title,this.entities=e.entities,await this.applyLayout(e.data,e)}else if(this.newType){let e=await Ht(this.hass,this.newType);this.heading=Ae(this.hass,this.newType),await this.applyLayout(e.data,e)}}catch(e){this.loadError=e?.message??String(e)}}async applyLayout(e,r){for(let n=0;n<4;n++){let i=ur(e,r);if(i===e)break;e=i,r=await Ye(this.hass,e)}this.data=e,this.layout=r}async change(e){let r={...this.data};for(let[a,l]of Object.entries(this.layout?.layout.derived_flags??{}))a in e&&(e={...e,[l]:!["",null,void 0].includes(e[a])});for(let[a,l]of Object.entries(e))l===void 0?delete r[a]:r[a]=l;this.data=r,this.dirty=!0;let n=++this.describeSeq,i=await Ye(this.hass,r);n===this.describeSeq&&await this.applyLayout(this.data,i)}setWindowMethod(e){if(this.windowMethod=e,e==="off"){this.change({use_window_feature:!1});return}let r=i=>this.layout?.fields[i]&&!this.layout.fields[i].inherited,n=e==="drop"?["window_sensor_entity_id"]:["window_auto_open_threshold","window_auto_close_threshold","window_auto_max_duration"].filter(r);this.change({use_window_feature:!0,...Object.fromEntries(n.map(i=>[i,void 0]))})}async onSave(){this.saving=!0,this.banner=void 0,this.errors={};try{let e=await zt(this.hass,this.data,this.entryId);if(e.success)this.dirty=!1,this.banner={type:"success",text:w("saved")},this.dispatchEvent(new CustomEvent("vtherm-saved",{bubbles:!0,composed:!0})),setTimeout(()=>Qe(this.hass,this.entryId).then(r=>this.presets=r),3e3),!this.entryId&&e.entry_id&&this.dispatchEvent(new CustomEvent("vtherm-created",{detail:{entryId:e.entry_id},bubbles:!0,composed:!0}));else if(e.incomplete)this.banner={type:"warning",text:w("not_saved_incomplete")};else{this.errors=e.errors,this.banner={type:"error",text:w("not_saved_rejected")};let r=Object.keys(e.errors)[0],n=this.cards().find(i=>i.steps.has(r));n&&this.updateComplete.then(()=>this.scrollToCard(n.id))}}catch(e){this.banner={type:"error",text:e?.message??String(e)}}finally{this.saving=!1}}cards(){return this.layout?cr(this.layout,this.data,this.windowMethod):[]}scrollToCard(e){this.renderRoot.querySelector(`#card-${e}`)?.scrollIntoView({behavior:"smooth",block:"start"})}fieldErrors(){let e={};for(let r of Object.values(this.errors))for(let[n,i]of Object.entries(r))n!=="base"&&(e[n]=rt(this.hass,i));return e}render(){if(this.loadError)return o`<ha-alert alert-type="error">${this.loadError}</ha-alert>`;if(!this.layout)return o`<div class="loading"><ha-spinner></ha-spinner></div>`;let e=this.cards(),r=pr(e,this.data),n=Object.values(r).reduce((a,l)=>a+l.length,0),i=this.fieldErrors();return o`
      <div class="toolbar">
        <div class="title">
          <div class="name">${this.data.name||this.heading}</div>
          <div class="sub">${Ae(this.hass,this.data.thermostat_type)}${this.entryId?"":" \xB7 new"}</div>
        </div>
        ${n?o`<span class="chip warn">${w("required_empty",{n})}</span>`:m}
        ${this.dirty?o`<span class="chip">${w("unsaved")}</span>`:m}
        <ha-button .disabled=${this.saving||!this.dirty&&!!this.entryId} @click=${this.onSave}>
          ${this.entryId?w("save"):w("create")}
        </ha-button>
      </div>
      <div class="body ${this.wide?"wide":"narrow"}">
        ${this.renderIndex(e,r,i)}
        <div class="content">
          ${this.banner?o`<ha-alert alert-type=${this.banner.type}>${this.banner.text}</ha-alert>`:m}
          ${this.renderColumns(e,i,r)}
        </div>
      </div>
    `}cardHasError(e,r){return e.groups.flatMap(i=>i.own.map(a=>a.key)).some(i=>r[i])||[...e.steps].some(i=>this.errors[i]?.base)}renderIndex(e,r,n){return o`<nav class="index" aria-label=${w("sections")}>
      ${e.map(i=>{let a=et(i.id),l=o`<ha-icon class="ok" icon="mdi:check"></ha-icon>`;return i.featureOn?this.cardHasError(i,n)?l=o`<span class="state err">${w("state_error")}</span>`:r[i.id]?l=o`<span class="state warn">${w("state_empty",{n:r[i.id].length})}</span>`:i.groups.every(c=>c.centralKey&&c.usesCentral)&&(l=o`<span class="state">${w("state_central")}</span>`):l=o`<span class="state">${w("state_off")}</span>`,o`<button class=${i.featureOn?"":"off"} @click=${()=>this.scrollToCard(i.id)}>
          <ha-icon icon=${i.icon}></ha-icon><span class="label">${a.title}</span>${l}
        </button>`})}
    </nav>`}renderColumns(e,r,n){return o`<div class="col">${e.map(i=>this.renderCard(i,r,n))}</div>`}renderCard(e,r,n){let i=et(e.id),a=[...e.steps].map(l=>this.errors[l]?.base).filter(Boolean);return o`
      <section
        class="card ${e.featureOn?"":"off"} ${dr(e)?"required":""} ${n[e.id]?"missing":""}"
        id="card-${e.id}"
      >
        <header>
          <ha-icon icon=${e.icon}></ha-icon>
          <div class="htext">
            <h2>${i.title}</h2>
            <p>${i.subtitle}</p>
          </div>
          ${e.featureKey?this.featureSwitch(e.featureKey,e.featureOn):m}
        </header>
        ${this.cardBody(e,o`
            ${e.method?this.methodChoice(e.method):m}
            ${e.featureOn?o`
                  ${a.map(l=>o`<ha-alert alert-type="error">${rt(this.hass,l)}</ha-alert>`)}
                  ${e.groups.map(l=>this.renderGroup(l,r))}
                  ${e.id==="presets"?this.presetTable():m}
                `:m}
          `)}
      </section>
    `}cardBody(e,r){let n=e.featureOn?this.livePanel(e):m;return n===m?r:o`<div class="cbody">
      <div class="settings">${r}</div>
      <aside class="live">${n}</aside>
    </div>`}effective(e){let r=this.layout.fields[e];if(r)return r.inherited?this.layout.central_values[e]:this.data[e]}effectiveNumber(e,r){let n=Number(this.effective(e));return this.effective(e)===void 0||this.effective(e)===null||this.effective(e)===""||!Number.isFinite(n)?r:n}livePanel(e){let r=this.data.thermostat_type;if(r==="thermostat_central_config")return m;let n=this.effective("temperature_sensor_entity_id")||void 0,i=this.effective("external_temperature_sensor_entity_id")||void 0,a=(c,d)=>this.effectiveNumber(c,d),l=c=>{let d=this.effective(c);return d==null||d===""?null:Number(d)};switch(e.id){case"heating":return this.effective("proportional_function")!=="tpi"||!this.layout.fields.tpi_coef_int?m:o`<vt-live-tpi
          .hass=${this.hass}
          .entities=${this.entities}
          .sensorId=${n}
          .outsideId=${i}
          .settings=${{coefInt:a("tpi_coef_int",.6),coefExt:a("tpi_coef_ext",.01),thresholdLow:a("tpi_threshold_low",0),thresholdHigh:a("tpi_threshold_high",0),cycleMin:a("cycle_min",5),minOnSec:a("minimal_activation_delay",0),minOffSec:a("minimal_deactivation_delay",0)}}
        ></vt-live-tpi>`;case"window":return e.method?.current!=="drop"?m:o`<vt-live-window
          .hass=${this.hass}
          .slopeId=${this.entities.temperature_slope}
          .sensorId=${n}
          .openThreshold=${l("window_auto_open_threshold")}
          .closeThreshold=${l("window_auto_close_threshold")}
          .maxDurationMin=${l("window_auto_max_duration")}
          .cycleMin=${a("cycle_min",5)}
        ></vt-live-window>`;case"safety":return o`<vt-live-safety
          .hass=${this.hass}
          .sensorId=${n}
          .outsideId=${i}
          .delayMin=${l("safety_delay_min")}
          .minOnPercent=${l("safety_min_on_percent")}
          .overClimate=${r==="thermostat_over_climate"}
        ></vt-live-safety>`}return m}renderGroup(e,r){let n=Ft(e.id),i=e.own.filter(c=>c.level!=="advanced"),a=e.own.filter(c=>c.level==="advanced"),l=n||e.featureKey;return o`
      <div class="group">
        ${l?o`<div class="ghead">
              <h3>${n??""}</h3>
              ${e.featureKey?this.featureSwitch(e.featureKey,e.featureOn):m}
            </div>`:m}
        ${e.featureOn?o`
              ${e.centralKey?this.overrideToggle(e.centralKey,e.usesCentral):m}
              ${i.length?o`<div class="fields">${i.map(c=>this.field(c,r))}</div>`:m}
              ${e.inherited.length?this.inheritedBlock(e.inherited):m}
              ${a.length?o`<details class="adv">
                    <summary>${w("advanced")} <span class="count">${a.length}</span></summary>
                    <div class="fields">${a.map(c=>this.field(c,r))}</div>
                  </details>`:m}
            `:m}
      </div>
    `}label(e){return tt(e.key,this.data.thermostat_type)?.label??Kt(this.hass,e.desc.step,e.key,this.layout.placeholders)}field(e,r,n=!1){let i=this.layout.placeholders,a=tt(e.key,this.data.thermostat_type),l=n?this.layout.central_values[e.key]:this.data[e.key];return o`<vt-field
      class=${fe(e.desc.schema)?"bool":tr(e.desc.schema)?"wide":""}
      .hass=${this.hass}
      .schema=${e.desc.schema}
      .value=${l}
      .label=${this.label(e)}
      .hint=${a?.hint??""}
      .info=${a?a.info??"":Zt(this.hass,e.desc.step,e.key,i)}
      .diagram=${a?.diagram}
      .error=${n?"":r[e.key]??""}
      .disabled=${n}
      .localizeValue=${Xt(this.hass)}
      @field-changed=${n?void 0:c=>this.change({[c.detail.key]:c.detail.value})}
    ></vt-field>`}inheritedBlock(e){let r=this.layout.placeholders,n=e.filter(a=>!["",null,void 0].includes(this.layout.central_values[a.key])),i=this.layout.central_entry_id;return o`<details class="inherited">
      <summary>
        <ha-icon icon="mdi:link-variant"></ha-icon>
        <span class="from">${w("from_central")}</span>
        ${n.length?o`<span class="values">${n.map(a=>o`<span class="kv"
                ><span class="k">${this.label(a)}</span>
                <span class="v">${this.formatValue(this.layout.central_values[a.key])}</span></span
              >`)}</span>`:o`<span class="values none">Nothing set there, so Versatile Thermostat's defaults apply.</span>`}
      </summary>
      <div class="fields">${e.map(a=>this.field(a,{},!0))}</div>
      ${i?o`<a class="central-link" href="?entry=${i}" @click=${a=>this.openCentral(a,i)}
            >${w("edit_central")}</a
          >`:m}
    </details>`}presetTable(){let e=this.data.thermostat_type==="thermostat_central_config",r=!e&&this.data.use_presets_central_config!==!1,n=r?this.presets.central:this.presets.own,i=[{id:"normal",suffix:""},...e||this.data.use_presence_feature?[{id:"away",suffix:"_away"}]:[],...e||this.data.ac_mode?[{id:"cool",suffix:"_ac"}]:[],...e||this.data.ac_mode&&this.data.use_presence_feature?[{id:"cool_away",suffix:"_ac_away"}]:[]],a=["frost","eco","comfort","boost"];if(!Object.keys(n).length)return o`<p class="note">${Z("pending")}</p>`;let l=this.hass.config?.unit_system?.temperature??"\xB0";return o`
      <div class="presets" style="--cols: ${i.length}">
        <span class="ph">${Z("preset")}</span>
        ${i.map(c=>o`<span class="ph">${Z(c.id)}</span>`)}
        ${a.map(c=>o`
            <span class="pr">${Z(c)}</span>
            ${i.map(d=>{let h=n[`${c}${d.suffix}_temp`],p=h?this.hass.states[h]:void 0;return p?r?o`<span class="pv">${p.state} ${l}</span>`:o`<span class="pv"
                    ><input
                      type="number"
                      .value=${p.state}
                      step=${p.attributes.step??.1}
                      min=${p.attributes.min??""}
                      max=${p.attributes.max??""}
                      aria-label="${Z(c)} ${Z(d.id)}"
                      @change=${$=>this.hass.callService("number","set_value",{entity_id:h,value:Number($.target.value)})}
                    />
                    ${l}</span
                  >`:o`<span class="pv none">–</span>`})}
          `)}
      </div>
      <p class="note">
        ${r?Z("from_central"):Z("saved_now")}
        ${r&&this.layout?.central_entry_id?o`<a class="central-link" href="?entry=${this.layout.central_entry_id}" @click=${c=>this.openCentral(c,this.layout.central_entry_id)}
              >${w("edit_central")}</a
            >`:m}
      </p>
    `}openCentral(e,r){e.preventDefault(),this.dispatchEvent(new CustomEvent("vtherm-open",{detail:{entryId:r},bubbles:!0,composed:!0}))}formatValue(e){return typeof e=="boolean"?e?"on":"off":Array.isArray(e)?e.map(r=>this.formatValue(r)).join(", "):typeof e=="string"&&this.hass.states[e]?this.hass.states[e].attributes.friendly_name??e:String(e)}featureSwitch(e,r){return o`<ha-switch
      .checked=${r}
      aria-label=${r?w("turn_off"):w("turn_on")}
      @change=${n=>this.change({[e]:n.target.checked})}
    ></ha-switch>`}overrideToggle(e,r){return o`<label class="override">
      <ha-switch .checked=${!r} @change=${n=>this.change({[e]:!n.target.checked})}></ha-switch>
      <span>${w("override")}</span>
    </label>`}methodChoice(e){return o`<div class="question">${He("question")}</div>
      <div class="seg wide" role="radiogroup" aria-label=${He("question")}>
      ${e.options.map(r=>o`<button role="radio" aria-checked=${r===e.current} class=${r===e.current?"on":""} @click=${()=>this.setWindowMethod(r)}>
            ${He(r)}
          </button>`)}
    </div>`}};q.styles=I`
    :host { display: block; --gap: 16px; }
    .loading { display: flex; justify-content: center; padding: 64px; }
    .toolbar {
      position: sticky; top: 0; max-width: 1240px; margin: 0 auto; box-sizing: border-box; z-index: 3; display: flex; align-items: center; gap: 12px;
      padding: 8px 16px; background: var(--app-header-background-color, var(--primary-background-color));
      border-bottom: 1px solid var(--divider-color);
    }
    .title { flex: 1; min-width: 0; }
    .name { font-size: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sub { color: var(--secondary-text-color); font-size: 13px; }
    .chip { font-size: 12px; padding: 2px 10px; border-radius: 12px; background: var(--secondary-background-color); color: var(--secondary-text-color); white-space: nowrap; }
    .chip.warn { background: rgba(var(--rgb-warning-color, 255, 166, 0), 0.18); color: var(--warning-color); }

    .body { display: grid; gap: var(--gap); padding: var(--gap); max-width: 1240px; margin: 0 auto; box-sizing: border-box; }
    .body.wide { grid-template-columns: 220px minmax(0, 1fr); align-items: start; }
    .content { min-width: 0; display: flex; flex-direction: column; gap: var(--gap); }

    .index { display: flex; flex-direction: column; gap: 2px; }
    .wide .index { position: sticky; top: 72px; }
    .narrow .index { flex-direction: row; flex-wrap: wrap; gap: 6px; }
    .index button {
      all: unset; box-sizing: border-box; display: flex; align-items: center; gap: 10px; padding: 7px 10px; border-radius: 8px;
      cursor: pointer; font-size: 14px; color: var(--primary-text-color); --mdc-icon-size: 18px;
    }
    .narrow .index button { border: 1px solid var(--divider-color); padding: 4px 10px; }
    .index button:hover, .index button:focus-visible { background: var(--secondary-background-color); }
    .index button.off { color: var(--secondary-text-color); }
    .index button > ha-icon:first-child { color: var(--secondary-text-color); }
    .index .label { flex: 1; }
    .index .ok { color: var(--success-color, #43a047); --mdc-icon-size: 16px; }
    .index .state { font-size: 11px; color: var(--secondary-text-color); }
    .index .state.warn { color: var(--warning-color); }
    .index .state.err { color: var(--error-color); }

    .col { display: flex; flex-direction: column; gap: var(--gap); min-width: 0; }

    .card {
      background: var(--ha-card-background, var(--card-background-color)); border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px); padding: 14px 16px; display: flex; flex-direction: column; gap: 10px;
      scroll-margin-top: 72px;
    }
    .card.off:not(:has(.seg)) { gap: 0; }
    .card { container-type: inline-size; }
    .cbody { display: flex; flex-direction: column; gap: 14px; }
    .settings { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
    .live { background: var(--secondary-background-color); border-radius: 10px; padding: 10px 12px; min-width: 0; }
    @container (min-width: 720px) {
      .cbody { display: grid; grid-template-columns: minmax(0, 1fr) 300px; align-items: start; }
      .live { position: sticky; top: 76px; }
    }
    /* Cards that ask for required values stand out a little; with values missing, in the warning colour. */
    .card.required { border-color: color-mix(in srgb, var(--primary-color) 45%, var(--divider-color)); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18); }
    .card.required.missing { border-color: color-mix(in srgb, var(--warning-color) 70%, var(--divider-color)); }
    .question { font-size: 14px; margin-bottom: -6px; }
    .card.off header { opacity: 0.7; }
    .card header { display: flex; align-items: flex-start; gap: 12px; }
    .card header > ha-icon { color: var(--secondary-text-color); margin-top: 2px; }
    .htext { flex: 1; min-width: 0; }
    .card h2 { margin: 0; font-size: 17px; font-weight: 500; }
    .card header p { margin: 2px 0 0; font-size: 13px; color: var(--secondary-text-color); line-height: 1.4; }
    .override { display: inline-flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer; align-self: flex-start; }

    .group { display: flex; flex-direction: column; gap: 8px; }
    .group + .group { border-top: 1px solid var(--divider-color); padding-top: 10px; }
    .ghead { display: flex; align-items: center; gap: 12px; min-height: 26px; }
    .ghead h3 { margin: 0; flex: 1; font-size: 12px; font-weight: 500; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.05em; }
    /* Fields as compact tiles in a grid; list inputs take a full row. */
    .fields { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 8px; align-items: stretch; }
    .fields vt-field.wide { grid-column: 1 / -1; }

    .seg { display: inline-flex; border: 1px solid var(--divider-color); border-radius: 8px; overflow: hidden; flex-shrink: 0; }
    .seg.wide { align-self: stretch; }
    .seg.wide button { flex: 1; }
    .seg button { all: unset; cursor: pointer; padding: 4px 14px; font-size: 13px; color: var(--secondary-text-color); text-align: center; }
    .seg button + button { border-left: 1px solid var(--divider-color); }
    .seg button.on { background: var(--primary-color); color: var(--text-primary-color, #fff); }
    .seg button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }

    details > summary { cursor: pointer; list-style: none; }
    details > summary::-webkit-details-marker { display: none; }
    .adv > summary { font-size: 13px; color: var(--primary-color); display: inline-flex; align-items: center; gap: 6px; }
    .adv > summary::before { content: "▸"; transition: transform 0.15s; }
    .adv[open] > summary::before { transform: rotate(90deg); }
    .adv[open] > summary { margin-bottom: 8px; }
    .count { font-size: 11px; padding: 0 6px; border-radius: 8px; background: var(--secondary-background-color); color: var(--secondary-text-color); }

    .inherited { border-left: 3px solid var(--divider-color); padding: 4px 0 4px 12px; }
    .inherited > summary { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 8px; font-size: 13px; --mdc-icon-size: 16px; }
    .inherited > summary ha-icon { color: var(--secondary-text-color); align-self: center; }
    .inherited .from { color: var(--secondary-text-color); }
    .inherited .values { display: flex; flex-wrap: wrap; gap: 6px; flex-basis: 100%; }
    .inherited .values.none { color: var(--secondary-text-color); font-style: italic; }
    .kv { display: inline-flex; border: 1px solid var(--divider-color); border-radius: 6px; overflow: hidden; font-size: 12px; max-width: 100%; }
    .kv .k { padding: 2px 6px; color: var(--secondary-text-color); background: var(--secondary-background-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 220px; }
    .kv .v { padding: 2px 6px; color: var(--primary-text-color); white-space: nowrap; }
    .inherited[open] > summary { margin-bottom: 8px; }
    .inherited .fields { opacity: 0.75; }
    .central-link { display: inline-block; margin-top: 10px; font-size: 13px; color: var(--primary-color); }
    .presets { display: grid; grid-template-columns: 150px repeat(var(--cols), 120px); gap: 6px 16px; align-items: center; }
    .ph { font-size: 12px; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.04em; }
    .pr { font-size: 14px; }
    .pv { font-size: 14px; font-variant-numeric: tabular-nums; display: flex; align-items: center; gap: 4px; }
    .pv.none { color: var(--secondary-text-color); }
    .pv input {
      width: 70px; padding: 6px 8px; font: inherit; color: var(--primary-text-color); border-radius: 6px;
      background: var(--input-fill-color, var(--secondary-background-color)); border: 1px solid var(--divider-color);
    }
    .pv input:focus { outline: 2px solid var(--primary-color); outline-offset: -1px; }
    .note { margin: 0; font-size: 13px; color: var(--secondary-text-color); }
    .note .central-link { margin: 0 0 0 6px; }
  `,u([y({attribute:!1})],q.prototype,"hass",2),u([y()],q.prototype,"entryId",2),u([y()],q.prototype,"newType",2),u([y({type:Boolean})],q.prototype,"narrow",2),u([S()],q.prototype,"heading",2),u([S()],q.prototype,"data",2),u([S()],q.prototype,"layout",2),u([S()],q.prototype,"windowMethod",2),u([S()],q.prototype,"dirty",2),u([S()],q.prototype,"saving",2),u([S()],q.prototype,"errors",2),u([S()],q.prototype,"banner",2),u([S()],q.prototype,"loadError",2),u([S()],q.prototype,"wide",2),u([S()],q.prototype,"presets",2),u([S()],q.prototype,"entities",2),q=u([z("vtherm-editor")],q);function hr(){let s=new URLSearchParams(window.location.search);return{entryId:s.get("entry")??void 0,newType:s.get("new")??void 0}}var F=class extends O{constructor(){super(...arguments);this.narrow=!1;this.ready=!1;this.entries=[];this.types=[];this.selection=hr();this.onLocation=()=>this.selection=hr()}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.onLocation),window.addEventListener("popstate",this.onLocation)}disconnectedCallback(){window.removeEventListener("location-changed",this.onLocation),window.removeEventListener("popstate",this.onLocation),super.disconnectedCallback()}async firstUpdated(){Ut(this.hass.language),await Promise.all([Dt(),Gt(this.hass),this.refreshEntries()]),this.ready=!0}async refreshEntries(){let e=await It(this.hass);this.entries=e.entries,this.types=e.thermostat_types}navigate(e){if(this.renderRoot.querySelector("vtherm-editor")?.dirty&&!confirm(w("discard")))return;let n=e.entryId?`?entry=${e.entryId}`:e.newType?`?new=${e.newType}`:"";history.pushState(null,"",`${window.location.pathname}${n}`),window.dispatchEvent(new CustomEvent("location-changed"))}effectiveSelection(){let{entryId:e,newType:r}=this.selection;return e||r?this.selection:{entryId:this.entries[0]?.entry_id}}render(){let e=this.effectiveSelection();return o`
      <div class="header">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="title">${w("panel_title")}</div>
      </div>
      ${this.ready?o`
            <div class="switcher">
              <vtherm-switcher
                .hass=${this.hass}
                .entries=${this.entries}
                .selected=${e.entryId}
                .newType=${e.newType}
                @vtherm-open=${r=>this.navigate(r.detail)}
              ></vtherm-switcher>
            </div>
            ${e.newType===st?o`<vtherm-type-chooser
                  .hass=${this.hass}
                  .types=${this.types}
                  .hasCentral=${this.entries.some(r=>r.thermostat_type===ae)}
                  @vtherm-open=${r=>this.navigate(r.detail)}
                ></vtherm-type-chooser>`:e.entryId||e.newType?o`<vtherm-editor
                  .hass=${this.hass}
                  .narrow=${this.narrow}
                  .entryId=${e.entryId}
                  .newType=${e.newType}
                  @vtherm-open=${r=>this.navigate(r.detail)}
                  @vtherm-saved=${()=>this.refreshEntries()}
                  @vtherm-created=${async r=>{await this.refreshEntries(),this.navigate({entryId:r.detail.entryId})}}
                ></vtherm-editor>`:o`<div class="empty">${w("empty")}</div>`}
          `:o`<div class="loading"><ha-spinner></ha-spinner></div>`}
    `}};F.styles=I`
    :host { display: block; min-height: 100vh; background: var(--primary-background-color); color: var(--primary-text-color); }
    .header {
      display: flex; align-items: center; height: var(--header-height, 56px); padding: 0 12px; gap: 12px;
      background: var(--app-header-background-color); color: var(--app-header-text-color, var(--text-primary-color));
      border-bottom: var(--app-header-border-bottom, none);
    }
    .title { font-size: 20px; }
    .switcher { padding: 16px 16px 4px; max-width: 1100px; margin: 0 auto; }
    .loading, .empty { display: flex; justify-content: center; padding: 64px; color: var(--secondary-text-color); }
  `,u([y({attribute:!1})],F.prototype,"hass",2),u([y({type:Boolean})],F.prototype,"narrow",2),u([y({attribute:!1})],F.prototype,"panel",2),u([S()],F.prototype,"ready",2),u([S()],F.prototype,"entries",2),u([S()],F.prototype,"types",2),u([S()],F.prototype,"selection",2),F=u([z("vtherm-dashboard-panel")],F);export{F as VThermConfigPanel};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
