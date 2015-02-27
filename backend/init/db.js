var User = require('../models/User');

/**
 * Database Initialization
 * @module init/db
 */
module.exports = (function () {
    'use strict';

    var module = {
        init: init,
        initAdminUser: initAdminUser
    };

    return module;

    ///////////////////////////////////////////////////////////////////////////


    /**
     * init
     * @alias module:init/db.init
     */
    function init () {
        module.initAdminUser();
    }

    /**
     * initAdminUser
     * @alias module:init/db.initAdminUser
     */
    function initAdminUser () {
        var ADMIN_EMAIL = 'admin@billwilly.com',
            ADMIN_PASSWORD = 'bill?willy3';

        User.findOne({ email: ADMIN_EMAIL }, function(err, user) {
            if (err) {
                // @TODO: log error
                console.log(err);
            }

            if (!user) {
                var admin = new User({
                    email: ADMIN_EMAIL,
                    password: ADMIN_PASSWORD
                });

                admin.save();
            }
        });
    }
})();