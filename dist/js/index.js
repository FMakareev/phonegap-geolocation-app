// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
    alert("START");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
//
function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
        'Longitude: ' + position.coords.longitude + '<br />' +
        'Altitude: ' + position.coords.altitude + '<br />' +
        'Accuracy: ' + position.coords.accuracy + '<br />' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
        'Heading: ' + position.coords.heading + '<br />' +
        'Speed: ' + position.coords.speed + '<br />' +
        'Timestamp: ' + position.timestamp + '<br />';
}

// onError Callback receives a PositionError object
//
function onError(error) {
    var element = document.getElementById('error');
    element.innerHTML = 'code: ' + error.code + '\n' +
        'message: ' + error.message + '\n';

}

function getLoc() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}
var btn = document.getElementById('getGeolocation');

btn.addEventListener('onclick', locationAccuracy);

function locationAccuracy() {
    cordova.plugins.locationAccuracy.canRequest(function (canRequest) {
        if (canRequest) {
            cordova.plugins.locationAccuracy.request(function (success) {
                console.log("Successfully requested accuracy: " + success.message);
                getLoc()
            }, function (error) {
                console.error("Accuracy request failed: error code=" + error.code + "; error message=" + error.message);
                if (error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED) {
                    if (window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")) {
                        cordova.plugins.diagnostic.switchToLocationSettings();
                    }
                }
            }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
        }
    });

}
