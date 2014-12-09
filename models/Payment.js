var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Payment', PaymentSchema);