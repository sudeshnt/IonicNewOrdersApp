/**
 * Created by Jarir on 16-Aug-16.
 */
(function(){

  angular.module('starter')
    .service('RequestsService', ['$http', '$q', '$ionicLoading',  RequestsService]);

  function RequestsService($http, $q, $ionicLoading){

    var base_url = 'http://52.221.245.58:443';
    //var base_url = 'http://54.169.4.162:3004';
    //var base_url = 'http://192.168.8.102:3005';

    /*function checkuserstatus(device_token){
      console.log("my device token" , device_token);
      var deferred = $q.defer();
      $ionicLoading.show();
      $http.post(base_url + '/checkRegister', {'deviceKey': device_token,organizationId: 35})
        .success(function(response){
          $ionicLoading.hide();
          deferred.resolve(response);
        })
        .error(function(data){
          deferred.reject();
        });
      return deferred.promise;
    };*/

    function register(userName,password,device_token){
      var deferred = $q.defer();
      $ionicLoading.show();
      $http.post(base_url + '/connectDevice', {userName:userName,password:password,deviceKey: device_token})
        .success(function(response){
          console.log("register response" + JSON.stringify(response));
          $ionicLoading.hide();
          deferred.resolve(response);
        })
        .error(function(data){
          deferred.reject();
        });
      return deferred.promise;
    };

    function unregister(device_token){
      console.log("my device token"+ device_token);
      var deferred = $q.defer();
      $ionicLoading.show();
      $http.post(base_url + '/disconnectDevice', {'deviceKey': device_token,organizationId: 35})
        .success(function(response){
          console.log("unregister response" + JSON.stringify(device_token));
          $ionicLoading.hide();
          deferred.resolve(response);
        })
        .error(function(data){
          deferred.reject();
        });
      return deferred.promise;
    };

    function getOpenOrders(token,parameter){
      var deferred = $q.defer();
      $ionicLoading.show();
      console.log(JSON.stringify({token:token,parameter:parameter}));
      $http.post(base_url + '/orderCriteria',{token:token,parameter:parameter})
        .success(function(response){
          $ionicLoading.hide();
          deferred.resolve(response);
        })
        .error(function(data){
          $ionicLoading.hide();
          $ionicPopup.alert({
            template: 'System Error'
          });
          deferred.reject();
        });
      return deferred.promise;
    };

    function acceptRejectOrder(status,cartId,narration,token){
        var deferred = $q.defer();
        $ionicLoading.show();
        $http.post(base_url + '/confirmOrRejectOrder',{status:status,cartId:cartId,narration:narration,token:token})
          .success(function(response){
            $ionicLoading.hide();
            deferred.resolve(response);
          })
          .error(function(data){
            $ionicLoading.hide();
            $ionicPopup.alert({
              template: 'System Error'
            });
            deferred.reject();
          });
        return deferred.promise;
    };

    return {
      register: register,
      unregister: unregister,
      getOpenOrders: getOpenOrders,
      acceptRejectOrder: acceptRejectOrder
    };
  }
})();
