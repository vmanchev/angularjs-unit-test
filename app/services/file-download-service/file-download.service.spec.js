describe('itemService', function () {

  var $httpBackend,
    fileDownloadService;

  beforeEach(function () {
    module('angularjs-unit-test');
  });

  var rawFile = {
    data: 'qwertyuiopasdfghjklzxcvbnm'
  };

  var fileMock = {
    url: '/uploads/1.pdf',
    name: 'report.pdf',
    mime: 'application/pdf'
  };


  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    fileDownloadService = $injector.get('fileDownloadService');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('download', function () {

    beforeEach(function () {
      $httpBackend.expectGET('/uploads/1.pdf').respond(200, rawFile);
    });

    it('should perform a GET request for the selected file', function () {
      fileDownloadService.download(fileMock);
      $httpBackend.flush();
    });

  });


});