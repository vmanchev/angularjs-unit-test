describe('Test suite for my ToDo app', function () {

  beforeEach(module('todo'));

  var $controller;

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;
  }));

  describe('ToDoController structure', function () {

    var $scope, controller;

    beforeEach(function () {
      $scope = {};
      controller = $controller('ToDoController', {$scope: $scope});
    });

    it('should exists', function () {
      expect(controller).toBeDefined();
    });

    it('should have a method getItems', function () {
      expect($scope.getItems).toBeDefined();
    });

    it('should have a method addItem', function () {
      expect($scope.addItem).toBeDefined();
    });

    it('should have a method deleteItem', function () {
      expect($scope.deleteItem).toBeDefined();
    });

  });

  describe('Add new items', function () {

    var $scope, controller;

    beforeEach(function () {
      $scope = {};
      controller = $controller('ToDoController', {$scope: $scope});
    });

    it('should initially return an empty array of items', function () {
      expect($scope.getItems()).toEqual([]);
    });

    it('should return FALSE if we try to add an invalid item', function () {
      var result = $scope.addItem();
      
      expect(result).toEqual(false);
      expect($scope.getItems().length).toEqual(0);
    });

    it('should have one item after one call to addItem', function () {

      $scope.addItem({title: 'item 1'});

      expect($scope.getItems().length).toEqual(1);

    });

    it('should have two items after two calls to addItem', function () {

      $scope.addItem({title: 'item 1'});
      $scope.addItem({title: 'item 2'});
      expect($scope.getItems().length).toEqual(2);

    });

  });

  describe('Delete items', function () {

    var $scope, controller;

    beforeEach(function () {
      $scope = {};
      controller = $controller('ToDoController', {$scope: $scope});
    });

    it('should have 1 item if initially there were 2 items and we remove 1', function () {

      $scope.addItem({title: 'item 1'});
      $scope.addItem({title: 'item 2'});

      $scope.deleteItem(1);

      expect($scope.getItems().length).toEqual(1);

    });

    it('should should have 0 items if initially there were 2 items and we remove 2', function () {

      $scope.addItem({title: 'item 1'});
      $scope.addItem({title: 'item 2'});

      $scope.deleteItem(0);
      $scope.deleteItem(0);

      expect($scope.getItems().length).toEqual(0);

    });
  });


});