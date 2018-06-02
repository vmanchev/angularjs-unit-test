describe('priceFilter', function () {

  var priceFilter;

  beforeEach(module('angularjs-unit-test'));

  beforeEach(inject(function ($injector) {
    priceFilter = $injector.get('priceFilter');
  }));

  it('should prepend currency code to the price value', function () {
    expect(priceFilter(15, { currency: 'EUR' })).toEqual('EUR 15');
  });

  it('should return only the price value if no filter options are provided', function () {
    expect(priceFilter(15)).toEqual(15);
  });

  it('should return only the price value if an empty object is provided as filter options', function () {
    expect(priceFilter(15, {})).toEqual(15);
  });

  it('should return only the price value if currency filter option is provided as empty string', function () {
    expect(priceFilter(15, { currency: '' })).toEqual(15);
  });

});
