
document.addEventListener("deviceready", onDeviceReady, false);




function onDeviceReady() {
    console.log("Hello");
    $("plugin").text(JSON.stringify(cordova.plugins.locationAccuracy));
    alert.log("init");
    cordova.plugins.locationAccuracy.request(function (success) {
        alert.log(success, "success");
    }, function (error) {
        alert.log(error, "error");
    }, function (accuracy) {
        alert.log(accuracy, "error");
    });
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        alert.log(canRequest, "canRequest");
    });
    alert.log("end");
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