const options = {
    type: "basic",
    iconUrl: "test.jpg",
    title: "background.js",
    message: "Hello from background.js!"
  };
  
chrome.browserAction.onClicked.addListener(function (){
    chrome.notifications.create(options);
});

//,"default_popup": "popup.html"