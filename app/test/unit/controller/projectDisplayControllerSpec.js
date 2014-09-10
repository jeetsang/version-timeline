'use strict';


describe('Project Display controller', function () {
    var scope, projectDisplayController, httpBackend;
    beforeEach(module('dashBoardApp'));

    beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        var projects = [
            {'name': "promoAdvisor", 'description': "Deals with Promotions"}
        ];
        httpBackend.expectGET('data/projects.json').respond(projects);
        var promoAdvisor = [{"versionNumber": 0.2, "releaseDate": "01/06/2014", "releaseName": "Delta", "featureList": ["feature1", "feature2"],
            "bugs": ["bug1", "bug2"], "comments": ["comment1", "comment2"], "releaseType": "Major", "prevRelease": 0.1,
            "devDependency": [
                {"depProjectName": "B2B", "depReleaseVersion": 0.1},
                {"depProjectName": "P4R", "depReleaseVersion": 0.1}
            ]
        }];
        httpBackend.expectGET('data/promoAdvisor.json').respond(promoAdvisor);

        projectDisplayController = $controller('projectDisplayController', {
            $scope: scope
        });
    }));

//    it('Test To Retrieve Projects', function () {
//        expect(scope.projects.length).toBe(0);
//        httpBackend.flush();
//        expect(scope.projects.length).toBe(1);
//    });
//
//    it('Test To Retrieve Individual Project', function () {
//        httpBackend.flush();
//        expect(scope.projects[0].releases[0].versionNumber).toBe(0.2);
//        expect(scope.projects[0].releases[0].releaseName).toBe("Delta");
//
//    });

});