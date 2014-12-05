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
        .config(baseConfig);

    function baseConfig($urlRouterProvider, $stateProvider, $logProvider) {
        $urlRouterProvider.otherwise("/home");

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'views/home.ejs',
            controller: 'MainCtrl as main'
        });

        $logProvider.debugEnabled(true);
    }
})();