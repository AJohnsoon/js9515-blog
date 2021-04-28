const Sequelize = require('sequelize');
const connection = require('../database/data')

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    message:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})


module.exports = Article