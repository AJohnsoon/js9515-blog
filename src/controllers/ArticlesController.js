const express = require('express');
const router = express.Router();
const modelCategory = require('../models/Category');
const modelArticle = require('../models/Article')
const slugify = require('slugify')

router.get('/admin/articles/new', (req, res) => {
    modelCategory.findAll().then(allCategories => {
        res.render('views/admin/articles/article', {categories: allCategories})
    })
});

router.post('/articles/save', (req, res)=>{

    let article = {
        title: req.body.title,
        message: req.body.body,
        categorySelected: req.body.categorySelected
    }

    if(article.title && article.message === null || article.title && article.message === undefined || article.title && article.message === '' ){
        res.redirect("/admin/articles/new")
    }else{
        modelArticle.create({
            title: article.title,
            message: article.message,
            slug: slugify(article.title),
            categoryId: article.categorySelected 
        }).then(()=>{
            res.redirect('/admin/articles/')
        })
    }
})

router.get('/admin/articles', (req, res)=>{
    modelArticle.findAll({
        include: [{
            model: modelCategory
        }]
    }).then((articles)=>{
        res.render('views/admin/articles/index', {showArticles: articles})
    })
})



router.post("/articles/delete", (req, res)=>{
    let id = req.body.id;

    if (id != undefined){
        if(!isNaN(id)){
            modelArticle.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect('/admin/articles')
            })
        }else{
            res.redirect('/')
        }
    }else{
        res.redirect('/')
    }
})


router.post('/admin/articles/edit/:id', (req, res)=>{
    res.json();
})


module.exports = router