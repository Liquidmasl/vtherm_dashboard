var Qe=Object.defineProperty;var et=Object.getOwnPropertyDescriptor;var d=(i,t,e,s)=>{for(var r=s>1?void 0:s?et(t,e):t,o=i.length-1,n;o>=0;o--)(n=i[o])&&(r=(s?n(t,e,r):n(r))||r);return s&&r&&Qe(t,e,r),r};var V=globalThis,X=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,te=Symbol(),$e=new WeakMap,M=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(X&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=$e.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&$e.set(e,t))}return t}toString(){return this.cssText}},we=i=>new M(typeof i=="string"?i:i+"",void 0,te),A=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1],i[0]);return new M(e,i,te)},_e=(i,t)=>{if(X)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),r=V.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},se=X?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return we(e)})(i):i;var{is:tt,defineProperty:st,getOwnPropertyDescriptor:rt,getOwnPropertyNames:it,getOwnPropertySymbols:ot,getPrototypeOf:nt}=Object,J=globalThis,Ee=J.trustedTypes,at=Ee?Ee.emptyScript:"",lt=J.reactiveElementPolyfillSupport,N=(i,t)=>i,D={toAttribute(i,t){switch(t){case Boolean:i=i?at:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Y=(i,t)=>!tt(i,t),Ae={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:Y};Symbol.metadata??=Symbol("metadata"),J.litPropertyMetadata??=new WeakMap;var k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Ae){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&st(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){let{get:r,set:o}=rt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:r,set(n){let a=r?.call(this);o?.call(this,n),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ae}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let t=nt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let e=this.properties,s=[...it(e),...ot(e)];for(let r of s)this.createProperty(r,e[r])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let r of s)e.unshift(se(r))}else t!==void 0&&e.push(se(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _e(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:D).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){let o=s.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:D;this._$Em=r;let a=n.fromAttribute(e,o.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(t,e,s,r=!1,o){if(t!==void 0){let n=this.constructor;if(r===!1&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??Y)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[r,o]of s){let{wrapped:n}=o,a=this[r];n!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,o,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[N("elementProperties")]=new Map,k[N("finalized")]=new Map,lt?.({ReactiveElement:k}),(J.reactiveElementVersions??=[]).push("2.1.2");var ce=globalThis,ke=i=>i,Z=ce.trustedTypes,Se=Z?Z.createPolicy("lit-html",{createHTML:i=>i}):void 0,Te="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Ie="?"+S,ct=`<${Ie}>`,L=document,q=()=>L.createComment(""),B=i=>i===null||typeof i!="object"&&typeof i!="function",de=Array.isArray,dt=i=>de(i)||typeof i?.[Symbol.iterator]=="function",re=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ce=/-->/g,Re=/>/g,O=RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Oe=/'/g,Pe=/"/g,ze=/^(?:script|style|textarea|title)$/i,pe=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),l=pe(1),kt=pe(2),St=pe(3),T=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Le=new WeakMap,P=L.createTreeWalker(L,129);function He(i,t){if(!de(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Se!==void 0?Se.createHTML(t):t}var pt=(i,t)=>{let e=i.length-1,s=[],r,o=t===2?"<svg>":t===3?"<math>":"",n=j;for(let a=0;a<e;a++){let c=i[a],u,f,h=-1,y=0;for(;y<c.length&&(n.lastIndex=y,f=n.exec(c),f!==null);)y=n.lastIndex,n===j?f[1]==="!--"?n=Ce:f[1]!==void 0?n=Re:f[2]!==void 0?(ze.test(f[2])&&(r=RegExp("</"+f[2],"g")),n=O):f[3]!==void 0&&(n=O):n===O?f[0]===">"?(n=r??j,h=-1):f[1]===void 0?h=-2:(h=n.lastIndex-f[2].length,u=f[1],n=f[3]===void 0?O:f[3]==='"'?Pe:Oe):n===Pe||n===Oe?n=O:n===Ce||n===Re?n=j:(n=O,r=void 0);let $=n===O&&i[a+1].startsWith("/>")?" ":"";o+=n===j?c+ct:h>=0?(s.push(u),c.slice(0,h)+Te+c.slice(h)+S+$):c+S+(h===-2?a:$)}return[He(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},K=class i{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let o=0,n=0,a=t.length-1,c=this.parts,[u,f]=pt(t,e);if(this.el=i.createElement(u,s),P.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=P.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(let h of r.getAttributeNames())if(h.endsWith(Te)){let y=f[n++],$=r.getAttribute(h).split(S),R=/([.?@])?(.*)/.exec(y);c.push({type:1,index:o,name:R[2],strings:$,ctor:R[1]==="."?oe:R[1]==="?"?ne:R[1]==="@"?ae:z}),r.removeAttribute(h)}else h.startsWith(S)&&(c.push({type:6,index:o}),r.removeAttribute(h));if(ze.test(r.tagName)){let h=r.textContent.split(S),y=h.length-1;if(y>0){r.textContent=Z?Z.emptyScript:"";for(let $=0;$<y;$++)r.append(h[$],q()),P.nextNode(),c.push({type:2,index:++o});r.append(h[y],q())}}}else if(r.nodeType===8)if(r.data===Ie)c.push({type:2,index:o});else{let h=-1;for(;(h=r.data.indexOf(S,h+1))!==-1;)c.push({type:7,index:o}),h+=S.length-1}o++}}static createElement(t,e){let s=L.createElement("template");return s.innerHTML=t,s}};function I(i,t,e=i,s){if(t===T)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl,o=B(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=I(i,r._$AS(i,t.values),r,s)),t}var ie=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??L).importNode(e,!0);P.currentNode=r;let o=P.nextNode(),n=0,a=0,c=s[0];for(;c!==void 0;){if(n===c.index){let u;c.type===2?u=new W(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new le(o,this,t)),this._$AV.push(u),c=s[++a]}n!==c?.index&&(o=P.nextNode(),n++)}return P.currentNode=L,r}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},W=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),B(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==T&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):dt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&B(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=K.createElement(He(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{let o=new ie(r,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=Le.get(t.strings);return e===void 0&&Le.set(t.strings,e=new K(t)),e}k(t){de(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,r=0;for(let o of t)r===e.length?e.push(s=new i(this.O(q()),this.O(q()),this,this.options)):s=e[r],s._$AI(o),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ke(t).nextSibling;ke(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}_$AI(t,e=this,s,r){let o=this.strings,n=!1;if(o===void 0)t=I(this,t,e,0),n=!B(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else{let a=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=I(this,a[s+c],e,c),u===T&&(u=this._$AH[c]),n||=!B(u)||u!==this._$AH[c],u===p?t=p:t!==p&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}n&&!r&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},oe=class extends z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},ne=class extends z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},ae=class extends z{constructor(t,e,s,r,o){super(t,e,s,r,o),this.type=5}_$AI(t,e=this){if((t=I(this,t,e,0)??p)===T)return;let s=this._$AH,r=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==p&&(s===p||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},le=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}};var ht=ce.litHtmlPolyfillSupport;ht?.(K,W),(ce.litHtmlVersions??=[]).push("3.3.3");var Ue=(i,t,e)=>{let s=e?.renderBefore??t,r=s._$litPart$;if(r===void 0){let o=e?.renderBefore??null;s._$litPart$=r=new W(t.insertBefore(q(),o),o,void 0,e??{})}return r._$AI(i),r};var he=globalThis,x=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ue(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return T}};x._$litElement$=!0,x.finalized=!0,he.litElementHydrateSupport?.({LitElement:x});var ut=he.litElementPolyfillSupport;ut?.({LitElement:x});(he.litElementVersions??=[]).push("4.2.2");var C=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};var ft={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:Y},mt=(i=ft,t,e)=>{let{kind:s,metadata:r}=e,o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(e.name,i),s==="accessor"){let{name:n}=e;return{set(a){let c=t.get.call(this);t.set.call(this,a),this.requestUpdate(n,c,i,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,i,a),a}}}if(s==="setter"){let{name:n}=e;return function(a){let c=this[n];t.call(this,a),this.requestUpdate(n,c,i,!0,a)}}throw Error("Unsupported decorator location: "+s)};function m(i){return(t,e)=>typeof e=="object"?mt(i,t,e):((s,r,o)=>{let n=r.hasOwnProperty(o);return r.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(r,o):void 0})(i,t,e)}function v(i){return m({...i,state:!0,attribute:!1})}var F="vtherm_config_panel",Me=i=>i.callWS({type:`${F}/list`}),Ne=(i,t)=>i.callWS({type:`${F}/get`,entry_id:t}),De=(i,t)=>i.callWS({type:`${F}/new`,thermostat_type:t}),ue=(i,t)=>i.callWS({type:`${F}/describe`,data:t}),je=(i,t,e)=>i.callWS({type:`${F}/save`,data:t,...e?{entry_id:e}:{}});async function qe(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;await customElements.whenDefined("partial-panel-resolver");let i=document.createElement("partial-panel-resolver");i.hass={panels:[{url_path:"tmp",component_name:"config"}]},i._updateRoutes(),await i.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config"),await document.createElement("ha-panel-config").routerOptions.routes.automation.load(),await customElements.whenDefined("ha-form")}var yt="component.versatile_thermostat";async function Be(i){await Promise.all([i.loadBackendTranslation("config","versatile_thermostat"),i.loadBackendTranslation("selector","versatile_thermostat")])}function H(i,t,e){return i.localize(`${yt}.${t}`,e)||""}var fe=(i,t,e,s)=>H(i,`config.step.${t}.data.${e}`,s)||e,Ke=(i,t,e,s)=>H(i,`config.step.${t}.data_description.${e}`,s),me=(i,t)=>H(i,`config.error.${t}`)||H(i,`options.error.${t}`)||t,U=(i,t)=>H(i,`selector.thermostat_type.options.${t}`)||t,We=i=>t=>H(i,`selector.${t}`);var ye="thermostat_central_config",ge={thermostat_central_config:"mdi:cog-transfer",thermostat_over_switch:"mdi:toggle-switch-outline",thermostat_over_climate:"mdi:thermostat",thermostat_over_valve:"mdi:pipe-valve"},gt={heating:"var(--state-climate-heat-color, #ff8100)",cooling:"var(--state-climate-cool-color, #2b9af9)",idle:"var(--secondary-text-color)",off:"var(--disabled-text-color, #888)"},E=class extends x{constructor(){super(...arguments);this.entries=[];this.types=[];this.picking=!1}select(e){this.picking=!1,this.dispatchEvent(new CustomEvent("vtherm-open",{detail:e,bubbles:!0,composed:!0}))}render(){let e=this.entries.some(r=>r.thermostat_type===ye),s=this.types.filter(r=>r!==ye||!e);return l`
      <div class="row" role="tablist" aria-label="Thermostats">
        ${this.entries.map(r=>this.tile(r))}
        ${this.newType?l`<div class="tile selected new" role="tab" aria-selected="true">
              <ha-icon icon=${ge[this.newType]}></ha-icon>
              <div class="main"><div class="name">New VTherm</div><div class="sub">${U(this.hass,this.newType)}</div></div>
            </div>`:p}
        <button class="tile add" @click=${()=>this.picking=!this.picking} aria-expanded=${this.picking}>
          <ha-icon icon="mdi:plus"></ha-icon><span>New</span>
        </button>
      </div>
      ${this.picking?l`<div class="picker">
            <span class="hint">Create a</span>
            ${s.map(r=>l`<button @click=${()=>this.select({newType:r})}>
                <ha-icon icon=${ge[r]}></ha-icon>${U(this.hass,r)}
              </button>`)}
          </div>`:p}
    `}tile(e){let s=e.thermostat_type===ye,r=e.climate_entity_id?this.hass.states[e.climate_entity_id]:void 0,o=r?.attributes.hvac_action??(r?.state==="off"?"off":void 0),n=this.hass.config?.unit_system?.temperature??"\xB0",a=r?.attributes.current_temperature,c=r?.attributes.temperature,u=e.entry_id===this.selected&&!this.newType;return l`<button
      class="tile ${u?"selected":""} ${s?"central":""}"
      role="tab"
      aria-selected=${u}
      style=${o?`--action: ${gt[o]??"var(--secondary-text-color)"}`:""}
      @click=${()=>this.select({entryId:e.entry_id})}
    >
      <ha-icon icon=${ge[e.thermostat_type]??"mdi:thermostat"}></ha-icon>
      <div class="main">
        <div class="name">${e.title}</div>
        ${s?l`<div class="sub">Shared defaults</div>`:r?l`<div class="temps">
                  <span class="cur">${a??"\u2013"}${n}</span><span class="arrow">→</span><span>${c??"\u2013"}${n}</span>
                </div>
                <div class="sub">
                  <span class="dot"></span>${this.statusText(r)}
                </div>`:l`<div class="sub">${e.loaded?"No climate entity":"Not loaded"}</div>`}
      </div>
    </button>`}statusText(e){if(e.state==="off")return this.hass.formatEntityState?.(e)??"off";let s=e.attributes.hvac_action?this.hass.formatEntityAttributeValue?.(e,"hvac_action")??e.attributes.hvac_action:"",r=e.attributes.preset_mode&&e.attributes.preset_mode!=="none"?this.hass.formatEntityAttributeValue?.(e,"preset_mode")??e.attributes.preset_mode:"";return[s,r].filter(Boolean).join(" \xB7 ")||(this.hass.formatEntityState?.(e)??e.state)}};E.styles=A`
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
    .picker { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 8px; }
    .picker .hint { color: var(--secondary-text-color); font-size: 14px; }
    .picker button {
      all: unset; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 16px;
      border: 1px solid var(--divider-color); font-size: 14px; --mdc-icon-size: 18px;
    }
    .picker button:hover, .picker button:focus-visible { border-color: var(--primary-color); color: var(--primary-color); }
  `,d([m({attribute:!1})],E.prototype,"hass",2),d([m({attribute:!1})],E.prototype,"entries",2),d([m({attribute:!1})],E.prototype,"types",2),d([m()],E.prototype,"selected",2),d([m()],E.prototype,"newType",2),d([v()],E.prototype,"picking",2),E=d([C("vtherm-switcher")],E);function ve(i){if(i.selector)return i.selector;switch(i.type){case"boolean":return{boolean:{}};case"integer":return{number:{mode:"box",step:1}};case"float":return{number:{mode:"box",step:"any"}};case"select":return{select:{options:(i.options??[]).map(([t,e])=>({value:t,label:e}))}};default:return{text:{}}}}var xe=i=>"boolean"in ve(i),Fe=i=>{let t=ve(i),e=Object.values(t)[0];return!!e&&e.multiple===!0},b=class extends x{constructor(){super(...arguments);this.label="";this.helper="";this.error="";this.disabled=!1}emit(e){this.dispatchEvent(new CustomEvent("field-changed",{detail:{key:this.schema.name,value:e},bubbles:!0,composed:!0}))}info(){return this.helper?l`<span class="info" tabindex="0" aria-label=${this.helper}
      ><ha-icon icon="mdi:information-outline"></ha-icon><span class="tip" role="tooltip">${this.helper}</span></span
    >`:p}render(){let e=!!this.schema.required;return xe(this.schema)?l`<label class="bool ${this.disabled?"disabled":""}">
          <span class="label">${this.label}${this.info()}</span>
          <ha-switch .checked=${!!this.value} .disabled=${this.disabled} @change=${s=>this.emit(s.target.checked)}></ha-switch>
        </label>
        ${this.error?l`<div class="error">${this.error}</div>`:p}`:l`
      <div class="head"><span class="label">${this.label}${e?l`<span class="req">*</span>`:p}</span>${this.info()}</div>
      <ha-selector
        .hass=${this.hass}
        .selector=${ve(this.schema)}
        .value=${this.value}
        .required=${e}
        .disabled=${this.disabled}
        .localizeValue=${this.localizeValue}
        @value-changed=${s=>{s.stopPropagation(),this.emit(s.detail.value)}}
      ></ha-selector>
      ${this.error?l`<div class="error">${this.error}</div>`:p}
    `}};b.styles=A`
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
  `,d([m({attribute:!1})],b.prototype,"hass",2),d([m({attribute:!1})],b.prototype,"schema",2),d([m({attribute:!1})],b.prototype,"value",2),d([m()],b.prototype,"label",2),d([m()],b.prototype,"helper",2),d([m()],b.prototype,"error",2),d([m({type:Boolean})],b.prototype,"disabled",2),d([m({attribute:!1})],b.prototype,"localizeValue",2),b=d([C("vt-field")],b);var G={room:{title:"Room",subtitle:"What this thermostat is called and what it measures.",icon:"mdi:sofa-outline"},devices:{title:"Devices",subtitle:"The heaters, valves or climates this thermostat drives.",icon:"mdi:radiator"},correction:{title:"Setpoint correction",subtitle:"The device's built-in sensor sits next to the heat, so VT raises or lowers the target it sends until your room sensor reaches your temperature.",icon:"mdi:tune-vertical"},heating:{title:"Heating control",subtitle:"How much and how often to heat.",icon:"mdi:sine-wave"},presets:{title:"Presets",subtitle:"Which target temperatures apply and who may switch them.",icon:"mdi:format-list-bulleted"},window:{title:"Open window",subtitle:"What happens when a window opens.",icon:"mdi:window-open-variant"},motion:{title:"Motion",subtitle:"Switch preset when someone is in the room.",icon:"mdi:motion-sensor"},presence:{title:"Presence",subtitle:"Lower the temperature when nobody is home.",icon:"mdi:home-account"},power:{title:"Power & energy",subtitle:"Device consumption, load shedding and the central boiler.",icon:"mdi:flash"},boiler:{title:"Central boiler",subtitle:"Turn the boiler on when any thermostat needs heat.",icon:"mdi:water-boiler"},safety:{title:"Sensor loss & manual changes",subtitle:"What to do when the room thermometer goes quiet, and how long a manual change lasts.",icon:"mdi:shield-half-full"},auto_start_stop:{title:"Auto start/stop",subtitle:"Turn the climate off when it is not needed.",icon:"mdi:power-sleep"},lock:{title:"Lock",subtitle:"Stop people or automations from changing this thermostat.",icon:"mdi:lock-outline"},other:{title:"Other",subtitle:"Settings this page does not place yet.",icon:"mdi:dots-horizontal"}},Ge={range:"Outdoor sensor and temperature range",humidity:"Humidity sensor",valve:"Direct valve control",valve_limits:"Valve commands",sync:"Sync the device's internal temperature",tpi:"TPI coefficients",auto_tpi:"Auto-TPI learning",window_detect:"Detection",shedding:"Load shedding",boiler_use:"Central boiler",failure:"Heating failure detection"},Ve={sensor:"Window sensor",drop:"Temperature drop"};var be=i=>i==null||i===""||Array.isArray(i)&&i.length===0;function vt(i,t){return t||(be(i.window_sensor_entity_id)&&!be(i.window_auto_open_threshold)?"drop":"sensor")}function xt(i,t,e,s){let{fields:r}=t;if(i.types&&!i.types.includes(e.thermostat_type))return null;let o=i.control,n=o?.type==="feature"&&o.key&&r[o.key]?o.key:void 0;if(n&&r[n].inherited)return null;let a=o?.type==="central"?o.key:o?.central,c=a&&r[a]?a:void 0,u=i.fields.filter(h=>r[h.key]).map(h=>({...h,desc:r[h.key]})),f;if(o?.type==="method"&&o.options){f={options:o.options,current:s};let h=new Set(Object.entries(o.options).filter(([y])=>y!==s).flatMap(([,y])=>y));u=u.filter(y=>!h.has(y.key))}return!u.length&&!n?null:{id:i.id,featureKey:n,featureOn:n?e[n]===!0:!0,centralKey:c,usesCentral:c?e[c]!==!1:!1,method:f,own:u.filter(h=>!h.desc.inherited),inherited:u.filter(h=>h.desc.inherited)}}function Xe(i,t,e){let{fields:s}=i,r=vt(t,e),o=new Set(i.layout.control_keys),n=new Set,a=[],c=f=>{f.groups.filter(_=>!_.types||_.types.includes(t.thermostat_type)).forEach(_=>_.fields.forEach(ee=>n.add(ee.key)));let h=f.control?.key&&s[f.control.key]?f.control.key:void 0,y=f.central&&s[f.central]?f.central:void 0,$=f.groups.map(_=>xt(_,i,t,r)).filter(_=>!!_);if(!$.length&&!h)return;let R=new Set;$.forEach(_=>[..._.own,..._.inherited].forEach(ee=>R.add(ee.desc.step))),a.push({id:f.id,featureKey:h,featureOn:h?t[h]===!0:!0,centralKey:y,usesCentral:y?t[y]!==!1:!1,groups:$,steps:R})};i.layout.cards.forEach(c);let u=Object.keys(s).filter(f=>!n.has(f)&&!o.has(f));return u.length&&c({id:"other",groups:[{id:"other",control:null,fields:u.map(f=>({key:f,level:"common"}))}]}),a}function Je(i,t){let e={};for(let s of i){if(!s.featureOn)continue;let r=s.groups.filter(o=>o.featureOn).flatMap(o=>o.own).filter(o=>o.desc.schema.required&&be(t[o.key])).map(o=>o.key);r.length&&(e[s.id]=r)}return e}function Ye(i,t){let e=i;for(let[s,r]of Object.entries(t.fields))!r.inherited&&r.schema.default!==void 0&&e[s]===void 0&&(e===i&&(e={...i}),e[s]=r.schema.default);return e}var bt=760,g=class extends x{constructor(){super(...arguments);this.narrow=!1;this.heading="";this.data={};this.dirty=!1;this.saving=!1;this.errors={};this.wide=!0;this.describeSeq=0;this.resizer=new ResizeObserver(([e])=>this.wide=e.contentRect.width>=bt)}connectedCallback(){super.connectedCallback(),this.resizer.observe(this)}disconnectedCallback(){this.resizer.disconnect(),super.disconnectedCallback()}willUpdate(e){(e.has("entryId")||e.has("newType"))&&this.hass&&this.load()}async load(){this.loadError=void 0,this.banner=void 0,this.errors={},this.dirty=!1,this.windowMethod=void 0,this.layout=void 0;try{if(this.entryId){let e=await Ne(this.hass,this.entryId);this.heading=e.title,await this.applyLayout(e.data,e)}else if(this.newType){let e=await De(this.hass,this.newType);this.heading=U(this.hass,this.newType),await this.applyLayout(e.data,e)}}catch(e){this.loadError=e?.message??String(e)}}async applyLayout(e,s){for(let r=0;r<4;r++){let o=Ye(e,s);if(o===e)break;e=o,s=await ue(this.hass,e)}this.data=e,this.layout=s}async change(e){let s={...this.data};for(let[n,a]of Object.entries(e))a===void 0?delete s[n]:s[n]=a;this.data=s,this.dirty=!0;let r=++this.describeSeq,o=await ue(this.hass,s);r===this.describeSeq&&await this.applyLayout(this.data,o)}setWindowMethod(e){this.windowMethod=e;let s=o=>this.layout?.fields[o]&&!this.layout.fields[o].inherited,r=e==="drop"?["window_sensor_entity_id"]:["window_auto_open_threshold","window_auto_close_threshold","window_auto_max_duration"].filter(s);this.change(Object.fromEntries(r.map(o=>[o,void 0])))}async onSave(){this.saving=!0,this.banner=void 0,this.errors={};try{let e=await je(this.hass,this.data,this.entryId);if(e.success)this.dirty=!1,this.banner={type:"success",text:"Saved. The thermostat has been reloaded."},this.dispatchEvent(new CustomEvent("vtherm-saved",{bubbles:!0,composed:!0})),!this.entryId&&e.entry_id&&this.dispatchEvent(new CustomEvent("vtherm-created",{detail:{entryId:e.entry_id},bubbles:!0,composed:!0}));else if(e.incomplete)this.banner={type:"warning",text:"Not saved: some required settings are still empty. They are marked in the index."};else{this.errors=e.errors,this.banner={type:"error",text:"Not saved: Versatile Thermostat rejected a setting. It is marked below."};let s=Object.keys(e.errors)[0],r=this.cards().find(o=>o.steps.has(s));r&&this.updateComplete.then(()=>this.scrollToCard(r.id))}}catch(e){this.banner={type:"error",text:e?.message??String(e)}}finally{this.saving=!1}}cards(){return this.layout?Xe(this.layout,this.data,this.windowMethod):[]}scrollToCard(e){this.renderRoot.querySelector(`#card-${e}`)?.scrollIntoView({behavior:"smooth",block:"start"})}fieldErrors(){let e={};for(let s of Object.values(this.errors))for(let[r,o]of Object.entries(s))r!=="base"&&(e[r]=me(this.hass,o));return e}render(){if(this.loadError)return l`<ha-alert alert-type="error">${this.loadError}</ha-alert>`;if(!this.layout)return l`<div class="loading"><ha-spinner></ha-spinner></div>`;let e=this.cards(),s=Je(e,this.data),r=Object.values(s).reduce((n,a)=>n+a.length,0),o=this.fieldErrors();return l`
      <div class="toolbar">
        <div class="title">
          <div class="name">${this.data.name||this.heading}</div>
          <div class="sub">${U(this.hass,this.data.thermostat_type)}${this.entryId?"":" \xB7 new"}</div>
        </div>
        ${r?l`<span class="chip warn">${r} required empty</span>`:p}
        ${this.dirty?l`<span class="chip">Unsaved changes</span>`:p}
        <ha-button .disabled=${this.saving||!this.dirty&&!!this.entryId} @click=${this.onSave}>
          ${this.entryId?"Save":"Create"}
        </ha-button>
      </div>
      <div class="body ${this.wide?"wide":"narrow"}">
        ${this.renderIndex(e,s,o)}
        <div class="content">
          ${this.banner?l`<ha-alert alert-type=${this.banner.type}>${this.banner.text}</ha-alert>`:p}
          ${this.renderColumns(e,o)}
        </div>
      </div>
    `}cardHasError(e,s){return e.groups.flatMap(o=>o.own.map(n=>n.key)).some(o=>s[o])||[...e.steps].some(o=>this.errors[o]?.base)}renderIndex(e,s,r){return l`<nav class="index" aria-label="Sections">
      ${e.map(o=>{let n=G[o.id]??G.other,a=l`<ha-icon class="ok" icon="mdi:check"></ha-icon>`;return o.featureOn?this.cardHasError(o,r)?a=l`<span class="state err">Error</span>`:s[o.id]?a=l`<span class="state warn">${s[o.id].length} empty</span>`:o.usesCentral&&(a=l`<span class="state">Central</span>`):a=l`<span class="state">Off</span>`,l`<button class=${o.featureOn?"":"off"} @click=${()=>this.scrollToCard(o.id)}>
          <ha-icon icon=${n.icon}></ha-icon><span class="label">${n.title}</span>${a}
        </button>`})}
    </nav>`}renderColumns(e,s){return l`<div class="col">${e.map(r=>this.renderCard(r,s))}</div>`}renderCard(e,s){let r=G[e.id]??G.other,o=[...e.steps].map(a=>this.errors[a]?.base).filter(Boolean),n=e.groups.flatMap(a=>a.inherited);return l`
      <section class="card ${e.featureOn?"":"off"}" id="card-${e.id}">
        <header>
          <ha-icon icon=${r.icon}></ha-icon>
          <div class="htext">
            <h2>${r.title}</h2>
            <p>${r.subtitle}</p>
          </div>
          ${e.featureKey?this.featureSwitch(e.featureKey,e.featureOn):p}
        </header>
        ${e.featureOn?l`
              ${e.centralKey?l`<div class="cardctl">${this.centralSwitch(e.centralKey,e.usesCentral)}</div>`:p}
              ${e.centralKey&&n.length?this.inheritedBlock(n):p}
              ${o.map(a=>l`<ha-alert alert-type="error">${me(this.hass,a)}</ha-alert>`)}
              ${e.groups.map(a=>this.renderGroup(a,s,!!e.centralKey))}
            `:p}
      </section>
    `}renderGroup(e,s,r=!1){let o=Ge[e.id],n=e.own.filter(u=>u.level!=="advanced"),a=e.own.filter(u=>u.level==="advanced"),c=o||e.featureKey||e.centralKey;return l`
      <div class="group">
        ${c?l`<div class="ghead">
              <h3>${o??""}</h3>
              ${e.centralKey&&e.featureOn?this.centralSwitch(e.centralKey,e.usesCentral):p}
              ${e.featureKey?this.featureSwitch(e.featureKey,e.featureOn):p}
            </div>`:p}
        ${e.featureOn?l`
              ${e.method?this.methodChoice(e.method):p}
              ${n.length?l`<div class="fields">${n.map(u=>this.field(u,s))}</div>`:p}
              ${e.inherited.length&&!r?this.inheritedBlock(e.inherited):p}
              ${a.length?l`<details class="adv">
                    <summary>Advanced settings <span class="count">${a.length}</span></summary>
                    <div class="fields">${a.map(u=>this.field(u,s))}</div>
                  </details>`:p}
            `:p}
      </div>
    `}field(e,s,r=!1){let o=this.layout.placeholders,n=r?this.layout.central_values[e.key]:this.data[e.key];return l`<vt-field
      class=${xe(e.desc.schema)?"bool":Fe(e.desc.schema)?"wide":""}
      .hass=${this.hass}
      .schema=${e.desc.schema}
      .value=${n}
      .label=${fe(this.hass,e.desc.step,e.key,o)}
      .helper=${Ke(this.hass,e.desc.step,e.key,o)}
      .error=${r?"":s[e.key]??""}
      .disabled=${r}
      .localizeValue=${We(this.hass)}
      @field-changed=${r?void 0:a=>this.change({[a.detail.key]:a.detail.value})}
    ></vt-field>`}inheritedBlock(e){let s=this.layout.placeholders,r=e.filter(n=>!["",null,void 0].includes(this.layout.central_values[n.key])),o=this.layout.central_entry_id;return l`<details class="inherited">
      <summary>
        <ha-icon icon="mdi:link-variant"></ha-icon>
        <span class="from">From the central configuration</span>
        ${r.length?l`<span class="values">${r.map(n=>l`<span class="kv"
                ><span class="k">${fe(this.hass,n.desc.step,n.key,s)}</span>
                <span class="v">${this.formatValue(this.layout.central_values[n.key])}</span></span
              >`)}</span>`:l`<span class="values none">Nothing set there, so Versatile Thermostat's defaults apply.</span>`}
      </summary>
      <div class="fields">${e.map(n=>this.field(n,{},!0))}</div>
      ${o?l`<a class="central-link" href="?entry=${o}" @click=${n=>this.openCentral(n,o)}
            >Edit the central configuration</a
          >`:p}
    </details>`}openCentral(e,s){e.preventDefault(),this.dispatchEvent(new CustomEvent("vtherm-open",{detail:{entryId:s},bubbles:!0,composed:!0}))}formatValue(e){return typeof e=="boolean"?e?"on":"off":Array.isArray(e)?e.map(s=>this.formatValue(s)).join(", "):typeof e=="string"&&this.hass.states[e]?this.hass.states[e].attributes.friendly_name??e:String(e)}featureSwitch(e,s){return l`<ha-switch
      .checked=${s}
      aria-label=${s?"Turn off":"Turn on"}
      @change=${r=>this.change({[e]:r.target.checked})}
    ></ha-switch>`}centralSwitch(e,s){return l`<div class="seg" role="radiogroup" aria-label="Where the values come from">
      <button role="radio" aria-checked=${s} class=${s?"on":""} @click=${()=>this.change({[e]:!0})}>Central</button>
      <button role="radio" aria-checked=${!s} class=${s?"":"on"} @click=${()=>this.change({[e]:!1})}>Own</button>
    </div>`}methodChoice(e){return l`<div class="seg wide" role="radiogroup" aria-label="Detection method">
      ${Object.keys(e.options).map(s=>l`<button role="radio" aria-checked=${s===e.current} class=${s===e.current?"on":""} @click=${()=>this.setWindowMethod(s)}>
            ${Ve[s]??s}
          </button>`)}
    </div>`}};g.styles=A`
    :host { display: block; --gap: 16px; }
    .loading { display: flex; justify-content: center; padding: 64px; }
    .toolbar {
      position: sticky; top: 0; max-width: 1500px; margin: 0 auto; box-sizing: border-box; z-index: 3; display: flex; align-items: center; gap: 12px;
      padding: 8px 16px; background: var(--app-header-background-color, var(--primary-background-color));
      border-bottom: 1px solid var(--divider-color);
    }
    .title { flex: 1; min-width: 0; }
    .name { font-size: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sub { color: var(--secondary-text-color); font-size: 13px; }
    .chip { font-size: 12px; padding: 2px 10px; border-radius: 12px; background: var(--secondary-background-color); color: var(--secondary-text-color); white-space: nowrap; }
    .chip.warn { background: rgba(var(--rgb-warning-color, 255, 166, 0), 0.18); color: var(--warning-color); }

    .body { display: grid; gap: var(--gap); padding: var(--gap); max-width: 1500px; margin: 0 auto; box-sizing: border-box; }
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
  `,d([m({attribute:!1})],g.prototype,"hass",2),d([m()],g.prototype,"entryId",2),d([m()],g.prototype,"newType",2),d([m({type:Boolean})],g.prototype,"narrow",2),d([v()],g.prototype,"heading",2),d([v()],g.prototype,"data",2),d([v()],g.prototype,"layout",2),d([v()],g.prototype,"windowMethod",2),d([v()],g.prototype,"dirty",2),d([v()],g.prototype,"saving",2),d([v()],g.prototype,"errors",2),d([v()],g.prototype,"banner",2),d([v()],g.prototype,"loadError",2),d([v()],g.prototype,"wide",2),g=d([C("vtherm-editor")],g);function Ze(){let i=new URLSearchParams(window.location.search);return{entryId:i.get("entry")??void 0,newType:i.get("new")??void 0}}var w=class extends x{constructor(){super(...arguments);this.narrow=!1;this.ready=!1;this.entries=[];this.types=[];this.selection=Ze();this.onLocation=()=>this.selection=Ze()}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.onLocation),window.addEventListener("popstate",this.onLocation)}disconnectedCallback(){window.removeEventListener("location-changed",this.onLocation),window.removeEventListener("popstate",this.onLocation),super.disconnectedCallback()}async firstUpdated(){await Promise.all([qe(),Be(this.hass),this.refreshEntries()]),this.ready=!0}async refreshEntries(){let e=await Me(this.hass);this.entries=e.entries,this.types=e.thermostat_types}navigate(e){if(this.renderRoot.querySelector("vtherm-editor")?.dirty&&!confirm("Discard the unsaved changes on this thermostat?"))return;let r=e.entryId?`?entry=${e.entryId}`:e.newType?`?new=${e.newType}`:"";history.pushState(null,"",`${window.location.pathname}${r}`),window.dispatchEvent(new CustomEvent("location-changed"))}effectiveSelection(){let{entryId:e,newType:s}=this.selection;return e||s?this.selection:{entryId:this.entries[0]?.entry_id}}render(){let e=this.effectiveSelection();return l`
      <div class="header">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="title">Versatile Thermostat</div>
      </div>
      ${this.ready?l`
            <div class="switcher">
              <vtherm-switcher
                .hass=${this.hass}
                .entries=${this.entries}
                .types=${this.types}
                .selected=${e.entryId}
                .newType=${e.newType}
                @vtherm-open=${s=>this.navigate(s.detail)}
              ></vtherm-switcher>
            </div>
            ${e.entryId||e.newType?l`<vtherm-editor
                  .hass=${this.hass}
                  .narrow=${this.narrow}
                  .entryId=${e.entryId}
                  .newType=${e.newType}
                  @vtherm-open=${s=>this.navigate(s.detail)}
                  @vtherm-saved=${()=>this.refreshEntries()}
                  @vtherm-created=${async s=>{await this.refreshEntries(),this.navigate({entryId:s.detail.entryId})}}
                ></vtherm-editor>`:l`<div class="empty">No Versatile Thermostats yet. Use “New” above to create the first one.</div>`}
          `:l`<div class="loading"><ha-spinner></ha-spinner></div>`}
    `}};w.styles=A`
    :host { display: block; min-height: 100vh; background: var(--primary-background-color); color: var(--primary-text-color); }
    .header {
      display: flex; align-items: center; height: var(--header-height, 56px); padding: 0 12px; gap: 12px;
      background: var(--app-header-background-color); color: var(--app-header-text-color, var(--text-primary-color));
      border-bottom: var(--app-header-border-bottom, none);
    }
    .title { font-size: 20px; }
    .switcher { padding: 16px 16px 4px; max-width: 1500px; margin: 0 auto; }
    .loading, .empty { display: flex; justify-content: center; padding: 64px; color: var(--secondary-text-color); }
  `,d([m({attribute:!1})],w.prototype,"hass",2),d([m({type:Boolean})],w.prototype,"narrow",2),d([m({attribute:!1})],w.prototype,"panel",2),d([v()],w.prototype,"ready",2),d([v()],w.prototype,"entries",2),d([v()],w.prototype,"types",2),d([v()],w.prototype,"selection",2),w=d([C("vtherm-config-panel")],w);export{w as VThermConfigPanel};
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
