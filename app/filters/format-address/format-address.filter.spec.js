describe('formatAddress', function () {

  var addressFilter,
    inputAddress = {
      street: 'Main str.',
      suite: 'ap. 22',
      city: 'Berlin',
      zipcode: '12345'
    },
    outputAddress = 'Main str., ap. 22, Berlin - 12345';

  beforeEach(module('angularjs-unit-test'));

  beforeEach(inject(function ($injector) {
    addressFilter = $injector.get('formatAddressFilter');
  }));

  it('should format address object as string', function () {
    expect(addressFilter(inputAddress)).toEqual(outputAddress);
  });

});
