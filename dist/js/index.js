
$(document).on("deviceready", init);




function init() {
    $("plugin").text(JSON.stringify(cordova.plugins.locationAccuracy))
    alert.log("init");
    cordova.plugins.locationAccuracy.request(function (success) {
        alert.log(success, "success");
    }, function (error) {
        alert.log(error, "error");
    }, function (accuracy) {
        alert.log(accuracy, "error");
    });


    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        alert.log(canRequest, "canRequest");
    });
    alert.log("end");
}