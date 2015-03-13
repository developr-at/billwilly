var Debt = require('../models/Debt'),
    async = require('async');

/**
 * Debt Controller
 * @module controller/debt
 */
module.exports = (function() {
    'use strict';

    var module = {
        getDebts: getDebts
    };

    return module;

    ///////////////////////////////////////////////////////////////////////////

    /**
     * getDebts
     * @alias module:controller/debt.getDebts
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function getDebts(req, res, next) {
        var data = req.body,
            userId = data.userId;

        // Debt
        //     .find({ where: { FirstUser: userId } })
        //     .then(function(debt) {
        //         if (debt) {
        //             res.json({
        //                 debt: res.filter([ 'id', 'FirstUser', 'SecondUser', 'amount' ], debt.dataValues)
        //                 success: false
        //             });
        //         } else {
        //             res.status(404).json({
        //                 success: true
        //             });
        //         }
        //     });

        res.json({
            success: false
        });
    }

})();