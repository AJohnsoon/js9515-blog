const Sequelize = require('sequelize');
const connection = require('../database/data');

const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})


//update database -> Category.sync()
module.exports = Category;