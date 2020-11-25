/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 9486:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const swr_1 = __importDefault(__webpack_require__(8100));
const react_1 = __importStar(__webpack_require__(3804));
const react_dom_1 = __webpack_require__(7196);
const react_popper_1 = __webpack_require__(8934);
__webpack_require__(4412);
__webpack_require__(2809);
const API_PREFIX = 'https://yukicat-ga-hit.vercel.app/api/ga/?page=';
const regNumber = /[0-9]{1,}/;
const { body: bodyRef } = document;
function toTime(time) {
    const _min = (typeof time == 'string' ? parseFloat(time) : time) / 60; //second
    const min = _min | 0;
    const second = (_min - min) * 60;
    const ms = second - (second | 0);
    return `${min > 0 ? `${min}分` : ''}${second > 0 ? `${ms > 0 ? second.toFixed(2) : second}秒` : ''}`;
}
const DetailPannel = react_1.forwardRef(({ data: { hit, avgTOP }, style, show }, ref) => react_1.default.createElement("div", { className: "popper opacity-trans", "data-show": show, ref: ref, style: style },
    react_1.default.createElement("li", null, `浏览量:${hit}`),
    avgTOP ? react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("li", null, `平均浏览时间:${toTime(avgTOP)}`),
        react_1.default.createElement("li", null, `总浏览时间:${toTime(parseFloat(avgTOP) * parseInt(hit))}`)) : null));
const swrOption = {
    fetcher: (path) => fetch(path).then(r => r.json()), revalidateOnFocus: false, revalidateOnReconnect: false
};
function PageView({ path: path_raw, raw }) {
    const path = path_raw + (path_raw.endsWith('/') ? '' : '/');
    const { data, error } = swr_1.default(API_PREFIX + path, swrOption);
    const _rawHit = raw.replace(/<\/?span>/g, '');
    const [refEle, setRefEle] = react_1.useState();
    const [popperEle, setPopper] = react_1.useState();
    const [showPannel, setShowPannel] = react_1.useState(false);
    const [ticker, setTicker] = react_1.useState();
    const { styles } = react_popper_1.usePopper(refEle, popperEle, { placement: 'top', modifiers: [{ name: 'eventListeners', options: { resize: showPannel, scroll: showPannel } }] });
    /* const setShowPannel = useCallback((value:boolean)=>{
        if(value){
            state.
        }
        _setShowPannel(value)
    },[_setShowPannel]) */
    react_1.useEffect(() => () => clearTimeout(ticker), []); //cleaner
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { onClick: () => {
                setShowPannel(!showPannel);
                if (ticker)
                    clearTimeout(ticker);
                setTicker(window.setTimeout(() => {
                    setShowPannel(showPannel);
                    setTicker(undefined);
                }, 5000));
            }, ref: setRefEle, "data-raw": raw, className: "clickable-sign" }, error ? _rawHit.replace(regNumber, '-') : (data ? _rawHit.replace(regNumber, data[0].hit) : _rawHit)),
        react_dom_1.createPortal(react_1.default.createElement(DetailPannel, { ref: setPopper, data: (data && data[0]) || { hit: _rawHit }, style: styles.popper, show: showPannel }), bodyRef));
}
(() => {
    var _a;
    const colle = document.getElementsByClassName('meta-page-view');
    for (let i = 0; i < colle.length; i++) {
        const e = colle[i], { attributes: attr } = e, path = (_a = attr.getNamedItem('data-path')) === null || _a === void 0 ? void 0 : _a.value, raw = e.innerHTML;
        react_dom_1.hydrate(react_1.default.createElement(PageView, { path: path, raw: raw }), e);
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGFnZXZpZXcudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QjtBQUN4QiwrQ0FBOEU7QUFDOUUseUNBQWlEO0FBQ2pELCtDQUF3QztBQUN4QyxnREFBNkM7QUFDN0MsbURBQWdEO0FBQ2hELE1BQU0sVUFBVSxHQUFHLGlEQUFpRCxDQUFBO0FBQ3BFLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQTtBQU83QixNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQTtBQUNsQyxTQUFTLE1BQU0sQ0FBQyxJQUFxQjtJQUNqQyxNQUFNLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUEsQ0FBQSxRQUFRO0lBQzdFLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUE7SUFDcEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ2hDLE1BQU0sRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUNoQyxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFBO0FBQ3RHLENBQUM7QUFDRCxNQUFNLFlBQVksR0FBRyxrQkFBVSxDQUMzQixDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUM1Qyx1Q0FBSyxTQUFTLEVBQUMsc0JBQXNCLGVBQVksSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUs7SUFDekUsMENBQ0ssT0FBTyxHQUFHLEVBQUUsQ0FDWjtJQUNKLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDTiwwQ0FDSyxVQUFVLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUMxQjtRQUNMLDBDQUNLLFNBQVMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUNyRCxDQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDakIsQ0FDYixDQUFBO0FBQ0QsTUFBTSxTQUFTLEdBQUc7SUFDZCxPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsS0FBSztDQUM3RyxDQUFBO0FBQ0QsU0FBUyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBaUM7SUFDcEUsTUFBTSxJQUFJLEdBQUcsUUFBUSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMzRCxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLGFBQU0sQ0FBUyxVQUFVLEdBQUcsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQ3BFLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzdDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQUcsZ0JBQVEsRUFBbUIsQ0FBQTtJQUN2RCxNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxHQUFHLGdCQUFRLEVBQWtCLENBQUE7SUFDekQsTUFBTSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsR0FBRyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ25ELE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBQUcsZ0JBQVEsRUFBVSxDQUFBO0lBQzlDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyx3QkFBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLGdCQUFnQixFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDdEo7Ozs7OzBCQUtzQjtJQUN0QixpQkFBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQSxDQUFRLFNBQVM7SUFDaEUsT0FBTztRQUNILHdDQUFNLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ2hCLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUMxQixJQUFJLE1BQU07b0JBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNoQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQzdCLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtvQkFDekIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUN4QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNiLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxjQUFZLEdBQUcsRUFBRSxTQUFTLEVBQUMsZ0JBQWdCLElBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQVE7UUFDekssd0JBQVksQ0FBQyw4QkFBQyxZQUFZLElBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBSSxFQUM3SCxPQUFPLENBQUMsQ0FDZixDQUFBO0FBQ1AsQ0FBQztBQUVELENBQUMsR0FBRyxFQUFFOztJQUNGLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQy9ELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDZCxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQ3hCLElBQUksU0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQywwQ0FBRSxLQUFLLEVBQzVDLEdBQUcsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFBO1FBQ3JCLG1CQUFPLENBQUMsOEJBQUMsUUFBUSxJQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0tBQ2pEO0FBQ0wsQ0FBQyxDQUFDLEVBQUUsQ0FBQSJ9

/***/ }),

/***/ 3804:
/***/ ((module) => {

module.exports = React;

/***/ }),

/***/ 7196:
/***/ ((module) => {

module.exports = ReactDOM;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			148: 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			[9486,785,772]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = () => {
/******/ 		
/******/ 		};
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = () => {
/******/ 		
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = () => {
/******/ 		
/******/ 			}
/******/ 			chunkLoadingGlobal = chunkLoadingGlobal.slice();
/******/ 			for(var i = 0; i < chunkLoadingGlobal.length; i++) webpackJsonpCallback(chunkLoadingGlobal[i]);
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkyukicat_attach"] = self["webpackChunkyukicat_attach"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;
//# sourceMappingURL=pv.js.map