var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Sequelize = require('Sequelize');
var sequelize = require('../db/sequelize');

module.exports = (function() {
    var User = sequelize.define('User', {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        password: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true
            }
        },
        salt: {
            type: Sequelize.STRING
        },
        admin: {
            type: Sequelize.BOOLEAN
        },
        lastLogin: {
            type: Sequelize.DATE
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'bw_user',
        hooks: {
            beforeCreate: function(user, next) {

                if (!user.changed('password')) {
                    return next();
                }

                bcrypt.genSalt(5, function(err, salt) {
                    if (err) {
                        return next(err);
                    }

                    bcrypt.hash(user.password, salt, null, function(err, hash) {
                        if (err) {
                            return next(err);
                        }
                        user.password = hash;
                        next();
                    });
                });
            }
        },
        instanceMethods: {
            verfiyPassword: function(password, next) {
                bcrypt.compare(password, this.password, function(err, isMatch) {
                    if (err) {
                        return next(err);
                    }
                    next(null, isMatch);
                });
            }
        }
    });

    User.belongsToMany(User, { as: 'friends', through: 'bw_friend' });
    sequelize.sync();
    return User;

})();