/**
 * Created by jitendrv on 9/9/2014.
 */
'use strict';
var popUpController=function($scope,ngDialog,projectService, projectUtility){
    $scope.displayProjectInfo = function(projectName){

        $scope.clickToOpen(projectUtility.findProject($scope.projects, projectName));
    };

    $scope.clickToOpen=function(project,versionNumber){

        projectService.setProject(project,versionNumber);
        ngDialog.open({
            template: 'partials/projectEntry.html',
            plain:false,
            controller: 'projectEntryController',
            scope:$scope
        });
    };

};

dashBoardApp.controller('popUpController',['$scope','ngDialog','projectService', 'projectUtility', popUpController]);


var popUpDataController=function($scope, ngDialog,$http,projectService){

//
//    $scope.closeSecond = function () {
//        ngDialog.close();
//    };
//
//
//
//    $scope.release={};
//    $scope.release =projectService.getRelesae();
//
//    $scope.removeFeature=function(feature){
//
//        var index=$scope.release.featureList.indexOf(feature);
//        if(index >-1)
//        {
//            $scope.release.featureList.splice(index,1);
//        }
//    }

};
dashBoardApp.controller('popUpDataController',['$scope','ngDialog','$http','projectService',popUpDataController]);
