angular.module('starter.controllers1', [])
    .controller('mapCtrl', function($cordovaGeolocation) {
        var map = this;
        var posOptions = { timeout: 10000, enableHighAccuracy: false };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function(position) {
                map.lat = position.coords.latitude
                map.long = position.coords.longitude

            }, function(err) {
                console.log(err);
            });
        map.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDKgexd1gSURNeMwHAJ9QAAMKFX_madF10";
    })