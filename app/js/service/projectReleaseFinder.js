'use strict';

var projectReleaseFinder = function ($http, $q) {
    return {
        populateReleaseForProject: function (project) {

            return $http.get("data/" + project.name + ".json")
                .then(function (response) {
                    project.releases = response.data;
                    return project;
                });

        },
        populateReleases: function (projects) {
            var promises = [];
            projects.forEach(function(project){
                var promise = this.populateReleaseForProject(project);
                promises.push(promise);
                console.log(project);
            },this);

            console.log(promises.length);
            return $q.all(promises);
        }
    }
};

dashBoardApp.factory('projectReleaseFinder', ['$http', '$q', projectReleaseFinder]);