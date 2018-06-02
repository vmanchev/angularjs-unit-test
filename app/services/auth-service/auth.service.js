'use strict';

angular.module('angularjs-unit-test')
    .service('authService', function ($http) {

        var baseUrl = 'https://api.example.org/auth';

        var loggedIn = false;

        this.login = function (username, password) {
            return $http.post(baseUrl, {
                username: username,
                password: password
            }).then(function () {
                loggedIn = true;
            }).catch(function (e) {
                loggedIn = false;
                return e;
            });
        };

        this.isLoggedIn = function () {
            return loggedIn;
        };

    });
