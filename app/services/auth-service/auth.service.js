'use strict';

angular.module('angularjs-unit-test')
  .service('authService', function ($http) {

    var baseUrl = 'https://jsonplaceholder.typicode.com/users';

    var loggedIn = false;

    this.login = function (username, password) {
      return $http.post(baseUrl, {
        username: username,
        password: password
      }).then(function (data) {
        loggedIn = true;
        return data;
      }).catch(function (e) {
        loggedIn = false;
        return e;
      });
    };

    this.getUserById = function (id) {
      return $http.get(baseUrl + '/' + id);
    };

    this.isLoggedIn = function () {
      return loggedIn;
    };

  });
