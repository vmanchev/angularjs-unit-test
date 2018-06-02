angular.module('angularjs-unit-test', [
  'ngMock',
  'ui.router'
])
.config([
  '$urlMatcherFactoryProvider',
  '$urlRouterProvider',
  function ($urlMatcherFactoryProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/home");
      $urlMatcherFactoryProvider.caseInsensitive(true);
  }
]);
