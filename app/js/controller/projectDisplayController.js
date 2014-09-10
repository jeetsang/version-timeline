'use strict';

/* Controllers */

var projectDisplayController = function ($scope, $http, projectsRetriever, projectReleaseFinder) {
    projectsRetriever.projects().then(function(projects){
        return projectReleaseFinder.populateReleases(projects).then(function(projectsWithReleaseInfo){
            $scope.projects = projectsWithReleaseInfo;
        });
    });

};

dashBoardApp.controller('projectDisplayController', ['$scope', '$http', 'projectsRetriever', 'projectReleaseFinder', projectDisplayController]);
