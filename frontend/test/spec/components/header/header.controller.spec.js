describe('Header Controller Specification', function () {
    var scope,
        ctrl;

    beforeEach(function () {
        module('app');
        module('app.header');
    });

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('HeaderCtrl', { $scope: scope });
    }));

    it('should have a "logout" function on controller, but not on scope', function () {
        expect(scope.logout).not.toBeDefined();
        expect(ctrl.logout).toBeDefined();
    });

    it('should have a "isAuthenticated" function on controller, but not on scope', function () {
        expect(scope.isAuthenticated).not.toBeDefined();
        expect(ctrl.isAuthenticated).toBeDefined();
    });

    it('should have a "getCurrentUser" function on controller, but not on scope', function () {
        expect(scope.getCurrentUser).not.toBeDefined();
        expect(ctrl.getCurrentUser).toBeDefined();
    });
});