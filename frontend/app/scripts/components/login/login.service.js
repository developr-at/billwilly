/**
 * @fileOverview Definition of the Login Service
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    angular
        .module('app.login')
        .factory('Auth', Auth);

    /**
     * @class billwilly.Login.Auth
     * @description Auth...
     */
    function Auth($http, $q, $cookieStore, API_BASE_PATH) {
        var service = {
            // Misc
            'checkEmail': checkEmail,

            // Login/Register
            'login': login,
            'register': register,
            'logout': logout,

            // Helper
            'isAuthenticated': isAuthenticated,
            'currentUser': $cookieStore.get('user') || { id: false },
            'getCurrentUser': getCurrentUser
        };

        return service;

        ///////////////////////////////////////////////////////////////////////

        /**
         * @name checkEmail
         * @function
         * @memberOf billwilly.Login.Auth
         * @description Checks if the email address is already in use.
         * @param {string} email - The email to check
         * @return promise
         */
        function checkEmail(email) {
            var deferred = $q.defer();

            $http.post(API_BASE_PATH + 'users/check', { email: email }).then(function() {
                deferred.reject();
            }, function() {
                deferred.resolve();
            });

            return deferred.promise;
        }

        /**
         * @name login
         * @function
         * @memberOf billwilly.Login.Auth
         * @description Tries to login the user with the given credentials.
         * @param {object} credentials - Credentials to use for login.
         * @param {function} callback - Callback function after login attempt.
         */
        function login(credentials, callback) {
            /*jshint validthis:true */
            // @TODO: Don't send plain password
            var request = $http.post(API_BASE_PATH + 'auth/authenticate', credentials);
            request.success(function(data, status, headers, config) {
                service.currentUser = data.user;
                $cookieStore.put('user', data.user);
                callback(null, data.user);
            });

            request.error(function(data, status, headers, config) {
                callback(data.message, null);
            });
        }

        /**
         * @name register
         * @function
         * @memberOf billwilly.Login.Auth
         * @description Tries to register a new user.
         * @param {object} registration - The data to use for the new user.
         * @param {function} callback - Callback function after registration.
         */
        function register(registration, callback) {
            // @TODO: Don't send plain password
            var request = $http.post(API_BASE_PATH + 'users/register', registration);
            request.success(function(data, status, headers, config) {
                service.currentUser = data.user;
                callback(null, data.user);
            });

            request.error(function(data, status, headers, config) {
                console.log("error");
                callback(data.message, null);
            });
        }

        /**
         * @name logout
         * @function
         * @memberOf billwilly.Login.Auth
         * @description Logsout the current user and clears the user credentials.
         */
        function logout() {
            service.currentUser = { id: false };
            $cookieStore.remove('user');
            $http.get(API_BASE_PATH + 'auth/release');
        }

        /**
         * @name isAuthenticated
         * @function
         * @memberOf billwilly.Login.Auth
         * @description Indicates if the user is currently authenticated
         */
        function isAuthenticated() {
            return !!service.currentUser.id;
        }

        /**
         * @name getCurrentUser
         * @function
         * @memberOf billwilly.Login.Auth
         */
        function getCurrentUser() {
            return service.currentUser;
        }
    }

    Auth.$inject = [ '$http', '$q', '$cookieStore', 'API_BASE_PATH' ];
})();