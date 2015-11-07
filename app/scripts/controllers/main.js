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

    $scope.errMsg = '';


    $scope.submit = function(key,val){
      if(key === 'admin' && calcMD5(val) === '5f4dcc3b5aa765d61d8327deb882cf99'){
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
            if(calcMD5(val) === $scope.retrievedObjectPassword){
              Auth.setUser(key);
              document.getElementById('loginForm').reset();
              $location.url('/users/' + key);
            }
            else{
              $scope.errMsg = "NOTE: You need to re-check the password";
            }
          }
          else{
            $scope.errMsg = "NOTE: This user doesn't exist";
          }
        }
      }




    };


  }]);
