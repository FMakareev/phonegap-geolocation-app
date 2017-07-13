
$(document).on("deviceready", getLocation);

function getLocation() {
    alert('GETLOCATION');
    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        if(canRequest){
            alert(canRequest + ' if');
            cordova.plugins.locationAccuracy.request(function(){
                alert("Request successful");
                }, function (error){
                alert("Request failed");
                    if(error){
                        // Android only
                        alert("error code="+error.code+"; error message="+error.message);
                        if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                            if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                                cordova.plugins.diagnostic.switchToLocationSettings();
                            }
                        }
                    }
                }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY // iOS will ignore this
            );
        } else {
            alert(canRequest + ' else');
        }
    });
}

