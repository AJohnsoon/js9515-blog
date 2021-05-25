const express = require('express');
const router = express.Router();
const articleModel = require('../models/Article');
const categoryModel = require('../models/Category');


router.get('/', (req, res)=>{
    articleModel.findAll({
        order:[
            ['id', 'DESC']
        ],
        limit: 3
    }).then((modelArticles) => {
        if(modelArticles != undefined){
            categoryModel.findAll().then(modelCategories =>{
                res.render('index', {
                    articles: modelArticles,
                    categories: modelCategories
                })
            })
        }
    })
})

router.get('/:slug', (req,res)=>{
    let slug = req.params.slug;
    articleModel.findOne({
        where:{ slug: slug}
    }).then(reading =>{
        if(reading != undefined){
            res.render('reading', {
                reading: reading
            })
        }
        else{
            res.redirect("/")
        }
    }).catch(err=>{
        console.log(err)
        res.redirect("/")
    })
})


router.get('/find/:slug', (req, res)=>{
    let slugFind = req.params.slug;
    categoryModel.findOne({
        where: {
            slug: slugFind
        },
        include: [{model: articleModel}]
    }).then(categoryFind => {
        if(categoryFind !== undefined){
            categoryModel.findAll().then(categoriesFind => {
                res.render('index', {
                    articles: categoryFind.articles,
                    categories: categoriesFind
                })
                console.info(`>>>>>>>>>>>>>>>>${slugFind} <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
            })
        }
        else{
            res.redirect('/')
        }
    }).catch(err => {
        console.info( `>>>>>>>>>>>>>>>${err}` )
    })
})




module.exports = router