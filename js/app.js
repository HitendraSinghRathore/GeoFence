angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})


.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('map', {
            url: '/map',
            templateUrl: 'templates/map.html',
            controller: 'mapCtrl',
            controllerAs: 'mapobj'
        })
        .state('adminInfo', {
            url: '/adminInfo',
            templateUrl: 'templates/adminInfo.html',
            controller: 'adminInfoCtrl',
            controllerAs: 'adminInfo'
        })
        .state('finalMap', {
            url: '/finalMap',
            templateUrl: 'templates/finalMap.html',
            controller: 'finalMapCtrl',
            controllerAs: 'finalMapObj'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/map');
})