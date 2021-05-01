const express = require('express')
const path = require('path');
const app = express()
const navigationController = require('./controllers/NavigationController');
const categoriesController = require('./controllers/CategoriesController');
const articlesController = require('./controllers/ArticlesController');
const registerController = require('./controllers/RegisterController');
const signinController = require('./controllers/SigninController')


const articleModel = require('./models/Article');
const categoryModel = require('./models/Category');
const registerModel = require('./models/Register');


app.use(express.static(path.join(__dirname+ '/..', 'public')))
app.set('views', path.join(__dirname+ '/..', 'public'))
app.use(express.urlencoded({extended: false}))
app.set('view engine', 'ejs')


app.use('/', navigationController);
app.use('/', categoriesController);
app.use('/', articlesController);
app.use('/', registerController);
app.use('/', signinController)




module.exports = app