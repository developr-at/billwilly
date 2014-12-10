var express = require('express');
var router = express.Router();
var userController = require('../controller/user.js');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.route('/register')
	.post(userController.register);

module.exports = router;
