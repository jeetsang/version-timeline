var projectUtility = function () {
    return {
        findReleaseInfo: function (projects, projectName, versionNumber) {

            var filteredProject = projects.filter(function (project) {
                return project.name == projectName;
            });

            if(filteredProject == 0 || typeof filteredProject[0].releases == 'undefined')
                return;

            var release = filteredProject[0].releases.filter(function (release) {
                return release.versionNumber == versionNumber;
            });

            return release[0];
        }
    }
};

dashBoardApp.factory('projectUtility', projectUtility);