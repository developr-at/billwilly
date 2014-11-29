var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,

    password: String,
    salt: String,

    admin: Boolean,
    deleted: Boolean,

    lastLogin: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now }
});

mongoose.model('User', UserSchema);