var mongoose = require('mongoose');

var CurrencySchema = new mongoose.Schema({
    name: {
    	type: String,
    	unique: true,
    	required: true
    }
});

module.exports = mongoose.model('Currency', CurrencySchema);