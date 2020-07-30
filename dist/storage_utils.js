// storage_utils.js
// Storage utilities, including data getters and setters.



// ***************************************************************
//                        Mood Data
// ***************************************************************

/**
 * Appends a mood rating value with timestamp to data object.
 * Each object in the data array as a val param and a timestamp param.
 * Also updates alarm to go off 24 hours from the last timestamp.
 * @param {} inputValue the user's mood input.
 */
function appendMoodData(inputValue) {
    chrome.storage.sync.get({data: []}, function (result) {
        var data = result.data;
        data.push({val: inputValue, timestamp: Date()});
        chrome.storage.sync.set({data: data}, function () {
            chrome.storage.sync.get('data', function (result) {
                console.log("New data:")
                console.log(result.data)
                updateReminderAlarm();
            });
        });
    });
}

/**
 * Gets the array of mood inputs and executes a callback with it.
 * Each object in the data array as a val param and a timestamp param.
 * @param {} callback the callback function.
 */
function getMoodData(callback) {
    chrome.storage.sync.get('data', function (result) {
        if (result != undefined) {
            callback(result.data);
        }
        else {
            callback(undefined);
        }
    });
}



// ***************************************************************
//                     Notification Settings
// ***************************************************************

/**
 * Enables or disables reminders.
 * @param {} should_notify true or false.
 */
function setRemindersEnabled(should_notify) {
    chrome.storage.sync.set({reminders_enabled: should_notify}, function() {
        console.log("Set reminders enabled to " + should_notify);
    });
}

/**
 * Gets whether reminders are enabled.
 * @param {} callback function that takes bool as parameter.
 */
function getRemindersEnabled(callback) {
    chrome.storage.sync.get("reminders_enabled", function(result) {
        callback(result.reminders_enabled);
    });
}

/**
 * Sets the default time at which to notify the user.
 * @param {} hour a number from 0 to 23 representing the time to notify the user.
 */
function setReminderTime(hour, minute) {
    hour = hour % 24;
    minute = minute % 60;
    chrome.storage.sync.set({notification_hour: hour}, function() {
        chrome.storage.sync.set({notification_minute: minute}, function() {
            console.log("Set notification time hour to " + hour);
            console.log("Set notification time minute to " + minute)
        });
    });
}

/**
 * Gets the default time at which to notify the user, and executes a callback with it.
 * @param {} callback the callback to execute, should take hour and minute as params.
 */
function getReminderTime(callback) {
    chrome.storage.sync.get("notification_hour", function (result1) {
        chrome.storage.sync.get("notification_minute", function(result2) {
            callback(result1.notification_hour, result2.notification_minute);
        });
    });
}



// ***************************************************************
//                     Engagement Streak
// ***************************************************************

/**
 * Sets the engagement streak in days.
 * @param {} numDays the days to save.
 */
function setEngagementStreak(numDays) {
    chrome.storage.sync.set({engagement_streak: numDays}, function() {
        console.log("Set engagement streak to " + numDays);
    });
}

/**
 * Gets the number of engaged days, and executes a callback with it.
 * @param {} callback the callback to execute.
 */
function getEngagementStreak(callback) {
    chrome.storage.sync.get("engagement_streak", function (result) {
        callback(result.engagement_streak);
    });
}



// ***************************************************************
//                     Workday Settings
// ***************************************************************

/**
 * Sets workday end time.
 * @param {} end_hour hour.
 * @param {} end_minute minute.
 */
function setWorkdayEndTime(end_hour, end_minute) {
    end_hour = end_hour % 24;
    end_minute = end_minute % 60;
    chrome.storage.sync.set({workday_end_hour: end_hour}, function() {
        chrome.storage.sync.set({workday_end_minute: end_minute}, function() {
            console.log("Set the workday end hour for " + end_hour);
            console.log("Set the workday end minute for " + end_minute);
        });
    });
}

/**
 * Gets workday end time and execute callback.
 * @param {} callback function that takes hour and minute.
 */
function getWorkdayEndTime(callback) {
    chrome.storage.sync.get("workday_end_hour", function (result1) {
        chrome.storage.sync.get("workday_end_minute", function(result2) {
            callback(result1.workday_end_hour, result2.workday_end_minute);
        });
    });
}

/**
 * Enables or disables workday notifications.
 * @param {} should_notify true or false.
 */
function setWorkdayEnabled(should_notify) {
    chrome.storage.sync.set({workday_enabled: should_notify}, function() {
        console.log("Set workday enabled to " + should_notify);
    });
}

/**
 * Gets whether workday notifications are enabled.
 * @param {} callback function that takes bool as parameter.
 */
function getWorkdayEnabled(callback) {
    chrome.storage.sync.get("workday_enabled", function(result) {
        callback(result.workday_enabled);
    });
}