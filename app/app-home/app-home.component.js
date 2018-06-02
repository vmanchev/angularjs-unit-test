angular.module('angularjs-unit-test')
    .component('appHome', {
        templateUrl: 'app-home/app-home.html',
        controller: function () {
            console.log('app home')
        }
    })    
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    component: 'appHome'
                });
        }
    ]);