/**
 * @fileOverview Definition of the Payments Module
 * @author Thomas Prochazka
 * @version: 0.1
 */
 (function () {
    'use strict';

    angular
        .module('app.payments', [
            'googlechart',
            'smart-table',

            'app.debts'
        ])
        .config(config);

    /**
     * Configuration of the Payments Module
     * @param {object} $stateProvider - AngularJS state provider
     */
    function config($stateProvider) {
        // Payments Overview page
        $stateProvider.state('payments', {
            url: '/payments',
            templateUrl: 'views/payments.tmpl.html',
            controller: 'PaymentCtrl as payment'
        });

        // Add Payments page
        $stateProvider.state('addPayment', {
            url: '/payments/add',
            templateUrl: 'views/addPayment.tmpl.html',
            controller: 'PaymentCtrl as payment'
        });
    }

})();