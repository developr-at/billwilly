var express = require('express');
var router = express.Router();
var debtController = require('../controller/debt.js');

router.route('/')
    .post(debtController.getDebts);

module.exports = router;
