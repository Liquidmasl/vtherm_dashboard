var ot=Object.defineProperty;var nt=Object.getOwnPropertyDescriptor;var d=(i,t,e,r)=>{for(var s=r>1?void 0:r?nt(t,e):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(s=(r?n(t,e,s):n(s))||s);return r&&s&&ot(t,e,s),s};var Z=globalThis,ee=Z.ShadowRoot&&(Z.ShadyCSS===void 0||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol(),Ae=new WeakMap,q=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(ee&&t===void 0){let r=e!==void 0&&e.length===1;r&&(t=Ae.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Ae.set(e,t))}return t}toString(){return this.cssText}},Se=i=>new q(typeof i=="string"?i:i+"",void 0,oe),E=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((r,s,o)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[o+1],i[0]);return new q(e,i,oe)},ke=(i,t)=>{if(ee)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let r=document.createElement("style"),s=Z.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)}},ne=ee?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let r of t.cssRules)e+=r.cssText;return Se(e)})(i):i;var{is:at,defineProperty:lt,getOwnPropertyDescriptor:ct,getOwnPropertyNames:dt,getOwnPropertySymbols:pt,getPrototypeOf:ht}=Object,te=globalThis,Ce=te.trustedTypes,ut=Ce?Ce.emptyScript:"",mt=te.reactiveElementPolyfillSupport,D=(i,t)=>i,j={toAttribute(i,t){switch(t){case Boolean:i=i?ut:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},re=(i,t)=>!at(i,t),Oe={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:re};Symbol.metadata??=Symbol("metadata"),te.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Oe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&lt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){let{get:s,set:o}=ct(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let a=s?.call(this);o?.call(this,n),this.requestUpdate(t,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Oe}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;let t=ht(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){let e=this.properties,r=[...dt(e),...pt(e)];for(let s of r)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[e,r]of this.elementProperties){let s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)e.unshift(ne(s))}else t!==void 0&&e.push(ne(t));return e}static _$Eu(t,e){let r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ke(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ET(t,e){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let o=(r.converter?.toAttribute!==void 0?r.converter:j).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let o=r.getPropertyOptions(s),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:j;this._$Em=s;let a=n.fromAttribute(e,o.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,r,s=!1,o){if(t!==void 0){let n=this.constructor;if(s===!1&&(o=this[t]),r??=n.getPropertyOptions(t),!((r.hasChanged??re)(o,e)||r.useDefault&&r.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:r,reflect:s,wrapped:o},n){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,o]of r){let{wrapped:n}=o,a=this[s];n!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,o,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[D("elementProperties")]=new Map,S[D("finalized")]=new Map,mt?.({ReactiveElement:S}),(te.reactiveElementVersions??=[]).push("2.1.2");var ue=globalThis,Re=i=>i,se=ue.trustedTypes,Te=se?se.createPolicy("lit-html",{createHTML:i=>i}):void 0,Ne="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,Ue="?"+O,ft=`<${Ue}>`,I=document,W=()=>I.createComment(""),F=i=>i===null||typeof i!="object"&&typeof i!="function",me=Array.isArray,yt=i=>me(i)||typeof i?.[Symbol.iterator]=="function",ae=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pe=/-->/g,Le=/>/g,P=RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ie=/'/g,ze=/"/g,Me=/^(?:script|style|textarea|title)$/i,fe=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=fe(1),Pt=fe(2),Lt=fe(3),z=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),He=new WeakMap,L=I.createTreeWalker(I,129);function qe(i,t){if(!me(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Te!==void 0?Te.createHTML(t):t}var gt=(i,t)=>{let e=i.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",n=B;for(let a=0;a<e;a++){let c=i[a],p,u,f=-1,w=0;for(;w<c.length&&(n.lastIndex=w,u=n.exec(c),u!==null);)w=n.lastIndex,n===B?u[1]==="!--"?n=Pe:u[1]!==void 0?n=Le:u[2]!==void 0?(Me.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=P):u[3]!==void 0&&(n=P):n===P?u[0]===">"?(n=s??B,f=-1):u[1]===void 0?f=-2:(f=n.lastIndex-u[2].length,p=u[1],n=u[3]===void 0?P:u[3]==='"'?ze:Ie):n===ze||n===Ie?n=P:n===Pe||n===Le?n=B:(n=P,s=void 0);let $=n===P&&i[a+1].startsWith("/>")?" ":"";o+=n===B?c+ft:f>=0?(r.push(p),c.slice(0,f)+Ne+c.slice(f)+O+$):c+O+(f===-2?a:$)}return[qe(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},K=class i{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let o=0,n=0,a=t.length-1,c=this.parts,[p,u]=gt(t,e);if(this.el=i.createElement(p,r),L.currentNode=this.el.content,e===2||e===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=L.nextNode())!==null&&c.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(Ne)){let w=u[n++],$=s.getAttribute(f).split(O),C=/([.?@])?(.*)/.exec(w);c.push({type:1,index:o,name:C[2],strings:$,ctor:C[1]==="."?ce:C[1]==="?"?de:C[1]==="@"?pe:U}),s.removeAttribute(f)}else f.startsWith(O)&&(c.push({type:6,index:o}),s.removeAttribute(f));if(Me.test(s.tagName)){let f=s.textContent.split(O),w=f.length-1;if(w>0){s.textContent=se?se.emptyScript:"";for(let $=0;$<w;$++)s.append(f[$],W()),L.nextNode(),c.push({type:2,index:++o});s.append(f[w],W())}}}else if(s.nodeType===8)if(s.data===Ue)c.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(O,f+1))!==-1;)c.push({type:7,index:o}),f+=O.length-1}o++}}static createElement(t,e){let r=I.createElement("template");return r.innerHTML=t,r}};function N(i,t,e=i,r){if(t===z)return t;let s=r!==void 0?e._$Co?.[r]:e._$Cl,o=F(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(i),s._$AT(i,e,r)),r!==void 0?(e._$Co??=[])[r]=s:e._$Cl=s),s!==void 0&&(t=N(i,s._$AS(i,t.values),s,r)),t}var le=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:r}=this._$AD,s=(t?.creationScope??I).importNode(e,!0);L.currentNode=s;let o=L.nextNode(),n=0,a=0,c=r[0];for(;c!==void 0;){if(n===c.index){let p;c.type===2?p=new G(o,o.nextSibling,this,t):c.type===1?p=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(p=new he(o,this,t)),this._$AV.push(p),c=r[++a]}n!==c?.index&&(o=L.nextNode(),n++)}return L.currentNode=I,s}p(t){let e=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}},G=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=N(this,t,e),F(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==z&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):yt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=K.createElement(qe(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(e);else{let o=new le(s,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=He.get(t.strings);return e===void 0&&He.set(t.strings,e=new K(t)),e}k(t){me(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,r,s=0;for(let o of t)s===e.length?e.push(r=new i(this.O(W()),this.O(W()),this,this.options)):r=e[s],r._$AI(o),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let r=Re(t).nextSibling;Re(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},U=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=h}_$AI(t,e=this,r,s){let o=this.strings,n=!1;if(o===void 0)t=N(this,t,e,0),n=!F(t)||t!==this._$AH&&t!==z,n&&(this._$AH=t);else{let a=t,c,p;for(t=o[0],c=0;c<o.length-1;c++)p=N(this,a[r+c],e,c),p===z&&(p=this._$AH[c]),n||=!F(p)||p!==this._$AH[c],p===h?t=h:t!==h&&(t+=(p??"")+o[c+1]),this._$AH[c]=p}n&&!s&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ce=class extends U{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},de=class extends U{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},pe=class extends U{constructor(t,e,r,s,o){super(t,e,r,s,o),this.type=5}_$AI(t,e=this){if((t=N(this,t,e,0)??h)===z)return;let r=this._$AH,s=t===h&&r!==h||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==h&&(r===h||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},he=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}};var vt=ue.litHtmlPolyfillSupport;vt?.(K,G),(ue.litHtmlVersions??=[]).push("3.3.3");var De=(i,t,e)=>{let r=e?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=e?.renderBefore??null;r._$litPart$=s=new G(t.insertBefore(W(),o),o,void 0,e??{})}return s._$AI(i),s};var ye=globalThis,g=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=De(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return z}};g._$litElement$=!0,g.finalized=!0,ye.litElementHydrateSupport?.({LitElement:g});var xt=ye.litElementPolyfillSupport;xt?.({LitElement:g});(ye.litElementVersions??=[]).push("4.2.2");var A=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};var bt={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:re},wt=(i=bt,t,e)=>{let{kind:r,metadata:s}=e,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),r==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),r==="accessor"){let{name:n}=e;return{set(a){let c=t.get.call(this);t.set.call(this,a),this.requestUpdate(n,c,i,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,i,a),a}}}if(r==="setter"){let{name:n}=e;return function(a){let c=this[n];t.call(this,a),this.requestUpdate(n,c,i,!0,a)}}throw Error("Unsupported decorator location: "+r)};function m(i){return(t,e)=>typeof e=="object"?wt(i,t,e):((r,s,o)=>{let n=s.hasOwnProperty(o);return s.constructor.createProperty(o,r),n?Object.getOwnPropertyDescriptor(s,o):void 0})(i,t,e)}function v(i){return m({...i,state:!0,attribute:!1})}var V="vtherm_config_panel",je=i=>i.callWS({type:`${V}/list`}),Be=(i,t)=>i.callWS({type:`${V}/get`,entry_id:t}),We=(i,t)=>i.callWS({type:`${V}/new`,thermostat_type:t}),ge=(i,t)=>i.callWS({type:`${V}/describe`,data:t}),Fe=(i,t,e)=>i.callWS({type:`${V}/save`,data:t,...e?{entry_id:e}:{}});async function Ke(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;await customElements.whenDefined("partial-panel-resolver");let i=document.createElement("partial-panel-resolver");i.hass={panels:[{url_path:"tmp",component_name:"config"}]},i._updateRoutes(),await i.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config"),await document.createElement("ha-panel-config").routerOptions.routes.automation.load(),await customElements.whenDefined("ha-form")}var $t="component.versatile_thermostat";async function Ge(i){await Promise.all([i.loadBackendTranslation("config","versatile_thermostat"),i.loadBackendTranslation("selector","versatile_thermostat")])}function M(i,t,e){return i.localize(`${$t}.${t}`,e)||""}var ve=(i,t,e,r)=>M(i,`config.step.${t}.data.${e}`,r)||e,Ve=(i,t,e,r)=>M(i,`config.step.${t}.data_description.${e}`,r),xe=(i,t)=>M(i,`config.error.${t}`)||M(i,`options.error.${t}`)||t,X=(i,t)=>M(i,`selector.thermostat_type.options.${t}`)||t,Xe=i=>t=>M(i,`selector.${t}`);var H="thermostat_central_config",be="choose",Y={thermostat_central_config:"mdi:cog-transfer",thermostat_over_switch:"mdi:toggle-switch-outline",thermostat_over_climate:"mdi:thermostat",thermostat_over_valve:"mdi:pipe-valve"},_t={heating:"var(--state-climate-heat-color, #ff8100)",cooling:"var(--state-climate-cool-color, #2b9af9)",idle:"var(--secondary-text-color)",off:"var(--disabled-text-color, #888)"},k=class extends g{constructor(){super(...arguments);this.entries=[]}select(e){this.dispatchEvent(new CustomEvent("vtherm-open",{detail:e,bubbles:!0,composed:!0}))}render(){return l`
      <div class="row" role="tablist" aria-label="Thermostats">
        ${this.entries.map(e=>this.tile(e))}
        ${this.newType?l`<div class="tile selected new" role="tab" aria-selected="true">
              <ha-icon icon=${Y[this.newType]??"mdi:plus"}></ha-icon>
              <div class="main">
                <div class="name">New VTherm</div>
                <div class="sub">${Y[this.newType]?X(this.hass,this.newType):"Choose a type"}</div>
              </div>
            </div>`:l`<button class="tile add" @click=${()=>this.select({newType:be})}>
              <ha-icon icon="mdi:plus"></ha-icon><span>New</span>
            </button>`}
      </div>
    `}tile(e){let r=e.thermostat_type===H,s=e.climate_entity_id?this.hass.states[e.climate_entity_id]:void 0,o=s?.attributes.hvac_action??(s?.state==="off"?"off":void 0),n=this.hass.config?.unit_system?.temperature??"\xB0",a=s?.attributes.current_temperature,c=s?.attributes.temperature,p=e.entry_id===this.selected&&!this.newType;return l`<button
      class="tile ${p?"selected":""} ${r?"central":""}"
      role="tab"
      aria-selected=${p}
      style=${o?`--action: ${_t[o]??"var(--secondary-text-color)"}`:""}
      @click=${()=>this.select({entryId:e.entry_id})}
    >
      <ha-icon icon=${Y[e.thermostat_type]??"mdi:thermostat"}></ha-icon>
      <div class="main">
        <div class="name">${e.title}</div>
        ${r?l`<div class="sub">Shared defaults</div>`:s?l`<div class="temps">
                  <span class="cur">${a??"\u2013"}${n}</span><span class="arrow">→</span><span>${c??"\u2013"}${n}</span>
                </div>
                <div class="sub">
                  <span class="dot"></span>${this.statusText(s)}
                </div>`:l`<div class="sub">${e.loaded?"No climate entity":"Not loaded"}</div>`}
      </div>
    </button>`}statusText(e){if(e.state==="off")return this.hass.formatEntityState?.(e)??"off";let r=e.attributes.hvac_action?this.hass.formatEntityAttributeValue?.(e,"hvac_action")??e.attributes.hvac_action:"",s=e.attributes.preset_mode&&e.attributes.preset_mode!=="none"?this.hass.formatEntityAttributeValue?.(e,"preset_mode")??e.attributes.preset_mode:"";return[r,s].filter(Boolean).join(" \xB7 ")||(this.hass.formatEntityState?.(e)??e.state)}};k.styles=E`
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
  `,d([m({attribute:!1})],k.prototype,"hass",2),d([m({attribute:!1})],k.prototype,"entries",2),d([m()],k.prototype,"selected",2),d([m()],k.prototype,"newType",2),k=d([A("vtherm-switcher")],k);var J={room:{title:"Room",subtitle:"What this thermostat is called and what it measures.",icon:"mdi:sofa-outline"},devices:{title:"Devices",subtitle:"The heaters, valves or climates this thermostat drives.",icon:"mdi:radiator"},correction:{title:"Setpoint correction",subtitle:"The device's built-in sensor sits next to the heat, so VT raises or lowers the target it sends until your room sensor reaches your temperature.",icon:"mdi:tune-vertical"},heating:{title:"Heating control",subtitle:"How much and how often to heat.",icon:"mdi:sine-wave"},presets:{title:"Presets",subtitle:"Which target temperatures apply and who may switch them.",icon:"mdi:format-list-bulleted"},window:{title:"Open window",subtitle:"What happens when a window opens.",icon:"mdi:window-open-variant"},motion:{title:"Motion",subtitle:"Switch preset when someone is in the room.",icon:"mdi:motion-sensor"},presence:{title:"Away from home",subtitle:"Lower the temperature when nobody is home, using a person entity or a home occupancy sensor.",icon:"mdi:home-export-outline"},power:{title:"Power & energy",subtitle:"Device consumption, load shedding and the central boiler.",icon:"mdi:flash"},boiler:{title:"Central boiler",subtitle:"Turn the boiler on when any thermostat needs heat.",icon:"mdi:water-boiler"},safety:{title:"Sensor loss & manual changes",subtitle:"What to do when the room thermometer goes quiet, and how long a manual change lasts.",icon:"mdi:shield-half-full"},auto_start_stop:{title:"Auto start/stop",subtitle:"Turn the climate off when it is not needed.",icon:"mdi:power-sleep"},lock:{title:"Lock",subtitle:"Stop people or automations from changing this thermostat.",icon:"mdi:lock-outline"},other:{title:"Other",subtitle:"Settings this page does not place yet.",icon:"mdi:dots-horizontal"}},Ye={range:"Outdoor sensor and temperature range",valve:"Direct valve control",valve_limits:"Valve commands",sync:"Sync the device's internal temperature",tpi:"TPI coefficients",auto_tpi:"Auto-TPI learning",window_behaviour:"What happens",motion_detect:"Sensor",motion_behaviour:"What happens",shedding:"Load shedding",boiler_use:"Central boiler",failure:"Heating failure detection"},Je={off:"No detection",sensor:"Window sensor",drop:"Temperature drop"},we="How should this room notice an open window?",Qe={thermostat_over_switch:{title:"Switch a heater on and off",body:"Versatile Thermostat turns the device on for part of each cycle, more when the room is colder.",examples:"Electric radiators, heating cables, relays, smart plugs, pilot-wire modules."},thermostat_over_valve:{title:"Set how far a valve opens",body:"Versatile Thermostat sends an opening percentage to the valve and adjusts it as the room warms up.",examples:"Radiator valves that expose their opening as a number (e.g. some Zigbee TRVs)."},thermostat_over_climate:{title:"Drive a device with its own thermostat",body:"The device regulates itself; Versatile Thermostat sets its target and corrects it using your room sensor.",examples:"Thermostatic radiator valves, air conditioners, heat pumps."},thermostat_central_config:{title:"Central configuration",body:"Shared defaults (outdoor sensor, presets, window and safety behaviour) that every VTherm can take over.",examples:"Create it first if you have several rooms."}};var R=class extends g{constructor(){super(...arguments);this.types=[];this.hasCentral=!1}pick(e){this.dispatchEvent(new CustomEvent("vtherm-open",{detail:{newType:e},bubbles:!0,composed:!0}))}render(){let e=this.types.filter(s=>s!==H),r=this.hasCentral?e:[H,...e];return l`
      <h2>What does this thermostat control?</h2>
      ${this.hasCentral?"":l`<p class="hint">No central configuration yet. With several rooms, create it first: every thermostat can then take over its defaults.</p>`}
      <div class="grid">
        ${r.map(s=>{let o=Qe[s];return l`<button class="type ${s===H?"central":""}" @click=${()=>this.pick(s)}>
            <ha-icon icon=${Y[s]}></ha-icon>
            <span class="title">${o?.title??s}</span>
            <span class="body">${o?.body??""}</span>
            <span class="examples">${o?.examples??""}</span>
          </button>`})}
      </div>
    `}};R.styles=E`
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
  `,d([m({attribute:!1})],R.prototype,"hass",2),d([m({attribute:!1})],R.prototype,"types",2),d([m({type:Boolean})],R.prototype,"hasCentral",2),R=d([A("vtherm-type-chooser")],R);function $e(i){if(i.selector)return i.selector;switch(i.type){case"boolean":return{boolean:{}};case"integer":return{number:{mode:"box",step:1}};case"float":return{number:{mode:"box",step:"any"}};case"select":return{select:{options:(i.options??[]).map(([t,e])=>({value:t,label:e}))}};default:return{text:{}}}}var Q=i=>"boolean"in $e(i),Ze=i=>{let t=$e(i),e=Object.values(t)[0];return!!e&&e.multiple===!0},b=class extends g{constructor(){super(...arguments);this.label="";this.helper="";this.error="";this.disabled=!1}emit(e){this.dispatchEvent(new CustomEvent("field-changed",{detail:{key:this.schema.name,value:e},bubbles:!0,composed:!0}))}info(){return this.helper?l`<span class="info" tabindex="0" aria-label=${this.helper}
      ><ha-icon icon="mdi:information-outline"></ha-icon><span class="tip" role="tooltip">${this.helper}</span></span
    >`:h}render(){let e=!!this.schema.required;return Q(this.schema)?l`<label class="bool ${this.disabled?"disabled":""}">
          <span class="label">${this.label}${this.info()}</span>
          <ha-switch .checked=${!!this.value} .disabled=${this.disabled} @change=${r=>this.emit(r.target.checked)}></ha-switch>
        </label>
        ${this.error?l`<div class="error">${this.error}</div>`:h}`:l`
      <div class="head"><span class="label">${this.label}${e?l`<span class="req">*</span>`:h}</span>${this.info()}</div>
      <ha-selector
        .hass=${this.hass}
        .selector=${$e(this.schema)}
        .value=${this.value}
        .required=${e}
        .disabled=${this.disabled}
        .localizeValue=${this.localizeValue}
        @value-changed=${r=>{r.stopPropagation(),this.emit(r.detail.value)}}
      ></ha-selector>
      ${this.error?l`<div class="error">${this.error}</div>`:h}
    `}};b.styles=E`
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
  `,d([m({attribute:!1})],b.prototype,"hass",2),d([m({attribute:!1})],b.prototype,"schema",2),d([m({attribute:!1})],b.prototype,"value",2),d([m()],b.prototype,"label",2),d([m()],b.prototype,"helper",2),d([m()],b.prototype,"error",2),d([m({type:Boolean})],b.prototype,"disabled",2),d([m({attribute:!1})],b.prototype,"localizeValue",2),b=d([A("vt-field")],b);var _e=i=>i==null||i===""||Array.isArray(i)&&i.length===0;function Et(i,t){return i.use_window_feature!==!0?"off":t&&t!=="off"?t:_e(i.window_sensor_entity_id)&&!_e(i.window_auto_open_threshold)?"drop":"sensor"}function At(i,t,e,r){let{fields:s}=t;if(i.types&&!i.types.includes(e.thermostat_type))return null;let o=i.control,n=o?.type==="feature"&&o.key&&s[o.key]?o.key:void 0;if(n&&s[n].inherited)return null;let a=o?.type==="central"?o.key:o?.central,c=a&&s[a]?a:void 0,p=i.fields.filter(u=>s[u.key]&&!r.has(u.key)).map(u=>({...u,desc:s[u.key]}));return!p.length&&!n?null:{id:i.id,featureKey:n,featureOn:n?e[n]===!0:!0,centralKey:c,usesCentral:c?e[c]!==!1:!1,own:p.filter(u=>!u.desc.inherited),inherited:p.filter(u=>u.desc.inherited)}}function et(i,t,e){let{fields:r}=i,s=new Set(i.layout.control_keys),o=new Set,n=[],a=p=>{p.groups.filter(x=>!x.types||x.types.includes(t.thermostat_type)).forEach(x=>x.fields.forEach(T=>o.add(T.key)));let u=p.control?.key&&r[p.control.key]?p.control.key:void 0,f,w=new Set,$=!1;if(p.method){if(p.method.feature&&!r[p.method.feature])return;let x=Et(t,e);f={options:Object.keys(p.method.options),current:x},w=new Set(Object.entries(p.method.options).filter(([T])=>T!==x).flatMap(([,T])=>T)),$=x==="off"}let C=$?[]:p.groups.map(x=>At(x,i,t,w)).filter(x=>!!x);if(!C.length&&!u&&!f)return;let Ee=new Set;C.forEach(x=>[...x.own,...x.inherited].forEach(T=>Ee.add(T.desc.step))),n.push({id:p.id,featureKey:u,featureOn:u?t[u]===!0:!$,method:f,groups:C,steps:Ee})};i.layout.cards.forEach(a);let c=Object.keys(r).filter(p=>!o.has(p)&&!s.has(p));return c.length&&a({id:"other",groups:[{id:"other",control:null,fields:c.map(p=>({key:p,level:"common"}))}]}),n}var tt=i=>i.featureOn&&i.groups.some(t=>t.featureOn&&t.own.some(e=>e.desc.schema.required&&e.level!=="advanced"&&!Q(e.desc.schema)));function rt(i,t){let e={};for(let r of i){if(!r.featureOn)continue;let s=r.groups.filter(o=>o.featureOn).flatMap(o=>o.own).filter(o=>o.desc.schema.required&&_e(t[o.key])).map(o=>o.key);s.length&&(e[r.id]=s)}return e}function st(i,t){let e=i;for(let[r,s]of Object.entries(t.fields))!s.inherited&&s.schema.default!==void 0&&e[r]===void 0&&(e===i&&(e={...i}),e[r]=s.schema.default);return e}var St=760,y=class extends g{constructor(){super(...arguments);this.narrow=!1;this.heading="";this.data={};this.dirty=!1;this.saving=!1;this.errors={};this.wide=!0;this.describeSeq=0;this.resizer=new ResizeObserver(([e])=>this.wide=e.contentRect.width>=St)}connectedCallback(){super.connectedCallback(),this.resizer.observe(this)}disconnectedCallback(){this.resizer.disconnect(),super.disconnectedCallback()}willUpdate(e){(e.has("entryId")||e.has("newType"))&&this.hass&&this.load()}async load(){this.loadError=void 0,this.banner=void 0,this.errors={},this.dirty=!1,this.windowMethod=void 0,this.layout=void 0;try{if(this.entryId){let e=await Be(this.hass,this.entryId);this.heading=e.title,await this.applyLayout(e.data,e)}else if(this.newType){let e=await We(this.hass,this.newType);this.heading=X(this.hass,this.newType),await this.applyLayout(e.data,e)}}catch(e){this.loadError=e?.message??String(e)}}async applyLayout(e,r){for(let s=0;s<4;s++){let o=st(e,r);if(o===e)break;e=o,r=await ge(this.hass,e)}this.data=e,this.layout=r}async change(e){let r={...this.data};for(let[n,a]of Object.entries(this.layout?.layout.derived_flags??{}))n in e&&(e={...e,[a]:!["",null,void 0].includes(e[n])});for(let[n,a]of Object.entries(e))a===void 0?delete r[n]:r[n]=a;this.data=r,this.dirty=!0;let s=++this.describeSeq,o=await ge(this.hass,r);s===this.describeSeq&&await this.applyLayout(this.data,o)}setWindowMethod(e){if(this.windowMethod=e,e==="off"){this.change({use_window_feature:!1});return}let r=o=>this.layout?.fields[o]&&!this.layout.fields[o].inherited,s=e==="drop"?["window_sensor_entity_id"]:["window_auto_open_threshold","window_auto_close_threshold","window_auto_max_duration"].filter(r);this.change({use_window_feature:!0,...Object.fromEntries(s.map(o=>[o,void 0]))})}async onSave(){this.saving=!0,this.banner=void 0,this.errors={};try{let e=await Fe(this.hass,this.data,this.entryId);if(e.success)this.dirty=!1,this.banner={type:"success",text:"Saved. The thermostat has been reloaded."},this.dispatchEvent(new CustomEvent("vtherm-saved",{bubbles:!0,composed:!0})),!this.entryId&&e.entry_id&&this.dispatchEvent(new CustomEvent("vtherm-created",{detail:{entryId:e.entry_id},bubbles:!0,composed:!0}));else if(e.incomplete)this.banner={type:"warning",text:"Not saved: some required settings are still empty. They are marked in the index."};else{this.errors=e.errors,this.banner={type:"error",text:"Not saved: Versatile Thermostat rejected a setting. It is marked below."};let r=Object.keys(e.errors)[0],s=this.cards().find(o=>o.steps.has(r));s&&this.updateComplete.then(()=>this.scrollToCard(s.id))}}catch(e){this.banner={type:"error",text:e?.message??String(e)}}finally{this.saving=!1}}cards(){return this.layout?et(this.layout,this.data,this.windowMethod):[]}scrollToCard(e){this.renderRoot.querySelector(`#card-${e}`)?.scrollIntoView({behavior:"smooth",block:"start"})}fieldErrors(){let e={};for(let r of Object.values(this.errors))for(let[s,o]of Object.entries(r))s!=="base"&&(e[s]=xe(this.hass,o));return e}render(){if(this.loadError)return l`<ha-alert alert-type="error">${this.loadError}</ha-alert>`;if(!this.layout)return l`<div class="loading"><ha-spinner></ha-spinner></div>`;let e=this.cards(),r=rt(e,this.data),s=Object.values(r).reduce((n,a)=>n+a.length,0),o=this.fieldErrors();return l`
      <div class="toolbar">
        <div class="title">
          <div class="name">${this.data.name||this.heading}</div>
          <div class="sub">${X(this.hass,this.data.thermostat_type)}${this.entryId?"":" \xB7 new"}</div>
        </div>
        ${s?l`<span class="chip warn">${s} required empty</span>`:h}
        ${this.dirty?l`<span class="chip">Unsaved changes</span>`:h}
        <ha-button .disabled=${this.saving||!this.dirty&&!!this.entryId} @click=${this.onSave}>
          ${this.entryId?"Save":"Create"}
        </ha-button>
      </div>
      <div class="body ${this.wide?"wide":"narrow"}">
        ${this.renderIndex(e,r,o)}
        <div class="content">
          ${this.banner?l`<ha-alert alert-type=${this.banner.type}>${this.banner.text}</ha-alert>`:h}
          ${this.renderColumns(e,o,r)}
        </div>
      </div>
    `}cardHasError(e,r){return e.groups.flatMap(o=>o.own.map(n=>n.key)).some(o=>r[o])||[...e.steps].some(o=>this.errors[o]?.base)}renderIndex(e,r,s){return l`<nav class="index" aria-label="Sections">
      ${e.map(o=>{let n=J[o.id]??J.other,a=l`<ha-icon class="ok" icon="mdi:check"></ha-icon>`;return o.featureOn?this.cardHasError(o,s)?a=l`<span class="state err">Error</span>`:r[o.id]?a=l`<span class="state warn">${r[o.id].length} empty</span>`:o.groups.every(c=>c.centralKey&&c.usesCentral)&&(a=l`<span class="state">Central</span>`):a=l`<span class="state">Off</span>`,l`<button class=${o.featureOn?"":"off"} @click=${()=>this.scrollToCard(o.id)}>
          <ha-icon icon=${n.icon}></ha-icon><span class="label">${n.title}</span>${a}
        </button>`})}
    </nav>`}renderColumns(e,r,s){return l`<div class="col">${e.map(o=>this.renderCard(o,r,s))}</div>`}renderCard(e,r,s){let o=J[e.id]??J.other,n=[...e.steps].map(a=>this.errors[a]?.base).filter(Boolean);return l`
      <section
        class="card ${e.featureOn?"":"off"} ${tt(e)?"required":""} ${s[e.id]?"missing":""}"
        id="card-${e.id}"
      >
        <header>
          <ha-icon icon=${o.icon}></ha-icon>
          <div class="htext">
            <h2>${o.title}</h2>
            <p>${o.subtitle}</p>
          </div>
          ${e.featureKey?this.featureSwitch(e.featureKey,e.featureOn):h}
        </header>
        ${e.method?this.methodChoice(e.method):h}
        ${e.featureOn?l`
              ${n.map(a=>l`<ha-alert alert-type="error">${xe(this.hass,a)}</ha-alert>`)}
              ${e.groups.map(a=>this.renderGroup(a,r))}
            `:h}
      </section>
    `}renderGroup(e,r){let s=Ye[e.id],o=e.own.filter(c=>c.level!=="advanced"),n=e.own.filter(c=>c.level==="advanced"),a=s||e.featureKey;return l`
      <div class="group">
        ${a?l`<div class="ghead">
              <h3>${s??""}</h3>
              ${e.featureKey?this.featureSwitch(e.featureKey,e.featureOn):h}
            </div>`:h}
        ${e.featureOn?l`
              ${e.centralKey?this.overrideToggle(e.centralKey,e.usesCentral):h}
              ${o.length?l`<div class="fields">${o.map(c=>this.field(c,r))}</div>`:h}
              ${e.inherited.length?this.inheritedBlock(e.inherited):h}
              ${n.length?l`<details class="adv">
                    <summary>Advanced settings <span class="count">${n.length}</span></summary>
                    <div class="fields">${n.map(c=>this.field(c,r))}</div>
                  </details>`:h}
            `:h}
      </div>
    `}field(e,r,s=!1){let o=this.layout.placeholders,n=s?this.layout.central_values[e.key]:this.data[e.key];return l`<vt-field
      class=${Q(e.desc.schema)?"bool":Ze(e.desc.schema)?"wide":""}
      .hass=${this.hass}
      .schema=${e.desc.schema}
      .value=${n}
      .label=${ve(this.hass,e.desc.step,e.key,o)}
      .helper=${Ve(this.hass,e.desc.step,e.key,o)}
      .error=${s?"":r[e.key]??""}
      .disabled=${s}
      .localizeValue=${Xe(this.hass)}
      @field-changed=${s?void 0:a=>this.change({[a.detail.key]:a.detail.value})}
    ></vt-field>`}inheritedBlock(e){let r=this.layout.placeholders,s=e.filter(n=>!["",null,void 0].includes(this.layout.central_values[n.key])),o=this.layout.central_entry_id;return l`<details class="inherited">
      <summary>
        <ha-icon icon="mdi:link-variant"></ha-icon>
        <span class="from">From the central configuration</span>
        ${s.length?l`<span class="values">${s.map(n=>l`<span class="kv"
                ><span class="k">${ve(this.hass,n.desc.step,n.key,r)}</span>
                <span class="v">${this.formatValue(this.layout.central_values[n.key])}</span></span
              >`)}</span>`:l`<span class="values none">Nothing set there, so Versatile Thermostat's defaults apply.</span>`}
      </summary>
      <div class="fields">${e.map(n=>this.field(n,{},!0))}</div>
      ${o?l`<a class="central-link" href="?entry=${o}" @click=${n=>this.openCentral(n,o)}
            >Edit the central configuration</a
          >`:h}
    </details>`}openCentral(e,r){e.preventDefault(),this.dispatchEvent(new CustomEvent("vtherm-open",{detail:{entryId:r},bubbles:!0,composed:!0}))}formatValue(e){return typeof e=="boolean"?e?"on":"off":Array.isArray(e)?e.map(r=>this.formatValue(r)).join(", "):typeof e=="string"&&this.hass.states[e]?this.hass.states[e].attributes.friendly_name??e:String(e)}featureSwitch(e,r){return l`<ha-switch
      .checked=${r}
      aria-label=${r?"Turn off":"Turn on"}
      @change=${s=>this.change({[e]:s.target.checked})}
    ></ha-switch>`}overrideToggle(e,r){return l`<label class="override">
      <ha-switch .checked=${!r} @change=${s=>this.change({[e]:!s.target.checked})}></ha-switch>
      <span>Override central configuration</span>
    </label>`}methodChoice(e){return l`<div class="question">${we}</div>
      <div class="seg wide" role="radiogroup" aria-label=${we}>
      ${e.options.map(r=>l`<button role="radio" aria-checked=${r===e.current} class=${r===e.current?"on":""} @click=${()=>this.setWindowMethod(r)}>
            ${Je[r]??r}
          </button>`)}
    </div>`}};y.styles=E`
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
      border-radius: var(--ha-card-border-radius, 12px); padding: 16px; display: flex; flex-direction: column; gap: 14px;
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

    .group { display: flex; flex-direction: column; gap: 12px; }
    .group + .group { border-top: 1px solid var(--divider-color); padding-top: 14px; }
    .ghead { display: flex; align-items: center; gap: 12px; min-height: 32px; }
    .ghead h3 { margin: 0; flex: 1; font-size: 12px; font-weight: 500; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.05em; }
    /* Fields share the card's width in a grid; HA inputs reserve their own hint row, hence the small row gap. */
    .fields { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 2px 24px; align-items: start; }
    .fields vt-field.wide { grid-column: 1 / -1; }
    .fields vt-field.bool { align-self: center; }

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
  `,d([m({attribute:!1})],y.prototype,"hass",2),d([m()],y.prototype,"entryId",2),d([m()],y.prototype,"newType",2),d([m({type:Boolean})],y.prototype,"narrow",2),d([v()],y.prototype,"heading",2),d([v()],y.prototype,"data",2),d([v()],y.prototype,"layout",2),d([v()],y.prototype,"windowMethod",2),d([v()],y.prototype,"dirty",2),d([v()],y.prototype,"saving",2),d([v()],y.prototype,"errors",2),d([v()],y.prototype,"banner",2),d([v()],y.prototype,"loadError",2),d([v()],y.prototype,"wide",2),y=d([A("vtherm-editor")],y);function it(){let i=new URLSearchParams(window.location.search);return{entryId:i.get("entry")??void 0,newType:i.get("new")??void 0}}var _=class extends g{constructor(){super(...arguments);this.narrow=!1;this.ready=!1;this.entries=[];this.types=[];this.selection=it();this.onLocation=()=>this.selection=it()}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.onLocation),window.addEventListener("popstate",this.onLocation)}disconnectedCallback(){window.removeEventListener("location-changed",this.onLocation),window.removeEventListener("popstate",this.onLocation),super.disconnectedCallback()}async firstUpdated(){await Promise.all([Ke(),Ge(this.hass),this.refreshEntries()]),this.ready=!0}async refreshEntries(){let e=await je(this.hass);this.entries=e.entries,this.types=e.thermostat_types}navigate(e){if(this.renderRoot.querySelector("vtherm-editor")?.dirty&&!confirm("Discard the unsaved changes on this thermostat?"))return;let s=e.entryId?`?entry=${e.entryId}`:e.newType?`?new=${e.newType}`:"";history.pushState(null,"",`${window.location.pathname}${s}`),window.dispatchEvent(new CustomEvent("location-changed"))}effectiveSelection(){let{entryId:e,newType:r}=this.selection;return e||r?this.selection:{entryId:this.entries[0]?.entry_id}}render(){let e=this.effectiveSelection();return l`
      <div class="header">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="title">Versatile Thermostat</div>
      </div>
      ${this.ready?l`
            <div class="switcher">
              <vtherm-switcher
                .hass=${this.hass}
                .entries=${this.entries}
                .selected=${e.entryId}
                .newType=${e.newType}
                @vtherm-open=${r=>this.navigate(r.detail)}
              ></vtherm-switcher>
            </div>
            ${e.newType===be?l`<vtherm-type-chooser
                  .hass=${this.hass}
                  .types=${this.types}
                  .hasCentral=${this.entries.some(r=>r.thermostat_type===H)}
                  @vtherm-open=${r=>this.navigate(r.detail)}
                ></vtherm-type-chooser>`:e.entryId||e.newType?l`<vtherm-editor
                  .hass=${this.hass}
                  .narrow=${this.narrow}
                  .entryId=${e.entryId}
                  .newType=${e.newType}
                  @vtherm-open=${r=>this.navigate(r.detail)}
                  @vtherm-saved=${()=>this.refreshEntries()}
                  @vtherm-created=${async r=>{await this.refreshEntries(),this.navigate({entryId:r.detail.entryId})}}
                ></vtherm-editor>`:l`<div class="empty">No Versatile Thermostats yet. Use “New” above to create the first one.</div>`}
          `:l`<div class="loading"><ha-spinner></ha-spinner></div>`}
    `}};_.styles=E`
    :host { display: block; min-height: 100vh; background: var(--primary-background-color); color: var(--primary-text-color); }
    .header {
      display: flex; align-items: center; height: var(--header-height, 56px); padding: 0 12px; gap: 12px;
      background: var(--app-header-background-color); color: var(--app-header-text-color, var(--text-primary-color));
      border-bottom: var(--app-header-border-bottom, none);
    }
    .title { font-size: 20px; }
    .switcher { padding: 16px 16px 4px; max-width: 1100px; margin: 0 auto; }
    .loading, .empty { display: flex; justify-content: center; padding: 64px; color: var(--secondary-text-color); }
  `,d([m({attribute:!1})],_.prototype,"hass",2),d([m({type:Boolean})],_.prototype,"narrow",2),d([m({attribute:!1})],_.prototype,"panel",2),d([v()],_.prototype,"ready",2),d([v()],_.prototype,"entries",2),d([v()],_.prototype,"types",2),d([v()],_.prototype,"selection",2),_=d([A("vtherm-config-panel")],_);export{_ as VThermConfigPanel};
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
