'use strict';

/* Controllers */

var projectEntryController = function ($scope,$http) {


    $scope.projects=[];
    $scope.newRelease={};
    $scope.project = {};

    $http.get("data/projects").success(function(projectData){

        $scope.projects=projectData;

    });




    $scope.newRelease.featureList=[];

    $scope.addFeature=function(){

        $scope.newRelease.featureList.push($scope.featureValue)
    };

    $scope.newRelease.bugs=[];
    $scope.addBug=function(){

        $scope.newRelease.bugs.push($scope.bugValue);
    };

    $scope.newRelease.comments=[];

    $scope.addComment=function(){

        $scope.newRelease.comments.push($scope.commentValue);
    };

    $scope.newRelease.devDependency=[];

    $scope.addDependency=function(){

        var dep={};
        dep.depProjectName=$scope.depProjectName;
        dep.depReleaseVersion=$scope.depReleaseVersion;


        $scope.newRelease.devDependency.push(dep);

    };



    $scope.update=function(){

        console.log($scope.newRelease);
        console.log($scope.project.projectName);

        $http.get("data/"+$scope.project.projectName).success(function(oldReleaseData){

                console.log(oldReleaseData);
            $scope.project.releases=oldReleaseData;
            console.log("This is project = "+$scope.project.releases[0]);
            $scope.project.releases.push($scope.newRelease);
            console.log($scope.project);

            $http.post("data/"+$scope.project.projectName,$scope.project.releases).success(function(data){
                console.log("Post successful");
                window.location="http://localhost:8000/app/";
            });

        });




    };




};

dashBoardApp.controller('projectEntryController', ['$scope','$http', projectEntryController]);
