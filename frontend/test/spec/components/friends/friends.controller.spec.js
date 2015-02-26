describe('Friends Controller Specification', function () {
    var scope,
        ctrl;

    beforeEach(function () {
        module('app');
        module('app.friends');
    });

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('FriendsCtrl', { $scope: scope });
    }));

    it('should have a "addPersonAsFriend" function on controller, but not on scope', function () {
        expect(scope.addPersonAsFriend).not.toBeDefined();
        expect(ctrl.addPersonAsFriend).toBeDefined();
    });

    it('should have a "isAlreadyFriend" function on controller, but not on scope', function () {
        expect(scope.isAlreadyFriend).not.toBeDefined();
        expect(ctrl.isAlreadyFriend).toBeDefined();
    });

    it('should have a "searchPerson" function on controller, but not on scope', function () {
        expect(scope.searchPerson).not.toBeDefined();
        expect(ctrl.searchPerson).toBeDefined();
    });
});