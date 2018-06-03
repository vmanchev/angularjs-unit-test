angular
  .module('angularjs-unit-test')
  .component('user', {
    templateUrl: 'components/user/user.html',
    controller: function ($stateParams,
      userService) {

      var $ctrl = this;

      $ctrl.user = {};
      $ctrl.users = [];

      $ctrl.$onInit = function () {
        $ctrl.getData($stateParams.id);
      };

      $ctrl.getData = function (id) {
        angular.isUndefined(id) ? this.getAllUsers() : this.getUserById(id);
      };

      $ctrl.getUserById = function (id) {
        userService.getById(id)
          .then(function (response) {
            $ctrl.user = response.data;
          })
          .catch(angular.noop);
      };

      $ctrl.getAllUsers = function () {
        userService.getAll()
          .then(function (response) {
            $ctrl.users = response.data;
          })
          .catch(angular.noop);
      };
    }
  })
  .config(function ($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        component: 'user'
      })
      .state('user', {
        url: '/users/{id}',
        component: 'user'
      });
  });