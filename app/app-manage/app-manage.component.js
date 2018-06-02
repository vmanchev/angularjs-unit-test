angular.module('angularjs-unit-test')
    .component('appManage', {
        templateUrl: 'app-manage/app-manage.html',
        controller: function (itemsService) {
console.log('app manage')
            var $ctrl = this;

            $ctrl.$onInit = function () {
                $ctrl.items = [];
            };

            $ctrl.getItems = function () {
                itemsService
                    .getAll()
                    .then(function (response) {
                        $ctrl.items = response;
                    })
                    .catch(angular.noop);
            };

            $ctrl.addItem = function (item) {

                if (!$ctrl.isValidItem(item)) {
                    return false;
                }

                itemsService
                    .add(item)
                    .then($ctrl.getItems)
                    .catch(angular.noop);
            };

            $ctrl.deleteItem = function (id) {
                itemsService
                    .remove(id)
                    .then($ctrl.getItems)
                    .catch(angular.noop);
            };

            $ctrl.isValidItem = function (item) {
                return angular.isObject(item) && angular.isDefined(item.title) && item.title.length > 3;
            };

        }
    })    
    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('manage', {
                    url: '/manage',
                    component: 'appManage'
                });
        }
    ]);