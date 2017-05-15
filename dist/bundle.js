/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(4);
// TODO: Change from a linear freq representation to a logarithmic(sp?)



class FrequencyAnalyzer {
    
    constructor() {

        this.visibleFrequencies = 128;

    }

    // Renders cells for bars of the frequency analyzer
    renderBase() {

        let freqAnalyzerEle = document.querySelector('#freqAnalyzer g');

        for (let i = 0; i < this.visibleFrequencies; i++) {

            let cell = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

            console.log(cell.constructor.name);

            cell.id = `cell${i}`;
            cell.classList.add('cell');

            __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].AddAttributeToElement(cell, 'width', 500 / this.visibleFrequencies);
            __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].AddAttributeToElement(cell, 'x', i * 500 / this.visibleFrequencies);
            __WEBPACK_IMPORTED_MODULE_0__util__["a" /* Util */].AddAttributeToElement(cell, 'y', 1000);

            freqAnalyzerEle.appendChild(cell);
        }
    }

    // This does all the magic with the audio stream... I don't know 
    // what all is really going on here... but it works, so there's that...
    // Thanks MDN
    animate(stream) {
        let visibleFrequencies = this.visibleFrequencies;

        //Audio stops listening in FF without // window.persistAudioStream = stream;
        //https://bugzilla.mozilla.org/show_bug.cgi?id=965483
        //https://support.mozilla.org/en-US/questions/984179
        window.persistAudioStream = stream;

        let audioContent = new AudioContext(),
            audioStream = audioContent.createMediaStreamSource(stream),
            analyser = audioContent.createAnalyser();

        audioStream.connect(analyser);

        analyser.fftSize = 256;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        function doDraw() {
            requestAnimationFrame(doDraw);

            analyser.getByteFrequencyData(dataArray);

            for (let i = 0; i < visibleFrequencies; i++) {
                let ele = document.getElementById(`cell${i}`);
                let attr = document.createAttribute('height');
                attr.value = dataArray[i] * 2;
                ele.attributes.setNamedItem(attr);
                ele.style.fillOpacity = dataArray[i]/256;
            }
        }
        
        doDraw();
    }

    // Asks user for permission to use mic, rocks and rolls if that's cool
    initialize() {
        navigator.getUserMedia({
            audio: true
        }, stream => {
            
            this.renderBase();
            this.animate(stream);

        }, err => {
            
            // Ignore error thrown when user blocks mic access
            if (err.name == "PermissionDeniedError") {
                return;
            }

            // Uhhh... Should probably do something more...
            console.error(err);
        });
    }

    static confirmAllowMicrophoneAccess() {
        return confirm("Allow Mic?\n\nNo audio is being collected/stored/transmitted anywhere.");
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FrequencyAnalyzer;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__color_specs_json__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__color_specs_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__color_specs_json__);


class MainAnimations {
    constructor() {
        this.colorSpecs = __WEBPACK_IMPORTED_MODULE_0__color_specs_json___default.a;
    }

    pulseColor(ele, colors, styleTarget, duration) {
        
        let defaultStyleTarget = "fill";
        let defaultDuration = 5000;

        styleTarget = styleTarget || defaultStyleTarget;
        duration = duration || defaultDuration;
        
        let frames = [],
            options = {
                duration: 5000,
                iterations: Infinity
            };

        colors.forEach(color => {
            let style = {};
            
            style[styleTarget] = color;

            frames.push(style);
        });

        ele.animate(frames, options);
    }

    start() {
        this.colorSpecs.forEach(colorSpec => {
            document
                .querySelectorAll(colorSpec.selector)
                .forEach(ele => this.pulseColor(ele, colorSpec.colors, colorSpec.styleTarget, colorSpec.duration));
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MainAnimations;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_animations__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__frequency_analyzer__ = __webpack_require__(0);



(() => {

    if (confirm("Animate?\n\nWARNING: This site contains animations which may potentially trigger seizures for people with photosensitive epilepsy. Viewer discretion is advised.")) {
        let mainAnimations = new __WEBPACK_IMPORTED_MODULE_0__main_animations__["a" /* MainAnimations */]();
        mainAnimations.start();

        if (__WEBPACK_IMPORTED_MODULE_1__frequency_analyzer__["a" /* FrequencyAnalyzer */].confirmAllowMicrophoneAccess()) {
            let frequencyAnalyzer = new __WEBPACK_IMPORTED_MODULE_1__frequency_analyzer__["a" /* FrequencyAnalyzer */]();
            frequencyAnalyzer.initialize();
        }
    }    
})();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = [
	{
		"selector": ".yellow",
		"colors": [
			"#ffff00",
			"#ff00ff",
			"#00ffff",
			"#ffff00"
		]
	},
	{
		"selector": ".magenta",
		"colors": [
			"#ff00ff",
			"#00ffff",
			"#ffff00",
			"#ff00ff"
		]
	},
	{
		"selector": ".cyan",
		"colors": [
			"#00ffff",
			"#ffff00",
			"#ff00ff",
			"#00ffff"
		]
	},
	{
		"selector": ".black",
		"colors": [
			"#000000",
			"#cccccc",
			"#000000"
		]
	},
	{
		"selector": "body",
		"colors": [
			"#ffff00",
			"#ff00ff",
			"#00ffff",
			"#ffffff",
			"#ffff00"
		],
		"styleTarget": "backgroundColor",
		"duration": 20000
	}
];

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Static Utility class for... well... random shit...

class Util {
    
    // Adds an attribute to a DOM element
    static AddAttributeToElement(ele, attrName, attrValue) {
        let attr = document.createAttribute(attrName);
        attr.value = attrValue;
        ele.attributes.setNamedItem(attr);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Util;


/***/ })
/******/ ]);