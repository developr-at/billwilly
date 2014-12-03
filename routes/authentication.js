var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/login',
  	passport.authenticate('local', { 
  		successRedirect: '/payments',
    	failureRedirect: '/login',
        failureFlash: true 
    })
);

router.get('/logout', function(req, res){
  	req.logout();
  	res.redirect('/');
});

module.exports = router;