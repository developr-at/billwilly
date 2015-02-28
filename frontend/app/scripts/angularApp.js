/**
 * @fileOverview Definition of the Angular App
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    /**
     * @namespace billwilly
     */
    angular
        .module('app', [
            'app.core',

            // Parts
            'app.header',

            // Features
            'app.login',
            'app.user',
            'app.friends',
            'app.payments'
        ])
        .config(baseConfig)
        .run(accessControl)
        // Base path for calls to the rest api
        .constant('API_BASE_PATH', 'http://localhost:3333/api/v1/');

    /**
     * Basic configuration of the angular app.
     * @param {object} $urlRouterProvider - AngularJS url router provider
     * @param {object} $logProvider - AngularJS log provider
     * @param {object} $locationProvider - AngularJS location provider
     */
    function baseConfig($urlRouterProvider, $logProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/login");
        $logProvider.debugEnabled(true);
        $locationProvider.html5Mode(true);
    }

    baseConfig.$inject = [ "$urlRouterProvider", "$logProvider", "$locationProvider" ];

    /**
     * Access control for the routes.
     * Only login and register page are publicly visible. All other routes need
     * a logged in user.
     * @param {object} $rootScope - AngularJS root scope
     * @param {object} $state - AngularJS state
     * @param {object} Auth - Auth service
     */
    function accessControl($rootScope, $state, Auth) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            // var isPrivate = typeof next.restricted === "undefined" ? true : next.restricted;
            // if ( isPrivate && !Auth.isAuthenticated() ) {
            //     event.preventDefault();
            //     $state.go('login');
            // }
        });
    }

    accessControl.$inject = [ "$rootScope", "$state", "Auth" ];
})();