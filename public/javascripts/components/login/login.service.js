(function () {
    'use strict';

    angular
        .module('app.login')
        .factory('Auth', Auth);

    function Auth($http) {
        var service = {
            'login': login,
            'register': register,
            'logout': logout,
            'isAuthenticated': isAuthenticated,
            'currentUser': { _id: false }
        };

        return service;

        ////////////////////////

        function login(credentials, callback) {
            /*jshint validthis:true */
            var authentication = $http.post("/auth/authenticate", credentials);
            authentication.success(function(data, status, headers, config) {
                service.currentUser = data.user;
                callback(null, data.user);
            });
            authentication.error(function(data, status, headers, config) {
                callback('Invalid credentials', null);
            });
        }

        function register(registration, callback) {
            
        }

        function logout() {
            service.currentUser = { _id: false };
        }

        function isAuthenticated() {
            return !!service.currentUser._id;
        }
    }
})();