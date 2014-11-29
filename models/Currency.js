var mongoose = require('mongoose');

var CurrencySchema = new mongoose.Schema({
    name: String
});

mongoose.model('Currency', CurrencySchema);