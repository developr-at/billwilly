(function () {
    'use strict';

    angular
        .module('app.payments')
        .factory('Payments', Payments);


    function Payments($http, API_BASE_PATH) {
        var service = {
            payments: [],

            addPayment: addPayment,
            getPayments: getPayments,

            // Possibly rename
            getPositivePayments: getPositivePayments,
            getNegativePayments: getNegativePayments
        };

        // Mocking data
        service.payments = [
            {
                fromUser: { firstname: "Hans", lastname: "Huber" },
                toUser: { firstname: "me", lastname: "me" },
                amount: 100,
                currency: { name: "EUR €" }
            },
            {
                toUser: { firstname: "Hans", lastname: "Huber" },
                fromUser: { firstname: "me", lastname: "me" },
                amount: 50,
                currency: { name: "EUR €" }
            },
        ];

        return service;

        ////////////////////////

        function addPayment(paymentData, callback) {
            var request = $http.post(API_BASE_PATH + 'payments/add', { paymentData: paymentData });
            request.success(function(data, status, headers, config) {
                callback(null, data);
            });
            request.error(function(data, status, headers, config) {
                callback(null, data);
            });
        }

        function getPayments() {
            return [];
        }

        function getPositivePayments() {
            // Mocking data
            return [
                {
                    user: { firstname: "Hans", lastname: "Huber" },
                    payment: { amount: 50 }
                },
                {
                    user: { firstname: "Hans2", lastname: "Huber" },
                    payment: { amount: 250 }
                }
            ];
        }

        function getNegativePayments() {
            // Mocking data
            return [
                {
                    user: { firstname: "Franz", lastname: "Ferdinand" },
                    payment: { amount: 250 }
                },
                {
                    user: { firstname: "Franz2", lastname: "Ferdinand" },
                    payment: { amount: 25 }
                },
                {
                    user: { firstname: "Franz3", lastname: "Ferdinand" },
                    payment: { amount: 100 }
                }
            ];
        }
    }

    Payments.$inject = [ '$http', 'API_BASE_PATH' ];
})();