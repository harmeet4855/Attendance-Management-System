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
        'password' : value,
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
    $scope.searchFish   = '';     // set the default search/filter term

    // create the list of sushi rolls
    $scope.sushi = [
      { name: 'Cali Roll', fish: 'Crab', tastiness: 2 },
      { name: 'Philly', fish: 'Tuna', tastiness: 4 },
      { name: 'Tiger', fish: 'Eel', tastiness: 7 },
      { name: 'Rainbow', fish: 'Variety', tastiness: 6 }
    ];


    //////////////////////////////////////////BIG TABLE END


    $scope.logoutUser = function(){
      Auth.setUser('');
    };



    //$scope.trialItems = [
    //  'apple','mango','bet','cat','vet','rat','toy','hat'
    //];
    //
    //
    //$scope.simulateQuery = false;
    //$scope.states = loadAll();
    //$scope.querySearch  = function (query) {
    //  var results = query ? $scope.states.filter( createFilterFor(query) ) : $scope.states,
    //    deferred;
    //  if ($scope.simulateQuery) {
    //    deferred = $q.defer();
    //    $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
    //    return deferred.promise;
    //  } else {
    //    return results;
    //  }
    //};
    //$scope.searchTextChange = function (text) {
    //  $log.info('Text changed to ' + text);
    //};
    //
    //$scope.selectedItemChange = function (item) {
    //  $log.info('Item changed to ' + JSON.stringify(item));
    //};
    ///**
    // * Build `states` list of key/value pairs
    // */
    //function loadAll() {
    //  var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
    //          Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
    //          Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
    //          Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
    //          North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
    //          South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
    //          Wisconsin, Wyoming';
    //  return allStates.split(/, +/g).map( function (state) {
    //    return {
    //      value: state.toLowerCase(),
    //      display: state
    //    };
    //  });
    //}
    ///**
    // * Create filter function for a query string
    // */
    //function createFilterFor(query) {
    //  var lowercaseQuery = angular.lowercase(query);
    //  return function filterFn(state) {
    //    return (state.value.indexOf(lowercaseQuery) === 0);


    //  };
    //}

  }]);


