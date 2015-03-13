var Payment = require('../models/Payment'),
    PaymentItem = require('../models/PaymentItem'),
    Debt = require('../models/Debt');

/**
 * Payment Controller
 * @module controller/payment
 */
module.exports = (function() {
    'use strict';

    var module = {
        addPayment: addPayment
    };

    return module;

    ///////////////////////////////////////////////////////////////////////////

    /**
     * addPayment
     * @alias module:controller/payment.addPayment
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function addPayment(req, res, next) {
        var data = req.body,
            paymentData = data.paymentData,
            debtData = calculateDebtsFromPayment(paymentData);

        if (!paymentData.hasOwnProperty('items')) {
            res.status(404).json({
                success: false
            });
        }

        Payment
            .create({
                title: paymentData.title,
                notes: paymentData.notes
            })
            .then(function (payment, created) {
                for ( var item in paymentData.items ) {
                    PaymentItem
                        .create({
                            amount: item.amount
                        })
                        .then(function (paymentItem) {
                            payment.addPaymentItem(paymentItem);
                        });
                }

                res.json({
                    success: true
                });
            });
    }

    /**
     * calculateDebtsFromPayment
     * @alias module:controller/payment.calculateDebtsFromPayment
     * @param {object} paymentData - Information about the payment
     * @return {object|array} List of debts
     */
    function calculateDebtsFromPayment(paymentData) {
        var debts = [];

        if (!paymentData.hasOwnProperty('items')) {
            return [];
        }

        for ( var item in paymentData.items ) {

        }

        return debts;
    }

})();