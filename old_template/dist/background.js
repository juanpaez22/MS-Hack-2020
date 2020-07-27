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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

eval("/* background.js\r\n *\r\n * This file has an example of how to make variables accessible to other scripts of the extension.\r\n *\r\n * It also shows how to handle short lived messages from other scripts, in this case, from in-content.js\r\n *\r\n * Note that not all extensions need of a background.js file, but extensions that need to persist data after a popup has closed may need of it.\r\n */\n\n// A sample object that will be exposed further down and used on popup.js\nconst sampleBackgroundGlobal = {\n    message: 'This object comes from background.js'\n};\n\n// Listen to short lived messages from in-content.js\nchrome.runtime.onMessage.addListener((message, sender, sendResponse) => {\n    // Perform any ther actions depending on the message\n    console.log('background.js - received message from in-content.js:', message);\n    // Respond message\n    sendResponse('👍');\n});\n\n// Make variables accessible from chrome.extension.getBackgroundPage()\nwindow.sampleBackgroundGlobal = sampleBackgroundGlobal;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvYmFja2dyb3VuZC5qcz9iYzNiIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGJhY2tncm91bmQuanNcclxuICpcclxuICogVGhpcyBmaWxlIGhhcyBhbiBleGFtcGxlIG9mIGhvdyB0byBtYWtlIHZhcmlhYmxlcyBhY2Nlc3NpYmxlIHRvIG90aGVyIHNjcmlwdHMgb2YgdGhlIGV4dGVuc2lvbi5cclxuICpcclxuICogSXQgYWxzbyBzaG93cyBob3cgdG8gaGFuZGxlIHNob3J0IGxpdmVkIG1lc3NhZ2VzIGZyb20gb3RoZXIgc2NyaXB0cywgaW4gdGhpcyBjYXNlLCBmcm9tIGluLWNvbnRlbnQuanNcclxuICpcclxuICogTm90ZSB0aGF0IG5vdCBhbGwgZXh0ZW5zaW9ucyBuZWVkIG9mIGEgYmFja2dyb3VuZC5qcyBmaWxlLCBidXQgZXh0ZW5zaW9ucyB0aGF0IG5lZWQgdG8gcGVyc2lzdCBkYXRhIGFmdGVyIGEgcG9wdXAgaGFzIGNsb3NlZCBtYXkgbmVlZCBvZiBpdC5cclxuICovXHJcblxyXG4vLyBBIHNhbXBsZSBvYmplY3QgdGhhdCB3aWxsIGJlIGV4cG9zZWQgZnVydGhlciBkb3duIGFuZCB1c2VkIG9uIHBvcHVwLmpzXHJcbmNvbnN0IHNhbXBsZUJhY2tncm91bmRHbG9iYWwgPSB7XHJcbiAgICBtZXNzYWdlOiAnVGhpcyBvYmplY3QgY29tZXMgZnJvbSBiYWNrZ3JvdW5kLmpzJ1xyXG59O1xyXG5cclxuLy8gTGlzdGVuIHRvIHNob3J0IGxpdmVkIG1lc3NhZ2VzIGZyb20gaW4tY29udGVudC5qc1xyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbiAgICAvLyBQZXJmb3JtIGFueSB0aGVyIGFjdGlvbnMgZGVwZW5kaW5nIG9uIHRoZSBtZXNzYWdlXHJcbiAgICBjb25zb2xlLmxvZygnYmFja2dyb3VuZC5qcyAtIHJlY2VpdmVkIG1lc3NhZ2UgZnJvbSBpbi1jb250ZW50LmpzOicsIG1lc3NhZ2UpO1xyXG4gICAgLy8gUmVzcG9uZCBtZXNzYWdlXHJcbiAgICBzZW5kUmVzcG9uc2UoJ/CfkY0nKTtcclxufSk7XHJcblxyXG4vLyBNYWtlIHZhcmlhYmxlcyBhY2Nlc3NpYmxlIGZyb20gY2hyb21lLmV4dGVuc2lvbi5nZXRCYWNrZ3JvdW5kUGFnZSgpXHJcbndpbmRvdy5zYW1wbGVCYWNrZ3JvdW5kR2xvYmFsID0gc2FtcGxlQmFja2dyb3VuZEdsb2JhbDtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9qcy9iYWNrZ3JvdW5kLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///1\n");

/***/ })
/******/ ]);