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
    			return callback(err, false, { message: err });
    		}

    		// No user found with that email
    		if (!user) {
    			return callback(null, false, { message: 'Invalid credentials' });
    		}

    		// Make sure the password is correct
    		user.verifyPassword(password, function(err, isMatch) {
      		if (err) {
      			return callback(err, false, { message: err });
      		}

      		// Password did not match
      		if (!isMatch) {
      			return callback(null, false, { message: 'Invalid credentials' });
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
	return passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({
          message: err || info.message,
          user: null
        });
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.json({
          message: null,
          user: req.user
        });
      });
    }
  )(req, res, next);
};

exports.logout = function(req, res, next) {
  req.logout();
  res.redirect('/');
};