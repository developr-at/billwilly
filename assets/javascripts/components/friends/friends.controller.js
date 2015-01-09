(function () {
    'use strict';

    angular
        .module('app.friends')
        .controller('FriendsCtrl', FriendsCtrl);

    function FriendsCtrl(Payments, User) {
        var vm = this;

        vm.payments = Payments.payments;

        vm.newFriendEmail = "";
        vm.addFriend = addFriend;

        ///////////////////////////////

        function addFriend() {
        	User.addFriend(vm.newFriendEmail);
        }


    }

    FriendsCtrl.$inject = [ "Payments", "User" ];
})();