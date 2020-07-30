// popup.js
// Script for pop-up interaction.

/**
 * Runs when popup DOM is loaded.
 */
const initScript = () => {
    console.log("Initialized popup script")
    // TODO: Any initializations-- load initial quote, etc.
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
