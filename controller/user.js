var User = require('../models/User');

exports.register = function(req, res, next) {
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
};

exports.delete = function(req, res, next) {
    // do sth.
};

exports.update = function(req, res, next) {
    // do sth.
};

exports.getFriends = function(req, res, next) {
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
};

exports.addFriend = function(req, res, next) {
    var data = req.body;
    var currentUser = req.user;

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
};

exports.removeFriend = function(req, res, next) {
    // do sth.
};