'use strict';

angular.module('angularjs-unit-test')
  .service('itemsService', function ($http,
    authService) {

    var baseUrl = 'https://api.example.org/items';

    this.add = function (item) {
      return $http.post(baseUrl, item);
    };

    this.getAll = function () {
      return $http.get(baseUrl);
    };

    this.getById = function (id) {
      return $http.get(baseUrl + '/' + id);
    };

    this.update = function (item) {
      return $http.put(baseUrl + '/' + item.id, item);
    };

    this.remove = function (id) {
      return $http.delete(baseUrl + '/' + id);
    };

    this.getPrivateItems = function () {

      if (!authService.isLoggedIn()) {
        throw 'AUTH.ERROR.REQUIRED';
      }

      return $http.get(baseUrl + '/private');
    };
  });
