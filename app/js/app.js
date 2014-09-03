'use strict';

/* App Module */

var dashBoardApp = angular.module('dashBoardApp', [
  'ngRoute',
  'dashBoardControllers'
]);

dashBoardApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/projectDisplay.html',
        controller: 'projectDisplayCtrl'
      }).
      when('/project', {
        templateUrl: 'partials/projectEntry.html',
        controller: 'projectEntryCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);