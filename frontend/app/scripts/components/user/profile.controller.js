/**
 * @fileOverview Definition of the Profile Controller
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    angular
        .module('app.user')
        .controller('ProfileCtrl', ProfileCtrl);

    /**
     * @class billwilly.User.ProfileCtrl
     * @description Controller for the profile page.
     * @param {object} Auth - Auth service
     * @param {object} User - User service
     */
    function ProfileCtrl(Auth, User) {
        var vm = this;


        // Flag indicating if the profile form has already been submitted
        vm.profileSubmitted = false;
        // Data container for the profile data
        vm.profileData = {
            firstname: '',
            lastname: '',
            email: ''
        };

        // Load the profile data for the current user
        User.profile({ email: Auth.getCurrentUser().email }, function (err, data) {
            if (data) {
                vm.profileData.firstname = data.user.firstname;
                vm.profileData.lastname = data.user.lastname;
                vm.profileData.email = data.user.email;
            }
        });

        vm.submitProfileChanges = submitProfileChanges;

        ///////////////////////////////////////////////////////////////////////

        /**
         * @name submitProfileChanges
         * @function
         * @memberOf billwilly.User.ProfileCtrl
         * @description Submit handler of the profile form.
         * @param {boolean} isValid - Flag indicating if the form values are valid
         */
        function submitProfileChanges(isValid) {
            vm.profileSubmitted = true;

            if (isValid) {
                User.editProfile(vm.profileData, function (err, data) {

                });
            }
        }
    }

    ProfileCtrl.$inject = [ 'Auth', 'User' ];
})();