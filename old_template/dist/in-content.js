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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports) {

eval("/* in-content.js\r\n*\r\n* This file has an example on how to communicate with other parts of the extension through a long lived connection (port) and also through short lived connections (chrome.runtime.sendMessage).\r\n*\r\n* Note that in this scenario the port is open from the popup, but other extensions may open it from the background page or not even have either background.js or popup.js.\r\n* */\n\n// Extension port to communicate with the popup, also helps detecting when it closes\nlet port = null;\n\n// Send messages to the open port (Popup)\nconst sendPortMessage = data => port.postMessage(data);\n\n// Handle incoming popup messages\nconst popupMessageHandler = message => console.log('in-content.js - message from popup:', message);\n\n// Start scripts after setting up the connection to popup\nchrome.extension.onConnect.addListener(popupPort => {\n    // Listen for popup messages\n    popupPort.onMessage.addListener(popupMessageHandler);\n    // Set listener for disconnection (aka. popup closed)\n    popupPort.onDisconnect.addListener(() => {\n        console.log('in-content.js - disconnected from popup');\n    });\n    // Make popup port accessible to other methods\n    port = popupPort;\n    // Perform any logic or set listeners\n    sendPortMessage('message from in-content.js');\n});\n\n// Response handler for short lived messages\nconst handleBackgroundResponse = response => console.log('in-content.js - Received response:', response);\n\n// Send a message to background.js\nchrome.runtime.sendMessage('Message from in-content.js!', handleBackgroundResponse);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvaW4tY29udGVudC5qcz9iODc5Il0sInNvdXJjZXNDb250ZW50IjpbIi8qIGluLWNvbnRlbnQuanNcclxuKlxyXG4qIFRoaXMgZmlsZSBoYXMgYW4gZXhhbXBsZSBvbiBob3cgdG8gY29tbXVuaWNhdGUgd2l0aCBvdGhlciBwYXJ0cyBvZiB0aGUgZXh0ZW5zaW9uIHRocm91Z2ggYSBsb25nIGxpdmVkIGNvbm5lY3Rpb24gKHBvcnQpIGFuZCBhbHNvIHRocm91Z2ggc2hvcnQgbGl2ZWQgY29ubmVjdGlvbnMgKGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKS5cclxuKlxyXG4qIE5vdGUgdGhhdCBpbiB0aGlzIHNjZW5hcmlvIHRoZSBwb3J0IGlzIG9wZW4gZnJvbSB0aGUgcG9wdXAsIGJ1dCBvdGhlciBleHRlbnNpb25zIG1heSBvcGVuIGl0IGZyb20gdGhlIGJhY2tncm91bmQgcGFnZSBvciBub3QgZXZlbiBoYXZlIGVpdGhlciBiYWNrZ3JvdW5kLmpzIG9yIHBvcHVwLmpzLlxyXG4qICovXHJcblxyXG4vLyBFeHRlbnNpb24gcG9ydCB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBwb3B1cCwgYWxzbyBoZWxwcyBkZXRlY3Rpbmcgd2hlbiBpdCBjbG9zZXNcclxubGV0IHBvcnQgPSBudWxsO1xyXG5cclxuLy8gU2VuZCBtZXNzYWdlcyB0byB0aGUgb3BlbiBwb3J0IChQb3B1cClcclxuY29uc3Qgc2VuZFBvcnRNZXNzYWdlID0gZGF0YSA9PiBwb3J0LnBvc3RNZXNzYWdlKGRhdGEpO1xyXG5cclxuLy8gSGFuZGxlIGluY29taW5nIHBvcHVwIG1lc3NhZ2VzXHJcbmNvbnN0IHBvcHVwTWVzc2FnZUhhbmRsZXIgPSBtZXNzYWdlID0+IGNvbnNvbGUubG9nKCdpbi1jb250ZW50LmpzIC0gbWVzc2FnZSBmcm9tIHBvcHVwOicsIG1lc3NhZ2UpO1xyXG5cclxuLy8gU3RhcnQgc2NyaXB0cyBhZnRlciBzZXR0aW5nIHVwIHRoZSBjb25uZWN0aW9uIHRvIHBvcHVwXHJcbmNocm9tZS5leHRlbnNpb24ub25Db25uZWN0LmFkZExpc3RlbmVyKHBvcHVwUG9ydCA9PiB7XHJcbiAgICAvLyBMaXN0ZW4gZm9yIHBvcHVwIG1lc3NhZ2VzXHJcbiAgICBwb3B1cFBvcnQub25NZXNzYWdlLmFkZExpc3RlbmVyKHBvcHVwTWVzc2FnZUhhbmRsZXIpO1xyXG4gICAgLy8gU2V0IGxpc3RlbmVyIGZvciBkaXNjb25uZWN0aW9uIChha2EuIHBvcHVwIGNsb3NlZClcclxuICAgIHBvcHVwUG9ydC5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdpbi1jb250ZW50LmpzIC0gZGlzY29ubmVjdGVkIGZyb20gcG9wdXAnKTtcclxuICAgIH0pO1xyXG4gICAgLy8gTWFrZSBwb3B1cCBwb3J0IGFjY2Vzc2libGUgdG8gb3RoZXIgbWV0aG9kc1xyXG4gICAgcG9ydCA9IHBvcHVwUG9ydDtcclxuICAgIC8vIFBlcmZvcm0gYW55IGxvZ2ljIG9yIHNldCBsaXN0ZW5lcnNcclxuICAgIHNlbmRQb3J0TWVzc2FnZSgnbWVzc2FnZSBmcm9tIGluLWNvbnRlbnQuanMnKTtcclxufSk7XHJcblxyXG4vLyBSZXNwb25zZSBoYW5kbGVyIGZvciBzaG9ydCBsaXZlZCBtZXNzYWdlc1xyXG5jb25zdCBoYW5kbGVCYWNrZ3JvdW5kUmVzcG9uc2UgPSByZXNwb25zZSA9PlxyXG4gICAgY29uc29sZS5sb2coJ2luLWNvbnRlbnQuanMgLSBSZWNlaXZlZCByZXNwb25zZTonLCByZXNwb25zZSk7XHJcblxyXG4vLyBTZW5kIGEgbWVzc2FnZSB0byBiYWNrZ3JvdW5kLmpzXHJcbmNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKCdNZXNzYWdlIGZyb20gaW4tY29udGVudC5qcyEnLCBoYW5kbGVCYWNrZ3JvdW5kUmVzcG9uc2UpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL2luLWNvbnRlbnQuanMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n");

/***/ })

/******/ });