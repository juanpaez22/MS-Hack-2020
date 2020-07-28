const options = {
    type: "basic",
    iconUrl: "test.jpg",
    title: "background.js",
    message: "Hello from background.js!"
  };
  
chrome.notifications.create(options);
