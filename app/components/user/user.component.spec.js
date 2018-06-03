describe('user component', function () {

  var $scope,
    $componentController,
    ctrl,
    stateParamsMock = {},
    userServiceMock,
    $q,
    deferred,
    usersMock = [{
      'id': 1,
      'name': 'John Doe'
    }, {
      'id': 2,
      'name': 'Peter Johnson'
    }, {
      'id': 3,
      'name': 'Charlotte Preston'
    }];

  beforeEach(module('angularjs-unit-test'));

  beforeEach(inject(function ($injector) {
    $scope = $injector.get('$rootScope').$new();
    $q = $injector.get('$q');
    $componentController = $injector.get('$componentController');

    deferred = $q.defer();

    userServiceMock = jasmine.createSpyObj('userService', ['getById', 'getAll']);
    userServiceMock.getById.and.returnValue(deferred.promise);
    userServiceMock.getAll.and.returnValue(deferred.promise);

    ctrl = $componentController('user', {
      $scope: $scope,
      $stateParams: stateParamsMock,
      userService: userServiceMock
    });

    spyOn(ctrl, 'getData').and.callThrough();
    spyOn(ctrl, 'getUserById').and.callThrough();
    spyOn(ctrl, 'getAllUsers').and.callThrough();

  }));

  describe('$onInit', function () {
    it('shold call getData', function () {
      ctrl.$onInit();

      expect(ctrl.getData).toHaveBeenCalled();
    });
  });

  describe('getData', function () {

    it('should use getUserById method to retrieve a single user data when id is provided in state params', function () {

      ctrl.getData(1);

      expect(ctrl.getUserById).toHaveBeenCalledWith(1);
    });

    it('should use getAllUsers method to retrieve a users list when id is not provided in state params', function () {

      ctrl.getData();

      expect(ctrl.getAllUsers).toHaveBeenCalled();
    });

  });

  describe('getUserById', function () {

    beforeEach(function () {
      ctrl.getUserById(1);
    });

    it('should use userService.getById to retrive a single user data', function () {
      expect(userServiceMock.getById).toHaveBeenCalledWith(1);
    });

    it('should set user controller property to service response in case of success', function () {
      deferred.resolve({ data: usersMock[0] });
      $scope.$apply();

      expect(ctrl.user).toEqual(usersMock[0]);
    });

    it('should keep user controller property to empty object in case of failure', function () {
      deferred.reject();
      $scope.$apply();

      expect(ctrl.user).toEqual({});
    });
  });

  describe('getAllUsers', function () {

    beforeEach(function () {
      ctrl.getAllUsers();
    });

    it('should use userService.getAll to retrive all users list', function () {
      expect(userServiceMock.getAll).toHaveBeenCalled();
    });

    it('should set users controller property to service response in case of success', function () {
      deferred.resolve({ data: usersMock });
      $scope.$apply();

      expect(ctrl.users).toEqual(usersMock);
    });

    it('should keep users controller property to empty array in case of failure', function () {
      deferred.reject();
      $scope.$apply();

      expect(ctrl.users).toEqual([]);
    });
  });

});