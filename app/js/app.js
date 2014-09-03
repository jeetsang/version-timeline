'use strict';

/* App Module */

var dashBoardApp = angular.module('dashBoardApp', ['ngRoute']);

dashBoardApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/projectDisplay.html',
                controller: 'projectDisplayController'
            }).
            when('/project', {
                templateUrl: 'partials/projectEntry.html',
                controller: 'projectEntryController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }
]);

