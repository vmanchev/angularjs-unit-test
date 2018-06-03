describe('userService', function () {

  var $httpBackend,
    userService,
    loginDataMock = {
      username: 'user',
      password: 'pass'
    }, 
    userMock = {
      id: 1,
      name: 'John Doe' 
    };

  beforeEach(module('angularjs-unit-test'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    userService = $injector.get('userService');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('login', function () {

    it('should perform a post request to authenticate the user', function () {
      $httpBackend.expectPOST('https://jsonplaceholder.typicode.com/users', loginDataMock).respond(200, userMock);

      userService.login(loginDataMock.username, loginDataMock.password);
      $httpBackend.flush();
    });

    it('should set the private loggedIn property to true when authentication is successfull', function () {
      $httpBackend.expectPOST('https://jsonplaceholder.typicode.com/users', loginDataMock).respond(200, userMock);

      userService.login(loginDataMock.username, loginDataMock.password);
      $httpBackend.flush();
      
      expect(userService.isLoggedIn()).toBeTruthy();
      expect(userService.getUser()).toEqual(userMock);
    });

    it('should keep the private loggedIn property to false when authentication has failed', function () {
      $httpBackend.expectPOST('https://jsonplaceholder.typicode.com/users', loginDataMock).respond(404);

      userService.login(loginDataMock.username, loginDataMock.password);
      $httpBackend.flush();

      expect(userService.isLoggedIn()).toBeFalsy();
    });
  });

  describe('getById', function() {
    it('should perform a GET request to get user data by id', function() {
      $httpBackend.expectGET('https://jsonplaceholder.typicode.com/users/5').respond(200);

      userService.getById(5);
      $httpBackend.flush();
    });
  });

  describe('getUser', function() {
    it('should return the private user property', function() {
      expect(userService.getUser()).toEqual({});
    });
  });
});