(function () {
    'use strict';

    angular
        .module('app.login')
		.factory('Auth', Auth);

	function Auth() {
		var service = {
			'login': login,
			'logout': logout,
			'isAuthenticated': isAuthenticated,
			'getCurrentUser': getCurrentUser
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

		function getCurrentUser() {
			return {
				'id': 0,
				'firstname': 'Demo',
				'lastname': 'User'
			};
		}
	}
})();