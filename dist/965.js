(self["webpackChunkyukicat_attach"] = self["webpackChunkyukicat_attach"] || []).push([[965],{

/***/ 9188:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "kZ": () => /* binding */ popperGenerator,
/* harmony export */   "fi": () => /* binding */ createPopper
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7272);
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(583);
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3624);
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3779);
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(380);
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8293);
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2556);














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign(Object.assign({}, DEFAULT_OPTIONS), defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign(Object.assign(Object.assign({}, defaultOptions), state.options), options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__/* .isElement */ .kK)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z)(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z)(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z)(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z)((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z)([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (false) { var _getComputedStyle, marginTop, marginRight, marginBottom, marginLeft, flipModifier, modifiers; }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (false) {}

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z)(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z)(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z)(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (false) {}

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z)(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (false) {}

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ 7701:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "we": () => /* binding */ top,
/* harmony export */   "I": () => /* binding */ bottom,
/* harmony export */   "F2": () => /* binding */ right,
/* harmony export */   "t$": () => /* binding */ left,
/* harmony export */   "d7": () => /* binding */ auto,
/* harmony export */   "mv": () => /* binding */ basePlacements,
/* harmony export */   "BL": () => /* binding */ start,
/* harmony export */   "ut": () => /* binding */ end,
/* harmony export */   "zV": () => /* binding */ clippingParents,
/* harmony export */   "Pj": () => /* binding */ viewport,
/* harmony export */   "k5": () => /* binding */ popper,
/* harmony export */   "YP": () => /* binding */ reference,
/* harmony export */   "bw": () => /* binding */ variationPlacements,
/* harmony export */   "Ct": () => /* binding */ placements,
/* harmony export */   "N7": () => /* binding */ beforeRead,
/* harmony export */   "ij": () => /* binding */ read,
/* harmony export */   "r5": () => /* binding */ afterRead,
/* harmony export */   "XM": () => /* binding */ beforeMain,
/* harmony export */   "DH": () => /* binding */ main,
/* harmony export */   "wX": () => /* binding */ afterMain,
/* harmony export */   "iv": () => /* binding */ beforeWrite,
/* harmony export */   "cW": () => /* binding */ write,
/* harmony export */   "MS": () => /* binding */ afterWrite,
/* harmony export */   "xs": () => /* binding */ modifierPhases
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ 9704:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "afterMain": () => /* reexport */ enums/* afterMain */.wX,
  "afterRead": () => /* reexport */ enums/* afterRead */.r5,
  "afterWrite": () => /* reexport */ enums/* afterWrite */.MS,
  "applyStyles": () => /* reexport */ applyStyles/* default */.Z,
  "arrow": () => /* reexport */ arrow/* default */.Z,
  "auto": () => /* reexport */ enums/* auto */.d7,
  "basePlacements": () => /* reexport */ enums/* basePlacements */.mv,
  "beforeMain": () => /* reexport */ enums/* beforeMain */.XM,
  "beforeRead": () => /* reexport */ enums/* beforeRead */.N7,
  "beforeWrite": () => /* reexport */ enums/* beforeWrite */.iv,
  "bottom": () => /* reexport */ enums/* bottom */.I,
  "clippingParents": () => /* reexport */ enums/* clippingParents */.zV,
  "computeStyles": () => /* reexport */ computeStyles/* default */.Z,
  "createPopper": () => /* reexport */ popper/* createPopper */.fi,
  "createPopperBase": () => /* reexport */ createPopper/* createPopper */.fi,
  "createPopperLite": () => /* reexport */ popper_lite_createPopper,
  "detectOverflow": () => /* reexport */ detectOverflow/* default */.Z,
  "end": () => /* reexport */ enums/* end */.ut,
  "eventListeners": () => /* reexport */ eventListeners/* default */.Z,
  "flip": () => /* reexport */ flip/* default */.Z,
  "hide": () => /* reexport */ hide/* default */.Z,
  "left": () => /* reexport */ enums/* left */.t$,
  "main": () => /* reexport */ enums/* main */.DH,
  "modifierPhases": () => /* reexport */ enums/* modifierPhases */.xs,
  "offset": () => /* reexport */ offset/* default */.Z,
  "placements": () => /* reexport */ enums/* placements */.Ct,
  "popper": () => /* reexport */ enums/* popper */.k5,
  "popperGenerator": () => /* reexport */ createPopper/* popperGenerator */.kZ,
  "popperOffsets": () => /* reexport */ popperOffsets/* default */.Z,
  "preventOverflow": () => /* reexport */ preventOverflow/* default */.Z,
  "read": () => /* reexport */ enums/* read */.ij,
  "reference": () => /* reexport */ enums/* reference */.YP,
  "right": () => /* reexport */ enums/* right */.F2,
  "start": () => /* reexport */ enums/* start */.BL,
  "top": () => /* reexport */ enums/* top */.we,
  "variationPlacements": () => /* reexport */ enums/* variationPlacements */.bw,
  "viewport": () => /* reexport */ enums/* viewport */.Pj,
  "write": () => /* reexport */ enums/* write */.cW
});

// EXTERNAL MODULE: ./node_modules/@popperjs/core/lib/enums.js
var enums = __webpack_require__(7701);
// EXTERNAL MODULE: ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js
var applyStyles = __webpack_require__(7824);
// EXTERNAL MODULE: ./node_modules/@popperjs/core/lib/modifiers/arrow.js
var arrow = __webpack_require__(6896);
// EXTERNAL MODULE: ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var computeStyles = __webpack_require__(6531);
// EXTERNAL MODULE: ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var eventListeners = __webpack_require__(2372);
// EXTERNAL MODULE: ./node_modules/@popperjs/core/lib/modifiers/flip.js + 3 modules
var flip = __webpack_require__(5228);
// EXTERNAL MODULE: ./node_modules/@popperjs/core/lib/modifiers/hide.js
var hide = __webpack_require__(9892);
// EXTERNAL MODULE: ./node_modules/@popperjs/core/lib/modifiers/offset.js
var offset = __webpack_require__(2122);
// EXTERNAL MODULE: ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
var popperOffsets = __webpack_require__(7421);
// EXTERNAL MODULE: ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js + 1 modules
var preventOverflow = __webpack_require__(3920);
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/modifiers/index.js









// EXTERNAL MODULE: ./node_modules/@popperjs/core/lib/createPopper.js
var createPopper = __webpack_require__(9188);
// EXTERNAL MODULE: ./node_modules/@popperjs/core/lib/utils/detectOverflow.js + 4 modules
var detectOverflow = __webpack_require__(9966);
// EXTERNAL MODULE: ./node_modules/@popperjs/core/lib/popper.js
var popper = __webpack_require__(804);
;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/popper-lite.js





var defaultModifiers = [eventListeners/* default */.Z, popperOffsets/* default */.Z, computeStyles/* default */.Z, applyStyles/* default */.Z];
var popper_lite_createPopper = /*#__PURE__*/(0,createPopper/* popperGenerator */.kZ)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules


;// CONCATENATED MODULE: ./node_modules/@popperjs/core/lib/index.js

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ 6010:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* export default binding */ __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function toVal(mix) {
	var k, y, str='';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			for (k=0; k < mix.length; k++) {
				if (mix[k]) {
					if (y = toVal(mix[k])) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (k in mix) {
				if (mix[k]) {
					str && (str += ' ');
					str += k;
				}
			}
		}
	}

	return str;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
	var i=0, tmp, x, str='';
	while (i < arguments.length) {
		if (tmp = arguments[i++]) {
			if (x = toVal(tmp)) {
				str && (str += ' ');
				str += x
			}
		}
	}
	return str;
}


/***/ }),

/***/ 9961:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    get
});

function get() {
    if (typeof DOMParser !== 'undefined') {
        return DOMParser;
    }
    try {
        return eval('require')('xmldom').DOMParser; // This stops Webpack from replacing the require with a generic import and bundling the module.
    } catch (error) {
        return undefined;
    }
}


/***/ }),

/***/ 5130:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ exif_reader,
  "errors": () => /* binding */ exif_reader_errors,
  "load": () => /* binding */ load,
  "loadView": () => /* binding */ loadView
});

;// CONCATENATED MODULE: ./node_modules/exifreader/src/utils.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

function getStringFromDataView(dataView, offset, length) {
    const chars = [];
    for (let i = 0; i < length && offset + i < dataView.byteLength; i++) {
        chars.push(dataView.getUint8(offset + i));
    }
    return getStringValueFromArray(chars);
}

function getUnicodeStringFromDataView(dataView, offset, length) {
    const chars = [];
    for (let i = 0; i < length && offset + i < dataView.byteLength; i += 2) {
        chars.push(dataView.getUint16(offset + i));
    }
    return getStringValueFromArray(chars);
}

function getStringValueFromArray(charArray) {
    return charArray.map((charCode) => String.fromCharCode(charCode)).join('');
}

function getCharacterArray(string) {
    return string.split('').map((character) => character.charCodeAt(0));
}

function objectAssign() {
    for (let i = 1; i < arguments.length; i++) {
        for (const property in arguments[i]) {
            arguments[0][property] = arguments[i][property];
        }
    }

    return arguments[0];
}

function deferInit(object, key, initializer) {
    let initialized = false;
    Object.defineProperty(object, key, {
        get() {
            if (!initialized) {
                initialized = true;
                Object.defineProperty(object, key, {
                    configurable: true,
                    enumerable: true,
                    value: initializer.apply(object),
                    writable: true
                });
            }
            return object[key];
        },
        configurable: true,
        enumerable: true
    });
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/dataview.js
class dataview_DataView {
    constructor(buffer) {
        if (bufferTypeIsUnsupported(buffer)) {
            throw new Error('DataView: Passed buffer type is unsupported.');
        }

        this.buffer = buffer;
        this.byteLength = this.buffer.length;
    }

    getUint8(offset) {
        return this.buffer.readUInt8(offset);
    }

    getUint16(offset, littleEndian) {
        if (littleEndian) {
            return this.buffer.readUInt16LE(offset);
        }
        return this.buffer.readUInt16BE(offset);
    }

    getUint32(offset, littleEndian) {
        if (littleEndian) {
            return this.buffer.readUInt32LE(offset);
        }
        return this.buffer.readUInt32BE(offset);
    }

    getInt32(offset, littleEndian) {
        if (littleEndian) {
            return this.buffer.readInt32LE(offset);
        }
        return this.buffer.readInt32BE(offset);
    }
}

function bufferTypeIsUnsupported(buffer) {
    return typeof buffer !== 'object'
        || buffer.length === undefined
        || buffer.readUInt8 === undefined
        || buffer.readUInt16LE === undefined
        || buffer.readUInt16BE === undefined
        || buffer.readUInt32LE === undefined
        || buffer.readUInt32BE === undefined
        || buffer.readInt32LE === undefined
        || buffer.readInt32BE === undefined;
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/constants.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* harmony default export */ const constants = ({
    USE_FILE: true,
    USE_PNG_FILE: true,
    USE_EXIF: true,
    USE_IPTC: true,
    USE_XMP: true,
    USE_ICC: true,
    USE_THUMBNAIL: true,
    USE_TIFF: true,
    USE_JPEG: true,
    USE_PNG: true,
    USE_HEIC: true,
    USE_WEBP: true
});

;// CONCATENATED MODULE: ./node_modules/exifreader/src/tag-names-utils.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

function getStringValue(value) {
    return value.map((charCode) => String.fromCharCode(charCode)).join('');
}

function getEncodedString(value) {
    if (value.length >= 8) {
        const encoding = getStringValue(value.slice(0, 8));

        if (encoding === 'ASCII\x00\x00\x00') {
            return getStringValue(value.slice(8));
        } else if (encoding === 'JIS\x00\x00\x00\x00\x00') {
            return '[JIS encoded text]';
        } else if (encoding === 'UNICODE\x00') {
            return '[Unicode encoded text]';
        } else if (encoding === '\x00\x00\x00\x00\x00\x00\x00\x00') {
            return '[Undefined encoding]';
        }
    }

    return 'Undefined';
}

function getCalculatedGpsValue(value) {
    return (value[0][0] / value[0][1]) + (value[1][0] / value[1][1]) / 60 + (value[2][0] / value[2][1]) / 3600;
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/byte-order.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const LITTLE_ENDIAN = 0x4949;
const BIG_ENDIAN = 0x4d4d;

/* harmony default export */ const byte_order = ({
    BIG_ENDIAN,
    LITTLE_ENDIAN,
    getByteOrder
});

function getByteOrder(dataView, tiffHeaderOffset) {
    if (dataView.getUint16(tiffHeaderOffset) === LITTLE_ENDIAN) {
        return LITTLE_ENDIAN;
    } else if (dataView.getUint16(tiffHeaderOffset) === BIG_ENDIAN) {
        return BIG_ENDIAN;
    }
    throw new Error('Illegal byte order value. Faulty image.');
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/image-header-tiff.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */




/* harmony default export */ const image_header_tiff = ({
    isTiffFile,
    findTiffOffsets
});

function isTiffFile(dataView) {
    const MIN_TIFF_DATA_BUFFER_LENGTH = 4;

    return (dataView.byteLength >= MIN_TIFF_DATA_BUFFER_LENGTH) && hasTiffMarker(dataView);
}

function hasTiffMarker(dataView) {
    const TIFF_ID = 0x2a;
    const TIFF_ID_OFFSET = 2;

    const littleEndian = dataView.getUint16(0) === byte_order.LITTLE_ENDIAN;
    return dataView.getUint16(TIFF_ID_OFFSET, littleEndian) === TIFF_ID;
}

function findTiffOffsets() {
    const TIFF_FILE_HEADER_OFFSET = 0;

    if (constants.USE_EXIF) {
        return {
            hasAppMarkers: true,
            tiffHeaderOffset: TIFF_FILE_HEADER_OFFSET
        };
    }
    return {};
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/image-header-jpeg.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */




/* harmony default export */ const image_header_jpeg = ({
    isJpegFile,
    findJpegOffsets
});

const MIN_JPEG_DATA_BUFFER_LENGTH = 2;
const JPEG_ID = 0xffd8;
const JPEG_ID_SIZE = 2;
const APP_ID_OFFSET = 4;
const APP_MARKER_SIZE = 2;
const TIFF_HEADER_OFFSET = 10; // From start of APP1 marker.
const IPTC_DATA_OFFSET = 18; // From start of APP13 marker.
const XMP_DATA_OFFSET = 33; // From start of APP1 marker.
const XMP_EXTENDED_DATA_OFFSET = 79; // From start of APP1 marker including GUID, total length, and offset.
const APP2_ICC_DATA_OFFSET = 18; // From start of APP2 marker including marker and chunk/chunk total numbers.

const APP2_ICC_IDENTIFIER = 'ICC_PROFILE\0';
const ICC_CHUNK_NUMBER_OFFSET = APP_ID_OFFSET + APP2_ICC_IDENTIFIER.length;
const ICC_TOTAL_CHUNKS_OFFSET = ICC_CHUNK_NUMBER_OFFSET + 1;

const SOF0_MARKER = 0xffc0;
const SOF2_MARKER = 0xffc2;
const DHT_MARKER = 0xffc4;
const DQT_MARKER = 0xffdb;
const DRI_MARKER = 0xffdd;
const SOS_MARKER = 0xffda;

const APP0_MARKER = 0xffe0;
const APP1_MARKER = 0xffe1;
const APP2_MARKER = 0xffe2;
const APP13_MARKER = 0xffed;
const APP15_MARKER = 0xffef;
const COMMENT_MARKER = 0xfffe;

const APP1_EXIF_IDENTIFIER = 'Exif';
const APP1_XMP_IDENTIFIER = 'http://ns.adobe.com/xap/1.0/\x00';
const APP1_XMP_EXTENDED_IDENTIFIER = 'http://ns.adobe.com/xmp/extension/\x00';
const APP13_IPTC_IDENTIFIER = 'Photoshop 3.0';

function isJpegFile(dataView) {
    return (dataView.byteLength >= MIN_JPEG_DATA_BUFFER_LENGTH) && (dataView.getUint16(0) === JPEG_ID);
}

function findJpegOffsets(dataView) {
    let appMarkerPosition = JPEG_ID_SIZE;
    let fieldLength;
    let sof0DataOffset;
    let sof2DataOffset;
    let tiffHeaderOffset;
    let iptcDataOffset;
    let xmpChunks;
    let iccChunks;

    while (appMarkerPosition + APP_ID_OFFSET + 5 <= dataView.byteLength) {
        if (constants.USE_FILE && isSOF0Marker(dataView, appMarkerPosition)) {
            sof0DataOffset = appMarkerPosition + APP_MARKER_SIZE;
        } else if (constants.USE_FILE && isSOF2Marker(dataView, appMarkerPosition)) {
            sof2DataOffset = appMarkerPosition + APP_MARKER_SIZE;
        } else if (constants.USE_EXIF && isApp1ExifMarker(dataView, appMarkerPosition)) {
            fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
            tiffHeaderOffset = appMarkerPosition + TIFF_HEADER_OFFSET;
        } else if (constants.USE_XMP && isApp1XmpMarker(dataView, appMarkerPosition)) {
            if (!xmpChunks) {
                xmpChunks = [];
            }
            fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
            xmpChunks.push(getXmpChunkDetails(appMarkerPosition, fieldLength));
        } else if (constants.USE_XMP && isApp1ExtendedXmpMarker(dataView, appMarkerPosition)) {
            if (!xmpChunks) {
                xmpChunks = [];
            }
            fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
            xmpChunks.push(getExtendedXmpChunkDetails(appMarkerPosition, fieldLength));
        } else if (constants.USE_IPTC && isApp13PhotoshopMarker(dataView, appMarkerPosition)) {
            fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
            iptcDataOffset = appMarkerPosition + IPTC_DATA_OFFSET;
        } else if (constants.USE_ICC && isApp2ICCMarker(dataView, appMarkerPosition)) {
            fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
            const iccDataOffset = appMarkerPosition + APP2_ICC_DATA_OFFSET;
            const iccDataLength = fieldLength - (APP2_ICC_DATA_OFFSET - APP_MARKER_SIZE);

            const iccChunkNumber = dataView.getUint8(appMarkerPosition + ICC_CHUNK_NUMBER_OFFSET);
            const iccChunksTotal = dataView.getUint8(appMarkerPosition + ICC_TOTAL_CHUNKS_OFFSET);
            if (!iccChunks) {
                iccChunks = [];
            }
            iccChunks.push({offset: iccDataOffset, length: iccDataLength, chunkNumber: iccChunkNumber, chunksTotal: iccChunksTotal});
        } else if (isAppMarker(dataView, appMarkerPosition)) {
            fieldLength = dataView.getUint16(appMarkerPosition + APP_MARKER_SIZE);
        } else {
            break;
        }
        appMarkerPosition += APP_MARKER_SIZE + fieldLength;
    }

    return {
        hasAppMarkers: appMarkerPosition > JPEG_ID_SIZE,
        fileDataOffset: sof0DataOffset || sof2DataOffset,
        tiffHeaderOffset,
        iptcDataOffset,
        xmpChunks,
        iccChunks
    };
}

function isSOF0Marker(dataView, appMarkerPosition) {
    return (dataView.getUint16(appMarkerPosition) === SOF0_MARKER);
}

function isSOF2Marker(dataView, appMarkerPosition) {
    return (dataView.getUint16(appMarkerPosition) === SOF2_MARKER);
}

function isApp2ICCMarker(dataView, appMarkerPosition) {
    const markerIdLength = APP2_ICC_IDENTIFIER.length;

    return (dataView.getUint16(appMarkerPosition) === APP2_MARKER)
        && (getStringFromDataView(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP2_ICC_IDENTIFIER);
}

function isApp1ExifMarker(dataView, appMarkerPosition) {
    const markerIdLength = APP1_EXIF_IDENTIFIER.length;

    return (dataView.getUint16(appMarkerPosition) === APP1_MARKER)
        && (getStringFromDataView(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP1_EXIF_IDENTIFIER)
        && (dataView.getUint8(appMarkerPosition + APP_ID_OFFSET + markerIdLength) === 0x00);
}

function isApp1XmpMarker(dataView, appMarkerPosition) {
    return (dataView.getUint16(appMarkerPosition) === APP1_MARKER)
        && isXmpIdentifier(dataView, appMarkerPosition);
}

function isXmpIdentifier(dataView, appMarkerPosition) {
    const markerIdLength = APP1_XMP_IDENTIFIER.length;
    return getStringFromDataView(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP1_XMP_IDENTIFIER;
}

function isApp1ExtendedXmpMarker(dataView, appMarkerPosition) {
    return (dataView.getUint16(appMarkerPosition) === APP1_MARKER)
        && isExtendedXmpIdentifier(dataView, appMarkerPosition);
}

function isExtendedXmpIdentifier(dataView, appMarkerPosition) {
    const markerIdLength = APP1_XMP_EXTENDED_IDENTIFIER.length;
    return getStringFromDataView(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP1_XMP_EXTENDED_IDENTIFIER;
}

function getXmpChunkDetails(appMarkerPosition, fieldLength) {
    return {
        dataOffset: appMarkerPosition + XMP_DATA_OFFSET,
        length: fieldLength - (XMP_DATA_OFFSET - APP_MARKER_SIZE)
    };
}

function getExtendedXmpChunkDetails(appMarkerPosition, fieldLength) {
    return {
        dataOffset: appMarkerPosition + XMP_EXTENDED_DATA_OFFSET,
        length: fieldLength - (XMP_EXTENDED_DATA_OFFSET - APP_MARKER_SIZE)
    };
}

function isApp13PhotoshopMarker(dataView, appMarkerPosition) {
    const markerIdLength = APP13_IPTC_IDENTIFIER.length;

    return (dataView.getUint16(appMarkerPosition) === APP13_MARKER)
        && (getStringFromDataView(dataView, appMarkerPosition + APP_ID_OFFSET, markerIdLength) === APP13_IPTC_IDENTIFIER)
        && (dataView.getUint8(appMarkerPosition + APP_ID_OFFSET + markerIdLength) === 0x00);
}

function isAppMarker(dataView, appMarkerPosition) {
    const appMarker = dataView.getUint16(appMarkerPosition);
    return ((appMarker >= APP0_MARKER) && (appMarker <= APP15_MARKER))
        || (appMarker === COMMENT_MARKER)
        || (appMarker === SOF0_MARKER)
        || (appMarker === SOF2_MARKER)
        || (appMarker === DHT_MARKER)
        || (appMarker === DQT_MARKER)
        || (appMarker === DRI_MARKER)
        || (appMarker === SOS_MARKER);
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/image-header-png.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */




/* harmony default export */ const image_header_png = ({
    isPngFile,
    findPngOffsets
});

const PNG_ID = '\x89\x50\x4e\x47\x0d\x0a\x1a\x0a';
const PNG_CHUNK_LENGTH_SIZE = 4;
const PNG_CHUNK_TYPE_SIZE = 4;
const PNG_CHUNK_LENGTH_OFFSET = 0;
const PNG_CHUNK_TYPE_OFFSET = PNG_CHUNK_LENGTH_SIZE;
const PNG_CHUNK_DATA_OFFSET = PNG_CHUNK_LENGTH_SIZE + PNG_CHUNK_TYPE_SIZE;
const PNG_XMP_PREFIX = 'XML:com.adobe.xmp\x00';

function isPngFile(dataView) {
    return getStringFromDataView(dataView, 0, PNG_ID.length) === PNG_ID;
}

function findPngOffsets(dataView) {
    const PNG_CRC_SIZE = 4;

    const offsets = {
        hasAppMarkers: false
    };

    let offset = PNG_ID.length;

    while (offset + PNG_CHUNK_LENGTH_SIZE + PNG_CHUNK_TYPE_SIZE <= dataView.byteLength) {
        if (constants.USE_PNG_FILE && isPngImageHeaderChunk(dataView, offset)) {
            offsets.hasAppMarkers = true;
            offsets.pngHeaderOffset = offset + PNG_CHUNK_DATA_OFFSET;
        } else if (constants.USE_XMP && isPngXmpChunk(dataView, offset)) {
            const dataOffset = getPngXmpDataOffset(dataView, offset);
            if (dataOffset !== undefined) {
                offsets.hasAppMarkers = true;
                offsets.xmpChunks = [{
                    dataOffset,
                    length: dataView.getUint32(offset + PNG_CHUNK_LENGTH_OFFSET) - (dataOffset - (offset + PNG_CHUNK_DATA_OFFSET))
                }];
            }
        }

        offset += dataView.getUint32(offset + PNG_CHUNK_LENGTH_OFFSET)
            + PNG_CHUNK_LENGTH_SIZE
            + PNG_CHUNK_TYPE_SIZE
            + PNG_CRC_SIZE;
    }

    return offsets;
}

function isPngImageHeaderChunk(dataView, offset) {
    const PNG_CHUNK_TYPE_IMAGE_HEADER = 'IHDR';
    return getStringFromDataView(dataView, offset + PNG_CHUNK_TYPE_OFFSET, PNG_CHUNK_TYPE_SIZE) === PNG_CHUNK_TYPE_IMAGE_HEADER;
}

function isPngXmpChunk(dataView, offset) {
    const PNG_CHUNK_TYPE_INTERNATIONAL_TEXT = 'iTXt';
    return (getStringFromDataView(dataView, offset + PNG_CHUNK_TYPE_OFFSET, PNG_CHUNK_TYPE_SIZE) === PNG_CHUNK_TYPE_INTERNATIONAL_TEXT)
        && (getStringFromDataView(dataView, offset + PNG_CHUNK_DATA_OFFSET, PNG_XMP_PREFIX.length) === PNG_XMP_PREFIX);
}

function getPngXmpDataOffset(dataView, offset) {
    const COMPRESSION_FLAG_SIZE = 1;
    const COMPRESSION_METHOD_SIZE = 1;

    offset += PNG_CHUNK_DATA_OFFSET + PNG_XMP_PREFIX.length + COMPRESSION_FLAG_SIZE + COMPRESSION_METHOD_SIZE;

    let numberOfNullSeparators = 0;
    while (numberOfNullSeparators < 2 && offset < dataView.byteLength) {
        if (dataView.getUint8(offset) === 0x00) {
            numberOfNullSeparators++;
        }
        offset++;
    }
    if (numberOfNullSeparators < 2) {
        return undefined;
    }
    return offset;
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/image-header-heic.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */




/* harmony default export */ const image_header_heic = ({
    isHeicFile,
    findHeicOffsets
});

function isHeicFile(dataView) {
    const HEIC_ID = 'ftyp';
    const HEIC_ID_OFFSET = 4;
    const HEIC_MAJOR_BRANDS = ['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'hevm', 'hevs', 'mif1'];
    const HEIC_MAJOR_BRAND_LENGTH = 4;

    const heicMajorBrand = getStringFromDataView(dataView, HEIC_ID_OFFSET + HEIC_ID.length, HEIC_MAJOR_BRAND_LENGTH);

    return (getStringFromDataView(dataView, HEIC_ID_OFFSET, HEIC_ID.length) === HEIC_ID)
        && (HEIC_MAJOR_BRANDS.indexOf(heicMajorBrand) !== -1);
}

function findHeicOffsets(dataView) {
    if (constants.USE_EXIF || constants.USE_ICC) {
        const {offset: metaOffset, length: metaLength} = findMetaAtom(dataView);
        if (metaOffset === undefined) {
            return {hasAppMarkers: false};
        }

        const metaEndOffset = Math.min(metaOffset + metaLength, dataView.byteLength);
        const {exifItemOffset, ilocOffset, colrOffset} = findMetaItems(dataView, metaOffset, metaEndOffset);

        const exifOffset = findExifOffset(dataView, exifItemOffset, ilocOffset, metaEndOffset);
        const iccChunks = findIccChunks(dataView, colrOffset, metaEndOffset);
        return {
            hasAppMarkers: (exifOffset !== undefined) || (iccChunks !== undefined),
            tiffHeaderOffset: exifOffset,
            iccChunks
        };
    }

    return {hasAppMarkers: false};
}

function findMetaAtom(dataView) {
    const ATOM_LENGTH_SIZE = 4;
    const ATOM_TYPE_SIZE = 4;
    const ATOM_MIN_LENGTH = 8;
    const ATOM_TYPE_OFFSET = 4;

    let offset = 0;

    while (offset + ATOM_LENGTH_SIZE + ATOM_TYPE_SIZE <= dataView.byteLength) {
        const atomLength = getAtomLength(dataView, offset);
        if (atomLength >= ATOM_MIN_LENGTH) {
            const atomType = getStringFromDataView(dataView, offset + ATOM_TYPE_OFFSET, ATOM_TYPE_SIZE);
            if (atomType === 'meta') {
                return {
                    offset,
                    length: atomLength
                };
            }
        }

        offset += atomLength;
    }

    return {
        offset: undefined,
        length: 0
    };
}

function getAtomLength(dataView, offset) {
    const ATOM_EXTENDED_SIZE_LOW_OFFSET = 12;

    const atomLength = dataView.getUint32(offset);
    if (extendsToEndOfFile(atomLength)) {
        return dataView.byteLength - offset;
    }
    if (hasExtendedSize(atomLength)) {
        if (hasEmptyHighBits(dataView, offset)) {
            // It's a bit tricky to handle 64 bit numbers in JavaScript. Let's
            // wait until there are real-world examples where it is necessary.
            return dataView.getUint32(offset + ATOM_EXTENDED_SIZE_LOW_OFFSET);
        }
    }

    return atomLength;
}

function extendsToEndOfFile(atomLength) {
    return atomLength === 0;
}

function hasExtendedSize(atomLength) {
    return atomLength === 1;
}

function hasEmptyHighBits(dataView, offset) {
    const ATOM_EXTENDED_SIZE_OFFSET = 8;
    return dataView.getUint32(offset + ATOM_EXTENDED_SIZE_OFFSET) === 0;
}

function findMetaItems(dataView, offset, metaEndOffset) {
    const STRING_SIZE = 4;
    const ITEM_INDEX_REL_OFFSET = -4;
    const offsets = {
        ilocOffset: undefined,
        exifItemOffset: undefined,
        colrOffset: undefined
    };

    while ((offset + STRING_SIZE <= metaEndOffset)
        && (!offsets.ilocOffset || !offsets.exifItemOffset || !offsets.colrOffset)) {
        const itemName = getStringFromDataView(dataView, offset, STRING_SIZE);
        if (constants.USE_EXIF && (itemName === 'iloc')) {
            offsets.ilocOffset = offset;
        } else if (constants.USE_EXIF && (itemName === 'Exif')) {
            offsets.exifItemOffset = offset + ITEM_INDEX_REL_OFFSET;
        } else if (constants.USE_ICC && (itemName === 'colr')) {
            offsets.colrOffset = offset + ITEM_INDEX_REL_OFFSET;
        }

        offset++;
    }

    return offsets;
}

function findExifOffset(dataView, exifItemOffset, offset, metaEndOffset) {
    const EXIF_ITEM_OFFSET_SIZE = 2;
    const ILOC_DATA_OFFSET = 12;
    const EXIF_POINTER_OFFSET = 8;
    const EXIF_POINTER_SIZE = 4;
    const EXIF_PREFIX_LENGTH_OFFSET = 4;
    const ILOC_ITEM_SIZE = 16;

    if (!offset || !exifItemOffset || (exifItemOffset + EXIF_ITEM_OFFSET_SIZE > metaEndOffset)) {
        return undefined;
    }

    const exifItemIndex = dataView.getUint16(exifItemOffset);
    offset += ILOC_DATA_OFFSET;

    while (offset + ILOC_ITEM_SIZE <= metaEndOffset) {
        const itemIndex = dataView.getUint16(offset);
        if (itemIndex === exifItemIndex) {
            const exifPointer = dataView.getUint32(offset + EXIF_POINTER_OFFSET);
            if (exifPointer + EXIF_POINTER_SIZE <= dataView.byteLength) {
                const exifOffset = dataView.getUint32(exifPointer);
                const prefixLength = exifOffset + EXIF_PREFIX_LENGTH_OFFSET;
                return exifPointer + prefixLength;
            }
        }
        offset += ILOC_ITEM_SIZE;
    }

    return undefined;
}

function findIccChunks(dataView, offset, metaEndOffset) {
    const ITEM_TYPE_OFFSET = 8;
    const ITEM_TYPE_SIZE = 4;
    const ITEM_CONTENT_OFFSET = 12;

    if (!offset || (offset + ITEM_CONTENT_OFFSET > metaEndOffset)) {
        return undefined;
    }

    const colorType = getStringFromDataView(dataView, offset + ITEM_TYPE_OFFSET, ITEM_TYPE_SIZE);
    if ((colorType !== 'prof') && (colorType !== 'rICC')) {
        return undefined;
    }

    return [{
        offset: offset + ITEM_CONTENT_OFFSET,
        length: getAtomLength(dataView, offset) - ITEM_CONTENT_OFFSET,
        chunkNumber: 1,
        chunksTotal: 1
    }];
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/image-header-webp.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */




/* harmony default export */ const image_header_webp = ({
    isWebpFile,
    findOffsets
});

function isWebpFile(dataView) {
    const RIFF_ID_OFFSET = 0;
    const RIFF_ID = 'RIFF';
    const WEBP_MARKER_OFFSET = 8;
    const WEBP_MARKER = 'WEBP';

    return getStringFromDataView(dataView, RIFF_ID_OFFSET, RIFF_ID.length) === RIFF_ID
        && getStringFromDataView(dataView, WEBP_MARKER_OFFSET, WEBP_MARKER.length) === WEBP_MARKER;
}

function findOffsets(dataView) {
    const SUB_CHUNK_START_OFFSET = 12;
    const CHUNK_SIZE_OFFSET = 4;
    const EXIF_IDENTIFIER = 'Exif\x00\x00';
    const CHUNK_HEADER_SIZE = 8;

    let offset = SUB_CHUNK_START_OFFSET;
    let hasAppMarkers = false;
    let tiffHeaderOffset;
    let xmpChunks;
    let iccChunks;

    while (offset + CHUNK_HEADER_SIZE < dataView.byteLength) {
        const chunkId = getStringFromDataView(dataView, offset, 4);
        const chunkSize = dataView.getUint32(offset + CHUNK_SIZE_OFFSET, true);

        if (constants.USE_EXIF && (chunkId === 'EXIF')) {
            hasAppMarkers = true;
            if (getStringFromDataView(dataView, offset + CHUNK_HEADER_SIZE, EXIF_IDENTIFIER.length) === EXIF_IDENTIFIER) {
                tiffHeaderOffset = offset + CHUNK_HEADER_SIZE + EXIF_IDENTIFIER.length;
            } else {
                tiffHeaderOffset = offset + CHUNK_HEADER_SIZE;
            }
        } else if (constants.USE_XMP && (chunkId === 'XMP ')) {
            hasAppMarkers = true;
            xmpChunks = [{
                dataOffset: offset + CHUNK_HEADER_SIZE,
                length: chunkSize
            }];
        } else if (constants.USE_ICC && (chunkId === 'ICCP')) {
            hasAppMarkers = true;
            iccChunks = [{
                offset: offset + CHUNK_HEADER_SIZE,
                length: chunkSize,
                chunkNumber: 1,
                chunksTotal: 1
            }];
        }

        offset += CHUNK_HEADER_SIZE + (chunkSize % 2 === 0 ? chunkSize : chunkSize + 1);
    }

    return {
        hasAppMarkers,
        tiffHeaderOffset,
        xmpChunks,
        iccChunks
    };
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/image-header.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */








/* harmony default export */ const image_header = ({
    parseAppMarkers
});

function parseAppMarkers(dataView) {
    if (constants.USE_TIFF && image_header_tiff.isTiffFile(dataView)) {
        return image_header_tiff.findTiffOffsets();
    }

    if (constants.USE_JPEG && image_header_jpeg.isJpegFile(dataView)) {
        return image_header_jpeg.findJpegOffsets(dataView);
    }

    if (constants.USE_PNG && image_header_png.isPngFile(dataView)) {
        return image_header_png.findPngOffsets(dataView);
    }

    if (constants.USE_HEIC && image_header_heic.isHeicFile(dataView)) {
        return image_header_heic.findHeicOffsets(dataView);
    }

    if (constants.USE_WEBP && image_header_webp.isWebpFile(dataView)) {
        return image_header_webp.findOffsets(dataView);
    }

    throw new Error('Invalid image format');
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/types.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */



const typeSizes = {
    1: 1, // BYTE
    2: 1, // ASCII
    3: 2, // SHORT
    4: 4, // LONG
    5: 8, // RATIONAL
    7: 1, // UNDEFINED
    9: 4, // SLONG
    10: 8, // SRATIONAL
    13: 4 // IFD
};

const tagTypes = {
    'BYTE': 1,
    'ASCII': 2,
    'SHORT': 3,
    'LONG': 4,
    'RATIONAL': 5,
    'UNDEFINED': 7,
    'SLONG': 9,
    'SRATIONAL': 10,
    'IFD': 13
};

/* harmony default export */ const types = ({
    getAsciiValue,
    getByteAt,
    getAsciiAt,
    getShortAt,
    getLongAt,
    getRationalAt,
    getUndefinedAt,
    getSlongAt,
    getSrationalAt,
    getIfdPointerAt,
    typeSizes,
    tagTypes,
    getTypeSize
});

function getAsciiValue(charArray) {
    return charArray.map((charCode) => String.fromCharCode(charCode));
}

function getByteAt(dataView, offset) {
    return dataView.getUint8(offset);
}

function getAsciiAt(dataView, offset) {
    return dataView.getUint8(offset);
}

function getShortAt(dataView, offset, byteOrder) {
    return dataView.getUint16(offset, byteOrder === byte_order.LITTLE_ENDIAN);
}

function getLongAt(dataView, offset, byteOrder) {
    return dataView.getUint32(offset, byteOrder === byte_order.LITTLE_ENDIAN);
}

function getRationalAt(dataView, offset, byteOrder) {
    return [getLongAt(dataView, offset, byteOrder), getLongAt(dataView, offset + 4, byteOrder)];
}

function getUndefinedAt(dataView, offset) {
    return getByteAt(dataView, offset);
}

function getSlongAt(dataView, offset, byteOrder) {
    return dataView.getInt32(offset, byteOrder === byte_order.LITTLE_ENDIAN);
}

function getSrationalAt(dataView, offset, byteOrder) {
    return [getSlongAt(dataView, offset, byteOrder), getSlongAt(dataView, offset + 4, byteOrder)];
}

function getIfdPointerAt(dataView, offset, byteOrder) {
    return getLongAt(dataView, offset, byteOrder);
}

function getTypeSize(typeName) {
    if (tagTypes[typeName] === undefined) {
        throw new Error('No such type found.');
    }

    return typeSizes[tagTypes[typeName]];
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/tag-names-common.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* harmony default export */ const tag_names_common = ({
    'LightSource': (value) => {
        if (value === 1) {
            return 'Daylight';
        } else if (value === 2) {
            return 'Fluorescent';
        } else if (value === 3) {
            return 'Tungsten (incandescent light)';
        } else if (value === 4) {
            return 'Flash';
        } else if (value === 9) {
            return 'Fine weather';
        } else if (value === 10) {
            return 'Cloudy weather';
        } else if (value === 11) {
            return 'Shade';
        } else if (value === 12) {
            return 'Daylight fluorescent (D 5700 – 7100K)';
        } else if (value === 13) {
            return 'Day white fluorescent (N 4600 – 5400K)';
        } else if (value === 14) {
            return 'Cool white fluorescent (W 3900 – 4500K)';
        } else if (value === 15) {
            return 'White fluorescent (WW 3200 – 3700K)';
        } else if (value === 17) {
            return 'Standard light A';
        } else if (value === 18) {
            return 'Standard light B';
        } else if (value === 19) {
            return 'Standard light C';
        } else if (value === 20) {
            return 'D55';
        } else if (value === 21) {
            return 'D65';
        } else if (value === 22) {
            return 'D75';
        } else if (value === 23) {
            return 'D50';
        } else if (value === 24) {
            return 'ISO studio tungsten';
        } else if (value === 255) {
            return 'Other light source';
        }
        return 'Unknown';
    }
});

;// CONCATENATED MODULE: ./node_modules/exifreader/src/tag-names-0th-ifd.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */



/* harmony default export */ const tag_names_0th_ifd = ({
    0x000b: 'ProcessingSoftware',
    0x00fe: {
        name: 'SubfileType',
        description: (value) => ({
            0x0: 'Full-resolution image',
            0x1: 'Reduced-resolution image',
            0x2: 'Single page of multi-page image',
            0x3: 'Single page of multi-page reduced-resolution image',
            0x4: 'Transparency mask',
            0x5: 'Transparency mask of reduced-resolution image',
            0x6: 'Transparency mask of multi-page image',
            0x7: 'Transparency mask of reduced-resolution multi-page image',
            0x10001: 'Alternate reduced-resolution image',
            0xffffffff: 'Invalid'
        })[value] || 'Unknown'
    },
    0x00ff: {
        name: 'OldSubfileType',
        description: (value) => ({
            0: 'Full-resolution image',
            1: 'Reduced-resolution image',
            2: 'Single page of multi-page image'
        })[value] || 'Unknown'
    },
    0x0100: 'ImageWidth',
    0x0101: 'ImageLength',
    0x0102: 'BitsPerSample',
    0x0103: 'Compression',
    0x0106: 'PhotometricInterpretation',
    0x0107: {
        name: 'Thresholding',
        description: (value) => ({
            1: 'No dithering or halftoning',
            2: 'Ordered dither or halfton',
            3: 'Randomized dither'
        })[value] || 'Unknown'
    },
    0x0108: 'CellWidth',
    0x0109: 'CellLength',
    0x010a: {
        name: 'FillOrder',
        description: (value) => ({
            1: 'Normal',
            2: 'Reversed'
        })[value] || 'Unknown'
    },
    0x010d: 'DocumentName',
    0x010e: 'ImageDescription',
    0x010f: 'Make',
    0x0110: 'Model',
    0x0111: 'StripOffsets',
    0x0112: {
        name: 'Orientation',
        description: (value) => {
            if (value === 1) {
                return 'top-left';
            }
            if (value === 2) {
                return 'top-right';
            }
            if (value === 3) {
                return 'bottom-right';
            }
            if (value === 4) {
                return 'bottom-left';
            }
            if (value === 5) {
                return 'left-top';
            }
            if (value === 6) {
                return 'right-top';
            }
            if (value === 7) {
                return 'right-bottom';
            }
            if (value === 8) {
                return 'left-bottom';
            }
            return 'Undefined';
        }
    },
    0x0115: 'SamplesPerPixel',
    0x0116: 'RowsPerStrip',
    0x0117: 'StripByteCounts',
    0x0118: 'MinSampleValue',
    0x0119: 'MaxSampleValue',
    0x011a: {
        'name': 'XResolution',
        'description': (value) => {
            return '' + Math.round(value[0] / value[1]);
        }
    },
    0x011b: {
        'name': 'YResolution',
        'description': (value) => {
            return '' + Math.round(value[0] / value[1]);
        }
    },
    0x011c: 'PlanarConfiguration',
    0x011d: 'PageName',
    0x011e: {
        'name': 'XPosition',
        'description': (value) => {
            return '' + Math.round(value[0] / value[1]);
        }
    },
    0x011f: {
        'name': 'YPosition',
        'description': (value) => {
            return '' + Math.round(value[0] / value[1]);
        }
    },
    0x0122: {
        name: 'GrayResponseUnit',
        description: (value) => ({
            1: '0.1',
            2: '0.001',
            3: '0.0001',
            4: '1e-05',
            5: '1e-06'
        })[value] || 'Unknown'
    },
    0x0128: {
        name: 'ResolutionUnit',
        description: (value) => {
            if (value === 2) {
                return 'inches';
            }
            if (value === 3) {
                return 'centimeters';
            }
            return 'Unknown';
        }
    },
    0x0129: 'PageNumber',
    0x012d: 'TransferFunction',
    0x0131: 'Software',
    0x0132: 'DateTime',
    0x013b: 'Artist',
    0x013c: 'HostComputer',
    0x013d: 'Predictor',
    0x013e: {
        'name': 'WhitePoint',
        'description': (values) => {
            return values.map((value) => `${value[0]}/${value[1]}`).join(', ');
        }
    },
    0x013f: {
        'name': 'PrimaryChromaticities',
        'description': (values) => {
            return values.map((value) => `${value[0]}/${value[1]}`).join(', ');
        }
    },
    0x0141: 'HalftoneHints',
    0x0142: 'TileWidth',
    0x0143: 'TileLength',
    0x014a: 'A100DataOffset',
    0x014c: {
        name: 'InkSet',
        description: (value) => ({
            1: 'CMYK',
            2: 'Not CMYK'
        })[value] || 'Unknown'
    },
    0x0151: 'TargetPrinter',
    0x0152: {
        name: 'ExtraSamples',
        description: (value) => ({
            0: 'Unspecified',
            1: 'Associated Alpha',
            2: 'Unassociated Alpha',
        })[value] || 'Unknown'
    },
    0x0153: {
        name: 'SampleFormat',
        description: (value) => {
            const formats = {
                1: 'Unsigned',
                2: 'Signed',
                3: 'Float',
                4: 'Undefined',
                5: 'Complex int',
                6: 'Complex float',
            };
            if (!Array.isArray(value)) {
                return 'Unknown';
            }
            return value.map((sample) => formats[sample] || 'Unknown').join(', ');
        }
    },
    0x0201: 'JPEGInterchangeFormat',
    0x0202: 'JPEGInterchangeFormatLength',
    0x0211: {
        'name': 'YCbCrCoefficients',
        'description': (values) => {
            return values.map((value) => '' + value[0] / value[1]).join('/');
        }
    },
    0x0212: 'YCbCrSubSampling',
    0x0213: {
        name: 'YCbCrPositioning',
        description: (value) => {
            if (value === 1) {
                return 'centered';
            }
            if (value === 2) {
                return 'co-sited';
            }
            return 'undefined ' + value;
        }
    },
    0x0214: {
        'name': 'ReferenceBlackWhite',
        'description': (values) => {
            return values.map((value) => '' + value[0] / value[1]).join(', ');
        }
    },
    0x02bc: 'ApplicationNotes',
    0x4746: 'Rating',
    0x4749: 'RatingPercent',
    0x8298: {
        name: 'Copyright',
        description: (value) => value.join('; ')
    },
    0x830e: 'PixelScale',
    0x83bb: 'IPTC-NAA',
    0x8480: 'IntergraphMatrix',
    0x8482: 'ModelTiePoint',
    0x8546: 'SEMInfo',
    0x85d8: 'ModelTransform',
    0x8649: 'PhotoshopSettings',
    0x8769: 'Exif IFD Pointer',
    0x8773: 'ICC_Profile',
    0x87af: 'GeoTiffDirectory',
    0x87b0: 'GeoTiffDoubleParams',
    0x87b1: 'GeoTiffAsciiParams',
    0x8825: 'GPS Info IFD Pointer',
    0x9c9b: 'XPTitle',
    0x9c9c: 'XPComment',
    0x9c9d: 'XPAuthor',
    0x9c9e: 'XPKeywords',
    0x9c9f: 'XPSubject',
    0xa480: 'GDALMetadata',
    0xa481: 'GDALNoData',
    0xc4a5: 'PrintIM',
    0xc613: 'DNGBackwardVersion',
    0xc614: 'UniqueCameraModel',
    0xc615: 'LocalizedCameraModel',
    0xc621: 'ColorMatrix1',
    0xc622: 'ColorMatrix2',
    0xc623: 'CameraCalibration1',
    0xc624: 'CameraCalibration2',
    0xc625: 'ReductionMatrix1',
    0xc626: 'ReductionMatrix2',
    0xc627: 'AnalogBalance',
    0xc628: 'AsShotNeutral',
    0xc629: 'AsShotWhiteXY',
    0xc62a: 'BaselineExposure',
    0xc62b: 'BaselineNoise',
    0xc62c: 'BaselineSharpness',
    0xc62e: 'LinearResponseLimit',
    0xc62f: 'CameraSerialNumber',
    0xc630: 'DNGLensInfo',
    0xc633: 'ShadowScale',
    0xc635: {
        name: 'MakerNoteSafety',
        description: (value) => ({
            0: 'Unsafe',
            1: 'Safe'
        })[value] || 'Unknown'
    },
    0xc65a: {
        name: 'CalibrationIlluminant1',
        description: tag_names_common.LightSource
    },
    0xc65b: {
        name: 'CalibrationIlluminant2',
        description: tag_names_common.LightSource
    },
    0xc65d: 'RawDataUniqueID',
    0xc68b: 'OriginalRawFileName',
    0xc68c: 'OriginalRawFileData',
    0xc68f: 'AsShotICCProfile',
    0xc690: 'AsShotPreProfileMatrix',
    0xc691: 'CurrentICCProfile',
    0xc692: 'CurrentPreProfileMatrix',
    0xc6bf: 'ColorimetricReference',
    0xc6c5: 'SRawType',
    0xc6d2: 'PanasonicTitle',
    0xc6d3: 'PanasonicTitle2',
    0xc6f3: 'CameraCalibrationSig',
    0xc6f4: 'ProfileCalibrationSig',
    0xc6f5: 'ProfileIFD',
    0xc6f6: 'AsShotProfileName',
    0xc6f8: 'ProfileName',
    0xc6f9: 'ProfileHueSatMapDims',
    0xc6fa: 'ProfileHueSatMapData1',
    0xc6fb: 'ProfileHueSatMapData2',
    0xc6fc: 'ProfileToneCurve',
    0xc6fd: {
        name: 'ProfileEmbedPolicy',
        description: (value) => ({
            0: 'Allow Copying',
            1: 'Embed if Used',
            2: 'Never Embed',
            3: 'No Restrictions'
        })[value] || 'Unknown'
    },
    0xc6fe: 'ProfileCopyright',
    0xc714: 'ForwardMatrix1',
    0xc715: 'ForwardMatrix2',
    0xc716: 'PreviewApplicationName',
    0xc717: 'PreviewApplicationVersion',
    0xc718: 'PreviewSettingsName',
    0xc719: 'PreviewSettingsDigest',
    0xc71a: {
        name: 'PreviewColorSpace',
        description: (value) => ({
            1: 'Gray Gamma 2.2',
            2: 'sRGB',
            3: 'Adobe RGB',
            4: 'ProPhoto RGB'
        })[value] || 'Unknown'
    },
    0xc71b: 'PreviewDateTime',
    0xc71c: 'RawImageDigest',
    0xc71d: 'OriginalRawFileDigest',
    0xc725: 'ProfileLookTableDims',
    0xc726: 'ProfileLookTableData',
    0xc763: 'TimeCodes',
    0xc764: 'FrameRate',
    0xc772: 'TStop',
    0xc789: 'ReelName',
    0xc791: 'OriginalDefaultFinalSize',
    0xc792: 'OriginalBestQualitySize',
    0xc793: 'OriginalDefaultCropSize',
    0xc7a1: 'CameraLabel',
    0xc7a3: {
        name: 'ProfileHueSatMapEncoding',
        description: (value) => ({
            0: 'Linear',
            1: 'sRGB'
        })[value] || 'Unknown'
    },
    0xc7a4: {
        name: 'ProfileLookTableEncoding',
        description: (value) => ({
            0: 'Linear',
            1: 'sRGB'
        })[value] || 'Unknown'
    },
    0xc7a5: 'BaselineExposureOffset',
    0xc7a6: {
        name: 'DefaultBlackRender',
        description: (value) => ({
            0: 'Auto',
            1: 'None'
        })[value] || 'Unknown'
    },
    0xc7a7: 'NewRawImageDigest',
    0xc7a8: 'RawToPreviewGain'
});

;// CONCATENATED MODULE: ./node_modules/exifreader/src/tag-names-exif-ifd.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */




/* harmony default export */ const tag_names_exif_ifd = ({
    0x829a: {
        'name': 'ExposureTime',
        'description': (value) => {
            if (value[0] !== 0) {
                return `1/${Math.round(value[1] / value[0])}`;
            }
            return `0/${value[1]}`;
        }
    },
    0x829d: {
        'name': 'FNumber',
        'description': (value) => `f/${value[0] / value[1]}`
    },
    0x8822: {
        'name': 'ExposureProgram',
        'description': (value) => {
            if (value === 0) {
                return 'Undefined';
            } else if (value === 1) {
                return 'Manual';
            } else if (value === 2) {
                return 'Normal program';
            } else if (value === 3) {
                return 'Aperture priority';
            } else if (value === 4) {
                return 'Shutter priority';
            } else if (value === 5) {
                return 'Creative program';
            } else if (value === 6) {
                return 'Action program';
            } else if (value === 7) {
                return 'Portrait mode';
            } else if (value === 8) {
                return 'Landscape mode';
            } else if (value === 9) {
                return 'Bulb';
            }
            return 'Unknown';
        }
    },
    0x8824: 'SpectralSensitivity',
    0x8827: 'ISOSpeedRatings',
    0x8828: {
        'name': 'OECF',
        'description': () => '[Raw OECF table data]'
    },
    0x882a: 'TimeZoneOffset',
    0x882b: 'SelfTimerMode',
    0x8830: {
        name: 'SensitivityType',
        description: (value) => ({
            1: 'Standard Output Sensitivity',
            2: 'Recommended Exposure Index',
            3: 'ISO Speed',
            4: 'Standard Output Sensitivity and Recommended Exposure Index',
            5: 'Standard Output Sensitivity and ISO Speed',
            6: 'Recommended Exposure Index and ISO Speed',
            7: 'Standard Output Sensitivity, Recommended Exposure Index and ISO Speed'
        })[value] || 'Unknown'
    },
    0x8831: 'StandardOutputSensitivity',
    0x8832: 'RecommendedExposureIndex',
    0x8833: 'ISOSpeed',
    0x8834: 'ISOSpeedLatitudeyyy',
    0x8835: 'ISOSpeedLatitudezzz',
    0x9000: {
        'name': 'ExifVersion',
        'description': (value) => getStringValue(value)
    },
    0x9003: 'DateTimeOriginal',
    0x9004: 'DateTimeDigitized',
    0x9009: 'GooglePlusUploadCode',
    0x9010: 'OffsetTime',
    0x9011: 'OffsetTimeOriginal',
    0x9012: 'OffsetTimeDigitized',
    0x9101: {
        'name': 'ComponentsConfiguration',
        'description': (value) => {
            return value.map((character) => {
                if (character === 0x31) {
                    return 'Y';
                } else if (character === 0x32) {
                    return 'Cb';
                } else if (character === 0x33) {
                    return 'Cr';
                } else if (character === 0x34) {
                    return 'R';
                } else if (character === 0x35) {
                    return 'G';
                } else if (character === 0x36) {
                    return 'B';
                }
            }).join('');
        }
    },
    0x9102: 'CompressedBitsPerPixel',
    0x9201: {
        'name': 'ShutterSpeedValue',
        'description': (value) => {
            return `1/${Math.round(Math.pow(2, value[0] / value[1]))}`;
        }
    },
    0x9202: {
        'name': 'ApertureValue',
        'description': (value) => {
            return Math.pow(Math.sqrt(2), value[0] / value[1]).toFixed(2);
        }
    },
    0x9203: 'BrightnessValue',
    0x9204: 'ExposureBiasValue',
    0x9205: {
        'name': 'MaxApertureValue',
        'description': (value) => {
            return Math.pow(Math.sqrt(2), value[0] / value[1]).toFixed(2);
        }
    },
    0x9206: {
        'name': 'SubjectDistance',
        'description': (value) => (value[0] / value[1]) + ' m'
    },
    0x9207: {
        'name': 'MeteringMode',
        'description': (value) => {
            if (value === 1) {
                return 'Average';
            } else if (value === 2) {
                return 'CenterWeightedAverage';
            } else if (value === 3) {
                return 'Spot';
            } else if (value === 4) {
                return 'MultiSpot';
            } else if (value === 5) {
                return 'Pattern';
            } else if (value === 6) {
                return 'Partial';
            } else if (value === 255) {
                return 'Other';
            }
            return 'Unknown';
        }
    },
    0x9208: {
        'name': 'LightSource',
        description: tag_names_common.LightSource
    },
    0x9209: {
        'name': 'Flash',
        'description': (value) => {
            if (value === 0x00) {
                return 'Flash did not fire';
            } else if (value === 0x01) {
                return 'Flash fired';
            } else if (value === 0x05) {
                return 'Strobe return light not detected';
            } else if (value === 0x07) {
                return 'Strobe return light detected';
            } else if (value === 0x09) {
                return 'Flash fired, compulsory flash mode';
            } else if (value === 0x0d) {
                return 'Flash fired, compulsory flash mode, return light not detected';
            } else if (value === 0x0f) {
                return 'Flash fired, compulsory flash mode, return light detected';
            } else if (value === 0x10) {
                return 'Flash did not fire, compulsory flash mode';
            } else if (value === 0x18) {
                return 'Flash did not fire, auto mode';
            } else if (value === 0x19) {
                return 'Flash fired, auto mode';
            } else if (value === 0x1d) {
                return 'Flash fired, auto mode, return light not detected';
            } else if (value === 0x1f) {
                return 'Flash fired, auto mode, return light detected';
            } else if (value === 0x20) {
                return 'No flash function';
            } else if (value === 0x41) {
                return 'Flash fired, red-eye reduction mode';
            } else if (value === 0x45) {
                return 'Flash fired, red-eye reduction mode, return light not detected';
            } else if (value === 0x47) {
                return 'Flash fired, red-eye reduction mode, return light detected';
            } else if (value === 0x49) {
                return 'Flash fired, compulsory flash mode, red-eye reduction mode';
            } else if (value === 0x4d) {
                return 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected';
            } else if (value === 0x4f) {
                return 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected';
            } else if (value === 0x59) {
                return 'Flash fired, auto mode, red-eye reduction mode';
            } else if (value === 0x5d) {
                return 'Flash fired, auto mode, return light not detected, red-eye reduction mode';
            } else if (value === 0x5f) {
                return 'Flash fired, auto mode, return light detected, red-eye reduction mode';
            }
            return 'Unknown';
        }
    },
    0x920a: {
        'name': 'FocalLength',
        'description': (value) => (value[0] / value[1]) + ' mm'
    },
    0x9211: 'ImageNumber',
    0x9212: {
        name: 'SecurityClassification',
        description: (value) => ({
            'C': 'Confidential',
            'R': 'Restricted',
            'S': 'Secret',
            'T': 'Top Secret',
            'U': 'Unclassified'
        })[value] || 'Unknown'
    },
    0x9213: 'ImageHistory',
    0x9214: {
        'name': 'SubjectArea',
        'description': (value) => {
            if (value.length === 2) {
                return `Location; X: ${value[0]}, Y: ${value[1]}`;
            } else if (value.length === 3) {
                return `Circle; X: ${value[0]}, Y: ${value[1]}, diameter: ${value[2]}`;
            } else if (value.length === 4) {
                return `Rectangle; X: ${value[0]}, Y: ${value[1]}, width: ${value[2]}, height: ${value[3]}`;
            }
            return 'Unknown';
        }
    },
    0x927c: {
        'name': 'MakerNote',
        'description': () => '[Raw maker note data]'
    },
    0x9286: {
        'name': 'UserComment',
        'description': getEncodedString
    },
    0x9290: 'SubSecTime',
    0x9291: 'SubSecTimeOriginal',
    0x9292: 'SubSecTimeDigitized',
    0x9400: {
        'name': 'AmbientTemperature',
        'description': (value) => (value[0] / value[1]) + ' °C'
    },
    0x9401: {
        'name': 'Humidity',
        'description': (value) => (value[0] / value[1]) + ' %'
    },
    0x9402: {
        'name': 'Pressure',
        'description': (value) => (value[0] / value[1]) + ' hPa'
    },
    0x9403: {
        'name': 'WaterDepth',
        'description': (value) => (value[0] / value[1]) + ' m'
    },
    0x9404: {
        'name': 'Acceleration',
        'description': (value) => (value[0] / value[1]) + ' mGal'
    },
    0x9405: {
        'name': 'CameraElevationAngle',
        'description': (value) => (value[0] / value[1]) + ' °'
    },
    0xa000: {
        'name': 'FlashpixVersion',
        'description': (value) => value.map((charCode) => String.fromCharCode(charCode)).join('')
    },
    0xa001: {
        'name': 'ColorSpace',
        'description': (value) => {
            if (value === 1) {
                return 'sRGB';
            } else if (value === 0xffff) {
                return 'Uncalibrated';
            }
            return 'Unknown';
        }
    },
    0xa002: 'PixelXDimension',
    0xa003: 'PixelYDimension',
    0xa004: 'RelatedSoundFile',
    0xa005: 'Interoperability IFD Pointer',
    0xa20b: 'FlashEnergy',
    0xa20c: {
        'name': 'SpatialFrequencyResponse',
        'description': () => '[Raw SFR table data]'
    },
    0xa20e: 'FocalPlaneXResolution',
    0xa20f: 'FocalPlaneYResolution',
    0xa210: {
        'name': 'FocalPlaneResolutionUnit',
        'description': (value) => {
            if (value === 2) {
                return 'inches';
            } else if (value === 3) {
                return 'centimeters';
            }
            return 'Unknown';
        }
    },
    0xa214: {
        'name': 'SubjectLocation',
        'description': ([x, y]) => `X: ${x}, Y: ${y}`
    },
    0xa215: 'ExposureIndex',
    0xa217: {
        'name': 'SensingMethod',
        'description': (value) => {
            if (value === 1) {
                return 'Undefined';
            } else if (value === 2) {
                return 'One-chip color area sensor';
            } else if (value === 3) {
                return 'Two-chip color area sensor';
            } else if (value === 4) {
                return 'Three-chip color area sensor';
            } else if (value === 5) {
                return 'Color sequential area sensor';
            } else if (value === 7) {
                return 'Trilinear sensor';
            } else if (value === 8) {
                return 'Color sequential linear sensor';
            }
            return 'Unknown';
        }
    },
    0xa300: {
        'name': 'FileSource',
        'description': (value) => {
            if (value === 3) {
                return 'DSC';
            }
            return 'Unknown';
        }
    },
    0xa301: {
        'name': 'SceneType',
        'description': (value) => {
            if (value === 1) {
                return 'A directly photographed image';
            }
            return 'Unknown';
        }
    },
    0xa302: {
        'name': 'CFAPattern',
        'description': () => '[Raw CFA pattern table data]'
    },
    0xa401: {
        'name': 'CustomRendered',
        'description': (value) => {
            if (value === 0) {
                return 'Normal process';
            } else if (value === 1) {
                return 'Custom process';
            }
            return 'Unknown';
        }
    },
    0xa402: {
        'name': 'ExposureMode',
        'description': (value) => {
            if (value === 0) {
                return 'Auto exposure';
            } else if (value === 1) {
                return 'Manual exposure';
            } else if (value === 2) {
                return 'Auto bracket';
            }
            return 'Unknown';
        }
    },
    0xa403: {
        'name': 'WhiteBalance',
        'description': (value) => {
            if (value === 0) {
                return 'Auto white balance';
            } else if (value === 1) {
                return 'Manual white balance';
            }
            return 'Unknown';
        }
    },
    0xa404: {
        'name': 'DigitalZoomRatio',
        'description': (value) => {
            if (value[0] === 0) {
                return 'Digital zoom was not used';
            }
            return '' + (value[0] / value[1]);
        }
    },
    0xa405: {
        'name': 'FocalLengthIn35mmFilm',
        'description': (value) => {
            if (value === 0) {
                return 'Unknown';
            }
            return value;
        }
    },
    0xa406: {
        'name': 'SceneCaptureType',
        'description': (value) => {
            if (value === 0) {
                return 'Standard';
            } else if (value === 1) {
                return 'Landscape';
            } else if (value === 2) {
                return 'Portrait';
            } else if (value === 3) {
                return 'Night scene';
            }
            return 'Unknown';
        }
    },
    0xa407: {
        'name': 'GainControl',
        'description': (value) => {
            if (value === 0) {
                return 'None';
            } else if (value === 1) {
                return 'Low gain up';
            } else if (value === 2) {
                return 'High gain up';
            } else if (value === 3) {
                return 'Low gain down';
            } else if (value === 4) {
                return 'High gain down';
            }
            return 'Unknown';
        }
    },
    0xa408: {
        'name': 'Contrast',
        'description': (value) => {
            if (value === 0) {
                return 'Normal';
            } else if (value === 1) {
                return 'Soft';
            } else if (value === 2) {
                return 'Hard';
            }
            return 'Unknown';
        }
    },
    0xa409: {
        'name': 'Saturation',
        'description': (value) => {
            if (value === 0) {
                return 'Normal';
            } else if (value === 1) {
                return 'Low saturation';
            } else if (value === 2) {
                return 'High saturation';
            }
            return 'Unknown';
        }
    },
    0xa40a: {
        'name': 'Sharpness',
        'description': (value) => {
            if (value === 0) {
                return 'Normal';
            } else if (value === 1) {
                return 'Soft';
            } else if (value === 2) {
                return 'Hard';
            }
            return 'Unknown';
        }
    },
    0xa40b: {
        'name': 'DeviceSettingDescription',
        'description': () => '[Raw device settings table data]'
    },
    0xa40c: {
        'name': 'SubjectDistanceRange',
        'description': (value) => {
            if (value === 1) {
                return 'Macro';
            } else if (value === 2) {
                return 'Close view';
            } else if (value === 3) {
                return 'Distant view';
            }
            return 'Unknown';
        }
    },
    0xa420: 'ImageUniqueID',
    0xa430: 'CameraOwnerName',
    0xa431: 'BodySerialNumber',
    0xa432: {
        'name': 'LensSpecification',
        'description': (value) => {
            const focalLengths = `${value[0][0] / value[0][1]}-${value[1][0] / value[1][1]} mm`;
            if (value[3][1] === 0) {
                return `${focalLengths} f/?`;
            }
            return `${focalLengths} f/${1 / ((value[2][1] / value[2][1]) / (value[3][0] / value[3][1]))}`;
        }
    },
    0xa433: 'LensMake',
    0xa434: 'LensModel',
    0xa435: 'LensSerialNumber',
    0xa460: {
        name: 'CompositeImage',
        description: (value) => ({
            1: 'Not a Composite Image',
            2: 'General Composite Image',
            3: 'Composite Image Captured While Shooting',
        })[value] || 'Unknown'
    },
    0xa461: 'SourceImageNumberOfCompositeImage',
    0xa462: 'SourceExposureTimesOfCompositeImage',
    0xa500: 'Gamma',
    0xea1c: 'Padding',
    0xea1d: 'OffsetSchema',
    0xfde8: 'OwnerName',
    0xfde9: 'SerialNumber',
    0xfdea: 'Lens',
    0xfe4c: 'RawFile',
    0xfe4d: 'Converter',
    0xfe4e: 'WhiteBalance',
    0xfe51: 'Exposure',
    0xfe52: 'Shadows',
    0xfe53: 'Brightness',
    0xfe54: 'Contrast',
    0xfe55: 'Saturation',
    0xfe56: 'Sharpness',
    0xfe57: 'Smoothness',
    0xfe58: 'MoireFilter'
});

;// CONCATENATED MODULE: ./node_modules/exifreader/src/tag-names-gps-ifd.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */



/* harmony default export */ const tag_names_gps_ifd = ({
    0x0000: {
        'name': 'GPSVersionID',
        'description': (value) => {
            if (value[0] === 2 && value[1] === 2 && value[2] === 0 && value[3] === 0) {
                return 'Version 2.2';
            }
            return 'Unknown';
        }
    },
    0x0001: {
        'name': 'GPSLatitudeRef',
        'description': (value) => {
            const ref = value.join('');
            if (ref === 'N') {
                return 'North latitude';
            } else if (ref === 'S') {
                return 'South latitude';
            }
            return 'Unknown';
        }
    },
    0x0002: {
        'name': 'GPSLatitude',
        'description': getCalculatedGpsValue
    },
    0x0003: {
        'name': 'GPSLongitudeRef',
        'description': (value) => {
            const ref = value.join('');
            if (ref === 'E') {
                return 'East longitude';
            } else if (ref === 'W') {
                return 'West longitude';
            }
            return 'Unknown';
        }
    },
    0x0004: {
        'name': 'GPSLongitude',
        'description': getCalculatedGpsValue
    },
    0x0005: {
        'name': 'GPSAltitudeRef',
        'description': (value) => {
            if (value === 0) {
                return 'Sea level';
            } else if (value === 1) {
                return 'Sea level reference (negative value)';
            }
            return 'Unknown';
        }
    },
    0x0006: {
        'name': 'GPSAltitude',
        'description': (value) => {
            return (value[0] / value[1]) + ' m';
        }
    },
    0x0007: {
        'name': 'GPSTimeStamp',
        'description': (values) => {
            return values.map(([numerator, denominator]) => {
                const num = numerator / denominator;
                if (/^\d(\.|$)/.test(`${num}`)) {
                    return `0${num}`;
                }
                return num;
            }).join(':');
        }
    },
    0x0008: 'GPSSatellites',
    0x0009: {
        'name': 'GPSStatus',
        'description': (value) => {
            const status = value.join('');
            if (status === 'A') {
                return 'Measurement in progress';
            } else if (status === 'V') {
                return 'Measurement Interoperability';
            }
            return 'Unknown';
        }
    },
    0x000a: {
        'name': 'GPSMeasureMode',
        'description': (value) => {
            const mode = value.join('');
            if (mode === '2') {
                return '2-dimensional measurement';
            } else if (mode === '3') {
                return '3-dimensional measurement';
            }
            return 'Unknown';
        }
    },
    0x000b: 'GPSDOP',
    0x000c: {
        'name': 'GPSSpeedRef',
        'description': (value) => {
            const ref = value.join('');
            if (ref === 'K') {
                return 'Kilometers per hour';
            } else if (ref === 'M') {
                return 'Miles per hour';
            } else if (ref === 'N') {
                return 'Knots';
            }
            return 'Unknown';
        }
    },
    0x000d: 'GPSSpeed',
    0x000e: {
        'name': 'GPSTrackRef',
        'description': (value) => {
            const ref = value.join('');
            if (ref === 'T') {
                return 'True direction';
            } else if (ref === 'M') {
                return 'Magnetic direction';
            }
            return 'Unknown';
        }
    },
    0x000f: 'GPSTrack',
    0x0010: {
        'name': 'GPSImgDirectionRef',
        'description': (value) => {
            const ref = value.join('');
            if (ref === 'T') {
                return 'True direction';
            } else if (ref === 'M') {
                return 'Magnetic direction';
            }
            return 'Unknown';
        }
    },
    0x0011: 'GPSImgDirection',
    0x0012: 'GPSMapDatum',
    0x0013: {
        'name': 'GPSDestLatitudeRef',
        'description': (value) => {
            const ref = value.join('');
            if (ref === 'N') {
                return 'North latitude';
            } else if (ref === 'S') {
                return 'South latitude';
            }
            return 'Unknown';
        }
    },
    0x0014: {
        'name': 'GPSDestLatitude',
        'description': (value) => {
            return (value[0][0] / value[0][1]) + (value[1][0] / value[1][1]) / 60 + (value[2][0] / value[2][1]) / 3600;
        }
    },
    0x0015: {
        'name': 'GPSDestLongitudeRef',
        'description': (value) => {
            const ref = value.join('');
            if (ref === 'E') {
                return 'East longitude';
            } else if (ref === 'W') {
                return 'West longitude';
            }
            return 'Unknown';
        }
    },
    0x0016: {
        'name': 'GPSDestLongitude',
        'description': (value) => {
            return (value[0][0] / value[0][1]) + (value[1][0] / value[1][1]) / 60 + (value[2][0] / value[2][1]) / 3600;
        }
    },
    0x0017: {
        'name': 'GPSDestBearingRef',
        'description': (value) => {
            const ref = value.join('');
            if (ref === 'T') {
                return 'True direction';
            } else if (ref === 'M') {
                return 'Magnetic direction';
            }
            return 'Unknown';
        }
    },
    0x0018: 'GPSDestBearing',
    0x0019: {
        'name': 'GPSDestDistanceRef',
        'description': (value) => {
            const ref = value.join('');
            if (ref === 'K') {
                return 'Kilometers';
            } else if (ref === 'M') {
                return 'Miles';
            } else if (ref === 'N') {
                return 'Knots';
            }
            return 'Unknown';
        }
    },
    0x001a: 'GPSDestDistance',
    0x001b: {
        'name': 'GPSProcessingMethod',
        'description': getEncodedString
    },
    0x001c: {
        'name': 'GPSAreaInformation',
        'description': getEncodedString
    },
    0x001d: 'GPSDateStamp',
    0x001e: {
        'name': 'GPSDifferential',
        'description': (value) => {
            if (value === 0) {
                return 'Measurement without differential correction';
            } else if (value === 1) {
                return 'Differential correction applied';
            }
            return 'Unknown';
        }
    },
    0x001f: 'GPSHPositioningError'
});

;// CONCATENATED MODULE: ./node_modules/exifreader/src/tag-names-interoperability-ifd.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */



/* harmony default export */ const tag_names_interoperability_ifd = ({
    0x0001: 'InteroperabilityIndex',
    0x0002: {
        name: 'InteroperabilityVersion',
        description: (value) => getStringValue(value)
    },
    0x1000: 'RelatedImageFileFormat',
    0x1001: 'RelatedImageWidth',
    0x1002: 'RelatedImageHeight'
});

;// CONCATENATED MODULE: ./node_modules/exifreader/src/tag-names.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */







const tagNames0thExifIfds = objectAssign({}, tag_names_0th_ifd, tag_names_exif_ifd);

/* harmony default export */ const tag_names = ({
    '0th': tagNames0thExifIfds,
    'exif': tagNames0thExifIfds,
    'gps': tag_names_gps_ifd,
    'interoperability': tag_names_interoperability_ifd
});

;// CONCATENATED MODULE: ./node_modules/exifreader/src/tags.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */







const EXIF_IFD_POINTER_KEY = 'Exif IFD Pointer';
const GPS_INFO_IFD_POINTER_KEY = 'GPS Info IFD Pointer';
const INTEROPERABILITY_IFD_POINTER_KEY = 'Interoperability IFD Pointer';

const getTagValueAt = {
    1: types.getByteAt,
    2: types.getAsciiAt,
    3: types.getShortAt,
    4: types.getLongAt,
    5: types.getRationalAt,
    7: types.getUndefinedAt,
    9: types.getSlongAt,
    10: types.getSrationalAt,
    13: types.getIfdPointerAt
};

/* harmony default export */ const src_tags = ({
    read
});

function read(dataView, tiffHeaderOffset) {
    const byteOrder = byte_order.getByteOrder(dataView, tiffHeaderOffset);
    let tags = read0thIfd(dataView, tiffHeaderOffset, byteOrder);
    tags = readExifIfd(tags, dataView, tiffHeaderOffset, byteOrder);
    tags = readGpsIfd(tags, dataView, tiffHeaderOffset, byteOrder);
    tags = readInteroperabilityIfd(tags, dataView, tiffHeaderOffset, byteOrder);

    return tags;
}

function read0thIfd(dataView, tiffHeaderOffset, byteOrder) {
    return readIfd(dataView, '0th', tiffHeaderOffset, get0thIfdOffset(dataView, tiffHeaderOffset, byteOrder), byteOrder);
}

function get0thIfdOffset(dataView, tiffHeaderOffset, byteOrder) {
    return tiffHeaderOffset + types.getLongAt(dataView, tiffHeaderOffset + 4, byteOrder);
}

function readExifIfd(tags, dataView, tiffHeaderOffset, byteOrder) {
    if (tags[EXIF_IFD_POINTER_KEY] !== undefined) {
        return objectAssign(tags, readIfd(dataView, 'exif', tiffHeaderOffset, tiffHeaderOffset + tags[EXIF_IFD_POINTER_KEY].value, byteOrder));
    }

    return tags;
}

function readGpsIfd(tags, dataView, tiffHeaderOffset, byteOrder) {
    if (tags[GPS_INFO_IFD_POINTER_KEY] !== undefined) {
        return objectAssign(tags, readIfd(dataView, 'gps', tiffHeaderOffset, tiffHeaderOffset + tags[GPS_INFO_IFD_POINTER_KEY].value, byteOrder));
    }

    return tags;
}

function readInteroperabilityIfd(tags, dataView, tiffHeaderOffset, byteOrder) {
    if (tags[INTEROPERABILITY_IFD_POINTER_KEY] !== undefined) {
        return objectAssign(tags, readIfd(dataView, 'interoperability', tiffHeaderOffset, tiffHeaderOffset + tags[INTEROPERABILITY_IFD_POINTER_KEY].value, byteOrder));
    }

    return tags;
}

function readIfd(dataView, ifdType, tiffHeaderOffset, offset, byteOrder) {
    const FIELD_COUNT_SIZE = types.getTypeSize('SHORT');
    const FIELD_SIZE = 12;

    const tags = {};
    const numberOfFields = getNumberOfFields(dataView, offset, byteOrder);

    offset += FIELD_COUNT_SIZE;
    for (let fieldIndex = 0; fieldIndex < numberOfFields; fieldIndex++) {
        if (offset + FIELD_SIZE > dataView.byteLength) {
            break;
        }

        const tag = readTag(dataView, ifdType, tiffHeaderOffset, offset, byteOrder);
        if (tag !== undefined) {
            tags[tag.name] = {
                'id': tag.id,
                'value': tag.value,
                'description': tag.description
            };
        }

        offset += FIELD_SIZE;
    }

    if (constants.USE_THUMBNAIL && (offset < dataView.byteLength - types.getTypeSize('LONG'))) {
        const nextIfdOffset = types.getLongAt(dataView, offset, byteOrder);
        if (nextIfdOffset !== 0) {
            tags['Thumbnail'] = readIfd(dataView, ifdType, tiffHeaderOffset, tiffHeaderOffset + nextIfdOffset, byteOrder);
        }
    }

    return tags;
}

function getNumberOfFields(dataView, offset, byteOrder) {
    if (offset + types.getTypeSize('SHORT') <= dataView.byteLength) {
        return types.getShortAt(dataView, offset, byteOrder);
    }
    return 0;
}

function readTag(dataView, ifdType, tiffHeaderOffset, offset, byteOrder) {
    const TAG_CODE_IPTC_NAA = 0x83bb;
    const TAG_TYPE_OFFSET = types.getTypeSize('SHORT');
    const TAG_COUNT_OFFSET = TAG_TYPE_OFFSET + types.getTypeSize('SHORT');
    const TAG_VALUE_OFFSET = TAG_COUNT_OFFSET + types.getTypeSize('LONG');

    const tagCode = types.getShortAt(dataView, offset, byteOrder);
    const tagType = types.getShortAt(dataView, offset + TAG_TYPE_OFFSET, byteOrder);
    const tagCount = types.getLongAt(dataView, offset + TAG_COUNT_OFFSET, byteOrder);
    let tagValue;

    if (types.typeSizes[tagType] === undefined) {
        return undefined;
    }

    if (tagValueFitsInOffsetSlot(tagType, tagCount)) {
        tagValue = getTagValue(dataView, offset + TAG_VALUE_OFFSET, tagType, tagCount, byteOrder);
    } else {
        const tagValueOffset = types.getLongAt(dataView, offset + TAG_VALUE_OFFSET, byteOrder);
        if (tagValueFitsInDataView(dataView, tiffHeaderOffset, tagValueOffset, tagType, tagCount)) {
            const forceByteType = tagCode === TAG_CODE_IPTC_NAA;
            tagValue = getTagValue(dataView, tiffHeaderOffset + tagValueOffset, tagType, tagCount, byteOrder, forceByteType);
        } else {
            tagValue = '<faulty value>';
        }
    }

    if (tagType === types.tagTypes.ASCII) {
        tagValue = splitNullSeparatedAsciiString(tagValue);
        tagValue = decodeAsciiValue(tagValue);
    }

    let tagName = `undefined-${tagCode}`;
    let tagDescription = tagValue;

    if (tag_names[ifdType][tagCode] !== undefined) {
        if ((tag_names[ifdType][tagCode]['name'] !== undefined) && (tag_names[ifdType][tagCode]['description'] !== undefined)) {
            tagName = tag_names[ifdType][tagCode]['name'];
            try {
                tagDescription = tag_names[ifdType][tagCode]['description'](tagValue);
            } catch (error) {
                tagDescription = getDescriptionFromTagValue(tagValue);
            }
        } else if ((tagType === types.tagTypes.RATIONAL) || (tagType === types.tagTypes.SRATIONAL)) {
            tagName = tag_names[ifdType][tagCode];
            tagDescription = '' + (tagValue[0] / tagValue[1]);
        } else {
            tagName = tag_names[ifdType][tagCode];
            tagDescription = getDescriptionFromTagValue(tagValue);
        }
    }

    return {
        id: tagCode,
        name: tagName,
        value: tagValue,
        description: tagDescription
    };
}

function tagValueFitsInOffsetSlot(tagType, tagCount) {
    return types.typeSizes[tagType] * tagCount <= types.getTypeSize('LONG');
}

function getTagValue(dataView, offset, type, count, byteOrder, forceByteType = false) {
    let value = [];

    if (forceByteType) {
        count = count * types.typeSizes[type];
        type = types.tagTypes.BYTE;
    }
    for (let valueIndex = 0; valueIndex < count; valueIndex++) {
        value.push(getTagValueAt[type](dataView, offset, byteOrder));
        offset += types.typeSizes[type];
    }

    if (type === types.tagTypes.ASCII) {
        value = types.getAsciiValue(value);
    } else if (value.length === 1) {
        value = value[0];
    }

    return value;
}

function tagValueFitsInDataView(dataView, tiffHeaderOffset, tagValueOffset, tagType, tagCount) {
    return tiffHeaderOffset + tagValueOffset + types.typeSizes[tagType] * tagCount <= dataView.byteLength;
}

function splitNullSeparatedAsciiString(string) {
    const tagValue = [];
    let i = 0;

    for (let j = 0; j < string.length; j++) {
        if (string[j] === '\x00') {
            i++;
            continue;
        }
        if (tagValue[i] === undefined) {
            tagValue[i] = '';
        }
        tagValue[i] += string[j];
    }

    return tagValue;
}

function decodeAsciiValue(asciiValue) {
    try {
        return asciiValue.map((value) => decodeURIComponent(escape(value)));
    } catch (error) {
        return asciiValue;
    }
}

function getDescriptionFromTagValue(tagValue) {
    if (tagValue instanceof Array) {
        return tagValue.join(', ');
    }
    return tagValue;
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/file-tags.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */



/* harmony default export */ const file_tags = ({
    read: file_tags_read
});

function file_tags_read(dataView, fileDataOffset) {
    const length = getLength(dataView, fileDataOffset);
    const numberOfColorComponents = getNumberOfColorComponents(dataView, fileDataOffset, length);
    return {
        'Bits Per Sample': getDataPrecision(dataView, fileDataOffset, length),
        'Image Height': getImageHeight(dataView, fileDataOffset, length),
        'Image Width': getImageWidth(dataView, fileDataOffset, length),
        'Color Components': numberOfColorComponents,
        'Subsampling': numberOfColorComponents && getSubsampling(dataView, fileDataOffset, numberOfColorComponents.value, length)
    };
}

function getLength(dataView, fileDataOffset) {
    return types.getShortAt(dataView, fileDataOffset);
}

function getDataPrecision(dataView, fileDataOffset, length) {
    const OFFSET = 2;
    const SIZE = 1;

    if (OFFSET + SIZE > length) {
        return undefined;
    }

    const value = types.getByteAt(dataView, fileDataOffset + OFFSET);
    return {
        value,
        description: '' + value
    };
}

function getImageHeight(dataView, fileDataOffset, length) {
    const OFFSET = 3;
    const SIZE = 2;

    if (OFFSET + SIZE > length) {
        return undefined;
    }

    const value = types.getShortAt(dataView, fileDataOffset + OFFSET);
    return {
        value,
        description: `${value}px`
    };
}

function getImageWidth(dataView, fileDataOffset, length) {
    const OFFSET = 5;
    const SIZE = 2;

    if (OFFSET + SIZE > length) {
        return undefined;
    }

    const value = types.getShortAt(dataView, fileDataOffset + OFFSET);
    return {
        value,
        description: `${value}px`
    };
}

function getNumberOfColorComponents(dataView, fileDataOffset, length) {
    const OFFSET = 7;
    const SIZE = 1;

    if (OFFSET + SIZE > length) {
        return undefined;
    }

    const value = types.getByteAt(dataView, fileDataOffset + OFFSET);
    return {
        value,
        description: '' + value
    };
}

function getSubsampling(dataView, fileDataOffset, numberOfColorComponents, length) {
    const OFFSET = 8;
    const SIZE = 3 * numberOfColorComponents;

    if (OFFSET + SIZE > length) {
        return undefined;
    }

    const components = [];

    for (let i = 0; i < numberOfColorComponents; i++) {
        const componentOffset = fileDataOffset + OFFSET + i * 3;
        components.push([
            types.getByteAt(dataView, componentOffset),
            types.getByteAt(dataView, componentOffset + 1),
            types.getByteAt(dataView, componentOffset + 2)
        ]);
    }

    return {
        value: components,
        description: components.length > 1 ? getComponentIds(components) + getSamplingType(components) : ''
    };
}

function getComponentIds(components) {
    const ids = {
        0x01: 'Y',
        0x02: 'Cb',
        0x03: 'Cr',
        0x04: 'I',
        0x05: 'Q',
    };

    return components.map((compontent) => ids[compontent[0]]).join('');
}

function getSamplingType(components) {
    const types = {
        0x11: '4:4:4 (1 1)',
        0x12: '4:4:0 (1 2)',
        0x14: '4:4:1 (1 4)',
        0x21: '4:2:2 (2 1)',
        0x22: '4:2:0 (2 2)',
        0x24: '4:2:1 (2 4)',
        0x41: '4:1:1 (4 1)',
        0x42: '4:1:0 (4 2)'
    };

    if (components.length === 0 || components[0][1] === undefined || types[components[0][1]] === undefined) {
        return '';
    }

    return types[components[0][1]];
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/iptc-tag-names.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */



/* harmony default export */ const iptc_tag_names = ({
    'iptc': {
        0x0100: {
            'name': 'Model Version',
            'description': (value) => {
                return ((value[0] << 8) + value[1]).toString();
            }
        },
        0x0105: {
            'name': 'Destination',
            'repeatable': true
        },
        0x0114: {
            'name': 'File Format',
            'description': (value) => {
                return ((value[0] << 8) + value[1]).toString();
            }
        },
        0x0116: {
            'name': 'File Format Version',
            'description': (value) => {
                return ((value[0] << 8) + value[1]).toString();
            }
        },
        0x011e: 'Service Identifier',
        0x0128: 'Envelope Number',
        0x0132: 'Product ID',
        0x013c: 'Envelope Priority',
        0x0146: {
            'name': 'Date Sent',
            'description': getCreationDate
        },
        0x0150: {
            'name': 'Time Sent',
            'description': getCreationTime
        },
        0x015a: {
            'name': 'Coded Character Set',
            'description': getEncodingName,
            'encoding_name': getEncodingName,
        },
        0x0164: 'UNO',
        0x0178: {
            'name': 'ARM Identifier',
            'description': (value) => {
                return ((value[0] << 8) + value[1]).toString();
            }
        },
        0x017a: {
            'name': 'ARM Version',
            'description': (value) => {
                return ((value[0] << 8) + value[1]).toString();
            }
        },
        0x0200: {
            'name': 'Record Version',
            'description': (value) => {
                return ((value[0] << 8) + value[1]).toString();
            }
        },
        0x0203: 'Object Type Reference',
        0x0204: 'Object Attribute Reference',
        0x0205: 'Object Name',
        0x0207: 'Edit Status',
        0x0208: {
            'name': 'Editorial Update',
            'description': (value) => {
                if (getStringValue(value) === '01') {
                    return 'Additional Language';
                }
                return 'Unknown';
            }
        },
        0x020a: 'Urgency',
        0x020c: {
            'name': 'Subject Reference',
            'repeatable': true,
            'description': (value) => {
                const parts = getStringValue(value).split(':');
                return parts[2] + (parts[3] ? '/' + parts[3] : '') + (parts[4] ? '/' + parts[4] : '');
            }
        },
        0x020f: 'Category',
        0x0214: {
            'name': 'Supplemental Category',
            'repeatable': true
        },
        0x0216: 'Fixture Identifier',
        0x0219: {
            'name': 'Keywords',
            'repeatable': true
        },
        0x021a: {
            'name': 'Content Location Code',
            'repeatable': true
        },
        0x021b: {
            'name': 'Content Location Name',
            'repeatable': true
        },
        0x021e: 'Release Date',
        0x0223: 'Release Time',
        0x0225: 'Expiration Date',
        0x0226: 'Expiration Time',
        0x0228: 'Special Instructions',
        0x022a: {
            'name': 'Action Advised',
            'description': (value) => {
                const string = getStringValue(value);
                if (string === '01') {
                    return 'Object Kill';
                } else if (string === '02') {
                    return 'Object Replace';
                } else if (string === '03') {
                    return 'Object Append';
                } else if (string === '04') {
                    return 'Object Reference';
                }
                return 'Unknown';
            }
        },
        0x022d: {
            'name': 'Reference Service',
            'repeatable': true
        },
        0x022f: {
            'name': 'Reference Date',
            'repeatable': true
        },
        0x0232: {
            'name': 'Reference Number',
            'repeatable': true
        },
        0x0237: {
            'name': 'Date Created',
            'description': getCreationDate
        },
        0x023c: {
            'name': 'Time Created',
            'description': getCreationTime
        },
        0x023e: {
            'name': 'Digital Creation Date',
            'description': getCreationDate
        },
        0x023f: {
            'name': 'Digital Creation Time',
            'description': getCreationTime
        },
        0x0241: 'Originating Program',
        0x0246: 'Program Version',
        0x024b: {
            'name': 'Object Cycle',
            'description': (value) => {
                const string = getStringValue(value);
                if (string === 'a') {
                    return 'morning';
                } else if (string === 'p') {
                    return 'evening';
                } else if (string === 'b') {
                    return 'both';
                }
                return 'Unknown';
            }
        },
        0x0250: {
            'name': 'By-line',
            'repeatable': true
        },
        0x0255: {
            'name': 'By-line Title',
            'repeatable': true
        },
        0x025a: 'City',
        0x025c: 'Sub-location',
        0x025f: 'Province/State',
        0x0264: 'Country/Primary Location Code',
        0x0265: 'Country/Primary Location Name',
        0x0267: 'Original Transmission Reference',
        0x0269: 'Headline',
        0x026e: 'Credit',
        0x0273: 'Source',
        0x0274: 'Copyright Notice',
        0x0276: {
            'name': 'Contact',
            'repeatable': true
        },
        0x0278: 'Caption/Abstract',
        0x027a: {
            'name': 'Writer/Editor',
            'repeatable': true
        },
        0x027d: {
            'name': 'Rasterized Caption',
            'description': (value) => value
        },
        0x0282: 'Image Type',
        0x0283: {
            'name': 'Image Orientation',
            'description': (value) => {
                const string = getStringValue(value);
                if (string === 'P') {
                    return 'Portrait';
                } else if (string === 'L') {
                    return 'Landscape';
                } else if (string === 'S') {
                    return 'Square';
                }
                return 'Unknown';
            }
        },
        0x0287: 'Language Identifier',
        0x0296: {
            'name': 'Audio Type',
            'description': (value) => {
                const stringValue = getStringValue(value);
                const character0 = stringValue.charAt(0);
                const character1 = stringValue.charAt(1);
                let description = '';

                if (character0 === '1') {
                    description += 'Mono';
                } else if (character0 === '2') {
                    description += 'Stereo';
                }

                if (character1 === 'A') {
                    description += ', actuality';
                } else if (character1 === 'C') {
                    description += ', question and answer session';
                } else if (character1 === 'M') {
                    description += ', music, transmitted by itself';
                } else if (character1 === 'Q') {
                    description += ', response to a question';
                } else if (character1 === 'R') {
                    description += ', raw sound';
                } else if (character1 === 'S') {
                    description += ', scener';
                } else if (character1 === 'V') {
                    description += ', voicer';
                } else if (character1 === 'W') {
                    description += ', wrap';
                }

                if (description !== '') {
                    return description;
                }
                return stringValue;
            }
        },
        0x0297: {
            'name': 'Audio Sampling Rate',
            'description': (value) => parseInt(getStringValue(value), 10) + ' Hz'
        },
        0x0298: {
            'name': 'Audio Sampling Resolution',
            'description': (value) => {
                const bits = parseInt(getStringValue(value), 10);
                return bits + (bits === 1 ? ' bit' : ' bits');
            }
        },
        0x0299: {
            'name': 'Audio Duration',
            'description': (value) => {
                const duration = getStringValue(value);
                if (duration.length >= 6) {
                    return duration.substr(0, 2) + ':' + duration.substr(2, 2) + ':' + duration.substr(4, 2);
                }
                return duration;
            }
        },
        0x029a: 'Audio Outcue',
        0x02ba: 'Short Document ID',
        0x02bb: 'Unique Document ID',
        0x02bc: 'Owner ID',
        0x02c8: {
            'name': (value) => {
                if (value.length === 2) {
                    return 'ObjectData Preview File Format';
                }
                return 'Record 2 destination';
            },
            'description': (value) => {
                if (value.length === 2) {
                    const intValue = (value[0] << 8) + value[1];
                    if (intValue === 0) {
                        return 'No ObjectData';
                    } else if (intValue === 1) {
                        return 'IPTC-NAA Digital Newsphoto Parameter Record';
                    } else if (intValue === 2) {
                        return 'IPTC7901 Recommended Message Format';
                    } else if (intValue === 3) {
                        return 'Tagged Image File Format (Adobe/Aldus Image data)';
                    } else if (intValue === 4) {
                        return 'Illustrator (Adobe Graphics data)';
                    } else if (intValue === 5) {
                        return 'AppleSingle (Apple Computer Inc)';
                    } else if (intValue === 6) {
                        return 'NAA 89-3 (ANPA 1312)';
                    } else if (intValue === 7) {
                        return 'MacBinary II';
                    } else if (intValue === 8) {
                        return 'IPTC Unstructured Character Oriented File Format (UCOFF)';
                    } else if (intValue === 9) {
                        return 'United Press International ANPA 1312 variant';
                    } else if (intValue === 10) {
                        return 'United Press International Down-Load Message';
                    } else if (intValue === 11) {
                        return 'JPEG File Interchange (JFIF)';
                    } else if (intValue === 12) {
                        return 'Photo-CD Image-Pac (Eastman Kodak)';
                    } else if (intValue === 13) {
                        return 'Microsoft Bit Mapped Graphics File [*.BMP]';
                    } else if (intValue === 14) {
                        return 'Digital Audio File [*.WAV] (Microsoft & Creative Labs)';
                    } else if (intValue === 15) {
                        return 'Audio plus Moving Video [*.AVI] (Microsoft)';
                    } else if (intValue === 16) {
                        return 'PC DOS/Windows Executable Files [*.COM][*.EXE]';
                    } else if (intValue === 17) {
                        return 'Compressed Binary File [*.ZIP] (PKWare Inc)';
                    } else if (intValue === 18) {
                        return 'Audio Interchange File Format AIFF (Apple Computer Inc)';
                    } else if (intValue === 19) {
                        return 'RIFF Wave (Microsoft Corporation)';
                    } else if (intValue === 20) {
                        return 'Freehand (Macromedia/Aldus)';
                    } else if (intValue === 21) {
                        return 'Hypertext Markup Language "HTML" (The Internet Society)';
                    } else if (intValue === 22) {
                        return 'MPEG 2 Audio Layer 2 (Musicom), ISO/IEC';
                    } else if (intValue === 23) {
                        return 'MPEG 2 Audio Layer 3, ISO/IEC';
                    } else if (intValue === 24) {
                        return 'Portable Document File (*.PDF) Adobe';
                    } else if (intValue === 25) {
                        return 'News Industry Text Format (NITF)';
                    } else if (intValue === 26) {
                        return 'Tape Archive (*.TAR)';
                    } else if (intValue === 27) {
                        return 'Tidningarnas Telegrambyrå NITF version (TTNITF DTD)';
                    } else if (intValue === 28) {
                        return 'Ritzaus Bureau NITF version (RBNITF DTD)';
                    } else if (intValue === 29) {
                        return 'Corel Draw [*.CDR]';
                    }
                    return `Unknown format ${intValue}`;
                }
                return getStringValue(value);
            }
        },
        0x02c9: {
            'name': 'ObjectData Preview File Format Version',
            'description': (value, tags) => {
                // Format ID, Version ID, Version Description
                const formatVersions = {
                    '00': {'00': '1'},
                    '01': {'01': '1', '02': '2', '03': '3', '04': '4'},
                    '02': {'04': '4'},
                    '03': {'01': '5.0', '02': '6.0'},
                    '04': {'01': '1.40'},
                    '05': {'01': '2'},
                    '06': {'01': '1'},
                    '11': {'01': '1.02'},
                    '20': {'01': '3.1', '02': '4.0', '03': '5.0', '04': '5.5'},
                    '21': {'02': '2.0'}
                };
                const stringValue = getStringValue(value);

                if (tags['ObjectData Preview File Format']) {
                    const objectDataPreviewFileFormat = getStringValue(tags['ObjectData Preview File Format'].value);
                    if (formatVersions[objectDataPreviewFileFormat]
                        && formatVersions[objectDataPreviewFileFormat][stringValue]) {
                        return formatVersions[objectDataPreviewFileFormat][stringValue];
                    }
                }

                return stringValue;
            }
        },
        0x02ca: 'ObjectData Preview Data',
        0x070a: {
            'name': 'Size Mode',
            'description': (value) => {
                return (value[0]).toString();
            }
        },
        0x0714: {
            'name': 'Max Subfile Size',
            'description': (value) => {
                let n = 0;
                for (let i = 0; i < value.length; i++) {
                    n = (n << 8) + value[i];
                }
                return n.toString();
            }
        },
        0x075a: {
            'name': 'ObjectData Size Announced',
            'description': (value) => {
                let n = 0;
                for (let i = 0; i < value.length; i++) {
                    n = (n << 8) + value[i];
                }
                return n.toString();
            }
        },
        0x075f: {
            'name': 'Maximum ObjectData Size',
            'description': (value) => {
                let n = 0;
                for (let i = 0; i < value.length; i++) {
                    n = (n << 8) + value[i];
                }
                return n.toString();
            }
        }
    }
});

function getCreationDate(value) {
    const date = getStringValue(value);

    if (date.length >= 8) {
        return date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2);
    }

    return date;
}

function getCreationTime(value) {
    const time = getStringValue(value);
    let parsedTime = time;

    if (time.length >= 6) {
        parsedTime = time.substr(0, 2) + ':' + time.substr(2, 2) + ':' + time.substr(4, 2);
        if (time.length === 11) {
            parsedTime += time.substr(6, 1) + time.substr(7, 2) + ':' + time.substr(9, 2);
        }
    }

    return parsedTime;
}

function getEncodingName(value) {
    const string = getStringValue(value);
    if (string === '\x1b%G') {
        return 'UTF-8';
    } else if (string === '\x1b%5') {
        return 'Windows-1252';
    } else if (string === '\x1b%/G') {
        return 'UTF-8 Level 1';
    } else if (string === '\x1b%/H') {
        return 'UTF-8 Level 2';
    } else if (string === '\x1b%/I') {
        return 'UTF-8 Level 3';
    } else if (string === '\x1B/A') {
        return 'ISO-8859-1';
    } else if (string === '\x1B/B') {
        return 'ISO-8859-2';
    } else if (string === '\x1B/C') {
        return 'ISO-8859-3';
    } else if (string === '\x1B/D') {
        return 'ISO-8859-4';
    } else if (string === '\x1B/@') {
        return 'ISO-8859-5';
    } else if (string === '\x1B/G') {
        return 'ISO-8859-6';
    } else if (string === '\x1B/F') {
        return 'ISO-8859-7';
    } else if (string === '\x1B/H') {
        return 'ISO-8859-8';
    }
    return 'Unknown';
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/text-decoder.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* harmony default export */ const text_decoder = ({
    get
});

function get() {
    if (typeof TextDecoder !== 'undefined') {
        return TextDecoder;
    }

    return undefined;
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/tag-decoder.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */



const TAG_HEADER_SIZE = 5;

/* harmony default export */ const tag_decoder = ({
    decode,
    TAG_HEADER_SIZE
});

function decode(encoding, tagValue) {
    const Decoder = text_decoder.get();
    if ((typeof Decoder !== 'undefined') && (encoding !== undefined)) {
        try {
            return new Decoder(encoding).decode(Uint8Array.from(tagValue));
        } catch (error) {
            // Pass through and fall back to ASCII decoding.
        }
    }

    const stringValue = tagValue.map((charCode) => String.fromCharCode(charCode)).join('');
    return tag_decoder_decodeAsciiValue(stringValue);
}

function tag_decoder_decodeAsciiValue(asciiValue) {
    try {
        return decodeURIComponent(escape(asciiValue));
    } catch (error) {
        return asciiValue;
    }
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/iptc-tags.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */




const BYTES_8BIM = 0x3842494d;
const BYTES_8BIM_SIZE = 4;
const RESOURCE_BLOCK_HEADER_SIZE = BYTES_8BIM_SIZE + 8;
const NAA_RESOURCE_BLOCK_TYPE = 0x0404;
const iptc_tags_TAG_HEADER_SIZE = 5;

/* harmony default export */ const iptc_tags = ({
    read: iptc_tags_read
});

function iptc_tags_read(dataView, dataOffset) {
    try {
        if (Array.isArray(dataView)) {
            return parseTags(new DataView(Uint8Array.from(dataView).buffer), {size: dataView.length}, 0);
        }
        const {naaBlock, dataOffset: newDataOffset} = getNaaResourceBlock(dataView, dataOffset);
        return parseTags(dataView, naaBlock, newDataOffset);
    } catch (error) {
        return {};
    }
}

function getNaaResourceBlock(dataView, dataOffset) {
    while (dataOffset + RESOURCE_BLOCK_HEADER_SIZE <= dataView.byteLength) {
        const resourceBlock = getResourceBlock(dataView, dataOffset);
        if (isNaaResourceBlock(resourceBlock)) {
            return {naaBlock: resourceBlock, dataOffset: dataOffset + RESOURCE_BLOCK_HEADER_SIZE};
        }
        dataOffset += RESOURCE_BLOCK_HEADER_SIZE + resourceBlock.size + getBlockPadding(resourceBlock);
    }
    throw new Error('No IPTC NAA resource block.');
}

function getResourceBlock(dataView, dataOffset) {
    const RESOURCE_BLOCK_SIZE_OFFSET = 10;

    if (dataView.getUint32(dataOffset, false) !== BYTES_8BIM) {
        throw new Error('Not an IPTC resource block.');
    }

    return {
        type: dataView.getUint16(dataOffset + BYTES_8BIM_SIZE),
        size: dataView.getUint16(dataOffset + RESOURCE_BLOCK_SIZE_OFFSET)
    };
}

function isNaaResourceBlock(resourceBlock) {
    return resourceBlock.type === NAA_RESOURCE_BLOCK_TYPE;
}

function getBlockPadding(resourceBlock) {
    if (resourceBlock.size % 2 !== 0) {
        return 1;
    }
    return 0;
}

function parseTags(dataView, naaBlock, dataOffset) {
    const tags = {};
    let encoding = undefined;

    const endOfBlockOffset = dataOffset + naaBlock['size'];

    while ((dataOffset < endOfBlockOffset) && (dataOffset < dataView.byteLength)) {
        const {tag, tagSize} = iptc_tags_readTag(dataView, dataOffset, tags, encoding);

        if (tag === null) {
            break;
        }

        if ('encoding' in tag) {
            encoding = tag.encoding;
        }

        if ((tags[tag.name] === undefined) || (tag['repeatable'] === undefined)) {
            tags[tag.name] = {
                id: tag.id,
                value: tag.value,
                description: tag.description
            };
        } else {
            if (!(tags[tag.name] instanceof Array)) {
                tags[tag.name] = [{
                    id: tags[tag.name].id,
                    value: tags[tag.name].value,
                    description: tags[tag.name].description
                }];
            }
            tags[tag.name].push({
                id: tag.id,
                value: tag.value,
                description: tag.description
            });
        }

        dataOffset += iptc_tags_TAG_HEADER_SIZE + tagSize;
    }

    return tags;
}

function iptc_tags_readTag(dataView, dataOffset, tags, encoding) {
    const TAG_CODE_OFFSET = 1;
    const TAG_SIZE_OFFSET = 3;

    if (leadByteIsMissing(dataView, dataOffset)) {
        return {tag: null, tagSize: 0};
    }

    const tagCode = dataView.getUint16(dataOffset + TAG_CODE_OFFSET);
    const tagSize = dataView.getUint16(dataOffset + TAG_SIZE_OFFSET);
    const tagValue = iptc_tags_getTagValue(dataView, dataOffset + iptc_tags_TAG_HEADER_SIZE, tagSize);

    const tag = {
        id: tagCode,
        name: getTagName(iptc_tag_names.iptc[tagCode], tagCode, tagValue),
        value: tagValue,
        description: getTagDescription(iptc_tag_names.iptc[tagCode], tagValue, tags, encoding)
    };
    if (tagIsRepeatable(tagCode)) {
        tag['repeatable'] = true;
    }
    if (tagContainsEncoding(tagCode)) {
        tag['encoding'] = iptc_tag_names.iptc[tagCode]['encoding_name'](tagValue);
    }

    return {tag, tagSize};
}

function leadByteIsMissing(dataView, dataOffset) {
    const TAG_LEAD_BYTE = 0x1c;
    return dataView.getUint8(dataOffset) !== TAG_LEAD_BYTE;
}

function iptc_tags_getTagValue(dataView, offset, size) {
    const value = [];

    for (let valueIndex = 0; valueIndex < size; valueIndex++) {
        value.push(dataView.getUint8(offset + valueIndex));
    }

    return value;
}

function getTagName(tag, tagCode, tagValue) {
    if (!tag) {
        return `undefined-${tagCode}`;
    }
    if (tagIsName(tag)) {
        return tag;
    }
    if (hasDynamicName(tag)) {
        return tag['name'](tagValue);
    }
    return tag['name'];
}

function tagIsName(tag) {
    return typeof tag === 'string';
}

function hasDynamicName(tag) {
    return typeof (tag['name']) === 'function';
}

function getTagDescription(tag, tagValue, tags, encoding) {
    if (hasDescriptionProperty(tag)) {
        try {
            return tag['description'](tagValue, tags);
        } catch (error) {
            // Fall through to next handler.
        }
    }
    if (tagValueIsText(tag, tagValue)) {
        return tag_decoder.decode(encoding, tagValue);
    }
    return tagValue;
}

function tagValueIsText(tag, tagValue) {
    return tag && tagValue instanceof Array;
}

function hasDescriptionProperty(tag) {
    return tag && tag['description'] !== undefined;
}

function tagIsRepeatable(tagCode) {
    return iptc_tag_names.iptc[tagCode] && iptc_tag_names.iptc[tagCode]['repeatable'];
}

function tagContainsEncoding(tagCode) {
    return iptc_tag_names.iptc[tagCode] && iptc_tag_names.iptc[tagCode]['encoding_name'] !== undefined;
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/xmp-tag-names.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* harmony default export */ const xmp_tag_names = ({
    'tiff:Orientation'(value) {
        if (value === '1') {
            return 'Horizontal (normal)';
        }
        if (value === '2') {
            return 'Mirror horizontal';
        }
        if (value === '3') {
            return 'Rotate 180';
        }
        if (value === '4') {
            return 'Mirror vertical';
        }
        if (value === '5') {
            return 'Mirror horizontal and rotate 270 CW';
        }
        if (value === '6') {
            return 'Rotate 90 CW';
        }
        if (value === '7') {
            return 'Mirror horizontal and rotate 90 CW';
        }
        if (value === '8') {
            return 'Rotate 270 CW';
        }
        return value;
    },
    'exif:GPSLatitude': calculateGPSValue,
    'exif:GPSLongitude': calculateGPSValue
});

function calculateGPSValue(value) {
    const [degreesString, minutesString] = value.split(',');
    if ((degreesString !== undefined) && (minutesString !== undefined)) {
        const degrees = parseFloat(degreesString);
        const minutes = parseFloat(minutesString);
        const ref = minutesString.charAt(minutesString.length - 1);
        if ((!Number.isNaN(degrees)) && (!Number.isNaN(minutes))) {
            return '' + (degrees + minutes / 60) + ref;
        }
    }
    return value;
}

// EXTERNAL MODULE: ./node_modules/exifreader/src/dom-parser.js
var dom_parser = __webpack_require__(9961);
;// CONCATENATED MODULE: ./node_modules/exifreader/src/xmp-tags.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */





/* harmony default export */ const xmp_tags = ({
    read: xmp_tags_read
});

function xmp_tags_read(dataView, chunks) {
    if (typeof dataView === 'string') {
        return readTags({}, dataView);
    }
    return extractCompleteChunks(dataView, chunks).reduce(readTags, {});
}

// The first chunk is always the regular XMP document. Then there is something
// called extended XMP. The extended XMP is also a single XMP document but it
// can be divided into multiple chunks that need to be combined into one.
function extractCompleteChunks(dataView, chunks) {
    if (chunks.length === 0) {
        return [];
    }

    const completeChunks = [combineChunks(dataView, chunks.slice(0, 1))];
    if (chunks.length > 1) {
        completeChunks.push(combineChunks(dataView, chunks.slice(1)));
    }

    return completeChunks;
}

function combineChunks(dataView, chunks) {
    const totalLength = chunks.reduce((size, chunk) => size + chunk.length, 0);
    const combinedChunks = new Uint8Array(totalLength);
    let offset = 0;

    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const slice = dataView.buffer.slice(chunk.dataOffset, chunk.dataOffset + chunk.length);
        combinedChunks.set(new Uint8Array(slice), offset);
        offset += chunk.length;
    }

    return new DataView(combinedChunks.buffer);
}

function readTags(tags, chunkDataView) {
    try {
        const doc = getDocument(chunkDataView);
        const rdf = getRDF(doc);

        return objectAssign(tags, parseXMPObject(convertToObject(rdf, true)));
    } catch (error) {
        return tags;
    }
}

function getDocument(chunkDataView) {
    const Parser = dom_parser/* default.get */.Z.get();
    if (!Parser) {
        console.warn('Warning: DOMParser is not available. It is needed to be able to parse XMP tags.'); // eslint-disable-line no-console
        throw new Error();
    }

    const domParser = new Parser();
    const xmlString = typeof chunkDataView === 'string' ? chunkDataView : getStringFromDataView(chunkDataView, 0, chunkDataView.byteLength);
    const doc = domParser.parseFromString(trimXmlSource(xmlString), 'application/xml');

    if (doc.documentElement.nodeName === 'parsererror') {
        throw new Error(doc.documentElement.textContent);
    }

    return doc;
}

function trimXmlSource(xmlSource) {
    return xmlSource.replace(/^.+(<\?xpacket begin)/, '$1').replace(/(<\?xpacket end=".*"\?>).+$/, '$1');
}

function getRDF(node) {
    for (let i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].tagName === 'x:xmpmeta') {
            return getRDF(node.childNodes[i]);
        }
        if (node.childNodes[i].tagName === 'rdf:RDF') {
            return node.childNodes[i];
        }
    }

    throw new Error();
}

function convertToObject(node, isTopNode = false) {
    const childNodes = getChildNodes(node);

    if (hasTextOnlyContent(childNodes)) {
        if (isTopNode) {
            return {};
        }
        return getTextValue(childNodes[0]);
    }

    return getElementsFromNodes(childNodes);
}

function getChildNodes(node) {
    const elements = [];

    for (let i = 0; i < node.childNodes.length; i++) {
        elements.push(node.childNodes[i]);
    }

    return elements;
}

function hasTextOnlyContent(nodes) {
    return (nodes.length === 1) && (nodes[0].nodeName === '#text');
}

function getTextValue(node) {
    return node.nodeValue;
}

function getElementsFromNodes(nodes) {
    const elements = {};

    nodes.forEach((node) => {
        if (isElement(node)) {
            const nodeElement = getElementFromNode(node);

            if (elements[node.nodeName] !== undefined) {
                if (!Array.isArray(elements[node.nodeName])) {
                    elements[node.nodeName] = [elements[node.nodeName]];
                }
                elements[node.nodeName].push(nodeElement);
            } else {
                elements[node.nodeName] = nodeElement;
            }
        }
    });

    return elements;
}

function isElement(node) {
    return (node.nodeName) && (node.nodeName !== '#text');
}

function getElementFromNode(node) {
    return {
        attributes: getAttributes(node),
        value: convertToObject(node)
    };
}

function getAttributes(element) {
    const attributes = {};

    for (let i = 0; i < element.attributes.length; i++) {
        attributes[element.attributes[i].nodeName] = decodeURIComponent(escape(element.attributes[i].value));
    }

    return attributes;
}

function parseXMPObject(xmpObject) {
    const tags = {};

    if (typeof xmpObject === 'string') {
        return xmpObject;
    }

    for (const nodeName in xmpObject) {
        let nodes = xmpObject[nodeName];

        if (!Array.isArray(nodes)) {
            nodes = [nodes];
        }

        nodes.forEach((node) => {
            objectAssign(tags, parseNodeAttributesAsTags(node.attributes));
            if (typeof node.value === 'object') {
                objectAssign(tags, parseNodeChildrenAsTags(node.value));
            }
        });
    }

    return tags;
}

function parseNodeAttributesAsTags(attributes) {
    const tags = {};

    for (const name in attributes) {
        if (isTagAttribute(name)) {
            tags[getLocalName(name)] = {
                value: attributes[name],
                attributes: {},
                description: getDescription(attributes[name], name)
            };
        }
    }

    return tags;
}

function isTagAttribute(name) {
    return (name !== 'rdf:parseType') && (!isNamespaceDefinition(name));
}

function isNamespaceDefinition(name) {
    return name.split(':')[0] === 'xmlns';
}

function getLocalName(name) {
    return name.split(':')[1];
}

function getDescription(value, name = undefined) {
    if (Array.isArray(value)) {
        return getDescriptionOfArray(value);
    }
    if (typeof value === 'object') {
        return getDescriptionOfObject(value);
    }

    try {
        if ((name) && (typeof xmp_tag_names[name] === 'function')) {
            return xmp_tag_names[name](value);
        }
        return decodeURIComponent(escape(value));
    } catch (error) {
        return value;
    }
}

function getDescriptionOfArray(value) {
    return value.map((item) => {
        if (item.value !== undefined) {
            return getDescription(item.value);
        }
        return getDescription(item);
    }).join(', ');
}

function getDescriptionOfObject(value) {
    const descriptions = [];

    for (const key in value) {
        descriptions.push(`${getClearTextKey(key)}: ${value[key].value}`);
    }

    return descriptions.join('; ');
}

function getClearTextKey(key) {
    if (key === 'CiAdrCity') {
        return 'CreatorCity';
    }
    if (key === 'CiAdrCtry') {
        return 'CreatorCountry';
    }
    if (key === 'CiAdrExtadr') {
        return 'CreatorAddress';
    }
    if (key === 'CiAdrPcode') {
        return 'CreatorPostalCode';
    }
    if (key === 'CiAdrRegion') {
        return 'CreatorRegion';
    }
    if (key === 'CiEmailWork') {
        return 'CreatorWorkEmail';
    }
    if (key === 'CiTelWork') {
        return 'CreatorWorkPhone';
    }
    if (key === 'CiUrlWork') {
        return 'CreatorWorkUrl';
    }
    return key;
}

function parseNodeChildrenAsTags(children) {
    const tags = {};

    for (const name in children) {
        if (!isNamespaceDefinition(name)) {
            tags[getLocalName(name)] = parseNodeAsTag(children[name], name);
        }
    }

    return tags;
}

function parseNodeAsTag(node, name) {
    if (hasNestedSimpleRdfDescription(node)) {
        return parseNodeAsSimpleRdfDescription(node, name);
    } else if (hasNestedStructureRdfDescription(node)) {
        return parseNodeAsStructureRdfDescription(node, name);
    } else if (isCompactStructure(node)) {
        return parseNodeAsCompactStructure(node, name);
    } else if (isArray(node)) {
        return parseNodeAsArray(node, name);
    }
    return parseNodeAsSimpleValue(node, name);
}

function hasNestedSimpleRdfDescription(node) {
    return ((node.attributes['rdf:parseType'] === 'Resource') && (node.value['rdf:value'] !== undefined))
        || ((node.value['rdf:Description'] !== undefined) && (node.value['rdf:Description'].value['rdf:value'] !== undefined));
}

function parseNodeAsSimpleRdfDescription(node, name) {
    const attributes = parseNodeAttributes(node);

    if (node.value['rdf:Description'] !== undefined) {
        node = node.value['rdf:Description'];
    }

    objectAssign(attributes, parseNodeAttributes(node), parseNodeChildrenAsAttributes(node));

    const value = parseRdfValue(node);

    return {
        value,
        attributes,
        description: getDescription(value, name)
    };
}

function parseNodeAttributes(node) {
    const attributes = {};

    for (const name in node.attributes) {
        if ((name !== 'rdf:parseType') && (name !== 'rdf:resource') && (!isNamespaceDefinition(name))) {
            attributes[getLocalName(name)] = node.attributes[name];
        }
    }

    return attributes;
}

function parseNodeChildrenAsAttributes(node) {
    const attributes = {};

    for (const name in node.value) {
        if ((name !== 'rdf:value') && (!isNamespaceDefinition(name))) {
            attributes[getLocalName(name)] = node.value[name].value;
        }
    }

    return attributes;
}

function parseRdfValue(node) {
    return getURIValue(node.value['rdf:value']) || node.value['rdf:value'].value;
}

function hasNestedStructureRdfDescription(node) {
    return (node.attributes['rdf:parseType'] === 'Resource')
        || ((node.value['rdf:Description'] !== undefined) && (node.value['rdf:Description'].value['rdf:value'] === undefined));
}

function parseNodeAsStructureRdfDescription(node, name) {
    const tag = {
        value: {},
        attributes: {}
    };

    if (node.value['rdf:Description'] !== undefined) {
        objectAssign(tag.value, parseNodeAttributesAsTags(node.value['rdf:Description'].attributes));
        objectAssign(tag.attributes, parseNodeAttributes(node));
        node = node.value['rdf:Description'];
    }

    objectAssign(tag.value, parseNodeChildrenAsTags(node.value));

    tag.description = getDescription(tag.value, name);

    return tag;
}

function isCompactStructure(node) {
    return (Object.keys(node.value).length === 0)
        && (node.attributes['rdf:resource'] === undefined);
}

function parseNodeAsCompactStructure(node, name) {
    const value = parseNodeAttributesAsTags(node.attributes);

    return {
        value,
        attributes: {},
        description: getDescription(value, name)
    };
}

function isArray(node) {
    return getArrayChild(node.value) !== undefined;
}

function getArrayChild(value) {
    return value['rdf:Bag'] || value['rdf:Seq'] || value['rdf:Alt'];
}

function parseNodeAsArray(node, name) {
    let items = getArrayChild(node.value).value['rdf:li'];
    const attributes = parseNodeAttributes(node);
    const value = [];

    if (items === undefined) {
        items = [];
    } else if (!Array.isArray(items)) {
        items = [items];
    }

    items.forEach((item) => {
        value.push(parseArrayValue(item));
    });

    return {
        value,
        attributes,
        description: getDescription(value, name)
    };
}

function parseArrayValue(item) {
    if (hasNestedSimpleRdfDescription(item)) {
        return parseNodeAsSimpleRdfDescription(item);
    }

    if (hasNestedArrayValue(item)) {
        return parseNodeChildrenAsTags(item.value);
    }

    return {
        value: item.value,
        attributes: parseNodeAttributes(item),
        description: getDescription(item.value)
    };
}

function hasNestedArrayValue(node) {
    return node.attributes['rdf:parseType'] === 'Resource';
}

function parseNodeAsSimpleValue(node, name) {
    const value = getURIValue(node) || parseXMPObject(node.value);

    return {
        value,
        attributes: parseNodeAttributes(node),
        description: getDescription(value, name)
    };
}

function getURIValue(node) {
    return node.attributes && node.attributes['rdf:resource'];
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/icc-tag-names.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */



const iccTags = {
    'desc': {
        'name': 'ICC Description',
    },
    'cprt': {
        'name': 'ICC Copyright',
    },
    'dmdd': {
        'name': 'ICC Device Model Description',
    },
    'vued': {
        'name': 'ICC Viewing Conditions Description',
    },
    'dmnd': {
        'name': 'ICC Device Manufacturer for Display',
    },
    'tech': {
        'name': 'Technology',
    },
};

const iccProfile = {
    4: {
        'name': 'Preferred CMM type',
        'value': (dataView, offset) => getStringFromDataView(dataView, offset, 4),
        'description': (value) => value !== null ? toCompany(value) : '',
    },
    8: {
        'name': 'Profile Version',
        'value': (dataView, offset) => {
            return (dataView.getUint8(offset)).toString(10) + '.'
            + (dataView.getUint8(offset + 1) >> 4).toString(10) + '.'
            + (dataView.getUint8(offset + 1) % 16).toString(10);
        }
    },
    12: {
        'name': 'Profile/Device class',
        'value': (dataView, offset) => getStringFromDataView(dataView, offset, 4),
        'description': (value) => {
            switch (value.toLowerCase()) {
                case 'scnr': return 'Input Device profile';
                case 'mntr': return 'Display Device profile';
                case 'prtr': return 'Output Device profile';
                case 'link': return 'DeviceLink profile';
                case 'abst': return 'Abstract profile';
                case 'spac': return 'ColorSpace profile';
                case 'nmcl': return 'NamedColor profile';
                case 'cenc': return 'ColorEncodingSpace profile';
                case 'mid ': return 'MultiplexIdentification profile';
                case 'mlnk': return 'MultiplexLink profile';
                case 'mvis': return 'MultiplexVisualization profile';
                default: return value;
            }
        }
    },
    16: {
        'name': 'Color Space',
        'value': (dataView, offset) => getStringFromDataView(dataView, offset, 4)
    },
    20: {
        'name': 'Connection Space',
        'value': (dataView, offset) => getStringFromDataView(dataView, offset, 4)
    },
    24: {
        'name': 'ICC Profile Date',
        'value': (dataView, offset) => parseDate(dataView, offset).toISOString()
    },
    36: {
        'name': 'ICC Signature',
        'value': (dataView, offset) => sliceToString(dataView.buffer.slice(offset, offset + 4))
    },
    40: {
        'name': 'Primary Platform',
        'value': (dataView, offset) => getStringFromDataView(dataView, offset, 4),
        'description': (value) => toCompany(value)
    },
    48: {
        'name': 'Device Manufacturer',
        'value': (dataView, offset) => getStringFromDataView(dataView, offset, 4),
        'description': (value) => toCompany(value)
    },
    52: {
        'name': 'Device Model Number',
        'value': (dataView, offset) => getStringFromDataView(dataView, offset, 4)
    },
    64: {
        'name': 'Rendering Intent',
        'value': (dataView, offset) => dataView.getUint32(offset),
        'description': (value) => {
            switch (value) {
                case 0: return 'Perceptual';
                case 1: return 'Relative Colorimetric';
                case 2: return 'Saturation';
                case 3: return 'Absolute Colorimetric';
                default: return value;
            }
        }
    },

    80: {
        'name': 'Profile Creator',
        'value': (dataView, offset) => getStringFromDataView(dataView, offset, 4)
    },
};

function parseDate(dataView, offset) {
    const year = dataView.getUint16(offset);
    const month = dataView.getUint16(offset + 2) - 1;
    const day = dataView.getUint16(offset + 4);
    const hours = dataView.getUint16(offset + 6);
    const minutes = dataView.getUint16(offset + 8);
    const seconds = dataView.getUint16(offset + 10);
    return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
}

function sliceToString(slice) {
    return String.fromCharCode.apply(null, new Uint8Array(slice));
}

function toCompany(value) {
    switch (value.toLowerCase()) {
        case 'appl': return 'Apple';
        case 'adbe': return 'Adobe';
        case 'msft': return 'Microsoft';
        case 'sunw': return 'Sun Microsystems';
        case 'sgi': return 'Silicon Graphics';
        case 'tgnt': return 'Taligent';
        default: return value;
    }
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/icc-tags.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */



/* harmony default export */ const icc_tags = ({
    read: icc_tags_read
});

const PROFILE_HEADER_LENGTH = 84;
const ICC_TAG_COUNT_OFFSET = 128;
const ICC_SIGNATURE = 'acsp';
const TAG_TYPE_DESC = 'desc';
const TAG_TYPE_MULTI_LOCALIZED_UNICODE_TYPE = 'mluc';
const TAG_TYPE_TEXT = 'text';
const TAG_TYPE_SIGNATURE = 'sig ';
const TAG_TABLE_SINGLE_TAG_DATA = 12;

// ICC profile data can be longer than application segment max length of ~64k.
// so it can be split into multiple APP2 segments. Each segment includes
// total chunk count and chunk number.
// Here we read all chunks into single continious array of bytes.
function icc_tags_read(dataView, iccData) {
    try {
        const totalIccProfileLength = iccData.reduce((sum, icc) => sum + icc.length, 0);

        const iccBinaryData = new Uint8Array(totalIccProfileLength);
        let offset = 0;
        const buffer = getBuffer(dataView);

        for (let chunkNumber = 1; chunkNumber <= iccData.length; chunkNumber++) {
            const iccDataChunk = iccData.find((x) => x.chunkNumber === chunkNumber);
            if (!iccDataChunk) {
                throw new Error(`ICC chunk ${chunkNumber} not found`);
            }

            const data = buffer.slice(iccDataChunk.offset, iccDataChunk.offset + iccDataChunk.length);
            const chunkData = new Uint8Array(data);

            iccBinaryData.set(chunkData, offset);
            offset += chunkData.length;
        }

        return icc_tags_parseTags(new DataView(iccBinaryData.buffer));
    } catch (error) {
        return {};
    }
}

function getBuffer(dataView) {
    if (Array.isArray(dataView)) {
        return (new DataView(Uint8Array.from(dataView).buffer)).buffer;
    }
    return dataView.buffer;
}

function iccDoesNotHaveTagCount(buffer) {
    return buffer.length < (ICC_TAG_COUNT_OFFSET + 4);
}

function hasTagsData(buffer, tagHeaderOffset) {
    return buffer.length < tagHeaderOffset + TAG_TABLE_SINGLE_TAG_DATA;
}

function icc_tags_parseTags(dataView) {
    const buffer = dataView.buffer;

    const length = dataView.getUint32();
    if (dataView.byteLength !== length) {
        throw new Error('ICC profile length not matching');
    }

    if (dataView.length < PROFILE_HEADER_LENGTH) {
        throw new Error('ICC profile too short');
    }

    const tags = {};

    const iccProfileKeys = Object.keys(iccProfile);
    for (let i = 0; i < iccProfileKeys.length; i++) {
        const offset = iccProfileKeys[i];
        const profileEntry = iccProfile[offset];
        const value = profileEntry.value(dataView, parseInt(offset, 10));
        let description = value;
        if (profileEntry.description) {
            description = profileEntry.description(value);
        }

        tags[profileEntry.name] = {
            value,
            description
        };
    }

    const signature = icc_tags_sliceToString(buffer.slice(36, 40));
    if (signature !== ICC_SIGNATURE) {
        throw new Error('ICC profile: missing signature');
    }

    /* ICC data is incomplete but we have header parsed so lets return it */
    if (iccDoesNotHaveTagCount(buffer)) {
        return tags;
    }

    const tagCount = dataView.getUint32(128);
    let tagHeaderOffset = 132;

    for (let i = 0; i < tagCount; i++) {
        if (hasTagsData(buffer, tagHeaderOffset)) {
            // Tags are corrupted (offset too far), return what we parsed until now
            return tags;
        }
        const tagSignature = getStringFromDataView(dataView, tagHeaderOffset, 4);
        const tagOffset = dataView.getUint32(tagHeaderOffset + 4);
        const tagSize = dataView.getUint32(tagHeaderOffset + 8);

        if (tagOffset > buffer.length) {
            // Tag data is invalid, lets return what we managed to parse
            return tags;
        }
        const tagType = getStringFromDataView(dataView, tagOffset, 4);

        if (tagType === TAG_TYPE_DESC) {
            const tagValueSize = dataView.getUint32(tagOffset + 8);
            if (tagValueSize > tagSize) {
                // Tag data is invalid, lets return what we managed to parse
                return tags;
            }

            const val = icc_tags_sliceToString(buffer.slice(tagOffset + 12, tagOffset + tagValueSize + 11));
            addTag(tags, tagSignature, val);
        } else if (tagType === TAG_TYPE_MULTI_LOCALIZED_UNICODE_TYPE) {
            const numRecords = dataView.getUint32(tagOffset + 8);
            const recordSize = dataView.getUint32(tagOffset + 12);
            let offset = tagOffset + 16;
            const val = [];
            for (let recordNum = 0; recordNum < numRecords; recordNum++) {
                const languageCode = getStringFromDataView(dataView, offset + 0, 2);
                const countryCode = getStringFromDataView(dataView, offset + 2, 2);
                const textLength = dataView.getUint32(offset + 4);
                const textOffset = dataView.getUint32(offset + 8);

                const text = getUnicodeStringFromDataView(dataView, tagOffset + textOffset, textLength);
                val.push({languageCode, countryCode, text});
                offset += recordSize;
            }
            if (numRecords === 1) {
                addTag(tags, tagSignature, val[0].text);
            } else {
                const valObj = {};
                for (let valIndex = 0; valIndex < val.length; valIndex++) {
                    valObj[`${val[valIndex].languageCode}-${val[valIndex].countryCode}`] = val[valIndex].text;
                }
                addTag(tags, tagSignature, valObj);
            }
        } else if (tagType === TAG_TYPE_TEXT) {
            const val = icc_tags_sliceToString(buffer.slice(tagOffset + 8, tagOffset + tagSize - 7));
            addTag(tags, tagSignature, val);
        } else if (tagType === TAG_TYPE_SIGNATURE) {
            const val = icc_tags_sliceToString(buffer.slice(tagOffset + 8, tagOffset + 12));
            addTag(tags, tagSignature, val);
        }
        tagHeaderOffset = tagHeaderOffset + 12;
    }

    return tags;
}

function icc_tags_sliceToString(slice) {
    return String.fromCharCode.apply(null, new Uint8Array(slice));
}

function addTag(tags, tagSignature, value) {
    if (iccTags[tagSignature]) {
        tags[iccTags[tagSignature].name] = {value, description: value};
    } else {
        tags[tagSignature] = {value, description: value};
    }
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/png-file-tags.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */



/* harmony default export */ const png_file_tags = ({
    read: png_file_tags_read
});

function png_file_tags_read(dataView, fileDataOffset) {
    return {
        'Image Width': png_file_tags_getImageWidth(dataView, fileDataOffset),
        'Image Height': png_file_tags_getImageHeight(dataView, fileDataOffset),
        'Bit Depth': getBitDepth(dataView, fileDataOffset),
        'Color Type': getColorType(dataView, fileDataOffset),
        'Compression': getCompression(dataView, fileDataOffset),
        'Filter': getFilter(dataView, fileDataOffset),
        'Interlace': getInterlace(dataView, fileDataOffset)
    };
}

function png_file_tags_getImageWidth(dataView, fileDataOffset) {
    const OFFSET = 0;
    const SIZE = 4;

    if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
        return undefined;
    }

    const value = types.getLongAt(dataView, fileDataOffset);
    return {
        value,
        description: `${value}px`
    };
}

function png_file_tags_getImageHeight(dataView, fileDataOffset) {
    const OFFSET = 4;
    const SIZE = 4;

    if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
        return undefined;
    }

    const value = types.getLongAt(dataView, fileDataOffset + OFFSET);
    return {
        value,
        description: `${value}px`
    };
}

function getBitDepth(dataView, fileDataOffset) {
    const OFFSET = 8;
    const SIZE = 1;

    if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
        return undefined;
    }

    const value = types.getByteAt(dataView, fileDataOffset + OFFSET);
    return {
        value,
        description: `${value}`
    };
}

function getColorType(dataView, fileDataOffset) {
    const OFFSET = 9;
    const SIZE = 1;
    const COLOR_TYPES = {
        0: 'Grayscale',
        2: 'RGB',
        3: 'Palette',
        4: 'Grayscale with Alpha',
        6: 'RGB with Alpha'
    };

    if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
        return undefined;
    }

    const value = types.getByteAt(dataView, fileDataOffset + OFFSET);
    return {
        value,
        description: COLOR_TYPES[value] || 'Unknown'
    };
}

function getCompression(dataView, fileDataOffset) {
    const OFFSET = 10;
    const SIZE = 1;

    if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
        return undefined;
    }

    const value = types.getByteAt(dataView, fileDataOffset + OFFSET);
    return {
        value,
        description: value === 0 ? 'Deflate/Inflate' : 'Unknown'
    };
}

function getFilter(dataView, fileDataOffset) {
    const OFFSET = 11;
    const SIZE = 1;

    if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
        return undefined;
    }

    const value = types.getByteAt(dataView, fileDataOffset + OFFSET);
    return {
        value,
        description: value === 0 ? 'Adaptive' : 'Unknown'
    };
}

function getInterlace(dataView, fileDataOffset) {
    const OFFSET = 12;
    const SIZE = 1;
    const INTERLACE_TYPES = {
        0: 'Noninterlaced',
        1: 'Adam7 Interlace'
    };

    if (fileDataOffset + OFFSET + SIZE > dataView.byteLength) {
        return undefined;
    }

    const value = types.getByteAt(dataView, fileDataOffset + OFFSET);
    return {
        value,
        description: INTERLACE_TYPES[value] || 'Unknown'
    };
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/thumbnail.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */



// https://exiftool.org/TagNames/EXIF.html#Compression
const COMPRESSION_JPEG = [6, 7, 99];

/* harmony default export */ const src_thumbnail = ({
    get: thumbnail_get,
});

function thumbnail_get(dataView, thumbnailTags, tiffHeaderOffset) {
    if (hasJpegThumbnail(thumbnailTags)) {
        thumbnailTags.type = 'image/jpeg';
        const offset = tiffHeaderOffset + thumbnailTags.JPEGInterchangeFormat.value;
        thumbnailTags.image = dataView.buffer.slice(offset, offset + thumbnailTags.JPEGInterchangeFormatLength.value);
        deferInit(thumbnailTags, 'base64', function () {
            return getBase64Image(this.image);
        });
    }

    // There is a small possibility of thumbnails in TIFF format but they are
    // not stored as a self-contained image file and would be much more
    // difficult to extract.
    // https://exiftool.org/forum/index.php?topic=3273.msg14778#msg14778

    return thumbnailTags;
}

function hasJpegThumbnail(tags) {
    return tags && ((tags.Compression === undefined) || (COMPRESSION_JPEG.includes(tags.Compression.value)))
        && tags.JPEGInterchangeFormat && tags.JPEGInterchangeFormat.value
        && tags.JPEGInterchangeFormatLength && tags.JPEGInterchangeFormatLength.value;
}

function getBase64Image(image) {
    if (typeof btoa !== 'undefined') {
        // IE11- does not implement reduce on the Uint8Array prototype.
        return btoa(Array.prototype.reduce.call(new Uint8Array(image), (data, byte) => data + String.fromCharCode(byte), ''));
    }
    if (typeof Buffer === 'undefined') {
        return undefined;
    }
    if (typeof Buffer.from !== undefined) { // eslint-disable-line no-undef
        return Buffer.from(image).toString('base64'); // eslint-disable-line no-undef
    }
    return (new Buffer(image)).toString('base64'); // eslint-disable-line no-undef
}

;// CONCATENATED MODULE: ./node_modules/exifreader/src/errors.js
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Thrown when no Exif metadata was found for the given image.
 *
 * @param {string} message The error message.
 */
function MetadataMissingError(message) {
    this.name = 'MetadataMissingError';
    this.message = message || 'No Exif data';
    this.stack = (new Error()).stack;
}

MetadataMissingError.prototype = new Error;

/* harmony default export */ const errors = ({
    MetadataMissingError,
});

;// CONCATENATED MODULE: ./node_modules/exifreader/src/exif-reader.js
/**
 * ExifReader
 * http://github.com/mattiasw/exifreader
 * Copyright (C) 2011-2020  Mattias Wallander <mattias@wallander.eu>
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
















/* harmony default export */ const exif_reader = ({
    load,
    loadView,
    errors: errors,
});

const exif_reader_errors = errors;

function load(data, options = {expanded: false}) {
    if (isNodeBuffer(data)) {
        // File data read in Node can share the underlying buffer with other
        // data. Therefore it's safest to get a new one to avoid weird bugs.
        data = (new Uint8Array(data)).buffer;
    }
    return loadView(getDataView(data), options);
}

function isNodeBuffer(data) {
    try {
        return Buffer.isBuffer(data); // eslint-disable-line no-undef
    } catch (error) {
        return false;
    }
}

function getDataView(data) {
    try {
        return new DataView(data);
    } catch (error) {
        return new dataview_DataView(data);
    }
}

function loadView(dataView, options = {expanded: false}) {
    let foundMetaData = false;
    let tags = {};

    const {fileDataOffset, tiffHeaderOffset, iptcDataOffset, xmpChunks, iccChunks, pngHeaderOffset} = image_header.parseAppMarkers(dataView);

    if (constants.USE_JPEG && constants.USE_FILE && hasFileData(fileDataOffset)) {
        foundMetaData = true;
        const readTags = file_tags.read(dataView, fileDataOffset);
        if (options.expanded) {
            tags.file = readTags;
        } else {
            tags = objectAssign({}, tags, readTags);
        }
    }

    if (constants.USE_EXIF && hasExifData(tiffHeaderOffset)) {
        foundMetaData = true;
        const readTags = src_tags.read(dataView, tiffHeaderOffset);
        if (readTags.Thumbnail) {
            tags.Thumbnail = readTags.Thumbnail;
            delete readTags.Thumbnail;
        }

        if (options.expanded) {
            tags.exif = readTags;
            addGpsGroup(tags);
        } else {
            tags = objectAssign({}, tags, readTags);
        }

        if (constants.USE_TIFF && constants.USE_IPTC && readTags['IPTC-NAA'] && !hasIptcData(iptcDataOffset)) {
            const readIptcTags = iptc_tags.read(readTags['IPTC-NAA'].value, 0);
            if (options.expanded) {
                tags.iptc = readIptcTags;
            } else {
                tags = objectAssign({}, tags, readIptcTags);
            }
        }

        if (constants.USE_TIFF && constants.USE_XMP && readTags['ApplicationNotes'] && !hasXmpData(xmpChunks)) {
            const readXmpTags = xmp_tags.read(getStringValueFromArray(readTags['ApplicationNotes'].value));
            if (options.expanded) {
                tags.xmp = readXmpTags;
            } else {
                tags = objectAssign({}, tags, readXmpTags);
            }
        }

        if (constants.USE_TIFF && constants.USE_ICC && readTags['ICC_Profile'] && !hasIccData(iccChunks)) {
            const readIccTags = icc_tags.read(
                readTags['ICC_Profile'].value,
                [{
                    offset: 0,
                    length: readTags['ICC_Profile'].value.length,
                    chunkNumber: 1,
                    chunksTotal: 1
                }]
            );
            if (options.expanded) {
                tags.icc = readIccTags;
            } else {
                tags = objectAssign({}, tags, readIccTags);
            }
        }
    }

    if (constants.USE_JPEG && constants.USE_IPTC && hasIptcData(iptcDataOffset)) {
        foundMetaData = true;
        const readTags = iptc_tags.read(dataView, iptcDataOffset);
        if (options.expanded) {
            tags.iptc = readTags;
        } else {
            tags = objectAssign({}, tags, readTags);
        }
    }

    if (constants.USE_XMP && hasXmpData(xmpChunks)) {
        foundMetaData = true;
        const readTags = xmp_tags.read(dataView, xmpChunks);
        if (options.expanded) {
            tags.xmp = readTags;
        } else {
            tags = objectAssign({}, tags, readTags);
        }
    }

    if ((constants.USE_JPEG || constants.USE_WEBP) && constants.USE_ICC && hasIccData(iccChunks)) {
        foundMetaData = true;
        const readTags = icc_tags.read(dataView, iccChunks);
        if (options.expanded) {
            tags.icc = readTags;
        } else {
            tags = objectAssign({}, tags, readTags);
        }
    }

    if (constants.USE_PNG && constants.USE_PNG_FILE && hasPngFileData(pngHeaderOffset)) {
        foundMetaData = true;
        const readTags = png_file_tags.read(dataView, pngHeaderOffset);
        if (options.expanded) {
            tags.pngFile = readTags;
        } else {
            tags = objectAssign({}, tags, readTags);
        }
    }

    const thumbnail = (constants.USE_JPEG || constants.USE_WEBP)
        && constants.USE_EXIF
        && constants.USE_THUMBNAIL
        && src_thumbnail.get(dataView, tags.Thumbnail, tiffHeaderOffset);
    if (thumbnail) {
        foundMetaData = true;
        tags.Thumbnail = thumbnail;
    } else {
        delete tags.Thumbnail;
    }

    if (!foundMetaData) {
        throw new errors.MetadataMissingError();
    }

    return tags;
}

function hasFileData(fileDataOffset) {
    return fileDataOffset !== undefined;
}

function hasExifData(tiffHeaderOffset) {
    return tiffHeaderOffset !== undefined;
}

function addGpsGroup(tags) {
    if (tags.exif) {
        if (tags.exif.GPSLatitude && tags.exif.GPSLatitudeRef) {
            tags.gps = tags.gps || {};
            tags.gps.Latitude = getCalculatedGpsValue(tags.exif.GPSLatitude.value);
            if (tags.exif.GPSLatitudeRef.value.join('') === 'S') {
                tags.gps.Latitude = -tags.gps.Latitude;
            }
        }

        if (tags.exif.GPSLongitude && tags.exif.GPSLongitudeRef) {
            tags.gps = tags.gps || {};
            tags.gps.Longitude = getCalculatedGpsValue(tags.exif.GPSLongitude.value);
            if (tags.exif.GPSLongitudeRef.value.join('') === 'W') {
                tags.gps.Longitude = -tags.gps.Longitude;
            }
        }

        if (tags.exif.GPSAltitude && tags.exif.GPSAltitudeRef) {
            tags.gps = tags.gps || {};
            tags.gps.Altitude = tags.exif.GPSAltitude.value[0] / tags.exif.GPSAltitude.value[1];
            if (tags.exif.GPSAltitudeRef.value === 1) {
                tags.gps.Altitude = -tags.gps.Altitude;
            }
        }
    }
}

function hasIptcData(iptcDataOffset) {
    return iptcDataOffset !== undefined;
}

function hasXmpData(xmpChunks) {
    return Array.isArray(xmpChunks) && xmpChunks.length > 0;
}

function hasIccData(iccDataOffsets) {
    return Array.isArray(iccDataOffsets) && iccDataOffsets.length > 0;
}

function hasPngFileData(pngFileDataOffset) {
    return pngFileDataOffset !== undefined;
}


/***/ }),

/***/ 8679:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reactIs = __webpack_require__(9864);

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ 7510:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 5177:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 8969:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 2703:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(414);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 5697:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(2703)();
}


/***/ }),

/***/ 414:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 7295:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Collapse = void 0;

var _react = _interopRequireDefault(__webpack_require__(3804));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Collapse = /*#__PURE__*/function (_React$Component) {
  _inherits(Collapse, _React$Component);

  var _super = _createSuper(Collapse);

  function Collapse(props) {
    var _this;

    _classCallCheck(this, Collapse);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "timeout", undefined);

    _defineProperty(_assertThisInitialized(_this), "container", undefined);

    _defineProperty(_assertThisInitialized(_this), "content", undefined);

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
      __webpack_require__.g.clearTimeout(_this.timeout);

      if (!_this.container || !_this.content) {
        return;
      }

      var _this$props = _this.props,
          isOpened = _this$props.isOpened,
          checkTimeout = _this$props.checkTimeout;
      var containerHeight = _this.container.clientHeight;
      var contentHeight = _this.content.clientHeight;
      var isFullyOpened = isOpened && contentHeight === containerHeight;
      var isFullyClosed = !isOpened && containerHeight === 0;

      if (isFullyOpened || isFullyClosed) {
        _this.onRest({
          isFullyOpened: isFullyOpened,
          isFullyClosed: isFullyClosed,
          isOpened: isOpened,
          containerHeight: containerHeight,
          contentHeight: contentHeight
        });
      } else {
        _this.onWork({
          isFullyOpened: isFullyOpened,
          isFullyClosed: isFullyClosed,
          isOpened: isOpened,
          containerHeight: containerHeight,
          contentHeight: contentHeight
        });

        _this.timeout = setTimeout(function () {
          return _this.onResize();
        }, checkTimeout);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRest", function (_ref) {
      var isFullyOpened = _ref.isFullyOpened,
          isFullyClosed = _ref.isFullyClosed,
          isOpened = _ref.isOpened,
          containerHeight = _ref.containerHeight,
          contentHeight = _ref.contentHeight;

      if (!_this.container || !_this.content) {
        return;
      }

      var hasOpened = isOpened && _this.container.style.height === "".concat(contentHeight, "px");
      var hasClosed = !isOpened && _this.container.style.height === '0px';

      if (hasOpened || hasClosed) {
        _this.container.style.overflow = isOpened ? 'initial' : 'hidden';
        _this.container.style.height = isOpened ? 'auto' : '0px';
        var onRest = _this.props.onRest;

        if (onRest) {
          onRest({
            isFullyOpened: isFullyOpened,
            isFullyClosed: isFullyClosed,
            isOpened: isOpened,
            containerHeight: containerHeight,
            contentHeight: contentHeight
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onWork", function (_ref2) {
      var isFullyOpened = _ref2.isFullyOpened,
          isFullyClosed = _ref2.isFullyClosed,
          isOpened = _ref2.isOpened,
          containerHeight = _ref2.containerHeight,
          contentHeight = _ref2.contentHeight;

      if (!_this.container || !_this.content) {
        return;
      }

      var isOpenining = isOpened && _this.container.style.height === "".concat(contentHeight, "px");
      var isClosing = !isOpened && _this.container.style.height === '0px';

      if (isOpenining || isClosing) {
        // No need to do any work
        return;
      }

      _this.container.style.overflow = 'hidden';
      _this.container.style.height = isOpened ? "".concat(contentHeight, "px") : '0px';
      var onWork = _this.props.onWork;

      if (onWork) {
        onWork({
          isFullyOpened: isFullyOpened,
          isFullyClosed: isFullyClosed,
          isOpened: isOpened,
          containerHeight: containerHeight,
          contentHeight: contentHeight
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRefContainer", function (container) {
      _this.container = container;
    });

    _defineProperty(_assertThisInitialized(_this), "onRefContent", function (content) {
      _this.content = content;
    });

    if (props.initialStyle) {
      _this.initialStyle = props.initialStyle;
    } else {
      _this.initialStyle = props.isOpened ? {
        height: 'auto',
        overflow: 'initial'
      } : {
        height: '0px',
        overflow: 'hidden'
      };
    }

    return _this;
  }

  _createClass(Collapse, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.onResize();
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          isOpened = _this$props2.isOpened,
          children = _this$props2.children;
      return children !== nextProps.children || isOpened !== nextProps.isOpened || Object.keys(theme).some(function (c) {
        return theme[c] !== nextProps.theme[c];
      });
    }
  }, {
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate() {
      if (!this.container || !this.content) {
        return null;
      }

      if (this.container.style.height === 'auto') {
        var contentHeight = this.content.clientHeight;
        this.container.style.height = "".concat(contentHeight, "px");
      }

      return null;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.onResize();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      __webpack_require__.g.clearTimeout(this.timeout);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          theme = _this$props3.theme,
          children = _this$props3.children,
          isOpened = _this$props3.isOpened;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.onRefContainer,
        className: theme.collapse,
        style: this.initialStyle,
        "aria-hidden": !isOpened
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.onRefContent,
        className: theme.content
      }, children));
    }
  }]);

  return Collapse;
}(_react["default"].Component);

exports.Collapse = Collapse;

_defineProperty(Collapse, "defaultProps", {
  theme: {
    collapse: 'ReactCollapse--collapse',
    content: 'ReactCollapse--content'
  },
  initialStyle: undefined,
  onRest: undefined,
  onWork: undefined,
  checkTimeout: 50
});

/***/ }),

/***/ 7619:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.UnmountClosed = void 0;

var _react = _interopRequireDefault(__webpack_require__(3804));

var _Collapse = __webpack_require__(7295);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UnmountClosed = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(UnmountClosed, _React$PureComponent);

  var _super = _createSuper(UnmountClosed);

  function UnmountClosed(props) {
    var _this;

    _classCallCheck(this, UnmountClosed);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onWork", function (_ref) {
      var isOpened = _ref.isOpened,
          rest = _objectWithoutProperties(_ref, ["isOpened"]);

      _this.setState({
        isResting: false,
        isOpened: isOpened
      });

      var onWork = _this.props.onWork;

      if (onWork) {
        onWork(_objectSpread({
          isOpened: isOpened
        }, rest));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRest", function (_ref2) {
      var isOpened = _ref2.isOpened,
          rest = _objectWithoutProperties(_ref2, ["isOpened"]);

      _this.setState({
        isResting: true,
        isOpened: isOpened,
        isInitialRender: false
      });

      var onRest = _this.props.onRest;

      if (onRest) {
        onRest(_objectSpread({
          isOpened: isOpened
        }, rest));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getInitialStyle", function () {
      var _this$state = _this.state,
          isOpened = _this$state.isOpened,
          isInitialRender = _this$state.isInitialRender;

      if (isInitialRender) {
        return isOpened ? {
          height: 'auto',
          overflow: 'initial'
        } : {
          height: '0px',
          overflow: 'hidden'
        };
      }

      return {
        height: '0px',
        overflow: 'hidden'
      };
    });

    _this.state = {
      isResting: true,
      isOpened: props.isOpened,
      isInitialRender: true
    };
    return _this;
  }

  _createClass(UnmountClosed, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var isOpened = this.props.isOpened;

      if (prevProps.isOpened !== isOpened) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          isResting: false,
          isOpened: isOpened,
          isInitialRender: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          isResting = _this$state2.isResting,
          isOpened = _this$state2.isOpened;
      return isResting && !isOpened ? null : /*#__PURE__*/_react["default"].createElement(_Collapse.Collapse, _extends({}, this.props, {
        initialStyle: this.getInitialStyle(),
        onWork: this.onWork,
        onRest: this.onRest
      }));
    }
  }]);

  return UnmountClosed;
}(_react["default"].PureComponent);

exports.UnmountClosed = UnmountClosed;

_defineProperty(UnmountClosed, "defaultProps", {
  onWork: undefined,
  onRest: undefined
});

/***/ }),

/***/ 6180:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _require = __webpack_require__(7295),
    Collapse = _require.Collapse;

var _require2 = __webpack_require__(7619),
    UnmountClosed = _require2.UnmountClosed; // Default export


module.exports = UnmountClosed; // Extra "named exports"

UnmountClosed.Collapse = Collapse;
UnmountClosed.UnmountClosed = UnmountClosed;

/***/ }),

/***/ 1914:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
__webpack_unused_export__ = getDisplayName;
function getDisplayName(Component) {
  return Component.displayName || Component.name || (typeof Component === 'string' && Component.length > 0 ? Component : 'Unknown');
}

/***/ }),

/***/ 9921:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;


/***/ }),

/***/ 9864:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(9921);
} else {}


/***/ }),

/***/ 3532:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "JssContext": () => /* binding */ JssContext,
  "JssProvider": () => /* binding */ JssProvider,
  "SheetsRegistry": () => /* reexport */ SheetsRegistry,
  "ThemeProvider": () => /* reexport */ ThemeProvider,
  "createGenerateId": () => /* reexport */ createGenerateId,
  "createJsx": () => /* binding */ react_jss_esm_create,
  "createTheming": () => /* reexport */ createTheming,
  "createUseStyles": () => /* binding */ createUseStyles,
  "default": () => /* binding */ react_jss_esm,
  "jss": () => /* binding */ react_jss_esm_jss,
  "jsx": () => /* binding */ createElement,
  "styled": () => /* binding */ configureStyled,
  "useTheme": () => /* reexport */ useTheme,
  "withStyles": () => /* binding */ createWithStyles,
  "withTheme": () => /* reexport */ withTheme
});

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(3804);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);
// EXTERNAL MODULE: ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__(8679);
var hoist_non_react_statics_cjs_default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics_cjs);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/react-display-name/lib/getDisplayName.js
var getDisplayName = __webpack_require__(1914);
;// CONCATENATED MODULE: ./node_modules/theming/dist/theming.esm.js






function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function theming_esm_extends() {
  theming_esm_extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return theming_esm_extends.apply(this, arguments);
}

function theming_esm_inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
}

function createThemeProvider(context) {
  var ThemeProvider =
  /*#__PURE__*/
  function (_React$Component) {
    theming_esm_inheritsLoose(ThemeProvider, _React$Component);

    function ThemeProvider() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cachedTheme", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "lastOuterTheme", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "lastTheme", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderProvider", function (outerTheme) {
        var children = _this.props.children;
        return external_React_default().createElement(context.Provider, {
          value: _this.getTheme(outerTheme)
        }, children);
      });

      return _this;
    }

    var _proto = ThemeProvider.prototype;

    // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation
    _proto.getTheme = function getTheme(outerTheme) {
      if (this.props.theme !== this.lastTheme || outerTheme !== this.lastOuterTheme || !this.cachedTheme) {
        this.lastOuterTheme = outerTheme;
        this.lastTheme = this.props.theme;

        if (typeof this.lastTheme === 'function') {
          var theme = this.props.theme;
          this.cachedTheme = theme(outerTheme);
           false ? 0 : void 0;
        } else {
          var _theme = this.props.theme;
           false ? 0 : void 0;
          this.cachedTheme = outerTheme ? theming_esm_extends({}, outerTheme, _theme) : _theme;
        }
      }

      return this.cachedTheme;
    };

    _proto.render = function render() {
      var children = this.props.children;

      if (!children) {
        return null;
      }

      return external_React_default().createElement(context.Consumer, null, this.renderProvider);
    };

    return ThemeProvider;
  }((external_React_default()).Component);

  if (false) {}

  return ThemeProvider;
}

function createWithTheme(context) {
  return function hoc(Component) {
    var withTheme = external_React_default().forwardRef(function (props, ref) {
      return external_React_default().createElement(context.Consumer, null, function (theme) {
         false ? 0 : void 0;
        return external_React_default().createElement(Component, theming_esm_extends({
          theme: theme,
          ref: ref
        }, props));
      });
    });

    if (false) {}

    hoist_non_react_statics_cjs_default()(withTheme, Component);
    return withTheme;
  };
}

function createUseTheme(context) {
  var useTheme = function useTheme() {
    var theme = external_React_default().useContext(context);
     false ? 0 : void 0;
    return theme;
  };

  return useTheme;
}

function createTheming(context) {
  return {
    context: context,
    withTheme: createWithTheme(context),
    useTheme: createUseTheme(context),
    ThemeProvider: createThemeProvider(context)
  };
}

var ThemeContext = (0,external_React_.createContext)();

var _createTheming = createTheming(ThemeContext),
    withTheme = _createTheming.withTheme,
    ThemeProvider = _createTheming.ThemeProvider,
    useTheme = _createTheming.useTheme;



;// CONCATENATED MODULE: ./node_modules/is-in-browser/dist/module.js
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' && document.nodeType === 9;

/* harmony default export */ const dist_module = (isBrowser);

;// CONCATENATED MODULE: ./node_modules/tiny-warning/dist/tiny-warning.esm.js
var isProduction = "production" === 'production';
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }

    var text = "Warning: " + message;

    if (typeof console !== 'undefined') {
      console.warn(text);
    }

    try {
      throw Error(text);
    } catch (x) {}
  }
}

/* harmony default export */ const tiny_warning_esm = (warning);

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function assertThisInitialized_assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
;// CONCATENATED MODULE: ./node_modules/jss/dist/jss.esm.js








var plainObjectConstrurctor = {}.constructor;
function cloneStyle(style) {
  if (style == null || typeof style !== 'object') return style;
  if (Array.isArray(style)) return style.map(cloneStyle);
  if (style.constructor !== plainObjectConstrurctor) return style;
  var newStyle = {};

  for (var name in style) {
    newStyle[name] = cloneStyle(style[name]);
  }

  return newStyle;
}

/**
 * Create a rule instance.
 */

function createRule(name, decl, options) {
  if (name === void 0) {
    name = 'unnamed';
  }

  var jss = options.jss;
  var declCopy = cloneStyle(decl);
  var rule = jss.plugins.onCreateRule(name, declCopy, options);
  if (rule) return rule; // It is an at-rule and it has no instance.

  if (name[0] === '@') {
     false ? 0 : void 0;
  }

  return null;
}

var join = function join(value, by) {
  var result = '';

  for (var i = 0; i < value.length; i++) {
    // Remove !important from the value, it will be readded later.
    if (value[i] === '!important') break;
    if (result) result += by;
    result += value[i];
  }

  return result;
};

/**
 * Converts array values to string.
 *
 * `margin: [['5px', '10px']]` > `margin: 5px 10px;`
 * `border: ['1px', '2px']` > `border: 1px, 2px;`
 * `margin: [['5px', '10px'], '!important']` > `margin: 5px 10px !important;`
 * `color: ['red', !important]` > `color: red !important;`
 */
var toCssValue = function toCssValue(value, ignoreImportant) {
  if (ignoreImportant === void 0) {
    ignoreImportant = false;
  }

  if (!Array.isArray(value)) return value;
  var cssValue = ''; // Support space separated values via `[['5px', '10px']]`.

  if (Array.isArray(value[0])) {
    for (var i = 0; i < value.length; i++) {
      if (value[i] === '!important') break;
      if (cssValue) cssValue += ', ';
      cssValue += join(value[i], ' ');
    }
  } else cssValue = join(value, ', '); // Add !important, because it was ignored.


  if (!ignoreImportant && value[value.length - 1] === '!important') {
    cssValue += ' !important';
  }

  return cssValue;
};

/**
 * Indent a string.
 * http://jsperf.com/array-join-vs-for
 */
function indentStr(str, indent) {
  var result = '';

  for (var index = 0; index < indent; index++) {
    result += '  ';
  }

  return result + str;
}
/**
 * Converts a Rule to CSS string.
 */


function toCss(selector, style, options) {
  if (options === void 0) {
    options = {};
  }

  var result = '';
  if (!style) return result;
  var _options = options,
      _options$indent = _options.indent,
      indent = _options$indent === void 0 ? 0 : _options$indent;
  var fallbacks = style.fallbacks;
  if (selector) indent++; // Apply fallbacks first.

  if (fallbacks) {
    // Array syntax {fallbacks: [{prop: value}]}
    if (Array.isArray(fallbacks)) {
      for (var index = 0; index < fallbacks.length; index++) {
        var fallback = fallbacks[index];

        for (var prop in fallback) {
          var value = fallback[prop];

          if (value != null) {
            if (result) result += '\n';
            result += "" + indentStr(prop + ": " + toCssValue(value) + ";", indent);
          }
        }
      }
    } else {
      // Object syntax {fallbacks: {prop: value}}
      for (var _prop in fallbacks) {
        var _value = fallbacks[_prop];

        if (_value != null) {
          if (result) result += '\n';
          result += "" + indentStr(_prop + ": " + toCssValue(_value) + ";", indent);
        }
      }
    }
  }

  for (var _prop2 in style) {
    var _value2 = style[_prop2];

    if (_value2 != null && _prop2 !== 'fallbacks') {
      if (result) result += '\n';
      result += "" + indentStr(_prop2 + ": " + toCssValue(_value2) + ";", indent);
    }
  } // Allow empty style in this case, because properties will be added dynamically.


  if (!result && !options.allowEmpty) return result; // When rule is being stringified before selector was defined.

  if (!selector) return result;
  indent--;
  if (result) result = "\n" + result + "\n";
  return indentStr(selector + " {" + result, indent) + indentStr('}', indent);
}

var escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
var nativeEscape = typeof CSS !== 'undefined' && CSS.escape;
var jss_esm_escape = (function (str) {
  return nativeEscape ? nativeEscape(str) : str.replace(escapeRegex, '\\$1');
});

var BaseStyleRule =
/*#__PURE__*/
function () {
  function BaseStyleRule(key, style, options) {
    this.type = 'style';
    this.key = void 0;
    this.isProcessed = false;
    this.style = void 0;
    this.renderer = void 0;
    this.renderable = void 0;
    this.options = void 0;
    var sheet = options.sheet,
        Renderer = options.Renderer;
    this.key = key;
    this.options = options;
    this.style = style;
    if (sheet) this.renderer = sheet.renderer;else if (Renderer) this.renderer = new Renderer();
  }
  /**
   * Get or set a style property.
   */


  var _proto = BaseStyleRule.prototype;

  _proto.prop = function prop(name, value, options) {
    // It's a getter.
    if (value === undefined) return this.style[name]; // Don't do anything if the value has not changed.

    var force = options ? options.force : false;
    if (!force && this.style[name] === value) return this;
    var newValue = value;

    if (!options || options.process !== false) {
      newValue = this.options.jss.plugins.onChangeValue(value, name, this);
    }

    var isEmpty = newValue == null || newValue === false;
    var isDefined = name in this.style; // Value is empty and wasn't defined before.

    if (isEmpty && !isDefined && !force) return this; // We are going to remove this value.

    var remove = isEmpty && isDefined;
    if (remove) delete this.style[name];else this.style[name] = newValue; // Renderable is defined if StyleSheet option `link` is true.

    if (this.renderable && this.renderer) {
      if (remove) this.renderer.removeProperty(this.renderable, name);else this.renderer.setProperty(this.renderable, name, newValue);
      return this;
    }

    var sheet = this.options.sheet;

    if (sheet && sheet.attached) {
       false ? 0 : void 0;
    }

    return this;
  };

  return BaseStyleRule;
}();
var StyleRule =
/*#__PURE__*/
function (_BaseStyleRule) {
  _inheritsLoose(StyleRule, _BaseStyleRule);

  function StyleRule(key, style, options) {
    var _this;

    _this = _BaseStyleRule.call(this, key, style, options) || this;
    _this.selectorText = void 0;
    _this.id = void 0;
    _this.renderable = void 0;
    var selector = options.selector,
        scoped = options.scoped,
        sheet = options.sheet,
        generateId = options.generateId;

    if (selector) {
      _this.selectorText = selector;
    } else if (scoped !== false) {
      _this.id = generateId(assertThisInitialized_assertThisInitialized(assertThisInitialized_assertThisInitialized(_this)), sheet);
      _this.selectorText = "." + jss_esm_escape(_this.id);
    }

    return _this;
  }
  /**
   * Set selector string.
   * Attention: use this with caution. Most browsers didn't implement
   * selectorText setter, so this may result in rerendering of entire Style Sheet.
   */


  var _proto2 = StyleRule.prototype;

  /**
   * Apply rule to an element inline.
   */
  _proto2.applyTo = function applyTo(renderable) {
    var renderer = this.renderer;

    if (renderer) {
      var json = this.toJSON();

      for (var prop in json) {
        renderer.setProperty(renderable, prop, json[prop]);
      }
    }

    return this;
  }
  /**
   * Returns JSON representation of the rule.
   * Fallbacks are not supported.
   * Useful for inline styles.
   */
  ;

  _proto2.toJSON = function toJSON() {
    var json = {};

    for (var prop in this.style) {
      var value = this.style[prop];
      if (typeof value !== 'object') json[prop] = value;else if (Array.isArray(value)) json[prop] = toCssValue(value);
    }

    return json;
  }
  /**
   * Generates a CSS string.
   */
  ;

  _proto2.toString = function toString(options) {
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;
    var opts = link ? _extends({}, options, {
      allowEmpty: true
    }) : options;
    return toCss(this.selectorText, this.style, opts);
  };

  _createClass(StyleRule, [{
    key: "selector",
    set: function set(selector) {
      if (selector === this.selectorText) return;
      this.selectorText = selector;
      var renderer = this.renderer,
          renderable = this.renderable;
      if (!renderable || !renderer) return;
      var hasChanged = renderer.setSelector(renderable, selector); // If selector setter is not implemented, rerender the rule.

      if (!hasChanged) {
        renderer.replaceRule(renderable, this);
      }
    }
    /**
     * Get selector string.
     */
    ,
    get: function get() {
      return this.selectorText;
    }
  }]);

  return StyleRule;
}(BaseStyleRule);
var pluginStyleRule = {
  onCreateRule: function onCreateRule(name, style, options) {
    if (name[0] === '@' || options.parent && options.parent.type === 'keyframes') {
      return null;
    }

    return new StyleRule(name, style, options);
  }
};

var defaultToStringOptions = {
  indent: 1,
  children: true
};
var atRegExp = /@([\w-]+)/;
/**
 * Conditional rule for @media, @supports
 */

var ConditionalRule =
/*#__PURE__*/
function () {
  function ConditionalRule(key, styles, options) {
    this.type = 'conditional';
    this.at = void 0;
    this.key = void 0;
    this.query = void 0;
    this.rules = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key;
    var atMatch = key.match(atRegExp);
    this.at = atMatch ? atMatch[1] : 'unknown'; // Key might contain a unique suffix in case the `name` passed by user was duplicate.

    this.query = options.name || "@" + this.at;
    this.options = options;
    this.rules = new RuleList(_extends({}, options, {
      parent: this
    }));

    for (var name in styles) {
      this.rules.add(name, styles[name]);
    }

    this.rules.process();
  }
  /**
   * Get a rule.
   */


  var _proto = ConditionalRule.prototype;

  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  }
  /**
   * Get index of a rule.
   */
  ;

  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  }
  /**
   * Create and register rule, run plugins.
   */
  ;

  _proto.addRule = function addRule(name, style, options) {
    var rule = this.rules.add(name, style, options);
    if (!rule) return null;
    this.options.jss.plugins.onProcessRule(rule);
    return rule;
  }
  /**
   * Generates a CSS string.
   */
  ;

  _proto.toString = function toString(options) {
    if (options === void 0) {
      options = defaultToStringOptions;
    }

    if (options.indent == null) options.indent = defaultToStringOptions.indent;
    if (options.children == null) options.children = defaultToStringOptions.children;

    if (options.children === false) {
      return this.query + " {}";
    }

    var children = this.rules.toString(options);
    return children ? this.query + " {\n" + children + "\n}" : '';
  };

  return ConditionalRule;
}();
var keyRegExp = /@media|@supports\s+/;
var pluginConditionalRule = {
  onCreateRule: function onCreateRule(key, styles, options) {
    return keyRegExp.test(key) ? new ConditionalRule(key, styles, options) : null;
  }
};

var defaultToStringOptions$1 = {
  indent: 1,
  children: true
};
var nameRegExp = /@keyframes\s+([\w-]+)/;
/**
 * Rule for @keyframes
 */

var KeyframesRule =
/*#__PURE__*/
function () {
  function KeyframesRule(key, frames, options) {
    this.type = 'keyframes';
    this.at = '@keyframes';
    this.key = void 0;
    this.name = void 0;
    this.id = void 0;
    this.rules = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    var nameMatch = key.match(nameRegExp);

    if (nameMatch && nameMatch[1]) {
      this.name = nameMatch[1];
    } else {
      this.name = 'noname';
       false ? 0 : void 0;
    }

    this.key = this.type + "-" + this.name;
    this.options = options;
    var scoped = options.scoped,
        sheet = options.sheet,
        generateId = options.generateId;
    this.id = scoped === false ? this.name : jss_esm_escape(generateId(this, sheet));
    this.rules = new RuleList(_extends({}, options, {
      parent: this
    }));

    for (var name in frames) {
      this.rules.add(name, frames[name], _extends({}, options, {
        parent: this
      }));
    }

    this.rules.process();
  }
  /**
   * Generates a CSS string.
   */


  var _proto = KeyframesRule.prototype;

  _proto.toString = function toString(options) {
    if (options === void 0) {
      options = defaultToStringOptions$1;
    }

    if (options.indent == null) options.indent = defaultToStringOptions$1.indent;
    if (options.children == null) options.children = defaultToStringOptions$1.children;

    if (options.children === false) {
      return this.at + " " + this.id + " {}";
    }

    var children = this.rules.toString(options);
    if (children) children = "\n" + children + "\n";
    return this.at + " " + this.id + " {" + children + "}";
  };

  return KeyframesRule;
}();
var keyRegExp$1 = /@keyframes\s+/;
var refRegExp = /\$([\w-]+)/g;

var findReferencedKeyframe = function findReferencedKeyframe(val, keyframes) {
  if (typeof val === 'string') {
    return val.replace(refRegExp, function (match, name) {
      if (name in keyframes) {
        return keyframes[name];
      }

       false ? 0 : void 0;
      return match;
    });
  }

  return val;
};
/**
 * Replace the reference for a animation name.
 */


var replaceRef = function replaceRef(style, prop, keyframes) {
  var value = style[prop];
  var refKeyframe = findReferencedKeyframe(value, keyframes);

  if (refKeyframe !== value) {
    style[prop] = refKeyframe;
  }
};

var jss_esm_plugin = {
  onCreateRule: function onCreateRule(key, frames, options) {
    return typeof key === 'string' && keyRegExp$1.test(key) ? new KeyframesRule(key, frames, options) : null;
  },
  // Animation name ref replacer.
  onProcessStyle: function onProcessStyle(style, rule, sheet) {
    if (rule.type !== 'style' || !sheet) return style;
    if ('animation-name' in style) replaceRef(style, 'animation-name', sheet.keyframes);
    if ('animation' in style) replaceRef(style, 'animation', sheet.keyframes);
    return style;
  },
  onChangeValue: function onChangeValue(val, prop, rule) {
    var sheet = rule.options.sheet;

    if (!sheet) {
      return val;
    }

    switch (prop) {
      case 'animation':
        return findReferencedKeyframe(val, sheet.keyframes);

      case 'animation-name':
        return findReferencedKeyframe(val, sheet.keyframes);

      default:
        return val;
    }
  }
};

var KeyframeRule =
/*#__PURE__*/
function (_BaseStyleRule) {
  _inheritsLoose(KeyframeRule, _BaseStyleRule);

  function KeyframeRule() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _BaseStyleRule.call.apply(_BaseStyleRule, [this].concat(args)) || this;
    _this.renderable = void 0;
    return _this;
  }

  var _proto = KeyframeRule.prototype;

  /**
   * Generates a CSS string.
   */
  _proto.toString = function toString(options) {
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;
    var opts = link ? _extends({}, options, {
      allowEmpty: true
    }) : options;
    return toCss(this.key, this.style, opts);
  };

  return KeyframeRule;
}(BaseStyleRule);
var pluginKeyframeRule = {
  onCreateRule: function onCreateRule(key, style, options) {
    if (options.parent && options.parent.type === 'keyframes') {
      return new KeyframeRule(key, style, options);
    }

    return null;
  }
};

var FontFaceRule =
/*#__PURE__*/
function () {
  function FontFaceRule(key, style, options) {
    this.type = 'font-face';
    this.at = '@font-face';
    this.key = void 0;
    this.style = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key;
    this.style = style;
    this.options = options;
  }
  /**
   * Generates a CSS string.
   */


  var _proto = FontFaceRule.prototype;

  _proto.toString = function toString(options) {
    if (Array.isArray(this.style)) {
      var str = '';

      for (var index = 0; index < this.style.length; index++) {
        str += toCss(this.at, this.style[index]);
        if (this.style[index + 1]) str += '\n';
      }

      return str;
    }

    return toCss(this.at, this.style, options);
  };

  return FontFaceRule;
}();
var keyRegExp$2 = /@font-face/;
var pluginFontFaceRule = {
  onCreateRule: function onCreateRule(key, style, options) {
    return keyRegExp$2.test(key) ? new FontFaceRule(key, style, options) : null;
  }
};

var ViewportRule =
/*#__PURE__*/
function () {
  function ViewportRule(key, style, options) {
    this.type = 'viewport';
    this.at = '@viewport';
    this.key = void 0;
    this.style = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key;
    this.style = style;
    this.options = options;
  }
  /**
   * Generates a CSS string.
   */


  var _proto = ViewportRule.prototype;

  _proto.toString = function toString(options) {
    return toCss(this.key, this.style, options);
  };

  return ViewportRule;
}();
var pluginViewportRule = {
  onCreateRule: function onCreateRule(key, style, options) {
    return key === '@viewport' || key === '@-ms-viewport' ? new ViewportRule(key, style, options) : null;
  }
};

var SimpleRule =
/*#__PURE__*/
function () {
  function SimpleRule(key, value, options) {
    this.type = 'simple';
    this.key = void 0;
    this.value = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key;
    this.value = value;
    this.options = options;
  }
  /**
   * Generates a CSS string.
   */
  // eslint-disable-next-line no-unused-vars


  var _proto = SimpleRule.prototype;

  _proto.toString = function toString(options) {
    if (Array.isArray(this.value)) {
      var str = '';

      for (var index = 0; index < this.value.length; index++) {
        str += this.key + " " + this.value[index] + ";";
        if (this.value[index + 1]) str += '\n';
      }

      return str;
    }

    return this.key + " " + this.value + ";";
  };

  return SimpleRule;
}();
var keysMap = {
  '@charset': true,
  '@import': true,
  '@namespace': true
};
var pluginSimpleRule = {
  onCreateRule: function onCreateRule(key, value, options) {
    return key in keysMap ? new SimpleRule(key, value, options) : null;
  }
};

var plugins = [pluginStyleRule, pluginConditionalRule, jss_esm_plugin, pluginKeyframeRule, pluginFontFaceRule, pluginViewportRule, pluginSimpleRule];

var defaultUpdateOptions = {
  process: true
};
var forceUpdateOptions = {
  force: true,
  process: true
  /**
   * Contains rules objects and allows adding/removing etc.
   * Is used for e.g. by `StyleSheet` or `ConditionalRule`.
   */

};

var RuleList =
/*#__PURE__*/
function () {
  // Rules registry for access by .get() method.
  // It contains the same rule registered by name and by selector.
  // Original styles object.
  // Used to ensure correct rules order.
  function RuleList(options) {
    this.map = {};
    this.raw = {};
    this.index = [];
    this.counter = 0;
    this.options = void 0;
    this.classes = void 0;
    this.keyframes = void 0;
    this.options = options;
    this.classes = options.classes;
    this.keyframes = options.keyframes;
  }
  /**
   * Create and register rule.
   *
   * Will not render after Style Sheet was rendered the first time.
   */


  var _proto = RuleList.prototype;

  _proto.add = function add(name, decl, ruleOptions) {
    var _this$options = this.options,
        parent = _this$options.parent,
        sheet = _this$options.sheet,
        jss = _this$options.jss,
        Renderer = _this$options.Renderer,
        generateId = _this$options.generateId,
        scoped = _this$options.scoped;

    var options = _extends({
      classes: this.classes,
      parent: parent,
      sheet: sheet,
      jss: jss,
      Renderer: Renderer,
      generateId: generateId,
      scoped: scoped,
      name: name,
      keyframes: this.keyframes,
      selector: undefined
    }, ruleOptions); // When user uses .createStyleSheet(), duplicate names are not possible, but
    // `sheet.addRule()` opens the door for any duplicate rule name. When this happens
    // we need to make the key unique within this RuleList instance scope.


    var key = name;

    if (name in this.raw) {
      key = name + "-d" + this.counter++;
    } // We need to save the original decl before creating the rule
    // because cache plugin needs to use it as a key to return a cached rule.


    this.raw[key] = decl;

    if (key in this.classes) {
      // E.g. rules inside of @media container
      options.selector = "." + jss_esm_escape(this.classes[key]);
    }

    var rule = createRule(key, decl, options);
    if (!rule) return null;
    this.register(rule);
    var index = options.index === undefined ? this.index.length : options.index;
    this.index.splice(index, 0, rule);
    return rule;
  }
  /**
   * Get a rule.
   */
  ;

  _proto.get = function get(name) {
    return this.map[name];
  }
  /**
   * Delete a rule.
   */
  ;

  _proto.remove = function remove(rule) {
    this.unregister(rule);
    delete this.raw[rule.key];
    this.index.splice(this.index.indexOf(rule), 1);
  }
  /**
   * Get index of a rule.
   */
  ;

  _proto.indexOf = function indexOf(rule) {
    return this.index.indexOf(rule);
  }
  /**
   * Run `onProcessRule()` plugins on every rule.
   */
  ;

  _proto.process = function process() {
    var plugins = this.options.jss.plugins; // We need to clone array because if we modify the index somewhere else during a loop
    // we end up with very hard-to-track-down side effects.

    this.index.slice(0).forEach(plugins.onProcessRule, plugins);
  }
  /**
   * Register a rule in `.map`, `.classes` and `.keyframes` maps.
   */
  ;

  _proto.register = function register(rule) {
    this.map[rule.key] = rule;

    if (rule instanceof StyleRule) {
      this.map[rule.selector] = rule;
      if (rule.id) this.classes[rule.key] = rule.id;
    } else if (rule instanceof KeyframesRule && this.keyframes) {
      this.keyframes[rule.name] = rule.id;
    }
  }
  /**
   * Unregister a rule.
   */
  ;

  _proto.unregister = function unregister(rule) {
    delete this.map[rule.key];

    if (rule instanceof StyleRule) {
      delete this.map[rule.selector];
      delete this.classes[rule.key];
    } else if (rule instanceof KeyframesRule) {
      delete this.keyframes[rule.name];
    }
  }
  /**
   * Update the function values with a new data.
   */
  ;

  _proto.update = function update() {
    var name;
    var data;
    var options;

    if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string') {
      name = arguments.length <= 0 ? undefined : arguments[0]; // $FlowFixMe[invalid-tuple-index]

      data = arguments.length <= 1 ? undefined : arguments[1]; // $FlowFixMe[invalid-tuple-index]

      options = arguments.length <= 2 ? undefined : arguments[2];
    } else {
      data = arguments.length <= 0 ? undefined : arguments[0]; // $FlowFixMe[invalid-tuple-index]

      options = arguments.length <= 1 ? undefined : arguments[1];
      name = null;
    }

    if (name) {
      this.updateOne(this.map[name], data, options);
    } else {
      for (var index = 0; index < this.index.length; index++) {
        this.updateOne(this.index[index], data, options);
      }
    }
  }
  /**
   * Execute plugins, update rule props.
   */
  ;

  _proto.updateOne = function updateOne(rule, data, options) {
    if (options === void 0) {
      options = defaultUpdateOptions;
    }

    var _this$options2 = this.options,
        plugins = _this$options2.jss.plugins,
        sheet = _this$options2.sheet; // It is a rules container like for e.g. ConditionalRule.

    if (rule.rules instanceof RuleList) {
      rule.rules.update(data, options);
      return;
    }

    var styleRule = rule;
    var style = styleRule.style;
    plugins.onUpdate(data, rule, sheet, options); // We rely on a new `style` ref in case it was mutated during onUpdate hook.

    if (options.process && style && style !== styleRule.style) {
      // We need to run the plugins in case new `style` relies on syntax plugins.
      plugins.onProcessStyle(styleRule.style, styleRule, sheet); // Update and add props.

      for (var prop in styleRule.style) {
        var nextValue = styleRule.style[prop];
        var prevValue = style[prop]; // We need to use `force: true` because `rule.style` has been updated during onUpdate hook, so `rule.prop()` will not update the CSSOM rule.
        // We do this comparison to avoid unneeded `rule.prop()` calls, since we have the old `style` object here.

        if (nextValue !== prevValue) {
          styleRule.prop(prop, nextValue, forceUpdateOptions);
        }
      } // Remove props.


      for (var _prop in style) {
        var _nextValue = styleRule.style[_prop];
        var _prevValue = style[_prop]; // We need to use `force: true` because `rule.style` has been updated during onUpdate hook, so `rule.prop()` will not update the CSSOM rule.
        // We do this comparison to avoid unneeded `rule.prop()` calls, since we have the old `style` object here.

        if (_nextValue == null && _nextValue !== _prevValue) {
          styleRule.prop(_prop, null, forceUpdateOptions);
        }
      }
    }
  }
  /**
   * Convert rules to a CSS string.
   */
  ;

  _proto.toString = function toString(options) {
    var str = '';
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;

    for (var index = 0; index < this.index.length; index++) {
      var rule = this.index[index];
      var css = rule.toString(options); // No need to render an empty rule.

      if (!css && !link) continue;
      if (str) str += '\n';
      str += css;
    }

    return str;
  };

  return RuleList;
}();

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(styles, options) {
    this.options = void 0;
    this.deployed = void 0;
    this.attached = void 0;
    this.rules = void 0;
    this.renderer = void 0;
    this.classes = void 0;
    this.keyframes = void 0;
    this.queue = void 0;
    this.attached = false;
    this.deployed = false;
    this.classes = {};
    this.keyframes = {};
    this.options = _extends({}, options, {
      sheet: this,
      parent: this,
      classes: this.classes,
      keyframes: this.keyframes
    });

    if (options.Renderer) {
      this.renderer = new options.Renderer(this);
    }

    this.rules = new RuleList(this.options);

    for (var name in styles) {
      this.rules.add(name, styles[name]);
    }

    this.rules.process();
  }
  /**
   * Attach renderable to the render tree.
   */


  var _proto = StyleSheet.prototype;

  _proto.attach = function attach() {
    if (this.attached) return this;
    if (this.renderer) this.renderer.attach();
    this.attached = true; // Order is important, because we can't use insertRule API if style element is not attached.

    if (!this.deployed) this.deploy();
    return this;
  }
  /**
   * Remove renderable from render tree.
   */
  ;

  _proto.detach = function detach() {
    if (!this.attached) return this;
    if (this.renderer) this.renderer.detach();
    this.attached = false;
    return this;
  }
  /**
   * Add a rule to the current stylesheet.
   * Will insert a rule also after the stylesheet has been rendered first time.
   */
  ;

  _proto.addRule = function addRule(name, decl, options) {
    var queue = this.queue; // Plugins can create rules.
    // In order to preserve the right order, we need to queue all `.addRule` calls,
    // which happen after the first `rules.add()` call.

    if (this.attached && !queue) this.queue = [];
    var rule = this.rules.add(name, decl, options);
    if (!rule) return null;
    this.options.jss.plugins.onProcessRule(rule);

    if (this.attached) {
      if (!this.deployed) return rule; // Don't insert rule directly if there is no stringified version yet.
      // It will be inserted all together when .attach is called.

      if (queue) queue.push(rule);else {
        this.insertRule(rule);

        if (this.queue) {
          this.queue.forEach(this.insertRule, this);
          this.queue = undefined;
        }
      }
      return rule;
    } // We can't add rules to a detached style node.
    // We will redeploy the sheet once user will attach it.


    this.deployed = false;
    return rule;
  }
  /**
   * Insert rule into the StyleSheet
   */
  ;

  _proto.insertRule = function insertRule(rule) {
    if (this.renderer) {
      this.renderer.insertRule(rule);
    }
  }
  /**
   * Create and add rules.
   * Will render also after Style Sheet was rendered the first time.
   */
  ;

  _proto.addRules = function addRules(styles, options) {
    var added = [];

    for (var name in styles) {
      var rule = this.addRule(name, styles[name], options);
      if (rule) added.push(rule);
    }

    return added;
  }
  /**
   * Get a rule by name.
   */
  ;

  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  }
  /**
   * Delete a rule by name.
   * Returns `true`: if rule has been deleted from the DOM.
   */
  ;

  _proto.deleteRule = function deleteRule(name) {
    var rule = typeof name === 'object' ? name : this.rules.get(name);

    if (!rule || // Style sheet was created without link: true and attached, in this case we
    // won't be able to remove the CSS rule from the DOM.
    this.attached && !rule.renderable) {
      return false;
    }

    this.rules.remove(rule);

    if (this.attached && rule.renderable && this.renderer) {
      return this.renderer.deleteRule(rule.renderable);
    }

    return true;
  }
  /**
   * Get index of a rule.
   */
  ;

  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  }
  /**
   * Deploy pure CSS string to a renderable.
   */
  ;

  _proto.deploy = function deploy() {
    if (this.renderer) this.renderer.deploy();
    this.deployed = true;
    return this;
  }
  /**
   * Update the function values with a new data.
   */
  ;

  _proto.update = function update() {
    var _this$rules;

    (_this$rules = this.rules).update.apply(_this$rules, arguments);

    return this;
  }
  /**
   * Updates a single rule.
   */
  ;

  _proto.updateOne = function updateOne(rule, data, options) {
    this.rules.updateOne(rule, data, options);
    return this;
  }
  /**
   * Convert rules to a CSS string.
   */
  ;

  _proto.toString = function toString(options) {
    return this.rules.toString(options);
  };

  return StyleSheet;
}();

var PluginsRegistry =
/*#__PURE__*/
function () {
  function PluginsRegistry() {
    this.plugins = {
      internal: [],
      external: []
    };
    this.registry = void 0;
  }

  var _proto = PluginsRegistry.prototype;

  /**
   * Call `onCreateRule` hooks and return an object if returned by a hook.
   */
  _proto.onCreateRule = function onCreateRule(name, decl, options) {
    for (var i = 0; i < this.registry.onCreateRule.length; i++) {
      var rule = this.registry.onCreateRule[i](name, decl, options);
      if (rule) return rule;
    }

    return null;
  }
  /**
   * Call `onProcessRule` hooks.
   */
  ;

  _proto.onProcessRule = function onProcessRule(rule) {
    if (rule.isProcessed) return;
    var sheet = rule.options.sheet;

    for (var i = 0; i < this.registry.onProcessRule.length; i++) {
      this.registry.onProcessRule[i](rule, sheet);
    }

    if (rule.style) this.onProcessStyle(rule.style, rule, sheet);
    rule.isProcessed = true;
  }
  /**
   * Call `onProcessStyle` hooks.
   */
  ;

  _proto.onProcessStyle = function onProcessStyle(style, rule, sheet) {
    for (var i = 0; i < this.registry.onProcessStyle.length; i++) {
      // $FlowFixMe[prop-missing]
      rule.style = this.registry.onProcessStyle[i](rule.style, rule, sheet);
    }
  }
  /**
   * Call `onProcessSheet` hooks.
   */
  ;

  _proto.onProcessSheet = function onProcessSheet(sheet) {
    for (var i = 0; i < this.registry.onProcessSheet.length; i++) {
      this.registry.onProcessSheet[i](sheet);
    }
  }
  /**
   * Call `onUpdate` hooks.
   */
  ;

  _proto.onUpdate = function onUpdate(data, rule, sheet, options) {
    for (var i = 0; i < this.registry.onUpdate.length; i++) {
      this.registry.onUpdate[i](data, rule, sheet, options);
    }
  }
  /**
   * Call `onChangeValue` hooks.
   */
  ;

  _proto.onChangeValue = function onChangeValue(value, prop, rule) {
    var processedValue = value;

    for (var i = 0; i < this.registry.onChangeValue.length; i++) {
      processedValue = this.registry.onChangeValue[i](processedValue, prop, rule);
    }

    return processedValue;
  }
  /**
   * Register a plugin.
   */
  ;

  _proto.use = function use(newPlugin, options) {
    if (options === void 0) {
      options = {
        queue: 'external'
      };
    }

    var plugins = this.plugins[options.queue]; // Avoids applying same plugin twice, at least based on ref.

    if (plugins.indexOf(newPlugin) !== -1) {
      return;
    }

    plugins.push(newPlugin);
    this.registry = [].concat(this.plugins.external, this.plugins.internal).reduce(function (registry, plugin) {
      for (var name in plugin) {
        if (name in registry) {
          registry[name].push(plugin[name]);
        } else {
           false ? 0 : void 0;
        }
      }

      return registry;
    }, {
      onCreateRule: [],
      onProcessRule: [],
      onProcessStyle: [],
      onProcessSheet: [],
      onChangeValue: [],
      onUpdate: []
    });
  };

  return PluginsRegistry;
}();

/**
 * Sheets registry to access them all at one place.
 */
var SheetsRegistry =
/*#__PURE__*/
function () {
  function SheetsRegistry() {
    this.registry = [];
  }

  var _proto = SheetsRegistry.prototype;

  /**
   * Register a Style Sheet.
   */
  _proto.add = function add(sheet) {
    var registry = this.registry;
    var index = sheet.options.index;
    if (registry.indexOf(sheet) !== -1) return;

    if (registry.length === 0 || index >= this.index) {
      registry.push(sheet);
      return;
    } // Find a position.


    for (var i = 0; i < registry.length; i++) {
      if (registry[i].options.index > index) {
        registry.splice(i, 0, sheet);
        return;
      }
    }
  }
  /**
   * Reset the registry.
   */
  ;

  _proto.reset = function reset() {
    this.registry = [];
  }
  /**
   * Remove a Style Sheet.
   */
  ;

  _proto.remove = function remove(sheet) {
    var index = this.registry.indexOf(sheet);
    this.registry.splice(index, 1);
  }
  /**
   * Convert all attached sheets to a CSS string.
   */
  ;

  _proto.toString = function toString(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        attached = _ref.attached,
        options = _objectWithoutPropertiesLoose(_ref, ["attached"]);

    var css = '';

    for (var i = 0; i < this.registry.length; i++) {
      var sheet = this.registry[i];

      if (attached != null && sheet.attached !== attached) {
        continue;
      }

      if (css) css += '\n';
      css += sheet.toString(options);
    }

    return css;
  };

  _createClass(SheetsRegistry, [{
    key: "index",

    /**
     * Current highest index number.
     */
    get: function get() {
      return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
    }
  }]);

  return SheetsRegistry;
}();

/**
 * This is a global sheets registry. Only DomRenderer will add sheets to it.
 * On the server one should use an own SheetsRegistry instance and add the
 * sheets to it, because you need to make sure to create a new registry for
 * each request in order to not leak sheets across requests.
 */

var registry = new SheetsRegistry();

/* eslint-disable */
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var globalThis = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();

var ns = '2f1acc6c3a606b082e5eef5e54414ffb';
if (globalThis[ns] == null) globalThis[ns] = 0; // Bundle may contain multiple JSS versions at the same time. In order to identify
// the current version with just one short number and use it for classes generation
// we use a counter. Also it is more accurate, because user can manually reevaluate
// the module.

var moduleId = globalThis[ns]++;

var maxRules = 1e10;

/**
 * Returns a function which generates unique class names based on counters.
 * When new generator function is created, rule counter is reseted.
 * We need to reset the rule counter for SSR for each request.
 */
var createGenerateId = function createGenerateId(options) {
  if (options === void 0) {
    options = {};
  }

  var ruleCounter = 0;
  return function (rule, sheet) {
    ruleCounter += 1;

    if (ruleCounter > maxRules) {
       false ? 0 : void 0;
    }

    var jssId = '';
    var prefix = '';

    if (sheet) {
      if (sheet.options.classNamePrefix) {
        prefix = sheet.options.classNamePrefix;
      }

      if (sheet.options.jss.id != null) {
        jssId = String(sheet.options.jss.id);
      }
    }

    if (options.minify) {
      // Using "c" because a number can't be the first char in a class name.
      return "" + (prefix || 'c') + moduleId + jssId + ruleCounter;
    }

    return prefix + rule.key + "-" + moduleId + (jssId ? "-" + jssId : '') + "-" + ruleCounter;
  };
};

/**
 * Cache the value from the first time a function is called.
 */
var memoize = function memoize(fn) {
  var value;
  return function () {
    if (!value) value = fn();
    return value;
  };
};

/**
 * Get a style property value.
 */
var getPropertyValue = function getPropertyValue(cssRule, prop) {
  try {
    // Support CSSTOM.
    if (cssRule.attributeStyleMap) {
      return cssRule.attributeStyleMap.get(prop);
    }

    return cssRule.style.getPropertyValue(prop);
  } catch (err) {
    // IE may throw if property is unknown.
    return '';
  }
};

/**
 * Set a style property.
 */
var setProperty = function setProperty(cssRule, prop, value) {
  try {
    var cssValue = value;

    if (Array.isArray(value)) {
      cssValue = toCssValue(value, true);

      if (value[value.length - 1] === '!important') {
        cssRule.style.setProperty(prop, cssValue, 'important');
        return true;
      }
    } // Support CSSTOM.


    if (cssRule.attributeStyleMap) {
      cssRule.attributeStyleMap.set(prop, cssValue);
    } else {
      cssRule.style.setProperty(prop, cssValue);
    }
  } catch (err) {
    // IE may throw if property is unknown.
    return false;
  }

  return true;
};

/**
 * Remove a style property.
 */
var removeProperty = function removeProperty(cssRule, prop) {
  try {
    // Support CSSTOM.
    if (cssRule.attributeStyleMap) {
      cssRule.attributeStyleMap.delete(prop);
    } else {
      cssRule.style.removeProperty(prop);
    }
  } catch (err) {
     false ? 0 : void 0;
  }
};

/**
 * Set the selector.
 */
var setSelector = function setSelector(cssRule, selectorText) {
  cssRule.selectorText = selectorText; // Return false if setter was not successful.
  // Currently works in chrome only.

  return cssRule.selectorText === selectorText;
};
/**
 * Gets the `head` element upon the first call and caches it.
 * We assume it can't be null.
 */


var getHead = memoize(function () {
  return document.querySelector('head');
});
/**
 * Find attached sheet with an index higher than the passed one.
 */

function findHigherSheet(registry, options) {
  for (var i = 0; i < registry.length; i++) {
    var sheet = registry[i];

    if (sheet.attached && sheet.options.index > options.index && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }

  return null;
}
/**
 * Find attached sheet with the highest index.
 */


function findHighestSheet(registry, options) {
  for (var i = registry.length - 1; i >= 0; i--) {
    var sheet = registry[i];

    if (sheet.attached && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }

  return null;
}
/**
 * Find a comment with "jss" inside.
 */


function findCommentNode(text) {
  var head = getHead();

  for (var i = 0; i < head.childNodes.length; i++) {
    var node = head.childNodes[i];

    if (node.nodeType === 8 && node.nodeValue.trim() === text) {
      return node;
    }
  }

  return null;
}

/**
 * Find a node before which we can insert the sheet.
 */
function findPrevNode(options) {
  var registry$1 = registry.registry;

  if (registry$1.length > 0) {
    // Try to insert before the next higher sheet.
    var sheet = findHigherSheet(registry$1, options);

    if (sheet && sheet.renderer) {
      return {
        parent: sheet.renderer.element.parentNode,
        node: sheet.renderer.element
      };
    } // Otherwise insert after the last attached.


    sheet = findHighestSheet(registry$1, options);

    if (sheet && sheet.renderer) {
      return {
        parent: sheet.renderer.element.parentNode,
        node: sheet.renderer.element.nextSibling
      };
    }
  } // Try to find a comment placeholder if registry is empty.


  var insertionPoint = options.insertionPoint;

  if (insertionPoint && typeof insertionPoint === 'string') {
    var comment = findCommentNode(insertionPoint);

    if (comment) {
      return {
        parent: comment.parentNode,
        node: comment.nextSibling
      };
    } // If user specifies an insertion point and it can't be found in the document -
    // bad specificity issues may appear.


     false ? 0 : void 0;
  }

  return false;
}
/**
 * Insert style element into the DOM.
 */


function insertStyle(style, options) {
  var insertionPoint = options.insertionPoint;
  var nextNode = findPrevNode(options);

  if (nextNode !== false && nextNode.parent) {
    nextNode.parent.insertBefore(style, nextNode.node);
    return;
  } // Works with iframes and any node types.


  if (insertionPoint && typeof insertionPoint.nodeType === 'number') {
    // https://stackoverflow.com/questions/41328728/force-casting-in-flow
    var insertionPointElement = insertionPoint;
    var parentNode = insertionPointElement.parentNode;
    if (parentNode) parentNode.insertBefore(style, insertionPointElement.nextSibling);else  false ? 0 : void 0;
    return;
  }

  getHead().appendChild(style);
}
/**
 * Read jss nonce setting from the page if the user has set it.
 */


var getNonce = memoize(function () {
  var node = document.querySelector('meta[property="csp-nonce"]');
  return node ? node.getAttribute('content') : null;
});

var _insertRule = function insertRule(container, rule, index) {
  try {
    if ('insertRule' in container) {
      var c = container;
      c.insertRule(rule, index);
    } // Keyframes rule.
    else if ('appendRule' in container) {
        var _c = container;

        _c.appendRule(rule);
      }
  } catch (err) {
     false ? 0 : void 0;
    return false;
  }

  return container.cssRules[index];
};

var getValidRuleInsertionIndex = function getValidRuleInsertionIndex(container, index) {
  var maxIndex = container.cssRules.length; // In case previous insertion fails, passed index might be wrong

  if (index === undefined || index > maxIndex) {
    // eslint-disable-next-line no-param-reassign
    return maxIndex;
  }

  return index;
};

var createStyle = function createStyle() {
  var el = document.createElement('style'); // Without it, IE will have a broken source order specificity if we
  // insert rules after we insert the style tag.
  // It seems to kick-off the source order specificity algorithm.

  el.textContent = '\n';
  return el;
};

var DomRenderer =
/*#__PURE__*/
function () {
  // HTMLStyleElement needs fixing https://github.com/facebook/flow/issues/2696
  // Will be empty if link: true option is not set, because
  // it is only for use together with insertRule API.
  function DomRenderer(sheet) {
    this.getPropertyValue = getPropertyValue;
    this.setProperty = setProperty;
    this.removeProperty = removeProperty;
    this.setSelector = setSelector;
    this.element = void 0;
    this.sheet = void 0;
    this.hasInsertedRules = false;
    this.cssRules = [];
    // There is no sheet when the renderer is used from a standalone StyleRule.
    if (sheet) registry.add(sheet);
    this.sheet = sheet;

    var _ref = this.sheet ? this.sheet.options : {},
        media = _ref.media,
        meta = _ref.meta,
        element = _ref.element;

    this.element = element || createStyle();
    this.element.setAttribute('data-jss', '');
    if (media) this.element.setAttribute('media', media);
    if (meta) this.element.setAttribute('data-meta', meta);
    var nonce = getNonce();
    if (nonce) this.element.setAttribute('nonce', nonce);
  }
  /**
   * Insert style element into render tree.
   */


  var _proto = DomRenderer.prototype;

  _proto.attach = function attach() {
    // In the case the element node is external and it is already in the DOM.
    if (this.element.parentNode || !this.sheet) return;
    insertStyle(this.element, this.sheet.options); // When rules are inserted using `insertRule` API, after `sheet.detach().attach()`
    // most browsers create a new CSSStyleSheet, except of all IEs.

    var deployed = Boolean(this.sheet && this.sheet.deployed);

    if (this.hasInsertedRules && deployed) {
      this.hasInsertedRules = false;
      this.deploy();
    }
  }
  /**
   * Remove style element from render tree.
   */
  ;

  _proto.detach = function detach() {
    if (!this.sheet) return;
    var parentNode = this.element.parentNode;
    if (parentNode) parentNode.removeChild(this.element); // In the most browsers, rules inserted using insertRule() API will be lost when style element is removed.
    // Though IE will keep them and we need a consistent behavior.

    if (this.sheet.options.link) {
      this.cssRules = [];
      this.element.textContent = '\n';
    }
  }
  /**
   * Inject CSS string into element.
   */
  ;

  _proto.deploy = function deploy() {
    var sheet = this.sheet;
    if (!sheet) return;

    if (sheet.options.link) {
      this.insertRules(sheet.rules);
      return;
    }

    this.element.textContent = "\n" + sheet.toString() + "\n";
  }
  /**
   * Insert RuleList into an element.
   */
  ;

  _proto.insertRules = function insertRules(rules, nativeParent) {
    for (var i = 0; i < rules.index.length; i++) {
      this.insertRule(rules.index[i], i, nativeParent);
    }
  }
  /**
   * Insert a rule into element.
   */
  ;

  _proto.insertRule = function insertRule(rule, index, nativeParent) {
    if (nativeParent === void 0) {
      nativeParent = this.element.sheet;
    }

    if (rule.rules) {
      var parent = rule;
      var latestNativeParent = nativeParent;

      if (rule.type === 'conditional' || rule.type === 'keyframes') {
        var _insertionIndex = getValidRuleInsertionIndex(nativeParent, index); // We need to render the container without children first.


        latestNativeParent = _insertRule(nativeParent, parent.toString({
          children: false
        }), _insertionIndex);

        if (latestNativeParent === false) {
          return false;
        }

        this.refCssRule(rule, _insertionIndex, latestNativeParent);
      }

      this.insertRules(parent.rules, latestNativeParent);
      return latestNativeParent;
    }

    var ruleStr = rule.toString();
    if (!ruleStr) return false;
    var insertionIndex = getValidRuleInsertionIndex(nativeParent, index);

    var nativeRule = _insertRule(nativeParent, ruleStr, insertionIndex);

    if (nativeRule === false) {
      return false;
    }

    this.hasInsertedRules = true;
    this.refCssRule(rule, insertionIndex, nativeRule);
    return nativeRule;
  };

  _proto.refCssRule = function refCssRule(rule, index, cssRule) {
    rule.renderable = cssRule; // We only want to reference the top level rules, deleteRule API doesn't support removing nested rules
    // like rules inside media queries or keyframes

    if (rule.options.parent instanceof StyleSheet) {
      this.cssRules[index] = cssRule;
    }
  }
  /**
   * Delete a rule.
   */
  ;

  _proto.deleteRule = function deleteRule(cssRule) {
    var sheet = this.element.sheet;
    var index = this.indexOf(cssRule);
    if (index === -1) return false;
    sheet.deleteRule(index);
    this.cssRules.splice(index, 1);
    return true;
  }
  /**
   * Get index of a CSS Rule.
   */
  ;

  _proto.indexOf = function indexOf(cssRule) {
    return this.cssRules.indexOf(cssRule);
  }
  /**
   * Generate a new CSS rule and replace the existing one.
   *
   * Only used for some old browsers because they can't set a selector.
   */
  ;

  _proto.replaceRule = function replaceRule(cssRule, rule) {
    var index = this.indexOf(cssRule);
    if (index === -1) return false;
    this.element.sheet.deleteRule(index);
    this.cssRules.splice(index, 1);
    return this.insertRule(rule, index);
  }
  /**
   * Get all rules elements.
   */
  ;

  _proto.getRules = function getRules() {
    return this.element.sheet.cssRules;
  };

  return DomRenderer;
}();

var instanceCounter = 0;

var Jss =
/*#__PURE__*/
function () {
  function Jss(options) {
    this.id = instanceCounter++;
    this.version = "10.5.0";
    this.plugins = new PluginsRegistry();
    this.options = {
      id: {
        minify: false
      },
      createGenerateId: createGenerateId,
      Renderer: dist_module ? DomRenderer : null,
      plugins: []
    };
    this.generateId = createGenerateId({
      minify: false
    });

    for (var i = 0; i < plugins.length; i++) {
      this.plugins.use(plugins[i], {
        queue: 'internal'
      });
    }

    this.setup(options);
  }
  /**
   * Prepares various options, applies plugins.
   * Should not be used twice on the same instance, because there is no plugins
   * deduplication logic.
   */


  var _proto = Jss.prototype;

  _proto.setup = function setup(options) {
    if (options === void 0) {
      options = {};
    }

    if (options.createGenerateId) {
      this.options.createGenerateId = options.createGenerateId;
    }

    if (options.id) {
      this.options.id = _extends({}, this.options.id, options.id);
    }

    if (options.createGenerateId || options.id) {
      this.generateId = this.options.createGenerateId(this.options.id);
    }

    if (options.insertionPoint != null) this.options.insertionPoint = options.insertionPoint;

    if ('Renderer' in options) {
      this.options.Renderer = options.Renderer;
    } // eslint-disable-next-line prefer-spread


    if (options.plugins) this.use.apply(this, options.plugins);
    return this;
  }
  /**
   * Create a Style Sheet.
   */
  ;

  _proto.createStyleSheet = function createStyleSheet(styles, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        index = _options.index;

    if (typeof index !== 'number') {
      index = registry.index === 0 ? 0 : registry.index + 1;
    }

    var sheet = new StyleSheet(styles, _extends({}, options, {
      jss: this,
      generateId: options.generateId || this.generateId,
      insertionPoint: this.options.insertionPoint,
      Renderer: this.options.Renderer,
      index: index
    }));
    this.plugins.onProcessSheet(sheet);
    return sheet;
  }
  /**
   * Detach the Style Sheet and remove it from the registry.
   */
  ;

  _proto.removeStyleSheet = function removeStyleSheet(sheet) {
    sheet.detach();
    registry.remove(sheet);
    return this;
  }
  /**
   * Create a rule without a Style Sheet.
   * [Deprecated] will be removed in the next major version.
   */
  ;

  _proto.createRule = function createRule$1(name, style, options) {
    if (style === void 0) {
      style = {};
    }

    if (options === void 0) {
      options = {};
    }

    // Enable rule without name for inline styles.
    if (typeof name === 'object') {
      // $FlowFixMe[incompatible-call]
      return this.createRule(undefined, name, style);
    } // $FlowFixMe[incompatible-type]


    var ruleOptions = _extends({}, options, {
      name: name,
      jss: this,
      Renderer: this.options.Renderer
    });

    if (!ruleOptions.generateId) ruleOptions.generateId = this.generateId;
    if (!ruleOptions.classes) ruleOptions.classes = {};
    if (!ruleOptions.keyframes) ruleOptions.keyframes = {};

    var rule = createRule(name, style, ruleOptions);

    if (rule) this.plugins.onProcessRule(rule);
    return rule;
  }
  /**
   * Register plugin. Passed function will be invoked with a rule instance.
   */
  ;

  _proto.use = function use() {
    var _this = this;

    for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins[_key] = arguments[_key];
    }

    plugins.forEach(function (plugin) {
      _this.plugins.use(plugin);
    });
    return this;
  };

  return Jss;
}();

/**
 * Extracts a styles object with only props that contain function values.
 */
function getDynamicStyles(styles) {
  var to = null;

  for (var key in styles) {
    var value = styles[key];
    var type = typeof value;

    if (type === 'function') {
      if (!to) to = {};
      to[key] = value;
    } else if (type === 'object' && value !== null && !Array.isArray(value)) {
      var extracted = getDynamicStyles(value);

      if (extracted) {
        if (!to) to = {};
        to[key] = extracted;
      }
    }
  }

  return to;
}

/**
 * SheetsManager is like a WeakMap which is designed to count StyleSheet
 * instances and attach/detach automatically.
 */
var SheetsManager =
/*#__PURE__*/
function () {
  function SheetsManager() {
    this.length = 0;
    this.sheets = new WeakMap();
  }

  var _proto = SheetsManager.prototype;

  _proto.get = function get(key) {
    var entry = this.sheets.get(key);
    return entry && entry.sheet;
  };

  _proto.add = function add(key, sheet) {
    if (this.sheets.has(key)) return;
    this.length++;
    this.sheets.set(key, {
      sheet: sheet,
      refs: 0
    });
  };

  _proto.manage = function manage(key) {
    var entry = this.sheets.get(key);

    if (entry) {
      if (entry.refs === 0) {
        entry.sheet.attach();
      }

      entry.refs++;
      return entry.sheet;
    }

    tiny_warning_esm(false, "[JSS] SheetsManager: can't find sheet to manage");
    return undefined;
  };

  _proto.unmanage = function unmanage(key) {
    var entry = this.sheets.get(key);

    if (entry) {
      if (entry.refs > 0) {
        entry.refs--;
        if (entry.refs === 0) entry.sheet.detach();
      }
    } else {
      tiny_warning_esm(false, "SheetsManager: can't find sheet to unmanage");
    }
  };

  _createClass(SheetsManager, [{
    key: "size",
    get: function get() {
      return this.length;
    }
  }]);

  return SheetsManager;
}();

/**
 * A better abstraction over CSS.
 *
 * @copyright Oleg Isonen (Slobodskoi) / Isonen 2014-present
 * @website https://github.com/cssinjs/jss
 * @license MIT
 */

/**
 * Export a constant indicating if this browser has CSSTOM support.
 * https://developers.google.com/web/updates/2018/03/cssom
 */
var hasCSSTOMSupport = typeof CSS === 'object' && CSS != null && 'number' in CSS;
/**
 * Creates a new instance of Jss.
 */

var create = function create(options) {
  return new Jss(options);
};
/**
 * A global Jss instance.
 */

var jss = create();

/* harmony default export */ const jss_esm = (jss);


;// CONCATENATED MODULE: ./node_modules/jss-plugin-rule-value-function/dist/jss-plugin-rule-value-function.esm.js



var now = Date.now();
var fnValuesNs = "fnValues" + now;
var fnRuleNs = "fnStyle" + ++now;

var functionPlugin = function functionPlugin() {
  return {
    onCreateRule: function onCreateRule(name, decl, options) {
      if (typeof decl !== 'function') return null;
      var rule = createRule(name, {}, options);
      rule[fnRuleNs] = decl;
      return rule;
    },
    onProcessStyle: function onProcessStyle(style, rule) {
      // We need to extract function values from the declaration, so that we can keep core unaware of them.
      // We need to do that only once.
      // We don't need to extract functions on each style update, since this can happen only once.
      // We don't support function values inside of function rules.
      if (fnValuesNs in rule || fnRuleNs in rule) return style;
      var fnValues = {};

      for (var prop in style) {
        var value = style[prop];
        if (typeof value !== 'function') continue;
        delete style[prop];
        fnValues[prop] = value;
      } // $FlowFixMe[prop-missing]


      rule[fnValuesNs] = fnValues;
      return style;
    },
    onUpdate: function onUpdate(data, rule, sheet, options) {
      var styleRule = rule; // $FlowFixMe[prop-missing]

      var fnRule = styleRule[fnRuleNs]; // If we have a style function, the entire rule is dynamic and style object
      // will be returned from that function.

      if (fnRule) {
        // Empty object will remove all currently defined props
        // in case function rule returns a falsy value.
        styleRule.style = fnRule(data) || {};

        if (false) { var prop; }
      } // $FlowFixMe[prop-missing]


      var fnValues = styleRule[fnValuesNs]; // If we have a fn values map, it is a rule with function values.

      if (fnValues) {
        for (var _prop in fnValues) {
          styleRule.prop(_prop, fnValues[_prop](data), options);
        }
      }
    }
  };
};

/* harmony default export */ const jss_plugin_rule_value_function_esm = (functionPlugin);

// EXTERNAL MODULE: ./node_modules/symbol-observable/es/index.js + 1 modules
var es = __webpack_require__(7121);
;// CONCATENATED MODULE: ./node_modules/jss-plugin-rule-value-observable/dist/jss-plugin-rule-value-observable.esm.js



var isObservable = function isObservable(value) {
  return value && value[es/* default */.Z] && value === value[es/* default */.Z]();
};

var observablePlugin = function observablePlugin(updateOptions) {
  return {
    onCreateRule: function onCreateRule(name, decl, options) {
      if (!isObservable(decl)) return null; // Cast `decl` to `Observable`, since it passed the type guard.

      var style$ = decl;
      var rule = createRule(name, {}, options); // TODO
      // Call `stream.subscribe()` returns a subscription, which should be explicitly
      // unsubscribed from when we know this sheet is no longer needed.

      style$.subscribe(function (style) {
        for (var prop in style) {
          rule.prop(prop, style[prop], updateOptions);
        }
      });
      return rule;
    },
    onProcessRule: function onProcessRule(rule) {
      if (rule && rule.type !== 'style') return;
      var styleRule = rule;
      var style = styleRule.style;

      var _loop = function _loop(prop) {
        var value = style[prop];
        if (!isObservable(value)) return "continue";
        delete style[prop];
        value.subscribe({
          next: function next(nextValue) {
            styleRule.prop(prop, nextValue, updateOptions);
          }
        });
      };

      for (var prop in style) {
        var _ret = _loop(prop);

        if (_ret === "continue") continue;
      }
    }
  };
};

/* harmony default export */ const jss_plugin_rule_value_observable_esm = (observablePlugin);

;// CONCATENATED MODULE: ./node_modules/jss-plugin-template/dist/jss-plugin-template.esm.js


var semiWithNl = /;\n/;

/**
 * Naive CSS parser.
 * - Supports only rule body (no selectors)
 * - Requires semicolon and new line after the value (except of last line)
 * - No nested rules support
 */
var parse = function parse(cssText) {
  var style = {};
  var split = cssText.split(semiWithNl);

  for (var i = 0; i < split.length; i++) {
    var decl = (split[i] || '').trim();
    if (!decl) continue;
    var colonIndex = decl.indexOf(':');

    if (colonIndex === -1) {
       false ? 0 : void 0;
      continue;
    }

    var prop = decl.substr(0, colonIndex).trim();
    var value = decl.substr(colonIndex + 1).trim();
    style[prop] = value;
  }

  return style;
};

var onProcessRule = function onProcessRule(rule) {
  if (typeof rule.style === 'string') {
    // $FlowFixMe[prop-missing] We can safely assume that rule has the style property
    rule.style = parse(rule.style);
  }
};

function templatePlugin() {
  return {
    onProcessRule: onProcessRule
  };
}

/* harmony default export */ const jss_plugin_template_esm = (templatePlugin);

;// CONCATENATED MODULE: ./node_modules/jss-plugin-global/dist/jss-plugin-global.esm.js



var at = '@global';
var atPrefix = '@global ';

var GlobalContainerRule =
/*#__PURE__*/
function () {
  function GlobalContainerRule(key, styles, options) {
    this.type = 'global';
    this.at = at;
    this.rules = void 0;
    this.options = void 0;
    this.key = void 0;
    this.isProcessed = false;
    this.key = key;
    this.options = options;
    this.rules = new RuleList(_extends({}, options, {
      parent: this
    }));

    for (var selector in styles) {
      this.rules.add(selector, styles[selector]);
    }

    this.rules.process();
  }
  /**
   * Get a rule.
   */


  var _proto = GlobalContainerRule.prototype;

  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  }
  /**
   * Create and register rule, run plugins.
   */
  ;

  _proto.addRule = function addRule(name, style, options) {
    var rule = this.rules.add(name, style, options);
    if (rule) this.options.jss.plugins.onProcessRule(rule);
    return rule;
  }
  /**
   * Get index of a rule.
   */
  ;

  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  }
  /**
   * Generates a CSS string.
   */
  ;

  _proto.toString = function toString() {
    return this.rules.toString();
  };

  return GlobalContainerRule;
}();

var GlobalPrefixedRule =
/*#__PURE__*/
function () {
  function GlobalPrefixedRule(key, style, options) {
    this.type = 'global';
    this.at = at;
    this.options = void 0;
    this.rule = void 0;
    this.isProcessed = false;
    this.key = void 0;
    this.key = key;
    this.options = options;
    var selector = key.substr(atPrefix.length);
    this.rule = options.jss.createRule(selector, style, _extends({}, options, {
      parent: this
    }));
  }

  var _proto2 = GlobalPrefixedRule.prototype;

  _proto2.toString = function toString(options) {
    return this.rule ? this.rule.toString(options) : '';
  };

  return GlobalPrefixedRule;
}();

var separatorRegExp = /\s*,\s*/g;

function addScope(selector, scope) {
  var parts = selector.split(separatorRegExp);
  var scoped = '';

  for (var i = 0; i < parts.length; i++) {
    scoped += scope + " " + parts[i].trim();
    if (parts[i + 1]) scoped += ', ';
  }

  return scoped;
}

function handleNestedGlobalContainerRule(rule, sheet) {
  var options = rule.options,
      style = rule.style;
  var rules = style ? style[at] : null;
  if (!rules) return;

  for (var name in rules) {
    sheet.addRule(name, rules[name], _extends({}, options, {
      selector: addScope(name, rule.selector)
    }));
  }

  delete style[at];
}

function handlePrefixedGlobalRule(rule, sheet) {
  var options = rule.options,
      style = rule.style;

  for (var prop in style) {
    if (prop[0] !== '@' || prop.substr(0, at.length) !== at) continue;
    var selector = addScope(prop.substr(at.length), rule.selector);
    sheet.addRule(selector, style[prop], _extends({}, options, {
      selector: selector
    }));
    delete style[prop];
  }
}
/**
 * Convert nested rules to separate, remove them from original styles.
 *
 * @param {Rule} rule
 * @api public
 */


function jssGlobal() {
  function onCreateRule(name, styles, options) {
    if (!name) return null;

    if (name === at) {
      return new GlobalContainerRule(name, styles, options);
    }

    if (name[0] === '@' && name.substr(0, atPrefix.length) === atPrefix) {
      return new GlobalPrefixedRule(name, styles, options);
    }

    var parent = options.parent;

    if (parent) {
      if (parent.type === 'global' || parent.options.parent && parent.options.parent.type === 'global') {
        options.scoped = false;
      }
    }

    if (options.scoped === false) {
      options.selector = name;
    }

    return null;
  }

  function onProcessRule(rule, sheet) {
    if (rule.type !== 'style' || !sheet) return;
    handleNestedGlobalContainerRule(rule, sheet);
    handlePrefixedGlobalRule(rule, sheet);
  }

  return {
    onCreateRule: onCreateRule,
    onProcessRule: onProcessRule
  };
}

/* harmony default export */ const jss_plugin_global_esm = (jssGlobal);

;// CONCATENATED MODULE: ./node_modules/jss-plugin-extend/dist/jss-plugin-extend.esm.js



var jss_plugin_extend_esm_isObject = function isObject(obj) {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
};

var valueNs = "extendCurrValue" + Date.now();

function mergeExtend(style, rule, sheet, newStyle) {
  var extendType = typeof style.extend; // Extend using a rule name.

  if (extendType === 'string') {
    if (!sheet) return;
    var refRule = sheet.getRule(style.extend);
    if (!refRule) return;

    if (refRule === rule) {
       false ? 0 : void 0;
      return;
    }

    var parent = refRule.options.parent;

    if (parent) {
      var originalStyle = parent.rules.raw[style.extend];
      extend(originalStyle, rule, sheet, newStyle);
    }

    return;
  } // Extend using an array.


  if (Array.isArray(style.extend)) {
    for (var index = 0; index < style.extend.length; index++) {
      var singleExtend = style.extend[index];
      var singleStyle = typeof singleExtend === 'string' ? _extends({}, style, {
        extend: singleExtend
      }) : style.extend[index];
      extend(singleStyle, rule, sheet, newStyle);
    }

    return;
  } // Extend is a style object.


  for (var prop in style.extend) {
    if (prop === 'extend') {
      extend(style.extend.extend, rule, sheet, newStyle);
      continue;
    }

    if (jss_plugin_extend_esm_isObject(style.extend[prop])) {
      if (!(prop in newStyle)) newStyle[prop] = {};
      extend(style.extend[prop], rule, sheet, newStyle[prop]);
      continue;
    }

    newStyle[prop] = style.extend[prop];
  }
}

function mergeRest(style, rule, sheet, newStyle) {
  // Copy base style.
  for (var prop in style) {
    if (prop === 'extend') continue;

    if (jss_plugin_extend_esm_isObject(newStyle[prop]) && jss_plugin_extend_esm_isObject(style[prop])) {
      extend(style[prop], rule, sheet, newStyle[prop]);
      continue;
    }

    if (jss_plugin_extend_esm_isObject(style[prop])) {
      newStyle[prop] = extend(style[prop], rule, sheet);
      continue;
    }

    newStyle[prop] = style[prop];
  }
}
/**
 * Recursively extend styles.
 */


function extend(style, rule, sheet, newStyle) {
  if (newStyle === void 0) {
    newStyle = {};
  }

  mergeExtend(style, rule, sheet, newStyle);
  mergeRest(style, rule, sheet, newStyle);
  return newStyle;
}
/**
 * Handle `extend` property.
 *
 * @param {Rule} rule
 * @api public
 */


function jssExtend() {
  function onProcessStyle(style, rule, sheet) {
    if ('extend' in style) return extend(style, rule, sheet);
    return style;
  }

  function onChangeValue(value, prop, rule) {
    if (prop !== 'extend') return value; // Value is empty, remove properties set previously.

    if (value == null || value === false) {
      // $FlowFixMe[prop-missing]
      for (var key in rule[valueNs]) {
        rule.prop(key, null);
      } // $FlowFixMe[prop-missing] Flow complains because there is no indexer property in StyleRule


      rule[valueNs] = null;
      return null;
    }

    if (typeof value === 'object') {
      // $FlowFixMe[invalid-in-rhs] This will be an object
      for (var _key in value) {
        // $FlowFixMe[incompatible-use] This will be an object
        rule.prop(_key, value[_key]);
      } // $FlowFixMe[prop-missing] Flow complains because there is no indexer property in StyleRule


      rule[valueNs] = value;
    } // Make sure we don't set the value in the core.


    return null;
  }

  return {
    onProcessStyle: onProcessStyle,
    onChangeValue: onChangeValue
  };
}

/* harmony default export */ const jss_plugin_extend_esm = (jssExtend);

;// CONCATENATED MODULE: ./node_modules/jss-plugin-nested/dist/jss-plugin-nested.esm.js



var jss_plugin_nested_esm_separatorRegExp = /\s*,\s*/g;
var parentRegExp = /&/g;
var jss_plugin_nested_esm_refRegExp = /\$([\w-]+)/g;
/**
 * Convert nested rules to separate, remove them from original styles.
 *
 * @param {Rule} rule
 * @api public
 */

function jssNested() {
  // Get a function to be used for $ref replacement.
  function getReplaceRef(container, sheet) {
    return function (match, key) {
      var rule = container.getRule(key) || sheet && sheet.getRule(key);

      if (rule) {
        rule = rule;
        return rule.selector;
      }

       false ? 0 : void 0;
      return key;
    };
  }

  function replaceParentRefs(nestedProp, parentProp) {
    var parentSelectors = parentProp.split(jss_plugin_nested_esm_separatorRegExp);
    var nestedSelectors = nestedProp.split(jss_plugin_nested_esm_separatorRegExp);
    var result = '';

    for (var i = 0; i < parentSelectors.length; i++) {
      var parent = parentSelectors[i];

      for (var j = 0; j < nestedSelectors.length; j++) {
        var nested = nestedSelectors[j];
        if (result) result += ', '; // Replace all & by the parent or prefix & with the parent.

        result += nested.indexOf('&') !== -1 ? nested.replace(parentRegExp, parent) : parent + " " + nested;
      }
    }

    return result;
  }

  function getOptions(rule, container, prevOptions) {
    // Options has been already created, now we only increase index.
    if (prevOptions) return _extends({}, prevOptions, {
      index: prevOptions.index + 1 // $FlowFixMe[prop-missing]

    });
    var nestingLevel = rule.options.nestingLevel;
    nestingLevel = nestingLevel === undefined ? 1 : nestingLevel + 1;

    var options = _extends({}, rule.options, {
      nestingLevel: nestingLevel,
      index: container.indexOf(rule) + 1 // We don't need the parent name to be set options for chlid.

    });

    delete options.name;
    return options;
  }

  function onProcessStyle(style, rule, sheet) {
    if (rule.type !== 'style') return style;
    var styleRule = rule;
    var container = styleRule.options.parent;
    var options;
    var replaceRef;

    for (var prop in style) {
      var isNested = prop.indexOf('&') !== -1;
      var isNestedConditional = prop[0] === '@';
      if (!isNested && !isNestedConditional) continue;
      options = getOptions(styleRule, container, options);

      if (isNested) {
        var selector = replaceParentRefs(prop, styleRule.selector); // Lazily create the ref replacer function just once for
        // all nested rules within the sheet.

        if (!replaceRef) replaceRef = getReplaceRef(container, sheet); // Replace all $refs.

        selector = selector.replace(jss_plugin_nested_esm_refRegExp, replaceRef);
        container.addRule(selector, style[prop], _extends({}, options, {
          selector: selector
        }));
      } else if (isNestedConditional) {
        // Place conditional right after the parent rule to ensure right ordering.
        container.addRule(prop, {}, options) // Flow expects more options but they aren't required
        // And flow doesn't know this will always be a StyleRule which has the addRule method
        // $FlowFixMe[incompatible-use]
        // $FlowFixMe[prop-missing]
        .addRule(styleRule.key, style[prop], {
          selector: styleRule.selector
        });
      }

      delete style[prop];
    }

    return style;
  }

  return {
    onProcessStyle: onProcessStyle
  };
}

/* harmony default export */ const jss_plugin_nested_esm = (jssNested);

;// CONCATENATED MODULE: ./node_modules/jss-plugin-compose/dist/jss-plugin-compose.esm.js


/**
 * Set selector.
 *
 * @param {Object} original rule
 * @param {String} className class string
 * @return {Boolean} flag, indicating function was successfull or not
 */
function registerClass(rule, className) {
  // Skip falsy values
  if (!className) return true; // Support array of class names `{composes: ['foo', 'bar']}`

  if (Array.isArray(className)) {
    for (var index = 0; index < className.length; index++) {
      var isSetted = registerClass(rule, className[index]);
      if (!isSetted) return false;
    }

    return true;
  } // Support space separated class names `{composes: 'foo bar'}`


  if (className.indexOf(' ') > -1) {
    return registerClass(rule, className.split(' '));
  }

  var _ref = rule.options,
      parent = _ref.parent; // It is a ref to a local rule.

  if (className[0] === '$') {
    var refRule = parent.getRule(className.substr(1));

    if (!refRule) {
       false ? 0 : void 0;
      return false;
    }

    if (refRule === rule) {
       false ? 0 : void 0;
      return false;
    }

    parent.classes[rule.key] += " " + parent.classes[refRule.key];
    return true;
  }

  parent.classes[rule.key] += " " + className;
  return true;
}
/**
 * Convert compose property to additional class, remove property from original styles.
 *
 * @param {Rule} rule
 * @api public
 */


function jssCompose() {
  function onProcessStyle(style, rule) {
    if (!('composes' in style)) return style;
    registerClass(rule, style.composes); // Remove composes property to prevent infinite loop.

    delete style.composes;
    return style;
  }

  return {
    onProcessStyle: onProcessStyle
  };
}

/* harmony default export */ const jss_plugin_compose_esm = (jssCompose);

;// CONCATENATED MODULE: ./node_modules/hyphenate-style-name/index.js
/* eslint-disable no-var, prefer-template */
var uppercasePattern = /[A-Z]/g
var msPattern = /^ms-/
var cache = {}

function toHyphenLower(match) {
  return '-' + match.toLowerCase()
}

function hyphenateStyleName(name) {
  if (cache.hasOwnProperty(name)) {
    return cache[name]
  }

  var hName = name.replace(uppercasePattern, toHyphenLower)
  return (cache[name] = msPattern.test(hName) ? '-' + hName : hName)
}

/* harmony default export */ const hyphenate_style_name = (hyphenateStyleName);

;// CONCATENATED MODULE: ./node_modules/jss-plugin-camel-case/dist/jss-plugin-camel-case.esm.js


/**
 * Convert camel cased property names to dash separated.
 *
 * @param {Object} style
 * @return {Object}
 */

function convertCase(style) {
  var converted = {};

  for (var prop in style) {
    var key = prop.indexOf('--') === 0 ? prop : hyphenate_style_name(prop);
    converted[key] = style[prop];
  }

  if (style.fallbacks) {
    if (Array.isArray(style.fallbacks)) converted.fallbacks = style.fallbacks.map(convertCase);else converted.fallbacks = convertCase(style.fallbacks);
  }

  return converted;
}
/**
 * Allow camel cased property names by converting them back to dasherized.
 *
 * @param {Rule} rule
 */


function camelCase() {
  function onProcessStyle(style) {
    if (Array.isArray(style)) {
      // Handle rules like @font-face, which can have multiple styles in an array
      for (var index = 0; index < style.length; index++) {
        style[index] = convertCase(style[index]);
      }

      return style;
    }

    return convertCase(style);
  }

  function onChangeValue(value, prop, rule) {
    if (prop.indexOf('--') === 0) {
      return value;
    }

    var hyphenatedProp = hyphenate_style_name(prop); // There was no camel case in place

    if (prop === hyphenatedProp) return value;
    rule.prop(hyphenatedProp, value); // Core will ignore that property value we set the proper one above.

    return null;
  }

  return {
    onProcessStyle: onProcessStyle,
    onChangeValue: onChangeValue
  };
}

/* harmony default export */ const jss_plugin_camel_case_esm = (camelCase);

;// CONCATENATED MODULE: ./node_modules/jss-plugin-default-unit/dist/jss-plugin-default-unit.esm.js


var px = hasCSSTOMSupport && CSS ? CSS.px : 'px';
var ms = hasCSSTOMSupport && CSS ? CSS.ms : 'ms';
var percent = hasCSSTOMSupport && CSS ? CSS.percent : '%';
/**
 * Generated jss-plugin-default-unit CSS property units
 *
 * @type object
 */

var defaultUnits = {
  // Animation properties
  'animation-delay': ms,
  'animation-duration': ms,
  // Background properties
  'background-position': px,
  'background-position-x': px,
  'background-position-y': px,
  'background-size': px,
  // Border Properties
  border: px,
  'border-bottom': px,
  'border-bottom-left-radius': px,
  'border-bottom-right-radius': px,
  'border-bottom-width': px,
  'border-left': px,
  'border-left-width': px,
  'border-radius': px,
  'border-right': px,
  'border-right-width': px,
  'border-top': px,
  'border-top-left-radius': px,
  'border-top-right-radius': px,
  'border-top-width': px,
  'border-width': px,
  'border-block': px,
  'border-block-end': px,
  'border-block-end-width': px,
  'border-block-start': px,
  'border-block-start-width': px,
  'border-block-width': px,
  'border-inline': px,
  'border-inline-end': px,
  'border-inline-end-width': px,
  'border-inline-start': px,
  'border-inline-start-width': px,
  'border-inline-width': px,
  'border-start-start-radius': px,
  'border-start-end-radius': px,
  'border-end-start-radius': px,
  'border-end-end-radius': px,
  // Margin properties
  margin: px,
  'margin-bottom': px,
  'margin-left': px,
  'margin-right': px,
  'margin-top': px,
  'margin-block': px,
  'margin-block-end': px,
  'margin-block-start': px,
  'margin-inline': px,
  'margin-inline-end': px,
  'margin-inline-start': px,
  // Padding properties
  padding: px,
  'padding-bottom': px,
  'padding-left': px,
  'padding-right': px,
  'padding-top': px,
  'padding-block': px,
  'padding-block-end': px,
  'padding-block-start': px,
  'padding-inline': px,
  'padding-inline-end': px,
  'padding-inline-start': px,
  // Mask properties
  'mask-position-x': px,
  'mask-position-y': px,
  'mask-size': px,
  // Width and height properties
  height: px,
  width: px,
  'min-height': px,
  'max-height': px,
  'min-width': px,
  'max-width': px,
  // Position properties
  bottom: px,
  left: px,
  top: px,
  right: px,
  inset: px,
  'inset-block': px,
  'inset-block-end': px,
  'inset-block-start': px,
  'inset-inline': px,
  'inset-inline-end': px,
  'inset-inline-start': px,
  // Shadow properties
  'box-shadow': px,
  'text-shadow': px,
  // Column properties
  'column-gap': px,
  'column-rule': px,
  'column-rule-width': px,
  'column-width': px,
  // Font and text properties
  'font-size': px,
  'font-size-delta': px,
  'letter-spacing': px,
  'text-indent': px,
  'text-stroke': px,
  'text-stroke-width': px,
  'word-spacing': px,
  // Motion properties
  motion: px,
  'motion-offset': px,
  // Outline properties
  outline: px,
  'outline-offset': px,
  'outline-width': px,
  // Perspective properties
  perspective: px,
  'perspective-origin-x': percent,
  'perspective-origin-y': percent,
  // Transform properties
  'transform-origin': percent,
  'transform-origin-x': percent,
  'transform-origin-y': percent,
  'transform-origin-z': percent,
  // Transition properties
  'transition-delay': ms,
  'transition-duration': ms,
  // Alignment properties
  'vertical-align': px,
  'flex-basis': px,
  // Some random properties
  'shape-margin': px,
  size: px,
  gap: px,
  // Grid properties
  grid: px,
  'grid-gap': px,
  'grid-row-gap': px,
  'grid-column-gap': px,
  'grid-template-rows': px,
  'grid-template-columns': px,
  'grid-auto-rows': px,
  'grid-auto-columns': px,
  // Not existing properties.
  // Used to avoid issues with jss-plugin-expand integration.
  'box-shadow-x': px,
  'box-shadow-y': px,
  'box-shadow-blur': px,
  'box-shadow-spread': px,
  'font-line-height': px,
  'text-shadow-x': px,
  'text-shadow-y': px,
  'text-shadow-blur': px
};

/**
 * Clones the object and adds a camel cased property version.
 */
function addCamelCasedVersion(obj) {
  var regExp = /(-[a-z])/g;

  var replace = function replace(str) {
    return str[1].toUpperCase();
  };

  var newObj = {};

  for (var _key in obj) {
    newObj[_key] = obj[_key];
    newObj[_key.replace(regExp, replace)] = obj[_key];
  }

  return newObj;
}

var units = addCamelCasedVersion(defaultUnits);
/**
 * Recursive deep style passing function
 */

function iterate(prop, value, options) {
  if (value == null) return value;

  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      value[i] = iterate(prop, value[i], options);
    }
  } else if (typeof value === 'object') {
    if (prop === 'fallbacks') {
      for (var innerProp in value) {
        value[innerProp] = iterate(innerProp, value[innerProp], options);
      }
    } else {
      for (var _innerProp in value) {
        value[_innerProp] = iterate(prop + "-" + _innerProp, value[_innerProp], options);
      }
    }
  } else if (typeof value === 'number') {
    var unit = options[prop] || units[prop]; // Add the unit if available, except for the special case of 0px.

    if (unit && !(value === 0 && unit === px)) {
      return typeof unit === 'function' ? unit(value).toString() : "" + value + unit;
    }

    return value.toString();
  }

  return value;
}
/**
 * Add unit to numeric values.
 */


function defaultUnit(options) {
  if (options === void 0) {
    options = {};
  }

  var camelCasedOptions = addCamelCasedVersion(options);

  function onProcessStyle(style, rule) {
    if (rule.type !== 'style') return style;

    for (var prop in style) {
      style[prop] = iterate(prop, style[prop], camelCasedOptions);
    }

    return style;
  }

  function onChangeValue(value, prop) {
    return iterate(prop, value, camelCasedOptions);
  }

  return {
    onProcessStyle: onProcessStyle,
    onChangeValue: onChangeValue
  };
}

/* harmony default export */ const jss_plugin_default_unit_esm = (defaultUnit);

;// CONCATENATED MODULE: ./node_modules/jss-plugin-expand/dist/jss-plugin-expand.esm.js
/**
 * A scheme for converting properties from array to regular style.
 * All properties listed below will be transformed to a string separated by space.
 */
var propArray = {
  'background-size': true,
  'background-position': true,
  border: true,
  'border-bottom': true,
  'border-left': true,
  'border-top': true,
  'border-right': true,
  'border-radius': true,
  'border-image': true,
  'border-width': true,
  'border-style': true,
  'border-color': true,
  'box-shadow': true,
  flex: true,
  margin: true,
  padding: true,
  outline: true,
  'transform-origin': true,
  transform: true,
  transition: true
  /**
   * A scheme for converting arrays to regular styles inside of objects.
   * For e.g.: "{position: [0, 0]}" => "background-position: 0 0;".
   */

};
var propArrayInObj = {
  position: true,
  // background-position
  size: true // background-size

  /**
   * A scheme for parsing and building correct styles from passed objects.
   */

};
var propObj = {
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  background: {
    attachment: null,
    color: null,
    image: null,
    position: null,
    repeat: null
  },
  border: {
    width: null,
    style: null,
    color: null
  },
  'border-top': {
    width: null,
    style: null,
    color: null
  },
  'border-right': {
    width: null,
    style: null,
    color: null
  },
  'border-bottom': {
    width: null,
    style: null,
    color: null
  },
  'border-left': {
    width: null,
    style: null,
    color: null
  },
  outline: {
    width: null,
    style: null,
    color: null
  },
  'list-style': {
    type: null,
    position: null,
    image: null
  },
  transition: {
    property: null,
    duration: null,
    'timing-function': null,
    timingFunction: null,
    // Needed for avoiding comilation issues with jss-plugin-camel-case
    delay: null
  },
  animation: {
    name: null,
    duration: null,
    'timing-function': null,
    timingFunction: null,
    // Needed to avoid compilation issues with jss-plugin-camel-case
    delay: null,
    'iteration-count': null,
    iterationCount: null,
    // Needed to avoid compilation issues with jss-plugin-camel-case
    direction: null,
    'fill-mode': null,
    fillMode: null,
    // Needed to avoid compilation issues with jss-plugin-camel-case
    'play-state': null,
    playState: null // Needed to avoid compilation issues with jss-plugin-camel-case

  },
  'box-shadow': {
    x: 0,
    y: 0,
    blur: 0,
    spread: 0,
    color: null,
    inset: null
  },
  'text-shadow': {
    x: 0,
    y: 0,
    blur: null,
    color: null
  }
  /**
   * A scheme for converting non-standart properties inside object.
   * For e.g.: include 'border-radius' property inside 'border' object.
   */

};
var customPropObj = {
  border: {
    radius: 'border-radius',
    image: 'border-image',
    width: 'border-width',
    style: 'border-style',
    color: 'border-color'
  },
  'border-bottom': {
    width: 'border-bottom-width',
    style: 'border-bottom-style',
    color: 'border-bottom-color'
  },
  'border-top': {
    width: 'border-top-width',
    style: 'border-top-style',
    color: 'border-top-color'
  },
  'border-left': {
    width: 'border-left-width',
    style: 'border-left-style',
    color: 'border-left-color'
  },
  'border-right': {
    width: 'border-right-width',
    style: 'border-right-style',
    color: 'border-right-color'
  },
  background: {
    size: 'background-size',
    image: 'background-image'
  },
  font: {
    style: 'font-style',
    variant: 'font-variant',
    weight: 'font-weight',
    stretch: 'font-stretch',
    size: 'font-size',
    family: 'font-family',
    lineHeight: 'line-height',
    // Needed to avoid compilation issues with jss-plugin-camel-case
    'line-height': 'line-height'
  },
  flex: {
    grow: 'flex-grow',
    basis: 'flex-basis',
    direction: 'flex-direction',
    wrap: 'flex-wrap',
    flow: 'flex-flow',
    shrink: 'flex-shrink'
  },
  align: {
    self: 'align-self',
    items: 'align-items',
    content: 'align-content'
  },
  grid: {
    'template-columns': 'grid-template-columns',
    templateColumns: 'grid-template-columns',
    'template-rows': 'grid-template-rows',
    templateRows: 'grid-template-rows',
    'template-areas': 'grid-template-areas',
    templateAreas: 'grid-template-areas',
    template: 'grid-template',
    'auto-columns': 'grid-auto-columns',
    autoColumns: 'grid-auto-columns',
    'auto-rows': 'grid-auto-rows',
    autoRows: 'grid-auto-rows',
    'auto-flow': 'grid-auto-flow',
    autoFlow: 'grid-auto-flow',
    row: 'grid-row',
    column: 'grid-column',
    'row-start': 'grid-row-start',
    rowStart: 'grid-row-start',
    'row-end': 'grid-row-end',
    rowEnd: 'grid-row-end',
    'column-start': 'grid-column-start',
    columnStart: 'grid-column-start',
    'column-end': 'grid-column-end',
    columnEnd: 'grid-column-end',
    area: 'grid-area',
    gap: 'grid-gap',
    'row-gap': 'grid-row-gap',
    rowGap: 'grid-row-gap',
    'column-gap': 'grid-column-gap',
    columnGap: 'grid-column-gap'
  }
};

/* eslint-disable no-use-before-define */

/**
 * Map values by given prop.
 *
 * @param {Array} array of values
 * @param {String} original property
 * @param {String} original rule
 * @return {String} mapped values
 */
function mapValuesByProp(value, prop, rule) {
  return value.map(function (item) {
    return objectToArray(item, prop, rule, false, true);
  });
}
/**
 * Convert array to nested array, if needed
 */


function processArray(value, prop, scheme, rule) {
  if (scheme[prop] == null) return value;
  if (value.length === 0) return [];
  if (Array.isArray(value[0])) return processArray(value[0], prop, scheme, rule);

  if (typeof value[0] === 'object') {
    return mapValuesByProp(value, prop, rule);
  }

  return [value];
}
/**
 * Convert object to array.
 */


function objectToArray(value, prop, rule, isFallback, isInArray) {
  if (!(propObj[prop] || customPropObj[prop])) return [];
  var result = []; // Check if exists any non-standard property

  if (customPropObj[prop]) {
    // eslint-disable-next-line no-param-reassign
    value = customPropsToStyle(value, rule, customPropObj[prop], isFallback);
  } // Pass throught all standart props


  if (Object.keys(value).length) {
    for (var baseProp in propObj[prop]) {
      if (value[baseProp]) {
        if (Array.isArray(value[baseProp])) {
          result.push(propArrayInObj[baseProp] === null ? value[baseProp] : value[baseProp].join(' '));
        } else result.push(value[baseProp]);

        continue;
      } // Add default value from props config.


      if (propObj[prop][baseProp] != null) {
        result.push(propObj[prop][baseProp]);
      }
    }
  }

  if (!result.length || isInArray) return result;
  return [result];
}
/**
 * Convert custom properties values to styles adding them to rule directly
 */


function customPropsToStyle(value, rule, customProps, isFallback) {
  for (var prop in customProps) {
    var propName = customProps[prop]; // If current property doesn't exist already in rule - add new one

    if (typeof value[prop] !== 'undefined' && (isFallback || !rule.prop(propName))) {
      var _styleDetector;

      var appendedValue = styleDetector((_styleDetector = {}, _styleDetector[propName] = value[prop], _styleDetector), rule)[propName]; // Add style directly in rule

      if (isFallback) rule.style.fallbacks[propName] = appendedValue;else rule.style[propName] = appendedValue;
    } // Delete converted property to avoid double converting


    delete value[prop];
  }

  return value;
}
/**
 * Detect if a style needs to be converted.
 */


function styleDetector(style, rule, isFallback) {
  for (var prop in style) {
    var value = style[prop];

    if (Array.isArray(value)) {
      // Check double arrays to avoid recursion.
      if (!Array.isArray(value[0])) {
        if (prop === 'fallbacks') {
          for (var index = 0; index < style.fallbacks.length; index++) {
            style.fallbacks[index] = styleDetector(style.fallbacks[index], rule, true);
          }

          continue;
        }

        style[prop] = processArray(value, prop, propArray, rule); // Avoid creating properties with empty values

        if (!style[prop].length) delete style[prop];
      }
    } else if (typeof value === 'object') {
      if (prop === 'fallbacks') {
        style.fallbacks = styleDetector(style.fallbacks, rule, true);
        continue;
      }

      style[prop] = objectToArray(value, prop, rule, isFallback); // Avoid creating properties with empty values

      if (!style[prop].length) delete style[prop];
    } // Maybe a computed value resulting in an empty string
    else if (style[prop] === '') delete style[prop];
  }

  return style;
}
/**
 * Adds possibility to write expanded styles.
 */


function jssExpand() {
  function onProcessStyle(style, rule) {
    if (!style || rule.type !== 'style') return style;

    if (Array.isArray(style)) {
      // Pass rules one by one and reformat them
      for (var index = 0; index < style.length; index++) {
        style[index] = styleDetector(style[index], rule);
      }

      return style;
    }

    return styleDetector(style, rule);
  }

  return {
    onProcessStyle: onProcessStyle
  };
}

/* harmony default export */ const jss_plugin_expand_esm = (jssExpand);

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
;// CONCATENATED MODULE: ./node_modules/css-vendor/dist/css-vendor.esm.js



// Export javascript style and css style vendor prefixes.
var js = '';
var css = '';
var vendor = '';
var browser = '';
var isTouch = dist_module && 'ontouchstart' in document.documentElement; // We should not do anything if required serverside.

if (dist_module) {
  // Order matters. We need to check Webkit the last one because
  // other vendors use to add Webkit prefixes to some properties
  var jsCssMap = {
    Moz: '-moz-',
    ms: '-ms-',
    O: '-o-',
    Webkit: '-webkit-'
  };

  var _document$createEleme = document.createElement('p'),
      style = _document$createEleme.style;

  var testProp = 'Transform';

  for (var key in jsCssMap) {
    if (key + testProp in style) {
      js = key;
      css = jsCssMap[key];
      break;
    }
  } // Correctly detect the Edge browser.


  if (js === 'Webkit' && 'msHyphens' in style) {
    js = 'ms';
    css = jsCssMap.ms;
    browser = 'edge';
  } // Correctly detect the Safari browser.


  if (js === 'Webkit' && '-apple-trailing-word' in style) {
    vendor = 'apple';
  }
}
/**
 * Vendor prefix string for the current browser.
 *
 * @type {{js: String, css: String, vendor: String, browser: String}}
 * @api public
 */


var prefix = {
  js: js,
  css: css,
  vendor: vendor,
  browser: browser,
  isTouch: isTouch
};

/**
 * Test if a keyframe at-rule should be prefixed or not
 *
 * @param {String} vendor prefix string for the current browser.
 * @return {String}
 * @api public
 */

function supportedKeyframes(key) {
  // Keyframes is already prefixed. e.g. key = '@-webkit-keyframes a'
  if (key[1] === '-') return key; // No need to prefix IE/Edge. Older browsers will ignore unsupported rules.
  // https://caniuse.com/#search=keyframes

  if (prefix.js === 'ms') return key;
  return "@" + prefix.css + "keyframes" + key.substr(10);
}

// https://caniuse.com/#search=appearance

var appearence = {
  noPrefill: ['appearance'],
  supportedProperty: function supportedProperty(prop) {
    if (prop !== 'appearance') return false;
    if (prefix.js === 'ms') return "-webkit-" + prop;
    return prefix.css + prop;
  }
};

// https://caniuse.com/#search=color-adjust

var colorAdjust = {
  noPrefill: ['color-adjust'],
  supportedProperty: function supportedProperty(prop) {
    if (prop !== 'color-adjust') return false;
    if (prefix.js === 'Webkit') return prefix.css + "print-" + prop;
    return prop;
  }
};

var regExp = /[-\s]+(.)?/g;
/**
 * Replaces the letter with the capital letter
 *
 * @param {String} match
 * @param {String} c
 * @return {String}
 * @api private
 */

function toUpper(match, c) {
  return c ? c.toUpperCase() : '';
}
/**
 * Convert dash separated strings to camel-cased.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */


function camelize(str) {
  return str.replace(regExp, toUpper);
}

/**
 * Convert dash separated strings to pascal cased.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function pascalize(str) {
  return camelize("-" + str);
}

// but we can use a longhand property instead.
// https://caniuse.com/#search=mask

var mask = {
  noPrefill: ['mask'],
  supportedProperty: function supportedProperty(prop, style) {
    if (!/^mask/.test(prop)) return false;

    if (prefix.js === 'Webkit') {
      var longhand = 'mask-image';

      if (camelize(longhand) in style) {
        return prop;
      }

      if (prefix.js + pascalize(longhand) in style) {
        return prefix.css + prop;
      }
    }

    return prop;
  }
};

// https://caniuse.com/#search=text-orientation

var textOrientation = {
  noPrefill: ['text-orientation'],
  supportedProperty: function supportedProperty(prop) {
    if (prop !== 'text-orientation') return false;

    if (prefix.vendor === 'apple' && !prefix.isTouch) {
      return prefix.css + prop;
    }

    return prop;
  }
};

// https://caniuse.com/#search=transform

var transform = {
  noPrefill: ['transform'],
  supportedProperty: function supportedProperty(prop, style, options) {
    if (prop !== 'transform') return false;

    if (options.transform) {
      return prop;
    }

    return prefix.css + prop;
  }
};

// https://caniuse.com/#search=transition

var transition = {
  noPrefill: ['transition'],
  supportedProperty: function supportedProperty(prop, style, options) {
    if (prop !== 'transition') return false;

    if (options.transition) {
      return prop;
    }

    return prefix.css + prop;
  }
};

// https://caniuse.com/#search=writing-mode

var writingMode = {
  noPrefill: ['writing-mode'],
  supportedProperty: function supportedProperty(prop) {
    if (prop !== 'writing-mode') return false;

    if (prefix.js === 'Webkit' || prefix.js === 'ms' && prefix.browser !== 'edge') {
      return prefix.css + prop;
    }

    return prop;
  }
};

// https://caniuse.com/#search=user-select

var userSelect = {
  noPrefill: ['user-select'],
  supportedProperty: function supportedProperty(prop) {
    if (prop !== 'user-select') return false;

    if (prefix.js === 'Moz' || prefix.js === 'ms' || prefix.vendor === 'apple') {
      return prefix.css + prop;
    }

    return prop;
  }
};

// https://caniuse.com/#search=multicolumn
// https://github.com/postcss/autoprefixer/issues/491
// https://github.com/postcss/autoprefixer/issues/177

var breakPropsOld = {
  supportedProperty: function supportedProperty(prop, style) {
    if (!/^break-/.test(prop)) return false;

    if (prefix.js === 'Webkit') {
      var jsProp = "WebkitColumn" + pascalize(prop);
      return jsProp in style ? prefix.css + "column-" + prop : false;
    }

    if (prefix.js === 'Moz') {
      var _jsProp = "page" + pascalize(prop);

      return _jsProp in style ? "page-" + prop : false;
    }

    return false;
  }
};

// See https://github.com/postcss/autoprefixer/issues/324.

var inlineLogicalOld = {
  supportedProperty: function supportedProperty(prop, style) {
    if (!/^(border|margin|padding)-inline/.test(prop)) return false;
    if (prefix.js === 'Moz') return prop;
    var newProp = prop.replace('-inline', '');
    return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false;
  }
};

// Camelization is required because we can't test using.
// CSS syntax for e.g. in FF.

var unprefixed = {
  supportedProperty: function supportedProperty(prop, style) {
    return camelize(prop) in style ? prop : false;
  }
};

var prefixed = {
  supportedProperty: function supportedProperty(prop, style) {
    var pascalized = pascalize(prop); // Return custom CSS variable without prefixing.

    if (prop[0] === '-') return prop; // Return already prefixed value without prefixing.

    if (prop[0] === '-' && prop[1] === '-') return prop;
    if (prefix.js + pascalized in style) return prefix.css + prop; // Try webkit fallback.

    if (prefix.js !== 'Webkit' && "Webkit" + pascalized in style) return "-webkit-" + prop;
    return false;
  }
};

// https://caniuse.com/#search=scroll-snap

var scrollSnap = {
  supportedProperty: function supportedProperty(prop) {
    if (prop.substring(0, 11) !== 'scroll-snap') return false;

    if (prefix.js === 'ms') {
      return "" + prefix.css + prop;
    }

    return prop;
  }
};

// https://caniuse.com/#search=overscroll-behavior

var overscrollBehavior = {
  supportedProperty: function supportedProperty(prop) {
    if (prop !== 'overscroll-behavior') return false;

    if (prefix.js === 'ms') {
      return prefix.css + "scroll-chaining";
    }

    return prop;
  }
};

var propMap = {
  'flex-grow': 'flex-positive',
  'flex-shrink': 'flex-negative',
  'flex-basis': 'flex-preferred-size',
  'justify-content': 'flex-pack',
  order: 'flex-order',
  'align-items': 'flex-align',
  'align-content': 'flex-line-pack' // 'align-self' is handled by 'align-self' plugin.

}; // Support old flex spec from 2012.

var flex2012 = {
  supportedProperty: function supportedProperty(prop, style) {
    var newProp = propMap[prop];
    if (!newProp) return false;
    return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false;
  }
};

var propMap$1 = {
  flex: 'box-flex',
  'flex-grow': 'box-flex',
  'flex-direction': ['box-orient', 'box-direction'],
  order: 'box-ordinal-group',
  'align-items': 'box-align',
  'flex-flow': ['box-orient', 'box-direction'],
  'justify-content': 'box-pack'
};
var propKeys = Object.keys(propMap$1);

var prefixCss = function prefixCss(p) {
  return prefix.css + p;
}; // Support old flex spec from 2009.


var flex2009 = {
  supportedProperty: function supportedProperty(prop, style, _ref) {
    var multiple = _ref.multiple;

    if (propKeys.indexOf(prop) > -1) {
      var newProp = propMap$1[prop];

      if (!Array.isArray(newProp)) {
        return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false;
      }

      if (!multiple) return false;

      for (var i = 0; i < newProp.length; i++) {
        if (!(prefix.js + pascalize(newProp[0]) in style)) {
          return false;
        }
      }

      return newProp.map(prefixCss);
    }

    return false;
  }
};

// plugins = [
//   ...plugins,
//    breakPropsOld,
//    inlineLogicalOld,
//    unprefixed,
//    prefixed,
//    scrollSnap,
//    flex2012,
//    flex2009
// ]
// Plugins without 'noPrefill' value, going last.
// 'flex-*' plugins should be at the bottom.
// 'flex2009' going after 'flex2012'.
// 'prefixed' going after 'unprefixed'

var css_vendor_esm_plugins = [appearence, colorAdjust, mask, textOrientation, transform, transition, writingMode, userSelect, breakPropsOld, inlineLogicalOld, unprefixed, prefixed, scrollSnap, overscrollBehavior, flex2012, flex2009];
var propertyDetectors = css_vendor_esm_plugins.filter(function (p) {
  return p.supportedProperty;
}).map(function (p) {
  return p.supportedProperty;
});
var noPrefill = css_vendor_esm_plugins.filter(function (p) {
  return p.noPrefill;
}).reduce(function (a, p) {
  a.push.apply(a, _toConsumableArray(p.noPrefill));
  return a;
}, []);

var el;
var css_vendor_esm_cache = {};

if (dist_module) {
  el = document.createElement('p'); // We test every property on vendor prefix requirement.
  // Once tested, result is cached. It gives us up to 70% perf boost.
  // http://jsperf.com/element-style-object-access-vs-plain-object
  //
  // Prefill cache with known css properties to reduce amount of
  // properties we need to feature test at runtime.
  // http://davidwalsh.name/vendor-prefix

  var computed = window.getComputedStyle(document.documentElement, '');

  for (var key$1 in computed) {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(key$1)) css_vendor_esm_cache[computed[key$1]] = computed[key$1];
  } // Properties that cannot be correctly detected using the
  // cache prefill method.


  noPrefill.forEach(function (x) {
    return delete css_vendor_esm_cache[x];
  });
}
/**
 * Test if a property is supported, returns supported property with vendor
 * prefix if required. Returns `false` if not supported.
 *
 * @param {String} prop dash separated
 * @param {Object} [options]
 * @return {String|Boolean}
 * @api public
 */


function supportedProperty(prop, options) {
  if (options === void 0) {
    options = {};
  }

  // For server-side rendering.
  if (!el) return prop; // Remove cache for benchmark tests or return property from the cache.

  if ( true && css_vendor_esm_cache[prop] != null) {
    return css_vendor_esm_cache[prop];
  } // Check if 'transition' or 'transform' natively supported in browser.


  if (prop === 'transition' || prop === 'transform') {
    options[prop] = prop in el.style;
  } // Find a plugin for current prefix property.


  for (var i = 0; i < propertyDetectors.length; i++) {
    css_vendor_esm_cache[prop] = propertyDetectors[i](prop, el.style, options); // Break loop, if value found.

    if (css_vendor_esm_cache[prop]) break;
  } // Reset styles for current property.
  // Firefox can even throw an error for invalid properties, e.g., "0".


  try {
    el.style[prop] = '';
  } catch (err) {
    return false;
  }

  return css_vendor_esm_cache[prop];
}

var cache$1 = {};
var transitionProperties = {
  transition: 1,
  'transition-property': 1,
  '-webkit-transition': 1,
  '-webkit-transition-property': 1
};
var transPropsRegExp = /(^\s*[\w-]+)|, (\s*[\w-]+)(?![^()]*\))/g;
var el$1;
/**
 * Returns prefixed value transition/transform if needed.
 *
 * @param {String} match
 * @param {String} p1
 * @param {String} p2
 * @return {String}
 * @api private
 */

function prefixTransitionCallback(match, p1, p2) {
  if (p1 === 'var') return 'var';
  if (p1 === 'all') return 'all';
  if (p2 === 'all') return ', all';
  var prefixedValue = p1 ? supportedProperty(p1) : ", " + supportedProperty(p2);
  if (!prefixedValue) return p1 || p2;
  return prefixedValue;
}

if (dist_module) el$1 = document.createElement('p');
/**
 * Returns prefixed value if needed. Returns `false` if value is not supported.
 *
 * @param {String} property
 * @param {String} value
 * @return {String|Boolean}
 * @api public
 */

function supportedValue(property, value) {
  // For server-side rendering.
  var prefixedValue = value;
  if (!el$1 || property === 'content') return value; // It is a string or a number as a string like '1'.
  // We want only prefixable values here.
  // eslint-disable-next-line no-restricted-globals

  if (typeof prefixedValue !== 'string' || !isNaN(parseInt(prefixedValue, 10))) {
    return prefixedValue;
  } // Create cache key for current value.


  var cacheKey = property + prefixedValue; // Remove cache for benchmark tests or return value from cache.

  if ( true && cache$1[cacheKey] != null) {
    return cache$1[cacheKey];
  } // IE can even throw an error in some cases, for e.g. style.content = 'bar'.


  try {
    // Test value as it is.
    el$1.style[property] = prefixedValue;
  } catch (err) {
    // Return false if value not supported.
    cache$1[cacheKey] = false;
    return false;
  } // If 'transition' or 'transition-property' property.


  if (transitionProperties[property]) {
    prefixedValue = prefixedValue.replace(transPropsRegExp, prefixTransitionCallback);
  } else if (el$1.style[property] === '') {
    // Value with a vendor prefix.
    prefixedValue = prefix.css + prefixedValue; // Hardcode test to convert "flex" to "-ms-flexbox" for IE10.

    if (prefixedValue === '-ms-flex') el$1.style[property] = '-ms-flexbox'; // Test prefixed value.

    el$1.style[property] = prefixedValue; // Return false if value not supported.

    if (el$1.style[property] === '') {
      cache$1[cacheKey] = false;
      return false;
    }
  } // Reset styles for current property.


  el$1.style[property] = ''; // Write current value to cache.

  cache$1[cacheKey] = prefixedValue;
  return cache$1[cacheKey];
}



;// CONCATENATED MODULE: ./node_modules/jss-plugin-vendor-prefixer/dist/jss-plugin-vendor-prefixer.esm.js



/**
 * Add vendor prefix to a property name when needed.
 *
 * @api public
 */

function jssVendorPrefixer() {
  function onProcessRule(rule) {
    if (rule.type === 'keyframes') {
      var atRule = rule;
      atRule.at = supportedKeyframes(atRule.at);
    }
  }

  function prefixStyle(style) {
    for (var prop in style) {
      var value = style[prop];

      if (prop === 'fallbacks' && Array.isArray(value)) {
        style[prop] = value.map(prefixStyle);
        continue;
      }

      var changeProp = false;
      var supportedProp = supportedProperty(prop);
      if (supportedProp && supportedProp !== prop) changeProp = true;
      var changeValue = false;
      var supportedValue$1 = supportedValue(supportedProp, toCssValue(value));
      if (supportedValue$1 && supportedValue$1 !== value) changeValue = true;

      if (changeProp || changeValue) {
        if (changeProp) delete style[prop];
        style[supportedProp || prop] = supportedValue$1 || value;
      }
    }

    return style;
  }

  function onProcessStyle(style, rule) {
    if (rule.type !== 'style') return style;
    return prefixStyle(style);
  }

  function onChangeValue(value, prop) {
    return supportedValue(prop, toCssValue(value)) || value;
  }

  return {
    onProcessRule: onProcessRule,
    onProcessStyle: onProcessStyle,
    onChangeValue: onChangeValue
  };
}

/* harmony default export */ const jss_plugin_vendor_prefixer_esm = (jssVendorPrefixer);

;// CONCATENATED MODULE: ./node_modules/jss-plugin-props-sort/dist/jss-plugin-props-sort.esm.js
/**
 * Sort props by length.
 */
function jssPropsSort() {
  var sort = function sort(prop0, prop1) {
    if (prop0.length === prop1.length) {
      return prop0 > prop1 ? 1 : -1;
    }

    return prop0.length - prop1.length;
  };

  return {
    onProcessStyle: function onProcessStyle(style, rule) {
      if (rule.type !== 'style') return style;
      var newStyle = {};
      var props = Object.keys(style).sort(sort);

      for (var i = 0; i < props.length; i++) {
        newStyle[props[i]] = style[props[i]];
      }

      return newStyle;
    }
  };
}

/* harmony default export */ const jss_plugin_props_sort_esm = (jssPropsSort);

;// CONCATENATED MODULE: ./node_modules/jss-preset-default/dist/jss-preset-default.esm.js













var jss_preset_default_esm_create = function create(options) {
  if (options === void 0) {
    options = {};
  }

  return {
    plugins: [jss_plugin_rule_value_function_esm(), jss_plugin_rule_value_observable_esm(options.observable), jss_plugin_template_esm(), jss_plugin_global_esm(), jss_plugin_extend_esm(), jss_plugin_nested_esm(), jss_plugin_compose_esm(), jss_plugin_camel_case_esm(), jss_plugin_default_unit_esm(options.defaultUnit), jss_plugin_expand_esm(), jss_plugin_vendor_prefixer_esm(), jss_plugin_props_sort_esm()]
  };
};

/* harmony default export */ const jss_preset_default_esm = (jss_preset_default_esm_create);

;// CONCATENATED MODULE: ./node_modules/shallow-equal/dist/index.esm.js
function shallowEqualObjects(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  var aKeys = Object.keys(objA);
  var bKeys = Object.keys(objB);
  var len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    var key = aKeys[i];

    if (objA[key] !== objB[key] || !Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
  }

  return true;
}

function shallowEqualArrays(arrA, arrB) {
  if (arrA === arrB) {
    return true;
  }

  if (!arrA || !arrB) {
    return false;
  }

  var len = arrA.length;

  if (arrB.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }

  return true;
}



;// CONCATENATED MODULE: ./node_modules/@emotion/memoize/dist/memoize.browser.esm.js
function memoize_browser_esm_memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ const memoize_browser_esm = (memoize_browser_esm_memoize);

;// CONCATENATED MODULE: ./node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js


var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var index = memoize_browser_esm(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

/* harmony default export */ const is_prop_valid_browser_esm = (index);

;// CONCATENATED MODULE: ./node_modules/css-jss/dist/css-jss.esm.js



// I have been trying to benchmark and I have seen a slow down after about 10k rules.
// Since we are in a single sheet mode, user shouldn't care about this.
var MAX_RULES_PER_SHEET = 10000;
var defaultJss = create(jss_preset_default_esm());

var createCss = function createCss(jss) {
  if (jss === void 0) {
    jss = defaultJss;
  }

  var cache = new Map();
  var ruleIndex = 0;
  var sheet;

  var getSheet = function getSheet() {
    if (!sheet || sheet.rules.index.length > MAX_RULES_PER_SHEET) {
      sheet = jss.createStyleSheet().attach();
    }

    return sheet;
  };

  function css() {
    // eslint-disable-next-line prefer-rest-params
    var args = arguments; // We can avoid the need for stringification with a babel plugin,
    // which could generate a hash at build time and add it to the object.

    var argsStr = JSON.stringify(args);
    var cached = cache.get(argsStr);
    if (cached) return cached.className;
    var flatArgs = []; // Flatten arguments which can be
    // - style objects
    // - array of style objects
    // - arrays of style objects

    for (var argIndex in args) {
      var arg = args[argIndex];

      if (!Array.isArray(arg)) {
        flatArgs.push(arg);
        continue;
      }

      for (var innerArgIndex = 0; innerArgIndex < arg.length; innerArgIndex++) {
        flatArgs.push(arg[innerArgIndex]);
      }
    }

    var mergedStyle = {};
    var labels = [];

    for (var i = 0; i < flatArgs.length; i++) {
      var style = flatArgs[i];
      if (!style) continue;
      var styleObject = style; // It can be a class name that css() has previously generated.

      if (typeof style === 'string') {
        // eslint-disable-next-line no-shadow
        var _cached = cache.get(style);

        if (_cached) {
          // eslint-disable-next-line prefer-spread
          if (_cached.labels.length) labels.push.apply(labels, _cached.labels);
          styleObject = _cached.style;
        }
      }

      if (styleObject.label && labels.indexOf(styleObject.label) === -1) labels.push(styleObject.label);
      Object.assign(mergedStyle, styleObject);
    }

    delete mergedStyle.label;
    var label = labels.length === 0 ? 'css' : labels.join('-');
    var key = label + "-" + ruleIndex++;
    getSheet().addRule(key, mergedStyle);
    var className = getSheet().classes[key];
    var cacheValue = {
      style: mergedStyle,
      labels: labels,
      className: className
    };
    cache.set(argsStr, cacheValue);
    cache.set(className, cacheValue);
    return className;
  } // For testing only.


  css.getSheet = getSheet;
  return css;
};

var css_jss_esm_css = createCss();

/* harmony default export */ const css_jss_esm = (css_jss_esm_css);


;// CONCATENATED MODULE: ./node_modules/react-jss/dist/react-jss.esm.js

















// eslint-disable-next-line no-unused-vars
var react_jss_esm_getDisplayName = function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
};

var react_jss_esm_memoize = function memoize(fn) {
  var lastArgs;
  var lastResult;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (Array.isArray(lastArgs) && args.length === lastArgs.length) {
      var isSame = true;

      for (var i = 0; i < args.length; i++) {
        if (args[i] !== lastArgs[i]) {
          isSame = false;
        }
      }

      if (isSame) {
        return lastResult;
      }
    }

    lastArgs = args;
    lastResult = fn.apply(void 0, args);
    return lastResult;
  };
};

var mergeClasses = function mergeClasses(baseClasses, additionalClasses) {
  var combinedClasses = _extends({}, baseClasses);

  for (var name in additionalClasses) {
    combinedClasses[name] = name in combinedClasses ? combinedClasses[name] + " " + additionalClasses[name] : additionalClasses[name];
  }

  return combinedClasses;
};

var JssContext = (0,external_React_.createContext)({
  classNamePrefix: '',
  disableStylesGeneration: false
});

/**
 * Global index counter to preserve source order.
 * As we create the style sheet during componentWillMount lifecycle,
 * children are handled after the parents, so the order of style elements would
 * be parent->child. It is a problem though when a parent passes a className
 * which needs to override any childs styles. StyleSheet of the child has a higher
 * specificity, because of the source order.
 * So our solution is to render sheets them in the reverse order child->sheet, so
 * that parent has a higher specificity.
 *
 * We start at [Number.MIN_SAFE_INTEGER] to always insert sheets from react-jss first before any
 * sheet which might be inserted manually by the user.
 */
var react_jss_esm_index = Number.MIN_SAFE_INTEGER || -1e9;

var getSheetIndex = function getSheetIndex() {
  return react_jss_esm_index++;
};

var defaultManagers = new Map();
var getManager = function getManager(context, managerId) {
  // If `managers` map is present in the context, we use it in order to
  // let JssProvider reset them when new response has to render server-side.
  if (context.managers) {
    if (!context.managers[managerId]) {
      context.managers[managerId] = new SheetsManager();
    }

    return context.managers[managerId];
  }

  var manager = defaultManagers.get(managerId);

  if (!manager) {
    manager = new SheetsManager();
    defaultManagers.set(managerId, manager);
  }

  return manager;
};
var manageSheet = function manageSheet(options) {
  var sheet = options.sheet,
      context = options.context,
      index = options.index,
      theme = options.theme;

  if (!sheet) {
    return;
  }

  var manager = getManager(context, index);
  manager.manage(theme);

  if (context.registry) {
    context.registry.add(sheet);
  }
};
var unmanageSheet = function unmanageSheet(options) {
  if (!options.sheet) {
    return;
  }

  var manager = getManager(options.context, options.index);
  manager.unmanage(options.theme);
};

var react_jss_esm_jss = create(jss_preset_default_esm());

var sheetsMeta = new WeakMap();
var getMeta = function getMeta(sheet) {
  return sheetsMeta.get(sheet);
};
var addMeta = function addMeta(sheet, meta) {
  sheetsMeta.set(sheet, meta);
};

// eslint-disable-next-line no-unused-vars
var getStyles = function getStyles(options) {
  var styles = options.styles;

  if (typeof styles !== 'function') {
    return styles;
  }

   false ? 0 : void 0;
  return styles(options.theme);
};

function getSheetOptions(options, link) {
  var minify;

  if (options.context.id && options.context.id.minify != null) {
    minify = options.context.id.minify;
  }

  var classNamePrefix = options.context.classNamePrefix || '';

  if (options.name && !minify) {
    classNamePrefix += options.name.replace(/\s/g, '-') + "-";
  }

  var meta = '';
  if (options.name) meta = options.name + ", ";
  meta += typeof options.styles === 'function' ? 'Themed' : 'Unthemed';
  return _extends({}, options.sheetOptions, {
    index: options.index,
    meta: meta,
    classNamePrefix: classNamePrefix,
    link: link,
    generateId: options.sheetOptions.generateId || options.context.generateId
  });
}

// eslint-disable-next-line no-unused-vars
var createStyleSheet = function createStyleSheet(options) {
  if (options.context.disableStylesGeneration) {
    return undefined;
  }

  var manager = getManager(options.context, options.index);
  var existingSheet = manager.get(options.theme);

  if (existingSheet) {
    return existingSheet;
  }

  var jss$1 = options.context.jss || react_jss_esm_jss;
  var styles = getStyles(options);
  var dynamicStyles = getDynamicStyles(styles);
  var sheet = jss$1.createStyleSheet(styles, getSheetOptions(options, dynamicStyles !== null));
  addMeta(sheet, {
    dynamicStyles: dynamicStyles,
    styles: styles
  });
  manager.add(options.theme, sheet);
  return sheet;
};
var removeDynamicRules = function removeDynamicRules(sheet, rules) {
  // Loop over each dynamic rule and remove the dynamic rule
  // We can't just remove the whole sheet as this has all of the rules for every component instance
  for (var key in rules) {
    sheet.deleteRule(rules[key]);
  }
};
var updateDynamicRules = function updateDynamicRules(data, sheet, rules) {
  // Loop over each dynamic rule and update it
  // We can't just update the whole sheet as this has all of the rules for every component instance
  for (var key in rules) {
    sheet.updateOne(rules[key], data);
  }
};
var addDynamicRules = function addDynamicRules(sheet, data) {
  var meta = getMeta(sheet);

  if (!meta) {
    return undefined;
  }

  var rules = {}; // Loop over each dynamic rule and add it to the stylesheet

  for (var key in meta.dynamicStyles) {
    var initialRuleCount = sheet.rules.index.length;
    var originalRule = sheet.addRule(key, meta.dynamicStyles[key]); // Loop through all created rules, fixes updating dynamic rules

    for (var i = initialRuleCount; i < sheet.rules.index.length; i++) {
      var rule = sheet.rules.index[i];
      sheet.updateOne(rule, data); // If it's the original rule, we need to add it by the correct key so the hook and hoc
      // can correctly concat the dynamic class with the static one

      rules[originalRule === rule ? key : rule.key] = rule;
    }
  }

  return rules;
};

var getSheetClasses = function getSheetClasses(sheet, dynamicRules) {
  if (!dynamicRules) {
    return sheet.classes;
  }

  var classes = {};
  var meta = getMeta(sheet);

  if (!meta) {
    return sheet.classes;
  }

  for (var key in meta.styles) {
    classes[key] = sheet.classes[key];

    if (key in dynamicRules) {
      classes[key] += " " + sheet.classes[dynamicRules[key].key];
    }
  }

  return classes;
};

var NoRenderer = function NoRenderer(props) {
  return props.children || null;
};

var noTheme = {};

/**
 * HOC creator function that wrapps the user component.
 *
 * `withStyles(styles, [options])(Component)`
 */
var createWithStyles = function createWithStyles(styles, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$index = _options.index,
      index = _options$index === void 0 ? getSheetIndex() : _options$index,
      theming = _options.theming,
      injectTheme = _options.injectTheme,
      sheetOptions = _objectWithoutPropertiesLoose(_options, ["index", "theming", "injectTheme"]);

  var isThemingEnabled = typeof styles === 'function';
  var ThemeConsumer = theming && theming.context.Consumer || ThemeContext.Consumer;
  return function (InnerComponent) {
    if (InnerComponent === void 0) {
      InnerComponent = NoRenderer;
    }

    var displayName = react_jss_esm_getDisplayName(InnerComponent);

    var getTheme = function getTheme(props) {
      return isThemingEnabled ? props.theme : noTheme;
    };

    var WithStyles =
    /*#__PURE__*/
    function (_React$Component) {
      _inheritsLoose(WithStyles, _React$Component);

      // $FlowFixMe[prop-missing]
      WithStyles.createState = function createState(props) {
        var sheet = createStyleSheet({
          styles: styles,
          theme: getTheme(props),
          index: index,
          name: displayName,
          context: props.jssContext,
          sheetOptions: sheetOptions
        });

        if (!sheet) {
          return {
            classes: {},
            dynamicRules: undefined,
            sheet: undefined
          };
        }

        var dynamicRules = addDynamicRules(sheet, props);
        return {
          sheet: sheet,
          dynamicRules: dynamicRules,
          classes: getSheetClasses(sheet, dynamicRules)
        };
      };

      WithStyles.manage = function manage(props, state) {
        var sheet = state.sheet;

        if (sheet) {
          manageSheet({
            sheet: sheet,
            index: index,
            context: props.jssContext,
            theme: getTheme(props)
          });
        }
      };

      WithStyles.unmanage = function unmanage(props, state) {
        var sheet = state.sheet,
            dynamicRules = state.dynamicRules;

        if (sheet) {
          unmanageSheet({
            context: props.jssContext,
            index: index,
            sheet: sheet,
            theme: getTheme(props)
          });

          if (dynamicRules) {
            removeDynamicRules(sheet, dynamicRules);
          }
        }
      };

      function WithStyles(props) {
        var _this;

        _this = _React$Component.call(this, props) || this;
        _this.mergeClassesProp = react_jss_esm_memoize(function (sheetClasses, classesProp) {
          return classesProp ? mergeClasses(sheetClasses, classesProp) : sheetClasses;
        });
        _this.state = WithStyles.createState(props);
        var registry = props.jssContext.registry;
        var sheet = _this.state.sheet;

        if (sheet && registry) {
          registry.add(sheet);
        }

        return _this;
      }

      var _proto = WithStyles.prototype;

      _proto.componentDidMount = function componentDidMount() {
        var props = this.props,
            state = this.state;

        if (props && state) {
          WithStyles.manage(props, state);
        }
      };

      _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (isThemingEnabled && this.props.theme !== prevProps.theme) {
          var newState = WithStyles.createState(this.props);
          WithStyles.manage(this.props, newState);
          WithStyles.unmanage(prevProps, prevState); // eslint-disable-next-line react/no-did-update-set-state

          this.setState(newState);
        } else if (this.state.sheet && this.state.dynamicRules) {
          // Only update the rules when we don't generate a new sheet
          updateDynamicRules(this.props, this.state.sheet, this.state.dynamicRules);
        }
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        WithStyles.unmanage(this.props, this.state);
      };

      _proto.render = function render() {
        var _this$props = this.props,
            innerRef = _this$props.innerRef,
            jssContext = _this$props.jssContext,
            theme = _this$props.theme,
            classes = _this$props.classes,
            rest = _objectWithoutPropertiesLoose(_this$props, ["innerRef", "jssContext", "theme", "classes"]);

        var sheetClasses = this.state.classes;

        var props = _extends({}, rest, {
          classes: this.mergeClassesProp(sheetClasses, classes)
        });

        if (innerRef) props.ref = innerRef;
        if (injectTheme) props.theme = theme;
        return (0,external_React_.createElement)(InnerComponent, props);
      };

      return WithStyles;
    }(external_React_.Component);

    WithStyles.displayName = "WithStyles(" + displayName + ")";
    WithStyles.defaultProps = _extends({}, InnerComponent.defaultProps);
    var JssContextSubscriber = (0,external_React_.forwardRef)(function (props, ref) {
      return (0,external_React_.createElement)(JssContext.Consumer, null, function (context) {
        if (isThemingEnabled || injectTheme) {
          return (0,external_React_.createElement)(ThemeConsumer, null, function (theme) {
            return (0,external_React_.createElement)(WithStyles, _extends({
              innerRef: ref,
              theme: theme
            }, props, {
              jssContext: context
            }));
          });
        }

        return (0,external_React_.createElement)(WithStyles, _extends({
          innerRef: ref
        }, props, {
          jssContext: context,
          theme: noTheme
        }));
      });
    });
    JssContextSubscriber.displayName = "JssContextSubscriber(" + displayName + ")"; // $FlowFixMe[prop-missing] - React's types should allow custom static properties on component.

    JssContextSubscriber.InnerComponent = InnerComponent;
    return hoist_non_react_statics_cjs_default()(JssContextSubscriber, InnerComponent);
  };
};

var useEffectOrLayoutEffect = dist_module ? external_React_.useLayoutEffect : external_React_.useEffect;
var noTheme$1 = {};

var createUseStyles = function createUseStyles(styles, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$index = _options.index,
      index = _options$index === void 0 ? getSheetIndex() : _options$index,
      theming = _options.theming,
      name = _options.name,
      sheetOptions = _objectWithoutPropertiesLoose(_options, ["index", "theming", "name"]);

  var ThemeContext$1 = theming && theming.context || ThemeContext;
  var useTheme = typeof styles === 'function' ? // $FlowFixMe[incompatible-return]
  function () {
    return (0,external_React_.useContext)(ThemeContext$1) || noTheme$1;
  } : // $FlowFixMe[incompatible-return]
  function () {
    return noTheme$1;
  };
  return function useStyles(data) {
    var isFirstMount = (0,external_React_.useRef)(true);
    var context = (0,external_React_.useContext)(JssContext);
    var theme = useTheme();

    var _React$useMemo = (0,external_React_.useMemo)(function () {
      var newSheet = createStyleSheet({
        context: context,
        styles: styles,
        name: name,
        theme: theme,
        index: index,
        sheetOptions: sheetOptions
      });
      var newDynamicRules = newSheet ? addDynamicRules(newSheet, data) : null;

      if (newSheet) {
        manageSheet({
          index: index,
          context: context,
          sheet: newSheet,
          theme: theme
        });
      }

      return [newSheet, newDynamicRules];
    }, [context, theme]),
        sheet = _React$useMemo[0],
        dynamicRules = _React$useMemo[1];

    useEffectOrLayoutEffect(function () {
      // We only need to update the rules on a subsequent update and not in the first mount
      if (sheet && dynamicRules && !isFirstMount.current) {
        updateDynamicRules(data, sheet, dynamicRules);
      }
    }, [data]);
    useEffectOrLayoutEffect(function () {
      return (// cleanup only
        function () {
          if (sheet) {
            unmanageSheet({
              index: index,
              context: context,
              sheet: sheet,
              theme: theme
            });
          }

          if (sheet && dynamicRules) {
            removeDynamicRules(sheet, dynamicRules);
          }
        }
      );
    }, [sheet]);
    var classes = sheet && dynamicRules ? getSheetClasses(sheet, dynamicRules) : {};
    (0,external_React_.useDebugValue)(classes);
    (0,external_React_.useDebugValue)(theme === noTheme$1 ? 'No theme' : theme);
    (0,external_React_.useEffect)(function () {
      isFirstMount.current = false;
    });
    return classes;
  };
};

var initialContext = {};

var JssProvider =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(JssProvider, _React$Component);

  function JssProvider() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.managers = {};

    _this.createContext = function (parentContext, prevContext) {
      if (prevContext === void 0) {
        prevContext = initialContext;
      }

      var _this$props = _this.props,
          registry = _this$props.registry,
          classNamePrefix = _this$props.classNamePrefix,
          jss = _this$props.jss,
          generateId = _this$props.generateId,
          disableStylesGeneration = _this$props.disableStylesGeneration,
          media = _this$props.media,
          id = _this$props.id;

      var context = _extends({}, parentContext);

      if (registry) {
        context.registry = registry; // This way we identify a new request on the server, because user will create
        // a new Registry instance for each.

        if (registry !== _this.registry) {
          // We reset managers because we have to regenerate all sheets for the new request.
          _this.managers = {};
          _this.registry = registry;
        }
      }

      context.managers = _this.managers;

      if (id !== undefined) {
        context.id = id;
      }

      if (generateId !== undefined) {
        context.generateId = generateId;
      } else if (!context.generateId || !prevContext || context.id !== prevContext.id) {
        context.generateId = createGenerateId(context.id);
      }

      if (classNamePrefix) {
        context.classNamePrefix = (context.classNamePrefix || '') + classNamePrefix;
      }

      if (media !== undefined) {
        context.media = media;
      }

      if (jss) {
        context.jss = jss;
      }

      if (disableStylesGeneration !== undefined) {
        context.disableStylesGeneration = disableStylesGeneration;
      }

      if (prevContext && shallowEqualObjects(prevContext, context)) {
        return prevContext;
      }

      return context;
    };

    _this.prevContext = void 0;
    _this.generateId = void 0;
    _this.registry = void 0;

    _this.renderProvider = function (parentContext) {
      var children = _this.props.children;

      var context = _this.createContext(parentContext, _this.prevContext);

      _this.prevContext = context;
      return (0,external_React_.createElement)(JssContext.Provider, {
        value: context
      }, children);
    };

    return _this;
  }

  var _proto = JssProvider.prototype;

  _proto.render = function render() {
    return (0,external_React_.createElement)(JssContext.Consumer, null, this.renderProvider);
  };

  return JssProvider;
}(external_React_.Component);

JssProvider.propTypes = {
  registry: prop_types_default().instanceOf(SheetsRegistry),
  jss: prop_types_default().instanceOf(jss_esm.constructor),
  generateId: (prop_types_default()).func,
  classNamePrefix: (prop_types_default()).string,
  disableStylesGeneration: (prop_types_default()).bool,
  children: (prop_types_default()).node.isRequired,
  media: (prop_types_default()).string,
  id: prop_types_default().shape({
    minify: (prop_types_default()).bool
  })
};

// eslint-disable-next-line no-unused-vars
var parseStyles = function parseStyles(args) {
  var dynamicStyles = [];
  var staticStyle;
  var labels = []; // Not using ...rest to optimize perf.

  for (var key in args) {
    var style = args[key];
    if (!style) continue;

    if (typeof style === 'function') {
      dynamicStyles.push(style);
    } else {
      if (!staticStyle) staticStyle = {};
      Object.assign(staticStyle, style);

      if (staticStyle.label) {
        if (labels.indexOf(staticStyle.label) === -1) labels.push(staticStyle.label);
      }
    }
  }

  var styles = {};
  var label = labels.length === 0 ? 'sc' : labels.join('-');

  if (staticStyle) {
    // Label should not leak to the core.
    if ('label' in staticStyle) delete staticStyle.label;
    styles[label] = staticStyle;
  } // When there is only one function rule, we don't need to wrap it.


  if (dynamicStyles.length === 1) {
    styles['scd'] = dynamicStyles[0];
  } // We create a new function rule which will call all other function rules
  // and merge the styles they return.


  if (dynamicStyles.length > 1) {
    styles['scd'] = function (props) {
      var merged = {};

      for (var i = 0; i < dynamicStyles.length; i++) {
        var dynamicStyle = dynamicStyles[i](props);
        if (dynamicStyle) Object.assign(merged, dynamicStyle);
      }

      return merged;
    };
  }

  return {
    styles: styles,
    label: label
  };
};

var shouldForwardPropSymbol = Symbol('react-jss-styled');

var getShouldForwardProp = function getShouldForwardProp(tagOrComponent, options) {
  var shouldForwardProp = options.shouldForwardProp; // $FlowFixMe[invalid-computed-prop]
  // $FlowFixMe[incompatible-type]

  var childShouldForwardProp = tagOrComponent[shouldForwardPropSymbol];
  var finalShouldForwardProp = shouldForwardProp || childShouldForwardProp;

  if (shouldForwardProp && childShouldForwardProp) {
    finalShouldForwardProp = function finalShouldForwardProp(prop) {
      return childShouldForwardProp(prop) && shouldForwardProp(prop);
    };
  }

  return finalShouldForwardProp;
};

var getChildProps = function getChildProps(props, shouldForwardProp, isTag) {
  var childProps = {};

  for (var prop in props) {
    if (shouldForwardProp) {
      if (shouldForwardProp(prop) === true) {
        childProps[prop] = props[prop];
      }

      continue;
    } // We don't want to pass non-dom props to the DOM.


    if (isTag) {
      if (is_prop_valid_browser_esm(prop)) {
        childProps[prop] = props[prop];
      }

      continue;
    }

    childProps[prop] = props[prop];
  }

  return childProps;
};

// eslint-disable-next-line no-unused-vars
var configureStyled = function configureStyled(tagOrComponent, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      theming = _options.theming;
  var isTag = typeof tagOrComponent === 'string';
  var ThemeContext$1 = theming ? theming.context : ThemeContext;
  var shouldForwardProp = getShouldForwardProp(tagOrComponent, options);

  var _options2 = options,
      _ = _options2.shouldForwardProp,
      hookOptions = _objectWithoutPropertiesLoose(_options2, ["shouldForwardProp"]);

  return function createStyledComponent() {
    // eslint-disable-next-line prefer-rest-params
    var _parseStyles = parseStyles(arguments),
        styles = _parseStyles.styles,
        label = _parseStyles.label;

    var useStyles = createUseStyles(styles, hookOptions);

    var Styled = function Styled(props) {
      var as = props.as,
          className = props.className;
      var theme = (0,external_React_.useContext)(ThemeContext$1);
      var propsWithTheme = Object.assign({
        theme: theme
      }, props);
      var classes = useStyles(propsWithTheme);
      var childProps = getChildProps(props, shouldForwardProp, isTag);
      var classNames = ((classes[label] || classes.sc || '') + " " + (classes.scd || '')).trim();
      childProps.className = className ? className + " " + classNames : classNames;

      if (!isTag && shouldForwardProp) {
        // $FlowFixMe[invalid-computed-prop] we are not supposed to attach random properties to component functions.
        // $FlowFixMe[incompatible-use]
        tagOrComponent[shouldForwardPropSymbol] = shouldForwardProp;
      }

      if (isTag && as) {
        return (0,external_React_.createElement)(as, childProps);
      }

      return (0,external_React_.createElement)(tagOrComponent, childProps);
    };

    return Styled;
  };
};

/* eslint-disable prefer-rest-params, prefer-spread */
var react_jss_esm_create = function create(css) {
  if (css === void 0) {
    css = css_jss_esm;
  }

  return function createElement(type, props
  /* :: , ..._args: any */
  ) {
    var args = arguments;

    if (props && props.css) {
      var className = css(props.css);
      var newProps = Object.assign({}, props);
      newProps.className = props.className ? props.className + " " + className : className;
      delete newProps.css;
      args[1] = newProps;
    } // $FlowFixMe[missing-arg]


    return external_React_.createElement.apply(undefined, args);
  };
};
var createElement = react_jss_esm_create();

/* harmony default export */ const react_jss_esm = (createWithStyles);



/***/ }),

/***/ 7121:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => /* binding */ es
});

;// CONCATENATED MODULE: ./node_modules/symbol-observable/es/ponyfill.js
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

;// CONCATENATED MODULE: ./node_modules/symbol-observable/es/index.js
/* module decorator */ module = __webpack_require__.hmd(module);
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof __webpack_require__.g !== 'undefined') {
  root = __webpack_require__.g;
} else if (true) {
  root = module;
} else {}

var result = symbolObservablePonyfill(root);
/* harmony default export */ const es = (result);


/***/ }),

/***/ 3404:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const template_1 = __webpack_require__(9297);
class FaceDisplay {
    constructor(facePackages, imgClassName = '', imgInlineStyle = '', leftBracket = ':', rightBracket = ':') {
        this._faceMap = new Map();
        this._className = imgClassName;
        this._inlineStyle = imgInlineStyle;
        this.LEFT_BRACKET = leftBracket;
        this.RIGHT_BRACKET = rightBracket;
        for (const pack of facePackages) {
            for (const face of pack.faces) {
                this._faceMap.set(`${pack.id}.${face.id}`, face.url);
            }
        }
    }
    render(onElement) {
        const raw = onElement.innerHTML, result = this.renderHTML(raw);
        if (result !== raw)
            onElement.innerHTML = result;
    }
    renderHTML(html) {
        return template_1.processTemplate(this.LEFT_BRACKET, this.RIGHT_BRACKET, this.replacePlaceHolder.bind(this), html);
    }
    replacePlaceHolder(placeHolder) {
        const url = this._faceMap.get(placeHolder);
        if (url) {
            return `<img class="${this._className}" src="${url}" style="${this._inlineStyle} max-height:6vh;" alt="${this.LEFT_BRACKET}${placeHolder}${this.RIGHT_BRACKET}"/>`;
        }
        else {
            return `${this.LEFT_BRACKET}${placeHolder}${this.RIGHT_BRACKET}`;
        }
    }
}
exports.default = FaceDisplay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZURpc3BsYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmFjZS1wYWNrL3NyYy9GYWNlRGlzcGxheS9GYWNlRGlzcGxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLCtDQUFrRDtBQUVsRCxNQUFxQixXQUFXO0lBTTVCLFlBQVksWUFBZ0MsRUFBRSxlQUF1QixFQUFFLEVBQUUsaUJBQXlCLEVBQUUsRUFBRSxjQUFzQixHQUFHLEVBQUUsZUFBdUIsR0FBRztRQUhuSixhQUFRLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUE7UUFJN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUE7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUE7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUE7UUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUE7UUFDakMsS0FBSyxNQUFNLElBQUksSUFBSSxZQUFZLEVBQUU7WUFDN0IsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUN2RDtTQUNKO0lBQ0wsQ0FBQztJQUNELE1BQU0sQ0FBQyxTQUFnQztRQUNuQyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzdELElBQUksTUFBTSxLQUFHLEdBQUc7WUFBRSxTQUFTLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQTtJQUNsRCxDQUFDO0lBQ0QsVUFBVSxDQUFDLElBQVk7UUFDbkIsT0FBTywwQkFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzNHLENBQUM7SUFDRCxrQkFBa0IsQ0FBQyxXQUFtQjtRQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUMxQyxJQUFJLEdBQUcsRUFBRTtZQUNMLE9BQU8sZUFBZSxJQUFJLENBQUMsVUFBVSxVQUFVLEdBQUcsWUFBWSxJQUFJLENBQUMsWUFBWSwwQkFBMEIsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsS0FBSyxDQUFBO1NBQ3JLO2FBQU07WUFDSCxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1NBQ25FO0lBQ0wsQ0FBQztDQUNKO0FBaENELDhCQWdDQyJ9

/***/ }),

/***/ 3962:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFaceFullUrl = void 0;
const template_1 = __webpack_require__(9297);
function getFaceFullUrl(face, parentPack) {
    const _face = typeof face == "string" ? { id: face } : face;
    const _process = (ph) => template_1.processTemplate('{', '}', (str) => {
        if (str == 'id') {
            return _face.id;
        }
        else if (str in parentPack) {
            return parentPack[str];
        }
        else {
            return `{${str}}`;
        }
    }, ph);
    const { url, ...other_key } = _face;
    return {
        ...other_key, url: _process(url && _process(url) || parentPack.default)
    };
}
exports.getFaceFullUrl = getFaceFullUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZVBhY2thZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmFjZS1wYWNrL3NyYy9GYWNlUGFja2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBa0Q7QUFxRGxELFNBQWdCLGNBQWMsQ0FBQyxJQUFnQixFQUFFLFVBQTJDO0lBQ3hGLE1BQU0sS0FBSyxHQUFHLE9BQU8sSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtJQUMzRCxNQUFNLFFBQVEsR0FBRyxDQUFDLEVBQVUsRUFBRSxFQUFFLENBQUMsMEJBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDL0QsSUFBRyxHQUFHLElBQUUsSUFBSSxFQUFDO1lBQ1QsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFBO1NBQ2xCO2FBQUssSUFBSSxHQUFHLElBQUksVUFBVSxFQUFDO1lBQ3hCLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ3pCO2FBQUk7WUFDRCxPQUFPLElBQUksR0FBRyxHQUFHLENBQUE7U0FDcEI7SUFDTCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDTixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsU0FBUyxFQUFFLEdBQUcsS0FBSyxDQUFBO0lBQ25DLE9BQU87UUFDSCxHQUFHLFNBQVMsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQztLQUMxRSxDQUFBO0FBQ0wsQ0FBQztBQWZELHdDQWVDIn0=

/***/ }),

/***/ 4150:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.preprocessFacePack = exports.importExternalFacePacks = void 0;
const importJSON_1 = __webpack_require__(3658);
const FacePackage_1 = __webpack_require__(3962);
async function importExternalFacePacks(url) {
    const json = await importJSON_1.importJSON(url);
    if (json) {
        preprocessFacePack(json);
        return json;
    }
    throw new Error(`Try to load FacePacks from '${url}' failed.`);
}
exports.importExternalFacePacks = importExternalFacePacks;
function preprocessFacePack(facepacks) {
    for (const pack of facepacks) {
        pack.faces = pack.faces.map((face) => FacePackage_1.getFaceFullUrl(face, pack));
    }
}
exports.preprocessFacePack = preprocessFacePack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZVBhY2tzSW1wb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmFjZS1wYWNrL3NyYy9GYWNlUGFja3NJbXBvcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxrREFBOEM7QUFDOUMsK0NBQThFO0FBQ3ZFLEtBQUssVUFBVSx1QkFBdUIsQ0FBQyxHQUFXO0lBQ3JELE1BQU0sSUFBSSxHQUE2QixNQUFNLHVCQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDNUQsSUFBSSxJQUFJLEVBQUU7UUFDTixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN4QixPQUFPLElBQTBCLENBQUE7S0FDcEM7SUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixHQUFHLFdBQVcsQ0FBQyxDQUFBO0FBQ2xFLENBQUM7QUFQRCwwREFPQztBQUNELFNBQWdCLGtCQUFrQixDQUFDLFNBQW1DO0lBQ2xFLEtBQUssTUFBTSxJQUFJLElBQUksU0FBUyxFQUFFO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLDRCQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7S0FDcEU7QUFDTCxDQUFDO0FBSkQsZ0RBSUMifQ==

/***/ }),

/***/ 3352:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(9704);
const FaceSelector_1 = __importDefault(__webpack_require__(4835));
const react_dom_1 = __webpack_require__(7196);
const react_1 = __importDefault(__webpack_require__(3804));
class FaceSelectorDeployer {
    constructor(props) {
        var _a;
        this._displayed = true;
        this._loadContent = false;
        this._popcorn = props.popcorn;
        this._tooltip = (_a = props.tooltip) !== null && _a !== void 0 ? _a : document.documentElement.appendChild(document.createElement('div'));
        this._onFaceSelected = props.onFaceSelected || function () { };
        this._facePacks = props.facePackages;
        this._popperOptions = props.popperOptions;
        this._style = props.style;
        this._className = props.className;
        this._peakPopperOptions = props.peakPopperOptions;
    }
    /**
     *渲染FaceSelector
     *
     * @author KotoriK
     * @memberof FaceSelectorDeployer
     */
    render() {
        this._updateSelector();
        this._popper = core_1.createPopper(this._popcorn, this._tooltip, this._popperOptions);
        this._popcorn.addEventListener('click', this._handlePopcornClick.bind(this));
        return this;
    }
    _updateSelector() {
        react_dom_1.render(react_1.default.createElement(FaceSelector_1.default, { facePacks: this._facePacks, colCount: 4, handleHide: this.hide.bind(this), onFaceSelected: this._onFaceSelected, peakPopperOptions: this._peakPopperOptions, style: this._style, className: this._className, loadContent: this._loadContent }), this._tooltip);
    }
    _handlePopcornClick(e) {
        this.hide();
    }
    hide() {
        if (this._displayed) {
            this._tooltip.setAttribute("hidden", "hidden");
            this._displayed = false;
        }
        else {
            this._tooltip.removeAttribute("hidden");
            this._popper.update();
            if (!this._loadContent)
                this._loadContent = true, this._updateSelector();
            this._displayed = true;
        }
    }
    /**
     * 解除FaceSelector在tooltip上的挂载
     *
     * @author KotoriK
     * @memberof FaceSelectorDeployer
     */
    unload() {
        react_dom_1.unmountComponentAtNode(this._tooltip);
        this._popcorn.removeEventListener('click', this._handlePopcornClick);
        return this;
    }
}
exports.default = FaceSelectorDeployer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZVNlbGVjdG9yRGVwbG95ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmFjZS1wYWNrL3NyYy9GYWNlU2VsZWN0b3IvRmFjZVNlbGVjdG9yRGVwbG95ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EseUNBQXdFO0FBQ3hFLDRFQUFrRTtBQUVsRSx5Q0FBMkQ7QUFDM0Qsa0RBQTBCO0FBeUIxQixNQUFxQixvQkFBb0I7SUFVckMsWUFBWSxLQUFnQzs7UUFVcEMsZUFBVSxHQUFZLElBQUksQ0FBQTtRQUMxQixpQkFBWSxHQUFZLEtBQUssQ0FBQTtRQVZqQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUE7UUFDN0IsSUFBSSxDQUFDLFFBQVEsU0FBRyxLQUFLLENBQUMsT0FBTyxtQ0FBSSxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7UUFDcEcsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsY0FBYyxJQUFJLGNBQWMsQ0FBQyxDQUFBO1FBQzlELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQTtRQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUE7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFBO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQTtRQUNqQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFBO0lBQ3JELENBQUM7SUFHRDs7Ozs7T0FLRztJQUNILE1BQU07UUFDRixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdFLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUNPLGVBQWU7UUFDbkIsa0JBQU0sQ0FBQyw4QkFBQyxzQkFBWSxJQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUMxRixjQUFjLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQ2hGLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFDTyxtQkFBbUIsQ0FBQyxDQUFhO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNmLENBQUM7SUFDRCxJQUFJO1FBQ0EsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQTtTQUMxQjthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVk7Z0JBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1lBQ3hFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1NBQ3pCO0lBQ0wsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0gsTUFBTTtRQUNGLGtDQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyRSxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7Q0FDSjtBQWhFRCx1Q0FnRUMifQ==

/***/ }),

/***/ 4835:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.GenericStyle = exports.Global = void 0;
const react_1 = __importStar(__webpack_require__(3804));
const TableView_1 = __importDefault(__webpack_require__(538));
const Tabs_1 = __importDefault(__webpack_require__(7809));
const Peak_1 = __importDefault(__webpack_require__(4896));
const style_1 = __importStar(__webpack_require__(648));
const clsx_1 = __importDefault(__webpack_require__(6010));
const react_popper_1 = __webpack_require__(8934);
const Global = react_1.createContext({});
exports.Global = Global;
/**
 *表情包选择器的完整主体
 *
 * @author KotoriK
 * @export
 * @param { children }
 * @returns
 */
function GenericStyle({ children }) {
    return children(style_1.default());
}
exports.GenericStyle = GenericStyle;
function FaceSelector({ peakPopperOptions, facePacks, style, className, colCount, onFaceSelected, handleHide, loadContent }) {
    const [_nowPackagePos, setPos] = react_1.useState(0);
    const [isShowPeak, setShowPeak] = react_1.useState(false);
    const [peak_url, set_url] = react_1.useState();
    const [peak_caption, set_caption] = react_1.useState();
    const [main, setMain] = react_1.useState();
    const [peak, setPeak] = react_1.useState();
    const head = react_1.useRef();
    const body = react_1.useRef();
    const { styles, update } = react_popper_1.usePopper(main, peak, peakPopperOptions);
    const handleFaceSelected = react_1.useCallback((face_pos) => {
        const nowPackage = facePacks[_nowPackagePos];
        onFaceSelected(nowPackage, nowPackage.faces[face_pos]);
        handleHide();
    }, [handleHide, onFaceSelected, facePacks, _nowPackagePos]);
    react_1.useEffect(() => {
        if (loadContent)
            body.current.style.height = style_1.mainHeight - head.current.clientHeight + 'px';
    }, [loadContent]);
    let nowPackagePos = _nowPackagePos;
    const maxPos = facePacks.length - 1;
    if (nowPackagePos > maxPos)
        nowPackagePos = maxPos; //防止prop发生改动带来越界
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(GenericStyle, null, classes => (react_1.default.createElement("div", { ref: setMain, style: { ...style }, className: clsx_1.default(classes.borderShadow, className, classes.bgWhiteBlur, classes.main) },
            react_1.default.createElement(Tabs_1.default, { facePackages: facePacks, onSelected: (pos) => setPos(pos), selectedPos: nowPackagePos, ref: head }),
            react_1.default.createElement(Global.Provider, { value: react_1.useMemo(() => {
                    return {
                        showPeak: (imgUrl, imgCaption) => {
                            set_url(imgUrl);
                            set_caption(imgCaption);
                            setShowPeak(true);
                            if (update)
                                update();
                        },
                        hidePeak: () => setShowPeak(false)
                    };
                }, [set_url, set_caption, setShowPeak, update]) }, loadContent ? react_1.default.createElement(TableView_1.default, { facePackage: facePacks[nowPackagePos], colCount: colCount, onImageSelected: handleFaceSelected, ref: body }) : null)))),
        react_1.default.createElement(Peak_1.default, { imgCaption: peak_caption, imgUrl: peak_url, ref: setPeak, show: isShowPeak, style: styles.popper })));
}
exports.default = FaceSelector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZVNlbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhY2UtcGFjay9zcmMvRmFjZVNlbGVjdG9yL2NvbXBvbmVudC9GYWNlU2VsZWN0b3IudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBK0Y7QUFDL0YsNERBQW9DO0FBRXBDLGtEQUEwQjtBQUMxQixrREFBMEI7QUFHMUIsa0RBQXVEO0FBQ3ZELGdEQUF3QjtBQUN4QiwrQ0FBd0M7QUFtQ3hDLE1BQU0sTUFBTSxHQUFzQyxxQkFBYSxDQUFDLEVBQXdCLENBQUMsQ0FBQTtBQUNoRix3QkFBTTtBQUNmOzs7Ozs7O0dBT0c7QUFDSCxTQUFnQixZQUFZLENBQUMsRUFBRSxRQUFRLEVBQTBHO0lBQzdJLE9BQU8sUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUE7QUFDdEMsQ0FBQztBQUZELG9DQUVDO0FBQ0QsU0FBd0IsWUFBWSxDQUFDLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUMsV0FBVyxFQUFxQjtJQUN4SixNQUFNLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxHQUFHLGdCQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDNUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsR0FBRyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pELE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsZ0JBQVEsRUFBVSxDQUFBO0lBQzlDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLEdBQUcsZ0JBQVEsRUFBVSxDQUFBO0lBQ3RELE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsZ0JBQVEsRUFBa0IsQ0FBQTtJQUNsRCxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLGdCQUFRLEVBQWtCLENBQUE7SUFDbEQsTUFBTSxJQUFJLEdBQUcsY0FBTSxFQUFxQixDQUFBO0lBQ3hDLE1BQU0sSUFBSSxHQUFHLGNBQU0sRUFBa0IsQ0FBQTtJQUNyQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLHdCQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO0lBQ25FLE1BQU0sa0JBQWtCLEdBQUcsbUJBQVcsQ0FBQyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtRQUN4RCxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDNUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDdEQsVUFBVSxFQUFFLENBQUE7SUFDaEIsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtJQUMzRCxpQkFBUyxDQUFDLEdBQUcsRUFBRTtRQUNaLElBQUcsV0FBVztZQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxrQkFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtJQUM1RixDQUFDLEVBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO0lBQ2hCLElBQUksYUFBYSxHQUFHLGNBQWMsQ0FBQTtJQUNsQyxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNO1FBQUUsYUFBYSxHQUFHLE1BQU0sQ0FBQSxDQUFDLGdCQUFnQjtJQUNuRSxPQUFPLENBQUM7UUFDSiw4QkFBQyxZQUFZLFFBQ1IsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUNSLHVDQUFLLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQztZQUN2SCw4QkFBQyxjQUFJLElBQUMsWUFBWSxFQUFFLFNBQVMsRUFDekIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsSUFBSSxHQUFJO1lBQy9FLDhCQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUMsS0FBSyxFQUFFLGVBQU8sQ0FBQyxHQUFHLEVBQUU7b0JBQ2pDLE9BQU87d0JBQ0gsUUFBUSxFQUFFLENBQUMsTUFBYyxFQUFFLFVBQWtCLEVBQUUsRUFBRTs0QkFDN0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBOzRCQUNmLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQTs0QkFDdkIsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBOzRCQUNqQixJQUFJLE1BQU07Z0NBQUUsTUFBTSxFQUFFLENBQUE7d0JBQ3hCLENBQUM7d0JBQ0QsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7cUJBQ2YsQ0FBQTtnQkFDM0IsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFDM0MsV0FBVyxDQUFDLENBQUMsQ0FBQyw4QkFBQyxtQkFBUyxJQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFDOUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUksQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUM3QyxDQUNoQixDQUFDLENBQ0E7UUFDZiw4QkFBQyxjQUFJLElBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBSSxDQUMzRyxDQUFDLENBQUE7QUFDUixDQUFDO0FBN0NELCtCQTZDQyJ9

/***/ }),

/***/ 2519:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importStar(__webpack_require__(3804));
const Indicator_1 = __importStar(__webpack_require__(7532));
const FaceSelector_1 = __webpack_require__(4835);
/**
 * 处理表情显示
 *
 * @author KotoriK
 * @param {FaceViewProps} props
 * @returns
 */
function FaceView(props) {
    const [loaded, setLoaded] = react_1.useState(false);
    const [showIndicator, setShowIndicator] = react_1.useState({ level: Indicator_1.IndicateLevel.PRELOAD });
    const global = react_1.useContext(FaceSelector_1.Global);
    const handleError = react_1.useCallback(() => {
        setLoaded(false);
        setShowIndicator({ level: Indicator_1.IndicateLevel.ERROR });
    }, []);
    const handleLoad = react_1.useCallback(() => {
        setShowIndicator(null);
        setLoaded(true);
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        showIndicator && react_1.default.createElement(Indicator_1.default, Object.assign({}, showIndicator, { style: { ...props.style, transition: "opacity 2s ease" }, className: props.className })),
        react_1.default.createElement("img", { src: props.src, onClick: (e) => props.onClick(e, props.face_pos), onPointerEnter: () => global.showPeak(props.src, props.alt), onPointerOut: () => global.hidePeak(), alt: props.alt, style: { ...props.style }, className: props.className, onLoad: handleLoad, hidden: !loaded, onError: handleError })));
}
exports.default = FaceView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFjZVZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmFjZS1wYWNrL3NyYy9GYWNlU2VsZWN0b3IvY29tcG9uZW50L0ZhY2VWaWV3LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwrQ0FBaUU7QUFDakUseURBQXVFO0FBQ3ZFLGlEQUF1QztBQVF2Qzs7Ozs7O0dBTUc7QUFDSCxTQUF3QixRQUFRLENBQUMsS0FBb0I7SUFDakQsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsR0FBRyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzNDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxnQkFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLHlCQUFhLENBQUMsT0FBTyxFQUFvQixDQUFDLENBQUE7SUFDdEcsTUFBTSxNQUFNLEdBQUcsa0JBQVUsQ0FBQyxxQkFBTSxDQUFDLENBQUE7SUFDakMsTUFBTSxXQUFXLEdBQUcsbUJBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDakMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2hCLGdCQUFnQixDQUFDLEVBQUUsS0FBSyxFQUFFLHlCQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUNwRCxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUE7SUFDTCxNQUFNLFVBQVUsR0FBRyxtQkFBVyxDQUFDLEdBQUcsRUFBRTtRQUNoQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN0QixTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbkIsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ0wsT0FBTyxDQUNIO1FBQ0ssYUFBYSxJQUFJLDhCQUFDLG1CQUFTLG9CQUFLLGFBQWEsSUFBRSxLQUFLLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLElBQUk7UUFDeEksdUNBQUssR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQ2YsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQ2hELGNBQWMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUMzRCxZQUFZLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUM1RyxNQUFNLEVBQUUsVUFBVSxFQUNsQixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQ2YsT0FBTyxFQUFFLFdBQVcsR0FBSSxDQUM3QixDQUNOLENBQUE7QUFDTCxDQUFDO0FBeEJELDJCQXdCQyJ9

/***/ }),

/***/ 7532:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IndicateLevel = void 0;
const react_1 = __importDefault(__webpack_require__(3804));
const SVG_PREFIX = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/";
const SVG_PRELOAD = SVG_PREFIX + "Ripple-1.3s-237px.svg";
/* const SVG_WARNING = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/warning.svg"
const SVG_INFO = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/info.svg" */
const SVG_ERROR = SVG_PREFIX + "error.svg";
var IndicateLevel;
(function (IndicateLevel) {
    IndicateLevel[IndicateLevel["PRELOAD"] = 0] = "PRELOAD";
    /*     INFO ,
        WARNING ,  */
    IndicateLevel[IndicateLevel["ERROR"] = 1] = "ERROR";
})(IndicateLevel = exports.IndicateLevel || (exports.IndicateLevel = {}));
const IndicateLevelSVG = [SVG_PRELOAD, /* SVG_WARNING,SVG_INFO, */ SVG_ERROR];
/**
 *一个指示错误的组件
 *
 * @author KotoriK
 * @export
 * @param {IndicatorProps} props
 * @returns
 */
const Indicator = ({ level, description, style, className }) => react_1.default.createElement("img", { src: IndicateLevelSVG[level], alt: description, style: style, className: className });
exports.default = Indicator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kaWNhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhY2UtcGFjay9zcmMvRmFjZVNlbGVjdG9yL2NvbXBvbmVudC9JbmRpY2F0b3IudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUUxQixNQUFNLFVBQVUsR0FBRywwREFBMEQsQ0FBQTtBQUM3RSxNQUFNLFdBQVcsR0FBRyxVQUFVLEdBQUcsdUJBQXVCLENBQUE7QUFDeEQ7c0ZBQ3NGO0FBQ3RGLE1BQU0sU0FBUyxHQUFHLFVBQVUsR0FBRyxXQUFXLENBQUE7QUFDMUMsSUFBWSxhQUtYO0FBTEQsV0FBWSxhQUFhO0lBQ3JCLHVEQUFPLENBQUE7SUFDUDtxQkFDaUI7SUFDakIsbURBQUssQ0FBQTtBQUNULENBQUMsRUFMVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUt4QjtBQUNELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxXQUFXLEVBQUMsMkJBQTJCLENBQUEsU0FBUyxDQUFDLENBQUE7QUFLM0U7Ozs7Ozs7R0FPRztBQUNILE1BQU0sU0FBUyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQWlCLEVBQUUsRUFBRSxDQUFDLHVDQUFLLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsR0FBSSxDQUFBO0FBQ3RLLGtCQUFlLFNBQVMsQ0FBQSJ9

/***/ }),

/***/ 4896:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
const react_1 = __importStar(__webpack_require__(3804));
const react_jss_1 = __webpack_require__(3532);
const clsx_1 = __importDefault(__webpack_require__(6010));
const style_1 = __importDefault(__webpack_require__(648));
const useStyles = react_jss_1.createUseStyles({
    figCaption: {
        textAlign: "center", backgroundColor: 'rgba(255,255,255,0.65)'
    },
    hr: {
        marginTop: 0, marginBottom: 0
    }
});
const Peak = react_1.forwardRef((props, ref) => {
    const classes = useStyles(), generic = style_1.default();
    return (react_1.default.createElement("figure", { style: { display: props.show ? 'block' : 'none', ...props.style }, className: clsx_1.default(generic.borderShadow, props.className, generic.bgWhiteBlur), ref: ref },
        react_1.default.createElement("img", { src: props.imgUrl, height: 200 }),
        react_1.default.createElement("hr", { className: classes.hr }),
        react_1.default.createElement("figcaption", { className: clsx_1.default(classes.figCaption, generic.bgWhiteBlur) }, props.imgCaption)));
});
exports.default = Peak;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVhay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYWNlLXBhY2svc3JjL0ZhY2VTZWxlY3Rvci9jb21wb25lbnQvUGVhay50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBRTFDLHlDQUEyQztBQUMzQyxnREFBdUI7QUFDdkIscURBQXVDO0FBT3ZDLE1BQU0sU0FBUyxHQUFHLDJCQUFlLENBQUM7SUFDOUIsVUFBVSxFQUFFO1FBQ1IsU0FBUyxFQUFFLFFBQVEsRUFBRyxlQUFlLEVBQUUsd0JBQXdCO0tBQ2xFO0lBQ0QsRUFBRSxFQUFFO1FBQ0EsU0FBUyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQztLQUNoQztDQUNKLENBQUMsQ0FBQTtBQUNGLE1BQU0sSUFBSSxHQUFHLGtCQUFVLENBQTRCLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQzlELE1BQU0sT0FBTyxHQUFHLFNBQVMsRUFBRSxFQUFFLE9BQU8sR0FBRyxlQUFlLEVBQUUsQ0FBQTtJQUN4RCxPQUFPLENBQUMsMENBQVEsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUM3RSxTQUFTLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUc7UUFDckYsdUNBQUssR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBSTtRQUN2QyxzQ0FBSSxTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQUUsR0FBSTtRQUM3Qiw4Q0FBWSxTQUFTLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFHLEtBQUssQ0FBQyxVQUFVLENBQWMsQ0FDL0YsQ0FBQyxDQUFDO0FBQ2YsQ0FBQyxDQUFDLENBQUE7QUFDRixrQkFBZSxJQUFJLENBQUEifQ==

/***/ }),

/***/ 1507:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(3804));
/**
 *选项卡的单个标签
 *
 * @author KotoriK
 * @export
 * @param {TabProps} props
 * @returns
 */
function Tab(props) {
    return (react_1.default.createElement("option", { selected: props.selected, style: { ...props.style }, className: props.className, value: props.pos }, props.name));
}
exports.default = Tab;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhY2UtcGFjay9zcmMvRmFjZVNlbGVjdG9yL2NvbXBvbmVudC9UYWIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBCO0FBTzFCOzs7Ozs7O0dBT0c7QUFDSCxTQUF3QixHQUFHLENBQUMsS0FBZTtJQUN2QyxPQUFPLENBQ0gsMENBQVEsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQ25GLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxJQUNmLEtBQUssQ0FBQyxJQUFJLENBQ04sQ0FDWixDQUFBO0FBQ0wsQ0FBQztBQVBELHNCQU9DIn0=

/***/ }),

/***/ 538:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
const react_1 = __importStar(__webpack_require__(3804));
const FaceView_1 = __importDefault(__webpack_require__(2519));
const react_jss_1 = __webpack_require__(3532);
const useStyles = react_jss_1.createUseStyles({
    td: {
        textAlign: "center", border: "1pt solid #888", padding: "1.5px"
    },
    pic: { width: "40px", height: "40px" },
    wrap: {
        overflowY: "auto", overflowX: 'hidden'
    }
});
const TableView = react_1.forwardRef(function TableView({ facePackage, onImageSelected, colCount }, ref) {
    const classes = useStyles();
    const facePackId = facePackage.id;
    const handleImageClick = react_1.useCallback((e, pos) => {
        onImageSelected(pos);
    }, [onImageSelected]);
    const faces = react_1.useMemo(() => facePackage.faces.map((value, index) => react_1.default.createElement("td", { key: facePackId + index, className: classes.td },
        react_1.default.createElement(FaceView_1.default, { src: value.url, alt: value.id, face_pos: index, className: classes.pic, onClick: handleImageClick }))), [facePackage]);
    const rows = react_1.useMemo(() => {
        const rowCount = Math.ceil((faces.length / colCount));
        const array = new Array(rowCount);
        for (let i = 0; i < rowCount; i++) {
            const start = i * colCount;
            array[i] = react_1.default.createElement("tr", { key: facePackId + 'r' + i }, faces.slice(start, start + colCount));
        }
        return array;
    }, [faces, colCount]);
    return react_1.default.createElement("div", { className: classes.wrap, ref: ref },
        react_1.default.createElement("table", null,
            react_1.default.createElement("tbody", null, rows)));
});
exports.default = TableView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ZhY2UtcGFjay9zcmMvRmFjZVNlbGVjdG9yL2NvbXBvbmVudC9UYWJsZVZpZXcudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFnRTtBQUVoRSwwREFBaUM7QUFFakMseUNBQTRDO0FBb0I1QyxNQUFNLFNBQVMsR0FBRywyQkFBZSxDQUFDO0lBQzlCLEVBQUUsRUFBRTtRQUNBLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxPQUFPO0tBQ2xFO0lBQ0QsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO0lBQ3RDLElBQUksRUFBRTtRQUNGLFNBQVMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVE7S0FDekM7Q0FDSixDQUFDLENBQUE7QUFDRixNQUFNLFNBQVMsR0FBRyxrQkFBVSxDQUN4QixTQUFTLFNBQVMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRztJQUM5RCxNQUFNLE9BQU8sR0FBRyxTQUFTLEVBQUUsQ0FBQTtJQUMzQixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFBO0lBQ2pDLE1BQU0sZ0JBQWdCLEdBQUcsbUJBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFXLEVBQUUsRUFBRTtRQUNwRCxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDeEIsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQTtJQUNyQixNQUFNLEtBQUssR0FBRyxlQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FDbkUsc0NBQUksR0FBRyxFQUFFLFVBQVUsR0FBRyxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUFFO1FBQzlDLDhCQUFDLGtCQUFRLElBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEdBQUksQ0FDOUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtJQUN0QixNQUFNLElBQUksR0FBdUIsZUFBTyxDQUFDLEdBQUcsRUFBRTtRQUMxQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFBO1FBQ3JELE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFjLFFBQVEsQ0FBQyxDQUFBO1FBQzlDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0IsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQTtZQUMxQixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsc0NBQUksR0FBRyxFQUFFLFVBQVUsR0FBQyxHQUFHLEdBQUMsQ0FBQyxJQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBTSxDQUFBO1NBQ3BGO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFDckIsT0FBTyx1Q0FBSyxTQUFTLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRztRQUN6QztZQUNJLDZDQUNLLElBQUksQ0FDRCxDQUNKLENBQ04sQ0FBQztBQUNYLENBQUMsQ0FDSixDQUFBO0FBQ0Qsa0JBQWUsU0FBUyxDQUFBIn0=

/***/ }),

/***/ 7809:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
const react_1 = __importStar(__webpack_require__(3804));
const Tab_1 = __importDefault(__webpack_require__(1507));
const react_jss_1 = __webpack_require__(3532);
const clsx_1 = __importDefault(__webpack_require__(6010));
const style_1 = __importDefault(__webpack_require__(648));
const useStyles = react_jss_1.createUseStyles({
    root: {
        width: "100%", border: 0, fontWeight: 'bold'
    }
});
/**
 * 选项卡的一行标签（一行Tab
 *
 * @author KotoriK
 */
const Tabs = react_1.forwardRef(function Tabs(props, ref) {
    return (react_1.default.createElement("select", { ref: ref, className: clsx_1.default(useStyles().root, style_1.default().bgWhiteBlur), onChange: (e) => props.onSelected(e.target.value) }, react_1.useMemo(() => props.facePackages.map((value, index) => react_1.default.createElement(Tab_1.default, { key: value.id, pos: index, name: value.name, selected: index === props.selectedPos })), [props.facePackages])));
});
exports.default = Tabs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYWNlLXBhY2svc3JjL0ZhY2VTZWxlY3Rvci9jb21wb25lbnQvVGFicy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQW9EO0FBQ3BELGdEQUF3QjtBQUV4Qix5Q0FBNEM7QUFDNUMsZ0RBQXdCO0FBQ3hCLHFEQUF1QztBQU12QyxNQUFNLFNBQVMsR0FBRywyQkFBZSxDQUFDO0lBQzlCLElBQUksRUFBRTtRQUNGLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTTtLQUMvQztDQUNKLENBQUMsQ0FBQTtBQUNGOzs7O0dBSUc7QUFDSCxNQUFNLElBQUksR0FDTixrQkFBVSxDQUNOLFNBQVMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHO0lBQ3BCLE9BQU8sQ0FDSCwwQ0FBUSxHQUFHLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxjQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQVksQ0FBQyxJQUN2SSxlQUFPLENBQUMsR0FBRSxFQUFFLENBQUEsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyw4QkFBQyxhQUFHLElBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFDbEcsUUFBUSxFQUFFLEtBQUssS0FBSyxLQUFLLENBQUMsV0FBVyxHQUFJLENBQzVDLEVBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FDbEIsQ0FDWixDQUFBO0FBQ0wsQ0FBQyxDQUFDLENBQUE7QUFFVixrQkFBZSxJQUFJLENBQUEifQ==

/***/ }),

/***/ 648:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mainHeight = void 0;
const react_jss_1 = __webpack_require__(3532);
const mainHeight = 325;
exports.mainHeight = mainHeight;
const useGenericStyle = react_jss_1.createUseStyles({
    borderShadow: {
        boxShadow: '2px 2px 15px #888888',
        border: '0.5px #888888 solid',
        zIndex: 999,
    },
    bgWhiteBlur: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(3px)'
    }, main: {
        padding: '2px', width: 200, height: mainHeight
    }
});
exports.default = useGenericStyle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmFjZS1wYWNrL3NyYy9GYWNlU2VsZWN0b3Ivc3R5bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUNBQTRDO0FBQzVDLE1BQU0sVUFBVSxHQUFDLEdBQUcsQ0FBQTtBQWVaLGdDQUFVO0FBZGxCLE1BQU0sZUFBZSxHQUFHLDJCQUFlLENBQUM7SUFDcEMsWUFBWSxFQUFFO1FBQ1YsU0FBUyxFQUFFLHNCQUFzQjtRQUNqQyxNQUFNLEVBQUUscUJBQXFCO1FBQzdCLE1BQU0sRUFBRSxHQUFHO0tBQ2Q7SUFDRCxXQUFXLEVBQUM7UUFDUixlQUFlLEVBQUMsdUJBQXVCO1FBQ3ZDLGNBQWMsRUFBQyxXQUFXO0tBQzdCLEVBQUMsSUFBSSxFQUFDO1FBQ0gsT0FBTyxFQUFFLEtBQUssRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxVQUFVO0tBQzdDO0NBQ0osQ0FBQyxDQUFBO0FBQ0Ysa0JBQWUsZUFBZSxDQUFBIn0=

/***/ }),

/***/ 3658:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.importJSON = void 0;
async function importJSON(url) {
    return fetch(url, { method: "GET" }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error(`Fetch Error:Return HTTP ${response.status}, ${response.statusText}`);
        }
    });
}
exports.importJSON = importJSON;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0SlNPTi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mYWNlLXBhY2svc3JjL3V0aWwvaW1wb3J0SlNPTi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBTyxLQUFLLFVBQVUsVUFBVSxDQUFDLEdBQVU7SUFDdkMsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFDLEVBQUU7UUFDOUMsSUFBRyxRQUFRLENBQUMsRUFBRSxFQUFDO1lBQ1gsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDekI7YUFBSTtZQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLFFBQVEsQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUE7U0FDeEY7SUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFSRCxnQ0FRQyJ9

/***/ }),

/***/ 9297:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.processTemplate = void 0;
/* export default class Template {
    LEFT_BRACKET: string
    RIGHT_BRACKET: string
    constructor(left_bracket: string, right_bracket: string, replacePlaceHolder: (str: string) => Promise<string>) {
        this.replacePlaceHolder = replacePlaceHolder
        this.LEFT_BRACKET = left_bracket
        this.RIGHT_BRACKET = right_bracket
    }
    replacePlaceHolder: (str: string) => Promise<string>
    async process(text: string) {
        let inBracket = false
        let newText = ""
        let bracketContent = ""
        for (const char of text) {
            switch (char) {
                case this.LEFT_BRACKET:
                    if (inBracket) {
                        if (this.LEFT_BRACKET == this.RIGHT_BRACKET) {
                            inBracket = false
                            newText += await this.replacePlaceHolder(bracketContent)
                            bracketContent = ""
                        } else {
                            inBracket = false
                            newText += `${this.LEFT_BRACKET}${bracketContent}${this.LEFT_BRACKET}`
                            bracketContent = ""
                        }
                    } else {
                        inBracket = true
                    }
                    break
                case this.RIGHT_BRACKET:
                    if (inBracket) {
                        inBracket = false
                        newText += await this.replacePlaceHolder(bracketContent)
                        bracketContent = ""
                    } else {
                        newText += char
                    }
                    break
                default:
                    if (inBracket) {
                        bracketContent += char
                    } else {
                        newText += char
                    }
            }
        }
        if (bracketContent != '') {
            newText += this.LEFT_BRACKET + bracketContent
        }
        return newText
    }
} */
function processTemplate(left_bracket, right_bracket, replacePlaceHolder, str) {
    let inBracket = false, newText = "", bracketContent = "";
    for (const char of str) {
        switch (char) {
            case left_bracket:
                if (inBracket) {
                    if (left_bracket == right_bracket) {
                        inBracket = false;
                        newText += replacePlaceHolder(bracketContent);
                        bracketContent = "";
                    }
                    else {
                        inBracket = false;
                        newText += `${left_bracket}${bracketContent}${left_bracket}`;
                        bracketContent = "";
                    }
                }
                else {
                    inBracket = true;
                }
                break;
            case right_bracket:
                if (inBracket) {
                    inBracket = false;
                    newText += replacePlaceHolder(bracketContent);
                    bracketContent = "";
                }
                else {
                    newText += char;
                }
                break;
            default:
                if (inBracket) {
                    bracketContent += char;
                }
                else {
                    newText += char;
                }
        }
    }
    if (bracketContent != '') {
        newText += left_bracket + bracketContent;
        inBracket = false;
    }
    if (inBracket) {
        newText += left_bracket;
    }
    return newText;
}
exports.processTemplate = processTemplate;
//@ts-ignore
window.PROCESS = processTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZmFjZS1wYWNrL3NyYy91dGlsL3RlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0RJO0FBQ0osU0FBZ0IsZUFBZSxDQUFDLFlBQW9CLEVBQUUsYUFBcUIsRUFBRSxrQkFBMkMsRUFBRSxHQUFXO0lBQ2pJLElBQUksU0FBUyxHQUFHLEtBQUssRUFBRSxPQUFPLEdBQUcsRUFBRSxFQUFFLGNBQWMsR0FBRyxFQUFFLENBQUE7SUFDeEQsS0FBSyxNQUFNLElBQUksSUFBSSxHQUFHLEVBQUU7UUFDcEIsUUFBUSxJQUFJLEVBQUU7WUFDVixLQUFLLFlBQVk7Z0JBQ2IsSUFBSSxTQUFTLEVBQUU7b0JBQ1gsSUFBSSxZQUFZLElBQUksYUFBYSxFQUFFO3dCQUMvQixTQUFTLEdBQUcsS0FBSyxDQUFBO3dCQUNqQixPQUFPLElBQUksa0JBQWtCLENBQUMsY0FBYyxDQUFDLENBQUE7d0JBQzdDLGNBQWMsR0FBRyxFQUFFLENBQUE7cUJBQ3RCO3lCQUFNO3dCQUNILFNBQVMsR0FBRyxLQUFLLENBQUE7d0JBQ2pCLE9BQU8sSUFBSSxHQUFHLFlBQVksR0FBRyxjQUFjLEdBQUcsWUFBWSxFQUFFLENBQUE7d0JBQzVELGNBQWMsR0FBRyxFQUFFLENBQUE7cUJBQ3RCO2lCQUNKO3FCQUFNO29CQUNILFNBQVMsR0FBRyxJQUFJLENBQUE7aUJBQ25CO2dCQUNELE1BQUs7WUFDVCxLQUFLLGFBQWE7Z0JBQ2QsSUFBSSxTQUFTLEVBQUU7b0JBQ1gsU0FBUyxHQUFHLEtBQUssQ0FBQTtvQkFDakIsT0FBTyxJQUFJLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFBO29CQUM3QyxjQUFjLEdBQUcsRUFBRSxDQUFBO2lCQUN0QjtxQkFBTTtvQkFDSCxPQUFPLElBQUksSUFBSSxDQUFBO2lCQUNsQjtnQkFDRCxNQUFLO1lBQ1Q7Z0JBQ0ksSUFBSSxTQUFTLEVBQUU7b0JBQ1gsY0FBYyxJQUFJLElBQUksQ0FBQTtpQkFDekI7cUJBQU07b0JBQ0gsT0FBTyxJQUFJLElBQUksQ0FBQTtpQkFDbEI7U0FDUjtLQUNKO0lBQ0QsSUFBSSxjQUFjLElBQUksRUFBRSxFQUFFO1FBQ3RCLE9BQU8sSUFBSSxZQUFZLEdBQUcsY0FBYyxDQUFBO1FBQ3hDLFNBQVMsR0FBQyxLQUFLLENBQUE7S0FDbEI7SUFDRCxJQUFHLFNBQVMsRUFBQztRQUNULE9BQU8sSUFBRSxZQUFZLENBQUE7S0FDeEI7SUFDRCxPQUFPLE9BQU8sQ0FBQTtBQUNsQixDQUFDO0FBNUNELDBDQTRDQztBQUNELFlBQVk7QUFDWixNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQSJ9

/***/ }),

/***/ 719:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importStar(__webpack_require__(3804));
const react_popper_1 = __webpack_require__(8934);
__webpack_require__(4412);
function FloatButton({ children, eleFloatOn, opacity }) {
    const [buttonOpacity, setOpacity] = react_1.useState(0.3);
    const [showChildren, setShowChildren] = react_1.useState(false);
    const [top, setTop] = react_1.useState(0);
    const [left, setLeft] = react_1.useState(0);
    const root = react_1.useRef();
    const childRef = react_1.useRef();
    const arrow = react_1.useRef();
    const { styles, attributes, update } = react_popper_1.usePopper(root.current, childRef.current, { placement: 'bottom', modifiers: [{ name: 'arrow', options: { element: arrow.current } }] });
    const refFloat = react_1.useRef();
    const refresh = () => {
        const ele = refFloat.current, computedLeft = ele.offsetLeft + ele.offsetWidth, innerWidth = document.body.clientWidth;
        setTop(ele.offsetTop);
        setLeft((computedLeft > innerWidth ? (innerWidth - 10) : computedLeft) - 30);
    };
    react_1.useEffect(refresh, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.cloneElement(eleFloatOn, {
            ref: refFloat, onRendered: refresh
        }),
        react_1.default.createElement("div", { ref: root, style: { top, left, opacity: buttonOpacity }, className: 'btn-float opacity-trans', onPointerOver: () => {
                setOpacity(1);
            }, onPointerOut: () => {
                if (!showChildren)
                    setOpacity(0.3);
            }, onClick: (e) => {
                e.stopPropagation();
                setShowChildren(!showChildren);
                update();
            } }),
        react_1.default.createElement("div", Object.assign({ className: 'popper opacity-trans', style: styles.popper }, attributes.popper, { ref: childRef, "data-show": showChildren && opacity, onClick: (e) => { e.stopPropagation(); } }),
            react_1.default.createElement("div", { ref: arrow }),
            children)));
}
exports.default = FloatButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxvYXRCdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2ltcGxlLWltZy1tb2RhbC9zcmMvRmxvYXRCdXR0b24udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUF5RTtBQUV6RSwrQ0FBd0M7QUFDeEMsNkJBQTBCO0FBTTFCLFNBQXdCLFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFvQjtJQUNuRixNQUFNLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxHQUFHLGdCQUFRLENBQVMsR0FBRyxDQUFDLENBQUE7SUFDekQsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxnQkFBUSxDQUFVLEtBQUssQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsZ0JBQVEsQ0FBUyxDQUFDLENBQUMsQ0FBQTtJQUN6QyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLGdCQUFRLENBQVMsQ0FBQyxDQUFDLENBQUE7SUFDM0MsTUFBTSxJQUFJLEdBQUcsY0FBTSxFQUFFLENBQUE7SUFDckIsTUFBTSxRQUFRLEdBQUcsY0FBTSxFQUFFLENBQUE7SUFDekIsTUFBTSxLQUFLLEdBQUcsY0FBTSxFQUFFLENBQUE7SUFDdEIsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsd0JBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLEVBQzNFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2pHLE1BQU0sUUFBUSxHQUFHLGNBQU0sRUFBZSxDQUFBO0lBQ3RDLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRTtRQUNqQixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLFlBQVksR0FBRyxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFBO1FBQ3JILE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDckIsT0FBTyxDQUFDLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0lBQ2hGLENBQUMsQ0FBQTtJQUNELGlCQUFTLENBQUMsT0FBTyxFQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3JCLE9BQU8sQ0FDSDtRQUNLLG9CQUFZLENBQUMsVUFBVSxFQUFFO1lBQ3RCLEdBQUcsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU87U0FDckMsQ0FBQztRQUNGLHVDQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLEVBQUUsU0FBUyxFQUFDLHlCQUF5QixFQUM3RixhQUFhLEVBQUUsR0FBRyxFQUFFO2dCQUNoQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDakIsQ0FBQyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZO29CQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN0QyxDQUFDLEVBQ0QsT0FBTyxFQUFFLENBQUMsQ0FBK0MsRUFBRSxFQUFFO2dCQUN6RCxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUE7Z0JBQ25CLGVBQWUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUM5QixNQUFNLEVBQUUsQ0FBQTtZQUNaLENBQUMsR0FDSDtRQUNGLHFEQUFLLFNBQVMsRUFBQyxzQkFBc0IsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sSUFBTSxVQUFVLENBQUMsTUFBTSxJQUM3RSxHQUFHLEVBQUUsUUFBUSxlQUFhLFlBQVksSUFBSSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUEsQ0FBQyxDQUFDO1lBQzFGLHVDQUFLLEdBQUcsRUFBRSxLQUFLLEdBQUk7WUFDbEIsUUFBUSxDQUNQLENBQ1AsQ0FDTixDQUFBO0FBQ0wsQ0FBQztBQXpDRCw4QkF5Q0MifQ==

/***/ }),

/***/ 3826:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.GPSTagTranslate = exports.translateGPSTag = exports.GPSToReadble = exports.GPSAltitudeRef = void 0;
const react_1 = __importStar(__webpack_require__(3804));
const MapModal_1 = __importDefault(__webpack_require__(2554));
const react_dom_1 = __importDefault(__webpack_require__(7196));
__webpack_require__(7510);
var GPSAltitudeRef;
(function (GPSAltitudeRef) {
    GPSAltitudeRef[GPSAltitudeRef["above"] = 0] = "above";
    GPSAltitudeRef[GPSAltitudeRef["below"] = 1] = "below";
})(GPSAltitudeRef = exports.GPSAltitudeRef || (exports.GPSAltitudeRef = {}));
function GPSToReadble(info) {
    return {
        altitude: '海拔' + (info.altitudeRef == 0 ? '' : '-') + info.altitude,
        latitude: (info.latitudeRef == 'N' ? '北纬' : '南纬') + info.latitude,
        longitude: (info.longitudeRef == 'W' ? '西经' : '东经') + info.longitude,
        map: (react_1.default.createElement(ShowMap, { lat: info.latitude, lng: info.longitude })),
        speed: `${info.speed} ${info.speedRef}`
    };
}
exports.GPSToReadble = GPSToReadble;
function translateGPSTag(obj) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => {
        return [exports.GPSTagTranslate.get(key), value];
    }));
}
exports.translateGPSTag = translateGPSTag;
exports.GPSTagTranslate = new Map([
    ['altitude', '高度'], ['latitude', '纬度'], ['longitude', '经度'], ['speed', '速度'], ['map', '地图']
]);
function ShowMap({ lat, lng }) {
    const [opacity, setOpacity] = react_1.useState(false);
    react_1.useEffect(() => {
        const node = document.createElement('div');
        document.body.appendChild(node);
        react_dom_1.default
            .render(react_1.default.createElement(MapModal_1.default, { opacity: opacity, handleOpacityChange: setOpacity, mapSrc: `http://api.map.baidu.com/geocoder?location=${lat},${lng}&output=html&coord_type=wgs84&src=webapp.baidu.openAPIdemo` }), node);
        return () => {
            react_dom_1.default.unmountComponentAtNode(node);
            document.body.removeChild(node);
        };
    });
    return (react_1.default.createElement("span", { className: "button-map", onClick: () => { setOpacity(true); } }, "\u663E\u793A\u62CD\u6444\u5730\u70B9"));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BTLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NpbXBsZS1pbWctbW9kYWwvc3JjL0dQUy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFrRDtBQUNsRCwwREFBaUM7QUFDakMsMERBQWdDO0FBQ2hDLHlCQUFzQjtBQWtCdEIsSUFBWSxjQUVYO0FBRkQsV0FBWSxjQUFjO0lBQ3RCLHFEQUFPLENBQUE7SUFBRSxxREFBTyxDQUFBO0FBQ3BCLENBQUMsRUFGVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUV6QjtBQUNELFNBQWdCLFlBQVksQ0FBQyxJQUFhO0lBQ3RDLE9BQU87UUFDSCxRQUFRLEVBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVE7UUFDbkUsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVE7UUFDakUsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVM7UUFDcEUsR0FBRyxFQUFFLENBQUMsOEJBQUMsT0FBTyxJQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFJLENBQUM7UUFDM0QsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO0tBQzFDLENBQUE7QUFDTCxDQUFDO0FBUkQsb0NBUUM7QUFDRCxTQUFnQixlQUFlLENBQUMsR0FBb0I7SUFDaEQsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtRQUMvRCxPQUFPLENBQUMsdUJBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDNUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNQLENBQUM7QUFKRCwwQ0FJQztBQUNZLFFBQUEsZUFBZSxHQUFHLElBQUksR0FBRyxDQUFpQjtJQUNuRCxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7Q0FDOUYsQ0FBQyxDQUFBO0FBQ0YsU0FBUyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0lBQ3pCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEdBQUcsZ0JBQVEsQ0FBVSxLQUFLLENBQUMsQ0FBQTtJQUN0RCxpQkFBUyxDQUFDLEdBQUcsRUFBRTtRQUNOLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDL0MsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDL0IsbUJBQVE7YUFDSCxNQUFNLENBQUMsOEJBQUMsa0JBQVEsSUFDakIsT0FBTyxFQUFFLE9BQU8sRUFDaEIsbUJBQW1CLEVBQUUsVUFBVSxFQUMzQixNQUFNLEVBQUUsOENBQThDLEdBQUcsSUFBSSxHQUFHLDREQUE0RCxHQUFHLEVBQzdILElBQUksQ0FBQyxDQUFBO1FBQ2YsT0FBTyxHQUFHLEVBQUU7WUFDUixtQkFBUSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25DLENBQUMsQ0FBQTtJQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxDQUFDLHdDQUFNLFNBQVMsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUMsMkNBQWUsQ0FDckYsQ0FBQTtBQUNMLENBQUMifQ==

/***/ }),

/***/ 2910:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImageModalWithEXIF = void 0;
const react_1 = __importDefault(__webpack_require__(3804));
const ImageView_1 = __importDefault(__webpack_require__(335));
const MetaPannel_1 = __importDefault(__webpack_require__(3451));
const FloatButton_1 = __importDefault(__webpack_require__(719));
const Modal_1 = __webpack_require__(3298);
function ImageModalWithEXIF({ imgSrc, handleOpacityChange, opacity }) {
    const newOpacity = imgSrc && opacity;
    const key = imgSrc ? (imgSrc.split('/').pop()) : '#';
    return (react_1.default.createElement(Modal_1.Modal, { opacity: newOpacity, handleOpacityChange: () => handleOpacityChange(false, imgSrc) },
        react_1.default.createElement(FloatButton_1.default, { key: key, eleFloatOn: react_1.default.createElement(ImageView_1.default, { src: imgSrc, width: '100%', height: '100%', opacity: newOpacity }), opacity: newOpacity },
            react_1.default.createElement(MetaPannel_1.default, { imgSrc: imgSrc }))));
}
exports.ImageModalWithEXIF = ImageModalWithEXIF;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2VNb2RhbFdpdGhFWElGLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NpbXBsZS1pbWctbW9kYWwvc3JjL0ltYWdlTW9kYWxXaXRoRVhJRi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLDREQUFvQztBQUNwQyw4REFBc0M7QUFDdEMsZ0VBQXdDO0FBQ3hDLG1DQUE0QztBQU01QyxTQUFnQixrQkFBa0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQW1CO0lBQ3hGLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxPQUFPLENBQUE7SUFDcEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO0lBQ3BELE9BQU8sQ0FBQyw4QkFBQyxhQUFLLElBQUMsT0FBTyxFQUFFLFVBQVUsRUFDOUIsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQztRQUM3RCw4QkFBQyxxQkFBVyxJQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUM3Qiw4QkFBQyxtQkFBUyxJQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBRSxVQUFVLEdBQUcsRUFBRSxPQUFPLEVBQUUsVUFBVTtZQUM5Riw4QkFBQyxvQkFBVSxJQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUksQ0FDcEIsQ0FDVixDQUNQLENBQUE7QUFDTCxDQUFDO0FBWEQsZ0RBV0MifQ==

/***/ }),

/***/ 335:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
const react_1 = __importStar(__webpack_require__(3804));
const LazyLoad_1 = __importDefault(__webpack_require__(279));
/**
 * 显示图片
 * @author KotoriK
 * @export
 * @param props
 * @returns
 */
const ImageView = react_1.forwardRef(function ImageView(props, ref) {
    return (react_1.default.createElement(LazyLoad_1.default, Object.assign({}, props),
        react_1.default.createElement("img", { ref: ref, src: props.src, referrerPolicy: props.refererPolicy, alt: props.alt })));
});
exports.default = ImageView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2VWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NpbXBsZS1pbWctbW9kYWwvc3JjL0ltYWdlVmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBQzFDLDBEQUFxRDtBQU1yRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLFNBQVMsR0FBRyxrQkFBVSxDQUFtQyxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FBRztJQUN4RixPQUFPLENBQ0gsOEJBQUMsa0JBQVEsb0JBQUssS0FBSztRQUNmLHVDQUFLLEdBQUcsRUFBRSxHQUFHLEVBQ1QsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQ2QsY0FBYyxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLEdBQ3JELENBQ0ssQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQyxDQUFBO0FBQ0Ysa0JBQWUsU0FBUyxDQUFBIn0=

/***/ }),

/***/ 2453:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IndicateLevel = void 0;
const react_1 = __importDefault(__webpack_require__(3804));
const SVG_PRELOAD = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/Ripple-1.3s-237px.svg";
/* const SVG_WARNING = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/warning.svg"
const SVG_INFO = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/info.svg" */
const SVG_ERROR = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/error.svg";
var IndicateLevel;
(function (IndicateLevel) {
    IndicateLevel[IndicateLevel["PRELOAD"] = 0] = "PRELOAD";
    /*     INFO ,
        WARNING ,  */
    IndicateLevel[IndicateLevel["ERROR"] = 1] = "ERROR";
})(IndicateLevel = exports.IndicateLevel || (exports.IndicateLevel = {}));
const IndicateLevelSVG = [SVG_PRELOAD, /* SVG_WARNING,SVG_INFO, */ SVG_ERROR];
/**
 *一个指示错误的组件
 *
 * @author KotoriK
 * @export
 * @param {IndicatorProps} props
 * @returns
 */
function Indicator(props) {
    return (react_1.default.createElement("img", { src: IndicateLevelSVG[props.level], alt: props.description, style: props.style }));
}
exports.default = Indicator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kaWNhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NpbXBsZS1pbWctbW9kYWwvc3JjL0luZGljYXRvci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTBCO0FBRTFCLE1BQU0sV0FBVyxHQUFHLCtFQUErRSxDQUFBO0FBQ25HO3NGQUNzRjtBQUN0RixNQUFNLFNBQVMsR0FBRyxtRUFBbUUsQ0FBQTtBQUNyRixJQUFZLGFBS1g7QUFMRCxXQUFZLGFBQWE7SUFDckIsdURBQU8sQ0FBQTtJQUNQO3FCQUNpQjtJQUNqQixtREFBSyxDQUFBO0FBQ1QsQ0FBQyxFQUxXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBS3hCO0FBQ0QsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFdBQVcsRUFBQywyQkFBMkIsQ0FBQSxTQUFTLENBQUMsQ0FBQTtBQU0zRTs7Ozs7OztHQU9HO0FBQ0gsU0FBd0IsU0FBUyxDQUFDLEtBQXFCO0lBQ25ELE9BQU8sQ0FDSCx1Q0FBSyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxHQUFJLENBQzFGLENBQUE7QUFDTCxDQUFDO0FBSkQsNEJBSUMifQ==

/***/ }),

/***/ 279:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importStar(__webpack_require__(3804));
const Indicator_1 = __importStar(__webpack_require__(2453));
/**
 * 显示图片
 * @author KotoriK
 * @export
 * @param props
 * @returns
 */
function LazyLoad({ children, refForward, className, style, onRendered, opacity }) {
    const [showIndicator, setShowIndicator] = react_1.useState({ level: Indicator_1.IndicateLevel.PRELOAD });
    const [loaded, setLoaded] = react_1.useState(false);
    const nextOpacity = opacity && loaded;
    react_1.useEffect(onRendered || (() => { }));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        showIndicator && react_1.default.createElement(Indicator_1.default, Object.assign({}, showIndicator, { style: { ...style, transition: "opacity 2s ease" }, className: className })),
        react_1.Children.map(children, (child) => {
            return react_1.cloneElement(child, {
                ref: refForward,
                style: { ...child.props.style, visibility: nextOpacity ? 'visible' : 'hidden', opacity: nextOpacity ? 1 : 0 },
                onLoad: () => {
                    setShowIndicator(null);
                    setLoaded(true);
                },
                onError: () => {
                    setShowIndicator({ level: Indicator_1.IndicateLevel.ERROR });
                    setLoaded(false);
                }
            });
        })));
}
exports.default = LazyLoad;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF6eUxvYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2ltcGxlLWltZy1tb2RhbC9zcmMvTGF6eUxvYWQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtDQUEwRjtBQUMxRix5REFBdUU7QUFPdkU7Ozs7OztHQU1HO0FBQ0gsU0FBd0IsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQWlCO0lBQ3pHLE1BQU0sQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxnQkFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLHlCQUFhLENBQUMsT0FBTyxFQUFvQixDQUFDLENBQUE7SUFDdEcsTUFBTSxDQUFDLE1BQU0sRUFBQyxTQUFTLENBQUMsR0FBQyxnQkFBUSxDQUFVLEtBQUssQ0FBQyxDQUFBO0lBQ2pELE1BQU0sV0FBVyxHQUFDLE9BQU8sSUFBSSxNQUFNLENBQUE7SUFDbkMsaUJBQVMsQ0FBQyxVQUFVLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3BDLE9BQU8sQ0FDSDtRQUNLLGFBQWEsSUFBSSw4QkFBQyxtQkFBUyxvQkFBSyxhQUFhLElBQUUsS0FBSyxFQUFFLEVBQUUsR0FBRyxLQUFLLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsSUFBSTtRQUMzSCxnQkFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM5QixPQUFPLG9CQUFZLENBQUMsS0FBSyxFQUFFO2dCQUN2QixHQUFHLEVBQUUsVUFBVTtnQkFDZixLQUFLLEVBQUMsRUFBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxXQUFXLENBQUEsQ0FBQyxDQUFBLFNBQVMsQ0FBQSxDQUFDLENBQUEsUUFBUSxFQUFDLE9BQU8sRUFBQyxXQUFXLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxFQUFrQjtnQkFDL0csTUFBTSxFQUFFLEdBQUcsRUFBRTtvQkFDVCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDdEIsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNuQixDQUFDO2dCQUNELE9BQU8sRUFBRSxHQUFHLEVBQUU7b0JBQ1YsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUseUJBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO29CQUNoRCxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQ3BCLENBQUM7YUFDSixDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FDSCxDQUNOLENBQUE7QUFDTCxDQUFDO0FBeEJELDJCQXdCQyJ9

/***/ }),

/***/ 2554:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const Modal_1 = __webpack_require__(3298);
const react_1 = __importDefault(__webpack_require__(3804));
const LazyLoad_1 = __importDefault(__webpack_require__(279));
function MapModal({ mapSrc, opacity, handleOpacityChange }) {
    return (react_1.default.createElement(Modal_1.Modal, { opacity: opacity, handleOpacityChange: handleOpacityChange }, opacity && (react_1.default.createElement(LazyLoad_1.default, { opacity: opacity },
        react_1.default.createElement("iframe", { src: mapSrc, style: { width: "90vw", height: '90vh', border: "0px", position: 'absolute', left: '4vw', top: '4vh' }, className: 'modal' })))));
}
exports.default = MapModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwTW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2ltcGxlLWltZy1tb2RhbC9zcmMvTWFwTW9kYWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbUNBQTRDO0FBQzVDLGtEQUEwQjtBQUMxQiwwREFBa0M7QUFJbEMsU0FBd0IsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBaUI7SUFDcEYsT0FBTyxDQUFDLDhCQUFDLGFBQUssSUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixJQUNwRSxPQUFPLElBQUssQ0FBQyw4QkFBQyxrQkFBUSxJQUFDLE9BQU8sRUFBRSxPQUFPO1FBQUUsMENBQVEsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxFQUFFLFNBQVMsRUFBQyxPQUFPLEdBQUcsQ0FBVyxDQUFDLENBRTFMLENBQUMsQ0FBQTtBQUNiLENBQUM7QUFMRCwyQkFLQyJ9

/***/ }),

/***/ 3451:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getGPSInfo = exports.exifNameTranslateMap = void 0;
const exifreader_1 = __importDefault(__webpack_require__(5130));
const react_1 = __webpack_require__(3804);
const PropLabel_1 = __importDefault(__webpack_require__(4384));
const react_2 = __importDefault(__webpack_require__(3804));
__webpack_require__(5177);
const GPS_1 = __webpack_require__(3826);
const SignedCollapse_1 = __importDefault(__webpack_require__(8986));
const const_1 = __webpack_require__(6232);
exports.exifNameTranslateMap = new Map([
    ['ApproximateFocusDistance', '对焦点距离'],
    ['Artist', '艺术家'],
    ['Bits Per Sample', '采样位深'],
    ['CameraProfile', '相机颜色配置文件'],
    ['Color Components', '原色数'],
    ['ColorSpace', '色彩空间'],
    ['Copyright', '版权'],
    ['ExposureMode', '曝光模式'],
    ['ExposureProgram', '曝光程序'],
    ['ApertureValue', '光圈值'],
    ['ExposureTime', '曝光时间'],
    ['FocalLength', '焦距'],
    ['FocalLengthIn35mmFilm', '焦距（等效35mm）'],
    ['ShutterSpeedValue', '快门速度'],
    ['Flash', '闪光灯'],
    ['format', '格式'],
    ['ICC Description', 'ICC配置文件说明'],
    ['Image Width', '图像宽度'],
    ['Image Height', '图像高度'],
    ['ISOSpeedRatings', 'ISO速度'],
    ['Lens', '镜头'],
    ['LensModel', '镜头型号'],
    ['LensMake', '镜头制造商'],
    ['Make', '相机制造商'],
    ['MeteringMode', '测光模式'],
    ['Model', '相机型号'],
    ['ModifyDate', '修改日期'],
    ['Orientation', '方向'],
    ['SceneType', '场景模式'],
    ['ShutterSpeedValue', '快门时间'],
    ['Subsampling', '色度抽样 '],
    ['WhiteBalance', '白平衡'],
    ['SceneCaptureType', "场景模式"]
]);
function MetaPannel(props) {
    const [propLabels, setPropLabels] = react_1.useState([]);
    const [error, setError] = react_1.useState();
    const [imgExifs, setExif] = react_1.useState();
    if (props.imgSrc) {
        react_1.useEffect(() => {
            fetch(props.imgSrc, { method: 'GET' })
                .then(async (resp) => {
                if (resp.ok) {
                    setExif(exifreader_1.default.load(await resp.arrayBuffer()));
                }
                else {
                    setError(error2Descr({ message: 'HTTP ' + resp.status, name: "HTTP" }));
                }
            })
                .catch((reason) => {
                setError(error2Descr(reason));
            });
        }, [props.imgSrc]);
        react_1.useEffect(() => {
            var _a, _b;
            if (imgExifs) {
                console.log(imgExifs);
                let newPropLabels, tryGPS = false, tryDateTime = false;
                if (props.showAll || !props.interests) {
                    tryGPS = true;
                    tryDateTime = true;
                    newPropLabels =
                        Array.from(exports.exifNameTranslateMap.keys()).map((key, index) => {
                            const value = imgExifs[key];
                            if (value)
                                return wrapper(index, key, value);
                        });
                }
                else {
                    newPropLabels =
                        props.interests.map((interest, index) => {
                            if (interest === 'GPS') {
                                tryGPS = interest === 'GPS';
                                return;
                            }
                            if (interest === 'DateTime') {
                                tryDateTime = interest === 'DateTime';
                                return;
                            }
                            const value = imgExifs[interest];
                            if (value)
                                return wrapper(index, interest, value);
                        });
                }
                if (tryGPS) {
                    const GPSInfo = getGPSInfo(imgExifs);
                    if (GPSInfo)
                        newPropLabels.push(wrapperCollapse(newPropLabels.length, 'GPS', GPS_1.translateGPSTag(GPS_1.GPSToReadble(GPSInfo))));
                }
                if (tryDateTime) {
                    const date = (_a = imgExifs.DateTimeDigitized) === null || _a === void 0 ? void 0 : _a.description.match(/([0-9]{4}):([0-9]{2}):([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/), _offset = (_b = imgExifs['OffsetTimeDigitized']) === null || _b === void 0 ? void 0 : _b.description;
                    if (date) {
                        let hour_offset = 0, minute_offset = 0;
                        const [year, month, day, hour, minute, second] = date.slice(1).map(value => parseInt(value));
                        if (_offset) {
                            const offset = _offset.match(/([+-])([0-9]{2}):([0-9]{2})/);
                            const [_offset_type, _hour_offset, _minute_offset] = offset.slice(1);
                            const offset_type = _offset_type === '+' ? '-' : '+';
                            hour_offset = parseInt(`${offset_type}${_hour_offset}`);
                            minute_offset = parseInt(`${offset_type}${_minute_offset}`);
                            newPropLabels.unshift(wrapperString('dttz', '拍摄者所在时区', _offset));
                        }
                        const _time = [year, month - 1, day, hour + hour_offset, minute + minute_offset, second];
                        //@ts-ignore
                        newPropLabels.unshift(_offset ? wrapperString('dt', '拍摄时间（你的本地时区）', const_1.intlDate.format(new Date(Date.UTC(..._time)))) : wrapperString('dt', '拍摄时间（时区未知）', new Date(..._time).toLocaleString()));
                    }
                }
                setPropLabels(newPropLabels);
            }
        }, [props.interests, imgExifs]);
        return (react_2.default.createElement(react_2.default.Fragment, null, (propLabels.length > 0) ? propLabels : (error || react_2.default.createElement("span", null, "\u6B63\u5728\u52A0\u8F7DEXIF\u4FE1\u606F..."))));
    }
    else {
        return (react_2.default.createElement(react_2.default.Fragment, null)); //跳过渲染
    }
}
exports.default = MetaPannel;
function getCaption(propName) {
    const translate = exports.exifNameTranslateMap.get(propName);
    return translate || propName;
}
function _error2Descr(prefix, desc) {
    return react_2.default.createElement(PropLabel_1.default, { caption: prefix, value: desc });
}
function error2Descr(e) {
    let prefix = "错误", desc;
    let msg;
    if (typeof e === 'string') {
        msg = e;
    }
    else {
        msg = e.message;
        if (e.name == 'HTTP') {
            desc = msg;
            return _error2Descr(prefix, desc);
        }
    }
    switch (msg) {
        case 'Invalid image format':
            desc = '不支持的图片格式。';
            break;
        case 'Failed to fetch':
            desc = '源站不允许脚本访问。';
            break;
        case 'No Exif data':
            desc = "这个图片没有EXIF数据。";
            break;
        default:
            console.warn(e);
            desc = '未知的错误。';
    }
    return _error2Descr(prefix, desc);
}
/* function wrapper(key: string | number, tagName: string, tag: EXIF.XmpTag & EXIF.ValueTag) {
    let value: string
    switch (tagName) {
        default: value = tag.description
    }
    return (
        <li key={key}>
        <PropLabel caption={getCaption(tagName)}
            value={value} /></li>)
} */
function wrapper(key, tagName, tag) {
    return wrapperString(key, tagName, tag.description);
}
function wrapperString(key, tagName, tag) {
    return (react_2.default.createElement("li", { key: key },
        react_2.default.createElement(PropLabel_1.default, { caption: getCaption(tagName), value: tag })));
}
function getGPSInfo(exif) {
    const obj = {
        altitude: exif.GPSAltitude ? exif.GPSAltitude.description : undefined,
        altitudeRef: exif.GPSAltitudeRef ? exif.GPSAltitudeRef.value : undefined,
        latitude: exif.GPSLatitude ? exif.GPSLatitude.description : undefined,
        latitudeRef: exif.GPSLatitudeRef ? exif.GPSLatitudeRef.value[0] : undefined,
        longitude: exif.GPSLongitude ? exif.GPSLongitude.description : undefined,
        longitudeRef: exif.GPSLongitudeRef ? exif.GPSLongitudeRef.value[0] : undefined,
        speed: exif.GPSSpeed ? exif.GPSSpeed.description : undefined,
        speedRef: exif.GPSSpeedRef ? exif.GPSSpeedRef.description : undefined
    };
    let isFullfied = true;
    const values = Object.values(obj).values();
    while (isFullfied) {
        const { value, done } = values.next();
        if (done)
            break;
        isFullfied = value !== undefined;
    }
    return isFullfied ? obj : undefined;
}
exports.getGPSInfo = getGPSInfo;
function wrapperCollapse(key, name, obj) {
    return (react_2.default.createElement("li", { key: key },
        react_2.default.createElement(SignedCollapse_1.default, { name: name, obj: obj, wrapper: wrapperString })));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YVBhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zaW1wbGUtaW1nLW1vZGFsL3NyYy9NZXRhUGFubmVsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0REFBNkI7QUFDN0IsaUNBQTJDO0FBQzNDLDREQUFtQztBQUNuQyxrREFBeUI7QUFDekIsNEJBQXlCO0FBQ3pCLCtCQUE4RDtBQUM5RCxzRUFBNkM7QUFDN0MsbUNBQWtDO0FBRXJCLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxHQUFHLENBQWlCO0lBQ3hELENBQUMsMEJBQTBCLEVBQUUsT0FBTyxDQUFDO0lBQ3JDLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQztJQUNqQixDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQztJQUMzQixDQUFDLGVBQWUsRUFBRSxVQUFVLENBQUM7SUFDN0IsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUM7SUFDM0IsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDO0lBQ3RCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQztJQUNuQixDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUM7SUFDeEIsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUM7SUFDM0IsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDO0lBQ3hCLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQztJQUN4QixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUM7SUFDckIsQ0FBQyx1QkFBdUIsRUFBRSxZQUFZLENBQUM7SUFDdkMsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUM7SUFDN0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBQ2hCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztJQUNoQixDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQztJQUNoQyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7SUFDdkIsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDO0lBQ3hCLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDO0lBQzVCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztJQUNkLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztJQUNyQixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7SUFDckIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO0lBQ2pCLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQztJQUN4QixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7SUFDakIsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDO0lBQ3RCLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQztJQUNyQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7SUFDckIsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUM7SUFDN0IsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDO0lBQ3hCLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQztJQUN2QixDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQztDQUMvQixDQUFDLENBQUE7QUFNRixTQUF3QixVQUFVLENBQUMsS0FBc0I7SUFDckQsTUFBTSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsR0FBRyxnQkFBUSxDQUFxQixFQUFFLENBQUMsQ0FBQTtJQUNwRSxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLGdCQUFRLEVBQWUsQ0FBQTtJQUNqRCxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLGdCQUFRLEVBQTJDLENBQUE7SUFDL0UsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ2QsaUJBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDWCxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztpQkFDakMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxJQUFJLENBQUMsRUFBRSxFQUFFO29CQUNULE9BQU8sQ0FBQyxvQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7aUJBQy9DO3FCQUFNO29CQUNILFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTtpQkFDeEU7WUFDTCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1lBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDbEIsaUJBQVMsQ0FBQyxHQUFHLEVBQUU7O1lBQ1gsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFDckIsSUFBSSxhQUFpQyxFQUFFLE1BQU0sR0FBRyxLQUFLLEVBQUUsV0FBVyxHQUFHLEtBQUssQ0FBQTtnQkFDMUUsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtvQkFDbkMsTUFBTSxHQUFHLElBQUksQ0FBQTtvQkFDYixXQUFXLEdBQUcsSUFBSSxDQUFBO29CQUNsQixhQUFhO3dCQUNULEtBQUssQ0FBQyxJQUFJLENBQUMsNEJBQW9CLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7NEJBQ3ZELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTs0QkFDM0IsSUFBSSxLQUFLO2dDQUFFLE9BQU8sT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7d0JBQ2hELENBQUMsQ0FBQyxDQUFBO2lCQUNUO3FCQUFNO29CQUNILGFBQWE7d0JBQ1QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUU7NEJBQ3BDLElBQUksUUFBUSxLQUFLLEtBQUssRUFBRTtnQ0FBRSxNQUFNLEdBQUcsUUFBUSxLQUFLLEtBQUssQ0FBQztnQ0FBQyxPQUFNOzZCQUFFOzRCQUMvRCxJQUFJLFFBQVEsS0FBSyxVQUFVLEVBQUU7Z0NBQUUsV0FBVyxHQUFHLFFBQVEsS0FBSyxVQUFVLENBQUM7Z0NBQUMsT0FBTTs2QkFBRTs0QkFDOUUsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBOzRCQUNoQyxJQUFJLEtBQUs7Z0NBQUUsT0FBTyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTt3QkFDckQsQ0FBQyxDQUFDLENBQUE7aUJBQ1Q7Z0JBQ0QsSUFBSSxNQUFNLEVBQUU7b0JBQ1IsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUNwQyxJQUFJLE9BQU87d0JBQUUsYUFBYSxDQUFDLElBQUksQ0FDM0IsZUFBZSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUN2QyxxQkFBZSxDQUFDLGtCQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQ25EO2dCQUNELElBQUksV0FBVyxFQUFFO29CQUNiLE1BQU0sSUFBSSxTQUFHLFFBQVEsQ0FBQyxpQkFBaUIsMENBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQyxFQUMzSCxPQUFPLFNBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDLDBDQUFFLFdBQVcsQ0FBQTtvQkFDMUQsSUFBSSxJQUFJLEVBQUU7d0JBQ04sSUFBSSxXQUFXLEdBQVcsQ0FBQyxFQUFFLGFBQWEsR0FBVyxDQUFDLENBQUE7d0JBQ3RELE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7d0JBQzVGLElBQUksT0FBTyxFQUFFOzRCQUNULE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQTs0QkFDM0QsTUFBTSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTs0QkFDcEUsTUFBTSxXQUFXLEdBQUcsWUFBWSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7NEJBQ3BELFdBQVcsR0FBRyxRQUFRLENBQUMsR0FBRyxXQUFXLEdBQUcsWUFBWSxFQUFFLENBQUMsQ0FBQTs0QkFDdkQsYUFBYSxHQUFHLFFBQVEsQ0FBQyxHQUFHLFdBQVcsR0FBRyxjQUFjLEVBQUUsQ0FBQyxDQUFBOzRCQUMzRCxhQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7eUJBQ25FO3dCQUNELE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksR0FBRyxXQUFXLEVBQUUsTUFBTSxHQUFHLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQTt3QkFDeEYsWUFBWTt3QkFDWixhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsZ0JBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQTtxQkFHL0w7aUJBQ0o7Z0JBQ0QsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFBO2FBQy9CO1FBQ0wsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFBO1FBQy9CLE9BQU8sQ0FBQyw4REFDSCxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksMEZBQTBCLENBQUMsQ0FDOUUsQ0FBQyxDQUFBO0tBQ1A7U0FBTTtRQUNILE9BQU8sQ0FBQyw2REFBSyxDQUFDLENBQUEsQ0FBQSxNQUFNO0tBQ3ZCO0FBQ0wsQ0FBQztBQTNFRCw2QkEyRUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxRQUFnQjtJQUNoQyxNQUFNLFNBQVMsR0FBRyw0QkFBb0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEQsT0FBTyxTQUFTLElBQUksUUFBUSxDQUFBO0FBQ2hDLENBQUM7QUFDRCxTQUFTLFlBQVksQ0FBQyxNQUFjLEVBQUUsSUFBWTtJQUM5QyxPQUFPLDhCQUFDLG1CQUFTLElBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxHQUFjLENBQUE7QUFDaEUsQ0FBQztBQUNELFNBQVMsV0FBVyxDQUFDLENBQWlCO0lBQ2xDLElBQUksTUFBTSxHQUFXLElBQUksRUFBRSxJQUFZLENBQUE7SUFDdkMsSUFBSSxHQUFXLENBQUE7SUFDZixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtRQUN2QixHQUFHLEdBQUcsQ0FBQyxDQUFBO0tBQ1Y7U0FBTTtRQUNILEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFBO1FBQ2YsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUNsQixJQUFJLEdBQUcsR0FBRyxDQUFBO1lBQ1YsT0FBTyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQ3BDO0tBQ0o7SUFDRCxRQUFRLEdBQUcsRUFBRTtRQUNULEtBQUssc0JBQXNCO1lBQ3ZCLElBQUksR0FBRyxXQUFXLENBQUE7WUFDbEIsTUFBSztRQUNULEtBQUssaUJBQWlCO1lBQ2xCLElBQUksR0FBRyxZQUFZLENBQUE7WUFDbkIsTUFBSztRQUNULEtBQUssY0FBYztZQUNmLElBQUksR0FBRyxlQUFlLENBQUE7WUFDdEIsTUFBSztRQUNUO1lBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNmLElBQUksR0FBRyxRQUFRLENBQUE7S0FDdEI7SUFDRCxPQUFPLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDckMsQ0FBQztBQUVEOzs7Ozs7Ozs7SUFTSTtBQUNKLFNBQVMsT0FBTyxDQUFDLEdBQW9CLEVBQUUsT0FBZSxFQUFFLEdBQWdDO0lBQ3BGLE9BQU8sYUFBYSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ3ZELENBQUM7QUFDRCxTQUFTLGFBQWEsQ0FBQyxHQUFvQixFQUFFLE9BQWUsRUFBRSxHQUFXO0lBQ3JFLE9BQU8sQ0FDSCxzQ0FBSSxHQUFHLEVBQUUsR0FBRztRQUNSLDhCQUFDLG1CQUFTLElBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFDbkMsS0FBSyxFQUFFLEdBQUcsR0FBSSxDQUNqQixDQUFDLENBQUE7QUFDZCxDQUFDO0FBQ0QsU0FBZ0IsVUFBVSxDQUFDLElBQTZDO0lBQ3BFLE1BQU0sR0FBRyxHQUFHO1FBQ1IsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQ3JFLFdBQVcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUztRQUN4RSxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDckUsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQzNFLFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUN4RSxZQUFZLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDOUUsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTO1FBQzVELFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUztLQUN4RSxDQUFBO0lBQ0QsSUFBSSxVQUFVLEdBQVksSUFBSSxDQUFBO0lBQzlCLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDMUMsT0FBTyxVQUFVLEVBQUU7UUFDZixNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNyQyxJQUFJLElBQUk7WUFBRSxNQUFLO1FBQ2YsVUFBVSxHQUFHLEtBQUssS0FBSyxTQUFTLENBQUE7S0FDbkM7SUFDRCxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUE7QUFDdkMsQ0FBQztBQW5CRCxnQ0FtQkM7QUFDRCxTQUFTLGVBQWUsQ0FBQyxHQUFvQixFQUFFLElBQVksRUFBRSxHQUFXO0lBQ3BFLE9BQU8sQ0FBQyxzQ0FBSSxHQUFHLEVBQUUsR0FBRztRQUNoQiw4QkFBQyx3QkFBYyxJQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsYUFBYSxHQUFJLENBQy9ELENBQUMsQ0FBQTtBQUNWLENBQUMifQ==

/***/ }),

/***/ 3298:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Modal = void 0;
const react_1 = __importStar(__webpack_require__(3804));
__webpack_require__(8969);
function Modal({ children, handleOpacityChange, opacity, style }) {
    const handleClick = react_1.useCallback(() => handleOpacityChange(false), [handleOpacityChange]);
    return (react_1.default.createElement("div", { onClick: handleClick, style: {
            opacity: opacity ? 1 : 0,
            visibility: (opacity ? 'visible' : 'hidden'), ...style
        }, className: 'modal' },
        react_1.default.createElement("div", { className: 'modal-body' }, children)));
}
exports.Modal = Modal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2ltcGxlLWltZy1tb2RhbC9zcmMvTW9kYWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMkM7QUFDM0MsdUJBQW9CO0FBTXBCLFNBQWdCLEtBQUssQ0FBQyxFQUFDLFFBQVEsRUFBQyxtQkFBbUIsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFhO0lBQzFFLE1BQU0sV0FBVyxHQUFHLG1CQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUE7SUFDdkYsT0FBTyxDQUFDLHVDQUNKLE9BQU8sRUFBRSxXQUFXLEVBQ3BCLEtBQUssRUFBRTtZQUNILE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUMsR0FBRyxLQUFLO1NBQ3hELEVBQ0QsU0FBUyxFQUFDLE9BQU87UUFDakIsdUNBQUssU0FBUyxFQUFDLFlBQVksSUFDdEIsUUFBUSxDQUNQLENBQ0gsQ0FDTixDQUFBO0FBQ0wsQ0FBQztBQWRELHNCQWNDIn0=

/***/ }),

/***/ 4384:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(3804));
function PropLabel(props) {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("strong", null, props.caption),
        ":",
        react_1.default.createElement("span", null, props.value)));
}
exports.default = PropLabel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvcExhYmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NpbXBsZS1pbWctbW9kYWwvc3JjL1Byb3BMYWJlbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFNMUIsU0FBd0IsU0FBUyxDQUFDLEtBQXFCO0lBQ25ELE9BQU8sQ0FDRjtRQUNBLDhDQUFTLEtBQUssQ0FBQyxPQUFPLENBQVU7O1FBQUMsNENBQU8sS0FBSyxDQUFDLEtBQUssQ0FBUSxDQUN4RCxDQUNQLENBQUM7QUFDTixDQUFDO0FBTkQsNEJBTUMifQ==

/***/ }),

/***/ 8986:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_collapse_1 = __webpack_require__(6180);
const react_1 = __importStar(__webpack_require__(3804));
__webpack_require__(2809);
function SignedCollapse({ name, obj, wrapper }) {
    const [isOpen, setOpen] = react_1.useState(false);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("strong", null, name),
        react_1.default.createElement("span", { className: 'clickable-sign', onClick: () => {
                setOpen(!isOpen);
            } }, isOpen ? '⮟' : '⮞'),
        react_1.default.createElement(react_collapse_1.UnmountClosed, { isOpened: isOpen },
            react_1.default.createElement("ul", null, Object.entries(obj).map(([key, value], index) => {
                return wrapper(index, key, value);
            })))));
}
exports.default = SignedCollapse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lnbmVkQ29sbGFwc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2ltcGxlLWltZy1tb2RhbC9zcmMvU2lnbmVkQ29sbGFwc2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUErQztBQUMvQywrQ0FBd0M7QUFDeEMsZ0NBQTZCO0FBRTdCLFNBQXdCLGNBQWMsQ0FDbEMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBdUQ7SUFDM0UsTUFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxnQkFBUSxDQUFVLEtBQUssQ0FBQyxDQUFBO0lBQ2xELE9BQU8sQ0FBQztRQUFFLDhDQUFTLElBQUksQ0FBVTtRQUNqQyx3Q0FBTSxTQUFTLEVBQUMsZ0JBQWdCLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDcEIsQ0FBQyxJQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQVE7UUFDMUIsOEJBQUMsOEJBQWEsSUFBQyxRQUFRLEVBQUUsTUFBTTtZQUMzQiwwQ0FDSyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUM3QyxPQUFPLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3JDLENBQUMsQ0FBQyxDQUNELENBQ08sQ0FBRyxDQUFDLENBQUE7QUFDNUIsQ0FBQztBQWRELGlDQWNDIn0=

/***/ }),

/***/ 6232:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.intlDate = void 0;
exports.intlDate = new Intl.DateTimeFormat(navigator.language, {
    timeStyle: "full",
    dateStyle: "long"
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2ltcGxlLWltZy1tb2RhbC9zcmMvY29uc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7SUFDaEUsU0FBUyxFQUFFLE1BQU07SUFDakIsU0FBUyxFQUFFLE1BQU07Q0FDYixDQUFDLENBQUEifQ==

/***/ }),

/***/ 4538:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setImageModal = exports.setContainer = exports.hideModal = exports.showModal = exports.clickHandler = exports._removeListeners = exports._attachListeners = void 0;
const react_dom_1 = __importDefault(__webpack_require__(7196));
const react_1 = __webpack_require__(3804);
var container;
var usingModal;
const regex = /(http[\S]+) ([0-9]+)w/i;
/**
 * Attach 'clickHandler' for each element in nodeList
 *
 * @author KotoriK
 * @export
 * @param {NodeListOf<HTMLElement>} nodeList
 */
function _attachListeners(nodeList) {
    nodeList.forEach((ele) => {
        ele.addEventListener('click', clickHandler);
    });
}
exports._attachListeners = _attachListeners;
/**
 * Remove 'clickHandler' for each element in nodeList
 *
 * @author KotoriK
 * @export
 * @param {NodeListOf<HTMLElement>} nodeList
 */
function _removeListeners(nodeList) {
    nodeList.forEach((ele) => {
        ele.removeEventListener('click', clickHandler);
    });
}
exports._removeListeners = _removeListeners;
/**
 * Handle clicks on Image
 *
 * @author KotoriK
 * @export
 * @param {Event} e
 */
function clickHandler(e) {
    const img = e.target;
    if (img.dataset.fullUrl) {
        showModal(img.dataset.fullUrl);
        return;
    }
    else if (img.srcset) {
        let maxPx = 0, maxPxUrl = '';
        img.srcset.split(',').forEach((i) => {
            const result = regex.exec(i);
            if (result.length == 3) {
                let nowPx = parseInt(result[2]);
                if (nowPx > maxPx) {
                    maxPx = nowPx;
                    maxPxUrl = result[1];
                }
            }
        });
        showModal(maxPxUrl || img.src);
        return;
    }
    else {
        showModal(img.src);
    }
}
exports.clickHandler = clickHandler;
function showModal(imgSrc) {
    _updateModal(true, imgSrc);
}
exports.showModal = showModal;
function _updateModal(opacity, imgSrc) {
    react_dom_1.default.render(react_1.createElement(usingModal, {
        imgSrc, opacity,
        handleOpacityChange: _updateModal
    }), container);
}
/**
 * Unload Modal from DOM
 *
 * @author KotoriK
 * @export
 */
function hideModal() {
    react_dom_1.default.unmountComponentAtNode(container);
}
exports.hideModal = hideModal;
function setContainer(newContainer) {
    container = newContainer;
}
exports.setContainer = setContainer;
function setImageModal(usingImageModal) {
    usingModal = usingImageModal;
}
exports.setImageModal = setImageModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NpbXBsZS1pbWctbW9kYWwvc3JjL2RlcGxveS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMERBQWdDO0FBQ2hDLGlDQUF5RTtBQUV6RSxJQUFJLFNBQXNCLENBQUE7QUFDMUIsSUFBSSxVQUFnRixDQUFBO0FBQ3BGLE1BQU0sS0FBSyxHQUFHLHdCQUF3QixDQUFBO0FBRXRDOzs7Ozs7R0FNRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLFFBQWlDO0lBQzlELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNyQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQy9DLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQUpELDRDQUlDO0FBQ0Q7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsUUFBaUM7SUFFOUQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ3JCLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDbEQsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBTEQsNENBS0M7QUFFRDs7Ozs7O0dBTUc7QUFDSCxTQUFnQixZQUFZLENBQUMsQ0FBUTtJQUNqQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBMEIsQ0FBQTtJQUN4QyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1FBQ3JCLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzlCLE9BQU07S0FDVDtTQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUNuQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsUUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUM1QixHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNoQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzVCLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDL0IsSUFBSSxLQUFLLEdBQUcsS0FBSyxFQUFFO29CQUNmLEtBQUssR0FBRyxLQUFLLENBQUE7b0JBQ2IsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDdkI7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ0YsU0FBUyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDOUIsT0FBTTtLQUNUO1NBQU07UUFDSCxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3JCO0FBRUwsQ0FBQztBQXZCRCxvQ0F1QkM7QUFDRCxTQUFnQixTQUFTLENBQUMsTUFBZTtJQUNyQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQzlCLENBQUM7QUFGRCw4QkFFQztBQUNELFNBQVMsWUFBWSxDQUFDLE9BQWdCLEVBQUUsTUFBZTtJQUNuRCxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxxQkFBYSxDQUFDLFVBQVUsRUFBRTtRQUN0QyxNQUFNLEVBQUUsT0FBTztRQUNmLG1CQUFtQixFQUFFLFlBQVk7S0FDcEMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQ2xCLENBQUM7QUFDRDs7Ozs7R0FLRztBQUNILFNBQWdCLFNBQVM7SUFDckIsbUJBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUM5QyxDQUFDO0FBRkQsOEJBRUM7QUFDRCxTQUFnQixZQUFZLENBQUMsWUFBeUI7SUFDbEQsU0FBUyxHQUFHLFlBQVksQ0FBQTtBQUM1QixDQUFDO0FBRkQsb0NBRUM7QUFDRCxTQUFnQixhQUFhLENBQUMsZUFBc0Y7SUFDaEgsVUFBVSxHQUFHLGVBQWUsQ0FBQTtBQUNoQyxDQUFDO0FBRkQsc0NBRUMifQ==

/***/ })

}]);
//# sourceMappingURL=965.js.map