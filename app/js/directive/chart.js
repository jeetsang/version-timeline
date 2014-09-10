'use strict'

var chart = function(projectUtility){

    function link($scope, element, attrs){

        function updateChart(newValue, oldValue, $scope) {
        //Y-Axis

            var xPadding = 100;
            var yPadding = 50;
            var xAxisRange = 600;
            var yAxisRange = 600;

            var svg = d3.select(element[0]).select('svg');
            svg.selectAll('g').remove();
            svg.selectAll('circle').remove();
            svg.selectAll('path').remove();


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

            //console.log("Release Dates " +releaseDates);


            //Y-Axis
            var minDate = new Date(d3.min(releaseDates));
            var minyDate = new Date(minDate.getFullYear(),minDate.getMonth()-1,1)

            var maxDate = new Date(d3.max(releaseDates));
            var maxyDate = new Date(maxDate.getFullYear(),maxDate.getMonth()+1,1)

//            var yData = releaseDates;

            var yscale = d3.time.scale();
            yscale.domain([maxyDate, minyDate]).range([0,yAxisRange]);

            //console.log(minyDate, maxyDate);

            var yaxis = d3.svg.axis().scale(yscale).
                tickFormat(d3.time.format("%Y %b"))
                .orient('left');

            svg.append('g').call(yaxis).attr('transform','translate('+xPadding+','+yPadding+')');




            //X-Axis

            var xData = projectNames.sort();

            var xscale = d3.scale.linear();
            xscale.domain([0,xData.length]).range([0,xAxisRange]);

            var xaxis = d3.svg.axis().scale(xscale).tickFormat(function(d){return xData[d]})
                .orient('bottom').tickPadding(-20);


            svg.append('g').call(xaxis).attr('transform','translate('+xPadding+','+yPadding+')').attr('class', 'yAxis');

            d3.selectAll('.yAxis .tick')
//                .filter(function(d){ return typeof(d) == "string"; })
                .on("click", function(d){
                    console.log("The d value"+d);
                document.location.href = "#/project/"+xData[d];
            }).style("cursor", "pointer").style('text-color','#428bca');



            //Data Plot

            $scope.projects.forEach(function (project) {
                svg.selectAll('circle' + project.name).data(project.releases).enter().append('circle').attr('r', 3).attr('fill', 'green').attr('class', project.name)
                    .attr('transform', function (eachRelease) {
                        //console.log("The value = " + eachRelease);
                        return 'translate(' + (xscale(xData.indexOf(project.name)) + xPadding) + ',' + (yscale(new Date(eachRelease.releaseDate)) + yPadding) + ')';
                    });

            });

            addDependencies();
            //Dependency Plot

            function addDependencies(){
                $scope.projects.forEach(function (project) {
                    if(typeof project.releases == 'undefined') return;
                    project.releases.forEach(function(release){

                        console.log("Release Dependency = "+release.devDependency);

                        if(typeof release.devDependency == 'undefined') return;
                        release.devDependency.forEach(function(dependency){
                            var releaseInfo = projectUtility.findReleaseInfo($scope.projects, dependency.depProjectName, dependency. depReleaseVersion);
                            if(typeof releaseInfo == 'undefined') return;

                            var lineData = [[xscale(xData.indexOf(project.name)) + xPadding, yscale(new Date(release.releaseDate)) + yPadding]];

                            lineData.push([xscale(xData.indexOf(dependency.depProjectName)) + xPadding, yscale(new Date(releaseInfo.releaseDate)) + yPadding]);

                            var line = d3.svg.line().x(function(d){return d[0]}).y(function(d){return d[1]});

//                            svg.append('path').attr('d', line(lineData)).attr('stroke',"green").attr('fill', 'none');

                            svg.append("svg:defs").selectAll("marker")
                                .data(["end"])      // Different link/path types can be defined here
                                .enter().append("svg:marker")    // This section adds in the arrows
                                .attr("id", String)
                                .attr("viewBox", "0 -5 10 10")
                                .attr("refX", 15)
                                .attr("refY", -1.5)
                                .attr("markerWidth", 8)
                                .attr("markerHeight", 8)
                                .attr("orient", "auto")
                                .append("svg:path")
                                .attr("d", "M0,-5L10,0L0,5");

                            svg.append('path').attr('d', line(lineData)).attr('stroke',"grey").attr('fill', 'none').attr("marker-end", "url(#end)");



                        });
                    });

                });

            }


        }

        $scope.$watch('projects' , updateChart, true);
    }
    return {
        link: link,
        template: "<svg width='800' height='800'></svg>"
    }
};

dashBoardApp.directive('chart', ['projectUtility', chart]);
