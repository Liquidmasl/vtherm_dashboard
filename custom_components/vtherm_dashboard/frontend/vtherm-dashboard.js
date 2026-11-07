var cr=Object.defineProperty;var dr=Object.getOwnPropertyDescriptor;var d=(s,t,e,r)=>{for(var i=r>1?void 0:r?dr(t,e):t,n=s.length-1,a;n>=0;n--)(a=s[n])&&(i=(r?a(t,e,i):a(i))||i);return r&&i&&cr(t,e,i),i};var Se=globalThis,Te=Se.ShadowRoot&&(Se.ShadyCSS===void 0||Se.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ie=Symbol(),ht=new WeakMap,pe=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Te&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=ht.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&ht.set(e,t))}return t}toString(){return this.cssText}},mt=s=>new pe(typeof s=="string"?s:s+"",void 0,Ie),R=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((r,i,n)=>r+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[n+1],s[0]);return new pe(e,s,Ie)},ft=(s,t)=>{if(Te)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),i=Se.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,s.appendChild(r)}},Me=Te?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return mt(e)})(s):s;var{is:pr,defineProperty:ur,getOwnPropertyDescriptor:hr,getOwnPropertyNames:mr,getOwnPropertySymbols:fr,getPrototypeOf:gr}=Object,Ae=globalThis,gt=Ae.trustedTypes,vr=gt?gt.emptyScript:"",yr=Ae.reactiveElementPolyfillSupport,ue=(s,t)=>s,he={toAttribute(s,t){switch(t){case Boolean:s=s?vr:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Ee=(s,t)=>!pr(s,t),vt={attribute:!0,type:String,converter:he,reflect:!1,useDefault:!1,hasChanged:Ee};Symbol.metadata??=Symbol("metadata"),Ae.litPropertyMetadata??=new WeakMap;var W=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=vt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&ur(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){let{get:i,set:n}=hr(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:i,set(a){let l=i?.call(this);n?.call(this,a),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??vt}static _$Ei(){if(this.hasOwnProperty(ue("elementProperties")))return;let t=gr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ue("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ue("properties"))){let e=this.properties,r=[...mr(e),...fr(e)];for(let i of r)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let i of r)e.unshift(Me(i))}else t!==void 0&&e.push(Me(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ft(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){let n=(r.converter?.toAttribute!==void 0?r.converter:he).toAttribute(e,r.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=r.getPropertyOptions(i),a=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:he;this._$Em=i;let l=a.fromAttribute(e,n.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,r,i=!1,n){if(t!==void 0){let a=this.constructor;if(i===!1&&(n=this[t]),r??=a.getPropertyOptions(t),!((r.hasChanged??Ee)(n,e)||r.useDefault&&r.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:n},a){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),n!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,n]of r){let{wrapped:a}=n,l=this[i];a!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,n,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};W.elementStyles=[],W.shadowRootOptions={mode:"open"},W[ue("elementProperties")]=new Map,W[ue("finalized")]=new Map,yr?.({ReactiveElement:W}),(Ae.reactiveElementVersions??=[]).push("2.1.2");var Ve=globalThis,yt=s=>s,Ce=Ve.trustedTypes,_t=Ce?Ce.createPolicy("lit-html",{createHTML:s=>s}):void 0,St="$lit$",Z=`lit$${Math.random().toFixed(9).slice(2)}$`,Tt="?"+Z,_r=`<${Tt}>`,ee=document,fe=()=>ee.createComment(""),ge=s=>s===null||typeof s!="object"&&typeof s!="function",Be=Array.isArray,br=s=>Be(s)||typeof s?.[Symbol.iterator]=="function",Le=`[ 	
\f\r]`,me=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,xt=/>/g,Q=RegExp(`>|${Le}(?:([^\\s"'>=/]+)(${Le}*=${Le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),wt=/'/g,$t=/"/g,At=/^(?:script|style|textarea|title)$/i,Fe=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),o=Fe(1),$=Fe(2),jr=Fe(3),te=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),kt=new WeakMap,J=ee.createTreeWalker(ee,129);function Et(s,t){if(!Be(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return _t!==void 0?_t.createHTML(t):t}var xr=(s,t)=>{let e=s.length-1,r=[],i,n=t===2?"<svg>":t===3?"<math>":"",a=me;for(let l=0;l<e;l++){let c=s[l],p,h,f=-1,w=0;for(;w<c.length&&(a.lastIndex=w,h=a.exec(c),h!==null);)w=a.lastIndex,a===me?h[1]==="!--"?a=bt:h[1]!==void 0?a=xt:h[2]!==void 0?(At.test(h[2])&&(i=RegExp("</"+h[2],"g")),a=Q):h[3]!==void 0&&(a=Q):a===Q?h[0]===">"?(a=i??me,f=-1):h[1]===void 0?f=-2:(f=a.lastIndex-h[2].length,p=h[1],a=h[3]===void 0?Q:h[3]==='"'?$t:wt):a===$t||a===wt?a=Q:a===bt||a===xt?a=me:(a=Q,i=void 0);let y=a===Q&&s[l+1].startsWith("/>")?" ":"";n+=a===me?c+_r:f>=0?(r.push(p),c.slice(0,f)+St+c.slice(f)+Z+y):c+Z+(f===-2?l:y)}return[Et(s,n+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ve=class s{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let n=0,a=0,l=t.length-1,c=this.parts,[p,h]=xr(t,e);if(this.el=s.createElement(p,r),J.currentNode=this.el.content,e===2||e===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(i=J.nextNode())!==null&&c.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let f of i.getAttributeNames())if(f.endsWith(St)){let w=h[a++],y=i.getAttribute(f).split(Z),T=/([.?@])?(.*)/.exec(w);c.push({type:1,index:n,name:T[2],strings:y,ctor:T[1]==="."?He:T[1]==="?"?Ne:T[1]==="@"?De:ne}),i.removeAttribute(f)}else f.startsWith(Z)&&(c.push({type:6,index:n}),i.removeAttribute(f));if(At.test(i.tagName)){let f=i.textContent.split(Z),w=f.length-1;if(w>0){i.textContent=Ce?Ce.emptyScript:"";for(let y=0;y<w;y++)i.append(f[y],fe()),J.nextNode(),c.push({type:2,index:++n});i.append(f[w],fe())}}}else if(i.nodeType===8)if(i.data===Tt)c.push({type:2,index:n});else{let f=-1;for(;(f=i.data.indexOf(Z,f+1))!==-1;)c.push({type:7,index:n}),f+=Z.length-1}n++}}static createElement(t,e){let r=ee.createElement("template");return r.innerHTML=t,r}};function ie(s,t,e=s,r){if(t===te)return t;let i=r!==void 0?e._$Co?.[r]:e._$Cl,n=ge(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(s),i._$AT(s,e,r)),r!==void 0?(e._$Co??=[])[r]=i:e._$Cl=i),i!==void 0&&(t=ie(s,i._$AS(s,t.values),i,r)),t}var ze=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??ee).importNode(e,!0);J.currentNode=i;let n=J.nextNode(),a=0,l=0,c=r[0];for(;c!==void 0;){if(a===c.index){let p;c.type===2?p=new ye(n,n.nextSibling,this,t):c.type===1?p=new c.ctor(n,c.name,c.strings,this,t):c.type===6&&(p=new Ue(n,this,t)),this._$AV.push(p),c=r[++l]}a!==c?.index&&(n=J.nextNode(),a++)}return J.currentNode=ee,i}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},ye=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ie(this,t,e),ge(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==te&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):br(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&ge(this._$AH)?this._$AA.nextSibling.data=t:this.T(ee.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ve.createElement(Et(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new ze(i,this),a=n.u(this.options);n.p(e),this.T(a),this._$AH=n}}_$AC(t){let e=kt.get(t.strings);return e===void 0&&kt.set(t.strings,e=new ve(t)),e}k(t){Be(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,i=0;for(let n of t)i===e.length?e.push(r=new s(this.O(fe()),this.O(fe()),this,this.options)):r=e[i],r._$AI(n),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=yt(t).nextSibling;yt(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ne=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=u}_$AI(t,e=this,r,i){let n=this.strings,a=!1;if(n===void 0)t=ie(this,t,e,0),a=!ge(t)||t!==this._$AH&&t!==te,a&&(this._$AH=t);else{let l=t,c,p;for(t=n[0],c=0;c<n.length-1;c++)p=ie(this,l[r+c],e,c),p===te&&(p=this._$AH[c]),a||=!ge(p)||p!==this._$AH[c],p===u?t=u:t!==u&&(t+=(p??"")+n[c+1]),this._$AH[c]=p}a&&!i&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},He=class extends ne{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},Ne=class extends ne{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},De=class extends ne{constructor(t,e,r,i,n){super(t,e,r,i,n),this.type=5}_$AI(t,e=this){if((t=ie(this,t,e,0)??u)===te)return;let r=this._$AH,i=t===u&&r!==u||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==u&&(r===u||i);i&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ue=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){ie(this,t)}};var wr=Ve.litHtmlPolyfillSupport;wr?.(ve,ye),(Ve.litHtmlVersions??=[]).push("3.3.3");var Ct=(s,t,e)=>{let r=e?.renderBefore??t,i=r._$litPart$;if(i===void 0){let n=e?.renderBefore??null;r._$litPart$=i=new ye(t.insertBefore(fe(),n),n,void 0,e??{})}return i._$AI(s),i};var je=globalThis,q=class extends W{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ct(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return te}};q._$litElement$=!0,q.finalized=!0,je.litElementHydrateSupport?.({LitElement:q});var $r=je.litElementPolyfillSupport;$r?.({LitElement:q});(je.litElementVersions??=[]).push("4.2.2");var I=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};var kr={attribute:!0,type:String,converter:he,reflect:!1,hasChanged:Ee},Sr=(s=kr,t,e)=>{let{kind:r,metadata:i}=e,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),r==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(e.name,s),r==="accessor"){let{name:a}=e;return{set(l){let c=t.get.call(this);t.set.call(this,l),this.requestUpdate(a,c,s,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,s,l),l}}}if(r==="setter"){let{name:a}=e;return function(l){let c=this[a];t.call(this,l),this.requestUpdate(a,c,s,!0,l)}}throw Error("Unsupported decorator location: "+r)};function v(s){return(t,e)=>typeof e=="object"?Sr(s,t,e):((r,i,n)=>{let a=i.hasOwnProperty(n);return i.constructor.createProperty(n,r),a?Object.getOwnPropertyDescriptor(i,n):void 0})(s,t,e)}function k(s){return v({...s,state:!0,attribute:!1})}var ae="vtherm_dashboard",qt=s=>s.callWS({type:`${ae}/list`}),Pt=(s,t)=>s.callWS({type:`${ae}/get`,entry_id:t}),Rt=(s,t)=>s.callWS({type:`${ae}/new`,thermostat_type:t}),We=(s,t)=>s.callWS({type:`${ae}/describe`,data:t}),Ot=(s,t,e)=>s.callWS({type:`${ae}/save`,data:t,...e?{entry_id:e}:{}}),Ge=(s,t)=>s.callWS({type:`${ae}/presets`,...t?{entry_id:t}:{}});async function It(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;await customElements.whenDefined("partial-panel-resolver");let s=document.createElement("partial-panel-resolver");s.hass={panels:[{url_path:"tmp",component_name:"config"}]},s._updateRoutes(),await s.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config"),await document.createElement("ha-panel-config").routerOptions.routes.automation.load(),await customElements.whenDefined("ha-form")}var M={cards:{room:{title:"Room",subtitle:"What this thermostat is called and what it measures."},devices:{title:"Devices",subtitle:"The heaters, valves or climates this thermostat drives."},correction:{title:"Setpoint correction",subtitle:"The device's built-in sensor sits next to the heat, so VT raises or lowers the target it sends until your room sensor reaches your temperature."},heating:{title:"Heating control",subtitle:"How much and how often to heat."},presets:{title:"Presets",subtitle:"The target temperature of each preset."},window:{title:"Open window",subtitle:"What happens when a window opens."},motion:{title:"Room presence",subtitle:"In the Activity preset, the room uses one preset's temperature while someone is there and another's when it is empty. The preset itself stays Activity; other presets ignore the sensor."},presence:{title:"Away from home",subtitle:"Lower the temperature when nobody is home, using a person entity or a home occupancy sensor."},power:{title:"Power & energy",subtitle:"Device consumption and load shedding."},boiler:{title:"Central boiler",subtitle:"Turn the boiler on when any thermostat needs heat."},safety:{title:"Sensor loss & manual changes",subtitle:"What to do when the room thermometer goes quiet, and how long a manual change lasts."},auto_start_stop:{title:"Auto start/stop",subtitle:"Turn the climate off when it is not needed."},lock:{title:"Lock",subtitle:"Stop people or automations from changing this thermostat."},other:{title:"Other",subtitle:"Settings this page does not place yet."}},groups:{range:"Outdoor sensor and temperature range",valve:"Direct valve control",valve_limits:"Valve commands",sync:"Sync the device's internal temperature",tpi:"TPI coefficients",auto_tpi:"Auto-TPI learning",window_behaviour:"What happens",motion_detect:"Sensor",motion_behaviour:"What happens",shedding:"Load shedding",failure:"Heating failure detection"},fields:{name:{label:"Name",info:"Name of the thermostat and of its climate entity."},temperature_sensor_entity_id:{label:"Room temperature sensor",hint:"Where people sit, away from windows and the heater.",info:"The temperature VT regulates on. Place it in the middle of the living space: next to a window it reacts to drafts, next to the heater it reads too warm and the room stays cold."},humidity_sensor_entity_id:{label:"Humidity sensor",hint:"Optional. Shown on the thermostat, not used for heating.",info:"Exposes humidity on the thermostat card; it does not change regulation. When the room sensor's device also measures humidity, the panel pre-fills that sensor (VT's flow did this silently as 'enabled but empty')."},last_seen_temperature_sensor_entity_id:{label:"Sensor 'last seen' time",hint:"Optional. Prevents false alarms from sensors that only report changes.",info:"A datetime entity telling when the temperature sensor last checked in (many Zigbee sensors have 'last_seen'). Battery sensors stay silent while the temperature is stable; without this, VT may think the sensor died and switch to sensor-loss mode.",diagram:"safety"},external_temperature_sensor_entity_id:{label:"Outdoor temperature sensor",hint:"Used to heat more when it is cold outside.",info:"Feeds the outdoor part of the heating calculation (coef_ext). If it stops reporting, sensor-loss mode can trigger too, unless disabled globally in configuration.yaml."},temp_min:{label:"Lowest settable temperature",info:"The thermostat will not accept a target below this. Default 7 \xB0C."},temp_max:{label:"Highest settable temperature",info:"The thermostat will not accept a target above this. Default 35 \xB0C."},step_temperature:{label:"Temperature step",info:"How much one +/\u2212 press changes the target. Default 0.1 \xB0C."},underlying_entity_ids:{label:"Devices to control",info:`**over_switch**: switch, input_boolean, select or climate entities.
**over_valve**: number entities that set the valve opening.
**over_climate**: climate entities.`},ac_mode:{label:"Air conditioning",hint:"The device can cool.",info:"over_switch / over_valve: only cooling is offered. over_climate: heating and cooling, if the device supports both. Adds cooling (clim) presets."},inverse_switch_command:{label:"Inverted switch",hint:"For pilot-wire modules with a diode.",info:"On means heater off and off means heater on. Needed for some French pilot-wire setups (fil pilote) with a diode."},heater_keep_alive:{label:"Keep-alive interval (s)",hint:"Resend the current state regularly. Empty: off.",info:"Some devices switch themselves off if they hear nothing for a while. VT then repeats the current on/off command at this interval."},on_command_text:{label:"Custom on/off commands",hint:"Needed when a device is not a plain switch.",info:"Format command[/attribute[:value]], one per device, in the same order as the devices. Examples: select_option/option:comfort, set_hvac_mode/hvac_mode:heat. Plain switches use turn_on / turn_off automatically."},used_by_controls_central_boiler:{label:"Heated by the central boiler",hint:"Turns the boiler on when this room needs heat.",info:"Counts this thermostat's devices for the central boiler (configured in the central configuration). Rooms on electric heaters usually stay off."},auto_fan_mode:{label:"Boost fan when far from target",info:"Runs the device's fan at this level while the room is far from the target, so heat spreads faster. Falls back to the quietest mode once close."},auto_regulation_dtemp:{label:"Smallest change sent (\xB0)",hint:"Smaller target changes are not sent.",info:"Avoids sending a new target for every tiny change; some devices beep or drain batteries on each command. Too high and the correction stops working.",diagram:"send_threshold"},auto_regulation_periode_min:{label:"Minimum time between changes (min)",info:"A new target is sent at most this often.",diagram:"send_threshold"},opening_threshold_degree:{label:"Treat as closed below (%)",hint:"Requested openings below this close the valve.",info:"Requested opening below this value counts as 'no heat': the valve goes to its most closed position and the room counts as not heating (also for the central boiler).",diagram:"valve_curve"},min_opening_degrees:{label:"Minimum opening when heating (%)",hint:"One value per valve, comma separated.",info:"As soon as the room needs heat the valve opens at least this far. Use it for valves with a dead zone where the first % let no water through. Example: 15 or '15, 20'.",diagram:"valve_curve"},max_opening_degrees:{label:"Maximum opening (%)",hint:"One value per valve, comma separated.",info:"The valve never opens further. Limits flow, e.g. to balance radiators. Must be above the minimum opening.",diagram:"valve_curve"},max_closing_degree:{label:"How far the valve may close (%)",hint:"100 = fully closed.",info:"Set below 100 to always leave a little water flowing, e.g. 90 keeps 10 % open (quieter, protects the pump).",diagram:"valve_curve"},auto_regulation_mode:{label:"Correction strength",hint:"Start with Light, raise only if the room misses the target.",info:"The device regulates on its own sensor, which often sits next to the heat. VT shifts the target it sends so the room sensor reaches your temperature. Light: up to 1.5 \xB0, Medium: 2 \xB0, Strong: 3 \xB0. Expert uses values from configuration.yaml. 'Direct valve control' instead sets the valve opening itself (needs an opening entity). More correction means more energy and wear.",diagram:"correction"},auto_regulation_use_device_temp:{label:"Compensate the device's own sensor",hint:"Rarely needed. Try correction first.",info:"Adds (device temperature \u2212 room temperature) to the target. Example: room 18 \xB0, device reads 22 \xB0: VT sends 4 \xB0 more so the device actually heats. Unstable device sensors make this worse."},opening_degree_entity_ids:{label:"Valve opening entities",hint:"One per device, same order as the devices.",info:"The number entities that set each valve's opening."},closing_degree_entity_ids:{label:"Valve closing entities",hint:"Optional. All or none.",info:"If the valve also has a closing entity, VT sets it to 100 \u2212 opening."},sync_entity_ids:{label:"Entities to sync",hint:"One per device, same order as the devices.",info:"Either the device's temperature calibration entity (offset mode) or its external temperature input (direct mode). Some devices need an extra setting, e.g. Sonoff TRVZB: sensor_select = external."},sync_with_calibration:{label:"Use calibration offset",hint:"On: adjust the device's offset. Off: send the room temperature.",info:"Offset mode works with most TRVs (local_temperature_calibration). Direct mode needs a device that accepts an external temperature."},proportional_function:{label:"Algorithm",hint:"TPI is built in. Other algorithms are separate plugins.",info:"Only TPI ships with Versatile Thermostat. Other algorithms, such as **SmartPI** (learns the room; recommended by VT's author), are separate plugins you install first (versatile-thermostat.org/en/plugins). Once installed, they appear in this list."},cycle_min:{label:"Cycle length (min)",hint:"5 minutes suits most rooms; longer for slow heating.",info:"Every cycle VT works out how much heat the room needs and, for switches, keeps the heater on for that share of the cycle. Short cycles react faster but switch more often; slow heating (underfloor, storage heaters) needs longer cycles. Too short and the heater never warms up.",diagram:"tpi_cycle"},tpi_coef_int:{label:"Room gap factor (coef_int)",hint:"Higher: catches up faster. Lower if it overshoots.",info:"Heating share = coef_int \xD7 (target \u2212 room) + coef_ext \xD7 (target \u2212 outdoor). Reaching the target too slowly: raise it. Oscillating around the target: lower it. Default 0.6.",diagram:"tpi_formula"},tpi_coef_ext:{label:"Outdoor factor (coef_ext)",hint:"Raise if the room settles below target.",info:"Compensates heat lost to the outside. Settles below the target: raise it. Settles above: lower it. Default 0.01.",diagram:"tpi_formula"},minimal_activation_delay:{label:"Shortest on-time (s)",hint:"Shorter heating pulses are skipped.",info:"Avoids pulses too short for the heater to do anything. Default 10 s.",diagram:"min_on_off"},minimal_deactivation_delay:{label:"Shortest off-time (s)",hint:"Shorter pauses are skipped (stays on).",info:"Avoids flicking off for a few seconds. Default 0.",diagram:"min_on_off"},tpi_threshold_high:{label:"Stop heating above target + (\xB0)",hint:"0 = off. Needs the resume value too.",info:"If the room gets this much warmer than the target, heating stops completely until it falls below target + resume value. Both values must be set.",diagram:"tpi_thresholds"},tpi_threshold_low:{label:"Resume below target + (\xB0)",hint:"Must be smaller than the stop value.",info:"See 'Stop heating above target'.",diagram:"tpi_thresholds"},auto_tpi_learning_type:{label:"Learning type",hint:"Discovery for a new setup, Fine tuning to refine.",info:"Learning sessions take about 48 h and are started manually (service or Auto-TPI card). Discovery: fast, from scratch. Fine tuning: slow, small corrections."},auto_tpi_heating_rate:{label:"Heating rate (\xB0/h)",hint:"0 = measure it automatically.",info:"How fast the heater can warm the room at full power."},heater_heating_time:{label:"Warm-up time (min)",hint:"Time to reach full power, e.g. 5 for an electric radiator."},heater_cooling_time:{label:"Cool-down time (min)",hint:"Time to cool after stopping, e.g. 7 for an electric radiator."},auto_tpi_aggressiveness:{label:"Aggressiveness",hint:"Lower (e.g. 0.8) if it keeps overshooting.",info:"Scales the learned coefficients down. 1.0 = use them as learned."},auto_tpi_continuous_kext:{label:"Keep learning the outdoor factor",hint:"Slow background adjustment between sessions."},auto_tpi_enable_advanced_settings:{label:"Show learning parameters"},auto_tpi_avg_initial_weight:{label:"Weight of old values",hint:"1 = replace quickly, 50 = change slowly."},auto_tpi_ema_alpha:{label:"Alpha",hint:"Higher reacts faster to recent cycles."},auto_tpi_ema_decay_rate:{label:"Decay rate",hint:"Slows learning down over time."},auto_tpi_continuous_kext_alpha:{label:"Background learning speed",hint:"Default 0.04 \u2248 a few days to adapt."},use_presets_central_config:{label:"Use the central preset temperatures",hint:"Off: this room has its own Eco/Comfort/Boost temperatures.",info:"Preset temperatures are number entities on the thermostat, or on the central configuration when this is on."},use_central_mode:{label:"Follow the central mode switch",hint:"Lets one switch stop all rooms or set them to frost protection.",info:"The central configuration has a select (Auto, Stopped, Heat only, Cool only, Frost protection) that controls every thermostat with this on."},window_sensor_entity_id:{label:"Window sensor",hint:"A binary sensor or a group of them.",info:"For several windows, make a binary_sensor group."},window_delay:{label:"Wait before reacting (s)",hint:"Short airing does not stop the heating.",info:"The window must stay open this long before the action happens.",diagram:"window_delay"},window_off_delay:{label:"Wait after closing (s)",hint:"Empty: same as above.",info:"The window must stay closed this long before heating resumes.",diagram:"window_delay"},window_auto_open_threshold:{label:"Detect when falling faster than (\xB0/h)",hint:"Lower detects sooner, with more false alarms. Try 3.",info:"VT watches the temperature slope. A sudden drop beyond this rate counts as an open window. Not for hallways or rooms with normal big swings.",diagram:"window_slope"},window_auto_close_threshold:{label:"Consider closed when above (\xB0/h)",hint:"Usually 0: the temperature stops falling.",diagram:"window_slope"},window_auto_max_duration:{label:"Give up after (min)",hint:"Heating resumes even if it keeps cooling. Try 30\u201360.",diagram:"window_slope"},window_action:{label:"When open",hint:"Turn off, fan only, frost protection or eco.",info:"Frost protection and Eco change the target without changing the preset, so the preset shown can differ from the target."},motion_sensor_entity_id:{label:"Room presence sensor",hint:"A motion or occupancy (mmWave) sensor in this room.",info:`VT calls this feature "motion", but it only asks whether someone is in the room: on = someone there, off = empty. An occupancy sensor fits best; a motion sensor works too.

It only acts in the **Activity** preset, which appears once this card is set up. The preset stays Activity; only the target changes: the occupied preset's temperature while someone is there, the empty preset's once the room has been empty for a while. In Eco, Comfort, Boost or a manual temperature the sensor is ignored, so an explicitly chosen preset always wins.`},motion_preset:{label:"Temperature when occupied",diagram:"motion",hint:"The temperature of this preset is used; the selected preset stays Activity."},no_motion_preset:{label:"Temperature when empty",diagram:"motion",hint:"The temperature of this preset is used while the room is empty."},motion_delay:{label:"Occupied after (s)",hint:"Walking through does not count.",diagram:"motion"},motion_off_delay:{label:"Empty after (s)",diagram:"motion"},presence_sensor_entity_id:{label:"Home occupancy sensor",hint:"on/home = someone home, off/not_home = away.",info:"A person entity, or a binary sensor (a binary_sensor group works). A group of persons does not: VT's docs (French original too) recommend a template sensor for that. While away, the 'away' preset temperatures (separate entities) apply."},device_power:{label:"Device power",hint:"Total of all devices; same unit everywhere.",info:"Used for the energy sensors, load shedding and the central boiler."},power_unit:{label:"Unit"},power_sensor_entity_id:{label:"Home consumption sensor",hint:"Total power the home uses right now."},max_power_sensor_entity_id:{label:"Maximum allowed power sensor",hint:"Keep a margin below your main fuse.",info:"Not a safety feature: overload is still possible between sensor updates."},power_temp:{label:"Temperature while shedding"},safety_delay_min:{label:"Sensor silent for (min)",hint:"Then switch to a safe fixed power. Battery sensors: 120\u2013240.",info:"If no temperature arrives for this long, VT stops trusting the sensor. Set 'last seen' in Room to avoid false alarms.",diagram:"safety"},safety_default_on_percent:{label:"Fixed power during sensor loss",hint:"0.1 = 10 %. 0 risks freezing.",diagram:"safety"},safety_min_on_percent:{label:"Only when heating at least",hint:"0.5 = 50 %. Below this, sensor loss is ignored.",info:"A heater running low cannot overheat the room, so no need to react.",diagram:"safety"},manual_override_duration_min:{label:"Return to preset after a manual change (min)",hint:"0 = keep the manual temperature.",diagram:"override"},repair_incorrect_state:{label:"Resend ignored commands",hint:"For relays or valves that sometimes miss a command.",info:"Max 5 retries in a row; frequent repairs point to a hardware or network problem."},heating_failure_threshold:{label:"Heating hard means at least (%)",hint:"0.9 = 90 %.",diagram:"failure"},cooling_failure_threshold:{label:"Heating off means at most (%)",hint:"0 = 0 %.",diagram:"failure"},heating_failure_detection_delay:{label:"Alert after (min)",hint:"Raise for underfloor heating or large rooms.",diagram:"failure"},temperature_change_tolerance:{label:"Ignore changes smaller than (\xB0)",hint:"Filters sensor noise.",diagram:"failure"},failure_detection_enable_template:{label:"Only detect when (template)",hint:"Optional."},auto_start_stop_level:{label:"Reaction speed",hint:"Fast stops and restarts more often.",info:"Very slow \u2248 60 min between stop and restart, slow \u2248 30, medium \u2248 15, fast \u2248 7. Only restarts devices it stopped itself."},lock_users:{label:"Block changes from the UI",info:"Window actions, safety and load shedding keep working while locked."},lock_automations:{label:"Block automations and schedulers"},lock_code:{label:"PIN code",hint:"4 digits. Optional."},auto_relock_sec:{label:"Lock again after (s)",hint:"0 = stay unlocked."},"auto_regulation_dtemp@thermostat_over_valve":{label:"Smallest opening change sent (%)",hint:"Smaller changes are not sent to the valve.",info:"Limits how often the valve moves (noise, battery).",diagram:"send_threshold"},"auto_regulation_periode_min@thermostat_over_valve":{label:"Minimum time between valve updates (min)",info:"The valve gets a new opening at most this often.",diagram:"send_threshold"},"underlying_entity_ids@thermostat_over_switch":{label:"Devices to control",hint:"Several switches get shifted start times to smooth the power draw.",info:`**over_switch**: switch, input_boolean, select or climate entities.
**over_valve**: number entities that set the valve opening.
**over_climate**: climate entities.

With several switches each one still gets its full on-time; VT only shifts their start so fewer run at once (smoother power draw). At high demand they overlap.`,diagram:"stagger"}},diagrams:{tpi_cycle:{title:"Heating cycle",caption:"Each cycle, the heater runs for the share the algorithm asks for."},tpi_formula:{title:"How much to heat",caption:"Two stacked bars for an example: room gap \xD7 coef_int + outdoor gap \xD7 coef_ext = heating share, capped at 100 %."},tpi_thresholds:{title:"Stop and resume band",caption:"Temperature line above the target: crossing target+stop turns heating off, falling below target+resume turns it back on."},valve_curve:{title:"Requested vs sent opening",caption:"x: opening the algorithm wants, y: opening sent. Flat at the closed position until 'treat as closed', jumps to the minimum, rises, flattens at the maximum."},send_threshold:{title:"Only meaningful changes are sent",caption:"A wanted value wiggling, and the sent value as steps that only move when the change exceeds the threshold and enough time has passed."},window_delay:{title:"Window timeline",caption:"Window open bar; short opening below the wait: nothing; long opening: action after the wait, resumes after the closed wait."},window_slope:{title:"Temperature-drop detection",caption:"Temperature line with a sudden fall: slope beyond the threshold marks 'open', ends when the slope recovers or the max duration passes."},motion:{title:"Room presence timeline",caption:"A short pass does nothing; staying uses the occupied temperature; leaving returns to the empty temperature after the delay. The preset stays Activity."},safety:{title:"Sensor loss",caption:"Sensor report dots, then a gap longer than the delay: heating switches to the fixed power until a report arrives."},override:{title:"Manual change",caption:"Preset target line, a manual bump, back to the preset target after the duration."},failure:{title:"Heating failure",caption:"Heating share at \u2265 threshold for longer than the delay while temperature stays flat: alert."},correction:{title:"Setpoint correction",caption:"Room temp below target; the target sent to the device is raised by the correction, capped by strength."},stagger:{title:"Several heaters in one room",caption:"Each heater on for the same share of the cycle, start times shifted."},min_on_off:{title:"Shortest on- and off-time",caption:"Very short pulses are skipped; very short pauses keep heating."}},types:{thermostat_over_switch:{title:"Switch a heater on and off",body:"Versatile Thermostat turns the device on for part of each cycle, more when the room is colder.",examples:"Electric radiators, heating cables, relays, smart plugs, pilot-wire modules."},thermostat_over_valve:{title:"Set how far a valve opens",body:"Versatile Thermostat sends an opening percentage to the valve and adjusts it as the room warms up.",examples:"Radiator valves that expose their opening as a number (e.g. some Zigbee TRVs)."},thermostat_over_climate:{title:"Drive a device with its own thermostat",body:"The device regulates itself; Versatile Thermostat sets its target and corrects it using your room sensor.",examples:"Thermostatic radiator valves, air conditioners, heat pumps."},thermostat_central_config:{title:"Central configuration",body:"Shared defaults (outdoor sensor, presets, window and safety behaviour) that every VTherm can take over.",examples:"Create it first if you have several rooms."}},window:{question:"How should this room notice an open window?",off:"No detection",sensor:"Window sensor",drop:"Temperature drop"},presets:{preset:"Preset",normal:"Normal",away:"Away",cool:"Cooling",cool_away:"Cooling, away",frost:"Frost protection",eco:"Eco",comfort:"Comfort",boost:"Boost",from_central:"These temperatures come from the central configuration and apply to every thermostat that uses it.",saved_now:"Changes here apply immediately.",pending:"Save first: the thermostat creates its own preset temperatures when it stops using the central ones."},ui:{panel_title:"Versatile Thermostat",save:"Save",create:"Create",unsaved:"Unsaved changes",required_empty:"{n} required empty",saved:"Saved. The thermostat has been reloaded.",not_saved_incomplete:"Not saved: some required settings are still empty. They are marked in the index.",not_saved_rejected:"Not saved: Versatile Thermostat rejected a setting. It is marked below.",advanced:"Advanced settings",from_central:"From the central configuration",central_nothing:"Nothing set there, so Versatile Thermostat's defaults apply.",edit_central:"Edit the central configuration",override:"Override central configuration",state_off:"Off",state_error:"Error",state_empty:"{n} empty",state_central:"Central",turn_on:"Turn on",turn_off:"Turn off",new:"New",new_vtherm:"New VTherm",choose_type:"Choose a type",shared_defaults:"Shared defaults",no_climate:"No climate entity",not_loaded:"Not loaded",thermostats:"Thermostats",chooser_question:"What does this thermostat control?",chooser_no_central:"No central configuration yet. With several rooms, create it first: every thermostat can then take over its defaults.",empty:"No Versatile Thermostats yet. Use \u201CNew\u201D above to create the first one.",discard:"Discard the unsaved changes on this thermostat?",sections:"Sections",more_info:"More information"},live:{estimate:"estimate",loading:"Loading history\u2026",no_sensor:"Pick a temperature sensor to see this.",no_temperature:"No room temperature yet.",too_little_history:"Not enough recorded temperatures in this period.",range_24h:"in the last 24 h",range_7d:"in the last 7 days",now:"now",tpi_title:"Right now",room:"Room",target:"Target",outside:"Outside",of_each_cycle:"heating: {on} on per {cycle} cycle",room_part:"room gap {v}",outside_part:"outside {v}",stopped_threshold:"Stopped: the room is past the target by more than the stop/resume threshold.",forced_min_on:"{v} would be shorter than the shortest on-time, so it stays off.",forced_min_off:"{v} would leave a pause shorter than the shortest off-time, so it stays on.",capped:"Capped at {v} (max_on_percent).",tried_target:"Trying another target.",reset:"Back to the current one",vt_now:"VT now: {v}",vt_off:"thermostat is off",vt_safety:"safety mode share",window_title:"Replay",window_no_threshold:"Set a detection threshold to see when it would have triggered. The curve shows how fast the room cooled (\xB0/h).",window_detected:"would have detected an open window {range}.",window_never:"no open window detected {range}.",steepest:"Steepest drop: {v} ({at}).",ended_by_max:"Some ended by the maximum duration.",open_line:"open",close_line:"closed",window_caveat:"Only counts while heating; VT ignores drops when it is not heating.",vt_slope:"VT now: {v}",safety_title:"Replay",room_sensor:"Room sensor",outside_sensor:"Outside sensor",longest:"longest {v}",safety_would:"silences longer than {delay} {range}.",safety_never:"silences longer than {delay} {range}.",safety_caveat:"Safety mode only starts if the thermostat was heating at least {v} at that moment.",safety_over_climate:"Over a climate device, VT never switches to safety mode: the device keeps regulating on its own. These settings have no effect here.",sum_capped:"{a} + {b} = {sum}, capped at 100 %.",ago_24h:"24 h ago",ago_7d:"7 days ago"}};var Mt={cards:{room:{title:"Pi\xE8ce",subtitle:"Le nom du thermostat et ce qu'il mesure."},devices:{title:"\xC9quipements",subtitle:"Les radiateurs, vannes ou climatiseurs pilot\xE9s."},correction:{title:"Correction de consigne",subtitle:"Le capteur int\xE9gr\xE9 de l'appareil est pr\xE8s de la chaleur : VT monte ou baisse la consigne envoy\xE9e jusqu'\xE0 ce que le capteur de la pi\xE8ce atteigne votre temp\xE9rature."},heating:{title:"R\xE9gulation",subtitle:"Combien et \xE0 quelle fr\xE9quence chauffer."},presets:{title:"Presets",subtitle:"La temp\xE9rature de chaque preset."},window:{title:"Fen\xEAtre ouverte",subtitle:"Ce qui se passe quand une fen\xEAtre s'ouvre."},motion:{title:"Pr\xE9sence dans la pi\xE8ce",subtitle:"En preset Activit\xE9, la pi\xE8ce prend la temp\xE9rature d'un preset quand quelqu'un est l\xE0 et celle d'un autre quand elle est vide. Le preset reste Activit\xE9 ; les autres presets ignorent le capteur."},presence:{title:"Absence du domicile",subtitle:"Baisser la temp\xE9rature quand personne n'est l\xE0, avec une entit\xE9 person ou un capteur de pr\xE9sence."},power:{title:"Puissance et \xE9nergie",subtitle:"Consommation de l'\xE9quipement et d\xE9lestage."},boiler:{title:"Chaudi\xE8re centrale",subtitle:"Allumer la chaudi\xE8re quand un thermostat demande de la chaleur."},safety:{title:"Capteur perdu et changements manuels",subtitle:"Que faire quand le thermom\xE8tre se tait, et combien de temps dure un changement manuel."},auto_start_stop:{title:"Arr\xEAt/d\xE9marrage auto",subtitle:"\xC9teindre le climatiseur quand il n'est pas utile."},lock:{title:"Verrouillage",subtitle:"Emp\xEAcher les personnes ou automatisations de modifier ce thermostat."},other:{title:"Autres",subtitle:"R\xE9glages que cette page ne place pas encore."}},groups:{range:"Capteur ext\xE9rieur et plage de temp\xE9rature",valve:"Contr\xF4le direct de la vanne",valve_limits:"Commandes de la vanne",sync:"Synchroniser la temp\xE9rature interne de l'appareil",tpi:"Coefficients TPI",auto_tpi:"Apprentissage Auto-TPI",window_behaviour:"Ce qui se passe",motion_detect:"Capteur",motion_behaviour:"Ce qui se passe",shedding:"D\xE9lestage",failure:"D\xE9tection de panne de chauffe"},fields:{name:{label:"Nom",info:"Nom du thermostat et de son entit\xE9 climate."},temperature_sensor_entity_id:{label:"Capteur de temp\xE9rature de la pi\xE8ce",hint:"L\xE0 o\xF9 l'on vit, loin des fen\xEAtres et du radiateur.",info:"La temp\xE9rature que VT r\xE9gule. Placez-le au milieu de la pi\xE8ce : pr\xE8s d'une fen\xEAtre il r\xE9agit aux courants d'air, pr\xE8s du radiateur il lit trop chaud et la pi\xE8ce reste froide."},humidity_sensor_entity_id:{label:"Capteur d'humidit\xE9",hint:"Facultatif. Affich\xE9 sur le thermostat, sans effet sur le chauffage.",info:"Expose l'humidit\xE9 sur le thermostat ; la r\xE9gulation n'en tient pas compte. Si l'appareil du capteur de temp\xE9rature mesure aussi l'humidit\xE9, le panneau propose ce capteur."},last_seen_temperature_sensor_entity_id:{label:"Dernier contact du capteur",hint:"Facultatif. \xC9vite les fausses alertes des capteurs qui n'envoient que les changements.",info:"Une entit\xE9 date/heure indiquant le dernier contact du capteur de temp\xE9rature (\xAB last_seen \xBB sur beaucoup de capteurs Zigbee). Un capteur sur pile reste muet tant que la temp\xE9rature ne bouge pas ; sans cette entit\xE9, VT peut croire qu'il est en panne et passer en mode capteur perdu.",diagram:"safety"},external_temperature_sensor_entity_id:{label:"Capteur de temp\xE9rature ext\xE9rieure",hint:"Pour chauffer plus quand il fait froid dehors.",info:"Alimente la partie ext\xE9rieure du calcul (coef_ext). S'il ne r\xE9pond plus, le mode capteur perdu peut aussi se d\xE9clencher, sauf si c'est d\xE9sactiv\xE9 dans configuration.yaml."},temp_min:{label:"Temp\xE9rature minimale r\xE9glable",info:"Le thermostat refuse une consigne plus basse. 7 \xB0C par d\xE9faut."},temp_max:{label:"Temp\xE9rature maximale r\xE9glable",info:"Le thermostat refuse une consigne plus haute. 35 \xB0C par d\xE9faut."},step_temperature:{label:"Pas de r\xE9glage",info:"Ce que change un appui sur +/\u2212. 0,1 \xB0C par d\xE9faut."},underlying_entity_ids:{label:"\xC9quipements pilot\xE9s",info:`**over_switch** : entit\xE9s switch, input_boolean, select ou climate.
**over_valve** : entit\xE9s number qui r\xE8glent l'ouverture de la vanne.
**over_climate** : entit\xE9s climate.`},ac_mode:{label:"Climatisation",hint:"L'appareil peut refroidir.",info:"over_switch / over_valve : seul le froid est propos\xE9. over_climate : chaud et froid si l'appareil les g\xE8re. Ajoute les presets de climatisation."},inverse_switch_command:{label:"Commande invers\xE9e",hint:"Pour les modules fil pilote avec diode.",info:"Allum\xE9 signifie radiateur \xE9teint et inversement. N\xE9cessaire pour certains montages fil pilote avec diode."},heater_keep_alive:{label:"Intervalle de maintien (s)",hint:"Renvoie l'\xE9tat r\xE9guli\xE8rement. Vide : d\xE9sactiv\xE9.",info:"Certains appareils s'\xE9teignent seuls s'ils ne re\xE7oivent rien. VT r\xE9p\xE8te alors la commande marche/arr\xEAt \xE0 cet intervalle."},on_command_text:{label:"Commandes marche/arr\xEAt personnalis\xE9es",hint:"N\xE9cessaires si un \xE9quipement n'est pas un simple switch.",info:"Format commande[/attribut[:valeur]], une par \xE9quipement, dans le m\xEAme ordre. Exemples : select_option/option:comfort, set_hvac_mode/hvac_mode:heat. Les switch utilisent turn_on / turn_off."},used_by_controls_central_boiler:{label:"Chauff\xE9e par la chaudi\xE8re centrale",hint:"Allume la chaudi\xE8re quand cette pi\xE8ce demande de la chaleur.",info:"Compte les \xE9quipements de ce thermostat pour la chaudi\xE8re centrale (r\xE9gl\xE9e dans la configuration centrale). Les pi\xE8ces chauff\xE9es \xE0 l'\xE9lectricit\xE9 restent en g\xE9n\xE9ral d\xE9sactiv\xE9es."},auto_fan_mode:{label:"Ventilation renforc\xE9e loin de la consigne",info:"Fait tourner le ventilateur \xE0 ce niveau tant que la pi\xE8ce est loin de la consigne, pour r\xE9partir la chaleur plus vite."},auto_regulation_dtemp:{label:"Plus petit changement envoy\xE9 (\xB0)",hint:"Les changements plus petits ne sont pas envoy\xE9s.",info:"Limite les commandes (bruit, piles). Avec une vanne Sonoff TRVZB, gardez au moins 3 %, sinon elle peut perdre son calibrage.",diagram:"send_threshold"},auto_regulation_periode_min:{label:"D\xE9lai minimum entre deux envois (min)",info:"Une nouvelle valeur est envoy\xE9e au plus \xE0 cette fr\xE9quence.",diagram:"send_threshold"},opening_threshold_degree:{label:"Consid\xE9r\xE9e ferm\xE9e en dessous de (%)",hint:"Une ouverture demand\xE9e plus petite ferme la vanne.",info:"En dessous, la demande compte comme \xAB pas de chauffe \xBB : la vanne va \xE0 sa position la plus ferm\xE9e et la pi\xE8ce ne compte pas comme chauffante (y compris pour la chaudi\xE8re).",diagram:"valve_curve"},min_opening_degrees:{label:"Ouverture minimale en chauffe (%)",hint:"Une valeur par vanne, s\xE9par\xE9es par des virgules.",info:"D\xE8s qu'il faut chauffer, la vanne s'ouvre au moins \xE0 ce niveau. Utile pour les vannes avec une zone morte. Exemple : 15 ou \xAB 15, 20 \xBB.",diagram:"valve_curve"},max_opening_degrees:{label:"Ouverture maximale (%)",hint:"Une valeur par vanne, s\xE9par\xE9es par des virgules.",info:"La vanne ne s'ouvre jamais plus. Limite le d\xE9bit, par exemple pour \xE9quilibrer les radiateurs. Doit d\xE9passer l'ouverture minimale.",diagram:"valve_curve"},max_closing_degree:{label:"Fermeture maximale (%)",hint:"100 = enti\xE8rement ferm\xE9e.",info:"En dessous de 100, un peu d'eau circule toujours, par exemple 90 garde 10 % d'ouverture (plus silencieux, prot\xE8ge le circulateur).",diagram:"valve_curve"},auto_regulation_mode:{label:"Force de la correction",hint:"Commencez par L\xE9g\xE8re, augmentez seulement si la consigne n'est pas atteinte.",info:"L'appareil r\xE9gule sur son propre capteur, souvent pr\xE8s de la source de chaleur. VT d\xE9cale la consigne envoy\xE9e pour que le capteur de la pi\xE8ce atteigne votre temp\xE9rature. L\xE9g\xE8re : jusqu'\xE0 1,5 \xB0, Moyenne : 2 \xB0, Forte : 3 \xB0. Expert utilise configuration.yaml. \xAB Contr\xF4le direct de la vanne \xBB r\xE8gle l'ouverture lui-m\xEAme. Plus de correction = plus d'\xE9nergie et d'usure.",diagram:"correction"},auto_regulation_use_device_temp:{label:"Compenser le capteur de l'appareil",hint:"Rarement utile. Essayez d'abord la correction.",info:"Ajoute (temp\xE9rature de l'appareil \u2212 temp\xE9rature de la pi\xE8ce) \xE0 la consigne. Exemple : pi\xE8ce 18 \xB0, appareil 22 \xB0 : VT envoie 4 \xB0 de plus pour que l'appareil chauffe vraiment."},opening_degree_entity_ids:{label:"Entit\xE9s d'ouverture de vanne",hint:"Une par \xE9quipement, dans le m\xEAme ordre.",info:"Les entit\xE9s number qui r\xE8glent l'ouverture de chaque vanne."},closing_degree_entity_ids:{label:"Entit\xE9s de fermeture de vanne",hint:"Facultatif. Toutes ou aucune.",info:"Si la vanne a aussi une entit\xE9 de fermeture, VT la r\xE8gle \xE0 100 \u2212 ouverture."},sync_entity_ids:{label:"Entit\xE9s \xE0 synchroniser",hint:"Une par \xE9quipement, dans le m\xEAme ordre.",info:"L'entit\xE9 de calibrage de l'appareil (mode d\xE9calage) ou son entr\xE9e de temp\xE9rature externe (mode direct). Certains appareils demandent un r\xE9glage en plus, par ex. Sonoff TRVZB : sensor_select = external."},sync_with_calibration:{label:"Utiliser le d\xE9calage de calibrage",hint:"Oui : ajuste le d\xE9calage de l'appareil. Non : envoie la temp\xE9rature de la pi\xE8ce.",info:"Le mode d\xE9calage marche avec la plupart des vannes (local_temperature_calibration). Le mode direct demande un appareil qui accepte une temp\xE9rature externe."},proportional_function:{label:"Algorithme",hint:"TPI est int\xE9gr\xE9. Les autres algorithmes sont des plugins \xE0 part.",info:"Seul TPI est fourni avec Versatile Thermostat. Les autres algorithmes, comme **SmartPI** (apprend la pi\xE8ce ; recommand\xE9 par l'auteur de VT), sont des plugins \xE0 installer d'abord (versatile-thermostat.org/fr/plugins). Une fois install\xE9s, ils apparaissent dans cette liste."},cycle_min:{label:"Dur\xE9e du cycle (min)",hint:"5 minutes conviennent \xE0 la plupart des pi\xE8ces ; plus pour un chauffage lent.",info:"\xC0 chaque cycle, VT calcule la chaleur n\xE9cessaire et, pour un interrupteur, garde le radiateur allum\xE9 pendant cette part du cycle. Des cycles courts r\xE9agissent plus vite mais commutent plus souvent ; un chauffage lent (plancher, accumulation) veut des cycles plus longs. Trop court, le radiateur ne chauffe jamais vraiment.",diagram:"tpi_cycle"},tpi_coef_int:{label:"Facteur \xE9cart pi\xE8ce (coef_int)",hint:"Plus haut : rattrape plus vite. Baissez s'il d\xE9passe.",info:"Part de chauffe = coef_int \xD7 (consigne \u2212 pi\xE8ce) + coef_ext \xD7 (consigne \u2212 ext\xE9rieur). Consigne atteinte trop lentement : augmentez. Oscillations : baissez. 0,6 par d\xE9faut.",diagram:"tpi_formula"},tpi_coef_ext:{label:"Facteur ext\xE9rieur (coef_ext)",hint:"Augmentez si la pi\xE8ce se stabilise sous la consigne.",info:"Compense les pertes vers l'ext\xE9rieur. Stabilis\xE9e en dessous : augmentez. Au-dessus : baissez. 0,01 par d\xE9faut.",diagram:"tpi_formula"},minimal_activation_delay:{label:"Dur\xE9e de marche minimale (s)",hint:"Les impulsions plus courtes sont ignor\xE9es.",info:"\xC9vite des impulsions trop courtes pour \xEAtre utiles. 10 s par d\xE9faut.",diagram:"min_on_off"},minimal_deactivation_delay:{label:"Dur\xE9e d'arr\xEAt minimale (s)",hint:"Les pauses plus courtes sont ignor\xE9es (reste allum\xE9).",info:"\xC9vite de couper quelques secondes seulement. 0 par d\xE9faut.",diagram:"min_on_off"},tpi_threshold_high:{label:"Arr\xEAt au-dessus de consigne + (\xB0)",hint:"0 = d\xE9sactiv\xE9. Il faut aussi la valeur de reprise.",info:"Si la pi\xE8ce d\xE9passe la consigne de cette valeur, la chauffe s'arr\xEAte compl\xE8tement jusqu'\xE0 redescendre sous consigne + reprise. Les deux valeurs sont n\xE9cessaires.",diagram:"tpi_thresholds"},tpi_threshold_low:{label:"Reprise sous consigne + (\xB0)",hint:"Doit \xEAtre plus petite que la valeur d'arr\xEAt.",info:"Voir \xAB Arr\xEAt au-dessus de consigne \xBB.",diagram:"tpi_thresholds"},auto_tpi_learning_type:{label:"Type d'apprentissage",hint:"D\xE9couverte pour une nouvelle installation, Affinage pour peaufiner.",info:"Une session dure environ 48 h et se lance \xE0 la main (service ou carte Auto-TPI). D\xE9couverte : rapide, depuis z\xE9ro. Affinage : lent, petites corrections."},auto_tpi_heating_rate:{label:"Vitesse de chauffe (\xB0/h)",hint:"0 = mesur\xE9e automatiquement.",info:"La vitesse \xE0 laquelle le radiateur chauffe la pi\xE8ce \xE0 pleine puissance."},heater_heating_time:{label:"Temps de mont\xE9e (min)",hint:"Temps pour atteindre la pleine puissance, ex. 5 pour un radiateur \xE9lectrique."},heater_cooling_time:{label:"Temps de refroidissement (min)",hint:"Temps pour refroidir apr\xE8s l'arr\xEAt, ex. 7 pour un radiateur \xE9lectrique."},auto_tpi_aggressiveness:{label:"Agressivit\xE9",hint:"Baissez (ex. 0,8) en cas de d\xE9passements r\xE9p\xE9t\xE9s.",info:"R\xE9duit les coefficients appris. 1,0 = tels qu'appris."},auto_tpi_continuous_kext:{label:"Apprentissage continu du facteur ext\xE9rieur",hint:"Ajustement lent en arri\xE8re-plan entre les sessions."},auto_tpi_enable_advanced_settings:{label:"Afficher les param\xE8tres d'apprentissage"},auto_tpi_avg_initial_weight:{label:"Poids des anciennes valeurs",hint:"1 = remplace vite, 50 = change lentement."},auto_tpi_ema_alpha:{label:"Alpha",hint:"Plus haut : r\xE9agit plus vite aux derniers cycles."},auto_tpi_ema_decay_rate:{label:"Taux de d\xE9croissance",hint:"Ralentit l'apprentissage avec le temps."},auto_tpi_continuous_kext_alpha:{label:"Vitesse de l'apprentissage continu",hint:"0,04 par d\xE9faut \u2248 quelques jours pour s'adapter."},use_presets_central_config:{label:"Utiliser les temp\xE9ratures de la configuration centrale",hint:"Non : cette pi\xE8ce a ses propres temp\xE9ratures \xC9co/Confort/Boost.",info:"Les temp\xE9ratures des presets sont des entit\xE9s number du thermostat, ou de la configuration centrale quand ceci est activ\xE9."},use_central_mode:{label:"Suivre le mode central",hint:"Un seul r\xE9glage peut arr\xEAter toutes les pi\xE8ces ou les mettre hors-gel.",info:"La configuration centrale a un select (Auto, Arr\xEAt, Chauffage seul, Froid seul, Hors-gel) qui pilote chaque thermostat o\xF9 ceci est activ\xE9."},window_sensor_entity_id:{label:"Capteur d'ouverture",hint:"Un binary_sensor ou un groupe.",info:"Pour plusieurs fen\xEAtres, cr\xE9ez un groupe de binary_sensor."},window_delay:{label:"Attente avant de r\xE9agir (s)",hint:"Une a\xE9ration courte n'arr\xEAte pas le chauffage.",info:"La fen\xEAtre doit rester ouverte ce temps avant l'action.",diagram:"window_delay"},window_off_delay:{label:"Attente apr\xE8s fermeture (s)",hint:"Vide : m\xEAme valeur que ci-dessus.",info:"La fen\xEAtre doit rester ferm\xE9e ce temps avant la reprise.",diagram:"window_delay"},window_auto_open_threshold:{label:"D\xE9tecter une baisse plus rapide que (\xB0/h)",hint:"Plus bas d\xE9tecte plus t\xF4t, avec plus de fausses alertes. Essayez 3.",info:"VT surveille la pente de la temp\xE9rature. Une chute brutale au-del\xE0 de ce rythme compte comme une fen\xEAtre ouverte. Pas pour les couloirs ou les pi\xE8ces aux variations normales fortes.",diagram:"window_slope"},window_auto_close_threshold:{label:"Consid\xE9r\xE9e ferm\xE9e au-dessus de (\xB0/h)",hint:"En g\xE9n\xE9ral 0 : la temp\xE9rature ne baisse plus.",diagram:"window_slope"},window_auto_max_duration:{label:"Abandonner apr\xE8s (min)",hint:"Le chauffage reprend m\xEAme si \xE7a refroidit encore. Essayez 30 \xE0 60.",diagram:"window_slope"},window_action:{label:"Fen\xEAtre ouverte",hint:"Arr\xEAt, ventilation seule, hors-gel ou \xE9co.",info:"Hors-gel et \xC9co changent la consigne sans changer le preset : le preset affich\xE9 peut diff\xE9rer de la consigne."},motion_sensor_entity_id:{label:"Capteur de pr\xE9sence de la pi\xE8ce",hint:"Un capteur de mouvement ou de pr\xE9sence (mmWave) dans cette pi\xE8ce.",info:`VT appelle cette fonction \xAB mouvement \xBB, mais elle demande seulement si quelqu'un est dans la pi\xE8ce : on = occup\xE9e, off = vide. Un capteur de pr\xE9sence convient le mieux ; un capteur de mouvement fonctionne aussi.

Elle n'agit qu'en preset **Activit\xE9**, qui appara\xEEt une fois cette carte configur\xE9e. Le preset reste Activit\xE9 ; seule la consigne change : la temp\xE9rature du preset \xAB occup\xE9e \xBB tant que quelqu'un est l\xE0, celle du preset \xAB vide \xBB quand la pi\xE8ce est vide depuis un moment. En \xC9co, Confort, Boost ou en temp\xE9rature manuelle, le capteur est ignor\xE9 : un preset choisi explicitement l'emporte toujours.`},motion_preset:{label:"Temp\xE9rature pi\xE8ce occup\xE9e",diagram:"motion",hint:"La temp\xE9rature de ce preset est utilis\xE9e ; le preset s\xE9lectionn\xE9 reste Activit\xE9."},no_motion_preset:{label:"Temp\xE9rature pi\xE8ce vide",diagram:"motion",hint:"La temp\xE9rature de ce preset est utilis\xE9e tant que la pi\xE8ce est vide."},motion_delay:{label:"Occup\xE9e apr\xE8s (s)",hint:"Un simple passage ne compte pas.",diagram:"motion"},motion_off_delay:{label:"Vide apr\xE8s (s)",diagram:"motion"},presence_sensor_entity_id:{label:"Capteur de pr\xE9sence au domicile",hint:"on/home = quelqu'un, off/not_home = absent.",info:"Une entit\xE9 person ou un binary_sensor (un groupe de binary_sensor fonctionne). Un groupe de personnes ne fonctionne pas : la documentation de VT recommande un template. En absence, les temp\xE9ratures \xAB absent \xBB des presets s'appliquent."},device_power:{label:"Puissance de l'\xE9quipement",hint:"Total de tous les \xE9quipements ; m\xEAme unit\xE9 partout.",info:"Utilis\xE9e pour les capteurs d'\xE9nergie, le d\xE9lestage et la chaudi\xE8re centrale."},power_unit:{label:"Unit\xE9"},power_sensor_entity_id:{label:"Capteur de consommation du logement",hint:"Puissance totale consomm\xE9e en ce moment."},max_power_sensor_entity_id:{label:"Capteur de puissance maximale autoris\xE9e",hint:"Gardez une marge sous votre abonnement.",info:"Ce n'est pas une s\xE9curit\xE9 : un d\xE9passement reste possible entre deux mesures."},power_temp:{label:"Temp\xE9rature pendant le d\xE9lestage"},safety_delay_min:{label:"Capteur muet depuis (min)",hint:"Puis puissance fixe de s\xE9curit\xE9. Capteurs sur pile : 120 \xE0 240.",info:"Sans temp\xE9rature pendant ce temps, VT ne fait plus confiance au capteur. Renseignez \xAB dernier contact \xBB dans Pi\xE8ce pour \xE9viter les fausses alertes.",diagram:"safety"},safety_default_on_percent:{label:"Puissance fixe en capteur perdu",hint:"0,1 = 10 %. 0 risque le gel.",diagram:"safety"},safety_min_on_percent:{label:"Seulement si la chauffe d\xE9passe",hint:"0,5 = 50 %. En dessous, la perte du capteur est ignor\xE9e.",info:"Un radiateur qui chauffe peu ne peut pas surchauffer la pi\xE8ce : inutile de r\xE9agir.",diagram:"safety"},manual_override_duration_min:{label:"Retour au preset apr\xE8s un changement manuel (min)",hint:"0 = garder la temp\xE9rature manuelle.",diagram:"override"},repair_incorrect_state:{label:"Renvoyer les commandes ignor\xE9es",hint:"Pour les relais ou vannes qui ratent parfois une commande.",info:"5 essais de suite au maximum ; des r\xE9parations fr\xE9quentes signalent un probl\xE8me mat\xE9riel ou r\xE9seau."},heating_failure_threshold:{label:"Chauffe forte = au moins",hint:"0,9 = 90 %.",diagram:"failure"},cooling_failure_threshold:{label:"Chauffe coup\xE9e = au plus",hint:"0 = 0 %.",diagram:"failure"},heating_failure_detection_delay:{label:"Alerter apr\xE8s (min)",hint:"Augmentez pour un plancher chauffant ou une grande pi\xE8ce.",diagram:"failure"},temperature_change_tolerance:{label:"Ignorer les variations sous (\xB0)",hint:"Filtre le bruit du capteur.",diagram:"failure"},failure_detection_enable_template:{label:"D\xE9tecter seulement si (template)",hint:"Facultatif."},auto_start_stop_level:{label:"Vitesse de r\xE9action",hint:"Rapide arr\xEAte et red\xE9marre plus souvent.",info:"Tr\xE8s lent \u2248 60 min entre arr\xEAt et red\xE9marrage, lent \u2248 30, moyen \u2248 15, rapide \u2248 7. Ne red\xE9marre que les appareils qu'il a arr\xEAt\xE9s lui-m\xEAme."},lock_users:{label:"Bloquer les changements depuis l'interface",info:"Fen\xEAtres, s\xE9curit\xE9 et d\xE9lestage continuent de fonctionner."},lock_automations:{label:"Bloquer les automatisations et programmateurs"},lock_code:{label:"Code PIN",hint:"4 chiffres. Facultatif."},auto_relock_sec:{label:"Reverrouiller apr\xE8s (s)",hint:"0 = reste d\xE9verrouill\xE9."},"auto_regulation_dtemp@thermostat_over_valve":{label:"Plus petit changement d'ouverture envoy\xE9 (%)",hint:"Les changements plus petits ne sont pas envoy\xE9s \xE0 la vanne.",info:"Limite les mouvements de la vanne (bruit, piles).",diagram:"send_threshold"},"auto_regulation_periode_min@thermostat_over_valve":{label:"D\xE9lai minimum entre deux ouvertures (min)",info:"La vanne re\xE7oit une nouvelle ouverture au plus \xE0 cette fr\xE9quence.",diagram:"send_threshold"},"underlying_entity_ids@thermostat_over_switch":{label:"\xC9quipements pilot\xE9s",hint:"Plusieurs interrupteurs d\xE9marrent en d\xE9cal\xE9 pour lisser la puissance.",info:`**over_switch** : entit\xE9s switch, input_boolean, select ou climate.
**over_valve** : entit\xE9s number qui r\xE8glent l'ouverture de la vanne.
**over_climate** : entit\xE9s climate.

Avec plusieurs interrupteurs, chacun garde tout son temps de chauffe ; VT d\xE9cale seulement leurs d\xE9parts pour qu'ils soient moins souvent allum\xE9s ensemble. \xC0 forte demande, ils se chevauchent.`,diagram:"stagger"}},diagrams:{tpi_cycle:{title:"Cycle de chauffe",caption:"\xC0 chaque cycle, le radiateur chauffe pendant la part demand\xE9e."},tpi_formula:{title:"Combien chauffer",caption:"\xC9cart pi\xE8ce \xD7 coef_int + \xE9cart ext\xE9rieur \xD7 coef_ext."},tpi_thresholds:{title:"Bande d'arr\xEAt et de reprise",caption:"Arr\xEAt au-dessus de consigne + arr\xEAt, reprise sous consigne + reprise."},valve_curve:{title:"Ouverture demand\xE9e et envoy\xE9e",caption:"Ferm\xE9e sous le seuil, puis au moins l'ouverture minimale, au plus la maximale."},send_threshold:{title:"Seuls les vrais changements sont envoy\xE9s",caption:"La valeur envoy\xE9e ne bouge que si l'\xE9cart d\xE9passe le seuil."},window_delay:{title:"Chronologie fen\xEAtre",caption:"Une ouverture courte ne fait rien ; une longue d\xE9clenche l'action apr\xE8s l'attente."},window_slope:{title:"D\xE9tection par chute de temp\xE9rature",caption:"Une chute brutale marque \xAB ouverte \xBB jusqu'\xE0 ce que la pente remonte."},motion:{title:"Chronologie de pr\xE9sence",caption:"Un passage ne fait rien ; rester applique la temp\xE9rature \xAB occup\xE9e \xBB ; partir r\xE9tablit la temp\xE9rature \xAB vide \xBB apr\xE8s le d\xE9lai. Le preset reste Activit\xE9."},safety:{title:"Capteur perdu",caption:"Silence plus long que le d\xE9lai : puissance fixe jusqu'au retour d'une mesure."},override:{title:"Changement manuel",caption:"Retour \xE0 la consigne du preset apr\xE8s la dur\xE9e."},failure:{title:"Panne de chauffe",caption:"Chauffe forte plus longtemps que le d\xE9lai sans hausse de temp\xE9rature : alerte."},correction:{title:"Correction de consigne",caption:"La consigne envoy\xE9e monte tant que la pi\xE8ce est sous la consigne."},stagger:{title:"Plusieurs radiateurs dans une pi\xE8ce",caption:"M\xEAme part de cycle pour chacun, d\xE9parts d\xE9cal\xE9s."},min_on_off:{title:"Dur\xE9es de marche et d'arr\xEAt minimales",caption:"Les impulsions trop courtes sont ignor\xE9es ; les pauses trop courtes aussi (reste allum\xE9)."}},types:{thermostat_over_switch:{title:"Allumer et \xE9teindre un radiateur",body:"Versatile Thermostat allume l'appareil une partie de chaque cycle, plus longtemps quand la pi\xE8ce est froide.",examples:"Radiateurs \xE9lectriques, c\xE2bles chauffants, relais, prises connect\xE9es, modules fil pilote."},thermostat_over_valve:{title:"R\xE9gler l'ouverture d'une vanne",body:"Versatile Thermostat envoie un pourcentage d'ouverture \xE0 la vanne et l'ajuste pendant que la pi\xE8ce chauffe.",examples:"Vannes de radiateur qui exposent leur ouverture en number (certaines vannes Zigbee)."},thermostat_over_climate:{title:"Piloter un appareil qui a son propre thermostat",body:"L'appareil r\xE9gule lui-m\xEAme ; Versatile Thermostat r\xE8gle sa consigne et la corrige avec votre capteur de pi\xE8ce.",examples:"T\xEAtes thermostatiques, climatiseurs, pompes \xE0 chaleur."},thermostat_central_config:{title:"Configuration centrale",body:"R\xE9glages partag\xE9s (capteur ext\xE9rieur, presets, fen\xEAtres, s\xE9curit\xE9) que chaque VTherm peut reprendre.",examples:"\xC0 cr\xE9er en premier si vous avez plusieurs pi\xE8ces."}},window:{question:"Comment cette pi\xE8ce rep\xE8re-t-elle une fen\xEAtre ouverte ?",off:"Pas de d\xE9tection",sensor:"Capteur d'ouverture",drop:"Chute de temp\xE9rature"},presets:{preset:"Preset",normal:"Normal",away:"Absent",cool:"Climatisation",cool_away:"Climatisation, absent",frost:"Hors-gel",eco:"\xC9co",comfort:"Confort",boost:"Boost",from_central:"Ces temp\xE9ratures viennent de la configuration centrale et s'appliquent \xE0 tous les thermostats qui l'utilisent.",saved_now:"Les changements ici s'appliquent imm\xE9diatement.",pending:"Enregistrez d'abord : le thermostat cr\xE9e ses propres temp\xE9ratures quand il n'utilise plus celles de la configuration centrale."},ui:{panel_title:"Versatile Thermostat",save:"Enregistrer",create:"Cr\xE9er",unsaved:"Modifications non enregistr\xE9es",required_empty:"{n} obligatoire(s) vide(s)",saved:"Enregistr\xE9. Le thermostat a \xE9t\xE9 recharg\xE9.",not_saved_incomplete:"Non enregistr\xE9 : des r\xE9glages obligatoires sont encore vides. Ils sont signal\xE9s dans l'index.",not_saved_rejected:"Non enregistr\xE9 : Versatile Thermostat a refus\xE9 un r\xE9glage. Il est signal\xE9 ci-dessous.",advanced:"R\xE9glages avanc\xE9s",from_central:"Depuis la configuration centrale",central_nothing:"Rien n'y est r\xE9gl\xE9 : les valeurs par d\xE9faut de Versatile Thermostat s'appliquent.",edit_central:"Modifier la configuration centrale",override:"Remplacer la configuration centrale",state_off:"D\xE9sactiv\xE9",state_error:"Erreur",state_empty:"{n} vide(s)",state_central:"Centrale",turn_on:"Activer",turn_off:"D\xE9sactiver",new:"Nouveau",new_vtherm:"Nouveau VTherm",choose_type:"Choisir un type",shared_defaults:"R\xE9glages partag\xE9s",no_climate:"Pas d'entit\xE9 climate",not_loaded:"Non charg\xE9",thermostats:"Thermostats",chooser_question:"Que pilote ce thermostat ?",chooser_no_central:"Pas encore de configuration centrale. Avec plusieurs pi\xE8ces, cr\xE9ez-la d'abord : chaque thermostat pourra reprendre ses r\xE9glages.",empty:"Aucun Versatile Thermostat pour l'instant. Utilisez \xAB Nouveau \xBB ci-dessus pour cr\xE9er le premier.",discard:"Abandonner les modifications non enregistr\xE9es de ce thermostat ?",sections:"Sections",more_info:"Plus d'informations"},live:{estimate:"estimation",loading:"Chargement de l'historique\u2026",no_sensor:"Choisissez un capteur de temp\xE9rature pour voir ceci.",no_temperature:"Pas encore de temp\xE9rature de la pi\xE8ce.",too_little_history:"Pas assez de temp\xE9ratures enregistr\xE9es sur cette p\xE9riode.",range_24h:"sur les derni\xE8res 24 h",range_7d:"sur les 7 derniers jours",now:"maintenant",tpi_title:"En ce moment",room:"Pi\xE8ce",target:"Consigne",outside:"Ext\xE9rieur",of_each_cycle:"chauffe : {on} par cycle de {cycle}",room_part:"\xE9cart pi\xE8ce {v}",outside_part:"ext\xE9rieur {v}",stopped_threshold:"Arr\xEAt\xE9 : la pi\xE8ce d\xE9passe la consigne de plus que le seuil d'arr\xEAt/reprise.",forced_min_on:"{v} serait plus court que la dur\xE9e minimale d'activation : reste \xE9teint.",forced_min_off:"{v} laisserait une pause plus courte que la dur\xE9e minimale de d\xE9sactivation : reste allum\xE9.",capped:"Plafonn\xE9 \xE0 {v} (max_on_percent).",tried_target:"Essai d'une autre consigne.",reset:"Revenir \xE0 l'actuelle",vt_now:"VT actuellement : {v}",vt_off:"thermostat \xE9teint",vt_safety:"part du mode s\xE9curit\xE9",window_title:"Rejeu",window_no_threshold:"R\xE9glez un seuil de d\xE9tection pour voir quand il se serait d\xE9clench\xE9. La courbe montre la vitesse de refroidissement (\xB0/h).",window_detected:"fen\xEAtre ouverte d\xE9tect\xE9e {range}.",window_never:"aucune fen\xEAtre ouverte d\xE9tect\xE9e {range}.",steepest:"Baisse la plus forte : {v} ({at}).",ended_by_max:"Certaines termin\xE9es par la dur\xE9e maximale.",open_line:"ouverte",close_line:"ferm\xE9e",window_caveat:"Ne compte que pendant la chauffe ; VT ignore les baisses quand il ne chauffe pas.",vt_slope:"VT actuellement : {v}",safety_title:"Rejeu",room_sensor:"Capteur de la pi\xE8ce",outside_sensor:"Capteur ext\xE9rieur",longest:"le plus long {v}",safety_would:"silences de plus de {delay} {range}.",safety_never:"silences de plus de {delay} {range}.",safety_caveat:"Le mode s\xE9curit\xE9 ne d\xE9marre que si le thermostat chauffait au moins \xE0 {v} \xE0 ce moment.",safety_over_climate:"Sur un \xE9quipement climate, VT ne passe jamais en mode s\xE9curit\xE9 : l'\xE9quipement continue de r\xE9guler seul. Ces r\xE9glages n'ont pas d'effet ici.",sum_capped:"{a} + {b} = {sum}, plafonn\xE9 \xE0 100 %.",ago_24h:"il y a 24 h",ago_7d:"il y a 7 jours"}};var Lt={en:M,fr:Mt},F=M,Ke="en";function zt(s){Ke=(s??"en").split("-")[0],F=Lt[Ke]??M}var Er=()=>Ke in Lt,Ht=(s,t)=>t?s.replace(/\{(\w+)\}/g,(e,r)=>String(t[r]??`{${r}}`)):s,b=(s,t)=>Ht(F.ui[s]??M.ui[s],t),Ze=s=>F.cards[s]??M.cards[s]??M.cards.other,Nt=s=>F.groups[s]??M.groups[s],Dt=s=>F.types[s]??M.types[s],Pe=s=>F.window[s]??M.window[s],G=s=>F.presets[s]??M.presets[s],g=(s,t)=>Ht(F.live[s]??M.live[s]??s,t),Ut=s=>F.diagrams[s]??M.diagrams[s];function Xe(s,t){if(!Er())return;let e=F.fields;return t&&e[`${s}@${t}`]||e[s]}var Cr="component.versatile_thermostat";async function Vt(s){await Promise.all([s.loadBackendTranslation("config","versatile_thermostat"),s.loadBackendTranslation("selector","versatile_thermostat")])}function oe(s,t,e){return s.localize(`${Cr}.${t}`,e)||""}var Bt=(s,t,e,r)=>oe(s,`config.step.${t}.data.${e}`,r)||e,Ft=(s,t,e,r)=>oe(s,`config.step.${t}.data_description.${e}`,r),Ye=(s,t)=>oe(s,`config.error.${t}`)||oe(s,`options.error.${t}`)||t,_e=(s,t)=>oe(s,`selector.thermostat_type.options.${t}`)||t,jt=s=>t=>oe(s,`selector.${t}`);var re="thermostat_central_config",Qe="choose",be={thermostat_central_config:"mdi:cog-transfer",thermostat_over_switch:"mdi:toggle-switch-outline",thermostat_over_climate:"mdi:thermostat",thermostat_over_valve:"mdi:pipe-valve"},qr={heating:"var(--state-climate-heat-color, #ff8100)",cooling:"var(--state-climate-cool-color, #2b9af9)",idle:"var(--secondary-text-color)",off:"var(--disabled-text-color, #888)"},K=class extends q{constructor(){super(...arguments);this.entries=[]}select(e){this.dispatchEvent(new CustomEvent("vtherm-open",{detail:e,bubbles:!0,composed:!0}))}render(){return o`
      <div class="row" role="tablist" aria-label=${b("thermostats")}>
        ${this.entries.map(e=>this.tile(e))}
        ${this.newType?o`<div class="tile selected new" role="tab" aria-selected="true">
              <ha-icon icon=${be[this.newType]??"mdi:plus"}></ha-icon>
              <div class="main">
                <div class="name">${b("new_vtherm")}</div>
                <div class="sub">${be[this.newType]?_e(this.hass,this.newType):b("choose_type")}</div>
              </div>
            </div>`:o`<button class="tile add" @click=${()=>this.select({newType:Qe})}>
              <ha-icon icon="mdi:plus"></ha-icon><span>${b("new")}</span>
            </button>`}
      </div>
    `}tile(e){let r=e.thermostat_type===re,i=e.climate_entity_id?this.hass.states[e.climate_entity_id]:void 0,n=i?.attributes.hvac_action??(i?.state==="off"?"off":void 0),a=this.hass.config?.unit_system?.temperature??"\xB0",l=i?.attributes.current_temperature,c=i?.attributes.temperature,p=e.entry_id===this.selected&&!this.newType;return o`<button
      class="tile ${p?"selected":""} ${r?"central":""}"
      role="tab"
      aria-selected=${p}
      style=${n?`--action: ${qr[n]??"var(--secondary-text-color)"}`:""}
      @click=${()=>this.select({entryId:e.entry_id})}
    >
      <ha-icon icon=${be[e.thermostat_type]??"mdi:thermostat"}></ha-icon>
      <div class="main">
        <div class="name">${e.title}</div>
        ${r?o`<div class="sub">${b("shared_defaults")}</div>`:i?o`<div class="temps">
                  <span class="cur">${l??"\u2013"}${a}</span><span class="arrow">→</span><span>${c??"\u2013"}${a}</span>
                </div>
                <div class="sub">
                  <span class="dot"></span>${this.statusText(i)}
                </div>`:o`<div class="sub">${e.loaded?b("no_climate"):b("not_loaded")}</div>`}
      </div>
    </button>`}statusText(e){if(e.state==="off")return this.hass.formatEntityState?.(e)??"off";let r=e.attributes.hvac_action?this.hass.formatEntityAttributeValue?.(e,"hvac_action")??e.attributes.hvac_action:"",i=e.attributes.preset_mode&&e.attributes.preset_mode!=="none"?this.hass.formatEntityAttributeValue?.(e,"preset_mode")??e.attributes.preset_mode:"";return[r,i].filter(Boolean).join(" \xB7 ")||(this.hass.formatEntityState?.(e)??e.state)}};K.styles=R`
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
  `,d([v({attribute:!1})],K.prototype,"hass",2),d([v({attribute:!1})],K.prototype,"entries",2),d([v()],K.prototype,"selected",2),d([v()],K.prototype,"newType",2),K=d([I("vtherm-switcher")],K);var X=class extends q{constructor(){super(...arguments);this.types=[];this.hasCentral=!1}pick(e){this.dispatchEvent(new CustomEvent("vtherm-open",{detail:{newType:e},bubbles:!0,composed:!0}))}render(){let e=this.types.filter(i=>i!==re),r=this.hasCentral?e:[re,...e];return o`
      <h2>${b("chooser_question")}</h2>
      ${this.hasCentral?"":o`<p class="hint">${b("chooser_no_central")}</p>`}
      <div class="grid">
        ${r.map(i=>{let n=Dt(i);return o`<button class="type ${i===re?"central":""}" @click=${()=>this.pick(i)}>
            <ha-icon icon=${be[i]}></ha-icon>
            <span class="title">${n?.title??i}</span>
            <span class="body">${n?.body??""}</span>
            <span class="examples">${n?.examples??""}</span>
          </button>`})}
      </div>
    `}};X.styles=R`
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
  `,d([v({attribute:!1})],X.prototype,"hass",2),d([v({attribute:!1})],X.prototype,"types",2),d([v({type:Boolean})],X.prototype,"hasCentral",2),X=d([I("vtherm-type-chooser")],X);var E=240,P=96,S="var(--primary-color)",_="var(--warning-color)",L="var(--secondary-text-color)",le="var(--divider-color)",m=(s,t,e,r="start",i=L)=>$`<text x=${s} y=${t} fill=${i} font-size="9" text-anchor=${r}>${e}</text>`,xe=(s,t=le,e="")=>$`<line x1="8" x2=${E-8} y1=${s} y2=${s} stroke=${t} stroke-width="1" stroke-dasharray=${e}></line>`,Y=()=>$`<line x1="8" x2=${E-8} y1=${P-14} y2=${P-14} stroke=${L} stroke-width="1"></line>`,Wt={tpi_cycle:()=>$`
    ${Y()}
    ${[0,1,2,3].map(s=>$`<line x1=${8+s*74.6} x2=${8+s*74.6} y1="20" y2=${P-10} stroke=${le}></line>`)}
    <rect x="8" y="40" width="44.8" height="28" fill=${S} rx="2"></rect>
    <rect x="82.6" y="40" width="22.4" height="28" fill=${S} rx="2"></rect>
    <rect x="157.2" y="40" width="59.7" height="28" fill=${S} rx="2"></rect>
    ${m(30,34,"60 %","middle")}${m(94,34,"30 %","middle")}${m(187,34,"80 %","middle")}
    <line x1="8" x2="82.6" y1="14" y2="14" stroke=${_} stroke-width="2"></line>${m(88,17,"cycle length","start",_)}
    ${m(E-8,P-3,"time","end")}
  `,min_on_off:()=>$`
    ${Y()}
    ${[0,1,2,3].map(s=>$`<line x1=${8+s*74.6} x2=${8+s*74.6} y1="24" y2=${P-10} stroke=${le}></line>`)}
    <rect x="8" y="44" width="4" height="26" fill="none" stroke=${_} stroke-dasharray="2 2"></rect>
    ${m(14,18,"pulse too short:","start",_)}${m(14,28,"stays off","start",_)}
    <rect x="82.6" y="44" width="37.3" height="26" fill=${S} rx="2"></rect>${m(101,40,"50 %","middle")}
    <rect x="157.2" y="44" width="68" height="26" fill=${S} rx="2"></rect>
    <rect x="225.2" y="44" width="6.6" height="26" fill=${_}></rect>
    ${m(E-8,18,"pause too short: stays on","end",_)}
    ${m(E-8,P-3,"time","end")}
  `,tpi_formula:()=>$`
    <rect x="8" y="30" width=${E-16} height="22" fill="none" stroke=${le} rx="3"></rect>
    <rect x="8" y="30" width=${(E-16)*.6} height="22" fill=${S} rx="3"></rect>
    <rect x=${8+(E-16)*.6} y="30" width=${(E-16)*.15} height="22" fill=${_}></rect>
    ${m(8,22,"room 1\xB0 below \xD7 coef_int 0.6 = 60 %","start",S)}
    ${m(8,68,"outside 15\xB0 colder \xD7 coef_ext 0.01 = 15 %","start",_)}
    ${m(8,84,"heats 75 % of each cycle (max 100 %)")}
  `,tpi_thresholds:()=>$`
    ${xe(72)}${xe(48,_,"3 3")}${xe(28,_,"3 3")}
    <rect x="96" y="20" width="76" height="60" fill=${_} opacity="0.1"></rect>
    <path d="M8 80 C 50 70, 80 30, 110 24 S 160 30, 180 54 S 220 66, 232 62" fill="none" stroke=${S} stroke-width="2"></path>
    ${m(E-8,69,"target","end")}${m(E-8,45,"+ resume","end",_)}${m(E-8,25,"+ stop","end",_)}
    ${m(134,92,"heating off","middle",_)}
  `,valve_curve:()=>$`
    <line x1="24" x2="24" y1="8" y2=${P-14} stroke=${L}></line>${Y()}
    <line x1="24" x2=${E-8} y1="22" y2="22" stroke=${_} stroke-dasharray="3 3"></line>
    <path d="M24 ${P-14} L 96 ${P-14} L 96 60 L 196 22 L ${E-8} 22" fill="none" stroke=${S} stroke-width="2"></path>
    <line x1="96" x2="96" y1="60" y2=${P-14} stroke=${_} stroke-dasharray="3 3"></line>
    ${m(102,76,"closed below","start",_)}${m(92,58,"min opening","end",S)}${m(E-8,18,"max opening","end",_)}
    ${m(E-8,P-3,"requested \u2192","end")}${m(4,12,"sent \u2191")}
  `,send_threshold:()=>$`
    ${Y()}
    <path d="M8 66 Q 30 60, 46 64 T 84 52 T 120 46 T 150 50 T 190 30 T 232 34" fill="none" stroke=${L} stroke-width="1.5" stroke-dasharray="3 2"></path>
    <path d="M8 66 H 84 V 50 H 186 V 32 H 232" fill="none" stroke=${S} stroke-width="2"></path>
    ${m(8,14,"wanted","start",L)}${m(60,14,"sent: only when the change is big enough","start",S)}
  `,window_delay:()=>$`
    ${m(8,14,"window")}
    <rect x="30" y="20" width="18" height="12" fill=${L} rx="2"></rect>
    <rect x="96" y="20" width="96" height="12" fill=${L} rx="2"></rect>
    ${m(8,52,"heating")}
    <rect x="8" y="58" width="122" height="12" fill=${S} rx="2"></rect>
    <rect x="212" y="58" width="20" height="12" fill=${S} rx="2"></rect>
    <line x1="96" x2="130" y1="40" y2="40" stroke=${_} stroke-width="2"></line>${m(113,50,"wait","middle",_)}
    <line x1="192" x2="212" y1="40" y2="40" stroke=${_} stroke-width="2"></line>${m(202,50,"wait","middle",_)}
    ${m(39,46,"too short","middle")}
  `,window_slope:()=>$`
    ${Y()}
    <rect x="92" y="10" width="78" height=${P-24} fill=${_} opacity="0.12"></rect>
    <path d="M8 30 L 90 32 C 110 40, 120 66, 150 70 S 190 68, 232 66" fill="none" stroke=${S} stroke-width="2"></path>
    ${m(131,22,"open: drop faster","middle",_)}${m(131,32,"than the threshold","middle",_)}
    ${m(8,22,"room temperature","start",S)}${m(E-8,P-3,"time","end")}
  `,motion:()=>$`
    ${m(8,14,"someone in the room")}
    <rect x="24" y="20" width="10" height="10" fill=${L} rx="2"></rect>
    <rect x="70" y="20" width="90" height="10" fill=${L} rx="2"></rect>
    <path d="M8 76 H 100 V 50 H 200 V 76 H 232" fill="none" stroke=${S} stroke-width="2"></path>
    <line x1="70" x2="100" y1="40" y2="40" stroke=${_} stroke-width="2"></line>${m(85,46,"occupied","middle",_)}
    <line x1="160" x2="200" y1="40" y2="40" stroke=${_} stroke-width="2"></line>${m(180,46,"empty","middle",_)}
    ${m(104,62,"occupied temperature","start",S)}${m(8,90,"empty temperature (preset stays Activity)","start",S)}
  `,safety:()=>$`
    ${m(8,14,"sensor reports")}
    ${[14,34,54,74,204,224].map(s=>$`<circle cx=${s} cy="24" r="3" fill=${L}></circle>`)}
    <line x1="74" x2="150" y1="38" y2="38" stroke=${_} stroke-width="2"></line>${m(112,48,"silent longer than the delay","middle",_)}
    ${m(8,62,"heating")}
    <path d="M8 84 H 150 V 74 H 204 V 84" fill="none" stroke=${S} stroke-width="2"></path>
    <rect x="150" y="74" width="54" height="10" fill=${_} opacity="0.25"></rect>${m(177,70,"fixed %","middle",_)}
  `,override:()=>$`
    ${Y()}
    <path d="M8 60 H 70 V 30 H 170 V 60 H 232" fill="none" stroke=${S} stroke-width="2"></path>
    <line x1="70" x2="170" y1="20" y2="20" stroke=${_} stroke-width="2"></line>${m(120,14,"override duration","middle",_)}
    ${m(8,54,"preset")}${m(74,44,"manual change","start",S)}${m(E-8,P-3,"time","end")}
  `,failure:()=>$`
    ${m(8,14,"heating share")}
    <path d="M8 40 H 40 V 22 H 232" fill="none" stroke=${S} stroke-width="2"></path>
    ${xe(28,_,"3 3")}${m(E-8,36,"threshold","end",_)}
    ${m(8,62,"room temperature")}
    <path d="M8 76 H 232" fill="none" stroke=${L} stroke-width="2"></path>
    <line x1="40" x2="170" y1="88" y2="88" stroke=${_} stroke-width="2"></line>${m(105,84,"delay","middle",_)}
    <circle cx="170" cy="76" r="5" fill=${_}></circle>${m(178,70,"alert","start",_)}
  `,correction:()=>$`
    ${Y()}${xe(46,L,"3 3")}${m(E-8,42,"your target","end")}
    <path d="M8 76 C 60 74, 120 60, 232 48" fill="none" stroke=${L} stroke-width="2"></path>${m(8,70,"room")}
    <path d="M8 22 C 80 24, 160 34, 232 44" fill="none" stroke=${S} stroke-width="2"></path>${m(8,16,"sent to the device","start",S)}
  `,stagger:()=>$`
    ${Y()}
    <line x1="8" x2="8" y1="16" y2=${P-14} stroke=${le}></line><line x1=${E-8} x2=${E-8} y1="16" y2=${P-14} stroke=${le}></line>
    ${m(8,12,"one cycle, 30 % each")}
    <rect x="8" y="24" width="67" height="18" fill=${S} rx="2"></rect>${m(80,37,"heater 1")}
    <rect x="80" y="52" width="67" height="18" fill=${S} rx="2"></rect>${m(152,65,"heater 2")}
  `};function Gt(s){return s&&Wt[s]?Wt[s]():void 0}var Kt=`0 0 ${E} ${P}`;function tt(s){if(s.selector)return s.selector;switch(s.type){case"boolean":return{boolean:{}};case"integer":return{number:{mode:"box",step:1}};case"float":return{number:{mode:"box",step:"any"}};case"select":return{select:{options:(s.options??[]).map(([t,e])=>({value:t,label:e}))}};default:return{text:{}}}}var Pr=s=>s.split(/\*\*(.+?)\*\*/g).map((t,e)=>e%2?o`<b>${t}</b>`:t),Zt=s=>Object.keys(tt(s))[0],rt=s=>Object.values(tt(s))[0]??{},ce=s=>Zt(s)==="boolean",Xt=s=>rt(s).multiple===!0,et=s=>Array.isArray(s)?s:s?[String(s)]:[],Je=s=>et(rt(s).domain),O=class extends q{constructor(){super(...arguments);this.label="";this.hint="";this.info="";this.error="";this.disabled=!1;this.editing=!1}emit(e){this.dispatchEvent(new CustomEvent("field-changed",{detail:{key:this.schema.name,value:e},bubbles:!0,composed:!0}))}place(e){let r=e.currentTarget;r.classList.toggle("flip",r.getBoundingClientRect().left>window.innerWidth-340)}infoButton(){let e=Gt(this.diagram);if(!this.info&&!e)return u;let r=Ut(this.diagram??"");return o`<span class="info" tabindex="0" aria-label=${b("more_info")} @mouseenter=${this.place} @focus=${this.place} @click=${i=>i.preventDefault()}>
      <ha-icon icon="mdi:information-outline"></ha-icon>
      <span class="tip" role="tooltip">
        ${e?o`<span class="diagram">
              ${r?o`<span class="dtitle">${r.title}</span>`:u}
              <svg viewBox=${Kt} width="100%" role="img" aria-label=${r?.caption??""}>${e}</svg>
            </span>`:u}
        ${this.info?o`<span class="text">${Pr(this.info)}</span>`:u}
      </span>
    </span>`}render(){let e=!!this.schema.required,r=o`<span class="label">${this.label}${e&&!ce(this.schema)?o`<span class="req">*</span>`:u}</span>`;return ce(this.schema)?o`<div class="tile bool">
        <label class="row ${this.disabled?"disabled":""}">
          <ha-switch .checked=${!!this.value} .disabled=${this.disabled} @change=${i=>this.emit(i.target.checked)}></ha-switch>
          <span class="label">${this.label}${this.infoButton()}</span>
        </label>
        ${this.hint?o`<div class="hint">${this.hint}</div>`:u} ${this.renderError()}
      </div>`:o`<div class="tile ${this.error?"has-error":""}">
      <div class="head">${r}${this.infoButton()}</div>
      ${this.control()} ${this.hint?o`<div class="hint">${this.hint}</div>`:u} ${this.renderError()}
    </div>`}renderError(){return this.error?o`<div class="error">${this.error}</div>`:u}control(){let e=rt(this.schema);switch(Zt(this.schema)){case"number":return this.numberInput(e);case"text":return e.multiple?this.listInput():this.textInput();case"select":return this.selectInput(e);case"entity":return e.multiple?this.entityList():this.entityInput();default:return o`<ha-selector
          .hass=${this.hass}
          .selector=${tt(this.schema)}
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
      @change=${i=>{let n=i.target.value;this.emit(n===""?void 0:r?parseInt(n,10):Number(n))}}
    />`}textInput(){return o`<input
      class="in"
      type="text"
      .value=${this.value??""}
      ?disabled=${this.disabled}
      @change=${e=>this.emit(e.target.value===""?void 0:e.target.value)}
    />`}selectInput(e){let r=(e.options??[]).map(n=>typeof n=="string"?{value:n,label:n}:n),i=n=>e.translation_key&&this.localizeValue?.(`${e.translation_key}.options.${n.value}`)||n.label;return o`<select class="in" ?disabled=${this.disabled} @change=${n=>this.emit(n.target.value||void 0)}>
      ${this.schema.required?u:o`<option value="" ?selected=${!this.value}>–</option>`}
      ${r.map(n=>o`<option value=${n.value} ?selected=${n.value===this.value}>${i(n)}</option>`)}
    </select>`}candidates(){let e=Je(this.schema);return Object.keys(this.hass.states).filter(r=>!e.length||e.includes(r.split(".")[0])).sort()}friendly(e){return this.hass.states[e]?.attributes.friendly_name}datalist(e){return o`<datalist id=${e}>
      ${this.candidates().map(r=>o`<option value=${r}>${this.friendly(r)??""}</option>`)}
    </datalist>`}entityInput(){let e=this.value??"",r=e&&!this.hass.states[e];return e&&!r&&!this.editing?o`<button class="in entity-shown" ?disabled=${this.disabled} title=${e} @click=${this.startEditing}>
        <span class="fname">${this.friendly(e)??e}</span><span class="eid">${e}</span>
      </button>`:o`<input
        class="in ${r?"warn":""}"
        list="opts"
        .value=${e}
        placeholder=${Je(this.schema).join(", ")}
        ?disabled=${this.disabled}
        @change=${i=>this.emit(i.target.value.trim()||void 0)}
        @blur=${()=>this.editing=!1}
      />
      ${this.datalist("opts")}`}async startEditing(){this.editing=!0,await this.updateComplete;let e=this.renderRoot.querySelector("input");e?.focus(),e?.select()}entityList(){let e=et(this.value);return o`<div class="chips in">
        ${e.map((r,i)=>o`<span class="chip ${this.hass.states[r]?"":"warn"}" title=${r}
            >${this.friendly(r)??r}
            ${this.disabled?u:o`<button aria-label="✕" @click=${()=>this.emit(e.filter((n,a)=>a!==i))}>✕</button>`}</span
          >`)}
        ${this.disabled?u:o`<input
              list="opts"
              placeholder="+ ${Je(this.schema).join(", ")}"
              @change=${r=>{let i=r.target.value.trim();r.target.value="",i&&!e.includes(i)&&this.emit([...e,i])}}
            />`}
      </div>
      ${this.datalist("opts")}`}listInput(){let e=et(this.value);return o`<div class="chips in">
      ${e.map((r,i)=>o`<span class="chip mono"
          >${r}${this.disabled?u:o`<button aria-label="✕" @click=${()=>this.emit(e.filter((n,a)=>a!==i))}>✕</button>`}</span
        >`)}
      ${this.disabled?u:o`<input
            placeholder="+"
            @change=${r=>{let i=r.target.value.trim();r.target.value="",i&&this.emit([...e,i])}}
          />`}
    </div>`}};O.styles=R`
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
  `,d([v({attribute:!1})],O.prototype,"hass",2),d([v({attribute:!1})],O.prototype,"schema",2),d([v({attribute:!1})],O.prototype,"value",2),d([v()],O.prototype,"label",2),d([v()],O.prototype,"hint",2),d([v()],O.prototype,"info",2),d([v()],O.prototype,"diagram",2),d([v()],O.prototype,"error",2),d([v({type:Boolean})],O.prototype,"disabled",2),d([v({attribute:!1})],O.prototype,"localizeValue",2),d([k()],O.prototype,"editing",2),O=d([I("vt-field")],O);function Yt(s){let t=s.cooling?s.current-s.target:s.target-s.current,e=s.outside===null?0:s.cooling?s.outside-s.target:s.target-s.outside,r=s.slope===null?null:s.cooling?-s.slope:s.slope,i=s.coefInt*t,n=s.coefExt*e,l=s.thresholdLow!==0&&s.thresholdHigh!==0&&r!==null&&(r>0&&-t>s.thresholdHigh||r<0&&-t>s.thresholdLow),c=l?0:Math.min(1,Math.max(0,i+n));s.maxOnPercent!==null&&c>s.maxOnPercent&&(c=s.maxOnPercent);let p=s.cycleMin*60,h=c*p,f=null;return h>0&&h<s.minOnSec&&(h=0,f="min_on"),h<p&&p-h<s.minOffSec&&(h=p,f="min_off"),{roomPart:i,outsidePart:n,share:c,stoppedByThreshold:l,onSec:Math.floor(h),offSec:Math.floor(p-h),forcedByTiming:f}}var Rr=300,Or=.5,Ir=120,Mr=30,Lr=4,st=(s,t)=>Math.round(s*10**t)/10**t;function Qt(s,t){let e=[],r=null,i=0,n=null,a=null,l=null,c=0,p=(h,f,w)=>{if(n===null||a===null){n=f,a=h,c++;return}let y=(f-n)/1e3;if(y<=0)return;let T=(h-a)/(y/3600);Math.abs(T)>Ir||(l=st(l===null?T:.2*l+.8*T,2),w&&(n=f),a=h,c++,c>=Lr&&e.push({t:f,slope:l}))};for(let{t:h,v:f}of s)if(f!==null){if(n!==null&&r!==null)for(let w=n+Mr*6e4;w<h;w+=t*6e4)p(r,w,!1);if(r===null)r=f;else{let w=(h-i)/1e3;if(w>=0){let y=Math.min(1-Math.exp(Math.log(.5)*w/Rr),Or);r=st(y*f+(1-y)*r,2)}}i=h,p(r,h,!0)}return e}function Jt(s,t,e,r,i){if(t===null||!s.length)return[];let n=[],a=null,l=r?r*6e4:1/0;for(let{t:c,slope:p}of s)a!==null&&c-a>=l&&(n.push({start:a,end:a+l,byMaxDuration:!0}),a=null),a===null?p<-t&&(a=c):e!==null&&p>=e&&(n.push({start:a,end:c,byMaxDuration:!1}),a=null);return a!==null&&n.push({start:a,end:Math.min(i,a+l),byMaxDuration:a+l<=i}),n}function er(s,t,e){let r=s.filter(c=>c.v!==null&&c.t>=t).map(c=>c.t),i=s.filter(c=>c.t<t),n=i.length&&i[i.length-1].v!==null?i[i.length-1].t:t,a=[],l=n;for(let c of r)a.push({start:l,end:c,open:!1}),l=c;return a.push({start:l,end:e,open:!0}),a}var tr=s=>s.reduce((t,e)=>!t||e.end-e.start>t.end-t.start?e:t,null);var we=36e5,Re={"24h":24*we,"7d":168*we},j=s=>{let t=typeof s=="number"?s:typeof s=="string"&&s.trim()!==""?Number(s):NaN;return Number.isFinite(t)?t:null},it=new Map;function rr(s,t,e){let r=`${t}|${e}`,i=it.get(r);if(i&&Date.now()-i.at<5*6e4)return i.data;let n=new Date,a=s.callWS({type:"history/history_during_period",start_time:new Date(n.getTime()-Re[e]).toISOString(),end_time:n.toISOString(),entity_ids:[t],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}).then(l=>(l[t]??[]).map(c=>({t:(c.lu??c.lc??0)*1e3,v:j(c.s)})));return a.catch(()=>it.delete(r)),it.set(r,{at:Date.now(),data:a}),a}var $e=(s,t,e)=>new Date(t).toLocaleString(s?.locale?.language??s?.language,{...e?{weekday:"short"}:{},hour:"2-digit",minute:"2-digit"}),nt=s=>{let t=Math.round(s/6e4);return t<60?`${t} min`:`${Math.floor(t/60)} h ${String(t%60).padStart(2,"0")}`},B=s=>`${Math.round(s*100)} %`,at=R`
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
  .chart { position: relative; margin-top: 6px; }
`,V=class extends q{readings(){let t=c=>c?this.hass.states[c]:void 0,e=t(this.climateId),r=e?.attributes??{},i=r.specific_states??{},n=j(r.current_temperature)??j(t(this.sensorId)?.state),a=j(i.ext_current_temperature)??j(t(this.outsideId)?.state),l=j(r.temperature);return{current:n,outside:a,liveTarget:l,target:this.tryTarget??l??20,slope:j(i.temperature_slope),cooling:e?.state==="cool",off:e?.state==="off",maxOn:j(r.configuration?.max_on_percent),vtShare:j(r.on_percent),preset:r.preset_mode,unit:r.configuration?.temperature_unit??this.hass.config?.unit_system?.temperature??"\xB0C"}}render(){let t=this.readings();if(t.current===null)return o`${this.head()}<p class="muted">${g("no_temperature")}</p>`;let e=this.settings,r=Yt({current:t.current,target:t.target,outside:t.outside,slope:t.slope,cooling:t.cooling,coefInt:e.coefInt,coefExt:e.coefExt,thresholdLow:e.thresholdLow,thresholdHigh:e.thresholdHigh,maxOnPercent:t.maxOn,cycleMin:e.cycleMin,minOnSec:e.minOnSec,minOffSec:e.minOffSec}),i=r.onSec/(e.cycleMin*60),n=a=>a===null?"\u2013":`${a.toFixed(1)} ${t.unit}`;return o`
      ${this.head()}
      <div class="row"><span class="muted">${g("room")}</span><span>${n(t.current)}</span></div>
      <div class="row">
        <span class="muted">${g("target")}</span>
        <span class="target">
          <button aria-label="−" @click=${()=>this.tryTarget=Math.round((t.target-.5)*10)/10}>−</button>
          <span class=${this.tryTarget!==void 0?"tried":""}>${n(t.target)}</span>
          <button aria-label="+" @click=${()=>this.tryTarget=Math.round((t.target+.5)*10)/10}>+</button>
        </span>
      </div>
      <div class="row"><span class="muted">${g("outside")}</span><span>${n(t.outside)}</span></div>
      <div class="result">
        <span class="big">${B(i)}</span>
        <span class="muted">${g("of_each_cycle",{on:nt(r.onSec*1e3),cycle:`${e.cycleMin} min`})}</span>
      </div>
      ${this.bar(r.roomPart,r.outsidePart)}
      <div class="legend">
        <span><i class="sw room"></i>${g("room_part",{v:B(r.roomPart)})}</span>
        <span><i class="sw out"></i>${g("outside_part",{v:B(r.outsidePart)})}</span>
      </div>
      ${!r.stoppedByThreshold&&r.roomPart>0&&r.outsidePart>0&&r.roomPart+r.outsidePart>1?o`<p class="muted">${g("sum_capped",{a:B(r.roomPart),b:B(r.outsidePart),sum:B(r.roomPart+r.outsidePart)})}</p>`:u}
      ${r.stoppedByThreshold?o`<p class="warn">${g("stopped_threshold")}</p>`:u}
      ${r.forcedByTiming==="min_on"?o`<p class="warn">${g("forced_min_on",{v:B(r.share)})}</p>`:u}
      ${r.forcedByTiming==="min_off"?o`<p class="warn">${g("forced_min_off",{v:B(r.share)})}</p>`:u}
      ${t.maxOn!==null&&r.share===t.maxOn&&r.roomPart+r.outsidePart>t.maxOn?o`<p class="muted">${g("capped",{v:B(t.maxOn)})}</p>`:u}
      ${this.tryTarget!==void 0?o`<p class="muted">${g("tried_target")} <a href="#" @click=${this.resetTarget}>${g("reset")}</a></p>`:u}
      ${t.vtShare!==null&&this.climateId?o`<div class="vt">
            ${g("vt_now",{v:B(t.vtShare)})}${t.off?` \xB7 ${g("vt_off")}`:t.preset==="safety"?` \xB7 ${g("vt_safety")}`:""}
          </div>`:u}
    `}resetTarget(t){t.preventDefault(),this.tryTarget=void 0}head(){return o`<div class="head"><h4>${g("tpi_title")}</h4><span class="est">${g("estimate")}</span></div>`}bar(t,e){let i=l=>Math.max(0,Math.min(1,l)),n=i(t)*280,a=Math.max(0,i(t+e)-i(t))*280;return o`<svg viewBox="0 0 ${280} 22" role="img" aria-label=${g("tpi_title")}>
      <rect x="0" y="4" width=${280} height="14" rx="4" fill="var(--secondary-background-color)"></rect>
      ${n>0?$`<rect x="0" y="4" width=${Math.max(0,n-(a>0?2:0))} height="14" rx="4" fill="var(--primary-color)"></rect>`:u}
      ${a>0?$`<rect x=${n} y="4" width=${a} height="14" rx="4" fill="var(--warning-color)"></rect>`:u}
    </svg>`}};V.styles=[at,R`
      .row { padding: 1px 0; }
      .target { display: inline-flex; align-items: center; gap: 6px; }
      .target button { all: unset; cursor: pointer; width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 4px; border: 1px solid var(--divider-color); color: var(--secondary-text-color); font-size: 12px; }
      .target button:focus-visible { outline: 2px solid var(--primary-color); }
      .tried { color: var(--primary-color); }
      .result { display: flex; align-items: baseline; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
      .legend { display: flex; gap: 12px; flex-wrap: wrap; font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; }
      .sw { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 5px; vertical-align: -1px; }
      .sw.room { background: var(--primary-color); }
      .sw.out { background: var(--warning-color); }
      a { color: var(--primary-color); }
    `],d([v({attribute:!1})],V.prototype,"hass",2),d([v({attribute:!1})],V.prototype,"settings",2),d([v()],V.prototype,"climateId",2),d([v()],V.prototype,"sensorId",2),d([v()],V.prototype,"outsideId",2),d([k()],V.prototype,"tryTarget",2),V=d([I("vt-live-tpi")],V);var se=class extends q{constructor(){super(...arguments);this.range="24h"}rangeSwitch(){return o`<span class="seg" role="radiogroup">
      ${Object.keys(Re).map(e=>o`<button role="radio" aria-checked=${e===this.range} class=${e===this.range?"on":""} @click=${()=>this.range=e}>${e}</button>`)}
    </span>`}head(e){return o`<div class="head"><h4>${e}</h4>${this.rangeSwitch()}<span class="est">${g("estimate")}</span></div>`}tip(){return this.hover?o`<div class="tip" style="left:${this.hover.x}px;top:${this.hover.y}px">${this.hover.text}</div>`:u}};d([v({attribute:!1})],se.prototype,"hass",2),d([k()],se.prototype,"range",2),d([k()],se.prototype,"hover",2);var z=class extends se{constructor(){super(...arguments);this.openThreshold=null;this.closeThreshold=null;this.maxDurationMin=null;this.cycleMin=5;this.span={from:0,until:0}}willUpdate(e){(e.has("sensorId")||e.has("range")||e.has("cycleMin"))&&this.load()}async load(){if(this.slopes=void 0,this.error=void 0,!this.sensorId)return;let e=Date.now();this.span={from:e-Re[this.range],until:e};try{this.slopes=Qt(await rr(this.hass,this.sensorId,this.range),this.cycleMin)}catch(r){this.error=r?.message??String(r)}}render(){let e=this.head(g("window_title"));if(!this.sensorId)return o`${e}<p class="muted">${g("no_sensor")}</p>`;if(this.error)return o`${e}<p class="warn">${this.error}</p>`;if(!this.slopes)return o`${e}<p class="muted">${g("loading")}</p>`;let r=this.slopes.filter(c=>c.t>=this.span.from);if(r.length<2)return o`${e}<p class="muted">${g("too_little_history")}</p>`;let i=Jt(r,this.openThreshold,this.closeThreshold,this.maxDurationMin,this.span.until),n=r.reduce((c,p)=>p.slope<c.slope?p:c),a=this.range!=="24h",l=j(this.hass.states[this.climateId??""]?.attributes?.specific_states?.temperature_slope);return o`
      ${e}
      ${this.openThreshold===null?o`<p>${g("window_no_threshold")}</p>`:i.length?o`<p><span class="big">${i.length}×</span> ${g("window_detected",{range:g(`range_${this.range}`)})}</p>`:o`<p><span class="big">0×</span> ${g("window_never",{range:g(`range_${this.range}`)})}</p>`}
      <div class="chart">${this.chart(r,i,a)}${this.tip()}</div>
      <p class="muted">
        ${g("steepest",{v:`${n.slope.toFixed(1)} \xB0/h`,at:$e(this.hass,n.t,a)})}
        ${i.some(c=>c.byMaxDuration)?o`<br />${g("ended_by_max")}`:u}
      </p>
      <p class="muted">${g("window_caveat")}</p>
      ${l!==null?o`<div class="vt">${g("vt_slope",{v:`${l.toFixed(1)} \xB0/h`})}</div>`:u}
    `}chart(e,r,i){let l={l:26,r:4,t:6,b:16},{from:c,until:p}=this.span,h=e.map(A=>A.slope),f=[this.openThreshold!==null?-this.openThreshold:null,this.closeThreshold].filter(A=>A!==null),w=Math.min(...h,...f,-1),y=Math.max(...h,...f,1),T=(y-w)*.08;w-=T,y+=T;let U=A=>l.l+(A-c)/(p-c)*(280-l.l-l.r),x=A=>l.t+(y-A)/(y-w)*(120-l.t-l.b),H=e.map((A,de)=>`${de?"L":"M"}${U(A.t).toFixed(1)} ${x(A.slope).toFixed(1)}`).join(""),Oe=i?24:6,lt=[];for(let A=Math.ceil(c/(Oe*we))*Oe*we;A<p;A+=Oe*we)lt.push(A);let lr=A=>{let de=A.currentTarget.getBoundingClientRect(),ct=c+((A.clientX-de.left)/de.width*280-l.l)/(280-l.l-l.r)*(p-c),ke=e.reduce((pt,ut)=>Math.abs(ut.t-ct)<Math.abs(pt.t-ct)?ut:pt),dt=de.width/280;this.hover={x:U(ke.t)*dt,y:x(ke.slope)*dt-6,text:`${$e(this.hass,ke.t,i)} \xB7 ${ke.slope.toFixed(1)} \xB0/h`}};return o`<svg viewBox="0 0 ${280} ${120}" role="img" aria-label=${g("window_title")}
      @pointermove=${lr} @pointerleave=${()=>this.hover=void 0}>
      ${r.map(A=>$`<rect x=${U(A.start)} y=${l.t} width=${Math.max(2,U(A.end)-U(A.start))} height=${120-l.t-l.b}
          fill="var(--warning-color)" opacity="0.22"></rect>`)}
      <line x1=${l.l} x2=${280-l.r} y1=${x(0)} y2=${x(0)} stroke="var(--divider-color)"></line>
      ${this.openThreshold!==null?$`<line x1=${l.l} x2=${280-l.r} y1=${x(-this.openThreshold)} y2=${x(-this.openThreshold)} stroke="var(--warning-color)" stroke-dasharray="4 3"></line>
          <text x=${280-l.r} y=${x(-this.openThreshold)+11} text-anchor="end">${g("open_line")}</text>`:u}
      ${this.closeThreshold!==null?$`<line x1=${l.l} x2=${280-l.r} y1=${x(this.closeThreshold)} y2=${x(this.closeThreshold)} stroke="var(--secondary-text-color)" stroke-dasharray="2 3"></line>
          <text x=${280-l.r} y=${x(this.closeThreshold)-3} text-anchor="end">${g("close_line")}</text>`:u}
      <path d=${H} fill="none" stroke="var(--primary-color)" stroke-width="2" stroke-linejoin="round"></path>
      <text x=${l.l-4} y=${x(y-T)+3} text-anchor="end">${(y-T).toFixed(0)}</text>
      <text x=${l.l-4} y=${x(0)+3} text-anchor="end">0</text>
      <text x=${l.l-4} y=${x(w+T)+3} text-anchor="end">${(w+T).toFixed(0)}</text>
      ${lt.map(A=>$`<text x=${U(A)} y=${117} text-anchor="middle">${$e(this.hass,A,i).replace(/:00$/,"")}</text>`)}
    </svg>
    <div class="axis-note">°/h</div>`}};z.styles=[at,R`.axis-note { position: absolute; left: 0; top: -2px; font-size: 10px; color: var(--secondary-text-color); }`],d([v()],z.prototype,"sensorId",2),d([v()],z.prototype,"climateId",2),d([v({type:Number})],z.prototype,"openThreshold",2),d([v({type:Number})],z.prototype,"closeThreshold",2),d([v({type:Number})],z.prototype,"maxDurationMin",2),d([v({type:Number})],z.prototype,"cycleMin",2),d([k()],z.prototype,"slopes",2),d([k()],z.prototype,"error",2),z=d([I("vt-live-window")],z);var N=class extends se{constructor(){super(...arguments);this.delayMin=null;this.minOnPercent=null;this.overClimate=!1;this.span={from:0,until:0}}willUpdate(e){(e.has("sensorId")||e.has("outsideId")||e.has("range"))&&this.load()}async load(){this.gaps=void 0,this.error=void 0;let e=Date.now(),r=e-Re[this.range];this.span={from:r,until:e};let i=[{id:this.sensorId,label:g("room_sensor")},{id:this.outsideId,label:g("outside_sensor")}].filter(n=>!!n.id);try{this.gaps=await Promise.all(i.map(async n=>({...n,gaps:er(await rr(this.hass,n.id,this.range),r,e)})))}catch(n){this.error=n?.message??String(n)}}render(){let e=this.head(g("safety_title"));if(this.overClimate)return o`${e}<p>${g("safety_over_climate")}</p>`;if(!this.sensorId)return o`${e}<p class="muted">${g("no_sensor")}</p>`;if(this.error)return o`${e}<p class="warn">${this.error}</p>`;if(!this.gaps)return o`${e}<p class="muted">${g("loading")}</p>`;let r=(this.delayMin??0)*6e4,i=this.range!=="24h",n=this.delayMin?this.gaps.flatMap(a=>a.gaps.filter(l=>l.end-l.start>r)).length:0;return o`
      ${e}
      ${this.delayMin?o`<p>
            <span class="big">${n}×</span>
            ${g(n?"safety_would":"safety_never",{range:g(`range_${this.range}`),delay:`${this.delayMin} min`})}
          </p>`:u}
      ${this.gaps.map(a=>this.strip(a.label,a.gaps,r,i))}
      <div class="row ends"><span>${g(`ago_${this.range}`)}</span><span>${g("now")}</span></div>
      ${this.tip()}
      ${this.minOnPercent!==null?o`<p class="muted">${g("safety_caveat",{v:B(this.minOnPercent)})}</p>`:u}
    `}strip(e,r,i,n){let{from:l,until:c}=this.span,p=y=>(Math.max(y,l)-l)/(c-l)*280,h=tr(r),f=r.filter(y=>i&&y.end-y.start>i*.75),w=y=>T=>{let U=this.renderRoot.querySelector(".wrap"),x=T.currentTarget.getBoundingClientRect(),H=U?.getBoundingClientRect()??x;this.hover={x:x.left-H.left+x.width/2,y:x.top-H.top-4,text:`${$e(this.hass,y.start,n)} \u2192 ${y.open?g("now"):$e(this.hass,y.end,n)} \xB7 ${nt(y.end-y.start)}`}};return o`<div class="sensor">
      <div class="row"><span>${e}</span>
        <span class="muted">${h?g("longest",{v:nt(h.end-h.start)}):""}</span></div>
      <svg viewBox="0 0 ${280} 14" role="img" aria-label=${e}>
        <rect x="0" y="3" width=${280} height="8" rx="4" fill="var(--secondary-background-color)"></rect>
        ${f.map(y=>{let T=y.end-y.start>i;return $`<rect x=${p(y.start)} y=${T?1:3} width=${Math.max(3,p(y.end)-p(y.start))} height=${T?12:8} rx="3"
            fill=${T?"var(--warning-color)":"var(--secondary-text-color)"} opacity=${T?1:.45}
            @pointerenter=${w(y)} @pointerleave=${()=>this.hover=void 0}></rect>`})}
      </svg>
    </div>`}tip(){return o`<div class="wrap">${super.tip()}</div>`}};N.styles=[at,R`
      :host { position: relative; }
      .sensor { margin-top: 8px; }
      .sensor svg { margin-top: 3px; }
      .ends { font-size: 10px; color: var(--secondary-text-color); margin-top: 2px; }
      .wrap { position: absolute; inset: 0; pointer-events: none; }
    `],d([v()],N.prototype,"sensorId",2),d([v()],N.prototype,"outsideId",2),d([v({type:Number})],N.prototype,"delayMin",2),d([v({type:Number})],N.prototype,"minOnPercent",2),d([v({type:Boolean})],N.prototype,"overClimate",2),d([k()],N.prototype,"gaps",2),d([k()],N.prototype,"error",2),N=d([I("vt-live-safety")],N);var ot=s=>s==null||s===""||Array.isArray(s)&&s.length===0;function zr(s,t){return s.use_window_feature!==!0?"off":t&&t!=="off"?t:ot(s.window_sensor_entity_id)&&!ot(s.window_auto_open_threshold)?"drop":"sensor"}function Hr(s,t,e,r){let{fields:i}=t;if(s.types&&!s.types.includes(e.thermostat_type))return null;let n=s.control,a=n?.type==="feature"&&n.key&&i[n.key]?n.key:void 0;if(a&&i[a].inherited)return null;let l=n?.type==="central"?n.key:n?.central,c=l&&i[l]?l:void 0,p=s.fields.filter(h=>i[h.key]&&!r.has(h.key)).map(h=>({...h,desc:i[h.key]}));return!p.length&&!a?null:{id:s.id,featureKey:a,featureOn:a?e[a]===!0:!0,centralKey:c,usesCentral:c?e[c]!==!1:!1,own:p.filter(h=>!h.desc.inherited),inherited:p.filter(h=>h.desc.inherited)}}function sr(s,t,e){let{fields:r}=s,i=new Set(s.layout.control_keys),n=new Set,a=[],l=p=>{p.groups.filter(x=>!x.types||x.types.includes(t.thermostat_type)).forEach(x=>x.fields.forEach(H=>n.add(H.key)));let h=p.control?.key&&r[p.control.key]?p.control.key:void 0,f,w=new Set,y=!1;if(p.method){if(p.method.feature&&!r[p.method.feature])return;let x=zr(t,e);f={options:Object.keys(p.method.options),current:x},w=new Set(Object.entries(p.method.options).filter(([H])=>H!==x).flatMap(([,H])=>H)),y=x==="off"}let T=y?[]:p.groups.map(x=>Hr(x,s,t,w)).filter(x=>!!x);if(!T.length&&!h&&!f&&!p.always)return;let U=new Set;T.forEach(x=>[...x.own,...x.inherited].forEach(H=>U.add(H.desc.step))),a.push({id:p.id,icon:p.icon??"mdi:dots-horizontal",featureKey:h,featureOn:h?t[h]===!0:!y,method:f,groups:T,steps:U})};s.layout.cards.forEach(l);let c=Object.keys(r).filter(p=>!n.has(p)&&!i.has(p));return c.length&&l({id:"other",groups:[{id:"other",control:null,fields:c.map(p=>({key:p,level:"common"}))}]}),a}var ir=s=>s.featureOn&&s.groups.some(t=>t.featureOn&&t.own.some(e=>e.desc.schema.required&&e.level!=="advanced"&&!ce(e.desc.schema)));function nr(s,t){let e={};for(let r of s){if(!r.featureOn)continue;let i=r.groups.filter(n=>n.featureOn).flatMap(n=>n.own).filter(n=>n.desc.schema.required&&ot(t[n.key])).map(n=>n.key);i.length&&(e[r.id]=i)}return e}function ar(s,t){let e=s;for(let[r,i]of Object.entries(t.fields))!i.inherited&&i.schema.default!==void 0&&e[r]===void 0&&(e===s&&(e={...s}),e[r]=i.schema.default);return e}var Nr=760,C=class extends q{constructor(){super(...arguments);this.narrow=!1;this.heading="";this.data={};this.dirty=!1;this.saving=!1;this.errors={};this.wide=!0;this.presets={own:{},central:{}};this.describeSeq=0;this.resizer=new ResizeObserver(([e])=>this.wide=e.contentRect.width>=Nr)}connectedCallback(){super.connectedCallback(),this.resizer.observe(this)}disconnectedCallback(){this.resizer.disconnect(),super.disconnectedCallback()}willUpdate(e){(e.has("entryId")||e.has("newType"))&&this.hass&&this.load()}async load(){this.loadError=void 0,this.banner=void 0,this.errors={},this.dirty=!1,this.windowMethod=void 0,this.layout=void 0,this.climateId=void 0;try{if(Ge(this.hass,this.entryId).then(e=>this.presets=e),this.entryId){let e=await Pt(this.hass,this.entryId);this.heading=e.title,this.climateId=e.climate_entity_id??void 0,await this.applyLayout(e.data,e)}else if(this.newType){let e=await Rt(this.hass,this.newType);this.heading=_e(this.hass,this.newType),await this.applyLayout(e.data,e)}}catch(e){this.loadError=e?.message??String(e)}}async applyLayout(e,r){for(let i=0;i<4;i++){let n=ar(e,r);if(n===e)break;e=n,r=await We(this.hass,e)}this.data=e,this.layout=r}async change(e){let r={...this.data};for(let[a,l]of Object.entries(this.layout?.layout.derived_flags??{}))a in e&&(e={...e,[l]:!["",null,void 0].includes(e[a])});for(let[a,l]of Object.entries(e))l===void 0?delete r[a]:r[a]=l;this.data=r,this.dirty=!0;let i=++this.describeSeq,n=await We(this.hass,r);i===this.describeSeq&&await this.applyLayout(this.data,n)}setWindowMethod(e){if(this.windowMethod=e,e==="off"){this.change({use_window_feature:!1});return}let r=n=>this.layout?.fields[n]&&!this.layout.fields[n].inherited,i=e==="drop"?["window_sensor_entity_id"]:["window_auto_open_threshold","window_auto_close_threshold","window_auto_max_duration"].filter(r);this.change({use_window_feature:!0,...Object.fromEntries(i.map(n=>[n,void 0]))})}async onSave(){this.saving=!0,this.banner=void 0,this.errors={};try{let e=await Ot(this.hass,this.data,this.entryId);if(e.success)this.dirty=!1,this.banner={type:"success",text:b("saved")},this.dispatchEvent(new CustomEvent("vtherm-saved",{bubbles:!0,composed:!0})),setTimeout(()=>Ge(this.hass,this.entryId).then(r=>this.presets=r),3e3),!this.entryId&&e.entry_id&&this.dispatchEvent(new CustomEvent("vtherm-created",{detail:{entryId:e.entry_id},bubbles:!0,composed:!0}));else if(e.incomplete)this.banner={type:"warning",text:b("not_saved_incomplete")};else{this.errors=e.errors,this.banner={type:"error",text:b("not_saved_rejected")};let r=Object.keys(e.errors)[0],i=this.cards().find(n=>n.steps.has(r));i&&this.updateComplete.then(()=>this.scrollToCard(i.id))}}catch(e){this.banner={type:"error",text:e?.message??String(e)}}finally{this.saving=!1}}cards(){return this.layout?sr(this.layout,this.data,this.windowMethod):[]}scrollToCard(e){this.renderRoot.querySelector(`#card-${e}`)?.scrollIntoView({behavior:"smooth",block:"start"})}fieldErrors(){let e={};for(let r of Object.values(this.errors))for(let[i,n]of Object.entries(r))i!=="base"&&(e[i]=Ye(this.hass,n));return e}render(){if(this.loadError)return o`<ha-alert alert-type="error">${this.loadError}</ha-alert>`;if(!this.layout)return o`<div class="loading"><ha-spinner></ha-spinner></div>`;let e=this.cards(),r=nr(e,this.data),i=Object.values(r).reduce((a,l)=>a+l.length,0),n=this.fieldErrors();return o`
      <div class="toolbar">
        <div class="title">
          <div class="name">${this.data.name||this.heading}</div>
          <div class="sub">${_e(this.hass,this.data.thermostat_type)}${this.entryId?"":" \xB7 new"}</div>
        </div>
        ${i?o`<span class="chip warn">${b("required_empty",{n:i})}</span>`:u}
        ${this.dirty?o`<span class="chip">${b("unsaved")}</span>`:u}
        <ha-button .disabled=${this.saving||!this.dirty&&!!this.entryId} @click=${this.onSave}>
          ${this.entryId?b("save"):b("create")}
        </ha-button>
      </div>
      <div class="body ${this.wide?"wide":"narrow"}">
        ${this.renderIndex(e,r,n)}
        <div class="content">
          ${this.banner?o`<ha-alert alert-type=${this.banner.type}>${this.banner.text}</ha-alert>`:u}
          ${this.renderColumns(e,n,r)}
        </div>
      </div>
    `}cardHasError(e,r){return e.groups.flatMap(n=>n.own.map(a=>a.key)).some(n=>r[n])||[...e.steps].some(n=>this.errors[n]?.base)}renderIndex(e,r,i){return o`<nav class="index" aria-label=${b("sections")}>
      ${e.map(n=>{let a=Ze(n.id),l=o`<ha-icon class="ok" icon="mdi:check"></ha-icon>`;return n.featureOn?this.cardHasError(n,i)?l=o`<span class="state err">${b("state_error")}</span>`:r[n.id]?l=o`<span class="state warn">${b("state_empty",{n:r[n.id].length})}</span>`:n.groups.every(c=>c.centralKey&&c.usesCentral)&&(l=o`<span class="state">${b("state_central")}</span>`):l=o`<span class="state">${b("state_off")}</span>`,o`<button class=${n.featureOn?"":"off"} @click=${()=>this.scrollToCard(n.id)}>
          <ha-icon icon=${n.icon}></ha-icon><span class="label">${a.title}</span>${l}
        </button>`})}
    </nav>`}renderColumns(e,r,i){return o`<div class="col">${e.map(n=>this.renderCard(n,r,i))}</div>`}renderCard(e,r,i){let n=Ze(e.id),a=[...e.steps].map(l=>this.errors[l]?.base).filter(Boolean);return o`
      <section
        class="card ${e.featureOn?"":"off"} ${ir(e)?"required":""} ${i[e.id]?"missing":""}"
        id="card-${e.id}"
      >
        <header>
          <ha-icon icon=${e.icon}></ha-icon>
          <div class="htext">
            <h2>${n.title}</h2>
            <p>${n.subtitle}</p>
          </div>
          ${e.featureKey?this.featureSwitch(e.featureKey,e.featureOn):u}
        </header>
        ${this.cardBody(e,o`
            ${e.method?this.methodChoice(e.method):u}
            ${e.featureOn?o`
                  ${a.map(l=>o`<ha-alert alert-type="error">${Ye(this.hass,l)}</ha-alert>`)}
                  ${e.groups.map(l=>this.renderGroup(l,r))}
                  ${e.id==="presets"?this.presetTable():u}
                `:u}
          `)}
      </section>
    `}cardBody(e,r){let i=e.featureOn?this.livePanel(e):u;return i===u?r:o`<div class="cbody">
      <div class="settings">${r}</div>
      <aside class="live">${i}</aside>
    </div>`}effective(e){let r=this.layout.fields[e];if(r)return r.inherited?this.layout.central_values[e]:this.data[e]}effectiveNumber(e,r){let i=Number(this.effective(e));return this.effective(e)===void 0||this.effective(e)===null||this.effective(e)===""||!Number.isFinite(i)?r:i}livePanel(e){let r=this.data.thermostat_type;if(r==="thermostat_central_config")return u;let i=this.effective("temperature_sensor_entity_id")||void 0,n=this.effective("external_temperature_sensor_entity_id")||void 0,a=(c,p)=>this.effectiveNumber(c,p),l=c=>{let p=this.effective(c);return p==null||p===""?null:Number(p)};switch(e.id){case"heating":return this.effective("proportional_function")!=="tpi"||!this.layout.fields.tpi_coef_int?u:o`<vt-live-tpi
          .hass=${this.hass}
          .climateId=${this.climateId}
          .sensorId=${i}
          .outsideId=${n}
          .settings=${{coefInt:a("tpi_coef_int",.6),coefExt:a("tpi_coef_ext",.01),thresholdLow:a("tpi_threshold_low",0),thresholdHigh:a("tpi_threshold_high",0),cycleMin:a("cycle_min",5),minOnSec:a("minimal_activation_delay",0),minOffSec:a("minimal_deactivation_delay",0)}}
        ></vt-live-tpi>`;case"window":return e.method?.current!=="drop"?u:o`<vt-live-window
          .hass=${this.hass}
          .climateId=${this.climateId}
          .sensorId=${i}
          .openThreshold=${l("window_auto_open_threshold")}
          .closeThreshold=${l("window_auto_close_threshold")}
          .maxDurationMin=${l("window_auto_max_duration")}
          .cycleMin=${a("cycle_min",5)}
        ></vt-live-window>`;case"safety":return o`<vt-live-safety
          .hass=${this.hass}
          .sensorId=${i}
          .outsideId=${n}
          .delayMin=${l("safety_delay_min")}
          .minOnPercent=${l("safety_min_on_percent")}
          .overClimate=${r==="thermostat_over_climate"}
        ></vt-live-safety>`}return u}renderGroup(e,r){let i=Nt(e.id),n=e.own.filter(c=>c.level!=="advanced"),a=e.own.filter(c=>c.level==="advanced"),l=i||e.featureKey;return o`
      <div class="group">
        ${l?o`<div class="ghead">
              <h3>${i??""}</h3>
              ${e.featureKey?this.featureSwitch(e.featureKey,e.featureOn):u}
            </div>`:u}
        ${e.featureOn?o`
              ${e.centralKey?this.overrideToggle(e.centralKey,e.usesCentral):u}
              ${n.length?o`<div class="fields">${n.map(c=>this.field(c,r))}</div>`:u}
              ${e.inherited.length?this.inheritedBlock(e.inherited):u}
              ${a.length?o`<details class="adv">
                    <summary>${b("advanced")} <span class="count">${a.length}</span></summary>
                    <div class="fields">${a.map(c=>this.field(c,r))}</div>
                  </details>`:u}
            `:u}
      </div>
    `}label(e){return Xe(e.key,this.data.thermostat_type)?.label??Bt(this.hass,e.desc.step,e.key,this.layout.placeholders)}field(e,r,i=!1){let n=this.layout.placeholders,a=Xe(e.key,this.data.thermostat_type),l=i?this.layout.central_values[e.key]:this.data[e.key];return o`<vt-field
      class=${ce(e.desc.schema)?"bool":Xt(e.desc.schema)?"wide":""}
      .hass=${this.hass}
      .schema=${e.desc.schema}
      .value=${l}
      .label=${this.label(e)}
      .hint=${a?.hint??""}
      .info=${a?a.info??"":Ft(this.hass,e.desc.step,e.key,n)}
      .diagram=${a?.diagram}
      .error=${i?"":r[e.key]??""}
      .disabled=${i}
      .localizeValue=${jt(this.hass)}
      @field-changed=${i?void 0:c=>this.change({[c.detail.key]:c.detail.value})}
    ></vt-field>`}inheritedBlock(e){let r=this.layout.placeholders,i=e.filter(a=>!["",null,void 0].includes(this.layout.central_values[a.key])),n=this.layout.central_entry_id;return o`<details class="inherited">
      <summary>
        <ha-icon icon="mdi:link-variant"></ha-icon>
        <span class="from">${b("from_central")}</span>
        ${i.length?o`<span class="values">${i.map(a=>o`<span class="kv"
                ><span class="k">${this.label(a)}</span>
                <span class="v">${this.formatValue(this.layout.central_values[a.key])}</span></span
              >`)}</span>`:o`<span class="values none">Nothing set there, so Versatile Thermostat's defaults apply.</span>`}
      </summary>
      <div class="fields">${e.map(a=>this.field(a,{},!0))}</div>
      ${n?o`<a class="central-link" href="?entry=${n}" @click=${a=>this.openCentral(a,n)}
            >${b("edit_central")}</a
          >`:u}
    </details>`}presetTable(){let e=this.data.thermostat_type==="thermostat_central_config",r=!e&&this.data.use_presets_central_config!==!1,i=r?this.presets.central:this.presets.own,n=[{id:"normal",suffix:""},...e||this.data.use_presence_feature?[{id:"away",suffix:"_away"}]:[],...e||this.data.ac_mode?[{id:"cool",suffix:"_ac"}]:[],...e||this.data.ac_mode&&this.data.use_presence_feature?[{id:"cool_away",suffix:"_ac_away"}]:[]],a=["frost","eco","comfort","boost"];if(!Object.keys(i).length)return o`<p class="note">${G("pending")}</p>`;let l=this.hass.config?.unit_system?.temperature??"\xB0";return o`
      <div class="presets" style="--cols: ${n.length}">
        <span class="ph">${G("preset")}</span>
        ${n.map(c=>o`<span class="ph">${G(c.id)}</span>`)}
        ${a.map(c=>o`
            <span class="pr">${G(c)}</span>
            ${n.map(p=>{let h=i[`${c}${p.suffix}_temp`],f=h?this.hass.states[h]:void 0;return f?r?o`<span class="pv">${f.state} ${l}</span>`:o`<span class="pv"
                    ><input
                      type="number"
                      .value=${f.state}
                      step=${f.attributes.step??.1}
                      min=${f.attributes.min??""}
                      max=${f.attributes.max??""}
                      aria-label="${G(c)} ${G(p.id)}"
                      @change=${w=>this.hass.callService("number","set_value",{entity_id:h,value:Number(w.target.value)})}
                    />
                    ${l}</span
                  >`:o`<span class="pv none">–</span>`})}
          `)}
      </div>
      <p class="note">
        ${r?G("from_central"):G("saved_now")}
        ${r&&this.layout?.central_entry_id?o`<a class="central-link" href="?entry=${this.layout.central_entry_id}" @click=${c=>this.openCentral(c,this.layout.central_entry_id)}
              >${b("edit_central")}</a
            >`:u}
      </p>
    `}openCentral(e,r){e.preventDefault(),this.dispatchEvent(new CustomEvent("vtherm-open",{detail:{entryId:r},bubbles:!0,composed:!0}))}formatValue(e){return typeof e=="boolean"?e?"on":"off":Array.isArray(e)?e.map(r=>this.formatValue(r)).join(", "):typeof e=="string"&&this.hass.states[e]?this.hass.states[e].attributes.friendly_name??e:String(e)}featureSwitch(e,r){return o`<ha-switch
      .checked=${r}
      aria-label=${r?b("turn_off"):b("turn_on")}
      @change=${i=>this.change({[e]:i.target.checked})}
    ></ha-switch>`}overrideToggle(e,r){return o`<label class="override">
      <ha-switch .checked=${!r} @change=${i=>this.change({[e]:!i.target.checked})}></ha-switch>
      <span>${b("override")}</span>
    </label>`}methodChoice(e){return o`<div class="question">${Pe("question")}</div>
      <div class="seg wide" role="radiogroup" aria-label=${Pe("question")}>
      ${e.options.map(r=>o`<button role="radio" aria-checked=${r===e.current} class=${r===e.current?"on":""} @click=${()=>this.setWindowMethod(r)}>
            ${Pe(r)}
          </button>`)}
    </div>`}};C.styles=R`
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
  `,d([v({attribute:!1})],C.prototype,"hass",2),d([v()],C.prototype,"entryId",2),d([v()],C.prototype,"newType",2),d([v({type:Boolean})],C.prototype,"narrow",2),d([k()],C.prototype,"heading",2),d([k()],C.prototype,"data",2),d([k()],C.prototype,"layout",2),d([k()],C.prototype,"windowMethod",2),d([k()],C.prototype,"dirty",2),d([k()],C.prototype,"saving",2),d([k()],C.prototype,"errors",2),d([k()],C.prototype,"banner",2),d([k()],C.prototype,"loadError",2),d([k()],C.prototype,"wide",2),d([k()],C.prototype,"presets",2),d([k()],C.prototype,"climateId",2),C=d([I("vtherm-editor")],C);function or(){let s=new URLSearchParams(window.location.search);return{entryId:s.get("entry")??void 0,newType:s.get("new")??void 0}}var D=class extends q{constructor(){super(...arguments);this.narrow=!1;this.ready=!1;this.entries=[];this.types=[];this.selection=or();this.onLocation=()=>this.selection=or()}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.onLocation),window.addEventListener("popstate",this.onLocation)}disconnectedCallback(){window.removeEventListener("location-changed",this.onLocation),window.removeEventListener("popstate",this.onLocation),super.disconnectedCallback()}async firstUpdated(){zt(this.hass.language),await Promise.all([It(),Vt(this.hass),this.refreshEntries()]),this.ready=!0}async refreshEntries(){let e=await qt(this.hass);this.entries=e.entries,this.types=e.thermostat_types}navigate(e){if(this.renderRoot.querySelector("vtherm-editor")?.dirty&&!confirm(b("discard")))return;let i=e.entryId?`?entry=${e.entryId}`:e.newType?`?new=${e.newType}`:"";history.pushState(null,"",`${window.location.pathname}${i}`),window.dispatchEvent(new CustomEvent("location-changed"))}effectiveSelection(){let{entryId:e,newType:r}=this.selection;return e||r?this.selection:{entryId:this.entries[0]?.entry_id}}render(){let e=this.effectiveSelection();return o`
      <div class="header">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="title">${b("panel_title")}</div>
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
            ${e.newType===Qe?o`<vtherm-type-chooser
                  .hass=${this.hass}
                  .types=${this.types}
                  .hasCentral=${this.entries.some(r=>r.thermostat_type===re)}
                  @vtherm-open=${r=>this.navigate(r.detail)}
                ></vtherm-type-chooser>`:e.entryId||e.newType?o`<vtherm-editor
                  .hass=${this.hass}
                  .narrow=${this.narrow}
                  .entryId=${e.entryId}
                  .newType=${e.newType}
                  @vtherm-open=${r=>this.navigate(r.detail)}
                  @vtherm-saved=${()=>this.refreshEntries()}
                  @vtherm-created=${async r=>{await this.refreshEntries(),this.navigate({entryId:r.detail.entryId})}}
                ></vtherm-editor>`:o`<div class="empty">${b("empty")}</div>`}
          `:o`<div class="loading"><ha-spinner></ha-spinner></div>`}
    `}};D.styles=R`
    :host { display: block; min-height: 100vh; background: var(--primary-background-color); color: var(--primary-text-color); }
    .header {
      display: flex; align-items: center; height: var(--header-height, 56px); padding: 0 12px; gap: 12px;
      background: var(--app-header-background-color); color: var(--app-header-text-color, var(--text-primary-color));
      border-bottom: var(--app-header-border-bottom, none);
    }
    .title { font-size: 20px; }
    .switcher { padding: 16px 16px 4px; max-width: 1100px; margin: 0 auto; }
    .loading, .empty { display: flex; justify-content: center; padding: 64px; color: var(--secondary-text-color); }
  `,d([v({attribute:!1})],D.prototype,"hass",2),d([v({type:Boolean})],D.prototype,"narrow",2),d([v({attribute:!1})],D.prototype,"panel",2),d([k()],D.prototype,"ready",2),d([k()],D.prototype,"entries",2),d([k()],D.prototype,"types",2),d([k()],D.prototype,"selection",2),D=d([I("vtherm-dashboard-panel")],D);export{D as VThermConfigPanel};
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
