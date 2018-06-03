angular
  .module('angularjs-unit-test')
  .component('item', {
    templateUrl: 'components/item/item.html',
    controller: function (itemService) {

      var $ctrl = this;

      $ctrl.items = [];

      $ctrl.$onInit = function () {
        itemService
          .getAll()
          .then(function (response) {
            $ctrl.items = response.data;
          })
          .catch(angular.noop);
      };

    }
  })
  .config(function ($stateProvider) {
    $stateProvider.state('items', {
      url: '/items',
      component: 'item'
    });
  });