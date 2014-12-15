(function () {
    'use strict';

    angular
        .module('app.user')
		.factory('User', User);

	function User(Auth) {
		var service = {
			addFriend: addFriend,
			getFriends: getFriends
		};

		return service;

		////////////////////////

		function addFriend(email) {
			console.log("addFriend: " + email);
		}

		function getFriends() {

		}
	}

	User.$inject = [ 'Auth' ];
})();