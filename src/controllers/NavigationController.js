const express = require('express');
const router = express.Router();
const articleModel = require('../models/Article');
const categoryModel = require('../models/Category');


router.get('/', (req, res)=>{
    articleModel.findAll().then((modelArticles) => {
        res.render('index', {
            articles: modelArticles
        })
    })
})

router.get('/about', (req, res)=>{
    res.render('about')
})



module.exports = router