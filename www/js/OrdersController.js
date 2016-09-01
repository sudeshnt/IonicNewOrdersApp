angular.module('starter').controller('OrdersController', function ($scope,$http,$window, $ionicPopup,$timeout,$location,RequestsService,$ionicModal,$ionicHistory,$ionicViewService,$filter) {

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function(order) {
      $scope.selectedOrder = order;
      RequestsService.getBranchDetails($scope.selectedOrder.branchId).then(function(response){
        console.log(JSON.stringify(response));
        $scope.selectedBranch = response;
        console.log(JSON.stringify($scope.selectedBranch));
      });
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

    init();

     function init(){
        $scope.authResponse = JSON.parse(window.localStorage.getItem("authResponse"));
        loadOpenOrders();
     };

    function loadOpenOrders(){
      var authResponse = JSON.parse(window.localStorage.getItem("authResponse"));
      var token = authResponse.token;
      var today = new Date();
      var yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      var parameter = {
          "organizationId": authResponse.userData.organizationId,
          "branchId": authResponse.userData.branchId,
          "offset": 0,
          "limit": 100,
          "searchKey": "",
          "searchKeys": [
          ],
          "value": {},
          "values": [
          ],
          "operator": "",
          "operators": [
          ],
          "fromDate": $filter('date')(yesterday, 'yyyy-MM-dd'),
          "toDate": $filter('date')(today, 'yyyy-MM-dd'),
          "orderByKey": "createdDate",
          "orderByValue":"desc",
          "statuses": [
            2,4,5
          ]
        };
        RequestsService.getOpenOrders(authResponse.isMutant,token,parameter).then(function(response){
            $scope.newOrders = response.data;
        });
    };

    $scope.showDeviceKey = function() {
      // Custom popup
      $scope.deviceKey = window.localStorage.getItem("device_token");
      if($scope.deviceKey!=null){
        var myPopup = $ionicPopup.show({
          template: '<textarea name="Text1" cols="40" rows="8" ng-model="deviceKey"></textarea>',
          title: 'Device Token',
          scope: $scope,
          buttons: [
            {text: 'Cancel'}
          ]
        });
      }
    };

    $scope.acceptRejectOrder = function (status) {
      var authResponse = JSON.parse(window.localStorage.getItem("authResponse"));
      var token = authResponse.token;
      $scope.data = {}
      if(status==-1){
          $ionicPopup.show({
            template: '<input type = "text" ng-model = "data.narration">',
            title: 'Reject Order',
            subTitle: 'Enter Reject Reason',
            scope: $scope,
            buttons: [
              { text: 'Cancel' }, {
                text: '<b>Reject</b>',
                type: 'button-danger',
                onTap: function(e) {
                  console.log(JSON.stringify($scope.data));
                  if ($scope.data.narration==undefined) {
                    console.log($scope.data.narration);
                    e.preventDefault();
                  } else {
                    console.log($scope.data.narration);
                    RequestsService.acceptRejectOrder(authResponse.isMutant,status,$scope.selectedOrder.cartId,$scope.data.narration,token).then(function(response){
                      $ionicPopup.alert({
                        template: 'Successful!'
                      }).then(function(res){
                        $window.location.reload(true);
                      });
                    });
                  }
                }
              }
            ]
          });
      }else{
        RequestsService.acceptRejectOrder(authResponse.isMutant,status,$scope.selectedOrder.cartId,$scope.narration,token).then(function(response){
          $ionicPopup.alert({
            template: 'Successful!'
          }).then(function(res){
            $window.location.reload(true);
          });
        });
      }
      /**/
    };

    $scope.logout = function () {
      if($scope.authResponse.isMutant==true){
        $ionicPopup.alert({
          template: 'Unregistered'
        }).then(function(res) {
          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $location.path('/login');
        });
      }else{
        RequestsService.unregister(window.localStorage.getItem("device_token")).then(function(response){
          $ionicPopup.alert({
            template: 'Unregistered'
          }).then(function(res) {
            window.localStorage.clear();
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $location.path('/login');
          });
        });
      }
    };

});
