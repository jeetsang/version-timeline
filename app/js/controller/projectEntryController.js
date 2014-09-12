'use strict';

/* Controllers */

var projectEntryController = function ($scope, $http, $routeParams, projectService, projectReleaseFinder, projectUtility) {

        $scope.project = {};
        $scope.project.releases = [];

        var versionNumer = "";
        var versionindex = 0;


        var project = projectService.getProject();
        $scope.project = project;
        versionNumer = projectService.getVersionNumber();

        if (typeof versionNumer != 'undefined') {
            $scope.project.releases.forEach(function (release) {
                if (release.versionNumber == versionNumer) {
                    $scope.project.newRelease = release;
                }
            });
        }

        if (typeof  $scope.project.newRelease == 'undefined') {
            $scope.project.newRelease = {};
        }

        if (typeof   $scope.project.newRelease.bugs == 'undefined') {
            $scope.project.newRelease.bugs = [];
        }

        if (typeof   $scope.project.newRelease.featureList == 'undefined') {
            $scope.project.newRelease.featureList = [];
        }

        if (typeof   $scope.project.newRelease.comments == 'undefined') {
            $scope.project.newRelease.comments = [];
        }

        if (typeof   $scope.project.newRelease.devDependency == 'undefined') {
            $scope.project.newRelease.devDependency = [];
        }

        $scope.addDependency = function () {

            var dep = {};
            dep.depProjectName = $scope.depProject.name;
            dep.depReleaseVersion = $scope.depRelease.versionNumber;


            $scope.project.newRelease.devDependency.push(dep);

        };

        $scope.update = function () {

            var filteredRelease = projectUtility.findReleaseInfo($scope.projects, $scope.project.name, $scope.project.newRelease.versionNumber);
            if (typeof filteredRelease == 'undefined') {
                $scope.project.releases.push($scope.project.newRelease);
                console.log($scope.project);
            }
            else {
                filteredRelease = $scope.project.newRelease;
            }

            $http.post("data/" + $scope.project.name, $scope.project.releases).success(function (data) {
                console.log("Post successful");
                window.location = "http://localhost:8000/app/";
            });

        };
    }
    ;

dashBoardApp.controller('projectEntryController', ['$scope', '$http', '$routeParams', 'projectService', 'projectReleaseFinder', 'projectUtility', projectEntryController]);
