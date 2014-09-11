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

        if(typeof versionNumer != 'undefined') {
            $scope.project.releases.forEach(function (release) {
                if (release.versionNumber == versionNumer) {
                    $scope.project.newRelease = release;
                }
            });
        }

        if(typeof  $scope.project.newRelease == 'undefined'){
            $scope.project.newRelease = {};
        }


        $scope.project.newRelease.featureList = [];

        $scope.addFeature = function () {

            $scope.project.newRelease.featureList.push($scope.featureValue)
        };

        $scope.project.newRelease.bugs = [];
        $scope.addBug = function () {

            $scope.project.newRelease.bugs.push($scope.bugValue);
        };

        $scope.project.newRelease.comments = [];

        $scope.addComment = function () {

            $scope.project.newRelease.comments.push($scope.commentValue);
        };

        $scope.project.newRelease.devDependency = [];

        $scope.addDependency = function () {

            var dep = {};
            dep.depProjectName = $scope.depProjectName;
            dep.depReleaseVersion = $scope.depReleaseVersion;


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
