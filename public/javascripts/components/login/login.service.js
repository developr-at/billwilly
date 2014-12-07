(function () {
    'use strict';

    angular
        .module('app.login')
		.factory('Auth', Auth);

	function Auth($http) {
		var service = {
			'login': login,
			'logout': logout,
			'isAuthenticated': isAuthenticated,
			'currentUser': null
		};

		return service;

		////////////////////////

		function login(credentials, callback) {
			/*jshint validthis:true */
			var vm = this;
			var authentication = $http.post("/auth/authenticate", credentials);
            authentication.success(function(data, status, headers, config) {
                vm.user = data.user;
                callback(null, data.user);
            });
            authentication.error(function(data, status, headers, config) {
                callback('Invalid credentials', null);
            });
		}

		function logout() {
			console.log('logout');
		}

		function isAuthenticated() {
			return false;
		}
	}
})();