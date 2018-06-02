angular.module('angularjs-unit-test')
  .filter('price', function () {
    return function (value, params) {

      if (angular.isUndefined(params)) {
        return value;
      }

      if (angular.isUndefined(params.currency)) {
        return value;
      }

      if (!params.currency.length) {
        return value;
      }

      return params.currency + ' ' + value;
    };
  });
