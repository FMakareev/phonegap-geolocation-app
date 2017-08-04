document.addEventListener("deviceready", onDeviceReady, false);

alert("Я работаю!");

var ErrorConst = [
    {
        statusCode: -1,
        name: "ERROR_ALREADY_REQUESTING",
        method: cordova.plugins.locationAccuracy.ERROR_ALREADY_REQUESTING
    }, {
        statusCode: 0,
        name: "ERROR_INVALID_ACTION",
        method: cordova.plugins.locationAccuracy.ERROR_INVALID_ACTION
    }, {
        statusCode: 1,
        name: "ERROR_INVALID_ACCURACY",
        method: cordova.plugins.locationAccuracy.ERROR_INVALID_ACCURACY
    }, {
        statusCode: 2,
        name: "ERROR_EXCEPTION",
        method: cordova.plugins.locationAccuracy.ERROR_EXCEPTION
    }, {
        statusCode: 3,
        name: "ERROR_CANNOT_CHANGE_ACCURACY",
        method: cordova.plugins.locationAccuracy.ERROR_CANNOT_CHANGE_ACCURACY
    }, {
        statusCode: 4,
        name: "ERROR_USER_DISAGREED",
        method: cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED
    }, {
        statusCode: 5,
        name: "ERROR_GOOGLE_API_CONNECTION_FAILED",
        method: cordova.plugins.locationAccuracy.ERROR_GOOGLE_API_CONNECTION_FAILED
    }


];

var RequestConst = [
    {
        statusCode: 0,
        name: "REQUEST_PRIORITY_NO_POWER",
        method: cordova.plugins.locationAccuracy.REQUEST_PRIORITY_NO_POWER
    }, {
        statusCode: 1,
        name: "REQUEST_PRIORITY_LOW_POWER",
        method: cordova.plugins.locationAccuracy.REQUEST_PRIORITY_LOW_POWER
    }, {
        statusCode: 2,
        name: "REQUEST_PRIORITY_BALANCED_POWER_ACCURACY",
        method: cordova.plugins.locationAccuracy.REQUEST_PRIORITY_BALANCED_POWER_ACCURACY
    }, {
        statusCode: 3,
        name: "REQUEST_PRIORITY_HIGH_ACCURACY",
        method: cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY
    }
];

var SuccessConst = [
    {
        statusCode: 0,
        name: "SUCCESS_SETTINGS_SATISFIED",
        method: cordova.plugins.locationAccuracy.SUCCESS_SETTINGS_SATISFIED
    },{
        statusCode: 1,
        name: "SUCCESS_USER_AGREED",
        method: cordova.plugins.locationAccuracy.SUCCESS_USER_AGREED
    }

];

function onDeviceReady() {
    alert("init");
    myLocationAccuracy()
    RequestConstGenerator();
    SuccessConstGenerator();
    ErrorConstGenerator();
    alert("end");
}

function onSuccess(position) {
    alert("Функция onSuccess");
    var element2 = document.getElementById('plugin');
    var element = document.getElementById('geolocation');
    element2.innerHTML = JSON.stringify(position);
    element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
        'Longitude: ' + position.coords.longitude + '<br />' +
        'Altitude: ' + position.coords.altitude + '<br />' +
        'Accuracy: ' + position.coords.accuracy + '<br />' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
        'Heading: ' + position.coords.heading + '<br />' +
        'Speed: ' + position.coords.speed + '<br />' +
        'Timestamp: ' + position.timestamp + '<br />';
}

function onError(error) {
    alert("Функция onError");
    alert('code: ' + SON.stringify(error.code) + '\n' +
        'message: ' + SON.stringify(error.message) + '\n');
}

function RequestConstGenerator() {
    var wrap = document.getElementById('RequestConst');
    for (var i = 0; i < RequestConst.length; i++) {
        var a = RequestConst[i].method;
        var li = document.createElement('li');
        li.innerHTML = RequestConst[i].name + " - "+ JSON.stringify(a);
        wrap.appendChild(li);
    }
}

function SuccessConstGenerator() {
    var wrap = document.getElementById('SuccessConst');
    for (var i = 0; i < SuccessConst.length; i++) {
        var a = SuccessConst[i].method;
        var li = document.createElement('li');
        li.innerHTML = SuccessConst[i].name + " - "+ JSON.stringify(a);
        wrap.appendChild(li);
    }
}

function ErrorConstGenerator() {
    var wrap = document.getElementById('ErrorConst');
    for (var i = 0; i < ErrorConst.length; i++) {
        var a = ErrorConst[i].method;
        var li = document.createElement('li');
        li.innerHTML = ErrorConst[i].name + " - "+ JSON.stringify(a);
        wrap.appendChild(li);
    }
}



function myLocationAccuracy() {
    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        alert("A request " + (canRequest ? "can" : "cannot") + " currently be made");
        alert(JSON.stringify(canRequest));
        if(canRequest) {
            cordova.plugins.locationAccuracy.request(function(success){
                alert("Successfully made request to invoke native Location Services dialog");
                alert(JSON.stringify(success));
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
            }, function(error){
                alert("Failed to invoke native Location Services dialog");
                alert(JSON.stringify(error))
            },
                cordova.plugins.locationAccuracy.REQUEST_PRIORITY_LOW_POWER
            );
        }
    });
}

function myIsRequesting() {
    cordova.plugins.locationAccuracy.isRequesting(function(requesting){
        alert("A request " + (requesting ? "is" : "is not") + " currently in progress");
        alert(JSON.stringify(requesting));
    });
}






