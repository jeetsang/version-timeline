'use strict';
describe('Add project controller',function(){

    var scope,addProjectController,httpBackend;

    beforeEach(module('dashBoardApp'));

    beforeEach(inject(function($rootScope,$controller,$httpBackend){

        scope=$rootScope.$new();
        httpBackend=$httpBackend;

        var projects = [
            {'name': "promoAdvisor", 'description': "Deals with Promotions"}
        ];

        httpBackend.expectGET('data/projects').respond(projects);
        scope.project = {'name': "promoAdvisor", 'description': "Deals with Promotions"};

        httpBackend.expectPOST('data/projects').respond('');


        addProjectController=$controller('addProjectController',{
            $scope:scope
        });

    }));


//    it('should update projects',function(){
//        scope.addProject();
//        httpBackend.flush();
//        expect(scope.projects.length).toBe(2);
//
//    });
});