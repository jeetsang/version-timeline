'use strict';

/* Controllers */

var projectDisplayController = function ($scope, $http,projectService) {

    $scope.projects = [];

    var onProjectsSuccess = function (data) {
        $scope.projects = data;
        var index;
        for (index = 0; index < $scope.projects.length; index++) {
            var project = $scope.projects[index];
            console.log("Inside "+project);

            var callback = function(index){
                return function (releaseData) {
                    $scope.projects[index]['releases'] = releaseData;
                    console.log("I am inside success for "+$scope.projects[index].name);
                };
            };

            $http.get("data/" + project.name + ".json").success(callback(index));
        }
    };

    $http.get("data/projects.json").success(onProjectsSuccess);

};

dashBoardApp.controller('projectDisplayController', ['$scope', '$http','projectService', projectDisplayController]);