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
     * Controller for the profile page.
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


        ///////////////////////////////////////////////////////////////////////
    }

    UserProfileCtrl.$inject = [ '$stateParams', 'Auth', 'User' ];
})();