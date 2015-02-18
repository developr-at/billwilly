/**
 * @fileOverview Definition of the Friends Module
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    angular
        .module('app.friends', [
            'smart-table',

            'app.user',
            'app.payments'
        ])
        .config(config);

    /**
     * Configuration of the Friends Module
     * @param {object} $stateProvider - AngularJS state provider
     */
    function config($stateProvider) {
        $stateProvider.state('friends', {
            url: '/friends',
            templateUrl: 'views/friends.ejs',
            controller: 'FriendsCtrl as friends'
        });
    }

    config.$inject = [ '$stateProvider' ];

})();