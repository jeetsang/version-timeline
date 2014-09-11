'use strict';

var chart = function (projectUtility) {

    function link($scope, element) {
        var updateChartWithCircles = function () {
            var svg = d3.select(element[0]).select('svg');

            svg.selectAll('circle').remove();

            if(typeof $scope.projects == 'undefined') return;

            $scope.projects.forEach(function (project) {
                svg.selectAll('circle' + project.name).data(project.releases).enter().append('circle').attr('r', 3).attr('fill', 'green').attr('class', project.name)
                    .attr('transform', function (eachRelease) {
                        var cord = coordinates(project.name, eachRelease.releaseDate);
                        return 'translate(' + cord[0] + ',' + cord[1] + ')';
                    })
                    .attr('onmouseover', "this.setAttribute('r', 6)")
                    .attr('onmouseout', "this.setAttribute('r', 3)")
                    .on('click', function(eachRelease){
                        return $scope.clickToOpen(project, eachRelease.versionNumber);
                    });

            });
        };

        var coordinates = function (name, releaseDate) {
            return [
                $scope.xscale($scope.projectNames.indexOf(name)) + $scope.axis.x,
                $scope.yscale(new Date(releaseDate)) + $scope.axis.y
            ]
        };

        $scope.$watch('projects', updateChartWithCircles, true);
    }

    return {
        link: link,
        templateUrl: 'partials/chart.html',
        controller: function ($scope, ngDialog, projectService) {

            $scope.clickToOpen = function (project, versionNumber) {

                projectService.setProject(project,versionNumber);
                ngDialog.open({
                    template: 'partials/projectEntry.html',
                    plain:false,
                    controller: 'projectEntryController',
                    scope:$scope
                });
            };

        }
    }
};

dashBoardApp.directive('chart', ['projectUtility', chart]);
