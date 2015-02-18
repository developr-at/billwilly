(function () {
    'use strict';

    angular
        .module('app.friends')
        .controller('FriendsCtrl', FriendsCtrl);

    /**
     * Controller for the friends page.
     * @param {object} Payments - Payments service
     * @param {object} User - User service
     */
    function FriendsCtrl(Payments, User) {
        var vm = this;

        vm.searchTerm = "";
        vm.searchResult = [];
        vm.searchPerson = searchPerson;
        vm.addPersonAsFriend = addPersonAsFriend;
        vm.isAlreadyFriend = isAlreadyFriend;
        vm.friends = [
            {
                'id': '5496ba4bff95f6841dc1f544',
                'name': 'Max Mustermann',
                'mail': 'mail@mail.at',
                'amount': 524
            },
            {
                'id': '5496ba4bff95f6841dc1f544',
                'name': 'AAAA Asdf',
                'mail': 'mail@mail.at',
                'amount': -98
            },
            {
                'id': '5496ba4bff95f6841dc1f544',
                'name': 'Bcf BBBBB',
                'mail': 'mail@mail.at',
                'amount': 50
            },
            {
                'id': '5496ba4bff95f6841dc1f544',
                'name': 'Rrrlrrr RRRRRRR',
                'mail': 'mail@mail.at',
                'amount': 5
            },
            {
                'id': '5496ba4bff95f6841dc1f544',
                'name': 'XYyyy XXXZ',
                'mail': 'mail@mail.at',
                'amount': -168
            }
        ];

        ///////////////////////////////

        function addPersonAsFriend(userId) {
            console.log("addPersonAsFriend" + userId);
            // User.addFriend(..., function(err, data) {

            // });
        }

        function isAlreadyFriend(userId) {
            console.log("isAlreadyFriend" + userId);
            return false;
        }

        function searchPerson() {
            User.search(vm.searchTerm, function() {
                vm.searchResult = [
                    {
                        'id': '5496ba4bff95f6841dc1f544',
                        'firstname': 'Rrrlrrr',
                        'lastname': 'RRRRRRR',
                        'mail': 'mail@mail.at'
                    },
                    {
                        'id': '5496ba4bff95f6841dc1f544',
                        'firstname': 'Rrrlrrr',
                        'lastname': 'RRRRRRR',
                        'mail': 'mail@mail.at'
                    },
                    {
                        'id': '5496ba4bff95f6841dc1f544',
                        'firstname': 'Rrrlrrr',
                        'lastname': 'RRRRRRR',
                        'mail': 'mail@mail.at'
                    },
                    {
                        'id': '5496ba4bff95f6841dc1f544',
                        'firstname': 'Rrrlrrr',
                        'lastname': 'RRRRRRR',
                        'mail': 'mail@mail.at'
                    },
                    {
                        'id': '5496ba4bff95f6841dc1f544',
                        'firstname': 'Rrrlrrr',
                        'lastname': 'RRRRRRR',
                        'mail': 'mail@mail.at'
                    },
                    {
                        'id': '5496ba4bff95f6841dc1f544',
                        'firstname': 'Rrrlrrr',
                        'lastname': 'RRRRRRR',
                        'mail': 'mail@mail.at'
                    }
                ];
            });
        }
    }

    FriendsCtrl.$inject = [ "Payments", "User" ];
})();