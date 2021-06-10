const Sequelize = require('sequelize');
const connection = require('../database/data');

const User = connection.define('user', {
    username:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})


//User.sync()
module.exports = User;