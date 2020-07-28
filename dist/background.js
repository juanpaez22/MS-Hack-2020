const options = {
    type: "basic",
    iconUrl: "logo.jpg",
    title: "Time for your daily check-in!",
    message: "Tell us how you feel today."
  };
  
chrome.notifications.create(options);
