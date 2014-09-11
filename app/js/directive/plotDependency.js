'use strict';

var plotDependency = function (projectUtility) {

    return{
        controller: function($scope, projectUtility){

            var svg = d3.select('#svg');
            $scope.clickCounter = 0;

            var showDependency = function(projectName){
                var project = projectUtility.findProject($scope.projects, projectName);

                if (typeof project.releases == 'undefined') return;

                project.releases.forEach(function (release) {

                    if (typeof release.devDependency == 'undefined') return;

                    release.devDependency.forEach(function (dependency) {

                        var releaseInfo = projectUtility.findReleaseInfo($scope.projects, dependency.depProjectName, dependency.depReleaseVersion);
                        if (typeof releaseInfo == 'undefined') return;

                        var lineData = [coordinates(project.name , release.releaseDate)];

                        lineData.push(coordinates(dependency.depProjectName, releaseInfo.releaseDate));
                        var line = d3.svg.line().x(function (d) {
                            return d[0]
                        }).y(function (d) {
                            return d[1]
                        });

                        svg.append('path').attr('d', line(lineData)).attr('stroke', "grey").attr('fill', 'none').attr("marker-end", "url(#end)")
                            .attr('class', projectName);

                    });
                });
            };

            var coordinates = function (name, releaseDate) {
                return [
                        $scope.xscale($scope.projectNames.indexOf(name)) + $scope.axis.x,
                        $scope.yscale(new Date(releaseDate)) + $scope.axis.y
                ]
            };

            var hideDependency = function(projectName){
                svg.selectAll('path').filter('.'+projectName).remove();
            };

            $scope.clickOnProject = function(project){
                $scope.clickCounter =  ($scope.clickCounter+1) % 2;

                $scope.clickCounter == 1 ? showDependency(project) : hideDependency(project);

            }
        }
    }

};

dashBoardApp.directive('plotDependency', ['projectUtility', plotDependency]);
