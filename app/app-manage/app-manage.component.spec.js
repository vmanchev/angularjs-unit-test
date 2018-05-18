describe('appManage', function () {

    var $scope, $componentController, ctrl, itemsServiceMock, itemsMock, $q, deferred;

    beforeEach(module('todo'));

    beforeEach(inject(function ($injector) {
        $scope = $injector.get('$rootScope').$new();
        $q = $injector.get('$q');
        $componentController = $injector.get('$componentController');

        deferred = $q.defer();

        itemsServiceMock = jasmine.createSpyObj('itemsServiceMock', ['add', 'getAll', 'getById', 'remove']);
        itemsServiceMock.add.and.returnValue(deferred.promise);
        itemsServiceMock.getAll.and.returnValue(deferred.promise);
        itemsServiceMock.remove.and.returnValue(deferred.promise);

        ctrl = $componentController('appManage', {
            $scope: $scope,
            itemsService: itemsServiceMock
        });

        spyOn(ctrl, 'getItems').and.callThrough();

        itemsMock = [{
            "id": 1,
            "title": "Post 1"
        }, {
            "id": 2,
            "title": "Post 2"
        }, {
            "id": 3,
            "title": "Post 3"
        }];
    }));

    describe('$onInit ', function () {
        it('should set items to an empty array', function () {
            ctrl.$onInit();
            expect(ctrl.items).toEqual([]);
        });
    });

    describe('methods', function () {
        beforeEach(function () {
            ctrl.$onInit();
        });

        describe('getItems', function () {
            it('should use getItems method from manage service to get all the items', function () {
                ctrl.getItems();
                expect(itemsServiceMock.getAll).toHaveBeenCalled();

                deferred.resolve(itemsMock);
                $scope.$apply();

                expect(ctrl.items).toEqual(itemsMock);
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

                expect(itemsServiceMock.add).not.toHaveBeenCalled();
            });

            it('should use add method from manage service to create a new item, when item is valid', function () {
                ctrl.addItem({ title: 'test4' });

                expect(itemsServiceMock.add).toHaveBeenCalledWith({ title: 'test4' });
            });

            it('should call ctrl.getItems after a new item was successfully created', function () {
                ctrl.addItem({ title: 'test4' });
                expect(itemsServiceMock.add).toHaveBeenCalledWith({ title: 'test4' });

                deferred.resolve();
                $scope.$apply();

                expect(ctrl.getItems).toHaveBeenCalled();
            });
        });

        describe('deleteItem', function () {
            it('should use message service remote method to delete an item by id', function () {
                ctrl.deleteItem(5);
                expect(itemsServiceMock.remove).toHaveBeenCalledWith(5);
            });

            it('should call ctrl.getItems after an item was deleted', function () {
                ctrl.deleteItem(5);
                expect(itemsServiceMock.remove).toHaveBeenCalledWith(5);

                deferred.resolve();
                $scope.$apply();

                expect(ctrl.getItems).toHaveBeenCalled();
            });
        });
    });

});