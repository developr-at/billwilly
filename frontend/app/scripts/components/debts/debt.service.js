/**
 * @fileOverview Definition of the Debt Service
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    angular
        .module('app.debts')
        .factory('Debts', Debts);

    /**
     * @class billwilly.Debts.Debts
     * @description Debts service manages logic concerning the debts.
     * @param {object} $http - HTTP service to issue requests
     * @param {object} API_BASE_PATH - Base path for API requests
     */
    function Debts($http, API_BASE_PATH) {
        var service = {
            getDebts: getDebts
        };

        return service;

        ///////////////////////////////////////////////////////////////////////

        /**
         * @name getDebts
         * @function
         * @memberOf billwilly.Debts.Debts
         * @description Retrieves a list of debts for the specified user.
         * @param {int} userId - The id of the user to retrieve the debts of
         * @param {function} callback - Callback to call on success/failure
         */
        function getDebts(userId, callback) {
            var request = $http.post(API_BASE_PATH + 'debts/', { userId: userId });
            request.success(function(data, status, headers, config) {
                callback(null, data);
            });

            request.error(function(data, status, headers, config) {
                callback(data, null);
            });
        }

    }

    Debts.$inject = [ '$http', 'API_BASE_PATH' ];
})();