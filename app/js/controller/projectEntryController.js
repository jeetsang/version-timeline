'use strict';

/* Controllers */

var projectEntryController = function ($scope,$http, $routeParams) {


    $scope.projects=[];
    $scope.newRelease={};
    $scope.project = {};

    $http.get("data/projects").success(function(projectData){

        $scope.projects=projectData;
        $scope.project.name = $routeParams.name;

    });


    $scope.update=function(){

        console.log($scope.newRelease);
        console.log($scope.project.name);

        $http.get("data/"+$scope.project.name).success(function(oldReleaseData){

                console.log(oldReleaseData);
            $scope.project.releases=oldReleaseData;
            console.log("This is project = "+$scope.project.releases[0]);
            $scope.project.releases.push($scope.newRelease);
            console.log($scope.project);

            $http.post("data/"+$scope.project.name,$scope.project.releases).success(function(data){
                console.log("Post successful");
                window.location="http://localhost:8000/app/";
            });

        });
    };
};

dashBoardApp.controller('projectEntryController', ['$scope','$http', '$routeParams', projectEntryController]);
