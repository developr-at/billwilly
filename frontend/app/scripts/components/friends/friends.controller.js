(function () {
    'use strict';

    angular
        .module('app.friends')
        .controller('FriendsCtrl', FriendsCtrl);

    /**
     * @class billwilly.Friends.FriendsCtrl
     * @description Controller for the friends page.
     * @param {object} Payments - Payments service
     * @param {object} User - User service
     * @param {object} Auth - Auth service
     */
    function FriendsCtrl(Payments, User, Auth) {
        var vm = this;

        vm.searchTerm = "";
        vm.searchResult = [];
        vm.searchPerson = searchPerson;
        vm.addPersonAsFriend = addPersonAsFriend;
        vm.isAlreadyFriend = isAlreadyFriend;
        vm.friends = [];

        // Load the profile data for the current user
        User.getFriends(Auth.getCurrentUser().id, function (err, data) {
            if (data) {
                Array.prototype.push.apply(vm.friends, data.friends);
            }
        });

        ///////////////////////////////////////////////////////////////////////

        /**
         * @name addPersonAsFriend
         * @function
         * @memberOf billwilly.Friends.FriendsCtrl
         * @param {int} userId - The id of the person to add.
         */
        function addPersonAsFriend(userId) {
            User.addFriend(Auth.getCurrentUser().id, userId, function(err, data) {
                if (data) {
                    vm.friends.push(data.friend);
                }
            });
        }

        /**
         * @name isAlreadyFriend
         * @function
         * @memberOf billwilly.Friends.FriendsCtrl
         * @param {int} userId - The id to check.
         */
        function isAlreadyFriend(userId) {
            for ( var i = 0; i < vm.friends.length; ++i ) {
                if (vm.friends[i].id === userId) {
                    return true;
                }
            }

            return false;
        }

        /**
         * @name searchPerson
         * @function
         * @memberOf billwilly.Friends.FriendsCtrl
         */
        function searchPerson() {
            User.search(vm.searchTerm, function(err, data) {
                if (data) {
                    vm.searchResult = data.user;
                }
                // vm.searchResult = [
                //     {
                //         'id': '5496ba4bff95f6841dc1f544',
                //         'firstname': 'Rrrlrrr',
                //         'lastname': 'RRRRRRR',
                //         'mail': 'mail@mail.at'
                //     },
                //     {
                //         'id': '5496ba4bff95f6841dc1f544',
                //         'firstname': 'Rrrlrrr',
                //         'lastname': 'RRRRRRR',
                //         'mail': 'mail@mail.at'
                //     },
                //     {
                //         'id': '5496ba4bff95f6841dc1f544',
                //         'firstname': 'Rrrlrrr',
                //         'lastname': 'RRRRRRR',
                //         'mail': 'mail@mail.at'
                //     },
                //     {
                //         'id': '5496ba4bff95f6841dc1f544',
                //         'firstname': 'Rrrlrrr',
                //         'lastname': 'RRRRRRR',
                //         'mail': 'mail@mail.at'
                //     },
                //     {
                //         'id': '5496ba4bff95f6841dc1f544',
                //         'firstname': 'Rrrlrrr',
                //         'lastname': 'RRRRRRR',
                //         'mail': 'mail@mail.at'
                //     },
                //     {
                //         'id': '5496ba4bff95f6841dc1f544',
                //         'firstname': 'Rrrlrrr',
                //         'lastname': 'RRRRRRR',
                //         'mail': 'mail@mail.at'
                //     }
                // ];
            });
        }
    }

    FriendsCtrl.$inject = [ "Payments", "User", "Auth" ];
})();