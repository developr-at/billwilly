var sequelize = require('../db/sequelize'),
    User = require('../models/User'),
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
        search: search,

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

        User
            .find({ where: { email: data.email } })
            .then(function(user) {
                if (user) {
                    res.json({
                        success: false
                    });
                } else {
                    res.status(404).json({
                        success: true
                    });
                }
            });
    }

    /**
     * 
     * @alias module:controller/user.search
     * @param {object} req
     * @param {object} res
     * @param {object} next
     */
    function search(req, res, next) {
        var data = req.body,
            searchTerm = '%' + data.searchTerm + '%';

        User
            .findAndCountAll({ where: {
                $or: [
                    { email: { $like: searchTerm } },
                    { firstname: { $like: searchTerm } },
                    { lastname: { $like: searchTerm } }
                ]
            }})
            .then(function(result) {
                if (result) {
                    res.json({
                        success: true,
                        user: res.arrayFilter([ 'id', 'firstname', 'lastname', 'email' ], result.rows)
                    });
                } else {
                    res.status(404).json({
                        success: false
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
            query.id = data.id;

        User
            .find({ where: query })
            .then(function(user) {
                if (user) {
                    res.json({
                        user: res.filter([ 'id', 'firstname', 'lastname', 'email' ], user.dataValues)
                    });
                } else {
                    res.status(404).json({
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

        User
            .find({ where: { email: data.email } })
            .then(function(user) {
                if (user) {
                    // Update data
                    user.updateAttributes({
                            firstname: data.firstname,
                            lastname: data.lastname
                        })
                        .success(function () {
                            res.json({
                                success: false
                            });
                        })
                        .error(function () {
                            res.status(404).json({
                                success: true
                            });
                        });
                } else {
                    res.status(404).json({
                        message: "User not found"
                    });
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
        // @TODO: Add basic validation
        var data = req.body;

        User
            .find({ where: { email: data.email } })
            .then(function(user) {
                if (user) {
                    next(new Error('User with email ' + data.email) + ' already exists');
                } else {
                    User.create({
                            firstname: data.firstname,
                            lastname: data.lastname,
                            email: data.email,
                            password: data.firstPassword
                        })
                        .then(function (newUser) {
                            if (newUser) {
                                req.logIn(newUser, function (err) {
                                    if (err) {
                                        return next(err);
                                    }

                                    return res.json({
                                        message: "Registration successfull",
                                        user:  res.filter([ 'id', 'firstname', 'lastname', 'email' ], newUser.dataValues)
                                    });
                                })
                            } else {
                                console.log(err);
                                next(err);
                            }
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

        sequelize
            .query('SELECT us.id, us.firstname, us.lastname, us.email, de.amount as negative, de2.amount as positive ' +
                    'FROM bw_friend fr ' +
                    'JOIN bw_user us on fr.friend_id = us.id ' +
                    'LEFT JOIN bw_debt de on de.first_user_id = us.id ' +
                    'LEFT JOIN bw_debt de2 on de2.second_user_id = us.id ' +
                    'WHERE fr.user_id = :userId', { replacements: { userId: data.id }, type: sequelize.QueryTypes.SELECT })
            .then(function(data) {
                return res.json({
                    message: null,
                    friends: data
                });
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
        // var currentUser = req.cookies.user;

        // console.log(req.cookies);
        // console.log(currentUser);

        // if (currentUser.id !== data.id && !currentUser.admin) {
        //     return next(new Error('Id parameter has to be id of your user or id of an admin user'), null);
        // }

        async.parallel([
            function(callback) {
                // TODO: move User.findOne with friends to a separate module to reduce code
                User
                    .find(data.id)
                    .then(function (user) {
                        if (user) {
                            return callback(null, user);
                        } else {
                            return callback(new Error('Unable to find user with id ' + data.id), null);
                        }
                    });
            },
            function(callback) {
                // TODO: move User.findOne with friends to a separate module to reduce code
                User
                    .find(data.friendId)
                    .then(function (user) {
                        if (user) {
                            return callback(null, user);
                        } else {
                            return callback(new Error('Unable to find user with id ' + data.friendId), null);
                        }
                    });
            }
        ],
        function(err, users) {
            if (err) {
                return next(err);
            }

            var firstUser = users[0],
                secondUser = users[1];

            firstUser.addFriend(secondUser);
            secondUser.addFriend(firstUser);

            return res.json({
                message: "Success",
                friend:  res.filter([ 'id', 'firstname', 'lastname', 'email' ], secondUser)
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
        var data = req.body;

        // TODO: Remove user from friend (the other way)
        // TODO: move User.findOne with friends to a separate module to reduce code
        User
            .find({ where: { id: data.id }/*, include: [{model: User, as: 'friends'}]*/ })
            .then(function (user) {
                if (user) {
                    user.removeFriend(data.friendId).then(function() {
                        return res.json({
                            message: 'Removed friend with id ' + data.friendId
                        });
                    });
                } else {
                    res.status(404).json({
                        message: 'Unable to find user with id ' + data.friendId
                    });
                }
            });
    }

})();