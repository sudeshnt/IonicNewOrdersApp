/**
 * Created by Jarir on 16-Aug-16.
 */
(function(){

  angular.module('starter')
    .service('RequestsService', ['$http', '$q', '$ionicLoading',  RequestsService]);

  function RequestsService($http, $q, $ionicLoading,$ionicPopup){

    var base_url = 'http://52.221.245.58:443';
    //var base_url = 'http://54.169.4.162:3004';
   // var base_url = 'http://192.168.8.101:3005';

    function register(userName,password,device_token){
      var deferred = $q.defer();
      $ionicLoading.show();
      $http.post(base_url + '/connectDevice', {userName:userName,password:password,deviceKey: device_token})
        .success(function(response){
          console.log("register response" + JSON.stringify(response));
          $ionicLoading.hide();
          deferred.resolve(response);
        })
        .error(function(data,status){
          $ionicLoading.hide();
          if(status==401){
            $ionicPopup.alert({
              template: 'Not Authorized!'
            });
          }
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
        .error(function(data,status){
          $ionicLoading.hide();
          if(status==401){
            $ionicPopup.alert({
              template: 'Not Authorized!'
            });
          }
          deferred.reject();
        });
      return deferred.promise;
    };

    function getOpenOrders(isMutant,token,parameter){
      var deferred = $q.defer();
      var reqJSON = '';
      var url = '';

      $ionicLoading.show();

      if(isMutant!=undefined){
        if(isMutant==true){
          reqJSON = {deviceKey:token,parameter:parameter};
          url = '/allOrderCriteria';
        }
      }else{
        reqJSON = {token:token,parameter:parameter};
        url = '/orderCriteria';
      }
      console.log("is Mutant"+JSON.stringify(reqJSON));
      $http.post(base_url + url , reqJSON)
        .success(function(response){
          $ionicLoading.hide();
          deferred.resolve(response);
        })
        .error(function(data,status){
          $ionicLoading.hide();
          if(status==401){
            $ionicPopup.alert({
              template: 'Not Authorized!'
            });
          }
          deferred.reject();
        });
      return deferred.promise;
    };

    function acceptRejectOrder(isMutant,status,cartId,narration,token){
        var deferred = $q.defer();
        var reqJSON = '';
        var url = '';

        $ionicLoading.show();

        if(isMutant!=undefined){
          if(isMutant==true){
            reqJSON = {status:status,cartId:cartId,narration:narration,deviceKey:token};
            url = '/adminConfirmOrRejectOrder';
          }
        }else{
          reqJSON = {status:status,cartId:cartId,narration:narration,token:token};
          url = '/confirmOrRejectOrder';
        }
      console.log("is Mutant"+JSON.stringify(reqJSON));
        $http.post(base_url+url,reqJSON)
          .success(function(response){
            $ionicLoading.hide();
            deferred.resolve(response);
          })
          .error(function(data,status){
            $ionicLoading.hide();
            if(status==401){
              $ionicPopup.alert({
                template: 'Not Authorized!'
              });
            }
            deferred.reject();
          });
        return deferred.promise;
    };

    function getBranchDetails(branch_id){
      var deferred = $q.defer();
      $ionicLoading.show();
      console.log(branch_id);
      $http.post(base_url + '/getBranch', {'branch_id': branch_id})
        .success(function(response){
          $ionicLoading.hide();
          deferred.resolve(response);
        })
        .error(function(data,status){
          $ionicLoading.hide();
          if(status==401){
            $ionicPopup.alert({
              template: 'Not Authorized!'
            });
          }
          deferred.reject();
        });
      return deferred.promise;
    };

    return {
      register: register,
      unregister: unregister,
      getOpenOrders: getOpenOrders,
      acceptRejectOrder: acceptRejectOrder,
      getBranchDetails:getBranchDetails
    };
  }
})();
