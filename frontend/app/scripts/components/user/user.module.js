/**
 * @fileOverview Definition of the User Module
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    /**
     * @class billwilly.User
     * @memberOf billwilly
     */
    angular
    	.module('app.user', [])
        .config(config);

    /**
     * @name config
     * @function
     * @memberOf billwilly.User
     * @description Configuration of the User Module
     * @param {object} $stateProvider - AngularJS state provider
     */
    function config($stateProvider) {
        // Profile page
        $stateProvider.state('profile', {
            url: '/profile',
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl as profile'
        });

        // Other user profile page
        $stateProvider.state('userProfile', {
            url: '/user/:userId',
            templateUrl: 'views/user.html',
            controller: 'UserProfileCtrl as profile'
        });
    }

    config.$inject = [ '$stateProvider' ];
})();