// background.js
// Script to specify background behavior of extension.

// Runs when the extension is initially installed.
chrome.runtime.onInstalled.addListener(function () {
  // Notify user initially, and set default values.
  console.log("Running on install script.");
  bootstrapFakeData();  // TODO: REMOVE THIS LINE BEFORE SUBMITTING

  setRemindersEnabled(true);
  setReminderTime(10, 30);  // Set default reminder time to 10:30 AM.

  setWorkdayEnabled(false);  // Disable workday reminder.
  setWorkdayEndTime(17, 30); // Set default end time to 5 PM.

  setEngagementStreak(0); // Clear engagement streak.

  chrome.notifications.create(reminder_notification_options); // Send initial notification.
  updateReminderAlarm();
  updateWorkdayEndAlarm();
});

// Runs every time the browser opens.
chrome.runtime.onStartup.addListener(function () {
  // Reset alarm in case trigger was missed.
  console.log("Running on startup script.");
  updateReminderAlarm();
  updateWorkdayEndAlarm();
});

// Runs when the notification is clicked.
chrome.notifications.onClicked.addListener(function () {
  chrome.windows.create({url: "popup.html", width: 450, height: 600, type: "popup"})
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function bootstrapFakeData() {
  var data = [];
  for (i = 6; i >= 1; i --) {
    var cur_date = new Date();
    var date = new Date(cur_date.getFullYear(), cur_date.getMonth(),cur_date.getDate() - i);
    data.push({val: (getRandomInt(4) - 2), timestamp: date.toString()}); // get random numbers between -2 and 2
  }

  chrome.storage.sync.set({data: data}, function () {
    chrome.storage.sync.get('data', function (result) {
        console.log("New data:")
        console.log(result.data)
        updateReminderAlarm(); 
    });
  });
}