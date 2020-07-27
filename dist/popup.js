// popup.js
// Script for pop-up interaction.

/**
 * Runs when popup DOM is loaded.
 */
const initScript = () => {
    console.log("Initialized popup script")
    // TODO: Any initializations-- load initial quote, etc.
};

/**
 * Appends a mood rating value with timestamp to data object.
 * @param {} inputValue the user's mood input.
 */
function appendData(inputValue) {
    chrome.storage.sync.get({data: []}, function (result) {
        var data = result.data;
        data.push({val: inputValue, timestamp: Date()});
        chrome.storage.sync.set({data: data}, function () {
            chrome.storage.sync.get('data', function (result) {
                console.log("New data:")
                console.log(result.data)
            });
        });
    });
}

// window.open('popup.html', "newWin", "width="+screen.availWidth+",height="+screen.availHeight)

// Initialize script on load
document.addEventListener('DOMContentLoaded', initScript);

// JQuery listener
$(function(){

    // Demo query showing how storage works when a button is clicked
    $('#test_button').click(function(){
        appendData(5);
    });

    // TODO: add listener for real buttons
});
