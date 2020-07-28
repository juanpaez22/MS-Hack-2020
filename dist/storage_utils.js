// storage_utils.js
// Storage utilities, including data getters and setters.

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
                updateAlarm();
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
    var data = chrome.storage.sync.get('data', function (result) {
        if (result != undefined) {
            callback(result.data);
        }
        else {
            callback(undefined);
        }
    });
}

export {getMoodData,appendMoodData}