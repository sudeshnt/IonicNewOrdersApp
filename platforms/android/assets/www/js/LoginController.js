angular.module('starter').controller('LoginController', function ($scope,$http,$window, $ionicPopup,$timeout,$location,$ionicHistory,$state,RequestsService) {

  $scope.authenticateUser = function (user){
    if(user.username!='' && user.password!=''){
      console.log('1 authResponse'+JSON.stringify(window.localStorage));
      if(user.username=='admin@mutant.com' && user.password=='mutant' && window.localStorage.getItem("device_token")!==null){
          window.localStorage.setItem ("logging_status",true);
          window.localStorage.setItem ("authResponse",JSON.stringify({isMutant:true,token:window.localStorage.getItem("device_token"),userData:{organizationId:0,branchId:0}}));
          if(window.localStorage.getItem("org_list")==null)
          {
            RequestsService.getAllOrganizations().then(function(response){
              window.localStorage.setItem ("org_list",JSON.stringify(response));
            });
          }
          $ionicPopup.alert({
            template: 'Registered'
          });
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
           $location.path('/orders');
      }else{
          RequestsService.register(user.username,user.password,window.localStorage.getItem("device_token")).then(function(response){
            if(response.loginStatus===0) {
              window.localStorage.setItem ("logging_status",true);
              $scope.authResponse = response;
              window.localStorage.setItem ("authResponse",JSON.stringify(response));
              if(window.localStorage.getItem("org_list")==null)
              {
                RequestsService.getAllOrganizations().then(function(response){
                  window.localStorage.setItem ("org_list",JSON.stringify(response));
                });
              }
              $ionicPopup.alert({
                template: 'Registered'
              });
              $ionicHistory.nextViewOptions({
                disableBack: true
              });
              $location.path('/orders');
            }else if(response.loginStatus==1){
              $ionicPopup.alert({
                template: 'Invalid Username and Password'
              });
            }
          });
      }

    }
  };

});
