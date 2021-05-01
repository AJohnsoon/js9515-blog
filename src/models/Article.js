const Sequelize = require('sequelize');
const connection = require('../database/data');
const Category = require('./Category');



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


Category.hasMany(Article);
Article.belongsTo(Category);

//update database -> Article.sync()
module.exports = Article;