/**
 * @fileOverview Definition of the User Module
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    angular
    	.module('app.user', [])
        .config(config);

    /**
     * Configuration of the User Module
     * @param {object} $stateProvider - AngularJS state provider
     */
    function config($stateProvider) {
        // Profile page
        $stateProvider.state('profile', {
            url: '/profile',
            templateUrl: 'views/profile.ejs',
            controller: 'ProfileCtrl as profile'
        });
    }

    config.$inject = [ '$stateProvider' ];
})();