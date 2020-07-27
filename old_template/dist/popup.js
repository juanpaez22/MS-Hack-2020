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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("/* popup.js\r\n *\r\n * This file initializes its scripts after the popup has loaded.\r\n *\r\n * It shows how to access global variables from background.js.\r\n * Note that getViews could be used instead to access other scripts.\r\n *\r\n * A port to the active tab is open to send messages to its in-content.js script.\r\n *\r\n */\n\n// Start the popup script, this could be anything from a simple script to a webapp\nconst initPopupScript = () => {\n    // Access the background window object\n    const backgroundWindow = chrome.extension.getBackgroundPage();\n    // Do anything with the exposed variables from background.js\n    console.log(backgroundWindow.sampleBackgroundGlobal);\n\n    // This port enables a long-lived connection to in-content.js\n    let port = null;\n\n    // Send messages to the open port\n    const sendPortMessage = message => port.postMessage(message);\n\n    // Find the current active tab\n    const getTab = () => new Promise(resolve => {\n        chrome.tabs.query({\n            active: true,\n            currentWindow: true\n        }, tabs => resolve(tabs[0]));\n    });\n\n    // Handle port messages\n    const messageHandler = message => {\n        console.log('popup.js - received message:', message);\n    };\n\n    // Find the current active tab, then open a port to it\n    getTab().then(tab => {\n        // Connects to tab port to enable communication with inContent.js\n        port = chrome.tabs.connect(tab.id, { name: 'chrome-extension-template' });\n        // Set up the message listener\n        port.onMessage.addListener(messageHandler);\n        // Send a test message to in-content.js\n        sendPortMessage('Message from popup!');\n    });\n};\n\n// Fire scripts after page has loaded\ndocument.addEventListener('DOMContentLoaded', initPopupScript);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvanMvcG9wdXAuanM/MDIyNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBwb3B1cC5qc1xyXG4gKlxyXG4gKiBUaGlzIGZpbGUgaW5pdGlhbGl6ZXMgaXRzIHNjcmlwdHMgYWZ0ZXIgdGhlIHBvcHVwIGhhcyBsb2FkZWQuXHJcbiAqXHJcbiAqIEl0IHNob3dzIGhvdyB0byBhY2Nlc3MgZ2xvYmFsIHZhcmlhYmxlcyBmcm9tIGJhY2tncm91bmQuanMuXHJcbiAqIE5vdGUgdGhhdCBnZXRWaWV3cyBjb3VsZCBiZSB1c2VkIGluc3RlYWQgdG8gYWNjZXNzIG90aGVyIHNjcmlwdHMuXHJcbiAqXHJcbiAqIEEgcG9ydCB0byB0aGUgYWN0aXZlIHRhYiBpcyBvcGVuIHRvIHNlbmQgbWVzc2FnZXMgdG8gaXRzIGluLWNvbnRlbnQuanMgc2NyaXB0LlxyXG4gKlxyXG4gKi9cclxuXHJcbi8vIFN0YXJ0IHRoZSBwb3B1cCBzY3JpcHQsIHRoaXMgY291bGQgYmUgYW55dGhpbmcgZnJvbSBhIHNpbXBsZSBzY3JpcHQgdG8gYSB3ZWJhcHBcclxuY29uc3QgaW5pdFBvcHVwU2NyaXB0ID0gKCkgPT4ge1xyXG4gICAgLy8gQWNjZXNzIHRoZSBiYWNrZ3JvdW5kIHdpbmRvdyBvYmplY3RcclxuICAgIGNvbnN0IGJhY2tncm91bmRXaW5kb3cgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldEJhY2tncm91bmRQYWdlKCk7XHJcbiAgICAvLyBEbyBhbnl0aGluZyB3aXRoIHRoZSBleHBvc2VkIHZhcmlhYmxlcyBmcm9tIGJhY2tncm91bmQuanNcclxuICAgIGNvbnNvbGUubG9nKGJhY2tncm91bmRXaW5kb3cuc2FtcGxlQmFja2dyb3VuZEdsb2JhbCk7XHJcblxyXG4gICAgLy8gVGhpcyBwb3J0IGVuYWJsZXMgYSBsb25nLWxpdmVkIGNvbm5lY3Rpb24gdG8gaW4tY29udGVudC5qc1xyXG4gICAgbGV0IHBvcnQgPSBudWxsO1xyXG5cclxuICAgIC8vIFNlbmQgbWVzc2FnZXMgdG8gdGhlIG9wZW4gcG9ydFxyXG4gICAgY29uc3Qgc2VuZFBvcnRNZXNzYWdlID0gbWVzc2FnZSA9PiBwb3J0LnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xyXG5cclxuICAgIC8vIEZpbmQgdGhlIGN1cnJlbnQgYWN0aXZlIHRhYlxyXG4gICAgY29uc3QgZ2V0VGFiID0gKCkgPT5cclxuICAgICAgICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRXaW5kb3c6IHRydWVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJzID0+IHJlc29sdmUodGFic1swXSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBIYW5kbGUgcG9ydCBtZXNzYWdlc1xyXG4gICAgY29uc3QgbWVzc2FnZUhhbmRsZXIgPSBtZXNzYWdlID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygncG9wdXAuanMgLSByZWNlaXZlZCBtZXNzYWdlOicsIG1lc3NhZ2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBGaW5kIHRoZSBjdXJyZW50IGFjdGl2ZSB0YWIsIHRoZW4gb3BlbiBhIHBvcnQgdG8gaXRcclxuICAgIGdldFRhYigpLnRoZW4odGFiID0+IHtcclxuICAgICAgICAvLyBDb25uZWN0cyB0byB0YWIgcG9ydCB0byBlbmFibGUgY29tbXVuaWNhdGlvbiB3aXRoIGluQ29udGVudC5qc1xyXG4gICAgICAgIHBvcnQgPSBjaHJvbWUudGFicy5jb25uZWN0KHRhYi5pZCwgeyBuYW1lOiAnY2hyb21lLWV4dGVuc2lvbi10ZW1wbGF0ZScgfSk7XHJcbiAgICAgICAgLy8gU2V0IHVwIHRoZSBtZXNzYWdlIGxpc3RlbmVyXHJcbiAgICAgICAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIobWVzc2FnZUhhbmRsZXIpO1xyXG4gICAgICAgIC8vIFNlbmQgYSB0ZXN0IG1lc3NhZ2UgdG8gaW4tY29udGVudC5qc1xyXG4gICAgICAgIHNlbmRQb3J0TWVzc2FnZSgnTWVzc2FnZSBmcm9tIHBvcHVwIScpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vLyBGaXJlIHNjcmlwdHMgYWZ0ZXIgcGFnZSBoYXMgbG9hZGVkXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0UG9wdXBTY3JpcHQpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2pzL3BvcHVwLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFGQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);