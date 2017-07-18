angular.module('starter.controllers', ['ngMap'])

.factory('dataStore', function() {
    return {};
})

.controller('mapCtrl', function($cordovaGeolocation, $cordovaToast, $state, NgMap, dataStore) {
    var mapobj = this;
    var posOptions = { timeout: 10000, enableHighAccuracy: false };
    $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function(position) {
            mapobj.lat = position.coords.latitude
            mapobj.long = position.coords.longitude


        }, function(err) {
            console.log(err);
        });


    mapobj.nextButton = function() {
        NgMap.getMap().then(function(map) {
            console.log(map);
            if (map.shapes) {
                dataStore.map = map;
                console.log(map.getCenter());
                console.log('markers', map.markers);
                console.log('shapes', map.shapes);
                $state.go('adminInfo');
            } else {
                $cordovaToast
                    .show('Select a Marker', 'long', 'center')
                    .then(function(success) {
                        // success
                    }, function(error) {
                        // error
                    });

            }
        });



    }

})

.controller('adminInfoCtrl', function($state, dataStore) {
    console.log(adminForm);
    adminInfo = this;
    adminInfo.nextButton = function() {
        dataStore.chkboxSms=adminInfo.chkboxSms;
        dataStore.chkboxEmail=adminInfo.chkboxEmail;
        dataStore.name = adminInfo.name;
        dataStore.email = adminInfo.email;
        dataStore.phoneNo = adminInfo.phoneNo;
        $state.go('finalMap');
    }
})

.controller('finalMapCtrl', function($cordovaGeolocation, dataStore, $cordovaLocalNotification) {
    finalMapObj = this;
    var posOptions = { timeout: 10000, enableHighAccuracy: false };
    if (dataStore.map.shapes.rectangle) {
        shape = "rectangle";
    } else {
        shape = "circle";
    }
    $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function(position) {
            finalMapObj.lat = position.coords.latitude
            finalMapObj.long = position.coords.longitude
            console.log(finalMapObj.lat, finalMapObj.long);

            console.log(dataStore.map.shapes[shape].getBounds().contains(new google.maps.LatLng(finalMapObj.lat, finalMapObj.long)));

            console.log("third");

        }, function(err) {
            console.log(err);
        });

    var watchOptions = {
        timeout: 3000,
        enableHighAccuracy: false // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
        null,
        function(err) {
            // error
        },
        function(position) {
            console.log("position change");
            finalMapObj.lat = position.coords.latitude
            finalMapObj.long = position.coords.longitude
            console.log(finalMapObj.lat, finalMapObj.long);

            if (console.log(dataStore.map.shapes[shape].getBounds().contains(new google.maps.LatLng(finalMapObj.lat, finalMapObj.long)))) {
                console.log("notification");
                $scope.scheduleSingleNotification = function() {
                    $cordovaLocalNotification.schedule({
                        id: 1,
                        title: 'GeoFence',
                        text: 'You have moved out of the Geo Fence',
                        data: {
                            customProperty: 'custom value'
                        }
                    }).then(function(result) {
                        // ...
                    });
                };

            }
        });

})
