angular.module('starter.controllers', ['ngMap'])

.factory('dataStore', function() {
    return {};
})

.controller('mapCtrl', function($cordovaGeolocation, $state, NgMap, dataStore) {
    var mapobj = this;
    var posOptions = { timeout: 10000, enableHighAccuracy: false };
    $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function(position) {
            mapobj.lat = position.coords.latitude
            mapobj.long = position.coords.longitude
                // map.shape.circle.
        }, function(err) {
            console.log(err);
        });



    // mapobj.myLocation = function() {
    //     console.log("In");

    //     $cordovaGeolocation
    //         .getCurrentPosition(posOptions)
    //         .then(function(position) {
    //             mapobj.lat = position.coords.latitude;
    //             mapobj.long = position.coords.longitude;
    //             console.log(position.coords);

    //         }, function(err) {
    //             console.log(err);
    //         });

    // }



    mapobj.nextButton = function() {
        NgMap.getMap().then(function(map) {

            dataStore.map = map;
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });

        $state.go('adminInfo');

    }

})

.controller('adminInfoCtrl', function($state, dataStore) {
    console.log(adminForm);
    adminInfo = this;
    adminInfo.nextButton = function() {

        dataStore.name = adminInfo.name;
        dataStore.email = adminInfo.email;
        dataStore.phoneNo = adminInfo.phoneNo;
        $state.go('finalMap');
    }
})

.controller('finalMapCtrl', function($cordovaGeolocation, dataStore) {
    finalMapObj = this;
    var posOptions = { timeout: 10000, enableHighAccuracy: false };
    $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function(position) {
            finalMapObj.lat = position.coords.latitude
            finalMapObj.long = position.coords.longitude
            console.log(finalMapObj.lat, finalMapObj.long);
            console.log(dataStore.map.shapes);
            console.log(dataStore.map.shapes.circle.getBounds());
            console.log(dataStore.map.shapes.circle.getBounds().contains(new google.maps.LatLng(finalMapObj.lat, finalMapObj.long)));
            console.log("third");
            // map.shape.circle.
        }, function(err) {
            console.log(err);
        });


})