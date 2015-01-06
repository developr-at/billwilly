(function () {
    'use strict';

    angular
        .module('app.user')
        .controller('ProfileCtrl', ProfileCtrl);

    /**
     * Controller for the profile page.
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
        User.profile(Auth.getCurrentUser().email, function (err, data) {
            if (data) {
                vm.profileData.firstname = data.user.firstname;
                vm.profileData.lastname = data.user.lastname;
                vm.profileData.email = data.user.email;
            }
        });

        // Friends of the current user
        vm.friends = [];
        // Mail placeholder to add a new friend
        vm.newFriendEmail = "";
        // Load the friends for the current user
        User.getFriends(Auth.getCurrentUser()._id, function (err, data) {
            if (data) {
                vm.friends = data.friends;
            }
        });

        ///////////////////////////////////////////////////////////////////////

        /**
         * Submit handler of the profile form.
         * @param {boolean} isValid - Flag indicating if the form values are valid
         */
        vm.submitProfileChanges = function(isValid) {
            vm.profileSubmitted = true;

            if (isValid) {
                User.editProfile(vm.profileData, function (err, data) {

                });
            }
        };

        /**
         * Adds a friend to the current user.
         */
        vm.addFriend = function() {
            User.addFriend(Auth.getCurrentUser()._id, vm.newFriendEmail, function (err, data) {

            });
        };
    }

    ProfileCtrl.$inject = [ 'Auth', 'User' ];
})();