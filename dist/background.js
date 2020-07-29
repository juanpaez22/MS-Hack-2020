// background.js
// Script to specify background behavior of extension.

// Runs when the extension is initially installed.
chrome.runtime.onInstalled.addListener(function () {
  // Notify user initially, and reset alarm for one more hour.
  console.log("Running on install");
  bootstrapFakeData();  // TODO: REMOVE THIS LINE BEFORE SUBMITTING
  setReminderPeriod(1); // set reminder period to 1 hour.
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
  chrome.windows.create({url: "popup.html", width: 450, height: 600, type: "popup"})
});

function bootstrapFakeData() {
  var data = [];
  for (i = 6; i >= 1; i --) {
    var cur_date = new Date();
    var date = new Date(cur_date.getFullYear(), cur_date.getMonth(),cur_date.getDate() - i);
    data.push({val: 7 - i, timestamp: date.toString()});
  }

  chrome.storage.sync.set({data: data}, function () {
    chrome.storage.sync.get('data', function (result) {
        console.log("New data:")
        console.log(result.data)
        updateAlarm();
    });
  });
}