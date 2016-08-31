// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic.service.core', 'ngCordova',  'ionic.service.push' , 'ui.bootstrap','clientSocket'])

.run(function($ionicPlatform,$location, RequestsService,$ionicHistory,$ionicPopup,$window) {
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

      pushNotification = window.plugins.pushNotification;

      window.onNotification = function(e){
        console.log('notification received',e);
        switch(e.event){
          case 'registered':
            if(e.regid.length > 0){
              var device_token = e.regid;
              console.log(window.localStorage.getItem ("device_token"));
              if(window.localStorage.getItem ("device_token")===null) {
                window.localStorage.setItem ("device_token",device_token);
                console.log('null '+JSON.stringify(window.localStorage.getItem ("device_token")));
              }else{
                console.log('NOT null '+JSON.stringify(window.localStorage.getItem ("device_token")));
              }
            }
            break;
          case 'message':
            console.log('message');
            alert('msg received');
            alert(JSON.stringify(e));
            break;
          case 'error':
            console.log('error');
            alert('error occured');
            break;
        }
      };

      window.errorHandler = function(error){
        alert('an error occured');
      };

      pushNotification.register(
        onNotification,
        errorHandler,
        {
          'badge': 'true',
          'sound': 'true',
          'alert': 'true',
          'senderID': '380260995124',
          'ecb': 'onNotification'
        }
      );

  });

  if(window.localStorage.getItem("logging_status") !== null && window.localStorage.getItem("logging_status") == 'true' && window.localStorage.getItem ("device_token")!==null) {
    console.log("app start");
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    $location.path('/orders');
  }else{
    $location.path('/login');
  }

  $ionicPlatform.registerBackButtonAction(function (){
    if($ionicHistory.currentStateName() === 'login' || $ionicHistory.currentStateName() === 'orders'){
      $ionicPopup.confirm({
        title: 'Exit',
        template: 'Are you sure?'
      }).then(function(option){
        if(option === true){
          navigator.app.exitApp();
        } else {
          console.log('Do nothing');
        }
      });
    } else {
      navigator.app.backHistory();
    }
  }, 100);

  $ionicPlatform.on('resume', function(){
    if (window.localStorage.getItem("logging_status") !== null && window.localStorage.getItem("logging_status") == 'true') {
      console.log("on resume");
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $window.location.reload(true);
      /*$location.path('/orders');*/
    }
  });



})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('loading', {
      url: '/loading',
      templateUrl: 'templates/loading.html',
      controller: ''
    })
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

    $urlRouterProvider.otherwise('/loading');

});


