/**
 * @fileOverview Definition of the Payments Service
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    angular
        .module('app.payments')
        .factory('Payments', Payments);

    /**
     * @class billwilly.Payments.Payments
     * @description Payments service manages logic concerning the payments.
     * @param {object} $http - HTTP service to issue requests
     * @param {object} API_BASE_PATH - Base path for API requests
     */
    function Payments($http, API_BASE_PATH) {
        var service = {
            addPayment: addPayment
        };

        return service;

        ///////////////////////////////////////////////////////////////////////

        /**
         * @name addPayment
         * @function
         * @memberOf billwilly.Payments.Payments
         * @description Adds a new payment.
         * @param {object} paymentData - The info about this payment.
         * @param {function} callback - Callback to call on success/failure.
         */
        function addPayment(paymentData, callback) {
            var request = $http.post(API_BASE_PATH + 'payments/add', { paymentData: paymentData });
            request.success(function(data, status, headers, config) {
                callback(null, data);
            });
            request.error(function(data, status, headers, config) {
                callback(null, data);
            });
        }
    }

    Payments.$inject = [ '$http', 'API_BASE_PATH' ];
})();