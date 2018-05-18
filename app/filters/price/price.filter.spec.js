describe('priceFilter', function () {

    beforeEach(module('todo'));

    beforeEach(inject(function ($injector) {
        priceFilter = $injector.get('priceFilter');
    }));

    it('should prepend currency code to the price value', function () {
        expect(priceFilter(15, { currency: 'EUR' })).toEqual('EUR 15');
    });

    it('should return only the price value if currency is not provided', function () {
        expect(priceFilter(15)).toEqual(15);
        expect(priceFilter(15, {})).toEqual(15);
        expect(priceFilter(15, { currency: '' })).toEqual(15);
    });
});
