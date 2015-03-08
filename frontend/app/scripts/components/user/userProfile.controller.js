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
     * @class billwilly.User.UserProfileCtrl
     * @description Controller for the user profile page.
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

        vm.friendPayments = [
            { title: "Test Payment 1", amount: 1234 },
            { title: "Test Payment 2", amount: 1234 },
            { title: "Test Payment 3", amount: 1234 },
            { title: "Test Payment 4", amount: 1234 },
            { title: "Test Payment 5", amount: 1234 },
            { title: "Test Payment 6", amount: 1234 },
            { title: "Test Payment 7", amount: 1234 },
        ];

        vm.addPersonAsFriend = addPersonAsFriend;
        vm.isAlreadyFriend = false;
        vm.friends = [];

        // Load the profile data for the current user
        User.getFriends(Auth.getCurrentUser().id, function (err, data) {
            var userId = $stateParams.userId;

            if (data) {
                Array.prototype.push.apply(vm.friends, data.friends);

                for ( var i = 0; i < vm.friends.length; ++i ) {
                    if (vm.friends[i].id == userId) {
                        vm.isAlreadyFriend = true;
                    }
                }
            }

        });

        // Load the profile data for the selected user
        User.profile( { id: $stateParams.userId }, function (err, data) {
            if (data) {
                vm.profileData.firstname = data.user.firstname;
                vm.profileData.lastname = data.user.lastname;
                vm.profileData.email = data.user.email;
            }
        });

        ///////////////////////////////////////////////////////////////////////

        /**
         * @description  Adds the user of the currently viewed profile to friends.
         * @name addPersonAsFriend
         * @function
         * @memberOf billwilly.User.UserProfileCtrl
         */
        function addPersonAsFriend() {
            User.addFriend(Auth.getCurrentUser().id, $stateParams.userId, function(err, data) {
                if (data) {
                    console.log(data);
                    vm.isAlreadyFriend = true;
                }
            });
        }
    }

    UserProfileCtrl.$inject = [ '$stateParams', 'Auth', 'User' ];
})();