/**
 * @fileOverview Definition of the User Profile Controller
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    angular
        .module('app.user')
        .controller('UserProfileCtrl', UserProfileCtrl);

    /**
     * Controller for the user profile page.
     * @param {object} $stateParams - AngularJS state params
     * @param {object} Auth - Auth service
     * @param {object} User - User service
     */
    function UserProfileCtrl($stateParams, Auth, User) {
        var vm = this;

        // Data container for the profile data
        vm.profileData = {
            firstname: '',
            lastname: '',
            email: ''
        };

        // Load the profile data for the selected user
        User.profile( { id: $stateParams.userId }, function (err, data) {
            if (data) {
                vm.profileData.firstname = data.user.firstname;
                vm.profileData.lastname = data.user.lastname;
                vm.profileData.email = data.user.email;
            }
        });

        /**
         * Checks if the currently viewed profile is a friend of the user.
         */
        vm.isFriend = function() {
            //DUMMY
            return false;
        };

        /**
         * Adds the user of the currently viewed profile to friends.
         */
        vm.addAsFriend = function() {
            console.log("add as friend");
        };

        ///////////////////////////////////////////////////////////////////////
    }

    UserProfileCtrl.$inject = [ '$stateParams', 'Auth', 'User' ];
})();