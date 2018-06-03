angular
  .module('angularjs-unit-test')
  .component('appNav', {
    templateUrl: 'components/nav/nav.html',
    controller: function ($location) {

      var $ctrl = this;

      $ctrl.$doCheck = function () {
        this.getAllNavItems().removeActiveClass().setActive();
      };

      $ctrl.getAllNavItems = function () {
        this.links = document.querySelectorAll('ul li a');
        return this;
      };

      $ctrl.removeActiveClass = function () {
        this.links.forEach(function (item) {
          item.classList.remove('nav-active');
        });
        return this;
      };

      $ctrl.setActive = function () {
        this.links.forEach(function (item) {
          if ($location.path() === item.pathname || (item.pathname !== '/' && $location.path().indexOf(item.pathname) === 0)) {
            item.classList.add('nav-active');
          }
        });
      };

    }
  });
