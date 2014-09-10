'use strict';
var addProjectController=function($scope,$http,projectsRetriever){

   $scope.addProject=function() {

       projectsRetriever.projects().then(function (response) {
           $scope.projects = response;

           $scope.projects.push($scope.project);

           $http.post('data/projects', $scope.projects).success(function (response) {

               console.log("Post successful");
               window.location="http://localhost:8000/app/";

           });
       });

   }
}

dashBoardApp.controller('addProjectController',['$scope','$http','projectsRetriever',addProjectController]);