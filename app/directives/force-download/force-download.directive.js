angular
  .module('angularjs-unit-test')
  .directive('forceDownload', function (fileDownloadService) {
    return {
      restrict: 'A',
      scope: {
        file: '='
      },
      link: function (scope, element) {

        element.on('click', function (e) {
          e.preventDefault();
          fileDownloadService.download(scope.file);
        });

      }
    };
  });
