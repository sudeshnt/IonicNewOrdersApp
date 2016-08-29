angular.module('starter').controller('LoginController', function ($scope,$http,$window, $ionicPopup,$timeout,$location,$ionicHistory,$state) {
  $scope.authenticateUser = function (user){
    if((user.username=="sudesh" && user.password=='sudesh') || (user.username=="darshana" && user.password=='darshana')){
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      window.localStorage.setItem ("logging_status",true);
      $location.path('/orders');
    }
  };
});
