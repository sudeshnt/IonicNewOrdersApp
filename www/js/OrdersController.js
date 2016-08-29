angular.module('starter').controller('OrdersController', function ($scope,$http,$window, $ionicPopup,$timeout,$location,RequestsService,$ionicModal,$ionicHistory,$ionicViewService) {

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

    $scope.newOrders = [];
    $scope.device_token = null;

    pushNotification = window.plugins.pushNotification;

    window.onNotification = function(e){
      console.log('notification received');
      console.log(e.event);
      switch(e.event){
        case 'registered':
          console.log(e.regid);
          if(e.regid.length > 0){
            var device_token = e.regid;
            $scope.device_token = device_token;
            window.localStorage.setItem ("device_token",device_token);
            RequestsService.checkuserstatus(device_token).then(function(response){
              if(response==='not_exist') {
                RequestsService.register(device_token).then(function (response) {
                  console.log(response);
                  alert('registered!');
                });
              }
            });

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

  $scope.logout = function () {
    RequestsService.unregister($scope.device_token).then(function(response){
      alert('unregistered!');
      window.localStorage.setItem ("logging_status",false);
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $location.path('/login');
    });

  };

});
