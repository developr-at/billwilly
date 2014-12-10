var User = require('../models/User');

exports.register = function(req, res, next) {
    // do sth.
    console.log(req.body);

    // @TODO: Add basic validation
    var data = req.body;

    User.findOne({ email: data.email }, function(err, user) {
        if (err) {
            // @TODO: log error
            console.log(err);
        }

        // @TODO: Handle user already exists
        if (!user) {
            var newUser = new User({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.firstPassword,
            });

            newUser.save();
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
    // do sth.
};

exports.addFriend = function(req, res, next) {
    // do sth.
};

exports.removeFriend = function(req, res, next) {
    // do sth.
};