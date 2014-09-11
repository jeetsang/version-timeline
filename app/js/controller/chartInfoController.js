var chartInfoController = function ($scope) {

    var chartLayout = function () {
        $scope.graph = {width: 900, height: 900};

        $scope.axis = {x: 100, y: 50};
        $scope.yAxisRange = 600;
        $scope.xAxisRange = 600;

        var releaseDates = [];
        $scope.projectNames = [""];

        if (typeof $scope.projects == 'undefined') return;

        $scope.projects.forEach(function (p, i) {
            $scope.projectNames.push(p.name);
            if (typeof p.releases == "undefined")
                return;
            p.releases.forEach(function (r, i) {
                releaseDates.push(new Date(r.releaseDate));
            });
        });


        var minDate = new Date(d3.min(releaseDates));
        var minyDate = new Date(minDate.getFullYear(), minDate.getMonth() - 1, 1);

        var maxDate = new Date(d3.max(releaseDates));
        var maxyDate = new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 1);

        var months = maxDate.getFullYear() - minyDate.getFullYear() * 12;
        months += maxDate.getMonth() - minDate.getMonth();

        $scope.yscale = d3.time.scale();
        $scope.yscale.domain([maxyDate, minyDate]).range([0 , $scope.yAxisRange]);

        var yaxis = d3.svg.axis().scale($scope.yscale).tickFormat(d3.time.format("%Y %b")).ticks(months);
        $scope.yaxisLabels = yaxis.scale().ticks();


        $scope.projectNames = $scope.projectNames.sort();

        $scope.xscale = d3.scale.linear();
        $scope.xscale.domain([0, $scope.projectNames.length]).range([0, $scope.xAxisRange]);

        var xaxis = d3.svg.axis().scale($scope.xscale).tickFormat(function (d) {
            return $scope.projectNames[d]
        })
            .orient('bottom').tickPadding(-20);

        $scope.xaxisLabels = xaxis.scale().ticks();
    };

    $scope.$watch('projects', chartLayout, true);
};

dashBoardApp.controller('chartInfoController', ['$scope', chartInfoController]);