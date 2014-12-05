(function () {
    'use strict';

    angular
        .module('app', [
            'app.core',

            // Features
            'app.login',
            'app.user',
            'app.friends',
            'app.payments'
        ])
        .config(baseConfig);

    function baseConfig($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/home");

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'views/home.ejs',
            controller: 'MainCtrl as main'
        });
    }
})();