angular
  .module('angularjs-unit-test')
  .component('home', {
    templateUrl: 'components/home/home.html'
  })
  .config(function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      component: 'home'
    });
  });
