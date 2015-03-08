/**
 * @fileOverview Definition of the Login Module
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    /**
     * @class billwilly.Login
     * @memberOf billwilly
     */
    angular
        .module('app.login', [
            'ngMessages',
            'ngCookies'
        ])
        .config(config);

    /**
     * @name config
     * @function
     * @memberOf billwilly.Login
     * @description Configuration of the Login Module
     * @param {object} $stateProvider - AngularJS state provider
     */
    function config($stateProvider) {
        // Login page
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'views/login.tmpl.html',
            controller: 'LoginCtrl as login',
            restricted: false
        });

        // Register page
        $stateProvider.state('register', {
            url: '/register',
            templateUrl: 'views/register.tmpl.html',
            controller: 'LoginCtrl as login',
            restricted: false
        });

        // Register Success page
        $stateProvider.state('registerSuccess', {
            url: '/register/success',
            templateUrl: 'views/registerSuccess.tmpl.html',
            controller: 'LoginCtrl as login',
            restricted: true
        });
    }

    config.$inject = [ '$stateProvider' ];
})();