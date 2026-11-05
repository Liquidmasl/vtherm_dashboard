var Kt=Object.defineProperty;var Jt=Object.getOwnPropertyDescriptor;var d=(r,t,e,s)=>{for(var i=s>1?void 0:s?Jt(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&Kt(t,e,i),i};var K=globalThis,J=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol(),ut=new WeakMap,N=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==X)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(J&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ut.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ut.set(e,t))}return t}toString(){return this.cssText}},mt=r=>new N(typeof r=="string"?r:r+"",void 0,X),E=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new N(e,r,X)},ft=(r,t)=>{if(J)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=K.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},V=J?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return mt(e)})(r):r;var{is:Yt,defineProperty:Zt,getOwnPropertyDescriptor:Gt,getOwnPropertyNames:Qt,getOwnPropertySymbols:Xt,getPrototypeOf:Vt}=Object,Y=globalThis,gt=Y.trustedTypes,te=gt?gt.emptyScript:"",ee=Y.reactiveElementPolyfillSupport,L=(r,t)=>r,D={toAttribute(r,t){switch(t){case Boolean:r=r?te:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Z=(r,t)=>!Yt(r,t),yt={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??=Symbol("metadata"),Y.litPropertyMetadata??=new WeakMap;var b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=yt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Zt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=Gt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let l=i?.call(this);n?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??yt}static _$Ei(){if(this.hasOwnProperty(L("elementProperties")))return;let t=Vt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(L("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L("properties"))){let e=this.properties,s=[...Qt(e),...Xt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(V(i))}else t!==void 0&&e.push(V(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ft(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:D).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:D;this._$Em=i;let l=o.fromAttribute(e,n.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let o=this.constructor;if(i===!1&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??Z)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,n,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[L("elementProperties")]=new Map,b[L("finalized")]=new Map,ee?.({ReactiveElement:b}),(Y.reactiveElementVersions??=[]).push("2.1.2");var ot=globalThis,vt=r=>r,G=ot.trustedTypes,$t=G?G.createPolicy("lit-html",{createHTML:r=>r}):void 0,St="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,Et="?"+A,se=`<${Et}>`,P=document,j=()=>P.createComment(""),z=r=>r===null||typeof r!="object"&&typeof r!="function",at=Array.isArray,re=r=>at(r)||typeof r?.[Symbol.iterator]=="function",tt=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_t=/-->/g,bt=/>/g,C=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xt=/'/g,wt=/"/g,Ct=/^(?:script|style|textarea|title)$/i,lt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),h=lt(1),ge=lt(2),ye=lt(3),R=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),At=new WeakMap,k=P.createTreeWalker(P,129);function kt(r,t){if(!at(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return $t!==void 0?$t.createHTML(t):t}var ie=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=M;for(let l=0;l<e;l++){let a=r[l],u,g,p=-1,_=0;for(;_<a.length&&(o.lastIndex=_,g=o.exec(a),g!==null);)_=o.lastIndex,o===M?g[1]==="!--"?o=_t:g[1]!==void 0?o=bt:g[2]!==void 0?(Ct.test(g[2])&&(i=RegExp("</"+g[2],"g")),o=C):g[3]!==void 0&&(o=C):o===C?g[0]===">"?(o=i??M,p=-1):g[1]===void 0?p=-2:(p=o.lastIndex-g[2].length,u=g[1],o=g[3]===void 0?C:g[3]==='"'?wt:xt):o===wt||o===xt?o=C:o===_t||o===bt?o=M:(o=C,i=void 0);let w=o===C&&r[l+1].startsWith("/>")?" ":"";n+=o===M?a+se:p>=0?(s.push(u),a.slice(0,p)+St+a.slice(p)+A+w):a+A+(p===-2?l:w)}return[kt(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},q=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,l=t.length-1,a=this.parts,[u,g]=ie(t,e);if(this.el=r.createElement(u,s),k.currentNode=this.el.content,e===2||e===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=k.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let p of i.getAttributeNames())if(p.endsWith(St)){let _=g[o++],w=i.getAttribute(p).split(A),W=/([.?@])?(.*)/.exec(_);a.push({type:1,index:n,name:W[2],strings:w,ctor:W[1]==="."?st:W[1]==="?"?rt:W[1]==="@"?it:O}),i.removeAttribute(p)}else p.startsWith(A)&&(a.push({type:6,index:n}),i.removeAttribute(p));if(Ct.test(i.tagName)){let p=i.textContent.split(A),_=p.length-1;if(_>0){i.textContent=G?G.emptyScript:"";for(let w=0;w<_;w++)i.append(p[w],j()),k.nextNode(),a.push({type:2,index:++n});i.append(p[_],j())}}}else if(i.nodeType===8)if(i.data===Et)a.push({type:2,index:n});else{let p=-1;for(;(p=i.data.indexOf(A,p+1))!==-1;)a.push({type:7,index:n}),p+=A.length-1}n++}}static createElement(t,e){let s=P.createElement("template");return s.innerHTML=t,s}};function I(r,t,e=r,s){if(t===R)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=z(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=I(r,i._$AS(r,t.values),i,s)),t}var et=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);k.currentNode=i;let n=k.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new T(n,n.nextSibling,this,t):a.type===1?u=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(u=new nt(n,this,t)),this._$AV.push(u),a=s[++l]}o!==a?.index&&(n=k.nextNode(),o++)}return k.currentNode=P,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},T=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),z(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==R&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):re(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=q.createElement(kt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new et(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=At.get(t.strings);return e===void 0&&At.set(t.strings,e=new q(t)),e}k(t){at(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new r(this.O(j()),this.O(j()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=vt(t).nextSibling;vt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},O=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=I(this,t,e,0),o=!z(t)||t!==this._$AH&&t!==R,o&&(this._$AH=t);else{let l=t,a,u;for(t=n[0],a=0;a<n.length-1;a++)u=I(this,l[s+a],e,a),u===R&&(u=this._$AH[a]),o||=!z(u)||u!==this._$AH[a],u===c?t=c:t!==c&&(t+=(u??"")+n[a+1]),this._$AH[a]=u}o&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},st=class extends O{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}},rt=class extends O{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}},it=class extends O{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=I(this,t,e,0)??c)===R)return;let s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},nt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}};var ne=ot.litHtmlPolyfillSupport;ne?.(q,T),(ot.litHtmlVersions??=[]).push("3.3.3");var Pt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new T(t.insertBefore(j(),n),n,void 0,e??{})}return i._$AI(r),i};var ct=globalThis,v=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Pt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}};v._$litElement$=!0,v.finalized=!0,ct.litElementHydrateSupport?.({LitElement:v});var oe=ct.litElementPolyfillSupport;oe?.({LitElement:v});(ct.litElementVersions??=[]).push("4.2.2");var U=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};var ae={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:Z},le=(r=ae,t,e)=>{let{kind:s,metadata:i}=e,n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){let{name:o}=e;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r,!0,l)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(s==="setter"){let{name:o}=e;return function(l){let a=this[o];t.call(this,l),this.requestUpdate(o,a,r,!0,l)}}throw Error("Unsupported decorator location: "+s)};function y(r){return(t,e)=>typeof e=="object"?le(r,t,e):((s,i,n)=>{let o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}function f(r){return y({...r,state:!0,attribute:!1})}async function Rt(){if(customElements.get("ha-form")&&customElements.get("ha-selector"))return;await customElements.whenDefined("partial-panel-resolver");let r=document.createElement("partial-panel-resolver");r.hass={panels:[{url_path:"tmp",component_name:"config"}]},r._updateRoutes(),await r.routerOptions.routes.tmp.load(),await customElements.whenDefined("ha-panel-config"),await document.createElement("ha-panel-config").routerOptions.routes.automation.load(),await customElements.whenDefined("ha-form")}var ce="component.versatile_thermostat";async function It(r){await Promise.all([r.loadBackendTranslation("config","versatile_thermostat"),r.loadBackendTranslation("selector","versatile_thermostat")])}function S(r,t,e){return r.localize(`${ce}.${t}`,e)||""}var F=(r,t,e)=>S(r,`config.step.${t}.title`,e)||t,Ot=(r,t,e)=>S(r,`config.step.${t}.description`,e),Ut=(r,t,e,s)=>S(r,`config.step.${t}.data.${e}`,s)||e,Ht=(r,t,e,s)=>S(r,`config.step.${t}.data_description.${e}`,s),ht=(r,t)=>S(r,`config.error.${t}`)||S(r,`options.error.${t}`)||t,H=(r,t)=>S(r,`selector.thermostat_type.options.${t}`)||t,Nt=r=>t=>S(r,`selector.${t}`);var B="vtherm_config_panel",Lt=r=>r.callWS({type:`${B}/list`}),Dt=(r,t)=>r.callWS({type:`${B}/get`,entry_id:t}),Mt=(r,t)=>r.callWS({type:`${B}/new`,thermostat_type:t}),dt=(r,t)=>r.callWS({type:`${B}/describe`,data:t}),jt=(r,t,e)=>r.callWS({type:`${B}/save`,data:t,...e?{entry_id:e}:{}});var zt="thermostat_central_config",qt={thermostat_central_config:"mdi:cog-transfer",thermostat_over_switch:"mdi:toggle-switch-outline",thermostat_over_climate:"mdi:thermostat",thermostat_over_valve:"mdi:pipe-valve"},x=class extends v{constructor(){super(...arguments);this.types=[];this.picking=!1}connectedCallback(){super.connectedCallback(),this.refresh()}async refresh(){if(!this.hass)return;let e=await Lt(this.hass);this.entries=e.entries,this.types=e.thermostat_types}open(e){this.dispatchEvent(new CustomEvent("vtherm-open",{detail:e,bubbles:!0,composed:!0}))}render(){if(!this.entries)return h`<div class="loading"><ha-spinner></ha-spinner></div>`;let e=this.entries.some(i=>i.thermostat_type===zt),s=this.types.filter(i=>i!==zt||!e);return h`
      <div class="content">
        ${e?c:h`<ha-alert alert-type="info">
              No central configuration yet. Creating one first lets every VTherm share sensors, presets and
              advanced settings instead of repeating them.
            </ha-alert>`}
        <ha-card outlined>
          ${this.entries.length===0?h`<div class="empty">No Versatile Thermostats yet.</div>`:c}
          ${this.entries.map(i=>this.renderRow(i))}
        </ha-card>
        ${this.picking?h`<ha-card outlined header="New VTherm">
              ${s.map(i=>h`<div class="row" @click=${()=>this.open({newType:i})}>
                  <ha-icon icon=${qt[i]??"mdi:thermostat"}></ha-icon>
                  <div class="main"><div class="name">${H(this.hass,i)}</div></div>
                  <ha-icon icon="mdi:chevron-right"></ha-icon>
                </div>`)}
            </ha-card>`:h`<div class="actions"><ha-button @click=${()=>this.picking=!0}>+ New VTherm</ha-button></div>`}
      </div>
    `}renderRow(e){let s=e.climate_entity_id?this.hass.states[e.climate_entity_id]:void 0,i=[H(this.hass,e.thermostat_type),e.underlying_count?`${e.underlying_count} underlying`:"",e.prop_function??""].filter(Boolean);return h`
      <div class="row" @click=${()=>this.open({entryId:e.entry_id})}>
        <ha-icon icon=${qt[e.thermostat_type]??"mdi:thermostat"}></ha-icon>
        <div class="main">
          <div class="name">${e.title}</div>
          <div class="sub">${i.join(" \xB7 ")}</div>
        </div>
        ${s?h`<div class="state">
              ${s.attributes.current_temperature??"\u2013"}° → ${s.attributes.temperature??"\u2013"}°
              <span class="sub">${this.hass.formatEntityState?.(s)??s.state}</span>
            </div>`:c}
        ${e.loaded?c:h`<span class="badge warn">not loaded</span>`}
        <ha-icon icon="mdi:chevron-right"></ha-icon>
      </div>
    `}};x.styles=E`
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
  `,d([y({attribute:!1})],x.prototype,"hass",2),d([f()],x.prototype,"entries",2),d([f()],x.prototype,"types",2),d([f()],x.prototype,"picking",2),x=d([U("vtherm-list")],x);var he=r=>r==null||r===""||Array.isArray(r)&&r.length===0,pt=(r,t)=>!!r.spec_schema&&(!r.central_toggle||t[r.central_toggle]===!1);function Tt(r,t){return pt(r,t)?[...r.schema,...r.spec_schema]:r.schema}function Ft(r,t){let e=r;for(let s of t)for(let i of Tt(s,r))i.default!==void 0&&e[i.name]===void 0&&(e===r&&(e={...r}),e[i.name]=i.default);return e}function Bt(r,t){let e={};for(let s of t){let i=Tt(s,r).filter(n=>n.required&&he(r[n.name])).map(n=>n.name);i.length&&(e[s.step]=i)}return e}var m=class extends v{constructor(){super(...arguments);this.narrow=!1;this.heading="";this.data={};this.sections=[];this.placeholders={};this.dirty=!1;this.saving=!1;this.errors={};this.describeSeq=0}willUpdate(e){(e.has("entryId")||e.has("newType"))&&this.hass&&this.load()}async load(){this.loadError=void 0,this.banner=void 0,this.errors={},this.dirty=!1;try{if(this.entryId){let e=await Dt(this.hass,this.entryId);this.heading=e.title,await this.applyLayout(e.data,e)}else if(this.newType){let e=await Mt(this.hass,this.newType);this.heading=H(this.hass,this.newType),await this.applyLayout(e.data,e)}}catch(e){this.loadError=e?.message??String(e)}}async applyLayout(e,s){for(let i=0;i<4;i++){let n=Ft(e,s.sections);if(n===e)break;e=n,s=await dt(this.hass,e)}this.data=e,this.sections=s.sections,this.placeholders=s.placeholders}async onChange(e){this.data=e,this.dirty=!0;let s=++this.describeSeq,i=await dt(this.hass,e);s===this.describeSeq&&await this.applyLayout(this.data,i)}async onSave(){this.saving=!0,this.banner=void 0,this.errors={};try{let e=await jt(this.hass,this.data,this.entryId);if(e.success)this.dirty=!1,this.banner={type:"success",text:"Saved. The thermostat has been reloaded."},!this.entryId&&e.entry_id&&this.dispatchEvent(new CustomEvent("vtherm-created",{detail:{entryId:e.entry_id},bubbles:!0,composed:!0}));else if(e.incomplete)this.banner={type:"warning",text:"Not saved: the configuration is not complete yet. Fill the fields marked as missing."};else{this.errors=e.errors;let s=Object.keys(e.errors)[0];this.banner={type:"error",text:`Not saved: check \u201C${F(this.hass,s)}\u201D.`},this.updateComplete.then(()=>this.renderRoot.querySelector(`#section-${s}`)?.scrollIntoView({behavior:"smooth"}))}}catch(e){this.banner={type:"error",text:e?.message??String(e)}}finally{this.saving=!1}}back(){this.dispatchEvent(new CustomEvent("vtherm-back",{bubbles:!0,composed:!0}))}render(){if(this.loadError)return h`<ha-alert alert-type="error">${this.loadError}</ha-alert>`;if(!this.sections.length)return h`<div class="loading"><ha-spinner></ha-spinner></div>`;let e=Bt(this.data,this.sections),s=Object.values(e).reduce((n,o)=>n+o.length,0),i=this.sections.filter(n=>!n.parent);return h`
      <div class="toolbar">
        <ha-icon-button-arrow-prev @click=${this.back}></ha-icon-button-arrow-prev>
        <div class="title">
          <div class="name">${this.data.name||this.heading}</div>
          <div class="sub">${H(this.hass,this.data.thermostat_type)}${this.entryId?"":" \xB7 new"}</div>
        </div>
        ${s?h`<span class="badge warn">${s} missing</span>`:c}
        ${this.dirty?h`<span class="badge">unsaved</span>`:c}
        <ha-button .disabled=${this.saving||!this.dirty&&!!this.entryId} @click=${this.onSave}>
          ${this.entryId?"Save":"Create"}
        </ha-button>
      </div>
      <div class="content">
        ${this.banner?h`<ha-alert alert-type=${this.banner.type}>${this.banner.text}</ha-alert>`:c}
        <nav class="index">
          ${i.map(n=>h`<a href="#section-${n.step}" @click=${o=>this.jump(o,n.step)} class=${e[n.step]||this.errors[n.step]?"warn":""}
              >${F(this.hass,n.step)}</a
            >`)}
        </nav>
        ${i.map(n=>this.renderSection(n,e))}
      </div>
    `}jump(e,s){e.preventDefault(),this.renderRoot.querySelector(`#section-${s}`)?.scrollIntoView({behavior:"smooth"})}renderSection(e,s){let i=this.sections.filter(o=>o.parent===e.step),n=Ot(this.hass,e.step,this.placeholders);return h`
      <ha-card id="section-${e.step}" outlined>
        <div class="card-header">
          <h2>${F(this.hass,e.step)}</h2>
          ${s[e.step]?h`<span class="badge warn">${s[e.step].length} missing</span>`:c}
        </div>
        <div class="card-content">
          ${n?h`<p class="description">${n}</p>`:c}
          ${this.renderErrors(e.step)} ${this.form(e.step,e.schema)} ${this.renderSpec(e)}
          ${i.map(o=>h`
              <div class="subsection" id="section-${o.step}">
                <h3>${F(this.hass,o.step)}</h3>
                ${this.renderErrors(o.step)} ${this.form(o.step,o.schema)}
              </div>
            `)}
        </div>
      </ha-card>
    `}renderSpec(e){return e.spec_schema?pt(e,this.data)?this.form(e.step,e.spec_schema):e.central_values?h`
      <div class="inherited">
        <div class="inherited-label"><ha-icon icon="mdi:link-variant"></ha-icon> Inherited from the central configuration</div>
        ${this.form(e.step,e.spec_schema,e.central_values,!0)}
      </div>
    `:c:c}renderErrors(e){let s=this.errors[e]?.base;return s?h`<ha-alert alert-type="error">${ht(this.hass,s)}</ha-alert>`:c}form(e,s,i=this.data,n=!1){let o=Object.fromEntries(Object.entries(this.errors[e]??{}).filter(([l])=>l!=="base").map(([l,a])=>[l,ht(this.hass,a)]));return h`
      <ha-form
        .hass=${this.hass}
        .data=${i}
        .schema=${s}
        .disabled=${n}
        .error=${o}
        .computeLabel=${l=>Ut(this.hass,e,l.name,this.placeholders)}
        .computeHelper=${l=>Ht(this.hass,e,l.name,this.placeholders)}
        .localizeValue=${Nt(this.hass)}
        @value-changed=${n?void 0:l=>this.onChange(l.detail.value)}
      ></ha-form>
    `}};m.styles=E`
    :host { display: block; }
    .loading { display: flex; justify-content: center; padding: 64px; }
    .toolbar {
      position: sticky; top: 0; z-index: 2; display: flex; align-items: center; gap: 12px;
      padding: 8px 16px; background: var(--app-header-background-color, var(--primary-background-color));
      border-bottom: 1px solid var(--divider-color);
    }
    .title { flex: 1; min-width: 0; }
    .name { font-size: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sub { color: var(--secondary-text-color); font-size: 13px; }
    .badge { font-size: 12px; padding: 2px 8px; border-radius: 10px; background: var(--secondary-background-color); color: var(--secondary-text-color); white-space: nowrap; }
    .badge.warn { background: rgba(var(--rgb-warning-color, 255, 166, 0), 0.2); color: var(--warning-color); }
    .content { max-width: 960px; margin: 0 auto; padding: 16px; display: flex; flex-direction: column; gap: 16px; }
    .index { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 14px; }
    .index a { color: var(--primary-color); text-decoration: none; }
    .index a.warn { color: var(--warning-color); }
    ha-card { scroll-margin-top: 72px; }
    .card-header { display: flex; align-items: center; gap: 12px; padding: 16px 16px 0; }
    .card-header h2 { margin: 0; font-size: 18px; font-weight: 500; flex: 1; }
    .card-content { padding: 8px 16px 16px; display: flex; flex-direction: column; gap: 12px; }
    .description { margin: 0; color: var(--secondary-text-color); font-size: 14px; white-space: pre-line; }
    .inherited { border-left: 3px solid var(--divider-color); padding-left: 12px; opacity: 0.75; }
    .inherited-label { display: flex; align-items: center; gap: 6px; color: var(--secondary-text-color); font-size: 13px; margin-bottom: 8px; --mdc-icon-size: 18px; }
    .subsection { border-top: 1px solid var(--divider-color); padding-top: 12px; scroll-margin-top: 72px; }
    .subsection h3 { margin: 0 0 8px; font-size: 15px; font-weight: 500; }
  `,d([y({attribute:!1})],m.prototype,"hass",2),d([y()],m.prototype,"entryId",2),d([y()],m.prototype,"newType",2),d([y({type:Boolean})],m.prototype,"narrow",2),d([f()],m.prototype,"heading",2),d([f()],m.prototype,"data",2),d([f()],m.prototype,"sections",2),d([f()],m.prototype,"placeholders",2),d([f()],m.prototype,"dirty",2),d([f()],m.prototype,"saving",2),d([f()],m.prototype,"errors",2),d([f()],m.prototype,"banner",2),d([f()],m.prototype,"loadError",2),m=d([U("vtherm-editor")],m);function Wt(){let r=new URLSearchParams(window.location.search),t=r.get("entry"),e=r.get("new");return t?{kind:"edit",entryId:t}:e?{kind:"new",type:e}:{kind:"list"}}var $=class extends v{constructor(){super(...arguments);this.narrow=!1;this.ready=!1;this.view=Wt();this.onLocation=()=>this.view=Wt()}connectedCallback(){super.connectedCallback(),window.addEventListener("location-changed",this.onLocation),window.addEventListener("popstate",this.onLocation)}disconnectedCallback(){window.removeEventListener("location-changed",this.onLocation),window.removeEventListener("popstate",this.onLocation),super.disconnectedCallback()}async firstUpdated(){await Promise.all([Rt(),It(this.hass)]),this.ready=!0}navigate(e){history.pushState(null,"",`${window.location.pathname}${e}`),window.dispatchEvent(new CustomEvent("location-changed"))}render(){return h`
      <div class="header">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="title">Versatile Thermostat</div>
      </div>
      ${this.ready?this.renderView():h`<div class="loading"><ha-spinner></ha-spinner></div>`}
    `}renderView(){let e=this.view;return e.kind==="list"?h`<vtherm-list
        .hass=${this.hass}
        @vtherm-open=${s=>this.navigate(s.detail.entryId?`?entry=${s.detail.entryId}`:`?new=${s.detail.newType}`)}
      ></vtherm-list>`:h`<vtherm-editor
      .hass=${this.hass}
      .narrow=${this.narrow}
      .entryId=${e.kind==="edit"?e.entryId:void 0}
      .newType=${e.kind==="new"?e.type:void 0}
      @vtherm-back=${()=>this.navigate("")}
      @vtherm-created=${s=>this.navigate(`?entry=${s.detail.entryId}`)}
    ></vtherm-editor>`}};$.styles=E`
    :host { display: block; min-height: 100vh; background: var(--primary-background-color); color: var(--primary-text-color); }
    .header {
      display: flex; align-items: center; height: var(--header-height, 56px); padding: 0 12px; gap: 12px;
      background: var(--app-header-background-color); color: var(--app-header-text-color, var(--text-primary-color));
      border-bottom: var(--app-header-border-bottom, none);
    }
    .title { font-size: 20px; }
    .loading { display: flex; justify-content: center; padding: 64px; }
  `,d([y({attribute:!1})],$.prototype,"hass",2),d([y({type:Boolean})],$.prototype,"narrow",2),d([y({attribute:!1})],$.prototype,"panel",2),d([f()],$.prototype,"ready",2),d([f()],$.prototype,"view",2),$=d([U("vtherm-config-panel")],$);export{$ as VThermConfigPanel};
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
