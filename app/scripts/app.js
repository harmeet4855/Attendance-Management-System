'use strict';

/**
 * @ngdoc overview
 * @name attendanceManagementSysApp
 * @description
 * # attendanceManagementSysApp
 *
 * Main module of the application.
 */
angular
  .module('attendanceManagementSysApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngAria',
    'ngMaterial',
    'ngMessages',
    'materialCalendar',
    'LocalStorageModule'
  ])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default');
    //.primaryPalette('pink');
      //.accentPalette('orange');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'users'
      })
      .when('/users/:username', {
        templateUrl: 'views/individualuser.html',
        controller: 'IndividualuserCtrl',
        controllerAs: 'individualUser'
      })
      .otherwise({
        redirectTo: '/error',
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl',
        controllerAs: 'error'
      });
  })
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('')
      .setNotify(true, true);
  })
  .factory('Auth', function(){
    var user;

    return{
      setUser : function(aUser){
        user = aUser;

      },
      isLoggedIn : function(){
        return(user)? user : false;
      }
    };
  });
  //.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
  //  $rootScope.$on('$routeChangeStart', function (event) {
  //
  //    if (!Auth.isLoggedIn()) {
  //      console.log('DENY');
  //      event.preventDefault();
  //      $location.path('/');
  //    }
  //    else {
  //      console.log('ALLOW');
  //      $location.path('/users');
  //    }
  //  });
  //}]);

