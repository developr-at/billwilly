var User = require('../models/User'),
    async = require('async');

/**
 * User Controller
 * @module controller/user
 */
module.exports = (function() {
    'use strict';

    var module = {
        // general
        check: check,

        // profile
        profile: profile,
        editProfile: editProfile,

        // crud
        register: register,
        update: update,
        remove: remove,

        // friends
        getFriends: getFriends,
        addFriend: addFriend,
        removeFriend: removeFriend
    };

    return module;

    ///////////////////////////////////////////////////////////////////////////

    /**
     * Checks if a given mail is already in use.
     * @alias module:controller/user.check
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function check(req, res, next) {
        var data = req.body;

        console.log("CHECK");

        User.findOne({ email: data.email }, function(err, user) {
            if (err) {
                return next(err);
            }

            if (user) {
                return res.json({
                    success: false
                });
            } else {
                return res.status(404).json({
                    success: true
                });
            }
        });
    }

    /**
     * profile
     * @alias module:controller/user.profile
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function profile(req, res, next) {
        var data = req.body,
            query = {};

        if ( data.email )
            query.email = data.email;
        else if ( data.id )
            query._id = data.id;

        console.log(data);
        console.log(query);

        User.findOne(query, function(err, user) {
            if (err) {
                return next(err);
            }

            if (user) {
                return res.json({
                    user: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email
                    }
                });
            } else {
                return res.status(404).json({
                    message: "User not found"
                });
            }
        });
    }


    /**
     * editProfile
     * @alias module:controller/user.editProfile
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function editProfile(req, res, next) {
        var data = req.body;

        User.findOne({ email: data.email }, function(err, user) {
            if (err) {
                return next(err);
            }

            if (user) {
                // Update data
                user.firstname = data.firstname;
                user.lastname = data.lastname;
            } else {
                // ...
            }
        })
    }

    /**
     * register
     * @alias module:controller/user.register
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function register(req, res, next) {
        // do sth.
        console.log(req.body);

        // @TODO: Add basic validation
        var data = req.body;

        User.findOne({ email: data.email }, function(err, user) {
            if (err) {
                return next(err);
            }

            if (user) {
                return next(new Error('User with email ' + data.email) + ' already exists');
            } else {
                var newUser = new User({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    password: data.firstPassword
                });

                newUser.save(function (err) {
                    if (err) {
                        // @TODO: log error
                        console.log(err);
                        return next(err);
                    }

                    req.logIn(newUser, function (err) {
                        if (err) {
                            return next(err);
                        }

                        return res.json({
                            message: "Registration successfull",
                            user: newUser
                        });
                    });
                });
            }
        });
    }

    /**
     * remove
     * @alias module:controller/user.remove
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function remove(req, res, next) {
        // do sth.
    }

    /**
     * update
     * @alias module:controller/user.update
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function update(req, res, next) {
        // do sth.
    }

    /**
     * getFriends
     * @alias module:controller/user.getFriends
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function getFriends(req, res, next) {
        var data = req.body;

        // TODO: move User.findOne with friends to a separate module to reduce code
        User.findOne({ _id: data.id })
            .populate({
                path: 'friends',
                match: { deleted: false }
            })
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }

                console.log(user);

                if (user) {
                    return res.json({
                        message: null,
                        friends: user.friends
                    });
                } else {
                    return next(new Error('Unable to find user with id ' + data.id));
                }
            });
    }

    /**
     * addFriend
     * @alias module:controller/user.addFriend
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function addFriend(req, res, next) {
        var data = req.body;
        var currentUser = req.cookies.user;

        // how to get current user????
        // console.log(typeof currentUser);

        // if (currentUser._id !== data.id || !currentUser.admin) {
        //     console.log("err");
        //     return next(new Error('Id parameter has to be id of your user or id of an admin user'), null);
        // }

        async.parallel([
            function(callback) {
                // TODO: move User.findOne with friends to a separate module to reduce code
                User.findOne({ _id: data.id })
                    .populate({
                        path: 'friends',
                        match: { deleted: false }
                    })
                    .exec(function (err, user) {
                        if (err) {
                            return callback(err, null);
                        }

                        if (user) {
                            return callback(null, user);
                        } else {
                            return callback(new Error('Unable to find user with id ' + data.id), null);
                        }
                    });
            },
            function(callback) {
                // TODO: move User.findOne with friends to a separate module to reduce code
                // for now use friendmail
                // User.findOne({ _id: data.friendId })
                User.findOne({ email: data.friendEmail })
                    .populate({
                        path: 'friends',
                        match: { deleted: false }
                    })
                    .exec(function (err, user) {
                        if (err) {
                            return callback(err, null);
                        }

                        if (user) {
                            return callback(null, user);
                        } else {
                            return callback(new Error('Unable to find user with id ' + data.id), null);
                        }
                    });
            }
        ],
        function(err, users) {
            if (err) {
                return next(err);
            }

            console.log(users);

            users[0].friends.push(users[1]);
            users[1].friends.push(users[0]);
            users[0].save();
            users[1].save();

            console.log(users);

            return res.json({
                message: "Success"
            });
        });
    }

    /**
     * removeFriend
     * @alias module:controller/user.removeFriend
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function removeFriend(req, res, next) {
        // do sth.
    }

})();