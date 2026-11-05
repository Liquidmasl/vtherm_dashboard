var Ze=Object.defineProperty;var Qe=Object.getOwnPropertyDescriptor;var p=(i,t,e,r)=>{for(var s=r>1?void 0:r?Qe(t,e):t,n=i.length-1,o;n>=0;n--)(o=i[n])&&(s=(r?o(t,e,s):o(s))||s);return r&&s&&Ze(t,e,s),s};var V=globalThis,X=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,te=Symbol(),ve=new WeakMap,M=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(X&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=ve.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&ve.set(e,t))}return t}toString(){return this.cssText}},be=i=>new M(typeof i=="string"?i:i+"",void 0,te),_=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((r,s,n)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[n+1],i[0]);return new M(e,i,te)},$e=(i,t)=>{if(X)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),s=V.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)}},re=X?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return be(e)})(i):i;var{is:et,defineProperty:tt,getOwnPropertyDescriptor:rt,getOwnPropertyNames:st,getOwnPropertySymbols:it,getPrototypeOf:nt}=Object,J=globalThis,xe=J.trustedTypes,ot=xe?xe.emptyScript:"",at=J.reactiveElementPolyfillSupport,N=(i,t)=>i,D={toAttribute(i,t){switch(t){case Boolean:i=i?ot:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Y=(i,t)=>!et(i,t),we={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:Y};Symbol.metadata??=Symbol("metadata"),J.litPropertyMetadata??=new WeakMap;var k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=we){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&tt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){let{get:s,set:n}=rt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let a=s?.call(this);n?.call(this,o),this.requestUpdate(t,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??we}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let t=nt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let e=this.properties,r=[...st(e),...it(e)];for(let s of r)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)e.unshift(re(s))}else t!==void 0&&e.push(re(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $e(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let n=(r.converter?.toAttribute!==void 0?r.converter:D).toAttribute(e,r.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=r.getPropertyOptions(s),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:D;this._$Em=s;let a=o.fromAttribute(e,n.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,r,s=!1,n){if(t!==void 0){let o=this.constructor;if(s===!1&&(n=this[t]),r??=o.getPropertyOptions(t),!((r.hasChanged??Y)(n,e)||r.useDefault&&r.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:n},o){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,n]of r){let{wrapped:o}=n,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[N("elementProperties")]=new Map,k[N("finalized")]=new Map,at?.({ReactiveElement:k}),(J.reactiveElementVersions??=[]).push("2.1.2");var ce=globalThis,_e=i=>i,Z=ce.trustedTypes,ke=Z?Z.createPolicy("lit-html",{createHTML:i=>i}):void 0,Oe="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Pe="?"+S,lt=`<${Pe}>`,L=document,q=()=>L.createComment(""),B=i=>i===null||typeof i!="object"&&typeof i!="function",de=Array.isArray,ct=i=>de(i)||typeof i?.[Symbol.iterator]=="function",se=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ee=/-->/g,Ae=/>/g,O=RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Se=/'/g,Ce=/"/g,Le=/^(?:script|style|textarea|title)$/i,he=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=he(1),Et=he(2),At=he(3),I=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Re=new WeakMap,P=L.createTreeWalker(L,129);function Ie(i,t){if(!de(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ke!==void 0?ke.createHTML(t):t}var dt=(i,t)=>{let e=i.length-1,r=[],s,n=t===2?"<svg>":t===3?"<math>":"",o=j;for(let a=0;a<e;a++){let c=i[a],u,f,h=-1,y=0;for(;y<c.length&&(o.lastIndex=y,f=o.exec(c),f!==null);)y=o.lastIndex,o===j?f[1]==="!--"?o=Ee:f[1]!==void 0?o=Ae:f[2]!==void 0?(Le.test(f[2])&&(s=RegExp("</"+f[2],"g")),o=O):f[3]!==void 0&&(o=O):o===O?f[0]===">"?(o=s??j,h=-1):f[1]===void 0?h=-2:(h=o.lastIndex-f[2].length,u=f[1],o=f[3]===void 0?O:f[3]==='"'?Ce:Se):o===Ce||o===Se?o=O:o===Ee||o===Ae?o=j:(o=O,s=void 0);let x=o===O&&i[a+1].startsWith("/>")?" ":"";n+=o===j?c+lt:h>=0?(r.push(u),c.slice(0,h)+Oe+c.slice(h)+S+x):c+S+(h===-2?a:x)}return[Ie(i,n+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},K=class i{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let n=0,o=0,a=t.length-1,c=this.parts,[u,f]=dt(t,e);if(this.el=i.createElement(u,r),P.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=P.nextNode())!==null&&c.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Oe)){let y=f[o++],x=s.getAttribute(h).split(S),R=/([.?@])?(.*)/.exec(y);c.push({type:1,index:n,name:R[2],strings:x,ctor:R[1]==="."?ne:R[1]==="?"?oe:R[1]==="@"?ae:H}),s.removeAttribute(h)}else h.startsWith(S)&&(c.push({type:6,index:n}),s.removeAttribute(h));if(Le.test(s.tagName)){let h=s.textContent.split(S),y=h.length-1;if(y>0){s.textContent=Z?Z.emptyScript:"";for(let x=0;x<y;x++)s.append(h[x],q()),P.nextNode(),c.push({type:2,index:++n});s.append(h[y],q())}}}else if(s.nodeType===8)if(s.data===Pe)c.push({type:2,index:n});else{let h=-1;for(;(h=s.data.indexOf(S,h+1))!==-1;)c.push({type:7,index:n}),h+=S.length-1}n++}}static createElement(t,e){let r=L.createElement("template");return r.innerHTML=t,r}};function T(i,t,e=i,r){if(t===I)return t;let s=r!==void 0?e._$Co?.[r]:e._$Cl,n=B(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(i),s._$AT(i,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(t=T(i,s._$AS(i,t.values),s,r)),t}var ie=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??L).importNode(e,!0);P.currentNode=s;let n=P.nextNode(),o=0,a=0,c=r[0];for(;c!==void 0;){if(o===c.index){let u;c.type===2?u=new W(n,n.nextSibling,this,t):c.type===1?u=new c.ctor(n,c.name,c.strings,this,t):c.type===6&&(u=new le(n,this,t)),this._$AV.push(u),c=r[++a]}o!==c?.index&&(n=P.nextNode(),o++)}return P.currentNode=L,s}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},W=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=T(this,t,e),B(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==I&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ct(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&B(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=K.createElement(Ie(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new ie(s,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=Re.get(t.strings);return e===void 0&&Re.set(t.strings,e=new K(t)),e}k(t){de(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let n of t)s===e.length?e.push(r=new i(this.O(q()),this.O(q()),this,this.options)):r=e[s],r._$AI(n),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=_e(t).nextSibling;_e(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},H=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=d}_$AI(t,e=this,r,s){let n=this.strings,o=!1;if(n===void 0)t=T(this,t,e,0),o=!B(t)||t!==this._$AH&&t!==I,o&&(this._$AH=t);else{let a=t,c,u;for(t=n[0],c=0;c<n.length-1;c++)u=T(this,a[r+c],e,c),u===I&&(u=this._$AH[c]),o||=!B(u)||u!==this._$AH[c],u===d?t=d:t!==d&&(t+=(u??"")+n[c+1]),this._$AH[c]=u}o&&!s&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ne=class extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},oe=class extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},ae=class extends H{constructor(t,e,r,s,n){super(t,e,r,s,n),this.type=5}_$AI(t,e=this){if((t=T(this,t,e,0)??d)===I)return;let r=this._$AH,s=t===d&&r!==d||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==d&&(r===d||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},le=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}};var ht=ce.litHtmlPolyfillSupport;ht?.(K,W),(ce.litHtmlVersions??=[]).push("3.3.3");var Te=(i,t,e)=>{let r=e?.renderBefore??t,s=r._$litPart$;if(s===void 0){let n=e?.renderBefore??null;r._$litPart$=s=new W(t.insertBefore(q(),n),n,void 0,e??{})}return s._$AI(i),s};var pe=globalThis,b=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Te(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}};b._$litElement$=!0,b.finalized=!0,pe.litElementHydrateSupport?.({LitElement:b});var pt=pe.litElementPolyfillSupport;pt?.({LitElement:b});(pe.litElementVersions??=[]).push("4.2.2");var C=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};var ut={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:Y},ft=(i=ut,t,e)=>{let{kind:r,metadata:s}=e,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),r==="setter"&&((i=Object.create(i)).wrapped=!0),n.set(e.name,i),r==="accessor"){let{name:o}=e;return{set(a){let c=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,c,i,!0,a)},init(a){return a!==void 0&&this.C(o,void 0,i,a),a}}}if(r==="setter"){let{name:o}=e;return function(a){let c=this[o];t.call(this,a),this.requestUpdate(o,c,i,!0,a)}}throw Error("Unsupported decorator location: "+r)};function m(i){return(t,e)=>typeof e=="object"?ft(i,t,e):((r,s,n)=>{let o=s.hasOwnProperty(n);return s.constructor.createProperty(n,r),o?Object.getOwnPropertyDescriptor(s,n):void 0})(i,t,e)}function v(i){return m({...i,state:!0,attribute:!1})}async function He(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;await customElements.whenDefined("partial-panel-resolver");let i=document.createElement("partial-panel-resolver");i.hass={panels:[{url_path:"tmp",component_name:"config"}]},i._updateRoutes(),await i.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config"),await document.createElement("ha-panel-config").routerOptions.routes.automation.load(),await customElements.whenDefined("ha-form")}var mt="component.versatile_thermostat";async function ze(i){await Promise.all([i.loadBackendTranslation("config","versatile_thermostat"),i.loadBackendTranslation("selector","versatile_thermostat")])}function z(i,t,e){return i.localize(`${mt}.${t}`,e)||""}var ue=(i,t,e,r)=>z(i,`config.step.${t}.data.${e}`,r)||e,Ue=(i,t,e,r)=>z(i,`config.step.${t}.data_description.${e}`,r),fe=(i,t)=>z(i,`config.error.${t}`)||z(i,`options.error.${t}`)||t,U=(i,t)=>z(i,`selector.thermostat_type.options.${t}`)||t,Me=i=>t=>z(i,`selector.${t}`);var G="vtherm_config_panel",Ne=i=>i.callWS({type:`${G}/list`}),De=(i,t)=>i.callWS({type:`${G}/get`,entry_id:t}),je=(i,t)=>i.callWS({type:`${G}/new`,thermostat_type:t}),me=(i,t)=>i.callWS({type:`${G}/describe`,data:t}),qe=(i,t,e)=>i.callWS({type:`${G}/save`,data:t,...e?{entry_id:e}:{}});var Be="thermostat_central_config",Ke={thermostat_central_config:"mdi:cog-transfer",thermostat_over_switch:"mdi:toggle-switch-outline",thermostat_over_climate:"mdi:thermostat",thermostat_over_valve:"mdi:pipe-valve"},E=class extends b{constructor(){super(...arguments);this.types=[];this.picking=!1}connectedCallback(){super.connectedCallback(),this.refresh()}async refresh(){if(!this.hass)return;let e=await Ne(this.hass);this.entries=e.entries,this.types=e.thermostat_types}open(e){this.dispatchEvent(new CustomEvent("vtherm-open",{detail:e,bubbles:!0,composed:!0}))}render(){if(!this.entries)return l`<div class="loading"><ha-spinner></ha-spinner></div>`;let e=this.entries.some(s=>s.thermostat_type===Be),r=this.types.filter(s=>s!==Be||!e);return l`
      <div class="content">
        ${e?d:l`<ha-alert alert-type="info">
              No central configuration yet. Creating one first lets every VTherm share sensors, presets and
              advanced settings instead of repeating them.
            </ha-alert>`}
        <ha-card outlined>
          ${this.entries.length===0?l`<div class="empty">No Versatile Thermostats yet.</div>`:d}
          ${this.entries.map(s=>this.renderRow(s))}
        </ha-card>
        ${this.picking?l`<ha-card outlined header="New VTherm">
              ${r.map(s=>l`<div class="row" @click=${()=>this.open({newType:s})}>
                  <ha-icon icon=${Ke[s]??"mdi:thermostat"}></ha-icon>
                  <div class="main"><div class="name">${U(this.hass,s)}</div></div>
                  <ha-icon icon="mdi:chevron-right"></ha-icon>
                </div>`)}
            </ha-card>`:l`<div class="actions"><ha-button @click=${()=>this.picking=!0}>+ New VTherm</ha-button></div>`}
      </div>
    `}renderRow(e){let r=e.climate_entity_id?this.hass.states[e.climate_entity_id]:void 0,s=[U(this.hass,e.thermostat_type),e.underlying_count?`${e.underlying_count} underlying`:"",e.prop_function??""].filter(Boolean);return l`
      <div class="row" @click=${()=>this.open({entryId:e.entry_id})}>
        <ha-icon icon=${Ke[e.thermostat_type]??"mdi:thermostat"}></ha-icon>
        <div class="main">
          <div class="name">${e.title}</div>
          <div class="sub">${s.join(" \xB7 ")}</div>
        </div>
        ${r?l`<div class="state">
              ${r.attributes.current_temperature??"\u2013"}° → ${r.attributes.temperature??"\u2013"}°
              <span class="sub">${this.hass.formatEntityState?.(r)??r.state}</span>
            </div>`:d}
        ${e.loaded?d:l`<span class="badge warn">not loaded</span>`}
        <ha-icon icon="mdi:chevron-right"></ha-icon>
      </div>
    `}};E.styles=_`
    .loading { display: flex; justify-content: center; padding: 64px; }
    .content { max-width: 960px; margin: 0 auto; padding: 16px; display: flex; flex-direction: column; gap: 16px; }
    .empty { padding: 16px; color: var(--secondary-text-color); }
    .row { display: flex; align-items: center; gap: 16px; padding: 12px 16px; cursor: pointer; border-top: 1px solid var(--divider-color); }
    ha-card > .row:first-of-type, .empty + .row { border-top: none; }
    .row:hover { background: var(--secondary-background-color); }
    .main { flex: 1; min-width: 0; }
    .name { font-size: 16px; }
    .sub { color: var(--secondary-text-color); font-size: 13px; }
    .state { text-align: right; font-size: 14px; display: flex; flex-direction: column; }
    .badge { font-size: 12px; padding: 2px 8px; border-radius: 10px; }
    .badge.warn { background: rgba(var(--rgb-warning-color, 255, 166, 0), 0.2); color: var(--warning-color); }
    .actions { display: flex; justify-content: flex-end; }
    ha-icon { color: var(--state-icon-color, var(--secondary-text-color)); }
  `,p([m({attribute:!1})],E.prototype,"hass",2),p([v()],E.prototype,"entries",2),p([v()],E.prototype,"types",2),p([v()],E.prototype,"picking",2),E=p([C("vtherm-list")],E);function We(i){if(i.selector)return i.selector;switch(i.type){case"boolean":return{boolean:{}};case"integer":return{number:{mode:"box",step:1}};case"float":return{number:{mode:"box",step:"any"}};case"select":return{select:{options:(i.options??[]).map(([t,e])=>({value:t,label:e}))}};default:return{text:{}}}}var ye=i=>"boolean"in We(i),$=class extends b{constructor(){super(...arguments);this.label="";this.helper="";this.error="";this.disabled=!1}emit(e){this.dispatchEvent(new CustomEvent("field-changed",{detail:{key:this.schema.name,value:e},bubbles:!0,composed:!0}))}info(){return this.helper?l`<span class="info" tabindex="0" aria-label=${this.helper}
      ><ha-icon icon="mdi:information-outline"></ha-icon><span class="tip" role="tooltip">${this.helper}</span></span
    >`:d}render(){let e=!!this.schema.required;return ye(this.schema)?l`<label class="bool ${this.disabled?"disabled":""}">
          <span class="label">${this.label}${this.info()}</span>
          <ha-switch .checked=${!!this.value} .disabled=${this.disabled} @change=${r=>this.emit(r.target.checked)}></ha-switch>
        </label>
        ${this.error?l`<div class="error">${this.error}</div>`:d}`:l`
      <div class="head"><span class="label">${this.label}${e?l`<span class="req">*</span>`:d}</span>${this.info()}</div>
      <ha-selector
        .hass=${this.hass}
        .selector=${We(this.schema)}
        .value=${this.value}
        .required=${e}
        .disabled=${this.disabled}
        .localizeValue=${this.localizeValue}
        @value-changed=${r=>{r.stopPropagation(),this.emit(r.detail.value)}}
      ></ha-selector>
      ${this.error?l`<div class="error">${this.error}</div>`:d}
    `}};$.styles=_`
    :host { display: block; }
    .head { display: flex; align-items: center; gap: 4px; margin-bottom: 4px; }
    .label { font-size: 14px; color: var(--primary-text-color); display: inline-flex; align-items: center; gap: 4px; }
    .req { color: var(--secondary-text-color); margin-left: 2px; }
    .bool { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 40px; cursor: pointer; }
    .bool.disabled { cursor: default; opacity: 0.8; }
    .info { position: relative; display: inline-flex; color: var(--secondary-text-color); --mdc-icon-size: 16px; cursor: help; outline: none; }
    .info:focus-visible ha-icon { color: var(--primary-color); }
    .tip {
      display: none; position: absolute; left: 50%; bottom: calc(100% + 6px); transform: translateX(-50%);
      width: max-content; max-width: 300px; padding: 8px 10px; border-radius: 6px; z-index: 10;
      background: var(--card-background-color, #222); color: var(--primary-text-color);
      border: 1px solid var(--divider-color); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      font-size: 13px; line-height: 1.4; white-space: pre-line; pointer-events: none;
    }
    .info:hover .tip, .info:focus .tip { display: block; }
    .error { color: var(--error-color); font-size: 12px; margin-top: 4px; }
  `,p([m({attribute:!1})],$.prototype,"hass",2),p([m({attribute:!1})],$.prototype,"schema",2),p([m({attribute:!1})],$.prototype,"value",2),p([m()],$.prototype,"label",2),p([m()],$.prototype,"helper",2),p([m()],$.prototype,"error",2),p([m({type:Boolean})],$.prototype,"disabled",2),p([m({attribute:!1})],$.prototype,"localizeValue",2),$=p([C("vt-field")],$);var F={room:{title:"Room",subtitle:"What this thermostat is called and what it measures.",icon:"mdi:sofa-outline"},devices:{title:"Devices",subtitle:"The heaters, valves or climates this thermostat drives.",icon:"mdi:radiator"},correction:{title:"Setpoint correction",subtitle:"The device's built-in sensor sits next to the heat, so VT raises or lowers the target it sends until your room sensor reaches your temperature.",icon:"mdi:tune-vertical"},heating:{title:"Heating control",subtitle:"How much and how often to heat.",icon:"mdi:sine-wave"},presets:{title:"Presets",subtitle:"Which target temperatures apply and who may switch them.",icon:"mdi:format-list-bulleted"},window:{title:"Open window",subtitle:"What happens when a window opens.",icon:"mdi:window-open-variant"},motion:{title:"Motion",subtitle:"Switch preset when someone is in the room.",icon:"mdi:motion-sensor"},presence:{title:"Presence",subtitle:"Lower the temperature when nobody is home.",icon:"mdi:home-account"},power:{title:"Power & energy",subtitle:"Device consumption, load shedding and the central boiler.",icon:"mdi:flash"},boiler:{title:"Central boiler",subtitle:"Turn the boiler on when any thermostat needs heat.",icon:"mdi:water-boiler"},safety:{title:"Sensor loss & manual changes",subtitle:"What to do when the room thermometer goes quiet, and how long a manual change lasts.",icon:"mdi:shield-half-full"},auto_start_stop:{title:"Auto start/stop",subtitle:"Turn the climate off when it is not needed.",icon:"mdi:power-sleep"},lock:{title:"Lock",subtitle:"Stop people or automations from changing this thermostat.",icon:"mdi:lock-outline"},other:{title:"Other",subtitle:"Settings this page does not place yet.",icon:"mdi:dots-horizontal"}},Ge={range:"Outdoor sensor and temperature range",humidity:"Humidity sensor",valve:"Direct valve control",sync:"Sync the device's internal temperature",tpi:"TPI coefficients",auto_tpi:"Auto-TPI learning",window_detect:"Detection",shedding:"Load shedding",boiler_use:"Central boiler",failure:"Heating failure detection"},Fe={sensor:"Window sensor",drop:"Temperature drop"};var ge=i=>i==null||i===""||Array.isArray(i)&&i.length===0;function yt(i,t){return t||(ge(i.window_sensor_entity_id)&&!ge(i.window_auto_open_threshold)?"drop":"sensor")}function gt(i,t,e,r){let{fields:s}=t,n=i.control,o=n?.type==="feature"&&n.key&&s[n.key]?n.key:void 0;if(o&&s[o].inherited)return null;let a=n?.type==="central"?n.key:n?.central,c=a&&s[a]?a:void 0,u=i.fields.filter(h=>s[h.key]).map(h=>({...h,desc:s[h.key]})),f;if(n?.type==="method"&&n.options){f={options:n.options,current:r};let h=new Set(Object.entries(n.options).filter(([y])=>y!==r).flatMap(([,y])=>y));u=u.filter(y=>!h.has(y.key))}return!u.length&&!o?null:{id:i.id,featureKey:o,featureOn:o?e[o]===!0:!0,centralKey:c,usesCentral:c?e[c]!==!1:!1,method:f,own:u.filter(h=>!h.desc.inherited),inherited:u.filter(h=>h.desc.inherited)}}function Ve(i,t,e){let{fields:r}=i,s=yt(t,e),n=new Set(i.layout.control_keys),o=new Set,a=[],c=f=>{f.groups.forEach(A=>A.fields.forEach(ee=>o.add(ee.key)));let h=f.control?.key&&r[f.control.key]?f.control.key:void 0,y=f.central&&r[f.central]?f.central:void 0,x=f.groups.map(A=>gt(A,i,t,s)).filter(A=>!!A);if(!x.length&&!h)return;let R=new Set;x.forEach(A=>[...A.own,...A.inherited].forEach(ee=>R.add(ee.desc.step))),a.push({id:f.id,featureKey:h,featureOn:h?t[h]===!0:!0,centralKey:y,usesCentral:y?t[y]!==!1:!1,groups:x,steps:R})};i.layout.cards.forEach(c);let u=Object.keys(r).filter(f=>!o.has(f)&&!n.has(f));return u.length&&c({id:"other",groups:[{id:"other",control:null,fields:u.map(f=>({key:f,level:"common"}))}]}),a}function Xe(i,t){let e={};for(let r of i){if(!r.featureOn)continue;let s=r.groups.filter(n=>n.featureOn).flatMap(n=>n.own).filter(n=>n.desc.schema.required&&ge(t[n.key])).map(n=>n.key);s.length&&(e[r.id]=s)}return e}function Je(i,t){let e=i;for(let[r,s]of Object.entries(t.fields))!s.inherited&&s.schema.default!==void 0&&e[r]===void 0&&(e===i&&(e={...i}),e[r]=s.schema.default);return e}var vt=1e3,g=class extends b{constructor(){super(...arguments);this.narrow=!1;this.heading="";this.data={};this.dirty=!1;this.saving=!1;this.errors={};this.wide=!0;this.describeSeq=0;this.resizer=new ResizeObserver(([e])=>this.wide=e.contentRect.width>=vt)}connectedCallback(){super.connectedCallback(),this.resizer.observe(this)}disconnectedCallback(){this.resizer.disconnect(),super.disconnectedCallback()}willUpdate(e){(e.has("entryId")||e.has("newType"))&&this.hass&&this.load()}async load(){this.loadError=void 0,this.banner=void 0,this.errors={},this.dirty=!1,this.windowMethod=void 0,this.layout=void 0;try{if(this.entryId){let e=await De(this.hass,this.entryId);this.heading=e.title,await this.applyLayout(e.data,e)}else if(this.newType){let e=await je(this.hass,this.newType);this.heading=U(this.hass,this.newType),await this.applyLayout(e.data,e)}}catch(e){this.loadError=e?.message??String(e)}}async applyLayout(e,r){for(let s=0;s<4;s++){let n=Je(e,r);if(n===e)break;e=n,r=await me(this.hass,e)}this.data=e,this.layout=r}async change(e){let r={...this.data};for(let[o,a]of Object.entries(e))a===void 0?delete r[o]:r[o]=a;this.data=r,this.dirty=!0;let s=++this.describeSeq,n=await me(this.hass,r);s===this.describeSeq&&await this.applyLayout(this.data,n)}setWindowMethod(e){this.windowMethod=e;let r=n=>this.layout?.fields[n]&&!this.layout.fields[n].inherited,s=e==="drop"?["window_sensor_entity_id"]:["window_auto_open_threshold","window_auto_close_threshold","window_auto_max_duration"].filter(r);this.change(Object.fromEntries(s.map(n=>[n,void 0])))}async onSave(){this.saving=!0,this.banner=void 0,this.errors={};try{let e=await qe(this.hass,this.data,this.entryId);if(e.success)this.dirty=!1,this.banner={type:"success",text:"Saved. The thermostat has been reloaded."},!this.entryId&&e.entry_id&&this.dispatchEvent(new CustomEvent("vtherm-created",{detail:{entryId:e.entry_id},bubbles:!0,composed:!0}));else if(e.incomplete)this.banner={type:"warning",text:"Not saved: some required settings are still empty. They are marked in the index."};else{this.errors=e.errors,this.banner={type:"error",text:"Not saved: Versatile Thermostat rejected a setting. It is marked below."};let r=Object.keys(e.errors)[0],s=this.cards().find(n=>n.steps.has(r));s&&this.updateComplete.then(()=>this.scrollToCard(s.id))}}catch(e){this.banner={type:"error",text:e?.message??String(e)}}finally{this.saving=!1}}cards(){return this.layout?Ve(this.layout,this.data,this.windowMethod):[]}scrollToCard(e){this.renderRoot.querySelector(`#card-${e}`)?.scrollIntoView({behavior:"smooth",block:"start"})}back(){this.dispatchEvent(new CustomEvent("vtherm-back",{bubbles:!0,composed:!0}))}fieldErrors(){let e={};for(let r of Object.values(this.errors))for(let[s,n]of Object.entries(r))s!=="base"&&(e[s]=fe(this.hass,n));return e}render(){if(this.loadError)return l`<ha-alert alert-type="error">${this.loadError}</ha-alert>`;if(!this.layout)return l`<div class="loading"><ha-spinner></ha-spinner></div>`;let e=this.cards(),r=Xe(e,this.data),s=Object.values(r).reduce((o,a)=>o+a.length,0),n=this.fieldErrors();return l`
      <div class="toolbar">
        <ha-icon-button-arrow-prev @click=${this.back}></ha-icon-button-arrow-prev>
        <div class="title">
          <div class="name">${this.data.name||this.heading}</div>
          <div class="sub">${U(this.hass,this.data.thermostat_type)}${this.entryId?"":" \xB7 new"}</div>
        </div>
        ${s?l`<span class="chip warn">${s} required empty</span>`:d}
        ${this.dirty?l`<span class="chip">Unsaved changes</span>`:d}
        <ha-button .disabled=${this.saving||!this.dirty&&!!this.entryId} @click=${this.onSave}>
          ${this.entryId?"Save":"Create"}
        </ha-button>
      </div>
      <div class="body ${this.wide?"wide":"narrow"}">
        ${this.renderIndex(e,r,n)}
        <div class="content">
          ${this.banner?l`<ha-alert alert-type=${this.banner.type}>${this.banner.text}</ha-alert>`:d}
          ${this.renderColumns(e,n)}
        </div>
      </div>
    `}cardHasError(e,r){return e.groups.flatMap(n=>n.own.map(o=>o.key)).some(n=>r[n])||[...e.steps].some(n=>this.errors[n]?.base)}renderIndex(e,r,s){return l`<nav class="index" aria-label="Sections">
      ${e.map(n=>{let o=F[n.id]??F.other,a=l`<ha-icon class="ok" icon="mdi:check"></ha-icon>`;return n.featureOn?this.cardHasError(n,s)?a=l`<span class="state err">Error</span>`:r[n.id]?a=l`<span class="state warn">${r[n.id].length} empty</span>`:n.usesCentral&&(a=l`<span class="state">Central</span>`):a=l`<span class="state">Off</span>`,l`<button class=${n.featureOn?"":"off"} @click=${()=>this.scrollToCard(n.id)}>
          <ha-icon icon=${o.icon}></ha-icon><span class="label">${o.title}</span>${a}
        </button>`})}
    </nav>`}renderColumns(e,r){let s=e.map(o=>({card:o,tpl:this.renderCard(o,r)}));if(!this.wide)return l`<div class="col">${s.map(o=>o.tpl)}</div>`;let n=[{h:0,items:[]},{h:0,items:[]}];for(let{card:o,tpl:a}of s){let c=n[0].h<=n[1].h?n[0]:n[1];c.items.push(a),c.h+=bt(o)}return l`<div class="cols">${n.map(o=>l`<div class="col">${o.items}</div>`)}</div>`}renderCard(e,r){let s=F[e.id]??F.other,n=[...e.steps].map(a=>this.errors[a]?.base).filter(Boolean),o=e.groups.flatMap(a=>a.inherited);return l`
      <section class="card ${e.featureOn?"":"off"}" id="card-${e.id}">
        <header>
          <ha-icon icon=${s.icon}></ha-icon>
          <div class="htext">
            <h2>${s.title}</h2>
            <p>${s.subtitle}</p>
          </div>
          ${e.featureKey?this.featureSwitch(e.featureKey,e.featureOn):d}
        </header>
        ${e.featureOn?l`
              ${e.centralKey?l`<div class="cardctl">${this.centralSwitch(e.centralKey,e.usesCentral)}</div>`:d}
              ${e.centralKey&&o.length?this.inheritedBlock(o):d}
              ${n.map(a=>l`<ha-alert alert-type="error">${fe(this.hass,a)}</ha-alert>`)}
              ${e.groups.map(a=>this.renderGroup(a,r,!!e.centralKey))}
            `:d}
      </section>
    `}renderGroup(e,r,s=!1){let n=Ge[e.id],o=e.own.filter(u=>u.level!=="advanced"),a=e.own.filter(u=>u.level==="advanced"),c=n||e.featureKey||e.centralKey;return l`
      <div class="group">
        ${c?l`<div class="ghead">
              <h3>${n??""}</h3>
              ${e.centralKey&&e.featureOn?this.centralSwitch(e.centralKey,e.usesCentral):d}
              ${e.featureKey?this.featureSwitch(e.featureKey,e.featureOn):d}
            </div>`:d}
        ${e.featureOn?l`
              ${e.method?this.methodChoice(e.method):d}
              ${o.length?l`<div class="fields">${o.map(u=>this.field(u,r))}</div>`:d}
              ${e.inherited.length&&!s?this.inheritedBlock(e.inherited):d}
              ${a.length?l`<details class="adv">
                    <summary>Advanced settings <span class="count">${a.length}</span></summary>
                    <div class="fields">${a.map(u=>this.field(u,r))}</div>
                  </details>`:d}
            `:d}
      </div>
    `}field(e,r,s=!1){let n=this.layout.placeholders,o=s?this.layout.central_values[e.key]:this.data[e.key];return l`<vt-field
      class=${ye(e.desc.schema)?"bool":""}
      .hass=${this.hass}
      .schema=${e.desc.schema}
      .value=${o}
      .label=${ue(this.hass,e.desc.step,e.key,n)}
      .helper=${Ue(this.hass,e.desc.step,e.key,n)}
      .error=${s?"":r[e.key]??""}
      .disabled=${s}
      .localizeValue=${Me(this.hass)}
      @field-changed=${s?void 0:a=>this.change({[a.detail.key]:a.detail.value})}
    ></vt-field>`}inheritedBlock(e){let r=this.layout.placeholders,s=e.filter(o=>!["",null,void 0].includes(this.layout.central_values[o.key])),n=this.layout.central_entry_id;return l`<details class="inherited">
      <summary>
        <ha-icon icon="mdi:link-variant"></ha-icon>
        <span class="from">From the central configuration</span>
        ${s.length?l`<span class="values">${s.map(o=>l`<span class="kv"
                ><span class="k">${ue(this.hass,o.desc.step,o.key,r)}</span>
                <span class="v">${this.formatValue(this.layout.central_values[o.key])}</span></span
              >`)}</span>`:l`<span class="values none">Nothing set there, so Versatile Thermostat's defaults apply.</span>`}
      </summary>
      <div class="fields">${e.map(o=>this.field(o,{},!0))}</div>
      ${n?l`<a class="central-link" href="?entry=${n}" @click=${o=>this.openCentral(o,n)}
            >Edit the central configuration</a
          >`:d}
    </details>`}openCentral(e,r){e.preventDefault(),this.dispatchEvent(new CustomEvent("vtherm-open",{detail:{entryId:r},bubbles:!0,composed:!0}))}formatValue(e){return typeof e=="boolean"?e?"on":"off":Array.isArray(e)?e.map(r=>this.formatValue(r)).join(", "):typeof e=="string"&&this.hass.states[e]?this.hass.states[e].attributes.friendly_name??e:String(e)}featureSwitch(e,r){return l`<ha-switch
      .checked=${r}
      aria-label=${r?"Turn off":"Turn on"}
      @change=${s=>this.change({[e]:s.target.checked})}
    ></ha-switch>`}centralSwitch(e,r){return l`<div class="seg" role="radiogroup" aria-label="Where the values come from">
      <button role="radio" aria-checked=${r} class=${r?"on":""} @click=${()=>this.change({[e]:!0})}>Central</button>
      <button role="radio" aria-checked=${!r} class=${r?"":"on"} @click=${()=>this.change({[e]:!1})}>Own</button>
    </div>`}methodChoice(e){return l`<div class="seg wide" role="radiogroup" aria-label="Detection method">
      ${Object.keys(e.options).map(r=>l`<button role="radio" aria-checked=${r===e.current} class=${r===e.current?"on":""} @click=${()=>this.setWindowMethod(r)}>
            ${Fe[r]??r}
          </button>`)}
    </div>`}};g.styles=_`
    :host { display: block; --gap: 16px; }
    .loading { display: flex; justify-content: center; padding: 64px; }
    .toolbar {
      position: sticky; top: 0; z-index: 3; display: flex; align-items: center; gap: 12px;
      padding: 8px 16px; background: var(--app-header-background-color, var(--primary-background-color));
      border-bottom: 1px solid var(--divider-color);
    }
    .title { flex: 1; min-width: 0; }
    .name { font-size: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sub { color: var(--secondary-text-color); font-size: 13px; }
    .chip { font-size: 12px; padding: 2px 10px; border-radius: 12px; background: var(--secondary-background-color); color: var(--secondary-text-color); white-space: nowrap; }
    .chip.warn { background: rgba(var(--rgb-warning-color, 255, 166, 0), 0.18); color: var(--warning-color); }

    .body { display: grid; gap: var(--gap); padding: var(--gap); max-width: 1500px; margin: 0 auto; }
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

    .cols { display: grid; grid-template-columns: 1fr 1fr; gap: var(--gap); align-items: start; }
    .col { display: flex; flex-direction: column; gap: var(--gap); min-width: 0; }

    .card {
      background: var(--ha-card-background, var(--card-background-color)); border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px); padding: 16px; display: flex; flex-direction: column; gap: 14px;
      scroll-margin-top: 72px;
    }
    .card.off { gap: 0; }
    .card.off header { opacity: 0.7; }
    .card header { display: flex; align-items: flex-start; gap: 12px; }
    .card header > ha-icon { color: var(--secondary-text-color); margin-top: 2px; }
    .htext { flex: 1; min-width: 0; }
    .card h2 { margin: 0; font-size: 17px; font-weight: 500; }
    .card header p { margin: 2px 0 0; font-size: 13px; color: var(--secondary-text-color); line-height: 1.4; }
    .cardctl { display: flex; }

    .group { display: flex; flex-direction: column; gap: 12px; }
    .group + .group { border-top: 1px solid var(--divider-color); padding-top: 14px; }
    .ghead { display: flex; align-items: center; gap: 12px; min-height: 32px; }
    .ghead h3 { margin: 0; flex: 1; font-size: 12px; font-weight: 500; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.05em; }
    .fields { display: flex; flex-direction: column; gap: 2px; } /* HA inputs reserve their own hint row below */

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
    .adv[open] > summary { margin-bottom: 12px; }
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
    .inherited[open] > summary { margin-bottom: 12px; }
    .inherited .fields { opacity: 0.75; }
    .central-link { display: inline-block; margin-top: 10px; font-size: 13px; color: var(--primary-color); }
  `,p([m({attribute:!1})],g.prototype,"hass",2),p([m()],g.prototype,"entryId",2),p([m()],g.prototype,"newType",2),p([m({type:Boolean})],g.prototype,"narrow",2),p([v()],g.prototype,"heading",2),p([v()],g.prototype,"data",2),p([v()],g.prototype,"layout",2),p([v()],g.prototype,"windowMethod",2),p([v()],g.prototype,"dirty",2),p([v()],g.prototype,"saving",2),p([v()],g.prototype,"errors",2),p([v()],g.prototype,"banner",2),p([v()],g.prototype,"loadError",2),p([v()],g.prototype,"wide",2),g=p([C("vtherm-editor")],g);function bt(i){return i.featureOn?i.groups.reduce((t,e)=>{let r=e.featureOn?e.own.filter(s=>s.level!=="advanced").length:0;return t+1+r*1.6+(e.inherited.length?1:0)+(e.own.some(s=>s.level==="advanced")?.6:0)},3):2}function Ye(){let i=new URLSearchParams(window.location.search),t=i.get("entry"),e=i.get("new");return t?{kind:"edit",entryId:t}:e?{kind:"new",type:e}:{kind:"list"}}var w=class extends b{constructor(){super(...arguments);this.narrow=!1;this.ready=!1;this.view=Ye();this.onLocation=()=>this.view=Ye()}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.onLocation),window.addEventListener("popstate",this.onLocation)}disconnectedCallback(){window.removeEventListener("location-changed",this.onLocation),window.removeEventListener("popstate",this.onLocation),super.disconnectedCallback()}async firstUpdated(){await Promise.all([He(),ze(this.hass)]),this.ready=!0}navigate(e){history.pushState(null,"",`${window.location.pathname}${e}`),window.dispatchEvent(new CustomEvent("location-changed"))}render(){return l`
      <div class="header">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="title">Versatile Thermostat</div>
      </div>
      ${this.ready?this.renderView():l`<div class="loading"><ha-spinner></ha-spinner></div>`}
    `}renderView(){let e=this.view;return e.kind==="list"?l`<vtherm-list
        .hass=${this.hass}
        @vtherm-open=${r=>this.navigate(r.detail.entryId?`?entry=${r.detail.entryId}`:`?new=${r.detail.newType}`)}
      ></vtherm-list>`:l`<vtherm-editor
      .hass=${this.hass}
      .narrow=${this.narrow}
      .entryId=${e.kind==="edit"?e.entryId:void 0}
      .newType=${e.kind==="new"?e.type:void 0}
      @vtherm-back=${()=>this.navigate("")}
      @vtherm-open=${r=>this.navigate(`?entry=${r.detail.entryId}`)}
      @vtherm-created=${r=>this.navigate(`?entry=${r.detail.entryId}`)}
    ></vtherm-editor>`}};w.styles=_`
    :host { display: block; min-height: 100vh; background: var(--primary-background-color); color: var(--primary-text-color); }
    .header {
      display: flex; align-items: center; height: var(--header-height, 56px); padding: 0 12px; gap: 12px;
      background: var(--app-header-background-color); color: var(--app-header-text-color, var(--text-primary-color));
      border-bottom: var(--app-header-border-bottom, none);
    }
    .title { font-size: 20px; }
    .loading { display: flex; justify-content: center; padding: 64px; }
  `,p([m({attribute:!1})],w.prototype,"hass",2),p([m({type:Boolean})],w.prototype,"narrow",2),p([m({attribute:!1})],w.prototype,"panel",2),p([v()],w.prototype,"ready",2),p([v()],w.prototype,"view",2),w=p([C("vtherm-config-panel")],w);export{w as VThermConfigPanel};
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
