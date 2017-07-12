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
    alert(position);
    var element = document.getElementById('geolocation');
    var log = document.getElementById('log');
    log.innerHTML = JSON.stringify(position);
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
var btn = document.getElementById('btn-loc');

btn.addEventListener('onclick', getLoc);