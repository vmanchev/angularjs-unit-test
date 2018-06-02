describe('authService', function () {

  var $httpBackend,
    authService,
    loginDataMock = {
      username: 'user',
      password: 'pass'
    };

  beforeEach(module('angularjs-unit-test'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    authService = $injector.get('authService');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('login', function () {

    it('should perform a post request to authenticate the user', function () {
      $httpBackend.expectPOST('https://api.example.org/auth', loginDataMock).respond(201);

      authService.login(loginDataMock.username, loginDataMock.password);
      $httpBackend.flush();
    });

    it('should set the private loggedIn property to true when authentication is successfull', function () {
      $httpBackend.expectPOST('https://api.example.org/auth', loginDataMock).respond(201);

      authService.login(loginDataMock.username, loginDataMock.password);
      $httpBackend.flush();

      expect(authService.isLoggedIn()).toBeTruthy();
    });

    it('should keep the private loggedIn property to false when authentication has failed', function () {
      $httpBackend.expectPOST('https://api.example.org/auth', loginDataMock).respond(404);

      authService.login(loginDataMock.username, loginDataMock.password);
      $httpBackend.flush();

      expect(authService.isLoggedIn()).toBeFalsy();
    });
  });
});