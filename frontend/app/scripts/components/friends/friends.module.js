/**
 * @fileOverview Definition of the Friends Module
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    /**
     * @class billwilly.Friends
     * @memberOf billwilly
     */
    angular
        .module('app.friends', [
            'smart-table',

            'app.user',
            'app.payments',
            'app.debts'
        ])
        .config(config);

    /**
     * @name config
     * @function
     * @memberOf billwilly.Friends
     * @description Configuration of the Friends Module
     * @param {object} $stateProvider - AngularJS state provider
     */
    function config($stateProvider) {
        $stateProvider.state('friends', {
            url: '/friends',
            templateUrl: 'views/friends.tmpl.html',
            controller: 'FriendsCtrl as friends'
        });
    }

    config.$inject = [ '$stateProvider' ];

})();