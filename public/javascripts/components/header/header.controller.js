(function () {
    'use strict';

    angular
        .module('app.header')
        .controller('HeaderCtrl', HeaderCtrl);

    function HeaderCtrl(Auth) {
        var vm = this;

        vm.isAuthenticated = Auth.isAuthenticated;
        vm.currentUser = Auth.currentUser;
    }

    HeaderCtrl.$inject = [ "Auth" ];
})();