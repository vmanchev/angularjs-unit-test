describe('item component', function () {

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

    ctrl = $componentController('item', {
      $scope: $scope,
      itemService: itemServiceMock
    });

  }));

  describe('$onInit ', function () {

    beforeEach(function () {
      ctrl.$onInit();
    });

    it('should use getItems method from manage service to get all the items', function () {
      expect(itemServiceMock.getAll).toHaveBeenCalled();
    });

    it('should set items to response data in case of success', function () {
      deferred.resolve({data: itemsMock});
      $scope.$apply();

      expect(ctrl.items).toEqual(itemsMock);
    });

    it('should keep items as empty array in case of error response', function () {
      deferred.reject();
      $scope.$apply();

      expect(ctrl.items).toEqual([]);
    });

  });

});