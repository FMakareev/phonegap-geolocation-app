
document.addEventListener("deviceready", onDeviceReady, false);

alert("Я работаю!");


function onDeviceReady() {
    console.log("Hello");
    alert("Я работаю!");
    var element = document.getElementById('plugin');
        element.innerHTML = JSON.stringify(cordova.plugins.locationAccuracy);

    var locationAccuracy_success = document.getElementById('locationAccuracy-success');
    var locationAccuracy_error = document.getElementById('locationAccuracy-error');
    var locationAccuracy_accuracy = document.getElementById('locationAccuracy-accuracy');
    var canRequest = document.getElementById('canRequest');
    alert("init");
    cordova.plugins.locationAccuracy.request(function (success) {
        alert("Функция success");
        locationAccuracy_success  = JSON.stringify(success);
        alert(JSON.stringify(success));
    }, function (error) {
        alert("Функция error");
        locationAccuracy_error  = JSON.stringify(error);
        alert(JSON.stringify(error));
    }, function (accuracy) {
        alert("Функция accuracy");
        locationAccuracy_accuracy  = JSON.stringify(accuracy);
        alert(JSON.stringify(accuracy));
    });
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        alert("canRequest");
        canRequest.innerHTML = JSON.stringify(canRequest);
        alert(JSON.stringify(canRequest));
    });
    alert("end");
}


function onSuccess(position) {
    alert("Функция onSuccess");
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
    alert("Функция onError");
    alert('code: '    + SON.stringify(error.code)    + '\n' +
        'message: ' + SON.stringify(error.message) + '\n');
}