var sequelize = require('../db/sequelize'),
    Sequelize = require('Sequelize'),
    User = require('../models/User');

/**
 * Debt Model
 * @module models/Debt
 */
module.exports = (function() {
    var Debt = sequelize.define('Debt', {
        amount: {
            type: Sequelize.DECIMAL
        },
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        tableName: 'bw_debt'
    });

    Debt.belongsTo(User, { as: 'FirstUser' });
    Debt.belongsTo(User, { as: 'SecondUser' });

    return Debt;
})();