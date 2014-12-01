(function () {
    'use strict';

    angular
        .module('app.login')
		.factory('Auth', Auth);

	function Auth() {
		var service = {
			'authenticate': authenticate
		};

		return service;

		////////////////////////

		function authenticate(username, password) {
			console.log('authenticate');
		}
	}
})();