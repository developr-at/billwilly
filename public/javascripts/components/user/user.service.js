/**
 * @fileOverview Definition of the User Service
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    angular
        .module('app.user')
        .factory('User', User);

    /**
     * User service manages logic concerning the users.
     * @param {object} $http - HTTP service to issue requests
     * @param {object} Auth - Auth service
     * @param {object} API_BASE_PATH - Base path for API requests
     */
    function User($http, Auth, API_BASE_PATH) {
        // Service interface
        var service = {
            // Profile
            profile: profile,
            editProfile: editProfile,

            // Friends
            addFriend: addFriend,
            getFriends: getFriends
        };

        return service;

        ///////////////////////////////////////////////////////////////////////

        /**
         * Retrieves the profile data for a user.
         * @param {string} userEmail - Email of the user
         * @param {function} callback - Callback to call on success/failure
         */
        function profile(userEmail, callback) {
            var request = $http.post(API_BASE_PATH + 'users/profile', { email: userEmail } );
            request.success(function(data, status, headers, config) {
                callback(null, data);
            });

            request.error(function(data, status, headers, config) {
                callback(data, null);
            });
        }

        /**
         * Updates the profile data of the user.
         * @param {object} profileData - The update data of the profile
         * @param {function} callback - Callback to call on success/failure
         */
        function editProfile(profileData, callback) {
            var request = $http.post(API_BASE_PATH + 'users/profile/edit', profileData );
            request.success(function(data, status, headers, config) {
                callback(null, data);
            });

            request.error(function(data, status, headers, config) {
                callback(data, null);
            });
        }

        /**
         * Adds a friend to the user.
         * @param {int} userId - The id of the first user
         * @param {string} friendEmail - The mail of the friend to add
         * @param {function} callback - Callback to call on success/failure
         */
        function addFriend(userId, friendEmail, callback) {
            console.log("addFriend: " + email);

            var request = $http.post(API_BASE_PATH + 'users/friends/add', { id: userId, email: friendEmail });
            request.success(function(data, status, headers, config) {
                callback(null, data);
            });

            request.error(function(data, status, headers, config) {
                callback(data, null);
            });
        }

        /**
         * Retrieves a list of friends for the specified user.
         * @param {int} userId - The id of the user to retrieve the friends of
         * @param {function} callback - Callback to call on success/failure
         */
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