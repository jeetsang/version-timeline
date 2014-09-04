'use strict';

/* Controllers */

var projectDisplayController = function ($scope, $http) {

    $scope.projects = [];
    $scope.eachProjects = [];

    var onProjectsSuccess = function (data) {
        $scope.projects = data;
        var index;
        for (index = 0; index < $scope.projects.length; index++) {
            var project = $scope.projects[index];
            $http.get("data/" + project.projectName + ".json").success(function (data) {
                for(var attr in data){
                    project[attr] = data[attr];
                }
            });
        }
    };

    $http.get("data/projects.json").success(onProjectsSuccess);

};

dashBoardApp.controller('projectDisplayController', ['$scope', '$http', projectDisplayController]);