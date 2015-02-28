var Sequelize = require('Sequelize');

/**
 * Database Initialization with Sequelize ORM
 * @module db/sequelize
 */
module.exports = (function() {
    var dbConfig = {
        hostname: 'localhost',
        database: 'billwilly',
        username: 'billwilly',
        password: '',
        dialect: 'mysql'
    };

    return new Sequelize(dbConfig.database, dbConfig.username, '', {
        host: dbConfig.hostname,
        dialect: dbConfig.dialect
    });
})();