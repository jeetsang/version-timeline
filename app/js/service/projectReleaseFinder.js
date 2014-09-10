'use strict';

var projectReleaseFinder = function ($http, $q) {
    return {
        populateReleaseForProject: function (project) {

            return $http.get("data/" + project.name + ".json")
                .then(function (response) {
                    return response.data;
                });

        },
        populateReleases: function (projects) {
            var promises = [];
            projects.forEach(function(project){
                var promise = $http.get("data/" + project.name + ".json")
                    .then(function (response) {
                        project.releases = response.data;
                    });
                promises.push(promise);
                console.log(project);
            });

            console.log(promises.length);
            return $q.all(promises);
        }
    }
};

dashBoardApp.factory('projectReleaseFinder', ['$http', '$q', projectReleaseFinder]);