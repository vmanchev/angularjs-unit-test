angular.module('angularjs-unit-test', [
  'ui.router'
])
  .config(
    function ($urlMatcherFactoryProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home');
      $urlMatcherFactoryProvider.caseInsensitive(true);
    }
  );
