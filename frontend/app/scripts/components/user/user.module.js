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
        .config(config)
        .run(redirectProfile);

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
            templateUrl: 'views/profile.tmpl.html',
            controller: 'ProfileCtrl as profile'
        });

        // Other user profile page
        $stateProvider.state('userProfile', {
            url: '/user/:userId',
            templateUrl: 'views/user.tmpl.html',
            controller: 'UserProfileCtrl as profile'
        });
    }

    config.$inject = [ '$stateProvider' ];

    /**
     * If the user clicks on his own user link, he gets redirected to his
     * profile page.
     * @param {object} $rootScope - AngularJS root scope
     * @param {object} $state - AngularJS state
     * @param {object} Auth - Auth service
     */
    function redirectProfile($rootScope, $state, Auth) {
        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams) {
            if ( toState.name === 'userProfile' && toParams.userId == Auth.getCurrentUser().id ) {
                evt.preventDefault();
                $state.go('profile');
            }
        });
    }

    redirectProfile.$inject = [ '$rootScope', '$state', 'Auth' ];
})();