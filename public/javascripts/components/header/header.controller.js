(function () {
    'use strict';

    angular
        .module('app.header')
        .controller('HeaderCtrl', HeaderCtrl);

    function HeaderCtrl($state, Auth) {
        var vm = this;

        vm.logout = logout;
        vm.isAuthenticated = Auth.isAuthenticated;
        vm.getCurrentUser = Auth.getCurrentUser;

        vm.currentUser = Auth.currentUser;

        function logout () {
            Auth.logout();
            $state.go('login');
        }
    }

    HeaderCtrl.$inject = [ '$state', 'Auth' ];
})();