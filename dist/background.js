const options = {
    type: "basic",
    iconUrl: "logo.jpg",
    title: "background.js",
    message: "Hello from background.js!"
  };
  
chrome.notifications.create(options);
