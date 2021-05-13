const Sequelize = require('sequelize');
const connection = new Sequelize('js9515_blog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
    //timezone: '-03:00'
});

module.exports = connection