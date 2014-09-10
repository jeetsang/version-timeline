'use strict'

var chart = function(){

    function link($scope, element, attrs){

        function updateChart(newValue, oldValue, $scope) {
        //Y-Axis

            var svg = d3.select(element[0]).select('svg');
            svg.selectAll('g').remove();
            svg.selectAll('circle').remove();


            var releaseDates = [];
            var projectNames = [""];

            if(typeof $scope.projects == 'undefined') return;

            $scope.projects.forEach(function(p,i){
                projectNames.push(p.name);
                if(typeof p.releases  == "undefined")
                    return;
                p.releases.forEach(function(r, i){
                    releaseDates.push(new Date(r.releaseDate));
                });
            });

            console.log("Release Dates " +releaseDates);


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
        template: "<svg width='800' height='800'></svg>"
    }
};

dashBoardApp.directive('chart', ['projectsRetriever', chart]);
