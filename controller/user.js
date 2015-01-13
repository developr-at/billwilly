var User = require('../models/User');

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

    function check(req, res, next) {
        var data = req.body;

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

    function remove(req, res, next) {
        // do sth.
    }

    function update(req, res, next) {
        // do sth.
    }

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

    function addFriend(req, res, next) {
        var data = req.body;
        var currentUser = req.cookies.user;

        if (currentUser._id === data.id || currentUser.admin) {
            return next(new Error('Id parameter has to be id of your user or id of an admin user'), null);
        }

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
                User.findOne({ _id: data.friendId })
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

            users[0].friends.push(users[1]);
            users[1].friends.push(users[0]);
            users[0].save();
            users[1].save();
        });
    }

    function removeFriend(req, res, next) {
        // do sth.
    }

})();