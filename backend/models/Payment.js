var sequelize = require('../db/sequelize'),
    Sequelize = require('Sequelize'),
    Currency = require('./Currency');

/**
 * Payment Model
 * @module models/Payment
 */
module.exports = (function() {
    var Payment = sequelize.define('Payment', {
        title: {
            type: Sequelize.STRING
        },
        notes: {
            type: Sequelize.TEXT
        },
        type: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        }
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'bw_payment'
    });

    return Payment;
})();

// @TODO: create relation for user payment holding amount (instead of amount field and toUser relation
// @TODO: convert PaymentHistory to sequelize and add relation


/*ar PaymentSchema = new mongoose.Schema({
    title: String,
    notes: String,
    type: String,
    date: { type: Date, default: Date.now },

    deleted: Boolean,

    amount: { type:Number, default: 0 },
    currency: { type: mongoose.Schema.Types.ObjectId, ref: 'Currency' },

    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    created: { type: Date, default: Date.now },

    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentHistory' }]
});

module.exports = mongoose.model('Payment', PaymentSchema);*/