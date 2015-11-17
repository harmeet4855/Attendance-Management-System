'use strict';

/**
 * @ngdoc function
 * @name attendanceManagementSysApp.controller:IndividualuserCtrl
 * @description
 * # IndividualuserCtrl
 * Controller of the attendanceManagementSysApp
 */
angular.module('attendanceManagementSysApp')
  .controller('IndividualuserCtrl',
  ['$scope', '$route', '$routeParams','Auth', '$location','$mdDialog','$http','$q','$filter','localStorageService',function ($scope, $route, $routeParams,Auth,$location,$mdDialog,$http,$q,$filter,localStorageService) {



    $scope.userIdentity = Auth.isLoggedIn() ;
    $scope.userAccount = $routeParams.username ;
    $scope.startDate = new Date().getTime();
    $scope.startTime = 'N.A';
    $scope.endTime = 'N.A';
    $scope.data = {
      cb1: false,
      cb2: false
    };
    $scope.tableData = [];

    ///////////////////////////THREE STEPS OF STORAGE

    $scope.retrievedObject = JSON.parse(localStorageService.get($scope.userAccount));
    //console.log(new Date($scope.retrievedObject.attendance[0].date).toDateString());

    if($scope.retrievedObject.attendance.length === 0){
      //alert("1");
      $scope.retrievedObject.attendance.push({
        'date' : $scope.startDate,
        'startTime' : $scope.startTime,
        'endTime' : $scope.endTime
      });

      $scope.tableData = $scope.retrievedObject.attendance;

      localStorageService.set($scope.userAccount,JSON.stringify($scope.retrievedObject));
    }
    else{
      var attendanceLength = $scope.retrievedObject.attendance.length;
      //console.log(new Date($scope.retrievedObject.attendance[attendanceLength - 1].date).toDateString());
      if(new Date($scope.retrievedObject.attendance[attendanceLength - 1].date).toDateString() !== new Date().toDateString()){
        $scope.retrievedObject.attendance.push({
          'date' : $scope.startDate,
          'startTime' : $scope.startTime,
          'endTime' : $scope.endTime
        });
      }


      $scope.tableData = $scope.retrievedObject.attendance;

      localStorageService.set($scope.userAccount,JSON.stringify($scope.retrievedObject));
    }

    /////////////////////////////THREE STEPS OF STORAGE ---END


    ///////////////////////////THREE STEPS OF STORAGE

    $scope.retrievedObject1 = JSON.parse(localStorageService.get($scope.userAccount));

    for(var i=0;i<$scope.retrievedObject1.attendance.length;i++){
      if(new Date($scope.retrievedObject1.attendance[i].date).toDateString() === new Date().toDateString()){
        if($scope.retrievedObject1.attendance[i].startTime !== 'N.A'){
          $scope.data.cb1 = true;
          $scope.startTime = $scope.retrievedObject1.attendance[i].startTime;
          $scope.tableData = $scope.retrievedObject1.attendance;
          if($scope.retrievedObject1.attendance[i].endTime !== 'N.A'){
            $scope.data.cb2 = true;
            $scope.endTime = $scope.retrievedObject1.attendance[i].endTime;
            $scope.tableData = $scope.retrievedObject1.attendance;
          }
        }
      }
    }

    localStorageService.set($scope.userAccount,JSON.stringify($scope.retrievedObject1));


    /////////////////////////////THREE STEPS OF STORAGE ---END


    /////////////////////////////LAYOUT CHANGES FOR ADMIN & USER

    //$scope.userBtnVisiblity = 0;
    //if($scope.userIdentity === 'admin'){
    //  $scope.userBtnVisiblity = 1;
    //  alert($scope.userBtnVisiblity);
    //}

    /////////////////////////////LAYOUT CHANGES FOR ADMIN & USER ---END

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

    /////////////////////////////USERLIST PATH JST FOR ADMIN

    $scope.adminToUserlist = function(){
      $location.path('/users');
    };

    /////////////////////////////USERLIST PATH JST FOR ADMIN----END


    $scope.logoutUser = function(){
      Auth.setUser('');
    };


    $scope.showConfirmStart = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .content('Would you start your day at work?')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Please do it!')
        .cancel('Wait for it!');
      $mdDialog.show(confirm).then(function() {

        $scope.data.cb1 = true;
        var timestamp;
        var d = new Date();
        var h = (d.getHours()<10?'0':'') + d.getHours(),
            m = (d.getMinutes()<10?'0':'') + d.getMinutes();

        //$scope.startDate = d;
        timestamp = d.getTime();
        $scope.startTime = h + ':' + m ;

        ///////////////////////////THREE STEPS OF STORAGE

        $scope.retrievedObject2 = JSON.parse(localStorageService.get($scope.userAccount));

        for(var i=0;i<$scope.retrievedObject2.attendance.length;i++){
          if(new Date($scope.retrievedObject2.attendance[i].date).toDateString() === new Date().toDateString()){
            $scope.retrievedObject2.attendance[i].startTime = $scope.startTime;
          }
        }

        $scope.tableData = $scope.retrievedObject2.attendance;

        localStorageService.set($scope.userAccount,JSON.stringify($scope.retrievedObject2));


        /////////////////////////////THREE STEPS OF STORAGE ---END


      }, function() {
        $scope.data.cb1 = false;
      });
    };

    $scope.showConfirmEnd = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .content('Would you end your day at work?')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Ofcourse!')
        .cancel('Wait for it!');
      $mdDialog.show(confirm).then(function() {
        $scope.data.cb2 = true;
        var d = new Date();
        var h = (d.getHours()<10?'0':'') + d.getHours(),
          m = (d.getMinutes()<10?'0':'') + d.getMinutes();
        $scope.endTime = h + ':' + m ;

        ///////////////////////////THREE STEPS OF STORAGE

        $scope.retrievedObject3 = JSON.parse(localStorageService.get($scope.userAccount));

        for(var i=0;i<$scope.retrievedObject3.attendance.length;i++){
          if(new Date($scope.retrievedObject3.attendance[i].date).toDateString() === new Date().toDateString()){
            $scope.retrievedObject3.attendance[i].endTime = $scope.endTime;
          }
        }

        $scope.tableData = $scope.retrievedObject3.attendance;

        localStorageService.set($scope.userAccount,JSON.stringify($scope.retrievedObject3));


        /////////////////////////////THREE STEPS OF STORAGE ---END


      }, function() {
        $scope.data.cb2 = false;
      });
    };

    $scope.myDate = $scope.todayDate = new Date();
    $scope.minDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() - 2,
      $scope.myDate.getDate()
    );
    $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth(),
      $scope.myDate.getDate()
    );

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


  }]);
