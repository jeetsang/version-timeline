'use strict';

var projectsRetriever = function ($http) {
    return {
        projects: function () {
            return $http.get("data/projects").then(function (response) {
                var projects = response.data;
                return projects;
            });
        }
    };
};

dashBoardApp.factory('projectsRetriever', ['$http', projectsRetriever]);