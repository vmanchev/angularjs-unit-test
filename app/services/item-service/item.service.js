'use strict';

angular.module('angularjs-unit-test')
  .service('itemService', function ($http,
    userService) {

    var baseUrl = 'https://jsonplaceholder.typicode.com/posts';

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

      if (!userService.isLoggedIn()) {
        throw 'AUTH.ERROR.REQUIRED';
      }

      return $http.get(baseUrl + '/private');
    };
  });
