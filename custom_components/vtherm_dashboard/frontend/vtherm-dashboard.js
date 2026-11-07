var Rt=Object.defineProperty;var Pt=Object.getOwnPropertyDescriptor;var p=(s,t,e,r)=>{for(var i=r>1?void 0:r?Pt(t,e):t,a=s.length-1,n;a>=0;a--)(n=s[a])&&(i=(r?n(t,e,i):n(i))||i);return r&&i&&Rt(t,e,i),i};var ue=globalThis,he=ue.ShadowRoot&&(ue.ShadyCSS===void 0||ue.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_e=Symbol(),Fe=new WeakMap,te=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==_e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(he&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=Fe.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Fe.set(e,t))}return t}toString(){return this.cssText}},Be=s=>new te(typeof s=="string"?s:s+"",void 0,_e),P=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((r,i,a)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[a+1],s[0]);return new te(e,s,_e)},We=(s,t)=>{if(he)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),i=ue.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,s.appendChild(r)}},be=he?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return Be(e)})(s):s;var{is:Ot,defineProperty:It,getOwnPropertyDescriptor:zt,getOwnPropertyNames:Ht,getOwnPropertySymbols:Ut,getPrototypeOf:Nt}=Object,me=globalThis,Ge=me.trustedTypes,Mt=Ge?Ge.emptyScript:"",Dt=me.reactiveElementPolyfillSupport,re=(s,t)=>s,se={toAttribute(s,t){switch(t){case Boolean:s=s?Mt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},fe=(s,t)=>!Ot(s,t),Ke={attribute:!0,type:String,converter:se,reflect:!1,useDefault:!1,hasChanged:fe};Symbol.metadata??=Symbol("metadata"),me.litPropertyMetadata??=new WeakMap;var I=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ke){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&It(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){let{get:i,set:a}=zt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let c=i?.call(this);a?.call(this,n),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ke}static _$Ei(){if(this.hasOwnProperty(re("elementProperties")))return;let t=Nt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(re("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(re("properties"))){let e=this.properties,r=[...Ht(e),...Ut(e)];for(let i of r)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let i of r)e.unshift(be(i))}else t!==void 0&&e.push(be(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return We(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){let a=(r.converter?.toAttribute!==void 0?r.converter:se).toAttribute(e,r.type);this._$Em=t,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){let r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let a=r.getPropertyOptions(i),n=typeof a.converter=="function"?{fromAttribute:a.converter}:a.converter?.fromAttribute!==void 0?a.converter:se;this._$Em=i;let c=n.fromAttribute(e,a.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,r,i=!1,a){if(t!==void 0){let n=this.constructor;if(i===!1&&(a=this[t]),r??=n.getPropertyOptions(t),!((r.hasChanged??fe)(a,e)||r.useDefault&&r.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:i,wrapped:a},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),a!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,a]of this._$Ep)this[i]=a;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[i,a]of r){let{wrapped:n}=a,c=this[i];n!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,a,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[re("elementProperties")]=new Map,I[re("finalized")]=new Map,Dt?.({ReactiveElement:I}),(me.reactiveElementVersions??=[]).push("2.1.2");var Ce=globalThis,Ze=s=>s,ge=Ce.trustedTypes,Ye=ge?ge.createPolicy("lit-html",{createHTML:s=>s}):void 0,rt="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,st="?"+M,Vt=`<${st}>`,W=document,ae=()=>W.createComment(""),ne=s=>s===null||typeof s!="object"&&typeof s!="function",Se=Array.isArray,jt=s=>Se(s)||typeof s?.[Symbol.iterator]=="function",we=`[ 	
\f\r]`,ie=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qe=/-->/g,Xe=/>/g,F=RegExp(`>|${we}(?:([^\\s"'>=/]+)(${we}*=${we}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Je=/'/g,et=/"/g,it=/^(?:script|style|textarea|title)$/i,Te=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),o=Te(1),w=Te(2),dr=Te(3),G=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),tt=new WeakMap,B=W.createTreeWalker(W,129);function at(s,t){if(!Se(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ye!==void 0?Ye.createHTML(t):t}var Ft=(s,t)=>{let e=s.length-1,r=[],i,a=t===2?"<svg>":t===3?"<math>":"",n=ie;for(let c=0;c<e;c++){let l=s[c],h,g,v=-1,S=0;for(;S<l.length&&(n.lastIndex=S,g=n.exec(l),g!==null);)S=n.lastIndex,n===ie?g[1]==="!--"?n=Qe:g[1]!==void 0?n=Xe:g[2]!==void 0?(it.test(g[2])&&(i=RegExp("</"+g[2],"g")),n=F):g[3]!==void 0&&(n=F):n===F?g[0]===">"?(n=i??ie,v=-1):g[1]===void 0?v=-2:(v=n.lastIndex-g[2].length,h=g[1],n=g[3]===void 0?F:g[3]==='"'?et:Je):n===et||n===Je?n=F:n===Qe||n===Xe?n=ie:(n=F,i=void 0);let q=n===F&&s[c+1].startsWith("/>")?" ":"";a+=n===ie?l+Vt:v>=0?(r.push(h),l.slice(0,v)+rt+l.slice(v)+M+q):l+M+(v===-2?c:q)}return[at(s,a+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},oe=class s{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let a=0,n=0,c=t.length-1,l=this.parts,[h,g]=Ft(t,e);if(this.el=s.createElement(h,r),B.currentNode=this.el.content,e===2||e===3){let v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(i=B.nextNode())!==null&&l.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let v of i.getAttributeNames())if(v.endsWith(rt)){let S=g[n++],q=i.getAttribute(v).split(M),N=/([.?@])?(.*)/.exec(S);l.push({type:1,index:a,name:N[2],strings:q,ctor:N[1]==="."?$e:N[1]==="?"?ke:N[1]==="@"?Ae:Y}),i.removeAttribute(v)}else v.startsWith(M)&&(l.push({type:6,index:a}),i.removeAttribute(v));if(it.test(i.tagName)){let v=i.textContent.split(M),S=v.length-1;if(S>0){i.textContent=ge?ge.emptyScript:"";for(let q=0;q<S;q++)i.append(v[q],ae()),B.nextNode(),l.push({type:2,index:++a});i.append(v[S],ae())}}}else if(i.nodeType===8)if(i.data===st)l.push({type:2,index:a});else{let v=-1;for(;(v=i.data.indexOf(M,v+1))!==-1;)l.push({type:7,index:a}),v+=M.length-1}a++}}static createElement(t,e){let r=W.createElement("template");return r.innerHTML=t,r}};function Z(s,t,e=s,r){if(t===G)return t;let i=r!==void 0?e._$Co?.[r]:e._$Cl,a=ne(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(s),i._$AT(s,e,r)),r!==void 0?(e._$Co??=[])[r]=i:e._$Cl=i),i!==void 0&&(t=Z(s,i._$AS(s,t.values),i,r)),t}var xe=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,i=(t?.creationScope??W).importNode(e,!0);B.currentNode=i;let a=B.nextNode(),n=0,c=0,l=r[0];for(;l!==void 0;){if(n===l.index){let h;l.type===2?h=new le(a,a.nextSibling,this,t):l.type===1?h=new l.ctor(a,l.name,l.strings,this,t):l.type===6&&(h=new Ee(a,this,t)),this._$AV.push(h),l=r[++c]}n!==l?.index&&(a=B.nextNode(),n++)}return B.currentNode=W,i}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},le=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),ne(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==G&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):jt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&ne(this._$AH)?this._$AA.nextSibling.data=t:this.T(W.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=oe.createElement(at(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===i)this._$AH.p(e);else{let a=new xe(i,this),n=a.u(this.options);a.p(e),this.T(n),this._$AH=a}}_$AC(t){let e=tt.get(t.strings);return e===void 0&&tt.set(t.strings,e=new oe(t)),e}k(t){Se(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,i=0;for(let a of t)i===e.length?e.push(r=new s(this.O(ae()),this.O(ae()),this,this.options)):r=e[i],r._$AI(a),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=Ze(t).nextSibling;Ze(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Y=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,a){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=u}_$AI(t,e=this,r,i){let a=this.strings,n=!1;if(a===void 0)t=Z(this,t,e,0),n=!ne(t)||t!==this._$AH&&t!==G,n&&(this._$AH=t);else{let c=t,l,h;for(t=a[0],l=0;l<a.length-1;l++)h=Z(this,c[r+l],e,l),h===G&&(h=this._$AH[l]),n||=!ne(h)||h!==this._$AH[l],h===u?t=u:t!==u&&(t+=(h??"")+a[l+1]),this._$AH[l]=h}n&&!i&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},$e=class extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},ke=class extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},Ae=class extends Y{constructor(t,e,r,i,a){super(t,e,r,i,a),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??u)===G)return;let r=this._$AH,i=t===u&&r!==u||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,a=t!==u&&(r===u||i);i&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ee=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}};var Bt=Ce.litHtmlPolyfillSupport;Bt?.(oe,le),(Ce.litHtmlVersions??=[]).push("3.3.3");var nt=(s,t,e)=>{let r=e?.renderBefore??t,i=r._$litPart$;if(i===void 0){let a=e?.renderBefore??null;r._$litPart$=i=new le(t.insertBefore(ae(),a),a,void 0,e??{})}return i._$AI(s),i};var qe=globalThis,A=class extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}};A._$litElement$=!0,A.finalized=!0,qe.litElementHydrateSupport?.({LitElement:A});var Wt=qe.litElementPolyfillSupport;Wt?.({LitElement:A});(qe.litElementVersions??=[]).push("4.2.2");var O=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};var Gt={attribute:!0,type:String,converter:se,reflect:!1,hasChanged:fe},Kt=(s=Gt,t,e)=>{let{kind:r,metadata:i}=e,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r==="setter"&&((s=Object.create(s)).wrapped=!0),a.set(e.name,s),r==="accessor"){let{name:n}=e;return{set(c){let l=t.get.call(this);t.set.call(this,c),this.requestUpdate(n,l,s,!0,c)},init(c){return c!==void 0&&this.C(n,void 0,s,c),c}}}if(r==="setter"){let{name:n}=e;return function(c){let l=this[n];t.call(this,c),this.requestUpdate(n,l,s,!0,c)}}throw Error("Unsupported decorator location: "+r)};function y(s){return(t,e)=>typeof e=="object"?Kt(s,t,e):((r,i,a)=>{let n=i.hasOwnProperty(a);return i.constructor.createProperty(a,r),n?Object.getOwnPropertyDescriptor(i,a):void 0})(s,t,e)}function $(s){return y({...s,state:!0,attribute:!1})}var Q="vtherm_dashboard",ot=s=>s.callWS({type:`${Q}/list`}),lt=(s,t)=>s.callWS({type:`${Q}/get`,entry_id:t}),ct=(s,t)=>s.callWS({type:`${Q}/new`,thermostat_type:t}),Le=(s,t)=>s.callWS({type:`${Q}/describe`,data:t}),dt=(s,t,e)=>s.callWS({type:`${Q}/save`,data:t,...e?{entry_id:e}:{}}),Re=(s,t)=>s.callWS({type:`${Q}/presets`,...t?{entry_id:t}:{}});async function pt(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;await customElements.whenDefined("partial-panel-resolver");let s=document.createElement("partial-panel-resolver");s.hass={panels:[{url_path:"tmp",component_name:"config"}]},s._updateRoutes(),await s.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config"),await document.createElement("ha-panel-config").routerOptions.routes.automation.load(),await customElements.whenDefined("ha-form")}var L={cards:{room:{title:"Room",subtitle:"What this thermostat is called and what it measures."},devices:{title:"Devices",subtitle:"The heaters, valves or climates this thermostat drives."},correction:{title:"Setpoint correction",subtitle:"The device's built-in sensor sits next to the heat, so VT raises or lowers the target it sends until your room sensor reaches your temperature."},heating:{title:"Heating control",subtitle:"How much and how often to heat."},presets:{title:"Presets",subtitle:"The target temperature of each preset."},window:{title:"Open window",subtitle:"What happens when a window opens."},motion:{title:"Room presence",subtitle:"In the Activity preset, the room uses one preset's temperature while someone is there and another's when it is empty. The preset itself stays Activity; other presets ignore the sensor."},presence:{title:"Away from home",subtitle:"Lower the temperature when nobody is home, using a person entity or a home occupancy sensor."},power:{title:"Power & energy",subtitle:"Device consumption and load shedding."},boiler:{title:"Central boiler",subtitle:"Turn the boiler on when any thermostat needs heat."},safety:{title:"Sensor loss & manual changes",subtitle:"What to do when the room thermometer goes quiet, and how long a manual change lasts."},auto_start_stop:{title:"Auto start/stop",subtitle:"Turn the climate off when it is not needed."},lock:{title:"Lock",subtitle:"Stop people or automations from changing this thermostat."},other:{title:"Other",subtitle:"Settings this page does not place yet."}},groups:{range:"Outdoor sensor and temperature range",valve:"Direct valve control",valve_limits:"Valve commands",sync:"Sync the device's internal temperature",tpi:"TPI coefficients",auto_tpi:"Auto-TPI learning",window_behaviour:"What happens",motion_detect:"Sensor",motion_behaviour:"What happens",shedding:"Load shedding",failure:"Heating failure detection"},fields:{name:{label:"Name",info:"Name of the thermostat and of its climate entity."},temperature_sensor_entity_id:{label:"Room temperature sensor",hint:"Where people sit, away from windows and the heater.",info:"The temperature VT regulates on. Place it in the middle of the living space: next to a window it reacts to drafts, next to the heater it reads too warm and the room stays cold."},humidity_sensor_entity_id:{label:"Humidity sensor",hint:"Optional. Shown on the thermostat, not used for heating.",info:"Exposes humidity on the thermostat card; it does not change regulation. When the room sensor's device also measures humidity, the panel pre-fills that sensor (VT's flow did this silently as 'enabled but empty')."},last_seen_temperature_sensor_entity_id:{label:"Sensor 'last seen' time",hint:"Optional. Prevents false alarms from sensors that only report changes.",info:"A datetime entity telling when the temperature sensor last checked in (many Zigbee sensors have 'last_seen'). Battery sensors stay silent while the temperature is stable; without this, VT may think the sensor died and switch to sensor-loss mode.",diagram:"safety"},external_temperature_sensor_entity_id:{label:"Outdoor temperature sensor",hint:"Used to heat more when it is cold outside.",info:"Feeds the outdoor part of the heating calculation (coef_ext). If it stops reporting, sensor-loss mode can trigger too, unless disabled globally in configuration.yaml."},temp_min:{label:"Lowest settable temperature",info:"The thermostat will not accept a target below this. Default 7 \xB0C."},temp_max:{label:"Highest settable temperature",info:"The thermostat will not accept a target above this. Default 35 \xB0C."},step_temperature:{label:"Temperature step",info:"How much one +/\u2212 press changes the target. Default 0.1 \xB0C."},underlying_entity_ids:{label:"Devices to control",info:`**over_switch**: switch, input_boolean, select or climate entities.
**over_valve**: number entities that set the valve opening.
**over_climate**: climate entities.`},ac_mode:{label:"Air conditioning",hint:"The device can cool.",info:"over_switch / over_valve: only cooling is offered. over_climate: heating and cooling, if the device supports both. Adds cooling (clim) presets."},inverse_switch_command:{label:"Inverted switch",hint:"For pilot-wire modules with a diode.",info:"On means heater off and off means heater on. Needed for some French pilot-wire setups (fil pilote) with a diode."},heater_keep_alive:{label:"Keep-alive interval (s)",hint:"Resend the current state regularly. Empty: off.",info:"Some devices switch themselves off if they hear nothing for a while. VT then repeats the current on/off command at this interval."},on_command_text:{label:"Custom on/off commands",hint:"Needed when a device is not a plain switch.",info:"Format command[/attribute[:value]], one per device, in the same order as the devices. Examples: select_option/option:comfort, set_hvac_mode/hvac_mode:heat. Plain switches use turn_on / turn_off automatically."},used_by_controls_central_boiler:{label:"Heated by the central boiler",hint:"Turns the boiler on when this room needs heat.",info:"Counts this thermostat's devices for the central boiler (configured in the central configuration). Rooms on electric heaters usually stay off."},auto_fan_mode:{label:"Boost fan when far from target",info:"Runs the device's fan at this level while the room is far from the target, so heat spreads faster. Falls back to the quietest mode once close."},auto_regulation_dtemp:{label:"Smallest change sent (\xB0)",hint:"Smaller target changes are not sent.",info:"Avoids sending a new target for every tiny change; some devices beep or drain batteries on each command. Too high and the correction stops working.",diagram:"send_threshold"},auto_regulation_periode_min:{label:"Minimum time between changes (min)",info:"A new target is sent at most this often.",diagram:"send_threshold"},opening_threshold_degree:{label:"Treat as closed below (%)",hint:"Requested openings below this close the valve.",info:"Requested opening below this value counts as 'no heat': the valve goes to its most closed position and the room counts as not heating (also for the central boiler).",diagram:"valve_curve"},min_opening_degrees:{label:"Minimum opening when heating (%)",hint:"One value per valve, comma separated.",info:"As soon as the room needs heat the valve opens at least this far. Use it for valves with a dead zone where the first % let no water through. Example: 15 or '15, 20'.",diagram:"valve_curve"},max_opening_degrees:{label:"Maximum opening (%)",hint:"One value per valve, comma separated.",info:"The valve never opens further. Limits flow, e.g. to balance radiators. Must be above the minimum opening.",diagram:"valve_curve"},max_closing_degree:{label:"How far the valve may close (%)",hint:"100 = fully closed.",info:"Set below 100 to always leave a little water flowing, e.g. 90 keeps 10 % open (quieter, protects the pump).",diagram:"valve_curve"},auto_regulation_mode:{label:"Correction strength",hint:"Start with Light, raise only if the room misses the target.",info:"The device regulates on its own sensor, which often sits next to the heat. VT shifts the target it sends so the room sensor reaches your temperature. Light: up to 1.5 \xB0, Medium: 2 \xB0, Strong: 3 \xB0. Expert uses values from configuration.yaml. 'Direct valve control' instead sets the valve opening itself (needs an opening entity). More correction means more energy and wear.",diagram:"correction"},auto_regulation_use_device_temp:{label:"Compensate the device's own sensor",hint:"Rarely needed. Try correction first.",info:"Adds (device temperature \u2212 room temperature) to the target. Example: room 18 \xB0, device reads 22 \xB0: VT sends 4 \xB0 more so the device actually heats. Unstable device sensors make this worse."},opening_degree_entity_ids:{label:"Valve opening entities",hint:"One per device, same order as the devices.",info:"The number entities that set each valve's opening."},closing_degree_entity_ids:{label:"Valve closing entities",hint:"Optional. All or none.",info:"If the valve also has a closing entity, VT sets it to 100 \u2212 opening."},sync_entity_ids:{label:"Entities to sync",hint:"One per device, same order as the devices.",info:"Either the device's temperature calibration entity (offset mode) or its external temperature input (direct mode). Some devices need an extra setting, e.g. Sonoff TRVZB: sensor_select = external."},sync_with_calibration:{label:"Use calibration offset",hint:"On: adjust the device's offset. Off: send the room temperature.",info:"Offset mode works with most TRVs (local_temperature_calibration). Direct mode needs a device that accepts an external temperature."},proportional_function:{label:"Algorithm",hint:"TPI is built in. Other algorithms are separate plugins.",info:"Only TPI ships with Versatile Thermostat. Other algorithms, such as **SmartPI** (learns the room; recommended by VT's author), are separate plugins you install first (versatile-thermostat.org/en/plugins). Once installed, they appear in this list."},cycle_min:{label:"Cycle length (min)",hint:"5 minutes suits most rooms; longer for slow heating.",info:"Every cycle VT works out how much heat the room needs and, for switches, keeps the heater on for that share of the cycle. Short cycles react faster but switch more often; slow heating (underfloor, storage heaters) needs longer cycles. Too short and the heater never warms up.",diagram:"tpi_cycle"},tpi_coef_int:{label:"Room gap factor (coef_int)",hint:"Higher: catches up faster. Lower if it overshoots.",info:"Heating share = coef_int \xD7 (target \u2212 room) + coef_ext \xD7 (target \u2212 outdoor). Reaching the target too slowly: raise it. Oscillating around the target: lower it. Default 0.6.",diagram:"tpi_formula"},tpi_coef_ext:{label:"Outdoor factor (coef_ext)",hint:"Raise if the room settles below target.",info:"Compensates heat lost to the outside. Settles below the target: raise it. Settles above: lower it. Default 0.01.",diagram:"tpi_formula"},minimal_activation_delay:{label:"Shortest on-time (s)",hint:"Shorter heating pulses are skipped.",info:"Avoids pulses too short for the heater to do anything. Default 10 s.",diagram:"min_on_off"},minimal_deactivation_delay:{label:"Shortest off-time (s)",hint:"Shorter pauses are skipped (stays on).",info:"Avoids flicking off for a few seconds. Default 0.",diagram:"min_on_off"},tpi_threshold_high:{label:"Stop heating above target + (\xB0)",hint:"0 = off. Needs the resume value too.",info:"If the room gets this much warmer than the target, heating stops completely until it falls below target + resume value. Both values must be set.",diagram:"tpi_thresholds"},tpi_threshold_low:{label:"Resume below target + (\xB0)",hint:"Must be smaller than the stop value.",info:"See 'Stop heating above target'.",diagram:"tpi_thresholds"},auto_tpi_learning_type:{label:"Learning type",hint:"Discovery for a new setup, Fine tuning to refine.",info:"Learning sessions take about 48 h and are started manually (service or Auto-TPI card). Discovery: fast, from scratch. Fine tuning: slow, small corrections."},auto_tpi_heating_rate:{label:"Heating rate (\xB0/h)",hint:"0 = measure it automatically.",info:"How fast the heater can warm the room at full power."},heater_heating_time:{label:"Warm-up time (min)",hint:"Time to reach full power, e.g. 5 for an electric radiator."},heater_cooling_time:{label:"Cool-down time (min)",hint:"Time to cool after stopping, e.g. 7 for an electric radiator."},auto_tpi_aggressiveness:{label:"Aggressiveness",hint:"Lower (e.g. 0.8) if it keeps overshooting.",info:"Scales the learned coefficients down. 1.0 = use them as learned."},auto_tpi_continuous_kext:{label:"Keep learning the outdoor factor",hint:"Slow background adjustment between sessions."},auto_tpi_enable_advanced_settings:{label:"Show learning parameters"},auto_tpi_avg_initial_weight:{label:"Weight of old values",hint:"1 = replace quickly, 50 = change slowly."},auto_tpi_ema_alpha:{label:"Alpha",hint:"Higher reacts faster to recent cycles."},auto_tpi_ema_decay_rate:{label:"Decay rate",hint:"Slows learning down over time."},auto_tpi_continuous_kext_alpha:{label:"Background learning speed",hint:"Default 0.04 \u2248 a few days to adapt."},use_presets_central_config:{label:"Use the central preset temperatures",hint:"Off: this room has its own Eco/Comfort/Boost temperatures.",info:"Preset temperatures are number entities on the thermostat, or on the central configuration when this is on."},use_central_mode:{label:"Follow the central mode switch",hint:"Lets one switch stop all rooms or set them to frost protection.",info:"The central configuration has a select (Auto, Stopped, Heat only, Cool only, Frost protection) that controls every thermostat with this on."},window_sensor_entity_id:{label:"Window sensor",hint:"A binary sensor or a group of them.",info:"For several windows, make a binary_sensor group."},window_delay:{label:"Wait before reacting (s)",hint:"Short airing does not stop the heating.",info:"The window must stay open this long before the action happens.",diagram:"window_delay"},window_off_delay:{label:"Wait after closing (s)",hint:"Empty: same as above.",info:"The window must stay closed this long before heating resumes.",diagram:"window_delay"},window_auto_open_threshold:{label:"Detect when falling faster than (\xB0/h)",hint:"Lower detects sooner, with more false alarms. Try 3.",info:"VT watches the temperature slope. A sudden drop beyond this rate counts as an open window. Not for hallways or rooms with normal big swings.",diagram:"window_slope"},window_auto_close_threshold:{label:"Consider closed when above (\xB0/h)",hint:"Usually 0: the temperature stops falling.",diagram:"window_slope"},window_auto_max_duration:{label:"Give up after (min)",hint:"Heating resumes even if it keeps cooling. Try 30\u201360.",diagram:"window_slope"},window_action:{label:"When open",hint:"Turn off, fan only, frost protection or eco.",info:"Frost protection and Eco change the target without changing the preset, so the preset shown can differ from the target."},motion_sensor_entity_id:{label:"Room presence sensor",hint:"A motion or occupancy (mmWave) sensor in this room.",info:`VT calls this feature "motion", but it only asks whether someone is in the room: on = someone there, off = empty. An occupancy sensor fits best; a motion sensor works too.

It only acts in the **Activity** preset, which appears once this card is set up. The preset stays Activity; only the target changes: the occupied preset's temperature while someone is there, the empty preset's once the room has been empty for a while. In Eco, Comfort, Boost or a manual temperature the sensor is ignored, so an explicitly chosen preset always wins.`},motion_preset:{label:"Temperature when occupied",diagram:"motion",hint:"The temperature of this preset is used; the selected preset stays Activity."},no_motion_preset:{label:"Temperature when empty",diagram:"motion",hint:"The temperature of this preset is used while the room is empty."},motion_delay:{label:"Occupied after (s)",hint:"Walking through does not count.",diagram:"motion"},motion_off_delay:{label:"Empty after (s)",diagram:"motion"},presence_sensor_entity_id:{label:"Home occupancy sensor",hint:"on/home = someone home, off/not_home = away.",info:"A person entity, or a binary sensor (a binary_sensor group works). A group of persons does not: VT's docs (French original too) recommend a template sensor for that. While away, the 'away' preset temperatures (separate entities) apply."},device_power:{label:"Device power",hint:"Total of all devices; same unit everywhere.",info:"Used for the energy sensors, load shedding and the central boiler."},power_unit:{label:"Unit"},power_sensor_entity_id:{label:"Home consumption sensor",hint:"Total power the home uses right now."},max_power_sensor_entity_id:{label:"Maximum allowed power sensor",hint:"Keep a margin below your main fuse.",info:"Not a safety feature: overload is still possible between sensor updates."},power_temp:{label:"Temperature while shedding"},safety_delay_min:{label:"Sensor silent for (min)",hint:"Then switch to a safe fixed power. Battery sensors: 120\u2013240.",info:"If no temperature arrives for this long, VT stops trusting the sensor. Set 'last seen' in Room to avoid false alarms.",diagram:"safety"},safety_default_on_percent:{label:"Fixed power during sensor loss",hint:"0.1 = 10 %. 0 risks freezing.",diagram:"safety"},safety_min_on_percent:{label:"Only when heating at least",hint:"0.5 = 50 %. Below this, sensor loss is ignored.",info:"A heater running low cannot overheat the room, so no need to react.",diagram:"safety"},manual_override_duration_min:{label:"Return to preset after a manual change (min)",hint:"0 = keep the manual temperature.",diagram:"override"},repair_incorrect_state:{label:"Resend ignored commands",hint:"For relays or valves that sometimes miss a command.",info:"Max 5 retries in a row; frequent repairs point to a hardware or network problem."},heating_failure_threshold:{label:"Heating hard means at least (%)",hint:"0.9 = 90 %.",diagram:"failure"},cooling_failure_threshold:{label:"Heating off means at most (%)",hint:"0 = 0 %.",diagram:"failure"},heating_failure_detection_delay:{label:"Alert after (min)",hint:"Raise for underfloor heating or large rooms.",diagram:"failure"},temperature_change_tolerance:{label:"Ignore changes smaller than (\xB0)",hint:"Filters sensor noise.",diagram:"failure"},failure_detection_enable_template:{label:"Only detect when (template)",hint:"Optional."},auto_start_stop_level:{label:"Reaction speed",hint:"Fast stops and restarts more often.",info:"Very slow \u2248 60 min between stop and restart, slow \u2248 30, medium \u2248 15, fast \u2248 7. Only restarts devices it stopped itself."},lock_users:{label:"Block changes from the UI",info:"Window actions, safety and load shedding keep working while locked."},lock_automations:{label:"Block automations and schedulers"},lock_code:{label:"PIN code",hint:"4 digits. Optional."},auto_relock_sec:{label:"Lock again after (s)",hint:"0 = stay unlocked."},"auto_regulation_dtemp@thermostat_over_valve":{label:"Smallest opening change sent (%)",hint:"Smaller changes are not sent to the valve.",info:"Limits how often the valve moves (noise, battery).",diagram:"send_threshold"},"auto_regulation_periode_min@thermostat_over_valve":{label:"Minimum time between valve updates (min)",info:"The valve gets a new opening at most this often.",diagram:"send_threshold"},"underlying_entity_ids@thermostat_over_switch":{label:"Devices to control",hint:"Several switches get shifted start times to smooth the power draw.",info:`**over_switch**: switch, input_boolean, select or climate entities.
**over_valve**: number entities that set the valve opening.
**over_climate**: climate entities.

With several switches each one still gets its full on-time; VT only shifts their start so fewer run at once (smoother power draw). At high demand they overlap.`,diagram:"stagger"}},diagrams:{tpi_cycle:{title:"Heating cycle",caption:"Each cycle, the heater runs for the share the algorithm asks for."},tpi_formula:{title:"How much to heat",caption:"Two stacked bars for an example: room gap \xD7 coef_int + outdoor gap \xD7 coef_ext = heating share, capped at 100 %."},tpi_thresholds:{title:"Stop and resume band",caption:"Temperature line above the target: crossing target+stop turns heating off, falling below target+resume turns it back on."},valve_curve:{title:"Requested vs sent opening",caption:"x: opening the algorithm wants, y: opening sent. Flat at the closed position until 'treat as closed', jumps to the minimum, rises, flattens at the maximum."},send_threshold:{title:"Only meaningful changes are sent",caption:"A wanted value wiggling, and the sent value as steps that only move when the change exceeds the threshold and enough time has passed."},window_delay:{title:"Window timeline",caption:"Window open bar; short opening below the wait: nothing; long opening: action after the wait, resumes after the closed wait."},window_slope:{title:"Temperature-drop detection",caption:"Temperature line with a sudden fall: slope beyond the threshold marks 'open', ends when the slope recovers or the max duration passes."},motion:{title:"Room presence timeline",caption:"A short pass does nothing; staying uses the occupied temperature; leaving returns to the empty temperature after the delay. The preset stays Activity."},safety:{title:"Sensor loss",caption:"Sensor report dots, then a gap longer than the delay: heating switches to the fixed power until a report arrives."},override:{title:"Manual change",caption:"Preset target line, a manual bump, back to the preset target after the duration."},failure:{title:"Heating failure",caption:"Heating share at \u2265 threshold for longer than the delay while temperature stays flat: alert."},correction:{title:"Setpoint correction",caption:"Room temp below target; the target sent to the device is raised by the correction, capped by strength."},stagger:{title:"Several heaters in one room",caption:"Each heater on for the same share of the cycle, start times shifted."},min_on_off:{title:"Shortest on- and off-time",caption:"Very short pulses are skipped; very short pauses keep heating."}},types:{thermostat_over_switch:{title:"Switch a heater on and off",body:"Versatile Thermostat turns the device on for part of each cycle, more when the room is colder.",examples:"Electric radiators, heating cables, relays, smart plugs, pilot-wire modules."},thermostat_over_valve:{title:"Set how far a valve opens",body:"Versatile Thermostat sends an opening percentage to the valve and adjusts it as the room warms up.",examples:"Radiator valves that expose their opening as a number (e.g. some Zigbee TRVs)."},thermostat_over_climate:{title:"Drive a device with its own thermostat",body:"The device regulates itself; Versatile Thermostat sets its target and corrects it using your room sensor.",examples:"Thermostatic radiator valves, air conditioners, heat pumps."},thermostat_central_config:{title:"Central configuration",body:"Shared defaults (outdoor sensor, presets, window and safety behaviour) that every VTherm can take over.",examples:"Create it first if you have several rooms."}},window:{question:"How should this room notice an open window?",off:"No detection",sensor:"Window sensor",drop:"Temperature drop"},presets:{preset:"Preset",normal:"Normal",away:"Away",cool:"Cooling",cool_away:"Cooling, away",frost:"Frost protection",eco:"Eco",comfort:"Comfort",boost:"Boost",from_central:"These temperatures come from the central configuration and apply to every thermostat that uses it.",saved_now:"Changes here apply immediately.",pending:"Save first: the thermostat creates its own preset temperatures when it stops using the central ones."},ui:{panel_title:"Versatile Thermostat",save:"Save",create:"Create",unsaved:"Unsaved changes",required_empty:"{n} required empty",saved:"Saved. The thermostat has been reloaded.",not_saved_incomplete:"Not saved: some required settings are still empty. They are marked in the index.",not_saved_rejected:"Not saved: Versatile Thermostat rejected a setting. It is marked below.",advanced:"Advanced settings",from_central:"From the central configuration",central_nothing:"Nothing set there, so Versatile Thermostat's defaults apply.",edit_central:"Edit the central configuration",override:"Override central configuration",state_off:"Off",state_error:"Error",state_empty:"{n} empty",state_central:"Central",turn_on:"Turn on",turn_off:"Turn off",new:"New",new_vtherm:"New VTherm",choose_type:"Choose a type",shared_defaults:"Shared defaults",no_climate:"No climate entity",not_loaded:"Not loaded",thermostats:"Thermostats",chooser_question:"What does this thermostat control?",chooser_no_central:"No central configuration yet. With several rooms, create it first: every thermostat can then take over its defaults.",empty:"No Versatile Thermostats yet. Use \u201CNew\u201D above to create the first one.",discard:"Discard the unsaved changes on this thermostat?",sections:"Sections",more_info:"More information"}};var ut={cards:{room:{title:"Pi\xE8ce",subtitle:"Le nom du thermostat et ce qu'il mesure."},devices:{title:"\xC9quipements",subtitle:"Les radiateurs, vannes ou climatiseurs pilot\xE9s."},correction:{title:"Correction de consigne",subtitle:"Le capteur int\xE9gr\xE9 de l'appareil est pr\xE8s de la chaleur : VT monte ou baisse la consigne envoy\xE9e jusqu'\xE0 ce que le capteur de la pi\xE8ce atteigne votre temp\xE9rature."},heating:{title:"R\xE9gulation",subtitle:"Combien et \xE0 quelle fr\xE9quence chauffer."},presets:{title:"Presets",subtitle:"La temp\xE9rature de chaque preset."},window:{title:"Fen\xEAtre ouverte",subtitle:"Ce qui se passe quand une fen\xEAtre s'ouvre."},motion:{title:"Pr\xE9sence dans la pi\xE8ce",subtitle:"En preset Activit\xE9, la pi\xE8ce prend la temp\xE9rature d'un preset quand quelqu'un est l\xE0 et celle d'un autre quand elle est vide. Le preset reste Activit\xE9 ; les autres presets ignorent le capteur."},presence:{title:"Absence du domicile",subtitle:"Baisser la temp\xE9rature quand personne n'est l\xE0, avec une entit\xE9 person ou un capteur de pr\xE9sence."},power:{title:"Puissance et \xE9nergie",subtitle:"Consommation de l'\xE9quipement et d\xE9lestage."},boiler:{title:"Chaudi\xE8re centrale",subtitle:"Allumer la chaudi\xE8re quand un thermostat demande de la chaleur."},safety:{title:"Capteur perdu et changements manuels",subtitle:"Que faire quand le thermom\xE8tre se tait, et combien de temps dure un changement manuel."},auto_start_stop:{title:"Arr\xEAt/d\xE9marrage auto",subtitle:"\xC9teindre le climatiseur quand il n'est pas utile."},lock:{title:"Verrouillage",subtitle:"Emp\xEAcher les personnes ou automatisations de modifier ce thermostat."},other:{title:"Autres",subtitle:"R\xE9glages que cette page ne place pas encore."}},groups:{range:"Capteur ext\xE9rieur et plage de temp\xE9rature",valve:"Contr\xF4le direct de la vanne",valve_limits:"Commandes de la vanne",sync:"Synchroniser la temp\xE9rature interne de l'appareil",tpi:"Coefficients TPI",auto_tpi:"Apprentissage Auto-TPI",window_behaviour:"Ce qui se passe",motion_detect:"Capteur",motion_behaviour:"Ce qui se passe",shedding:"D\xE9lestage",failure:"D\xE9tection de panne de chauffe"},fields:{name:{label:"Nom",info:"Nom du thermostat et de son entit\xE9 climate."},temperature_sensor_entity_id:{label:"Capteur de temp\xE9rature de la pi\xE8ce",hint:"L\xE0 o\xF9 l'on vit, loin des fen\xEAtres et du radiateur.",info:"La temp\xE9rature que VT r\xE9gule. Placez-le au milieu de la pi\xE8ce : pr\xE8s d'une fen\xEAtre il r\xE9agit aux courants d'air, pr\xE8s du radiateur il lit trop chaud et la pi\xE8ce reste froide."},humidity_sensor_entity_id:{label:"Capteur d'humidit\xE9",hint:"Facultatif. Affich\xE9 sur le thermostat, sans effet sur le chauffage.",info:"Expose l'humidit\xE9 sur le thermostat ; la r\xE9gulation n'en tient pas compte. Si l'appareil du capteur de temp\xE9rature mesure aussi l'humidit\xE9, le panneau propose ce capteur."},last_seen_temperature_sensor_entity_id:{label:"Dernier contact du capteur",hint:"Facultatif. \xC9vite les fausses alertes des capteurs qui n'envoient que les changements.",info:"Une entit\xE9 date/heure indiquant le dernier contact du capteur de temp\xE9rature (\xAB last_seen \xBB sur beaucoup de capteurs Zigbee). Un capteur sur pile reste muet tant que la temp\xE9rature ne bouge pas ; sans cette entit\xE9, VT peut croire qu'il est en panne et passer en mode capteur perdu.",diagram:"safety"},external_temperature_sensor_entity_id:{label:"Capteur de temp\xE9rature ext\xE9rieure",hint:"Pour chauffer plus quand il fait froid dehors.",info:"Alimente la partie ext\xE9rieure du calcul (coef_ext). S'il ne r\xE9pond plus, le mode capteur perdu peut aussi se d\xE9clencher, sauf si c'est d\xE9sactiv\xE9 dans configuration.yaml."},temp_min:{label:"Temp\xE9rature minimale r\xE9glable",info:"Le thermostat refuse une consigne plus basse. 7 \xB0C par d\xE9faut."},temp_max:{label:"Temp\xE9rature maximale r\xE9glable",info:"Le thermostat refuse une consigne plus haute. 35 \xB0C par d\xE9faut."},step_temperature:{label:"Pas de r\xE9glage",info:"Ce que change un appui sur +/\u2212. 0,1 \xB0C par d\xE9faut."},underlying_entity_ids:{label:"\xC9quipements pilot\xE9s",info:`**over_switch** : entit\xE9s switch, input_boolean, select ou climate.
**over_valve** : entit\xE9s number qui r\xE8glent l'ouverture de la vanne.
**over_climate** : entit\xE9s climate.`},ac_mode:{label:"Climatisation",hint:"L'appareil peut refroidir.",info:"over_switch / over_valve : seul le froid est propos\xE9. over_climate : chaud et froid si l'appareil les g\xE8re. Ajoute les presets de climatisation."},inverse_switch_command:{label:"Commande invers\xE9e",hint:"Pour les modules fil pilote avec diode.",info:"Allum\xE9 signifie radiateur \xE9teint et inversement. N\xE9cessaire pour certains montages fil pilote avec diode."},heater_keep_alive:{label:"Intervalle de maintien (s)",hint:"Renvoie l'\xE9tat r\xE9guli\xE8rement. Vide : d\xE9sactiv\xE9.",info:"Certains appareils s'\xE9teignent seuls s'ils ne re\xE7oivent rien. VT r\xE9p\xE8te alors la commande marche/arr\xEAt \xE0 cet intervalle."},on_command_text:{label:"Commandes marche/arr\xEAt personnalis\xE9es",hint:"N\xE9cessaires si un \xE9quipement n'est pas un simple switch.",info:"Format commande[/attribut[:valeur]], une par \xE9quipement, dans le m\xEAme ordre. Exemples : select_option/option:comfort, set_hvac_mode/hvac_mode:heat. Les switch utilisent turn_on / turn_off."},used_by_controls_central_boiler:{label:"Chauff\xE9e par la chaudi\xE8re centrale",hint:"Allume la chaudi\xE8re quand cette pi\xE8ce demande de la chaleur.",info:"Compte les \xE9quipements de ce thermostat pour la chaudi\xE8re centrale (r\xE9gl\xE9e dans la configuration centrale). Les pi\xE8ces chauff\xE9es \xE0 l'\xE9lectricit\xE9 restent en g\xE9n\xE9ral d\xE9sactiv\xE9es."},auto_fan_mode:{label:"Ventilation renforc\xE9e loin de la consigne",info:"Fait tourner le ventilateur \xE0 ce niveau tant que la pi\xE8ce est loin de la consigne, pour r\xE9partir la chaleur plus vite."},auto_regulation_dtemp:{label:"Plus petit changement envoy\xE9 (\xB0)",hint:"Les changements plus petits ne sont pas envoy\xE9s.",info:"Limite les commandes (bruit, piles). Avec une vanne Sonoff TRVZB, gardez au moins 3 %, sinon elle peut perdre son calibrage.",diagram:"send_threshold"},auto_regulation_periode_min:{label:"D\xE9lai minimum entre deux envois (min)",info:"Une nouvelle valeur est envoy\xE9e au plus \xE0 cette fr\xE9quence.",diagram:"send_threshold"},opening_threshold_degree:{label:"Consid\xE9r\xE9e ferm\xE9e en dessous de (%)",hint:"Une ouverture demand\xE9e plus petite ferme la vanne.",info:"En dessous, la demande compte comme \xAB pas de chauffe \xBB : la vanne va \xE0 sa position la plus ferm\xE9e et la pi\xE8ce ne compte pas comme chauffante (y compris pour la chaudi\xE8re).",diagram:"valve_curve"},min_opening_degrees:{label:"Ouverture minimale en chauffe (%)",hint:"Une valeur par vanne, s\xE9par\xE9es par des virgules.",info:"D\xE8s qu'il faut chauffer, la vanne s'ouvre au moins \xE0 ce niveau. Utile pour les vannes avec une zone morte. Exemple : 15 ou \xAB 15, 20 \xBB.",diagram:"valve_curve"},max_opening_degrees:{label:"Ouverture maximale (%)",hint:"Une valeur par vanne, s\xE9par\xE9es par des virgules.",info:"La vanne ne s'ouvre jamais plus. Limite le d\xE9bit, par exemple pour \xE9quilibrer les radiateurs. Doit d\xE9passer l'ouverture minimale.",diagram:"valve_curve"},max_closing_degree:{label:"Fermeture maximale (%)",hint:"100 = enti\xE8rement ferm\xE9e.",info:"En dessous de 100, un peu d'eau circule toujours, par exemple 90 garde 10 % d'ouverture (plus silencieux, prot\xE8ge le circulateur).",diagram:"valve_curve"},auto_regulation_mode:{label:"Force de la correction",hint:"Commencez par L\xE9g\xE8re, augmentez seulement si la consigne n'est pas atteinte.",info:"L'appareil r\xE9gule sur son propre capteur, souvent pr\xE8s de la source de chaleur. VT d\xE9cale la consigne envoy\xE9e pour que le capteur de la pi\xE8ce atteigne votre temp\xE9rature. L\xE9g\xE8re : jusqu'\xE0 1,5 \xB0, Moyenne : 2 \xB0, Forte : 3 \xB0. Expert utilise configuration.yaml. \xAB Contr\xF4le direct de la vanne \xBB r\xE8gle l'ouverture lui-m\xEAme. Plus de correction = plus d'\xE9nergie et d'usure.",diagram:"correction"},auto_regulation_use_device_temp:{label:"Compenser le capteur de l'appareil",hint:"Rarement utile. Essayez d'abord la correction.",info:"Ajoute (temp\xE9rature de l'appareil \u2212 temp\xE9rature de la pi\xE8ce) \xE0 la consigne. Exemple : pi\xE8ce 18 \xB0, appareil 22 \xB0 : VT envoie 4 \xB0 de plus pour que l'appareil chauffe vraiment."},opening_degree_entity_ids:{label:"Entit\xE9s d'ouverture de vanne",hint:"Une par \xE9quipement, dans le m\xEAme ordre.",info:"Les entit\xE9s number qui r\xE8glent l'ouverture de chaque vanne."},closing_degree_entity_ids:{label:"Entit\xE9s de fermeture de vanne",hint:"Facultatif. Toutes ou aucune.",info:"Si la vanne a aussi une entit\xE9 de fermeture, VT la r\xE8gle \xE0 100 \u2212 ouverture."},sync_entity_ids:{label:"Entit\xE9s \xE0 synchroniser",hint:"Une par \xE9quipement, dans le m\xEAme ordre.",info:"L'entit\xE9 de calibrage de l'appareil (mode d\xE9calage) ou son entr\xE9e de temp\xE9rature externe (mode direct). Certains appareils demandent un r\xE9glage en plus, par ex. Sonoff TRVZB : sensor_select = external."},sync_with_calibration:{label:"Utiliser le d\xE9calage de calibrage",hint:"Oui : ajuste le d\xE9calage de l'appareil. Non : envoie la temp\xE9rature de la pi\xE8ce.",info:"Le mode d\xE9calage marche avec la plupart des vannes (local_temperature_calibration). Le mode direct demande un appareil qui accepte une temp\xE9rature externe."},proportional_function:{label:"Algorithme",hint:"TPI est int\xE9gr\xE9. Les autres algorithmes sont des plugins \xE0 part.",info:"Seul TPI est fourni avec Versatile Thermostat. Les autres algorithmes, comme **SmartPI** (apprend la pi\xE8ce ; recommand\xE9 par l'auteur de VT), sont des plugins \xE0 installer d'abord (versatile-thermostat.org/fr/plugins). Une fois install\xE9s, ils apparaissent dans cette liste."},cycle_min:{label:"Dur\xE9e du cycle (min)",hint:"5 minutes conviennent \xE0 la plupart des pi\xE8ces ; plus pour un chauffage lent.",info:"\xC0 chaque cycle, VT calcule la chaleur n\xE9cessaire et, pour un interrupteur, garde le radiateur allum\xE9 pendant cette part du cycle. Des cycles courts r\xE9agissent plus vite mais commutent plus souvent ; un chauffage lent (plancher, accumulation) veut des cycles plus longs. Trop court, le radiateur ne chauffe jamais vraiment.",diagram:"tpi_cycle"},tpi_coef_int:{label:"Facteur \xE9cart pi\xE8ce (coef_int)",hint:"Plus haut : rattrape plus vite. Baissez s'il d\xE9passe.",info:"Part de chauffe = coef_int \xD7 (consigne \u2212 pi\xE8ce) + coef_ext \xD7 (consigne \u2212 ext\xE9rieur). Consigne atteinte trop lentement : augmentez. Oscillations : baissez. 0,6 par d\xE9faut.",diagram:"tpi_formula"},tpi_coef_ext:{label:"Facteur ext\xE9rieur (coef_ext)",hint:"Augmentez si la pi\xE8ce se stabilise sous la consigne.",info:"Compense les pertes vers l'ext\xE9rieur. Stabilis\xE9e en dessous : augmentez. Au-dessus : baissez. 0,01 par d\xE9faut.",diagram:"tpi_formula"},minimal_activation_delay:{label:"Dur\xE9e de marche minimale (s)",hint:"Les impulsions plus courtes sont ignor\xE9es.",info:"\xC9vite des impulsions trop courtes pour \xEAtre utiles. 10 s par d\xE9faut.",diagram:"min_on_off"},minimal_deactivation_delay:{label:"Dur\xE9e d'arr\xEAt minimale (s)",hint:"Les pauses plus courtes sont ignor\xE9es (reste allum\xE9).",info:"\xC9vite de couper quelques secondes seulement. 0 par d\xE9faut.",diagram:"min_on_off"},tpi_threshold_high:{label:"Arr\xEAt au-dessus de consigne + (\xB0)",hint:"0 = d\xE9sactiv\xE9. Il faut aussi la valeur de reprise.",info:"Si la pi\xE8ce d\xE9passe la consigne de cette valeur, la chauffe s'arr\xEAte compl\xE8tement jusqu'\xE0 redescendre sous consigne + reprise. Les deux valeurs sont n\xE9cessaires.",diagram:"tpi_thresholds"},tpi_threshold_low:{label:"Reprise sous consigne + (\xB0)",hint:"Doit \xEAtre plus petite que la valeur d'arr\xEAt.",info:"Voir \xAB Arr\xEAt au-dessus de consigne \xBB.",diagram:"tpi_thresholds"},auto_tpi_learning_type:{label:"Type d'apprentissage",hint:"D\xE9couverte pour une nouvelle installation, Affinage pour peaufiner.",info:"Une session dure environ 48 h et se lance \xE0 la main (service ou carte Auto-TPI). D\xE9couverte : rapide, depuis z\xE9ro. Affinage : lent, petites corrections."},auto_tpi_heating_rate:{label:"Vitesse de chauffe (\xB0/h)",hint:"0 = mesur\xE9e automatiquement.",info:"La vitesse \xE0 laquelle le radiateur chauffe la pi\xE8ce \xE0 pleine puissance."},heater_heating_time:{label:"Temps de mont\xE9e (min)",hint:"Temps pour atteindre la pleine puissance, ex. 5 pour un radiateur \xE9lectrique."},heater_cooling_time:{label:"Temps de refroidissement (min)",hint:"Temps pour refroidir apr\xE8s l'arr\xEAt, ex. 7 pour un radiateur \xE9lectrique."},auto_tpi_aggressiveness:{label:"Agressivit\xE9",hint:"Baissez (ex. 0,8) en cas de d\xE9passements r\xE9p\xE9t\xE9s.",info:"R\xE9duit les coefficients appris. 1,0 = tels qu'appris."},auto_tpi_continuous_kext:{label:"Apprentissage continu du facteur ext\xE9rieur",hint:"Ajustement lent en arri\xE8re-plan entre les sessions."},auto_tpi_enable_advanced_settings:{label:"Afficher les param\xE8tres d'apprentissage"},auto_tpi_avg_initial_weight:{label:"Poids des anciennes valeurs",hint:"1 = remplace vite, 50 = change lentement."},auto_tpi_ema_alpha:{label:"Alpha",hint:"Plus haut : r\xE9agit plus vite aux derniers cycles."},auto_tpi_ema_decay_rate:{label:"Taux de d\xE9croissance",hint:"Ralentit l'apprentissage avec le temps."},auto_tpi_continuous_kext_alpha:{label:"Vitesse de l'apprentissage continu",hint:"0,04 par d\xE9faut \u2248 quelques jours pour s'adapter."},use_presets_central_config:{label:"Utiliser les temp\xE9ratures de la configuration centrale",hint:"Non : cette pi\xE8ce a ses propres temp\xE9ratures \xC9co/Confort/Boost.",info:"Les temp\xE9ratures des presets sont des entit\xE9s number du thermostat, ou de la configuration centrale quand ceci est activ\xE9."},use_central_mode:{label:"Suivre le mode central",hint:"Un seul r\xE9glage peut arr\xEAter toutes les pi\xE8ces ou les mettre hors-gel.",info:"La configuration centrale a un select (Auto, Arr\xEAt, Chauffage seul, Froid seul, Hors-gel) qui pilote chaque thermostat o\xF9 ceci est activ\xE9."},window_sensor_entity_id:{label:"Capteur d'ouverture",hint:"Un binary_sensor ou un groupe.",info:"Pour plusieurs fen\xEAtres, cr\xE9ez un groupe de binary_sensor."},window_delay:{label:"Attente avant de r\xE9agir (s)",hint:"Une a\xE9ration courte n'arr\xEAte pas le chauffage.",info:"La fen\xEAtre doit rester ouverte ce temps avant l'action.",diagram:"window_delay"},window_off_delay:{label:"Attente apr\xE8s fermeture (s)",hint:"Vide : m\xEAme valeur que ci-dessus.",info:"La fen\xEAtre doit rester ferm\xE9e ce temps avant la reprise.",diagram:"window_delay"},window_auto_open_threshold:{label:"D\xE9tecter une baisse plus rapide que (\xB0/h)",hint:"Plus bas d\xE9tecte plus t\xF4t, avec plus de fausses alertes. Essayez 3.",info:"VT surveille la pente de la temp\xE9rature. Une chute brutale au-del\xE0 de ce rythme compte comme une fen\xEAtre ouverte. Pas pour les couloirs ou les pi\xE8ces aux variations normales fortes.",diagram:"window_slope"},window_auto_close_threshold:{label:"Consid\xE9r\xE9e ferm\xE9e au-dessus de (\xB0/h)",hint:"En g\xE9n\xE9ral 0 : la temp\xE9rature ne baisse plus.",diagram:"window_slope"},window_auto_max_duration:{label:"Abandonner apr\xE8s (min)",hint:"Le chauffage reprend m\xEAme si \xE7a refroidit encore. Essayez 30 \xE0 60.",diagram:"window_slope"},window_action:{label:"Fen\xEAtre ouverte",hint:"Arr\xEAt, ventilation seule, hors-gel ou \xE9co.",info:"Hors-gel et \xC9co changent la consigne sans changer le preset : le preset affich\xE9 peut diff\xE9rer de la consigne."},motion_sensor_entity_id:{label:"Capteur de pr\xE9sence de la pi\xE8ce",hint:"Un capteur de mouvement ou de pr\xE9sence (mmWave) dans cette pi\xE8ce.",info:`VT appelle cette fonction \xAB mouvement \xBB, mais elle demande seulement si quelqu'un est dans la pi\xE8ce : on = occup\xE9e, off = vide. Un capteur de pr\xE9sence convient le mieux ; un capteur de mouvement fonctionne aussi.

Elle n'agit qu'en preset **Activit\xE9**, qui appara\xEEt une fois cette carte configur\xE9e. Le preset reste Activit\xE9 ; seule la consigne change : la temp\xE9rature du preset \xAB occup\xE9e \xBB tant que quelqu'un est l\xE0, celle du preset \xAB vide \xBB quand la pi\xE8ce est vide depuis un moment. En \xC9co, Confort, Boost ou en temp\xE9rature manuelle, le capteur est ignor\xE9 : un preset choisi explicitement l'emporte toujours.`},motion_preset:{label:"Temp\xE9rature pi\xE8ce occup\xE9e",diagram:"motion",hint:"La temp\xE9rature de ce preset est utilis\xE9e ; le preset s\xE9lectionn\xE9 reste Activit\xE9."},no_motion_preset:{label:"Temp\xE9rature pi\xE8ce vide",diagram:"motion",hint:"La temp\xE9rature de ce preset est utilis\xE9e tant que la pi\xE8ce est vide."},motion_delay:{label:"Occup\xE9e apr\xE8s (s)",hint:"Un simple passage ne compte pas.",diagram:"motion"},motion_off_delay:{label:"Vide apr\xE8s (s)",diagram:"motion"},presence_sensor_entity_id:{label:"Capteur de pr\xE9sence au domicile",hint:"on/home = quelqu'un, off/not_home = absent.",info:"Une entit\xE9 person ou un binary_sensor (un groupe de binary_sensor fonctionne). Un groupe de personnes ne fonctionne pas : la documentation de VT recommande un template. En absence, les temp\xE9ratures \xAB absent \xBB des presets s'appliquent."},device_power:{label:"Puissance de l'\xE9quipement",hint:"Total de tous les \xE9quipements ; m\xEAme unit\xE9 partout.",info:"Utilis\xE9e pour les capteurs d'\xE9nergie, le d\xE9lestage et la chaudi\xE8re centrale."},power_unit:{label:"Unit\xE9"},power_sensor_entity_id:{label:"Capteur de consommation du logement",hint:"Puissance totale consomm\xE9e en ce moment."},max_power_sensor_entity_id:{label:"Capteur de puissance maximale autoris\xE9e",hint:"Gardez une marge sous votre abonnement.",info:"Ce n'est pas une s\xE9curit\xE9 : un d\xE9passement reste possible entre deux mesures."},power_temp:{label:"Temp\xE9rature pendant le d\xE9lestage"},safety_delay_min:{label:"Capteur muet depuis (min)",hint:"Puis puissance fixe de s\xE9curit\xE9. Capteurs sur pile : 120 \xE0 240.",info:"Sans temp\xE9rature pendant ce temps, VT ne fait plus confiance au capteur. Renseignez \xAB dernier contact \xBB dans Pi\xE8ce pour \xE9viter les fausses alertes.",diagram:"safety"},safety_default_on_percent:{label:"Puissance fixe en capteur perdu",hint:"0,1 = 10 %. 0 risque le gel.",diagram:"safety"},safety_min_on_percent:{label:"Seulement si la chauffe d\xE9passe",hint:"0,5 = 50 %. En dessous, la perte du capteur est ignor\xE9e.",info:"Un radiateur qui chauffe peu ne peut pas surchauffer la pi\xE8ce : inutile de r\xE9agir.",diagram:"safety"},manual_override_duration_min:{label:"Retour au preset apr\xE8s un changement manuel (min)",hint:"0 = garder la temp\xE9rature manuelle.",diagram:"override"},repair_incorrect_state:{label:"Renvoyer les commandes ignor\xE9es",hint:"Pour les relais ou vannes qui ratent parfois une commande.",info:"5 essais de suite au maximum ; des r\xE9parations fr\xE9quentes signalent un probl\xE8me mat\xE9riel ou r\xE9seau."},heating_failure_threshold:{label:"Chauffe forte = au moins",hint:"0,9 = 90 %.",diagram:"failure"},cooling_failure_threshold:{label:"Chauffe coup\xE9e = au plus",hint:"0 = 0 %.",diagram:"failure"},heating_failure_detection_delay:{label:"Alerter apr\xE8s (min)",hint:"Augmentez pour un plancher chauffant ou une grande pi\xE8ce.",diagram:"failure"},temperature_change_tolerance:{label:"Ignorer les variations sous (\xB0)",hint:"Filtre le bruit du capteur.",diagram:"failure"},failure_detection_enable_template:{label:"D\xE9tecter seulement si (template)",hint:"Facultatif."},auto_start_stop_level:{label:"Vitesse de r\xE9action",hint:"Rapide arr\xEAte et red\xE9marre plus souvent.",info:"Tr\xE8s lent \u2248 60 min entre arr\xEAt et red\xE9marrage, lent \u2248 30, moyen \u2248 15, rapide \u2248 7. Ne red\xE9marre que les appareils qu'il a arr\xEAt\xE9s lui-m\xEAme."},lock_users:{label:"Bloquer les changements depuis l'interface",info:"Fen\xEAtres, s\xE9curit\xE9 et d\xE9lestage continuent de fonctionner."},lock_automations:{label:"Bloquer les automatisations et programmateurs"},lock_code:{label:"Code PIN",hint:"4 chiffres. Facultatif."},auto_relock_sec:{label:"Reverrouiller apr\xE8s (s)",hint:"0 = reste d\xE9verrouill\xE9."},"auto_regulation_dtemp@thermostat_over_valve":{label:"Plus petit changement d'ouverture envoy\xE9 (%)",hint:"Les changements plus petits ne sont pas envoy\xE9s \xE0 la vanne.",info:"Limite les mouvements de la vanne (bruit, piles).",diagram:"send_threshold"},"auto_regulation_periode_min@thermostat_over_valve":{label:"D\xE9lai minimum entre deux ouvertures (min)",info:"La vanne re\xE7oit une nouvelle ouverture au plus \xE0 cette fr\xE9quence.",diagram:"send_threshold"},"underlying_entity_ids@thermostat_over_switch":{label:"\xC9quipements pilot\xE9s",hint:"Plusieurs interrupteurs d\xE9marrent en d\xE9cal\xE9 pour lisser la puissance.",info:`**over_switch** : entit\xE9s switch, input_boolean, select ou climate.
**over_valve** : entit\xE9s number qui r\xE8glent l'ouverture de la vanne.
**over_climate** : entit\xE9s climate.

Avec plusieurs interrupteurs, chacun garde tout son temps de chauffe ; VT d\xE9cale seulement leurs d\xE9parts pour qu'ils soient moins souvent allum\xE9s ensemble. \xC0 forte demande, ils se chevauchent.`,diagram:"stagger"}},diagrams:{tpi_cycle:{title:"Cycle de chauffe",caption:"\xC0 chaque cycle, le radiateur chauffe pendant la part demand\xE9e."},tpi_formula:{title:"Combien chauffer",caption:"\xC9cart pi\xE8ce \xD7 coef_int + \xE9cart ext\xE9rieur \xD7 coef_ext."},tpi_thresholds:{title:"Bande d'arr\xEAt et de reprise",caption:"Arr\xEAt au-dessus de consigne + arr\xEAt, reprise sous consigne + reprise."},valve_curve:{title:"Ouverture demand\xE9e et envoy\xE9e",caption:"Ferm\xE9e sous le seuil, puis au moins l'ouverture minimale, au plus la maximale."},send_threshold:{title:"Seuls les vrais changements sont envoy\xE9s",caption:"La valeur envoy\xE9e ne bouge que si l'\xE9cart d\xE9passe le seuil."},window_delay:{title:"Chronologie fen\xEAtre",caption:"Une ouverture courte ne fait rien ; une longue d\xE9clenche l'action apr\xE8s l'attente."},window_slope:{title:"D\xE9tection par chute de temp\xE9rature",caption:"Une chute brutale marque \xAB ouverte \xBB jusqu'\xE0 ce que la pente remonte."},motion:{title:"Chronologie de pr\xE9sence",caption:"Un passage ne fait rien ; rester applique la temp\xE9rature \xAB occup\xE9e \xBB ; partir r\xE9tablit la temp\xE9rature \xAB vide \xBB apr\xE8s le d\xE9lai. Le preset reste Activit\xE9."},safety:{title:"Capteur perdu",caption:"Silence plus long que le d\xE9lai : puissance fixe jusqu'au retour d'une mesure."},override:{title:"Changement manuel",caption:"Retour \xE0 la consigne du preset apr\xE8s la dur\xE9e."},failure:{title:"Panne de chauffe",caption:"Chauffe forte plus longtemps que le d\xE9lai sans hausse de temp\xE9rature : alerte."},correction:{title:"Correction de consigne",caption:"La consigne envoy\xE9e monte tant que la pi\xE8ce est sous la consigne."},stagger:{title:"Plusieurs radiateurs dans une pi\xE8ce",caption:"M\xEAme part de cycle pour chacun, d\xE9parts d\xE9cal\xE9s."},min_on_off:{title:"Dur\xE9es de marche et d'arr\xEAt minimales",caption:"Les impulsions trop courtes sont ignor\xE9es ; les pauses trop courtes aussi (reste allum\xE9)."}},types:{thermostat_over_switch:{title:"Allumer et \xE9teindre un radiateur",body:"Versatile Thermostat allume l'appareil une partie de chaque cycle, plus longtemps quand la pi\xE8ce est froide.",examples:"Radiateurs \xE9lectriques, c\xE2bles chauffants, relais, prises connect\xE9es, modules fil pilote."},thermostat_over_valve:{title:"R\xE9gler l'ouverture d'une vanne",body:"Versatile Thermostat envoie un pourcentage d'ouverture \xE0 la vanne et l'ajuste pendant que la pi\xE8ce chauffe.",examples:"Vannes de radiateur qui exposent leur ouverture en number (certaines vannes Zigbee)."},thermostat_over_climate:{title:"Piloter un appareil qui a son propre thermostat",body:"L'appareil r\xE9gule lui-m\xEAme ; Versatile Thermostat r\xE8gle sa consigne et la corrige avec votre capteur de pi\xE8ce.",examples:"T\xEAtes thermostatiques, climatiseurs, pompes \xE0 chaleur."},thermostat_central_config:{title:"Configuration centrale",body:"R\xE9glages partag\xE9s (capteur ext\xE9rieur, presets, fen\xEAtres, s\xE9curit\xE9) que chaque VTherm peut reprendre.",examples:"\xC0 cr\xE9er en premier si vous avez plusieurs pi\xE8ces."}},window:{question:"Comment cette pi\xE8ce rep\xE8re-t-elle une fen\xEAtre ouverte ?",off:"Pas de d\xE9tection",sensor:"Capteur d'ouverture",drop:"Chute de temp\xE9rature"},presets:{preset:"Preset",normal:"Normal",away:"Absent",cool:"Climatisation",cool_away:"Climatisation, absent",frost:"Hors-gel",eco:"\xC9co",comfort:"Confort",boost:"Boost",from_central:"Ces temp\xE9ratures viennent de la configuration centrale et s'appliquent \xE0 tous les thermostats qui l'utilisent.",saved_now:"Les changements ici s'appliquent imm\xE9diatement.",pending:"Enregistrez d'abord : le thermostat cr\xE9e ses propres temp\xE9ratures quand il n'utilise plus celles de la configuration centrale."},ui:{panel_title:"Versatile Thermostat",save:"Enregistrer",create:"Cr\xE9er",unsaved:"Modifications non enregistr\xE9es",required_empty:"{n} obligatoire(s) vide(s)",saved:"Enregistr\xE9. Le thermostat a \xE9t\xE9 recharg\xE9.",not_saved_incomplete:"Non enregistr\xE9 : des r\xE9glages obligatoires sont encore vides. Ils sont signal\xE9s dans l'index.",not_saved_rejected:"Non enregistr\xE9 : Versatile Thermostat a refus\xE9 un r\xE9glage. Il est signal\xE9 ci-dessous.",advanced:"R\xE9glages avanc\xE9s",from_central:"Depuis la configuration centrale",central_nothing:"Rien n'y est r\xE9gl\xE9 : les valeurs par d\xE9faut de Versatile Thermostat s'appliquent.",edit_central:"Modifier la configuration centrale",override:"Remplacer la configuration centrale",state_off:"D\xE9sactiv\xE9",state_error:"Erreur",state_empty:"{n} vide(s)",state_central:"Centrale",turn_on:"Activer",turn_off:"D\xE9sactiver",new:"Nouveau",new_vtherm:"Nouveau VTherm",choose_type:"Choisir un type",shared_defaults:"R\xE9glages partag\xE9s",no_climate:"Pas d'entit\xE9 climate",not_loaded:"Non charg\xE9",thermostats:"Thermostats",chooser_question:"Que pilote ce thermostat ?",chooser_no_central:"Pas encore de configuration centrale. Avec plusieurs pi\xE8ces, cr\xE9ez-la d'abord : chaque thermostat pourra reprendre ses r\xE9glages.",empty:"Aucun Versatile Thermostat pour l'instant. Utilisez \xAB Nouveau \xBB ci-dessus pour cr\xE9er le premier.",discard:"Abandonner les modifications non enregistr\xE9es de ce thermostat ?",sections:"Sections",more_info:"Plus d'informations"}};var ht={en:L,fr:ut},z=L,Pe="en";function mt(s){Pe=(s??"en").split("-")[0],z=ht[Pe]??L}var Qt=()=>Pe in ht,Xt=(s,t)=>t?s.replace(/\{(\w+)\}/g,(e,r)=>String(t[r]??`{${r}}`)):s,f=(s,t)=>Xt(z.ui[s]??L.ui[s],t),Oe=s=>z.cards[s]??L.cards[s]??L.cards.other,ft=s=>z.groups[s]??L.groups[s],gt=s=>z.types[s]??L.types[s],ye=s=>z.window[s]??L.window[s],H=s=>z.presets[s]??L.presets[s],vt=s=>z.diagrams[s]??L.diagrams[s];function Ie(s,t){if(!Qt())return;let e=z.fields;return t&&e[`${s}@${t}`]||e[s]}var Jt="component.versatile_thermostat";async function yt(s){await Promise.all([s.loadBackendTranslation("config","versatile_thermostat"),s.loadBackendTranslation("selector","versatile_thermostat")])}function X(s,t,e){return s.localize(`${Jt}.${t}`,e)||""}var _t=(s,t,e,r)=>X(s,`config.step.${t}.data.${e}`,r)||e,bt=(s,t,e,r)=>X(s,`config.step.${t}.data_description.${e}`,r),ze=(s,t)=>X(s,`config.error.${t}`)||X(s,`options.error.${t}`)||t,ce=(s,t)=>X(s,`selector.thermostat_type.options.${t}`)||t,wt=s=>t=>X(s,`selector.${t}`);var K="thermostat_central_config",He="choose",de={thermostat_central_config:"mdi:cog-transfer",thermostat_over_switch:"mdi:toggle-switch-outline",thermostat_over_climate:"mdi:thermostat",thermostat_over_valve:"mdi:pipe-valve"},er={heating:"var(--state-climate-heat-color, #ff8100)",cooling:"var(--state-climate-cool-color, #2b9af9)",idle:"var(--secondary-text-color)",off:"var(--disabled-text-color, #888)"},U=class extends A{constructor(){super(...arguments);this.entries=[]}select(e){this.dispatchEvent(new CustomEvent("vtherm-open",{detail:e,bubbles:!0,composed:!0}))}render(){return o`
      <div class="row" role="tablist" aria-label=${f("thermostats")}>
        ${this.entries.map(e=>this.tile(e))}
        ${this.newType?o`<div class="tile selected new" role="tab" aria-selected="true">
              <ha-icon icon=${de[this.newType]??"mdi:plus"}></ha-icon>
              <div class="main">
                <div class="name">${f("new_vtherm")}</div>
                <div class="sub">${de[this.newType]?ce(this.hass,this.newType):f("choose_type")}</div>
              </div>
            </div>`:o`<button class="tile add" @click=${()=>this.select({newType:He})}>
              <ha-icon icon="mdi:plus"></ha-icon><span>${f("new")}</span>
            </button>`}
      </div>
    `}tile(e){let r=e.thermostat_type===K,i=e.climate_entity_id?this.hass.states[e.climate_entity_id]:void 0,a=i?.attributes.hvac_action??(i?.state==="off"?"off":void 0),n=this.hass.config?.unit_system?.temperature??"\xB0",c=i?.attributes.current_temperature,l=i?.attributes.temperature,h=e.entry_id===this.selected&&!this.newType;return o`<button
      class="tile ${h?"selected":""} ${r?"central":""}"
      role="tab"
      aria-selected=${h}
      style=${a?`--action: ${er[a]??"var(--secondary-text-color)"}`:""}
      @click=${()=>this.select({entryId:e.entry_id})}
    >
      <ha-icon icon=${de[e.thermostat_type]??"mdi:thermostat"}></ha-icon>
      <div class="main">
        <div class="name">${e.title}</div>
        ${r?o`<div class="sub">${f("shared_defaults")}</div>`:i?o`<div class="temps">
                  <span class="cur">${c??"\u2013"}${n}</span><span class="arrow">→</span><span>${l??"\u2013"}${n}</span>
                </div>
                <div class="sub">
                  <span class="dot"></span>${this.statusText(i)}
                </div>`:o`<div class="sub">${e.loaded?f("no_climate"):f("not_loaded")}</div>`}
      </div>
    </button>`}statusText(e){if(e.state==="off")return this.hass.formatEntityState?.(e)??"off";let r=e.attributes.hvac_action?this.hass.formatEntityAttributeValue?.(e,"hvac_action")??e.attributes.hvac_action:"",i=e.attributes.preset_mode&&e.attributes.preset_mode!=="none"?this.hass.formatEntityAttributeValue?.(e,"preset_mode")??e.attributes.preset_mode:"";return[r,i].filter(Boolean).join(" \xB7 ")||(this.hass.formatEntityState?.(e)??e.state)}};U.styles=P`
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
  `,p([y({attribute:!1})],U.prototype,"hass",2),p([y({attribute:!1})],U.prototype,"entries",2),p([y()],U.prototype,"selected",2),p([y()],U.prototype,"newType",2),U=p([O("vtherm-switcher")],U);var D=class extends A{constructor(){super(...arguments);this.types=[];this.hasCentral=!1}pick(e){this.dispatchEvent(new CustomEvent("vtherm-open",{detail:{newType:e},bubbles:!0,composed:!0}))}render(){let e=this.types.filter(i=>i!==K),r=this.hasCentral?e:[K,...e];return o`
      <h2>${f("chooser_question")}</h2>
      ${this.hasCentral?"":o`<p class="hint">${f("chooser_no_central")}</p>`}
      <div class="grid">
        ${r.map(i=>{let a=gt(i);return o`<button class="type ${i===K?"central":""}" @click=${()=>this.pick(i)}>
            <ha-icon icon=${de[i]}></ha-icon>
            <span class="title">${a?.title??i}</span>
            <span class="body">${a?.body??""}</span>
            <span class="examples">${a?.examples??""}</span>
          </button>`})}
      </div>
    `}};D.styles=P`
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
  `,p([y({attribute:!1})],D.prototype,"hass",2),p([y({attribute:!1})],D.prototype,"types",2),p([y({type:Boolean})],D.prototype,"hasCentral",2),D=p([O("vtherm-type-chooser")],D);var b=240,k=96,_="var(--primary-color)",m="var(--warning-color)",T="var(--secondary-text-color)",J="var(--divider-color)",d=(s,t,e,r="start",i=T)=>w`<text x=${s} y=${t} fill=${i} font-size="9" text-anchor=${r}>${e}</text>`,pe=(s,t=J,e="")=>w`<line x1="8" x2=${b-8} y1=${s} y2=${s} stroke=${t} stroke-width="1" stroke-dasharray=${e}></line>`,V=()=>w`<line x1="8" x2=${b-8} y1=${k-14} y2=${k-14} stroke=${T} stroke-width="1"></line>`,xt={tpi_cycle:()=>w`
    ${V()}
    ${[0,1,2,3].map(s=>w`<line x1=${8+s*74.6} x2=${8+s*74.6} y1="20" y2=${k-10} stroke=${J}></line>`)}
    <rect x="8" y="40" width="44.8" height="28" fill=${_} rx="2"></rect>
    <rect x="82.6" y="40" width="22.4" height="28" fill=${_} rx="2"></rect>
    <rect x="157.2" y="40" width="59.7" height="28" fill=${_} rx="2"></rect>
    ${d(30,34,"60 %","middle")}${d(94,34,"30 %","middle")}${d(187,34,"80 %","middle")}
    <line x1="8" x2="82.6" y1="14" y2="14" stroke=${m} stroke-width="2"></line>${d(88,17,"cycle length","start",m)}
    ${d(b-8,k-3,"time","end")}
  `,min_on_off:()=>w`
    ${V()}
    ${[0,1,2,3].map(s=>w`<line x1=${8+s*74.6} x2=${8+s*74.6} y1="24" y2=${k-10} stroke=${J}></line>`)}
    <rect x="8" y="44" width="4" height="26" fill="none" stroke=${m} stroke-dasharray="2 2"></rect>
    ${d(14,18,"pulse too short:","start",m)}${d(14,28,"stays off","start",m)}
    <rect x="82.6" y="44" width="37.3" height="26" fill=${_} rx="2"></rect>${d(101,40,"50 %","middle")}
    <rect x="157.2" y="44" width="68" height="26" fill=${_} rx="2"></rect>
    <rect x="225.2" y="44" width="6.6" height="26" fill=${m}></rect>
    ${d(b-8,18,"pause too short: stays on","end",m)}
    ${d(b-8,k-3,"time","end")}
  `,tpi_formula:()=>w`
    <rect x="8" y="30" width=${b-16} height="22" fill="none" stroke=${J} rx="3"></rect>
    <rect x="8" y="30" width=${(b-16)*.6} height="22" fill=${_} rx="3"></rect>
    <rect x=${8+(b-16)*.6} y="30" width=${(b-16)*.15} height="22" fill=${m}></rect>
    ${d(8,22,"room 1\xB0 below \xD7 coef_int 0.6 = 60 %","start",_)}
    ${d(8,68,"outside 15\xB0 colder \xD7 coef_ext 0.01 = 15 %","start",m)}
    ${d(8,84,"heats 75 % of each cycle (max 100 %)")}
  `,tpi_thresholds:()=>w`
    ${pe(72)}${pe(48,m,"3 3")}${pe(28,m,"3 3")}
    <rect x="96" y="20" width="76" height="60" fill=${m} opacity="0.1"></rect>
    <path d="M8 80 C 50 70, 80 30, 110 24 S 160 30, 180 54 S 220 66, 232 62" fill="none" stroke=${_} stroke-width="2"></path>
    ${d(b-8,69,"target","end")}${d(b-8,45,"+ resume","end",m)}${d(b-8,25,"+ stop","end",m)}
    ${d(134,92,"heating off","middle",m)}
  `,valve_curve:()=>w`
    <line x1="24" x2="24" y1="8" y2=${k-14} stroke=${T}></line>${V()}
    <line x1="24" x2=${b-8} y1="22" y2="22" stroke=${m} stroke-dasharray="3 3"></line>
    <path d="M24 ${k-14} L 96 ${k-14} L 96 60 L 196 22 L ${b-8} 22" fill="none" stroke=${_} stroke-width="2"></path>
    <line x1="96" x2="96" y1="60" y2=${k-14} stroke=${m} stroke-dasharray="3 3"></line>
    ${d(102,76,"closed below","start",m)}${d(92,58,"min opening","end",_)}${d(b-8,18,"max opening","end",m)}
    ${d(b-8,k-3,"requested \u2192","end")}${d(4,12,"sent \u2191")}
  `,send_threshold:()=>w`
    ${V()}
    <path d="M8 66 Q 30 60, 46 64 T 84 52 T 120 46 T 150 50 T 190 30 T 232 34" fill="none" stroke=${T} stroke-width="1.5" stroke-dasharray="3 2"></path>
    <path d="M8 66 H 84 V 50 H 186 V 32 H 232" fill="none" stroke=${_} stroke-width="2"></path>
    ${d(8,14,"wanted","start",T)}${d(60,14,"sent: only when the change is big enough","start",_)}
  `,window_delay:()=>w`
    ${d(8,14,"window")}
    <rect x="30" y="20" width="18" height="12" fill=${T} rx="2"></rect>
    <rect x="96" y="20" width="96" height="12" fill=${T} rx="2"></rect>
    ${d(8,52,"heating")}
    <rect x="8" y="58" width="122" height="12" fill=${_} rx="2"></rect>
    <rect x="212" y="58" width="20" height="12" fill=${_} rx="2"></rect>
    <line x1="96" x2="130" y1="40" y2="40" stroke=${m} stroke-width="2"></line>${d(113,50,"wait","middle",m)}
    <line x1="192" x2="212" y1="40" y2="40" stroke=${m} stroke-width="2"></line>${d(202,50,"wait","middle",m)}
    ${d(39,46,"too short","middle")}
  `,window_slope:()=>w`
    ${V()}
    <rect x="92" y="10" width="78" height=${k-24} fill=${m} opacity="0.12"></rect>
    <path d="M8 30 L 90 32 C 110 40, 120 66, 150 70 S 190 68, 232 66" fill="none" stroke=${_} stroke-width="2"></path>
    ${d(131,22,"open: drop faster","middle",m)}${d(131,32,"than the threshold","middle",m)}
    ${d(8,22,"room temperature","start",_)}${d(b-8,k-3,"time","end")}
  `,motion:()=>w`
    ${d(8,14,"someone in the room")}
    <rect x="24" y="20" width="10" height="10" fill=${T} rx="2"></rect>
    <rect x="70" y="20" width="90" height="10" fill=${T} rx="2"></rect>
    <path d="M8 76 H 100 V 50 H 200 V 76 H 232" fill="none" stroke=${_} stroke-width="2"></path>
    <line x1="70" x2="100" y1="40" y2="40" stroke=${m} stroke-width="2"></line>${d(85,46,"occupied","middle",m)}
    <line x1="160" x2="200" y1="40" y2="40" stroke=${m} stroke-width="2"></line>${d(180,46,"empty","middle",m)}
    ${d(104,62,"occupied temperature","start",_)}${d(8,90,"empty temperature (preset stays Activity)","start",_)}
  `,safety:()=>w`
    ${d(8,14,"sensor reports")}
    ${[14,34,54,74,204,224].map(s=>w`<circle cx=${s} cy="24" r="3" fill=${T}></circle>`)}
    <line x1="74" x2="150" y1="38" y2="38" stroke=${m} stroke-width="2"></line>${d(112,48,"silent longer than the delay","middle",m)}
    ${d(8,62,"heating")}
    <path d="M8 84 H 150 V 74 H 204 V 84" fill="none" stroke=${_} stroke-width="2"></path>
    <rect x="150" y="74" width="54" height="10" fill=${m} opacity="0.25"></rect>${d(177,70,"fixed %","middle",m)}
  `,override:()=>w`
    ${V()}
    <path d="M8 60 H 70 V 30 H 170 V 60 H 232" fill="none" stroke=${_} stroke-width="2"></path>
    <line x1="70" x2="170" y1="20" y2="20" stroke=${m} stroke-width="2"></line>${d(120,14,"override duration","middle",m)}
    ${d(8,54,"preset")}${d(74,44,"manual change","start",_)}${d(b-8,k-3,"time","end")}
  `,failure:()=>w`
    ${d(8,14,"heating share")}
    <path d="M8 40 H 40 V 22 H 232" fill="none" stroke=${_} stroke-width="2"></path>
    ${pe(28,m,"3 3")}${d(b-8,36,"threshold","end",m)}
    ${d(8,62,"room temperature")}
    <path d="M8 76 H 232" fill="none" stroke=${T} stroke-width="2"></path>
    <line x1="40" x2="170" y1="88" y2="88" stroke=${m} stroke-width="2"></line>${d(105,84,"delay","middle",m)}
    <circle cx="170" cy="76" r="5" fill=${m}></circle>${d(178,70,"alert","start",m)}
  `,correction:()=>w`
    ${V()}${pe(46,T,"3 3")}${d(b-8,42,"your target","end")}
    <path d="M8 76 C 60 74, 120 60, 232 48" fill="none" stroke=${T} stroke-width="2"></path>${d(8,70,"room")}
    <path d="M8 22 C 80 24, 160 34, 232 44" fill="none" stroke=${_} stroke-width="2"></path>${d(8,16,"sent to the device","start",_)}
  `,stagger:()=>w`
    ${V()}
    <line x1="8" x2="8" y1="16" y2=${k-14} stroke=${J}></line><line x1=${b-8} x2=${b-8} y1="16" y2=${k-14} stroke=${J}></line>
    ${d(8,12,"one cycle, 30 % each")}
    <rect x="8" y="24" width="67" height="18" fill=${_} rx="2"></rect>${d(80,37,"heater 1")}
    <rect x="80" y="52" width="67" height="18" fill=${_} rx="2"></rect>${d(152,65,"heater 2")}
  `};function $t(s){return s&&xt[s]?xt[s]():void 0}var kt=`0 0 ${b} ${k}`;function Me(s){if(s.selector)return s.selector;switch(s.type){case"boolean":return{boolean:{}};case"integer":return{number:{mode:"box",step:1}};case"float":return{number:{mode:"box",step:"any"}};case"select":return{select:{options:(s.options??[]).map(([t,e])=>({value:t,label:e}))}};default:return{text:{}}}}var tr=s=>s.split(/\*\*(.+?)\*\*/g).map((t,e)=>e%2?o`<b>${t}</b>`:t),At=s=>Object.keys(Me(s))[0],De=s=>Object.values(Me(s))[0]??{},ee=s=>At(s)==="boolean",Et=s=>De(s).multiple===!0,Ne=s=>Array.isArray(s)?s:s?[String(s)]:[],Ue=s=>Ne(De(s).domain),E=class extends A{constructor(){super(...arguments);this.label="";this.hint="";this.info="";this.error="";this.disabled=!1;this.editing=!1}emit(e){this.dispatchEvent(new CustomEvent("field-changed",{detail:{key:this.schema.name,value:e},bubbles:!0,composed:!0}))}place(e){let r=e.currentTarget;r.classList.toggle("flip",r.getBoundingClientRect().left>window.innerWidth-340)}infoButton(){let e=$t(this.diagram);if(!this.info&&!e)return u;let r=vt(this.diagram??"");return o`<span class="info" tabindex="0" aria-label=${f("more_info")} @mouseenter=${this.place} @focus=${this.place} @click=${i=>i.preventDefault()}>
      <ha-icon icon="mdi:information-outline"></ha-icon>
      <span class="tip" role="tooltip">
        ${e?o`<span class="diagram">
              ${r?o`<span class="dtitle">${r.title}</span>`:u}
              <svg viewBox=${kt} width="100%" role="img" aria-label=${r?.caption??""}>${e}</svg>
            </span>`:u}
        ${this.info?o`<span class="text">${tr(this.info)}</span>`:u}
      </span>
    </span>`}render(){let e=!!this.schema.required,r=o`<span class="label">${this.label}${e&&!ee(this.schema)?o`<span class="req">*</span>`:u}</span>`;return ee(this.schema)?o`<div class="tile bool">
        <label class="row ${this.disabled?"disabled":""}">
          <ha-switch .checked=${!!this.value} .disabled=${this.disabled} @change=${i=>this.emit(i.target.checked)}></ha-switch>
          <span class="label">${this.label}${this.infoButton()}</span>
        </label>
        ${this.hint?o`<div class="hint">${this.hint}</div>`:u} ${this.renderError()}
      </div>`:o`<div class="tile ${this.error?"has-error":""}">
      <div class="head">${r}${this.infoButton()}</div>
      ${this.control()} ${this.hint?o`<div class="hint">${this.hint}</div>`:u} ${this.renderError()}
    </div>`}renderError(){return this.error?o`<div class="error">${this.error}</div>`:u}control(){let e=De(this.schema);switch(At(this.schema)){case"number":return this.numberInput(e);case"text":return e.multiple?this.listInput():this.textInput();case"select":return this.selectInput(e);case"entity":return e.multiple?this.entityList():this.entityInput();default:return o`<ha-selector
          .hass=${this.hass}
          .selector=${Me(this.schema)}
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
      @change=${i=>{let a=i.target.value;this.emit(a===""?void 0:r?parseInt(a,10):Number(a))}}
    />`}textInput(){return o`<input
      class="in"
      type="text"
      .value=${this.value??""}
      ?disabled=${this.disabled}
      @change=${e=>this.emit(e.target.value===""?void 0:e.target.value)}
    />`}selectInput(e){let r=(e.options??[]).map(a=>typeof a=="string"?{value:a,label:a}:a),i=a=>e.translation_key&&this.localizeValue?.(`${e.translation_key}.options.${a.value}`)||a.label;return o`<select class="in" ?disabled=${this.disabled} @change=${a=>this.emit(a.target.value||void 0)}>
      ${this.schema.required?u:o`<option value="" ?selected=${!this.value}>–</option>`}
      ${r.map(a=>o`<option value=${a.value} ?selected=${a.value===this.value}>${i(a)}</option>`)}
    </select>`}candidates(){let e=Ue(this.schema);return Object.keys(this.hass.states).filter(r=>!e.length||e.includes(r.split(".")[0])).sort()}friendly(e){return this.hass.states[e]?.attributes.friendly_name}datalist(e){return o`<datalist id=${e}>
      ${this.candidates().map(r=>o`<option value=${r}>${this.friendly(r)??""}</option>`)}
    </datalist>`}entityInput(){let e=this.value??"",r=e&&!this.hass.states[e];return e&&!r&&!this.editing?o`<button class="in entity-shown" ?disabled=${this.disabled} title=${e} @click=${this.startEditing}>
        <span class="fname">${this.friendly(e)??e}</span><span class="eid">${e}</span>
      </button>`:o`<input
        class="in ${r?"warn":""}"
        list="opts"
        .value=${e}
        placeholder=${Ue(this.schema).join(", ")}
        ?disabled=${this.disabled}
        @change=${i=>this.emit(i.target.value.trim()||void 0)}
        @blur=${()=>this.editing=!1}
      />
      ${this.datalist("opts")}`}async startEditing(){this.editing=!0,await this.updateComplete;let e=this.renderRoot.querySelector("input");e?.focus(),e?.select()}entityList(){let e=Ne(this.value);return o`<div class="chips in">
        ${e.map((r,i)=>o`<span class="chip ${this.hass.states[r]?"":"warn"}" title=${r}
            >${this.friendly(r)??r}
            ${this.disabled?u:o`<button aria-label="✕" @click=${()=>this.emit(e.filter((a,n)=>n!==i))}>✕</button>`}</span
          >`)}
        ${this.disabled?u:o`<input
              list="opts"
              placeholder="+ ${Ue(this.schema).join(", ")}"
              @change=${r=>{let i=r.target.value.trim();r.target.value="",i&&!e.includes(i)&&this.emit([...e,i])}}
            />`}
      </div>
      ${this.datalist("opts")}`}listInput(){let e=Ne(this.value);return o`<div class="chips in">
      ${e.map((r,i)=>o`<span class="chip mono"
          >${r}${this.disabled?u:o`<button aria-label="✕" @click=${()=>this.emit(e.filter((a,n)=>n!==i))}>✕</button>`}</span
        >`)}
      ${this.disabled?u:o`<input
            placeholder="+"
            @change=${r=>{let i=r.target.value.trim();r.target.value="",i&&this.emit([...e,i])}}
          />`}
    </div>`}};E.styles=P`
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
  `,p([y({attribute:!1})],E.prototype,"hass",2),p([y({attribute:!1})],E.prototype,"schema",2),p([y({attribute:!1})],E.prototype,"value",2),p([y()],E.prototype,"label",2),p([y()],E.prototype,"hint",2),p([y()],E.prototype,"info",2),p([y()],E.prototype,"diagram",2),p([y()],E.prototype,"error",2),p([y({type:Boolean})],E.prototype,"disabled",2),p([y({attribute:!1})],E.prototype,"localizeValue",2),p([$()],E.prototype,"editing",2),E=p([O("vt-field")],E);var Ve=s=>s==null||s===""||Array.isArray(s)&&s.length===0;function rr(s,t){return s.use_window_feature!==!0?"off":t&&t!=="off"?t:Ve(s.window_sensor_entity_id)&&!Ve(s.window_auto_open_threshold)?"drop":"sensor"}function sr(s,t,e,r){let{fields:i}=t;if(s.types&&!s.types.includes(e.thermostat_type))return null;let a=s.control,n=a?.type==="feature"&&a.key&&i[a.key]?a.key:void 0;if(n&&i[n].inherited)return null;let c=a?.type==="central"?a.key:a?.central,l=c&&i[c]?c:void 0,h=s.fields.filter(g=>i[g.key]&&!r.has(g.key)).map(g=>({...g,desc:i[g.key]}));return!h.length&&!n?null:{id:s.id,featureKey:n,featureOn:n?e[n]===!0:!0,centralKey:l,usesCentral:l?e[l]!==!1:!1,own:h.filter(g=>!g.desc.inherited),inherited:h.filter(g=>g.desc.inherited)}}function Ct(s,t,e){let{fields:r}=s,i=new Set(s.layout.control_keys),a=new Set,n=[],c=h=>{h.groups.filter(C=>!C.types||C.types.includes(t.thermostat_type)).forEach(C=>C.fields.forEach(j=>a.add(j.key)));let g=h.control?.key&&r[h.control.key]?h.control.key:void 0,v,S=new Set,q=!1;if(h.method){if(h.method.feature&&!r[h.method.feature])return;let C=rr(t,e);v={options:Object.keys(h.method.options),current:C},S=new Set(Object.entries(h.method.options).filter(([j])=>j!==C).flatMap(([,j])=>j)),q=C==="off"}let N=q?[]:h.groups.map(C=>sr(C,s,t,S)).filter(C=>!!C);if(!N.length&&!g&&!v&&!h.always)return;let je=new Set;N.forEach(C=>[...C.own,...C.inherited].forEach(j=>je.add(j.desc.step))),n.push({id:h.id,icon:h.icon??"mdi:dots-horizontal",featureKey:g,featureOn:g?t[g]===!0:!q,method:v,groups:N,steps:je})};s.layout.cards.forEach(c);let l=Object.keys(r).filter(h=>!a.has(h)&&!i.has(h));return l.length&&c({id:"other",groups:[{id:"other",control:null,fields:l.map(h=>({key:h,level:"common"}))}]}),n}var St=s=>s.featureOn&&s.groups.some(t=>t.featureOn&&t.own.some(e=>e.desc.schema.required&&e.level!=="advanced"&&!ee(e.desc.schema)));function Tt(s,t){let e={};for(let r of s){if(!r.featureOn)continue;let i=r.groups.filter(a=>a.featureOn).flatMap(a=>a.own).filter(a=>a.desc.schema.required&&Ve(t[a.key])).map(a=>a.key);i.length&&(e[r.id]=i)}return e}function qt(s,t){let e=s;for(let[r,i]of Object.entries(t.fields))!i.inherited&&i.schema.default!==void 0&&e[r]===void 0&&(e===s&&(e={...s}),e[r]=i.schema.default);return e}var ir=760,x=class extends A{constructor(){super(...arguments);this.narrow=!1;this.heading="";this.data={};this.dirty=!1;this.saving=!1;this.errors={};this.wide=!0;this.presets={own:{},central:{}};this.describeSeq=0;this.resizer=new ResizeObserver(([e])=>this.wide=e.contentRect.width>=ir)}connectedCallback(){super.connectedCallback(),this.resizer.observe(this)}disconnectedCallback(){this.resizer.disconnect(),super.disconnectedCallback()}willUpdate(e){(e.has("entryId")||e.has("newType"))&&this.hass&&this.load()}async load(){this.loadError=void 0,this.banner=void 0,this.errors={},this.dirty=!1,this.windowMethod=void 0,this.layout=void 0;try{if(Re(this.hass,this.entryId).then(e=>this.presets=e),this.entryId){let e=await lt(this.hass,this.entryId);this.heading=e.title,await this.applyLayout(e.data,e)}else if(this.newType){let e=await ct(this.hass,this.newType);this.heading=ce(this.hass,this.newType),await this.applyLayout(e.data,e)}}catch(e){this.loadError=e?.message??String(e)}}async applyLayout(e,r){for(let i=0;i<4;i++){let a=qt(e,r);if(a===e)break;e=a,r=await Le(this.hass,e)}this.data=e,this.layout=r}async change(e){let r={...this.data};for(let[n,c]of Object.entries(this.layout?.layout.derived_flags??{}))n in e&&(e={...e,[c]:!["",null,void 0].includes(e[n])});for(let[n,c]of Object.entries(e))c===void 0?delete r[n]:r[n]=c;this.data=r,this.dirty=!0;let i=++this.describeSeq,a=await Le(this.hass,r);i===this.describeSeq&&await this.applyLayout(this.data,a)}setWindowMethod(e){if(this.windowMethod=e,e==="off"){this.change({use_window_feature:!1});return}let r=a=>this.layout?.fields[a]&&!this.layout.fields[a].inherited,i=e==="drop"?["window_sensor_entity_id"]:["window_auto_open_threshold","window_auto_close_threshold","window_auto_max_duration"].filter(r);this.change({use_window_feature:!0,...Object.fromEntries(i.map(a=>[a,void 0]))})}async onSave(){this.saving=!0,this.banner=void 0,this.errors={};try{let e=await dt(this.hass,this.data,this.entryId);if(e.success)this.dirty=!1,this.banner={type:"success",text:f("saved")},this.dispatchEvent(new CustomEvent("vtherm-saved",{bubbles:!0,composed:!0})),setTimeout(()=>Re(this.hass,this.entryId).then(r=>this.presets=r),3e3),!this.entryId&&e.entry_id&&this.dispatchEvent(new CustomEvent("vtherm-created",{detail:{entryId:e.entry_id},bubbles:!0,composed:!0}));else if(e.incomplete)this.banner={type:"warning",text:f("not_saved_incomplete")};else{this.errors=e.errors,this.banner={type:"error",text:f("not_saved_rejected")};let r=Object.keys(e.errors)[0],i=this.cards().find(a=>a.steps.has(r));i&&this.updateComplete.then(()=>this.scrollToCard(i.id))}}catch(e){this.banner={type:"error",text:e?.message??String(e)}}finally{this.saving=!1}}cards(){return this.layout?Ct(this.layout,this.data,this.windowMethod):[]}scrollToCard(e){this.renderRoot.querySelector(`#card-${e}`)?.scrollIntoView({behavior:"smooth",block:"start"})}fieldErrors(){let e={};for(let r of Object.values(this.errors))for(let[i,a]of Object.entries(r))i!=="base"&&(e[i]=ze(this.hass,a));return e}render(){if(this.loadError)return o`<ha-alert alert-type="error">${this.loadError}</ha-alert>`;if(!this.layout)return o`<div class="loading"><ha-spinner></ha-spinner></div>`;let e=this.cards(),r=Tt(e,this.data),i=Object.values(r).reduce((n,c)=>n+c.length,0),a=this.fieldErrors();return o`
      <div class="toolbar">
        <div class="title">
          <div class="name">${this.data.name||this.heading}</div>
          <div class="sub">${ce(this.hass,this.data.thermostat_type)}${this.entryId?"":" \xB7 new"}</div>
        </div>
        ${i?o`<span class="chip warn">${f("required_empty",{n:i})}</span>`:u}
        ${this.dirty?o`<span class="chip">${f("unsaved")}</span>`:u}
        <ha-button .disabled=${this.saving||!this.dirty&&!!this.entryId} @click=${this.onSave}>
          ${this.entryId?f("save"):f("create")}
        </ha-button>
      </div>
      <div class="body ${this.wide?"wide":"narrow"}">
        ${this.renderIndex(e,r,a)}
        <div class="content">
          ${this.banner?o`<ha-alert alert-type=${this.banner.type}>${this.banner.text}</ha-alert>`:u}
          ${this.renderColumns(e,a,r)}
        </div>
      </div>
    `}cardHasError(e,r){return e.groups.flatMap(a=>a.own.map(n=>n.key)).some(a=>r[a])||[...e.steps].some(a=>this.errors[a]?.base)}renderIndex(e,r,i){return o`<nav class="index" aria-label=${f("sections")}>
      ${e.map(a=>{let n=Oe(a.id),c=o`<ha-icon class="ok" icon="mdi:check"></ha-icon>`;return a.featureOn?this.cardHasError(a,i)?c=o`<span class="state err">${f("state_error")}</span>`:r[a.id]?c=o`<span class="state warn">${f("state_empty",{n:r[a.id].length})}</span>`:a.groups.every(l=>l.centralKey&&l.usesCentral)&&(c=o`<span class="state">${f("state_central")}</span>`):c=o`<span class="state">${f("state_off")}</span>`,o`<button class=${a.featureOn?"":"off"} @click=${()=>this.scrollToCard(a.id)}>
          <ha-icon icon=${a.icon}></ha-icon><span class="label">${n.title}</span>${c}
        </button>`})}
    </nav>`}renderColumns(e,r,i){return o`<div class="col">${e.map(a=>this.renderCard(a,r,i))}</div>`}renderCard(e,r,i){let a=Oe(e.id),n=[...e.steps].map(c=>this.errors[c]?.base).filter(Boolean);return o`
      <section
        class="card ${e.featureOn?"":"off"} ${St(e)?"required":""} ${i[e.id]?"missing":""}"
        id="card-${e.id}"
      >
        <header>
          <ha-icon icon=${e.icon}></ha-icon>
          <div class="htext">
            <h2>${a.title}</h2>
            <p>${a.subtitle}</p>
          </div>
          ${e.featureKey?this.featureSwitch(e.featureKey,e.featureOn):u}
        </header>
        ${e.method?this.methodChoice(e.method):u}
        ${e.featureOn?o`
              ${n.map(c=>o`<ha-alert alert-type="error">${ze(this.hass,c)}</ha-alert>`)}
              ${e.groups.map(c=>this.renderGroup(c,r))}
              ${e.id==="presets"?this.presetTable():u}
            `:u}
      </section>
    `}renderGroup(e,r){let i=ft(e.id),a=e.own.filter(l=>l.level!=="advanced"),n=e.own.filter(l=>l.level==="advanced"),c=i||e.featureKey;return o`
      <div class="group">
        ${c?o`<div class="ghead">
              <h3>${i??""}</h3>
              ${e.featureKey?this.featureSwitch(e.featureKey,e.featureOn):u}
            </div>`:u}
        ${e.featureOn?o`
              ${e.centralKey?this.overrideToggle(e.centralKey,e.usesCentral):u}
              ${a.length?o`<div class="fields">${a.map(l=>this.field(l,r))}</div>`:u}
              ${e.inherited.length?this.inheritedBlock(e.inherited):u}
              ${n.length?o`<details class="adv">
                    <summary>${f("advanced")} <span class="count">${n.length}</span></summary>
                    <div class="fields">${n.map(l=>this.field(l,r))}</div>
                  </details>`:u}
            `:u}
      </div>
    `}label(e){return Ie(e.key,this.data.thermostat_type)?.label??_t(this.hass,e.desc.step,e.key,this.layout.placeholders)}field(e,r,i=!1){let a=this.layout.placeholders,n=Ie(e.key,this.data.thermostat_type),c=i?this.layout.central_values[e.key]:this.data[e.key];return o`<vt-field
      class=${ee(e.desc.schema)?"bool":Et(e.desc.schema)?"wide":""}
      .hass=${this.hass}
      .schema=${e.desc.schema}
      .value=${c}
      .label=${this.label(e)}
      .hint=${n?.hint??""}
      .info=${n?n.info??"":bt(this.hass,e.desc.step,e.key,a)}
      .diagram=${n?.diagram}
      .error=${i?"":r[e.key]??""}
      .disabled=${i}
      .localizeValue=${wt(this.hass)}
      @field-changed=${i?void 0:l=>this.change({[l.detail.key]:l.detail.value})}
    ></vt-field>`}inheritedBlock(e){let r=this.layout.placeholders,i=e.filter(n=>!["",null,void 0].includes(this.layout.central_values[n.key])),a=this.layout.central_entry_id;return o`<details class="inherited">
      <summary>
        <ha-icon icon="mdi:link-variant"></ha-icon>
        <span class="from">${f("from_central")}</span>
        ${i.length?o`<span class="values">${i.map(n=>o`<span class="kv"
                ><span class="k">${this.label(n)}</span>
                <span class="v">${this.formatValue(this.layout.central_values[n.key])}</span></span
              >`)}</span>`:o`<span class="values none">Nothing set there, so Versatile Thermostat's defaults apply.</span>`}
      </summary>
      <div class="fields">${e.map(n=>this.field(n,{},!0))}</div>
      ${a?o`<a class="central-link" href="?entry=${a}" @click=${n=>this.openCentral(n,a)}
            >${f("edit_central")}</a
          >`:u}
    </details>`}presetTable(){let e=this.data.thermostat_type==="thermostat_central_config",r=!e&&this.data.use_presets_central_config!==!1,i=r?this.presets.central:this.presets.own,a=[{id:"normal",suffix:""},...e||this.data.use_presence_feature?[{id:"away",suffix:"_away"}]:[],...e||this.data.ac_mode?[{id:"cool",suffix:"_ac"}]:[],...e||this.data.ac_mode&&this.data.use_presence_feature?[{id:"cool_away",suffix:"_ac_away"}]:[]],n=["frost","eco","comfort","boost"];if(!Object.keys(i).length)return o`<p class="note">${H("pending")}</p>`;let c=this.hass.config?.unit_system?.temperature??"\xB0";return o`
      <div class="presets" style="--cols: ${a.length}">
        <span class="ph">${H("preset")}</span>
        ${a.map(l=>o`<span class="ph">${H(l.id)}</span>`)}
        ${n.map(l=>o`
            <span class="pr">${H(l)}</span>
            ${a.map(h=>{let g=i[`${l}${h.suffix}_temp`],v=g?this.hass.states[g]:void 0;return v?r?o`<span class="pv">${v.state} ${c}</span>`:o`<span class="pv"
                    ><input
                      type="number"
                      .value=${v.state}
                      step=${v.attributes.step??.1}
                      min=${v.attributes.min??""}
                      max=${v.attributes.max??""}
                      aria-label="${H(l)} ${H(h.id)}"
                      @change=${S=>this.hass.callService("number","set_value",{entity_id:g,value:Number(S.target.value)})}
                    />
                    ${c}</span
                  >`:o`<span class="pv none">–</span>`})}
          `)}
      </div>
      <p class="note">
        ${r?H("from_central"):H("saved_now")}
        ${r&&this.layout?.central_entry_id?o`<a class="central-link" href="?entry=${this.layout.central_entry_id}" @click=${l=>this.openCentral(l,this.layout.central_entry_id)}
              >${f("edit_central")}</a
            >`:u}
      </p>
    `}openCentral(e,r){e.preventDefault(),this.dispatchEvent(new CustomEvent("vtherm-open",{detail:{entryId:r},bubbles:!0,composed:!0}))}formatValue(e){return typeof e=="boolean"?e?"on":"off":Array.isArray(e)?e.map(r=>this.formatValue(r)).join(", "):typeof e=="string"&&this.hass.states[e]?this.hass.states[e].attributes.friendly_name??e:String(e)}featureSwitch(e,r){return o`<ha-switch
      .checked=${r}
      aria-label=${r?f("turn_off"):f("turn_on")}
      @change=${i=>this.change({[e]:i.target.checked})}
    ></ha-switch>`}overrideToggle(e,r){return o`<label class="override">
      <ha-switch .checked=${!r} @change=${i=>this.change({[e]:!i.target.checked})}></ha-switch>
      <span>${f("override")}</span>
    </label>`}methodChoice(e){return o`<div class="question">${ye("question")}</div>
      <div class="seg wide" role="radiogroup" aria-label=${ye("question")}>
      ${e.options.map(r=>o`<button role="radio" aria-checked=${r===e.current} class=${r===e.current?"on":""} @click=${()=>this.setWindowMethod(r)}>
            ${ye(r)}
          </button>`)}
    </div>`}};x.styles=P`
    :host { display: block; --gap: 16px; }
    .loading { display: flex; justify-content: center; padding: 64px; }
    .toolbar {
      position: sticky; top: 0; max-width: 1100px; margin: 0 auto; box-sizing: border-box; z-index: 3; display: flex; align-items: center; gap: 12px;
      padding: 8px 16px; background: var(--app-header-background-color, var(--primary-background-color));
      border-bottom: 1px solid var(--divider-color);
    }
    .title { flex: 1; min-width: 0; }
    .name { font-size: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sub { color: var(--secondary-text-color); font-size: 13px; }
    .chip { font-size: 12px; padding: 2px 10px; border-radius: 12px; background: var(--secondary-background-color); color: var(--secondary-text-color); white-space: nowrap; }
    .chip.warn { background: rgba(var(--rgb-warning-color, 255, 166, 0), 0.18); color: var(--warning-color); }

    .body { display: grid; gap: var(--gap); padding: var(--gap); max-width: 1100px; margin: 0 auto; box-sizing: border-box; }
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
  `,p([y({attribute:!1})],x.prototype,"hass",2),p([y()],x.prototype,"entryId",2),p([y()],x.prototype,"newType",2),p([y({type:Boolean})],x.prototype,"narrow",2),p([$()],x.prototype,"heading",2),p([$()],x.prototype,"data",2),p([$()],x.prototype,"layout",2),p([$()],x.prototype,"windowMethod",2),p([$()],x.prototype,"dirty",2),p([$()],x.prototype,"saving",2),p([$()],x.prototype,"errors",2),p([$()],x.prototype,"banner",2),p([$()],x.prototype,"loadError",2),p([$()],x.prototype,"wide",2),p([$()],x.prototype,"presets",2),x=p([O("vtherm-editor")],x);function Lt(){let s=new URLSearchParams(window.location.search);return{entryId:s.get("entry")??void 0,newType:s.get("new")??void 0}}var R=class extends A{constructor(){super(...arguments);this.narrow=!1;this.ready=!1;this.entries=[];this.types=[];this.selection=Lt();this.onLocation=()=>this.selection=Lt()}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.onLocation),window.addEventListener("popstate",this.onLocation)}disconnectedCallback(){window.removeEventListener("location-changed",this.onLocation),window.removeEventListener("popstate",this.onLocation),super.disconnectedCallback()}async firstUpdated(){mt(this.hass.language),await Promise.all([pt(),yt(this.hass),this.refreshEntries()]),this.ready=!0}async refreshEntries(){let e=await ot(this.hass);this.entries=e.entries,this.types=e.thermostat_types}navigate(e){if(this.renderRoot.querySelector("vtherm-editor")?.dirty&&!confirm(f("discard")))return;let i=e.entryId?`?entry=${e.entryId}`:e.newType?`?new=${e.newType}`:"";history.pushState(null,"",`${window.location.pathname}${i}`),window.dispatchEvent(new CustomEvent("location-changed"))}effectiveSelection(){let{entryId:e,newType:r}=this.selection;return e||r?this.selection:{entryId:this.entries[0]?.entry_id}}render(){let e=this.effectiveSelection();return o`
      <div class="header">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="title">${f("panel_title")}</div>
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
            ${e.newType===He?o`<vtherm-type-chooser
                  .hass=${this.hass}
                  .types=${this.types}
                  .hasCentral=${this.entries.some(r=>r.thermostat_type===K)}
                  @vtherm-open=${r=>this.navigate(r.detail)}
                ></vtherm-type-chooser>`:e.entryId||e.newType?o`<vtherm-editor
                  .hass=${this.hass}
                  .narrow=${this.narrow}
                  .entryId=${e.entryId}
                  .newType=${e.newType}
                  @vtherm-open=${r=>this.navigate(r.detail)}
                  @vtherm-saved=${()=>this.refreshEntries()}
                  @vtherm-created=${async r=>{await this.refreshEntries(),this.navigate({entryId:r.detail.entryId})}}
                ></vtherm-editor>`:o`<div class="empty">${f("empty")}</div>`}
          `:o`<div class="loading"><ha-spinner></ha-spinner></div>`}
    `}};R.styles=P`
    :host { display: block; min-height: 100vh; background: var(--primary-background-color); color: var(--primary-text-color); }
    .header {
      display: flex; align-items: center; height: var(--header-height, 56px); padding: 0 12px; gap: 12px;
      background: var(--app-header-background-color); color: var(--app-header-text-color, var(--text-primary-color));
      border-bottom: var(--app-header-border-bottom, none);
    }
    .title { font-size: 20px; }
    .switcher { padding: 16px 16px 4px; max-width: 1100px; margin: 0 auto; }
    .loading, .empty { display: flex; justify-content: center; padding: 64px; color: var(--secondary-text-color); }
  `,p([y({attribute:!1})],R.prototype,"hass",2),p([y({type:Boolean})],R.prototype,"narrow",2),p([y({attribute:!1})],R.prototype,"panel",2),p([$()],R.prototype,"ready",2),p([$()],R.prototype,"entries",2),p([$()],R.prototype,"types",2),p([$()],R.prototype,"selection",2),R=p([O("vtherm-dashboard-panel")],R);export{R as VThermConfigPanel};
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
