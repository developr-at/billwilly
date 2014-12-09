var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
	function(email, password, callback) {
  	User.findOne({ email: email }, function (err, user) {
    		if (err) { 
    			return callback(err); 
    		}

    		// No user found with that email
    		if (!user) {
    			return callback(null, false);
    		}

    		// Make sure the password is correct
    		user.verifyPassword(password, function(err, isMatch) {
      		if (err) { 
      			return callback(err); 
      		}

      		// Password did not match
      		if (!isMatch) { 
      			return callback(null, false); 
      		}

      		// Success
      		return callback(null, user);
    		});
  	});
	}
));

passport.serializeUser(function(user, done) {
  done(null, user.id.toString());
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

exports.isAuthenticated = function(req, res, next) {
	return passport.authenticate('local', { 
    successRedirect: '/auth/user',
    session : true 
  })(req, res, next);
};

exports.user = function(req, res, next) {
  //res.writeHead(200, {"Content-Type": "application/json"});
  console.log(req.user);
  res.end(JSON.stringify({
    status: 'sucess',
    message: null,
    user: req.user
  }));
};

exports.logout = function(req, res, next) {
  req.logout();
  res.redirect('/');
};