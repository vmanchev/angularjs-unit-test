describe('forceDownload', function () {

  var fileDownloadService,
    $compile,
    $rootScope,
    fileMock = {
      name: 'report.pdf',
      url: '/uploads/123412341234.pdf',
      mime: 'application/pdf'
    };

  beforeEach(function () {
    module('angularjs-unit-test');

    module(function ($provide) {
      $provide.service('fileDownloadService', function () {
        this.download = jasmine.createSpy('download');
      });
    });
  });


  beforeEach(inject(function ($injector) {
    fileDownloadService = $injector.get('fileDownloadService');
    $compile = $injector.get('$compile');
    $rootScope = $injector.get('$rootScope');
  }));


  it('should use fileSownloadService download method', function () {

    $rootScope.fileMock = fileMock;

    var element = $compile('<a href="" force-download data-file="fileMock"></a>')($rootScope);
    $rootScope.$digest();

    element.triggerHandler('click');

    expect(fileDownloadService.download).toHaveBeenCalledWith(fileMock);
  });

});