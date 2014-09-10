'use strict';
var  projectService=function(){

    this.release={};

     this.setRelease=function(release){
        this.release=release;
    };
    this.getRelesae=function(){

        return this.release;
    };

};
dashBoardApp.service('projectService',projectService);