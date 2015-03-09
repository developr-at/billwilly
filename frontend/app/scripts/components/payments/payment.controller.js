/**
 * @fileOverview Definition of the Payment Controller
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    angular
        .module('app.payments')
        .controller('PaymentCtrl', PaymentCtrl);

    /**
     * @class billwilly.Payments.PaymentCtrl
     * @description Controller for the payment pages.
     * @param {object} Payments - Payments service
     */
    function PaymentCtrl(Payments) {
        var vm = this;

        vm.payments = Payments.payments;
        vm.positiveChart = prepareChart(Payments.getPositivePayments());
        vm.negativeChart = prepareChart(Payments.getNegativePayments());

        vm.addAdditionalUser = addAdditionalUser;
        vm.removeUser = removeUser;
        vm.addPayment = addPayment;
        vm.addPaymentSubmitted = false;
        vm.newPayment = {
            title: '',
            notes: '',
            items: [
                {
                    user: '',
                    amount: 0
                }
            ]
        };


        ///////////////////////////////////////////////////////////////////////

        /**
         * Prepares a chart object for angular google chart with the given
         * payments.
         * @param {array} payments List of all payments that should be
         *      represented in the chart.
         * @return {object} Chart object that can be used for an angular
         *      google chart.
         */
        function prepareChart(payments) {
            var chart = {
                    type: "PieChart",
                    data: {
                        cols: [
                            { id: "u", label: "User", type: "string" },
                            { id: "a", label: "Amount", type: "number" },
                        ],
                        rows: []
                    }
                },
                row,
                i;

            for (i = 0; i < payments.length; i++) {
                row = {
                    c: [
                        { v: payments[i].user.firstname },
                        { v: payments[i].payment.amount }
                    ]
                };

                chart.data.rows.push(row);
            }

            return chart;
        }

        /**
         * @name addAdditionalUser
         * @function
         * @memberOf billwilly.Payments.PaymentCtrl
         * @description Adds additional user to the payment form.
         */
        function addAdditionalUser() {
            vm.newPayment.items.push({ user: '', amount: 0 });
        }

        /**
         * @name removeUser
         * @function
         * @memberOf billwilly.Payments.PaymentCtrl
         * @description Removes a user from the payment form.
         * @param {object} userItem - The user item.
         */
        function removeUser(userItem) {
            var idx = vm.newPayment.items.indexOf(userItem);

            if (idx != -1) {
                vm.newPayment.items.splice(idx, 1);
            }
        }

        /**
         * @name addAdditionalUser
         * @function
         * @memberOf billwilly.Payments.PaymentCtrl
         * @description Adds additional user to the payment form.
         * @param {boolean} isValid - Flag indicating if the form values are valid
         */
        function addPayment(isValid) {
            vm.addPaymentSubmitted = true;

            if (isValid) {
                Payments.addPayment(vm.newPayment, function (err, data) {
                    console.log(err);
                    if (data) {
                        console.log(data);
                    }
                });
            }
        }
    }

    PaymentCtrl.$inject = [ "Payments" ];
})();