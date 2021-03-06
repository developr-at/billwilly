var express = require('express');
var router = express.Router();
var passport = require('passport');
var authenticationController = require('../controller/authentication.js');

router.route('/authenticate')
	.post(authenticationController.isAuthenticated);

router.route('/release')
	.get(authenticationController.logout);

module.exports = router;