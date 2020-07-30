// alarm_utils.js
// Utilities for setting notification alarms.

const reminder_notification_options = {
    type: "basic",
    iconUrl: "logo(128x128).png",
    title: "Time for your daily check-in!",
    message: "Tell us how you feel today in the Enlighten extension."
};

const workday_notification_options = {
    type: "basic",
    iconUrl: "logo(128x128).png",
    title: "Your work day is over!",
    message: "Think about wrapping up soon."
};

/**
 * If the notification has already gone off that day, sets it for the default time the next day.
 * If the notification has not yet gone off that day and the user already clicked, sets it for the next day.
 * If the notification has not yet gone off and the user has not clicked, sets it for the same day.
 */
function updateReminderAlarm() {
    chrome.alarms.clear("notification");
    getRemindersEnabled(function (enabled){
        if (enabled) {
            getMoodData(function(data) {
                getReminderTime(function(notification_hour, notification_minute) {
                    var currentTime = new Date();
        
                    // Set next notification time to today at set time
                    var nextNotificationTime = new Date();
                    nextNotificationTime.setDate(currentTime.getDate());
                    nextNotificationTime.setHours(notification_hour);
                    nextNotificationTime.setMinutes(notification_minute);
                    nextNotificationTime.setSeconds(0);
                    nextNotificationTime.setMilliseconds(0);
        
                    if (nextNotificationTime < currentTime) {
                        // If we missed it, remind tomorrow
                        nextNotificationTime.setDate(nextNotificationTime.getDate() + 1);
                    }
                    else {
                        // Check if user already submitted data today.
                        if (data != undefined && data.length > 0) {
                            var lastInputTimestamp = new Date(data[data.length - 1].timestamp);
                            if (lastInputTimestamp.getDate() == currentTime.getDate()) {
                                // User already submitted input, set notification for tomorrow.
                                nextNotificationTime.setDate(nextNotificationTime.getDate() + 1);
                            }
                        }
                    }
        
                    chrome.alarms.clear("notification");
                    chrome.alarms.create("notification", {when: nextNotificationTime.getTime()});
                    console.log("Setting next notification for " + nextNotificationTime);
                });
            });
        }
    })
}

/**
 * Sets the workday end alarm for the configured time (if the workday notification is enabled).
 * If the workday is already over, sets it for tomorrow, even if alarm didn't go off.
 */
function updateWorkdayEndAlarm() {
    chrome.alarms.clear("workday_end");
    getWorkdayEnabled(function(enabled) {
        if(enabled) {
            getWorkdayEndTime(function(hour, minute) {
                var alarmTime = new Date();
                // If workday is already over, set alarm for tomorrow.
                if (alarmTime.getHours() > hour || (alarmTime.getHours() >= hour && alarmTime.getMinutes() >= minute)) {
                    alarmTime.setDate(alarmTime.getDate() + 1);
                }
                alarmTime.setHours(hour);
                alarmTime.setMinutes(minute);
                alarmTime.setSeconds(0);
                alarmTime.setMilliseconds(0);
                chrome.alarms.clear("workday_end");
                chrome.alarms.create("workday_end", {when: alarmTime.getTime()});
                console.log("Setting workday end alarm for " + alarmTime);
            });
        }
    });
}

// Runs when an alarm fires.
chrome.alarms.onAlarm.addListener(function(alarm) {
    // Notify user, and reset alarm for one more hour.
    console.log("Alarm firing! " + alarm.name);
    if (alarm.name == "notification") {
        chrome.alarms.clear("notification");
        chrome.notifications.create(reminder_notification_options);
        updateReminderAlarm();
    }
    else if (alarm.name == "workday_end") {
        chrome.alarms.clear("workday_end");
        chrome.notifications.create(workday_notification_options);
        updateWorkdayEndAlarm();
    }
});
