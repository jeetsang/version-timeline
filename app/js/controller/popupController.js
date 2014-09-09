/**
 * Created by jitendrv on 9/9/2014.
 */
'use strict';
var popUpController=function($scope,ngDialog,projectService){




    $scope.clickToOpen=function(name){

        projectService.setProjectName(name);
        ngDialog.open({
            template: 'popUp.html',
            plain:false,
            controller: 'popUpDataController'

        });
    };

};

dashBoardApp.controller('popUpController',['$scope','ngDialog','projectService',popUpController]);


var popUpDataController=function($scope, ngDialog,$http,projectService){


    $scope.closeSecond = function () {
        ngDialog.close();
    };


    $scope.project={};
    $scope.projectName = projectService.getProjectName();
//    $http.get("data/"+projectService.getProjectName()).success(function(projectData){
//
//        $scope.project=projectData;
//
//    });

};
dashBoardApp.controller('popUpDataController',['$scope','ngDialog','$http','projectService',popUpDataController]);
