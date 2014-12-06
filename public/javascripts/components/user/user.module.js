(function () {
    'use strict';

    angular
    	.module('app.user', [])
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('profile', {
            url: '/profile',
            templateUrl: 'views/profile.ejs',
            controller: 'ProfileCtrl as profile'
        });
    }
})();