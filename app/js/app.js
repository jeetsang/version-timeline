'use strict';

/* App Module */

var dashBoardApp = angular.module('dashBoardApp', ['ngRoute','ngDialog']);

dashBoardApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/display', {
                templateUrl: 'partials/projectDisplay.html',
                controller: 'projectDisplayController'
            }).
            when('/project/:name', {
                templateUrl: 'partials/projectEntry.html',
                controller: 'projectEntryController'
            }).
            when('/addProject/',{
                templateUrl:'partials/addProject.html',
                controller:'addProjectController'
            }).
            otherwise({
                redirectTo: '/display'
            });
    }
]);
