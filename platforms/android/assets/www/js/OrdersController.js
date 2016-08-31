angular.module('starter').controller('OrdersController', function ($scope,$http,$window, $ionicPopup,$timeout,$location,RequestsService,$ionicModal,$ionicHistory,$ionicViewService,$filter) {

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function(order) {
      $scope.selectedOrder = order;
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
        console.log(JSON.stringify(parameter));
        RequestsService.getOpenOrders(token,parameter).then(function(response){
            $scope.newOrders = response.data;
            console.log("orders count : "+response.data.length);
        });
    };

    $scope.acceptRejectOrder = function (status) {
      var authResponse = JSON.parse(window.localStorage.getItem("authResponse"));
      var token = authResponse.token;
      var narration;
      if(status==-1){
          narration = "rejected without reason";
      }else{
          narration = "";
      }
      RequestsService.acceptRejectOrder(status,$scope.selectedOrder.cartId,narration,token).then(function(response){
          $ionicPopup.alert({
            template: 'Successful!'
          }).then(function(res){
            $scope.closeModal();
            $location.path('/orders');
            $window.location.reload(true)
          });
      });
    };

    $scope.logout = function () {
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

    };

});
