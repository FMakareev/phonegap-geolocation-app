
document.addEventListener("deviceready", onDeviceReady, false);

alert("Я работаю!");

var ErrorConst = [
    cordova.plugins.locationAccuracy.ERROR_ALREADY_REQUESTING,
    cordova.plugins.locationAccuracy.ERROR_INVALID_ACTION,
    cordova.plugins.locationAccuracy.ERROR_INVALID_ACCURACY,
    cordova.plugins.locationAccuracy.ERROR_EXCEPTION,
    cordova.plugins.locationAccuracy.ERROR_CANNOT_CHANGE_ACCURACY,
    cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED,
    cordova.plugins.locationAccuracy.ERROR_GOOGLE_API_CONNECTION_FAILED
];

var RequestConst = [
    cordova.plugins.locationAccuracy.REQUEST_PRIORITY_NO_POWER,
    cordova.plugins.locationAccuracy.REQUEST_PRIORITY_LOW_POWER,
    cordova.plugins.locationAccuracy.REQUEST_PRIORITY_BALANCED_POWER_ACCURACY,
    cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY
];

var SuccessConst = [
    cordova.plugins.locationAccuracy.SUCCESS_SETTINGS_SATISFIED,
    cordova.plugins.locationAccuracy.SUCCESS_USER_AGREED
];

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
    RequestConstGenerator();
    SuccessConstGenerator();
    ErrorConstGenerator();
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



function RequestConstGenerator() {
    var wrap = document.getElementById('RequestConst');
    for(var i = 0; i < RequestConst.length; i++) {
        var a = RequestConst[i];
        var li = document.createElement('li');
        li.innerHTML = JSON.stringify(a);
        wrap.appendChild(li);
    }
}

function SuccessConstGenerator() {
    var wrap = document.getElementById('SuccessConst');
    for(var i = 0; i < SuccessConst.length; i++) {
        var a = SuccessConst[i];
        var li = document.createElement('li');
        li.innerHTML = JSON.stringify(a);
        wrap.appendChild(li);
    }
}

function ErrorConstGenerator() {
    var wrap = document.getElementById('ErrorConst');
    for(var i = 0; i < ErrorConst.length; i++) {
        var a = ErrorConst[i];
        var li = document.createElement('li');
        li.innerHTML = JSON.stringify(a);
        wrap.appendChild(li);
    }
}