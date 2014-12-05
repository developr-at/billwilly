(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl(Auth) {
        var vm = this;

        vm.credentials = {
        	email: '',
        	password: '',
        	remember: false
        };

        vm.login = function() {
        	Auth.login(vm.credentials);
        };
    }

    LoginCtrl.$inject = ["Auth"];
})();