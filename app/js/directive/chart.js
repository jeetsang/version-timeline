'use strict'

var chart = function(){

    function link($scope, element, attrs){

        console.log("Data to plot "+$scope[attrs.chartData]);

//        projectsRetriever.service().then()

        //Y-Axis
        function updateChart(newValue, oldValue, $scope) {

            var svg = d3.select(element[0]).select('svg');
            svg.selectAll('g').remove();
            svg.selectAll('circle').remove();


            var releaseDates = [];
            var projectNames = [""];
            $scope.projects.forEach(function(p,i){
                projectNames.push(p.name);
                if(typeof p.releases  == "undefined")
                    return;
                p.releases.forEach(function(r, i){
                    releaseDates.push(new Date(r.releaseDate));
                });
            });

            console.log(releaseDates);


            //Y-Axis
            var minDate = new Date(d3.min(releaseDates));
            var minyDate = new Date(minDate.getFullYear(),minDate.getMonth()-1,1)

            var maxDate = new Date(d3.max(releaseDates));
            var maxyDate = new Date(maxDate.getFullYear(),maxDate.getMonth()+1,1)

//            var yData = releaseDates;

            var yscale = d3.time.scale();
            yscale.domain([maxyDate, minyDate]).range([0,400]);

            console.log(minyDate, maxyDate);

            var yaxis = d3.svg.axis().scale(yscale).
                tickFormat(d3.time.format("%Y %b"))
                .orient('left');

            svg.append('g').call(yaxis).attr('transform','translate(100,50)');




            //X-Axis

            var xData = projectNames.sort();

            var xscale = d3.scale.linear();
            xscale.domain([0,xData.length]).range([0,500]);

            var xaxis = d3.svg.axis().scale(xscale).tickFormat(function(d){return xData[d]})
                .orient('bottom');


            svg.append('g').call(xaxis).attr('transform','translate(100,50)');



            //Data Plot

            $scope.projects.forEach(function (d, index) {

                svg.selectAll('circle' + d.name).data(d.releases).enter().append('circle').attr('r', 5).attr('fill', 'green').attr('class', d.name)
                    .attr('transform', function (eachRelease) {
                        console.log("The value = " + eachRelease);
                        return 'translate(' + (xscale(xData.indexOf(d.name)) + 100) + ',' + (yscale(new Date(eachRelease.releaseDate)) + 50) + ')';
                    });

            });

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

dashBoardApp.directive('chart', ['projectsRetriever', chart]);
