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

        vm.registration = {
            email: '',
            firstPassword: '',
            secondPassword: ''
        };

        vm.login = function() {
            Auth.login(vm.credentials, function(err, user) {
                vm.message = null;
                if (err) {
                    vm.message = err;
                }
                console.log(user);
            });
        };

        vm.currentUser = function() {
            return Auth.currentUser;
        };

        vm.register = function() {
            Auth.register(vm.registration, function(err, user) {
                vm.message = null;
                if (err) {
                    vm.message = err;
                }
                console.log(user);
            });
        };
    }

    LoginCtrl.$inject = ['$scope', 'Auth'];
})();