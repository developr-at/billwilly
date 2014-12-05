(function () {
    'use strict';

    angular
        .module('app.user')
		.factory('User', User);

	function User() {
		var service = {
			addFriend: addFriend
		};

		return service;

		////////////////////////

		function addFriend(email) {
			console.log("addFriend: " + email);
		}
	}
})();