'use strict';

describe("Test for project retriever", function(){
    var projectsRetriever, httpBackend, projects;

    beforeEach(module('dashBoardApp'));

    beforeEach(inject(function (_projectsRetriever_, $httpBackend) {
        projectsRetriever = _projectsRetriever_;
        httpBackend = $httpBackend;

        projects = [
            {'name': "promoAdvisor", 'description': "Deals with Promotions"}
        ];

        httpBackend.whenGET('data/projects').respond(projects);


    }));

    it("Get Projects", function(){
        projectsRetriever.projects().then(function(result){
            expect(result.length).toBe(1);
            expect(result[0].name).toBe("promoAdvisor");
            expect(result[0].description).toBe("Deals with Promotions");
        });
        httpBackend.flush();
    });
});