(function () {
    'use strict';

    angular
        .module('app.payments')
        .controller('PaymentCtrl', PaymentCtrl);

    function PaymentCtrl(Payments) {
        var vm = this;

        vm.payments = Payments.payments;
        vm.positiveChart = prepareChart(Payments.getPositivePayments());
        vm.negativeChart = prepareChart(Payments.getNegativePayments());

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
    }

    PaymentCtrl.$inject = [ "Payments" ];
})();