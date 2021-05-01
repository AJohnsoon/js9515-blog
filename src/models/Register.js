const Sequelize = require('sequelize');
const connection = require('../database/data');

const Register = connection.define('register', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    confirmpwd: {
        type: Sequelize.STRING,
        allowNull: false
    },
    allowed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
});

//Register.sync()
module.exports = Register;