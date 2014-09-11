'use strict';
var  projectService=function(){

   this.project={};
   this.versionNumber = "";


     this.setProject=function(project,versionNumber){
        this.project = project;
         this.versionNumber=versionNumber;
    };
    this.getProject=function(){

        return this.project;
    };

    this.getVersionNumber=function(){

        return this.versionNumber;
    };


};
dashBoardApp.service('projectService',projectService);