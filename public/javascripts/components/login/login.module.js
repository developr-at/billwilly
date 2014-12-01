(function () {
    'use strict';

    angular
        .module('app.login', [])
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'views/login.ejs',
            controller: 'LoginCtrl as login'
        });
    }

})();