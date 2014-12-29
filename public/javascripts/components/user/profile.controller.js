(function () {
    'use strict';

    angular
        .module('app.user')
        .controller('ProfileCtrl', ProfileCtrl);

    function ProfileCtrl(Auth, User) {
        var vm = this;


        vm.profileSubmitted = false;
        vm.profileData = {
            firstname: '',
            lastname: '',
            email: ''
        };

        User.profile(Auth.getCurrentUser().email, function (err, data) {
            if (data) {
                vm.profileData.firstname = data.user.firstname;
                vm.profileData.lastname = data.user.lastname;
                vm.profileData.email = data.user.email;
            }
        });

        vm.submitProfileChanges = function(isValid) {
            vm.profileSubmitted = true;

            if (isValid) {
                User.editProfile(vm.profileData, function (err, data) {

                });
            }
        };
    }

    ProfileCtrl.$inject = [ 'Auth', 'User' ];
})();