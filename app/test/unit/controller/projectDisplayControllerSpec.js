'use strict';


describe('Project Display controller', function () {
    var scope, projectDisplayController, httpBackend;
    beforeEach(module('dashBoardApp'));

    beforeEach(inject(function ($rootScope, $controller, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        var projects = [
            {'projectName': "promoAdvisor", 'description': "Deals with Promotions"}
        ];
        httpBackend.expectGET('data/projects.json').respond(projects);
        projectDisplayController = $controller('projectDisplayController', {
            $scope: scope
        });
    }));

    it('Test To Retrieve Projects', function () {
        expect(scope.projects.length).toBe(0);
        httpBackend.flush();
        expect(scope.projects.length).toBe(1);
    });

});