var projectUtility = function () {
    return {
        findReleaseInfo: function (projects, projectName, versionNumber) {

            var filteredProject = this.findProject(projects, projectName);

            if(typeof filteredProject == 'undefined' || typeof filteredProject.releases == 'undefined')
                return;

            var release = filteredProject.releases.filter(function (release) {
                return release.versionNumber == versionNumber;
            });

            return release[0];
        },

        findProject: function(projects, projectName){
            var filteredProject = projects.filter(function (project) {
                return project.name == projectName;
            });

            return filteredProject[0];
        }
    }
};

dashBoardApp.factory('projectUtility', projectUtility);