'use strict';

/* Controllers */

var projectEntryController = function ($scope) {

    $scope.project = {
        'name': 'Project1'
    };

};

dashBoardApp.controller('projectEntryController', ['$scope', projectEntryController]);