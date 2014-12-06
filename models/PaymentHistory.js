var mongoose = require('mongoose');

var PaymentHistorySchema = new mongoose.Schema({
    changedAt: { type: Date, default: Date.now },
    changes: [{
        field: { type: String },
        oldValue: Schema.Types.Mixed,
        newValue: Schema.Types.Mixed
    }]
});

module.exports = mongoose.model('PaymentHistory', PaymentHistorySchema);