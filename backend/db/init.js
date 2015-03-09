var sequelize = require('../db/sequelize'),
    User = require('../models/User'),
    Currency = require('../models/Currency'),
    Payment = require('../models/Payment'),
    PaymentItem = require('../models/PaymentItem');

/**
 * Database Initialization
 * @module db/init
 */
module.exports = (function () {
    'use strict';

    var module = {
        init: init
    };

    return module;

    ///////////////////////////////////////////////////////////////////////////


    /**
     * init
     * @alias module:init/db.init
     */
    function init () {
        sequelize.sync().then(function () {
            initAdminUser();
            initCurrencies();
        });
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

    /**
     * initCurrencies
     * @alias module:init/db.initCurrencies
     */
    function initCurrencies () {
        Currency.findOrCreate({
            where: {
                name: 'Euro'
            }
        });
    }
})();