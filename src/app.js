const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const navigationController = require('./controllers/NavigationController');
const categoriesController = require('./controllers/CategoriesController');
const articlesController = require('./controllers/ArticlesController');
const publicationController = require('./controllers/PublicationController');
const userController = require('./controllers/UserController');

app.use(express.static(path.join(__dirname+ '/..', 'public')));
app.set('views', path.join(__dirname+ '/..', 'public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard word',
    cookie: {
        secure: true,
        maxAge: 30000
    }
}))

app.use('/', navigationController);
app.use('/', categoriesController);
app.use('/', articlesController);
app.use('/', publicationController);
app.use('/', userController);





module.exports = app;