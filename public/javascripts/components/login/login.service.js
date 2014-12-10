(function () {
    'use strict';

    angular
        .module('app.login')
        .factory('Auth', Auth);

    function Auth($http, API_BASE_PATH) {
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
            var authentication = $http.post(/*API_BASE_PATH + */'auth/authenticate', credentials);
            authentication.success(function(data, status, headers, config) {
                service.currentUser = data.user;
                callback(null, data.user);
            });
            authentication.error(function(data, status, headers, config) {
                callback(data.message, null);
            });
        }

        function register(registration, callback) {
            // @TODO: Don't send plain password
            var registrationAction = $http.post(/* API_BASE_PATH + */'users/register', registration);
            registrationAction.success(function(data, status, headers, config) {
                console.log("success");
                console.log(data);
                console.log(status);
                console.log(headers);
                console.log(config);
            });
            registrationAction.error(function(data, status, headers, config) {
                console.log("error");
                console.log(data);
                console.log(status);
                console.log(headers);
                console.log(config);
            });
        }

        function logout() {
            service.currentUser = { _id: false };
            $http.post(/*API_BASE_PATH + */'auth/release');
        }

        function isAuthenticated() {
            return !!service.currentUser._id;
        }
    }

    Auth.$inject = [ '$http', 'API_BASE_PATH' ];
})();