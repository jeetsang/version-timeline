'use strict';
var  projectService=function(){

    this.projectName="";

     this.setProjectName=function(name){
        this.projectName=name;
    };
    this.getProjectName=function(){

        return this.projectName;
    };

};
dashBoardApp.service('projectService',projectService);