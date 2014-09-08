'use strict';


describe('Project Entry controller', function () {
    var scope, projectEntryController,httpBackend, projects, releases;
    beforeEach(module('dashBoardApp'));


    beforeEach(inject(function ($rootScope, $controller,$httpBackend) {
        scope = $rootScope.$new();
        httpBackend=$httpBackend;

        releases=[
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
        ];


        var project = {"name":"promoAdvisor", "description":"Deals with Promotions"};

        projects = [project];

        httpBackend.expectGET('data/projects').respond(projects);



        projectEntryController = $controller('projectEntryController', {
            $scope: scope
        });


    }));



    it('should check no of releases',function(){
        console.log(scope.projects);
        expect(scope.projects.length).toBe(0);
        httpBackend.flush();
        expect(scope.projects.length).toBe(1);
    });

    it('should update individual project release', function(){
        httpBackend.flush();
        projects[0].releases = releases;
        httpBackend.expectGET('data/promoAdvisor').respond(projects[0].releases);
        httpBackend.expectPOST('data/promoAdvisor').respond('');
        scope.project.projectName = 'promoAdvisor';
        scope.newRelease = {
                "versionNumber": 0.2,
                "releaseDate":"01/06/2014",
                "releaseName":"Delta"
        };


        scope.update();
        httpBackend.flush();
        expect(scope.project.releases.length).toBe(2);
    });
});