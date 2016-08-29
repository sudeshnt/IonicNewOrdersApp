/**
 * Created by surangac on 11/19/2015.
 */
'use strict';
angular.module('clientSocket', []).
factory('socket', function ($rootScope) {
    /*var userName=JSON.parse(localStorage.getItem('authResponse')).userData.userName;
    var orgid=JSON.parse(localStorage.getItem('authResponse')).organizationData.orgId;
    var branchId=JSON.parse(localStorage.getItem('authResponse')).userData.branchId;*/
    var userName='chamika@yahoo.com';
    var orgid=35;
    var branchId=65;
    var socket = io.connect('http://52.221.245.58:443/',{ query: "userName="+userName+"&organizationId="+orgid+"&branchId="+branchId});
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
              console.log("on");
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        },
        status: function(){
            return socket;
        }
    };
});
