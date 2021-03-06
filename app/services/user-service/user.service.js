'use strict';

angular.module('angularjs-unit-test')
  .service('userService', function ($http) {

    var baseUrl = 'https://jsonplaceholder.typicode.com/users';

    var user = {};

    this.getAll = function (page, limit) {

      page = (isNaN(page) || page < 1) ? 1 : page;
      limit = (isNaN(limit) || limit < 0) ? 10 : limit;

      return $http.get('https://jsonplaceholder.typicode.com/users/?_page=' + page + '&_limit=' + limit);
    };

    this.login = function (username, password) {
      return $http.post(baseUrl, {
        username: username,
        password: password
      }).then(function (response) {
        user = response.data;
        return response.data;
      }).catch(function (e) {
        user = {};
        return e;
      });
    };

    this.getById = function (id) {
      return $http.get(baseUrl + '/' + id);
    };

    this.isLoggedIn = function () {
      return user.id > 0;
    };

    this.getUser = function () {
      return user;
    };

  });
