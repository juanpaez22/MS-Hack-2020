// background.js
// Script to specify background behavior of extension.

// Runs when the extension is initially installed.
chrome.runtime.onInstalled.addListener(function () {
  // Notify user initially, and reset alarm for one more hour.
  console.log("Running on install");
  chrome.notifications.create(notification_options);
  updateAlarm();
});

// Runs every time the browser opens.
chrome.runtime.onStartup.addListener(function () {
  // Reset alarm in case trigger was missed.
  console.log("Running on startup.");
  updateAlarm();
});

// Runs when the notification is clicked.
chrome.notifications.onClicked.addListener(function () {
  // Currently unused.
});