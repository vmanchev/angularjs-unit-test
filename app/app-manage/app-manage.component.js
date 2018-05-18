angular.module('todo')
    .component('appManage', {
        controller: function (itemsService) {

            var $ctrl = this;

            $ctrl.$onInit = function () {
                $ctrl.items = [];
            };

            $ctrl.getItems = function () {
                itemsService.getAll().then(function (response) {
                    $ctrl.items = response;
                });
            };

            $ctrl.addItem = function (item) {

                if (!$ctrl.isValidItem(item)) {
                    return false;
                }

                itemsService.add(item).then($ctrl.getItems);
            };

            $ctrl.deleteItem = function (id) {
                itemsService.remove(id).then($ctrl.getItems);
            };

            $ctrl.isValidItem = function (item) {
                return angular.isObject(item) && angular.isDefined(item.title) && item.title.length > 3;
            };

        }
    });