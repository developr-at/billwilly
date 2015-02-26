var User = require('../models/User');

exports.initAdminUser = function() {
	User.findOne({ email: 'admin@billwilly.com' }, function(err, user) {
		if (err) {
			// @TODO: log error
			console.log(err);
		}

		if (!user) {
			var admin = new User({
				email: 'admin@billwilly.com',
				password: 'bill?willy3'
			});
			admin.save();
		}
	});
};

exports.init = function() {
	this.initAdminUser();
};