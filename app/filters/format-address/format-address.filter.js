angular.module('angularjs-unit-test')
  .filter('formatAddress', function () {
    return function (address) {
      return address.street + ', ' + address.suite + ', ' + address.city + ' - ' + address.zipcode;
    };
  });
