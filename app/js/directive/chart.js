'use strict'

var chart = function(){

    function link($scope, element, attrs){

        console.log("Data to plot "+$scope[attrs.chartData]);

        //Y-Axis
        function updateChart(newValue, oldValue, $scope) {

            var releaseDates = [];
            $scope.projects.forEach(function(p,i){
                if(typeof p.releases  == "undefined")
                    return;
                p.releases.forEach(function(r, i){
                    releaseDates.push(new Date(r.releaseDate));
                });
            });

            console.log(releaseDates);

            var minDate = new Date(d3.min(releaseDates));
            var minyDate = new Date(minDate.getFullYear(),minDate.getMonth(),1)

            var maxDate = new Date(d3.max(releaseDates));
            var maxyDate = new Date(maxDate.getFullYear(),maxDate.getMonth(),1)

//            var yData = releaseDates;

            var yscale = d3.time.scale();
            yscale.domain([maxyDate, minyDate]).range([0,400]);

            console.log(minyDate, maxyDate);

            var axis = d3.svg.axis().scale(yscale).
                tickFormat(d3.time.format("%Y %d"))
                .orient('left');

            var svg = d3.select(element[0]).select('svg');
            svg.append('g').call(axis).attr('transform','translate(100,50)');
        }

        $scope.$watch('projects' , updateChart, true);
    }
    return {
        link: link,
        template: "<svg width='800' height='800'></svg>",
        controller: ['$scope', '$http', function($scope, $http){
            $scope.projects = [];

            var onProjectsSuccess = function (data) {
                $scope.projects = data;
                var index;
                for (index = 0; index < $scope.projects.length; index++) {
                    var project = $scope.projects[index];
                    console.log("Inside "+project);

                    var callback = function(index){
                        return function (releaseData) {
                            $scope.projects[index]['releases'] = releaseData;
                            console.log("I am inside success for "+$scope.projects[index].name);
                        };
                    };

                    $http.get("data/" + project.name + ".json").success(callback(index));
                }
            };

            $http.get("data/projects.json").success(onProjectsSuccess);

        }]
    }
};

dashBoardApp.directive('chart', chart);
