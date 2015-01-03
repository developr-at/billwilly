(function () {
    'use strict';

    angular
        .module('app.user')
		.factory('User', User);

	function User($http, Auth, API_BASE_PATH) {
		var service = {
			profile: profile,
			editProfile: editProfile,
			addFriend: addFriend,
			getFriends: getFriends
		};

		return service;

		////////////////////////

		function profile(email, callback) {
			var data = {
				'email': email
			};

            var request = $http.post(API_BASE_PATH + 'users/profile', data );
            request.success(function(data, status, headers, config) {
                callback(null, data);
            });

            request.error(function(data, status, headers, config) {
                callback(data, null);
            });
		}

		function editProfile(profileData, callback) {
            var request = $http.post(API_BASE_PATH + 'users/profile/edit', profileData );
            request.success(function(data, status, headers, config) {
                callback(null, data);
            });

            request.error(function(data, status, headers, config) {
                callback(data, null);
            });

		}

		function addFriend(email) {
			console.log("addFriend: " + email);
		}

		function getFriends(userId, callback) {
            var request = $http.post(API_BASE_PATH + 'users/friends', { id: userId });
            request.success(function(data, status, headers, config) {
                callback(null, data);
            });

            request.error(function(data, status, headers, config) {
                callback(data, null);
            });
		}
	}

	User.$inject = [ '$http', 'Auth', 'API_BASE_PATH' ];
})();