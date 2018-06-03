describe('appHome', function () {

  var $scope,
    $componentController,
    ctrl,
    itemServiceMock,
    $q,
    deferred,
    itemsMock = [{
      'id': 1,
      'title': 'Post 1'
    }, {
      'id': 2,
      'title': 'Post 2'
    }, {
      'id': 3,
      'title': 'Post 3'
    }];

  beforeEach(module('angularjs-unit-test'));

  beforeEach(inject(function ($injector) {
    $scope = $injector.get('$rootScope').$new();
    $q = $injector.get('$q');
    $componentController = $injector.get('$componentController');

    deferred = $q.defer();

    itemServiceMock = jasmine.createSpyObj('itemService', ['add', 'getAll', 'getById', 'remove']);
    itemServiceMock.add.and.returnValue(deferred.promise);
    itemServiceMock.getAll.and.returnValue(deferred.promise);
    itemServiceMock.remove.and.returnValue(deferred.promise);

    ctrl = $componentController('appHome', {
      $scope: $scope,
      itemService: itemServiceMock
    });

    spyOn(ctrl, 'getItems').and.callThrough();

    ctrl.$onInit();

  }));

  describe('$onInit ', function () {
    it('should set items to an empty array', function () {
      expect(ctrl.items).toEqual([]);
    });
  });

  describe('methods', function () {

    describe('getItems', function () {

      beforeEach(function () {
        ctrl.getItems();
      });

      it('should use getItems method from manage service to get all the items', function () {
        expect(itemServiceMock.getAll).toHaveBeenCalled();
      });

      it('should set items to response data in case of success', function () {
        deferred.resolve(itemsMock);
        $scope.$apply();

        expect(ctrl.items).toEqual(itemsMock);
      });

      it('should keep items as empty array in case of error response', function () {
        deferred.reject();
        $scope.$apply();

        expect(ctrl.items).toEqual([]);
      });
    });

    describe('isValidItem', function () {
      it('should return false if item is not an object', function () {
        expect(ctrl.isValidItem([])).toBeFalsy();
        expect(ctrl.isValidItem(123)).toBeFalsy();
      });

      it('should return false if title is not defined', function () {
        expect(ctrl.isValidItem({ id: 1 })).toBeFalsy();
      });

      it('shold return false if title length is less than 3 characters', function () {
        expect(ctrl.isValidItem({ title: 'ab' })).toBeFalsy();
      });

    });

    describe('addItem', function () {
      it('should not use the add service method if item is not valid', function () {
        ctrl.addItem({});

        expect(itemServiceMock.add).not.toHaveBeenCalled();
      });

      it('should use add method from manage service to create a new item, when item is valid', function () {
        ctrl.addItem({ title: 'test4' });

        expect(itemServiceMock.add).toHaveBeenCalledWith({ title: 'test4' });
      });

      it('should call ctrl.getItems after a new item was successfully created', function () {
        ctrl.addItem({ title: 'test4' });

        expect(itemServiceMock.add).toHaveBeenCalledWith({ title: 'test4' });

        deferred.resolve();
        $scope.$apply();

        expect(ctrl.getItems).toHaveBeenCalled();
      });

      it('should not call ctrl.getItems when a new item was not created', function () {
        ctrl.addItem({ title: 'test4' });

        expect(itemServiceMock.add).toHaveBeenCalledWith({ title: 'test4' });

        deferred.reject();
        $scope.$apply();

        expect(ctrl.getItems).not.toHaveBeenCalled();
      });
    });

    describe('deleteItem', function () {
      it('should use message service remote method to delete an item by id', function () {
        ctrl.deleteItem(5);
        
        expect(itemServiceMock.remove).toHaveBeenCalledWith(5);
      });

      it('should call ctrl.getItems after an item was deleted', function () {
        ctrl.deleteItem(5);

        expect(itemServiceMock.remove).toHaveBeenCalledWith(5);

        deferred.resolve();
        $scope.$apply();

        expect(ctrl.getItems).toHaveBeenCalled();
      });

      it('should not call ctrl.getItems when an item was not deleted', function () {
        ctrl.deleteItem(5);

        expect(itemServiceMock.remove).toHaveBeenCalledWith(5);

        deferred.reject();
        $scope.$apply();

        expect(ctrl.getItems).not.toHaveBeenCalled();
      });

    });
  });

});