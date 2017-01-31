angular.module('todo', [
  'ngMock'
]).controller('ToDoController', function ($scope) {

  var items = [];

  $scope.getItems = function () {
    return items;
  };

  $scope.addItem = function (item) {

    if (!isValidItem(item)) {
      return false;
    }

    items.push(item);
  };

  $scope.deleteItem = function (idx) {
    items.splice(idx, 1);
  };

  function isValidItem(item) {
    return angular.isObject(item) && angular.isDefined(item.title) & item.title.length > 3;
  }

});
