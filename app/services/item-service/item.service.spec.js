describe('itemService', function () {

  var $httpBackend,
    itemService,
    userService;

  beforeEach(function () {
    module('angularjs-unit-test');

    module(function ($provide) {
      $provide.service('userService', function () {
        this.isLoggedIn = jasmine.createSpy('isLoggedIn');
        this.getUser = jasmine.createSpy('getUser');
      });
    });
  });

  var userMock = {
    id: 1
  };

  var itemsMock = [{
    'id': 1,
    'title': 'Post 1'
  }, {
    'id': 2,
    'title': 'Post 2'
  }, {
    'id': 3,
    'title': 'Post 3'
  }];

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    itemService = $injector.get('itemService');
    userService = $injector.get('userService');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  describe('add', function () {

    beforeEach(function () {
      $httpBackend.expectPOST('https://jsonplaceholder.typicode.com/posts', itemsMock[0]).respond(201);
    });

    it('should perform a post request to save a new item', function () {
      itemService.add(itemsMock[0]);
      $httpBackend.flush();
    });

  });

  describe('getAll', function () {

    beforeEach(function () {
      $httpBackend.expectGET('https://jsonplaceholder.typicode.com/posts').respond(200, itemsMock);
    });

    it('should perform a get request to retrieve all items', function () {

      var items = itemService.getAll();
      $httpBackend.flush();

      items.then(function (response) {
        expect(response.data).toEqual(itemsMock);
      });

    });
  });

  describe('getById', function () {

    beforeEach(function () {
      $httpBackend.expectGET('https://jsonplaceholder.typicode.com/posts/1').respond(200, itemsMock[0]);
    });

    it('should perform a get request to retrieve an item by id', function () {

      var item = itemService.getById(1);
      $httpBackend.flush();

      item.then(function (response) {
        expect(response.data).toEqual(itemsMock[0]);
      });

    });
  });

  describe('update', function () {

    beforeEach(function () {
      $httpBackend.expectPUT('https://jsonplaceholder.typicode.com/posts/1', itemsMock[0]).respond(200);
    });

    it('should perform a put request to update an item', function () {
      itemService.update(itemsMock[0]);
      $httpBackend.flush();
    });
  });

  describe('remove', function () {

    beforeEach(function () {
      $httpBackend.expectDELETE('https://jsonplaceholder.typicode.com/posts/1').respond(200);
    });

    it('should perform a delete request to remove an item', function () {
      itemService.remove(itemsMock[0].id);
      $httpBackend.flush();
    });
  });

  describe('getUserItems', function () {

    it('should get user items if user is authenticated', function () {

      userService.isLoggedIn.and.returnValue(true);
      userService.getUser.and.returnValue(userMock);

      $httpBackend.expectGET('https://jsonplaceholder.typicode.com/posts?userId=' + userMock.id).respond(200);

      itemService.getUserItems();
      $httpBackend.flush();
    });

    it('should throw an error message when user is authenticated', function () {

      userService.isLoggedIn.and.returnValue(false);

      expect(function () { itemService.getUserItems(); }).toThrow('AUTH.ERROR.REQUIRED');

    });
  });

});