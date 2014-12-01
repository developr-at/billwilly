(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl(Auth) {
        var vm = this;
        vm.test = 'Hello Login!';

        vm.authenticate = function() {
        	Auth.authenticate('asdf', 'asdf');
        };
    }

    LoginCtrl.$inject = ["Auth"];
})();