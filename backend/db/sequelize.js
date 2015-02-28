var Sequelize = require('Sequelize');

console.log('connecting to database');
var sequelize = new Sequelize('billwilly', 'billwilly', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;