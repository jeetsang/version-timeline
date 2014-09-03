'use strict';

/* Controllers */

var projectDisplayController = function ($scope, $http) {

    $scope.projects = [];

    var onSuccess = function(data){
        $scope.projects = data;
    };

    $http.get("data/projects.json").success(onSuccess);

};

dashBoardApp.controller('projectDisplayController', ['$scope', '$http', projectDisplayController]);