'use strict';

/**
 * @ngdoc function
 * @name attendanceManagementSysApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the attendanceManagementSysApp
 */
var app = angular.module('attendanceManagementSysApp')
  .controller('UsersCtrl', ['$scope','Auth', '$location','$timeout', '$q', '$log','localStorageService', function ($scope, Auth, $location,$timeout, $q, $log,localStorageService) {

    $scope.userlist = localStorageService.keys();
    $scope.counter = 0;
    $scope.sign = '+';

    $scope.$watch(Auth.isLoggedIn, function (value, oldValue) {
      console.log(Auth.isLoggedIn());

      if(!value) {
        console.log("Disconnect");
        $location.path('/');
      }
      else{
        if(value !== 'admin'){
          //if(value !== $routeParams.username){
          console.log("Disconnect");
          $location.path('/users/' + value);
          //}
        }
      }

    });


    $scope.addUserCounter = function(){
      document.getElementById('addUserForm').reset();
      $scope.counter++;
      if($scope.counter%2){
        $scope.sign = 'x';
      }
      else{
        $scope.sign = '+';
      }
    };

    $scope.addUser = function(key,value){
      var userObject = {
        'password' : calcMD5(value),
        'attendance' : [

        ]
      };
      document.getElementById('addUserForm').reset();
      return localStorageService.set(key,JSON.stringify(userObject));
    };


    $scope.retrieve = function(){
      $scope.userlist = localStorageService.keys();
      //console.log($scope.allKeys);
    };

    //////////////////////////////////////////BIG TABLE


    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchUser  = '';     // set the default search/filter term

    //////////////////////////////////////////BIG TABLE END


    $scope.logoutUser = function(){
      Auth.setUser('');
    };




  }]);


