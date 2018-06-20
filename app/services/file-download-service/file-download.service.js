'use strict';

angular.module('angularjs-unit-test')
  .service('fileDownloadService', function ($http,
    FileSaver,
    Blob) {

    function forceDownload(file, response) {
      var blob = new Blob([response.data], { type: file.mime + ';charset=utf-8' });
      FileSaver.saveAs(blob, file.name);
    }

    /**
     * Download a file, defined in config parameter
     * @param {object} file Required properties: url, name, mime
     * @returns {Promise}
     */
    this.download = function (file) {

      return $http
        .get(file.url, {
          responseType: 'blob'
        })
        .then(function (response) {
          forceDownload(file, response);
        })
        .catch(angular.noop);
    };

  });
