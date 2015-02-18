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

    function Auth($http, $q, $cookieStore, API_BASE_PATH) {
        var service = {
            'checkEmail': checkEmail,
            'login': login,
            'register': register,
            'logout': logout,
            'isAuthenticated': isAuthenticated,
            'currentUser': $cookieStore.get('user') || { _id: false },
            'getCurrentUser': getCurrentUser
        };

        return service;

        ///////////////////////////////////////////////////////////////////////

        /**
         * Checks if the email address is already in use.
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
         * Logsout the current user and clears the user credentials.
         */
        function logout() {
            service.currentUser = { _id: false };
            $cookieStore.remove('user');
            $http.get(API_BASE_PATH + 'auth/release');
        }

        /**
         * Indicates if the user is currently authenticated
         */
        function isAuthenticated() {
            return !!service.currentUser._id;
        }

        function getCurrentUser() {
            return service.currentUser;
        }
    }

    Auth.$inject = [ '$http', '$q', '$cookieStore', 'API_BASE_PATH' ];
})();