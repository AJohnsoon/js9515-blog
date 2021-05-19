const express = require('express')
const path = require('path');
const app = express()
const navigationController = require('./controllers/NavigationController');
const categoriesController = require('./controllers/CategoriesController');
const articlesController = require('./controllers/ArticlesController');
const articleModel = require('./models/Article');
const categoryModel = require('./models/Category');


app.use(express.static(path.join(__dirname+ '/..', 'public')))
app.set('views', path.join(__dirname+ '/..', 'public'))
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')


app.use('/', navigationController);
app.use('/', categoriesController);
app.use('/', articlesController);




module.exports = app