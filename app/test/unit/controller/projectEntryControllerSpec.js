'use strict';


describe('Project Display controller', function () {
    var scope, projectEntryController;
    beforeEach(module('dashBoardApp'));


    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        projectEntryController = $controller('projectEntryController', {
            $scope: scope
        });
    }));

    it('basic test', function () {
        expect(scope.project.name).toBe("Project1");
    });
});