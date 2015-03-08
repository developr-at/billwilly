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
        vm.removeFriend = removeFriend;
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
         * @name removeFriend
         * @function
         * @memberOf billwilly.Friends.FriendsCtrl
         * @param {int} userId - The id of the friend to remove.
         */
        function removeFriend(userId) {
            User.removeFriend(Auth.getCurrentUser().id, userId, function(err, data) {
                if (data) {
                    // TODO: Remove friend from vm.friends
                    console.log(data);
                    var friendIndex = findFriendIndexById(userId);
                    vm.friends.splice(friendIndex, 1);
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
            return findFriendIndexById(userId) !== -1;
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
            });
        }

        function findFriendIndexById(userId) {
            for ( var i = 0; i < vm.friends.length; ++i ) {
                if (vm.friends[i].id === userId)
                    return i;
            }

            return -1;
        }
    }

    FriendsCtrl.$inject = [ "Payments", "User", "Auth" ];
})();