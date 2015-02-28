var sequelize = require('../db/sequelize'),
    Sequelize = require('Sequelize');

/**
 * Currency Model
 * @module models/Currency
 */
module.exports = (function() {
    var Currency = sequelize.define('Currency', {
        name: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'bw_currency'
    });

    return Currency;
})();