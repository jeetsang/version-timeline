'use strict';

/* Controllers */

var projectDisplayController = function ($scope) {

    $scope.project = {
        'name': 'Project1'
    };

};

dashBoardApp.controller('projectDisplayController', ['$scope', projectDisplayController]);