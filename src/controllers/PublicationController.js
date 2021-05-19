const express = require('express');
const router = express.Router();
const articleModel = require('../models/Article');
const categoryModel = require('../models/Category');


router.get('/', (req, res)=>{
    articleModel.findAll({
        order:[
            ['id', 'DESC']
        ]
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




module.exports = router