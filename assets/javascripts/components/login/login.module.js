/**
 * @fileOverview Definition of the Login Module
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    angular
        .module('app.login', [
            'ngMessages',
            'ngCookies'
        ])
        .config(config);

    /**
     * Configuration of the Login Module
     * @param {object} $stateProvider - AngularJS state provider
     */
    function config($stateProvider) {
        // Login page
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'views/login.ejs',
            controller: 'LoginCtrl as login',
            restricted: false
        });

        // Register page
        $stateProvider.state('register', {
            url: '/register',
            templateUrl: 'views/register.ejs',
            controller: 'LoginCtrl as login',
            restricted: false
        });

        // Register Success page
        $stateProvider.state('registerSuccess', {
            url: '/register/success',
            templateUrl: 'views/registerSuccess.ejs',
            controller: 'LoginCtrl as login',
            restricted: true
        });
    }

    config.$inject = [ '$stateProvider' ];
})();