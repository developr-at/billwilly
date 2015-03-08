var express = require('express');
var router = express.Router();
var paymentController = require('../controller/payment.js');

router.route('/add')
    .post(paymentController.addPayment);

module.exports = router;
