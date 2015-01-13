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
        User.profile({ email: Auth.getCurrentUser().email }, function (err, data) {
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

            vm.friends.push({ id: '5496ba4bff95f6841dc1f544', firstname: "Hans1", lastname: "Blub1Bla", email: "test@test.at", amount: -1234 });
            vm.friends.push({ id: 2, firstname: "Hans2", lastname: "Blub2Bla", email: "test@test.at", amount: 123 });
            vm.friends.push({ id: 3, firstname: "Hans3", lastname: "Blub3Bla", email: "test@test.at", amount: -234 });
            vm.friends.push({ id: 4, firstname: "Hans4", lastname: "Blub4Bla", email: "test@test.at", amount: 134 });
            vm.friends.push({ id: 5, firstname: "Hans5", lastname: "Blub5Bla", email: "test@test.at", amount: -34 });
            vm.friends.push({ id: 6, firstname: "Hans6", lastname: "Blub6Bla", email: "test@test.at", amount: 14 });
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

        vm.removeFriend = function(friendEmail) {
            User.removeFriend(Auth.getCurrentUser()._id, friendEmail, function (err, data) {

            });
        };
    }

    ProfileCtrl.$inject = [ 'Auth', 'User' ];
})();