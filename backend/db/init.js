var User = require('../models/User');

/**
 * Database Initialization
 * @module db/init
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

        User.findOrCreate({
            where: {
                email: ADMIN_EMAIL
            },
            defaults: {
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD
            }
        });
    }
})();