var express = require('express');
var router = express.Router();
var userController = require('../controller/user.js');

router.route('/profile/edit')
    .post(userController.editProfile);

router.route('/profile')
    .post(userController.profile);

router.route('/register')
    .post(userController.register);

router.route('/check')
    .post(userController.check);

router.route('/search')
    .post(userController.search);

router.route('/friends')
    .post(userController.getFriends);

router.route('/friends/add')
    .post(userController.addFriend);

router.route('/friends/remove')
    .post(userController.removeFriend);

module.exports = router;
