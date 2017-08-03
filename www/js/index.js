
document.addEventListener("deviceready", onDeviceReady, false);

alert("Я работаю!");


function onDeviceReady() {
    console.log("Hello");
    alert("Я работаю!");
    var element = document.getElementById('plugin');
    var locationAccuracy_success = document.getElementById('locationAccuracy-success');
    var locationAccuracy_error = document.getElementById('locationAccuracy-error');
    var locationAccuracy_accuracy = document.getElementById('locationAccuracy-accuracy');
    element.innerHTML = JSON.stringify(cordova.plugins.locationAccuracy);
    alert("init");
    cordova.plugins.locationAccuracy.request(function (success) {
        locationAccuracy_success  = JSON.stringify(success);
        alert(success, "success");
    }, function (error) {
        locationAccuracy_error  = JSON.stringify(error);
        alert(error, "error");
    }, function (accuracy) {
        locationAccuracy_accuracy  = JSON.stringify(accuracy);
        alert(accuracy, "accuracy");
    });
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        alert(canRequest, "canRequest");
    });
    alert("end");
}


function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
        'Longitude: '          + position.coords.longitude             + '<br />' +
        'Altitude: '           + position.coords.altitude              + '<br />' +
        'Accuracy: '           + position.coords.accuracy              + '<br />' +
        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
        'Heading: '            + position.coords.heading               + '<br />' +
        'Speed: '              + position.coords.speed                 + '<br />' +
        'Timestamp: '          + position.timestamp                    + '<br />';
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}