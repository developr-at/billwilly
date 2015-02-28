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
     * @class billwilly.User.User
     * @description User service manages logic concerning the users.
     * @param {object} $http - HTTP service to issue requests
     * @param {billwilly.Login.Auth} Auth - Auth service
     * @param {object} API_BASE_PATH - Base path for API requests
     */
    function User($http, Auth, API_BASE_PATH) {
        // Service interface
        var service = {
            search: search,

            // Profile
            profile: profile,
            editProfile: editProfile,

            // Friends
            addFriend: addFriend,
            removeFriend: removeFriend,
            getFriends: getFriends
        };

        return service;

        ///////////////////////////////////////////////////////////////////////

        /**
         * @name search
         * @function
         * @memberOf billwilly.User.User
         */
        function search(searchTerm, callback) {
            // var request = $http.get(API_BASE_PATH + 'user/search', { search: searchTerm });
            // request.success(function(data, status, headers, config) {

            // });
            // request.error(function(data, status, headers, config) {

            // });
            callback();
        }

        /**
         * @name profile
         * @function
         * @memberOf billwilly.User.User
         * @description Retrieves the profile data for a user.
         * @param {object} userData - Data of the user
         * @param {function} callback - Callback to call on success/failure
         */
        function profile(userData, callback) {
            var request = $http.post(API_BASE_PATH + 'users/profile', userData );
            request.success(function(data, status, headers, config) {
                callback(null, data);
            });

            request.error(function(data, status, headers, config) {
                callback(data, null);
            });
        }

        /**
         * @name editProfile
         * @function
         * @memberOf billwilly.User.User
         * @description Updates the profile data of the user.
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
         * @name addFriend
         * @function
         * @memberOf billwilly.User.User
         * @description Adds a friend to the user.
         * @param {int} userId - The id of the first user
         * @param {string} friendEmail - The mail of the friend to add
         * @param {function} callback - Callback to call on success/failure
         */
        function addFriend(userId, friendEmail, callback) {
            console.log("addFriend: " + friendEmail);

            var request = $http.post(API_BASE_PATH + 'users/friends/add', { id: userId, friendEmail: friendEmail });
            request.success(function(data, status, headers, config) {
                callback(null, data);
            });

            request.error(function(data, status, headers, config) {
                callback(data, null);
            });
        }

        /**
         * @name removeFriend
         * @function
         * @memberOf billwilly.User.User
         * @description Removes a friend from the user.
         * @param {int} userId - The id of the first user
         * @param {string} friendEmail - The mail of the friend to remove
         * @param {function} callback - Callback to call on success/failure
         */
        function removeFriend(userId, friendEmail, callback) {
            console.log("removeFriend: " + friendEmail);

            var request = $http.post(API_BASE_PATH + 'users/friends/remove', { id: userId, email: friendEmail });
            request.success(function(data, status, headers, config) {
                callback(null, data);
            });

            request.error(function(data, status, headers, config) {
                callback(data, null);
            });
        }

        /**
         * @name getFriends
         * @function
         * @memberOf billwilly.User.User
         * @description Retrieves a list of friends for the specified user.
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