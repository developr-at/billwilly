var express = require('express');
var router = express.Router();
var userController = require('../controller/user.js');

router.route('/register')
    .post(userController.register);

router.route('/check')
    .post(userController.check);

module.exports = router;
