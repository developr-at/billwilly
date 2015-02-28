var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var sequelize = require('../db/sequelize');

sequelize.define('User', {

}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'bw_user'
});

var UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    salt: String,

    admin: Boolean,
    deleted: Boolean,

    friends: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],

    lastLogin: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(callback) {
    var user = this;

    if (!user.isModified('password')) {
        return callback();
    }

    bcrypt.genSalt(5, function(err, salt) {
        if (err) {
            return callback(err);
        }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return callback(err);
            }
            user.password = hash;
            callback();
        });
    });
});

UserSchema.methods.verifyPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

sequelize.sync();

module.exports = mongoose.model('User', UserSchema);