var sequelize = require('../db/sequelize'),
    User = require('../models/User'),
    Payment = require('../models/Payment'),
    Sequelize = require('Sequelize');

/**
 * PaymentItem Model
 * @module models/PaymentItem
 */
module.exports = (function() {
    var PaymentItem = sequelize.define('PaymentItem', {
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'bw_paymentitem'
    });

    PaymentItem.belongsTo(Payment);
    PaymentItem.belongsTo(User);
    return PaymentItem;
})();