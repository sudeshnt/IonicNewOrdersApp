// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic.service.core', 'ngCordova',  'ionic.service.push' , 'ui.bootstrap','clientSocket'])

.run(function($ionicPlatform,$location, RequestsService,$ionicHistory) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    if (window.localStorage.getItem("logging_status") !== null && window.localStorage.getItem("logging_status") == 'true') {
      console.log("app start");
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $location.path('/orders');
    }

});

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })
    .state('orders', {
      url: '/orders',
      templateUrl: 'templates/orders.html',
      controller: 'OrdersController'
    })

    $urlRouterProvider.otherwise('/login');

});


