!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=79)}({0:function(e,t){e.exports=React},35:function(e,t,r){"use strict";var n=Array.isArray,i=Object.keys,o=Object.prototype.hasOwnProperty;e.exports=function e(t,r){if(t===r)return!0;if(t&&r&&"object"==typeof t&&"object"==typeof r){var a,u,c,l=n(t),f=n(r);if(l&&f){if((u=t.length)!=r.length)return!1;for(a=u;0!=a--;)if(!e(t[a],r[a]))return!1;return!0}if(l!=f)return!1;var s=t instanceof Date,d=r instanceof Date;if(s!=d)return!1;if(s&&d)return t.getTime()==r.getTime();var v=t instanceof RegExp,p=r instanceof RegExp;if(v!=p)return!1;if(v&&p)return t.toString()==r.toString();var h=i(t);if((u=h.length)!==i(r).length)return!1;for(a=u;0!=a--;)if(!o.call(r,h[a]))return!1;for(a=u;0!=a--;)if(!e(t[c=h[a]],r[c]))return!1;return!0}return t!=t&&r!=r}},7:function(e,t){e.exports=ReactDOM},79:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(80)),o=n(r(0)),a=r(7),u=/[0-9]{1,}/;function c({path:e,raw:t}){const r=e+(e.endsWith("/")?"":"/"),{data:n,error:a}=i.default("https://yukicat-ga-hit.vercel.app/api/ga/?page="+r,{fetcher:e=>fetch(e).then(e=>e.json()),revalidateOnFocus:!1,revalidateOnReconnect:!1}),c=t.replace(/<\/?span>/g,"");return o.default.createElement("span",{"data-raw":t},a?c.replace(u,"-"):n?c.replace(u,n[0].hit):c)}(()=>{var e;const t=document.getElementsByClassName("meta-page-view");for(let r=0;r<t.length;r++){const n=t[r],{attributes:i}=n,u=null===(e=i.getNamedItem("data-path"))||void 0===e?void 0:e.value,l=n.innerHTML;a.hydrate(o.default.createElement(c,{path:u,raw:l}),n)}})()},80:function(e,t,r){"use strict";r.r(t),r.d(t,"trigger",(function(){return T})),r.d(t,"mutate",(function(){return C})),r.d(t,"SWRConfig",(function(){return P})),r.d(t,"useSWRInfinite",(function(){return V})),r.d(t,"cache",(function(){return l}));var n=r(0),i=r(35),o=r.n(i);function a(){return"undefined"==typeof document||void 0===document.visibilityState||"hidden"!==document.visibilityState}var u=new WeakMap,c=0;var l=new(function(){function e(e){void 0===e&&(e={}),this.__cache=new Map(Object.entries(e)),this.__listeners=[]}return e.prototype.get=function(e){var t=this.serializeKey(e)[0];return this.__cache.get(t)},e.prototype.set=function(e,t){var r=this.serializeKey(e)[0];this.__cache.set(r,t),this.notify()},e.prototype.keys=function(){return Array.from(this.__cache.keys())},e.prototype.has=function(e){var t=this.serializeKey(e)[0];return this.__cache.has(t)},e.prototype.clear=function(){this.__cache.clear(),this.notify()},e.prototype.delete=function(e){var t=this.serializeKey(e)[0];this.__cache.delete(t),this.notify()},e.prototype.serializeKey=function(e){var t=null;if("function"==typeof e)try{e=e()}catch(t){e=""}return Array.isArray(e)?(t=e,e=function(e){if(!e.length)return"";for(var t="arg",r=0;r<e.length;++r){var n=void 0;null===e[r]||"object"!=typeof e[r]&&"function"!=typeof e[r]?n="string"==typeof e[r]?'"'+e[r]+'"':String(e[r]):u.has(e[r])?n=u.get(e[r]):(n=c,u.set(e[r],c++)),t+="@"+n}return t}(e)):e=String(e||""),[e,t,e?"err@"+e:""]},e.prototype.subscribe=function(e){var t=this;if("function"!=typeof e)throw new Error("Expected the listener to be a function.");var r=!0;return this.__listeners.push(e),function(){if(r){r=!1;var n=t.__listeners.indexOf(e);n>-1&&(t.__listeners[n]=t.__listeners[t.__listeners.length-1],t.__listeners.length--)}}},e.prototype.notify=function(){for(var e=0,t=this.__listeners;e<t.length;e++){(0,t[e])()}},e}());var f="undefined"!=typeof window&&navigator.connection&&-1!==["slow-2g","2g"].indexOf(navigator.connection.effectiveType),s={onLoadingSlow:function(){},onSuccess:function(){},onError:function(){},onErrorRetry:function(e,t,r,n,i){if(a()&&!("number"==typeof r.errorRetryCount&&i.retryCount>r.errorRetryCount)){var o=Math.min(i.retryCount||0,8),u=~~((Math.random()+.5)*(1<<o))*r.errorRetryInterval;setTimeout(n,u,i)}},errorRetryInterval:1e3*(f?10:5),focusThrottleInterval:5e3,dedupingInterval:2e3,loadingTimeout:1e3*(f?5:3),refreshInterval:0,revalidateOnFocus:!0,revalidateOnReconnect:!0,refreshWhenHidden:!1,refreshWhenOffline:!1,shouldRetryOnError:!0,suspense:!1,compare:o.a};function d(){return void 0===navigator.onLine||navigator.onLine}var v=Object(n.createContext)({});v.displayName="SWRConfigContext";var p=v,h=function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{c(n.next(e))}catch(e){o(e)}}function u(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,u)}c((n=n.apply(e,t||[])).next())}))},y=function(e,t){var r,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}},b="undefined"==typeof window,g=b?null:window.requestIdleCallback||function(e){return setTimeout(e,1)},m=b?n.useEffect:n.useLayoutEffect,O={},w={},j={},_={},x={},S={},R={};if(!b&&window.addEventListener){var E=function(e){if(a()&&d())for(var t in e)e[t][0]&&e[t][0]()};window.addEventListener("visibilitychange",(function(){return E(j)}),!1),window.addEventListener("focus",(function(){return E(j)}),!1),window.addEventListener("online",(function(){return E(_)}),!1)}var T=function(e,t){void 0===t&&(t=!0);var r=l.serializeKey(e),n=r[0],i=r[2];if(!n)return Promise.resolve();var o=x[n];if(n&&o){for(var a=l.get(n),u=l.get(i),c=[],f=0;f<o.length;++f)c.push(o[f](t,a,u,f>0));return Promise.all(c).then((function(){return l.get(n)}))}return Promise.resolve(l.get(n))},k=function(e,t,r){var n=x[e];if(e&&n)for(var i=0;i<n.length;++i)n[i](!1,t,r)},C=function(e,t,r){return void 0===r&&(r=!0),h(void 0,void 0,void 0,(function(){var n,i,o,a,u,c,f,s,d,v,p,h;return y(this,(function(y){switch(y.label){case 0:if(n=l.serializeKey(e),i=n[0],o=n[2],!i)return[2];if(void 0===t)return[2,T(e,r)];if(S[i]=Date.now()-1,R[i]=0,a=S[i],u=w[i],!t||"function"!=typeof t)return[3,5];y.label=1;case 1:return y.trys.push([1,3,,4]),[4,t(l.get(i))];case 2:return c=y.sent(),[3,4];case 3:return s=y.sent(),f=s,[3,4];case 4:return[3,11];case 5:if(!t||"function"!=typeof t.then)return[3,10];y.label=6;case 6:return y.trys.push([6,8,,9]),[4,t];case 7:return c=y.sent(),[3,9];case 8:return d=y.sent(),f=d,[3,9];case 9:return[3,11];case 10:c=t,y.label=11;case 11:if(a!==S[i]||u!==w[i]){if(f)throw f;return[2,c]}if(void 0!==c&&l.set(i,c),l.set(o,f),R[i]=Date.now()-1,v=x[i]){for(p=[],h=0;h<v.length;++h)p.push(v[h](!!r,c,f,h>0));return[2,Promise.all(p).then((function(){if(f)throw f;return l.get(i)}))]}if(f)throw f;return[2,c]}}))}))};var P=p.Provider,z=function(){for(var e=this,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var i,o,u={};t.length>=1&&(i=t[0]),t.length>2?(o=t[1],u=t[2]):"function"==typeof t[1]?o=t[1]:"object"==typeof t[1]&&(u=t[1]);var c=l.serializeKey(i),f=c[0],v=c[1],b=c[2];u=Object.assign({},s,Object(n.useContext)(p),u);var E=Object(n.useRef)(u);m((function(){E.current=u})),void 0===o&&(o=u.fetcher);var T=l.get(f)||u.initialData,P=l.get(b),z=Object(n.useRef)({data:!1,error:!1,isValidating:!1}),I=Object(n.useRef)({data:T,error:P,isValidating:!1});Object(n.useDebugValue)(I.current.data);var M=Object(n.useState)(null)[1],D=Object(n.useCallback)((function(e){var t=!1;for(var r in e)I.current[r]!==e[r]&&(I.current[r]=e[r],z.current[r]&&(t=!0));if(t||u.suspense){if(V.current)return;M({})}}),[]),V=Object(n.useRef)(!1),W=Object(n.useRef)(f),K=Object(n.useRef)({emit:function(e){for(var t,r=[],n=1;n<arguments.length;n++)r[n-1]=arguments[n];V.current||(t=E.current)[e].apply(t,r)}}),L=Object(n.useCallback)((function(e,t){return C(f,e,t)}),[f]),A=function(e,t){t&&(e[f]?e[f].push(t):e[f]=[t])},H=function(e,t){if(e[f]){var r=e[f],n=r.indexOf(t);n>=0&&(r[n]=r[r.length-1],r.pop())}},F=Object(n.useCallback)((function(t){return void 0===t&&(t={}),h(e,void 0,void 0,(function(){var e,r,n,i,a,c,s;return y(this,(function(d){switch(d.label){case 0:if(!f||!o)return[2,!1];if(V.current)return[2,!1];t=Object.assign({dedupe:!1},t),e=!0,r=void 0!==O[f]&&t.dedupe,d.label=1;case 1:return d.trys.push([1,6,,7]),D({isValidating:!0}),n=void 0,i=void 0,r?(i=w[f],[4,O[f]]):[3,3];case 2:return n=d.sent(),[3,5];case 3:return u.loadingTimeout&&!l.get(f)&&setTimeout((function(){e&&K.current.emit("onLoadingSlow",f,u)}),u.loadingTimeout),O[f]=null!==v?o.apply(void 0,v):o(f),w[f]=i=Date.now(),[4,O[f]];case 4:n=d.sent(),setTimeout((function(){delete O[f],delete w[f]}),u.dedupingInterval),K.current.emit("onSuccess",n,f,u),d.label=5;case 5:return w[f]>i||S[f]&&(i<=S[f]||i<=R[f]||0===R[f])?(D({isValidating:!1}),[2,!1]):(l.set(f,n),l.set(b,void 0),a={isValidating:!1},void 0!==I.current.error&&(a.error=void 0),u.compare(I.current.data,n)||(a.data=n),D(a),r||k(f,n,void 0),[3,7]);case 6:return c=d.sent(),delete O[f],delete w[f],l.set(b,c),I.current.error!==c&&(D({isValidating:!1,error:c}),r||k(f,void 0,c)),K.current.emit("onError",c,f,u),u.shouldRetryOnError&&(s=(t.retryCount||0)+1,K.current.emit("onErrorRetry",c,f,u,F,Object.assign({dedupe:!0},t,{retryCount:s}))),[3,7];case 7:return e=!1,[2,!0]}}))}))}),[f]);if(m((function(){if(f){V.current=!1;var e=I.current.data,t=l.get(f)||u.initialData;W.current!==f&&(W.current=f),u.compare(e,t)||D({data:t});var r=function(){return F({dedupe:!0})};(u.revalidateOnMount||!u.initialData&&void 0===u.revalidateOnMount)&&(void 0!==t?g(r):r());var n=!1,i=function(){!n&&E.current.revalidateOnFocus&&(n=!0,r(),setTimeout((function(){return n=!1}),E.current.focusThrottleInterval))},o=function(){E.current.revalidateOnReconnect&&r()},a=function(e,t,n,i){void 0===e&&(e=!0),void 0===i&&(i=!0);var o={},a=!1;return void 0===t||u.compare(I.current.data,t)||(o.data=t,a=!0),I.current.error!==n&&(o.error=n,a=!0),a&&D(o),!!e&&(i?r():F())};return A(j,i),A(_,o),A(x,a),function(){D=function(){return null},V.current=!0,H(j,i),H(_,o),H(x,a)}}}),[f,F]),m((function(){var t=null,r=function(){return h(e,void 0,void 0,(function(){return y(this,(function(e){switch(e.label){case 0:return I.current.error||!u.refreshWhenHidden&&!a()||!u.refreshWhenOffline&&!d()?[3,2]:[4,F({dedupe:!0})];case 1:e.sent(),e.label=2;case 2:return u.refreshInterval&&(t=setTimeout(r,u.refreshInterval)),[2]}}))}))};return u.refreshInterval&&(t=setTimeout(r,u.refreshInterval)),function(){t&&clearTimeout(t)}}),[u.refreshInterval,u.refreshWhenHidden,u.refreshWhenOffline,F]),u.suspense){var N=l.get(f),G=l.get(b);if(void 0===N&&(N=T),void 0===G&&(G=P),void 0===N&&void 0===G){if(O[f]||F(),O[f]&&"function"==typeof O[f].then)throw O[f];N=O[f]}if(void 0===N&&G)throw G;return{error:G,data:N,revalidate:F,mutate:L,isValidating:I.current.isValidating}}return Object(n.useMemo)((function(){var e={revalidate:F,mutate:L};return Object.defineProperties(e,{error:{get:function(){return z.current.error=!0,W.current===f?I.current.error:P},enumerable:!0},data:{get:function(){return z.current.data=!0,W.current===f?I.current.data:T},enumerable:!0},isValidating:{get:function(){return z.current.isValidating=!0,I.current.isValidating},enumerable:!0}}),e}),[F])},I=function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{c(n.next(e))}catch(e){o(e)}}function u(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,u)}c((n=n.apply(e,t||[])).next())}))},M=function(e,t){var r,n,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function u(o){return function(u){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,u])}}},D=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(n=Object.getOwnPropertySymbols(e);i<n.length;i++)t.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(r[n[i]]=e[n[i]])}return r};function V(){for(var e=this,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var i,o,a={};t.length>=1&&(i=t[0]),t.length>2?(o=t[1],a=t[2]):"function"==typeof t[1]?o=t[1]:"object"==typeof t[1]&&(a=t[1]);var u=(a=Object.assign({},s,Object(n.useContext)(p),a)).initialSize,c=void 0===u?1:u,f=a.revalidateAll,d=void 0!==f&&f,v=a.persistSize,h=void 0!==v&&v,y=a.fetcher,b=D(a,["initialSize","revalidateAll","persistSize","fetcher"]);void 0===o&&(o=y);var g=null;try{g=l.serializeKey(i(0,null))[0]}catch(e){}var m=Object(n.useState)(!1)[1],O=null;g&&(O="context@"+g);var w,j=null;g&&(j="size@"+g,w=l.get(j));var _=Object(n.useRef)(w||c),x=Object(n.useRef)(!1);Object(n.useEffect)((function(){x.current?h||(_.current=c):x.current=!0}),[g]);var S=z(g?["many",g]:null,(function(){return I(e,void 0,void 0,(function(){var e,t,r,n,u,c,f,s,v,p;return M(this,(function(h){switch(h.label){case 0:e=l.get(O)||{},t=e.originalData,r=e.force,n=[],u=null,c=0,h.label=1;case 1:return c<_.current?(f=l.serializeKey(i(c,u)),s=f[0],v=f[1],s?(p=l.get(s),d||r||void 0===r&&0===c||t&&!a.compare(t[c],p)||void 0===p?null===v?[3,3]:[4,o.apply(void 0,v)]:[3,6]):[3,8]):[3,8];case 2:return p=h.sent(),[3,5];case 3:return[4,o(s)];case 4:p=h.sent(),h.label=5;case 5:l.set(s,p),h.label=6;case 6:n.push(p),u=p,h.label=7;case 7:return++c,[3,1];case 8:return l.delete(O),[2,n]}}))}))}),b),R=S,E=R.mutate;return R.size=_.current,R.mutate=Object(n.useCallback)((function(e,t){if(void 0===t&&(t=!0),t&&void 0!==e){var r=R.data;l.set(O,{originalData:r,force:!1})}else t&&l.set(O,{force:!0});return E(e,t)}),[E,R.data,O]),R.setSize=Object(n.useCallback)((function(e){return"function"==typeof e?_.current=e(_.current):"number"==typeof e&&(_.current=e),l.set(j,_.current),m((function(e){return!e})),R.mutate((function(e){return e}))}),[R.mutate,j]),R}t.default=z}});
//# sourceMappingURL=pv.js.map