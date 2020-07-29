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

JQuery listener
$(function(){

    // Demo query showing how storage works when a button is clicked.
    // Gets previous result, and sets new result in the callback.
    $('#test_button').click(function(){

        getMoodData(function (data) {
            var new_num = 0;
            if (data != undefined) {
                new_num = data[data.length - 1].val + 1;
            }
            console.log("Previous final data element: ", new_num);
            appendMoodData(new_num);
        });
    });

    TODO: add listener for real buttons
});
