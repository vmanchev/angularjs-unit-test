angular.module('angularjs-unit-test', [
  'ui.router',
  'ngFileSaver'
])
  .config(
    function ($urlMatcherFactoryProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home');
      $urlMatcherFactoryProvider.caseInsensitive(true);
    }
  )
  .config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  });
