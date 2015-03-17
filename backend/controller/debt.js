var Debt = require('../models/Debt'),
    User = require('../models/User'),
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

        async.parallel([
            function(callback) {
                Debt
                    .findAll({ where: { 'first_user_id': userId }/*, include: [ {model: User, as: User.tableName }]*/
                    , include: [
                        { model: User, as: 'SecondUser' }
                    ]})
                    .then(function (debts) {
                        if (debts) {
                            return callback(null, debts);
                        } else {
                            return callback(null, []);
                        }
                    });
            },
            function(callback) {
                Debt
                    .findAll({ where: { 'second_user_id': userId }/*, include: [ {model: User, as: User.tableName }]*/
                     , include: [
                        { model: User, as: 'FirstUser' }
                    ]})
                    .then(function (debts) {
                        if (debts) {
                            return callback(null, debts);
                        } else {
                            return callback(null, []);
                        }
                    });
            }
        ],
        function(err, allDebts) {
            if (err) {
                return next(err);
            }

            var firstDebtArray = allDebts[0],
                secondDebtArray = allDebts[1],
                mergedDebts = [],
                debt;

            for (var i = 0; i < firstDebtArray.length; ++i) {
                debt = firstDebtArray[ i ];

                mergedDebts.push({
                    friend: res.filter([ 'id', 'firstname', 'lastname', 'email' ], debt.SecondUser),
                    amount: debt.amount
                });
            }

            for (var i = 0; i < secondDebtArray.length; ++i) {
                debt = secondDebtArray[ i ];

                mergedDebts.push({
                    friend: res.filter([ 'id', 'firstname', 'lastname', 'email' ], debt.FirstUser),
                    amount: debt.amount
                });
            }

            return res.json({
                message: "Success",
                debts:  mergedDebts
            });
        });
    }

})();