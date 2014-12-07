(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($scope, Auth) {
        var vm = this;

        vm.credentials = {
        	email: '',
        	password: '',
        	remember: false
        };

        vm.login = function() {
        	Auth.login(vm.credentials, function(err, user) {
                $scope.message = null;
                if (err) {
                    $scope.message = err;
                }
                console.log(user);
            });
        };

        vm.currentUser = function() {
            return Auth.currentUser;
        };
    }

    LoginCtrl.$inject = ['$scope', 'Auth'];
})();