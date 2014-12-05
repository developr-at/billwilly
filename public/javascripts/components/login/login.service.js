(function () {
    'use strict';

    angular
        .module('app.login')
		.factory('Auth', Auth);

	function Auth() {
		var service = {
			'login': login,
			'logout': logout,
			'isAuthenticated': isAuthenticated
		};

		return service;

		////////////////////////

		function login(credentials) {
			console.log('login');
		}

		function logout() {
			console.log('logout');
		}

		function isAuthenticated() {
			return false;
		}
	}
})();