describe('home', function () {

  var $componentController,
    ctrl;

  beforeEach(module('angularjs-unit-test'));

  beforeEach(inject(function ($injector) {

    $componentController = $injector.get('$componentController');

    ctrl = $componentController('home');

  }));

  describe('$onInit ', function () {
    it('should set items to an empty array', function () {
      expect(ctrl).toBeTruthy();
    });
  });


});