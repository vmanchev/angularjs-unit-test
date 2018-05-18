'use strict';

angular.module('todo')
    .service('itemsService', function ($http) {

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

    });
