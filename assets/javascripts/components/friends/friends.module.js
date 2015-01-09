(function () {
    'use strict';

    angular
        .module('app.friends', [
            'smart-table',

            'app.user',
            'app.payments'
        ])
        .config(config);

    function config($stateProvider) {
        $stateProvider.state('friends', {
            url: '/friends',
            templateUrl: 'views/friends.ejs',
            controller: 'FriendsCtrl as friends'
        });
    }

})();