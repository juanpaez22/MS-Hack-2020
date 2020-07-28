// alarm_utils.js
// Utilities for setting notification alarms.

const notification_options = {
    type: "basic",
    iconUrl: "logo(128x128).png",
    title: "Time for your daily check-in!",
    message: "Tell us how you feel today in the Enlighten extension."
};

/**
 * Sets the alarm to go off 24 hours after the last mood input.
 * If it's been more than 24 hours, set the alarm to go off in one hour.
 */
function updateAlarm() {
    chrome.alarms.clear("alarm");
    getMoodData(function (data) {
        var nextTimeStamp = new Date();
        nextTimeStamp.setHours(nextTimeStamp.getHours() + 1);
        if (data != undefined) {
            var lastInputTimestamp = new Date(data[data.length - 1].timestamp);
            lastInputTimestamp.setHours(lastInputTimestamp.getHours() + 24);
            if (lastInputTimestamp > nextTimeStamp) {
                nextTimeStamp = lastInputTimestamp;
            }
        }

        chrome.alarms.create("alarm", {when: nextTimeStamp.getTime()});
        console.log("Setting next reminder for " + nextTimeStamp);
    });
}

// Runs when an alarm fires.
chrome.alarms.onAlarm.addListener(function(alarm) {
    // Notify user, and reset alarm for one more hour.
    chrome.notifications.create(notification_options);
    console.log("Alarm firing!");
    updateAlarm();
});
