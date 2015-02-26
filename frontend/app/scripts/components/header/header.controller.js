/**
 * @fileOverview Definition of the Header Controller
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    angular
        .module('app.header')
        .controller('HeaderCtrl', HeaderCtrl);

    /**
     * @class billwilly.Header.HeaderCtrl
     * @description Controller for the header section.
     * @param {object} $state - AngularJS state
     * @param {object} User - User service
     */
    function HeaderCtrl($state, Auth) {
        var vm = this;

        vm.logout = logout;
        vm.isAuthenticated = Auth.isAuthenticated;
        vm.getCurrentUser = Auth.getCurrentUser;

        /**
         * @name logout
         * @function
         * @memberOf billwilly.Header.HeaderCtrl
         * @description Logs the user out of the app and redirects to the login page.
         */
        function logout () {
            Auth.logout();
            $state.go('login');
        }
    }

    HeaderCtrl.$inject = [ '$state', 'Auth' ];
})();