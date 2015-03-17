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
     * @param {object} Debts - Debts service
     * @param {object} Auth - Auth service
     */
    function PaymentCtrl(Payments, Debts, Auth) {
        var vm = this;

        vm.positiveDebts = [];
        vm.negativeDebts = [];
        vm.positiveChart = {};
        vm.negativeChart = {};

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

        Debts.getDebts(Auth.getCurrentUser().id, function (err, data) {
            console.log(data);
            if (data) {
                vm.positiveDebts = data.debts.filter(function (entry) { return !entry.isDebt; });
                vm.negativeDebts = data.debts.filter(function (entry) { return entry.isDebt; });

                vm.positiveChart = prepareChart(vm.positiveDebts);
                vm.negativeChart = prepareChart(vm.negativeDebts);
            }
        });

        ///////////////////////////////////////////////////////////////////////

        /**
         * Prepares a chart object for angular google chart with the given
         * debts.
         * @param {array} debts List of all debts that should be
         *      represented in the chart.
         * @return {object} Chart object that can be used for an angular
         *      google chart.
         */
        function prepareChart(debts) {
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

            for (i = 0; i < debts.length; i++) {
                row = {
                    c: [
                        { v: debts[i].friend.firstname + ' ' + debts[i].friend.lastname },
                        { v: debts[i].amount }
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

    PaymentCtrl.$inject = [ "Payments", "Debts", "Auth" ];
})();