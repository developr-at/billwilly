describe('Login Controller Specification', function () {
    var scope,
        ctrl;

    beforeEach(function () {
        module('app');
        module('app.login');
    });

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('LoginCtrl', { $scope: scope });
    }));

    it('should have a "currentUser" function on controller, but not on scope', function () {
        expect(scope.currentUser).not.toBeDefined();
        expect(ctrl.currentUser).toBeDefined();
    });

    it('should have a "submitLogin" function on controller, but not on scope', function () {
        expect(scope.submitLogin).not.toBeDefined();
        expect(ctrl.submitLogin).toBeDefined();
    });

    it('should have a "submitRegistration" function on controller, but not on scope', function () {
        expect(scope.submitRegistration).not.toBeDefined();
        expect(ctrl.submitRegistration).toBeDefined();
    });
});