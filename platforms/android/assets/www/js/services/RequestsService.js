/**
 * Created by Jarir on 16-Aug-16.
 */
(function(){

  angular.module('starter')
    .service('RequestsService', ['$http', '$q', '$ionicLoading',  RequestsService]);

  function RequestsService($http, $q, $ionicLoading){

    var base_url = 'http://54.169.4.162:3004';

    function checkuserstatus(device_token){
      console.log("my device token" , device_token);
      var deferred = $q.defer();
      $ionicLoading.show();
      $http.post(base_url + '/check_user_register_status', {'device_token': device_token})
        .success(function(response){
          $ionicLoading.hide();
          deferred.resolve(response);
        })
        .error(function(data){
          deferred.reject();
        });
      return deferred.promise;
    };

    function register(device_token){
      console.log("my device token" , device_token);
      var deferred = $q.defer();
      $ionicLoading.show();
      $http.post(base_url + '/register', {'device_token': device_token})
        .success(function(response){

          $ionicLoading.hide();
          deferred.resolve(response);

        })
        .error(function(data){
          deferred.reject();
        });
      return deferred.promise;
    };

    function unregister(device_token){
      console.log("my device token" , device_token);
      var deferred = $q.defer();
      $ionicLoading.show();
      $http.post(base_url + '/unregister', {'device_token': device_token})
        .success(function(response){
          $ionicLoading.hide();
          deferred.resolve(response);
        })
        .error(function(data){
          deferred.reject();
        });
      return deferred.promise;
    };

    return {
      register: register,
      unregister: unregister,
      checkuserstatus:checkuserstatus
    };
  }
})();
