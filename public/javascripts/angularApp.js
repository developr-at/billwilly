(function () {
    'use strict';

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
        .constant('API_BASE_PATH', '/api/v1/');

    function baseConfig($urlRouterProvider, $stateProvider, $logProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/home");

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'views/home.ejs',
            controller: 'MainCtrl as main'
        });

        $logProvider.debugEnabled(true);
        $locationProvider.html5Mode(true);
    }
})();