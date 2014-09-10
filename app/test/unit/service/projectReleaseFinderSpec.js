'use strict';

describe("Test for project release finder", function(){
    var projectReleaseFinder, httpBackend, project;

    beforeEach(module('dashBoardApp'));

    beforeEach(inject(function (_projectReleaseFinder_, $httpBackend) {
        projectReleaseFinder = _projectReleaseFinder_;
        httpBackend = $httpBackend;

        project = {'name': "promoAdvisor", 'description': "Deals with Promotions"};

        project.releases = [{"versionNumber": 0.2, "releaseDate": "01/06/2014", "releaseName": "Delta"}];

        httpBackend.expectGET('data/promoAdvisor.json').respond(project);
    }));

    it("Individual Project Release", function(){
        projectReleaseFinder.populateReleaseForProject(project).then(function(response){
            expect(response.releases.length).toBe(1);
            expect(response.releases[0].releaseName).toBe("Delta");
        });
        httpBackend.flush();
    });

    it("All Project releases", function(){
        var projects = [];
        projects.push(project);
        projects.push({'name': "B2B", 'description': "Business to Business"});
        projectReleaseFinder.populateReleases(projects).then(function(response){
            expect(response.length).toBe(2);
            expect(response[0].releases[0].releaseName).toBe("Delta");
            expect(response[1].name).toBe("B2B");
        });

    });
});