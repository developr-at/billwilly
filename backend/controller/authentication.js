var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, callback) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                return callback(err, false, { message: err });
            }

            // No user found with that email
            if (!user) {
                return callback(null, false, { message: 'Invalid credentials' });
            }

            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                if (err) {
                    return callback(err, false, { message: err });
                }

                // Password did not match
                if (!isMatch) {
                    return callback(null, false, { message: 'Invalid credentials' });
                }

                // Success
                return callback(null, user);
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id.toString());
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

/**
 * Authentication Controller
 * @module controller/authentication
 */
module.exports = (function () {
    'use strict';

    var module = {
        isAuthenticated: isAuthenticated,
        logout: logout
    };

    return module;

    ///////////////////////////////////////////////////////////////////////////

    /**
     * isAuthenticated
     * @alias module:controller/authentication.isAuthenticated
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function isAuthenticated(req, res, next) {
        return passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(401).json({
                    message: err || info.message,
                    user: null
                });
            }

            req.logIn(user, function(err) {
                if (err) {
                  return next(err);
                }
                return res.json({
                  message: null,
                  user: req.user
                });
            });
        })(req, res, next);
    }

    /**
     * logout
     * @alias module:controller/authentication.logout
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function logout(req, res, next) {
        req.logout();
        res.redirect('/');
    }
})();