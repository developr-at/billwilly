var Payment = require('../models/Payment'),
    PaymentItem = require('../models/PaymentItem');

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
            paymentData = data.paymentData;

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

})();