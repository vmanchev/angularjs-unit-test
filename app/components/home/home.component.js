angular
  .module('angularjs-unit-test')
  .component('home', {
    templateUrl: 'components/home/home.html', 
    controller: function() {
      var $ctrl = this;

      $ctrl.file = {
        url: '/uploads/test.pdf',
        name: 'report.pdf',
        mime: 'application/pdf'
      };
    }
  })
  .config(function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      component: 'home'
    });
  });
