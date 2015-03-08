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
        var data = req.body;

        res.json({
            success: true
        });
    }

})();