'use strict';


describe('Project Display controller', function () {
    var scope, projectDisplayController;
    beforeEach(module('dashBoardApp'));


    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        projectDisplayController = $controller('projectDisplayController', {
            $scope: scope
        });
    }));

    it('basic test', function () {
        expect(scope.project.name).toBe("Project1");
    });
});