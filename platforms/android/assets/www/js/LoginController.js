angular.module('starter').controller('LoginController', function ($scope,$http,$window, $ionicPopup,$timeout,$location,$ionicHistory,$state,RequestsService) {

  $scope.authenticateUser = function (user){
    if(user.username!='' && user.password!=''){
      console.log(window.localStorage.getItem("device_token"));
      RequestsService.register(user.username,user.password,window.localStorage.getItem("device_token")).then(function(response){
        if(response.loginStatus===0) {
          console.log(response);
          window.localStorage.setItem ("logging_status",true);
          console.log(JSON.stringify(window.localStorage));
          window.localStorage.setItem ("authResponse",JSON.stringify(response));
          console.log(JSON.stringify(window.localStorage));
          $ionicPopup.alert({
            template: 'Registered'
          });
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $location.path('/orders');
        }
      });
    }
  };

});
