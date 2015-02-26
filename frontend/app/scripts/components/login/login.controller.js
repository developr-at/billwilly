(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginCtrl', LoginCtrl);

    /**
     * Controller for the login/register page.
     * @param {object} $state - AngularJS state
     * @param {object} Auth - Auth service
     */
    function LoginCtrl($state, Auth) {
        var vm = this;

        // Flag indicating if the login form has already been submitted
        vm.loginSubmitted = false;
        // Data container for the login credentials
        vm.credentials = {
            email: '',
            password: '',
            remember: false
        };

        // Flag indicating if the registration form has already been submitted
        vm.registrationSubmitted = false;
        // Data container for the registration data
        vm.registration = {
            firstname: '',
            lastname: '',
            email: '',
            firstPassword: '',
            secondPassword: ''
        };

        vm.currentUser = function() {
            return Auth.currentUser;
        };

        /**
         * Submit handler of the login form.
         * @param {boolean} isValid - Flag indicating if the form values are valid
         */
        vm.submitLogin = function(isValid) {
            vm.loginSubmitted = true;

            if (isValid) {
                Auth.login(vm.credentials, function(err, user) {
                    vm.message = null;
                    if (err) {
                        vm.message = err;
                    } else {
                        $state.go('payments');
                    }
                    console.log(user);
                });
            }
        };

        /**
         * Submit handler of the registration form.
         * @param {boolean} isValid - Flag indicating if the form values are valid
         */
        vm.submitRegistration = function(isValid) {
            vm.registrationSubmitted = true;

            if (isValid) {
                Auth.register(vm.registration, function(err, user) {
                    vm.message = null;
                    if (err) {
                        vm.message = err;
                    } else {
                        $state.go('registerSuccess');
                    }
                    console.log(user);
                });
            }
        };
    }

    LoginCtrl.$inject = [ '$state', 'Auth' ];
})();