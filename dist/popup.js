// popup.js
// Script for pop-up interaction.

/**
 * Runs when popup DOM is loaded.
 */
const initScript = () => {
    console.log("Initialized popup script");

    // Get tabs and open home tab by default.
    initTabs();
    openHomeContent();

    // Check if user has already clicked today, and hide buttons if so.
    hasUserClickedToday(function(hasClicked) {
        if(hasClicked) {
            hideMoodCheck();
        }
        else {
            showMoodCheck();
        }
    });

    // Check if user forgot to click yesterday, and reset streak if so.
    hasUserClickedYesterday(function(hasClicked) {
        if (!hasClicked) {
            setEngagementStreak(0); // :(
        }
    })
};

// Initialize script on load
document.addEventListener('DOMContentLoaded', initScript);

// TODO: call this function to see if we should hide the buttons (and do so in callback).
function hasUserClickedToday(callback) {
    getMoodData(function (data) {
        if (data != undefined && data.length > 0) {
            var last_timestamp = new Date(data[data.length - 1].timestamp);
            var current_timestamp = new Date();

            // TODO (bug): fails if day of the month is the same.
            if (last_timestamp.getDate() == current_timestamp.getDate()) {
                callback(true);
            }
            else {
                callback(false);
            }
        }
        else {
            callback(false);
        }
    });
}

// TODO: call this function on user mood input to see if streak should be incremented.
function hasUserClickedYesterday(callback) {
    getMoodData(function (data) {
        if (data != undefined && data.length > 0) {
            var last_timestamp = new Date(data[data.length - 1].timestamp);
            var yesterday_timestamp = new Date();
            yesterday_timestamp.setDate(yesterday_timestamp.getDate() - 1);

            // TODO (bug): fails if day of the month is the same.
            if ((last_timestamp.getDate() == (new Date()).getDate()) && data.length > 1) {
                last_timestamp = new Date(data[data.length - 2].timestamp);
            }

            if (last_timestamp.getDate() == yesterday_timestamp.getDate()) {
                callback(true);
            }
            else {
                callback(false);
            }
        }
        else {
            callback(false);
        }
    });
}

/**
 * Shows div for mood check.
 */
function showMoodCheck() {
    var x = document.getElementById("mood-check");
    x.style.display = "block";
    var y = document.getElementById("post-mood-check");
    y.style.display = "none";
}

/**
 * Hides div for mood check.
 */
function hideMoodCheck() {
    var x = document.getElementById("mood-check");
    x.style.display = "none";
    var y = document.getElementById("post-mood-check");
    y.style.display = "block";
}

/**
 * Recalculates engagement streak. Should only get called when button is pressed.
 */
function recalculateStreak() {
    hasUserClickedYesterday(function(hasClicked) {
        if(hasClicked) {
            getEngagementStreak(function(streak) {
                setEngagementStreak(streak + 1);
            });
        }
        else {
            setEngagementStreak(0);
        }
    });
}

function refreshEngagementStreak() {
    // TODO: Update engagement streak in HTML.
}

/**JQuery button click listeners. */
$(function(){
    $("#-2").click(function(){
        appendMoodData(-2);
        hideMoodCheck();
        recalculateStreak();
    });
    $("#-1").click(function(){
        appendMoodData(-1);
        hideMoodCheck();
        recalculateStreak();
    });
    $("#0").click(function(){
        appendMoodData(0);
        hideMoodCheck();
        recalculateStreak();
    });
    $("#1").click(function(){
        appendMoodData(1);
        hideMoodCheck();
        recalculateStreak();
    });
    $("#2").click(function(){
        appendMoodData(2);
        hideMoodCheck();
        recalculateStreak();
    });
    $("#apply-settings").click(function(){
        var enableReminder = $('#reminder').prop("checked");
        var reminderTime = $('#reminderTime').val();
        var enableWorkdayEnd = $('#dayEnd').prop("checked");
        var dayEndTime = $('#StopWork').val();

        console.log("Reminder time: " + reminderTime);
        console.log("Workday end time: " + dayEndTime);
        console.log()

        setWorkdayEnabled(enableWorkdayEnd);
        setRemindersEnabled(enableReminder);

        if (reminderTime != undefined && reminderTime != "") {
            reminderHours = Number(reminderTime.split(':')[0]);
            reminderMinutes = Number(reminderTime.split(':')[1]);
            setReminderTime(reminderHours, reminderMinutes);
        }

        if (dayEndTime != undefined && dayEndTime != "") {
            dayEndHours = Number(dayEndTime.split(':')[0]);
            dayEndMinutes = Number(dayEndTime.split(':')[1]);
            setWorkdayEndTime(dayEndHours, dayEndMinutes);
        }

        updateWorkdayEndAlarm();
        updateReminderAlarm();
    });
});