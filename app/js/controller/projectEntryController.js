'use strict';

/* Controllers */

var projectEntryController = function ($scope,$http) {

    var newReleaseObject=[];





};

dashBoardApp.controller('projectEntryController', ['$scope','$http', projectEntryController]);

{
    "versionNumber": 0.2,
    "releaseDate":"01/06/2014",
    "releaseName":"Delta",
    "featureList":[
    "feature1",
    "feature2"
],
    "bugs":[
    "bug1",
    "bug2"
],
    "comments":[
    "comment1",
    "comment2"
],
    "releaseType":"Major",
    "prevRelease":0.1,
    "devDependency":[
    {
        "depProjectName":"B2B",
        "depReleaseVersion":0.1
    },
    {
        "depProjectName":"P4R",
        "depReleaseVersion":0.1
    }
]


}
]