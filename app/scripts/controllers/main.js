'use strict';

/**
 * @ngdoc function
 * @name attendanceManagementSysApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the attendanceManagementSysApp
 */
angular.module('attendanceManagementSysApp')
  .controller('MainCtrl', ['$scope','localStorageService','$location','Auth',function ($scope,localStorageService,$location,Auth) {

    $scope.userlist = localStorageService.keys();
    $scope.generalUser = null;
    function getItem(key) {
      return localStorageService.get(key);
    }



    $scope.submit = function(key,val){
      if(key === 'admin' && val === 'password'){
        console.log('Admin enter');
        Auth.setUser(key);
        $location.url('/users');
      }
      else{
        if(key === undefined || val === undefined){
          return false;
        }
        else {
          var userExists = $scope.userlist.indexOf(key) + 1;
          if(userExists) {
            $scope.retrievedObjectPassword = JSON.parse(getItem(key)).password;
            if(val === $scope.retrievedObjectPassword){
              Auth.setUser(key);
              document.getElementById('loginForm').reset();
              $location.url('/users/' + key);
            }
          }
          else{

          }
        }
      }




    };


  }]);
