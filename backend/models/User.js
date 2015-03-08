var bcrypt = require('bcrypt-nodejs'),
    Sequelize = require('Sequelize'),
    sequelize = require('../db/sequelize');

/**
 * User Model
 * @module models/User
 */
module.exports = (function() {
    'use strict';

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
        admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
            beforeCreate: function(user, options, next) {

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
            verifyPassword: function(password, next) {
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
    return User;
})();