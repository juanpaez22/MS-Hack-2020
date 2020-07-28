// storage_utils.js
// Storage utilities, including data getters and setters.

/**
 * Appends a mood rating value with timestamp to data object.
 * Each object in the data array as a val param and a timestamp param.
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
        callback(result.data);
    });
}

/**
 * Change frequency configuration.
 * @param {} frequency the new frequency.
 */
function setConfigNotificationFrequency(inputValue) {
    chrome.storage.sync.set({notification_frequency: inputValue}, function () {
        console.log("Changed frequency: " + inputValue);
    });
}

/**
 * Gets the current frequency value and executes a callback with it.
 * @param {} callback the callback function.
 */
function getConfigNotificationFrequency(callback) {
    chrome.storage.sync.get(['notification_frequency'], function (result) {
        callback(result.notification_frequency);
    });
}