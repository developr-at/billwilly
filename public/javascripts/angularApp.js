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
        .run(accessControl)
        .constant('API_BASE_PATH', '/api/v1/');

    function baseConfig($urlRouterProvider, $stateProvider, $logProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/login");

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'views/home.ejs',
            controller: 'MainCtrl as main'
        });

        $logProvider.debugEnabled(true);
        $locationProvider.html5Mode(true);
    }

    function accessControl($rootScope, $state, Auth) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            // var isPrivate = typeof next.restricted === "undefined" ? true : next.restricted;
            // if ( isPrivate && !Auth.isAuthenticated() ) {
            //     event.preventDefault();
            //     $state.go('login');
            // }
        });
    }
})();