'use strict';

describe("Test for project utility", function(){
    var projectUtility, projects;

    beforeEach(module('dashBoardApp'));

    beforeEach(inject(function (_projectUtility_) {
        projectUtility = _projectUtility_;

        projects = [
            {'name': "promoAdvisor", 'description': "Deals with Promotions"},
            {'name': "B2B", 'description': "Deals with Promotions",
                'releases':[{'versionNumber':'2.0','releaseDate': '2014-06-01'},{'versionNumber':'1.0','releaseDate': '2014-05-01'}]}
        ]
    }));

    it("give details of individual release", function(){
        var release = projectUtility.findReleaseInfo(projects, 'B2B', '2.0');
        expect(release.releaseDate).toBe('2014-06-01');
    });
});
