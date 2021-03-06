const express = require('express');
const router = express.Router();
const modelCategory = require('../models/Category');
const modelArticle = require('../models/Article')
const slugify = require('slugify')
const middlewareAuth = require('../middlewares/authenticate');

router.get('/admin/articles/new', middlewareAuth, (req, res) => {
    modelCategory.findAll().then(allCategories => {
        res.render('views/admin/articles/article', {categories: allCategories})
    })
});

router.post('/articles/save', middlewareAuth, (req, res)=>{

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

router.get('/admin/articles', middlewareAuth,  (req, res)=>{
    modelArticle.findAll({
        include: [{
            model: modelCategory
        }]
    }).then((articles)=>{
        res.render('views/admin/articles/index', {showArticles: articles})
    })
})



router.post("/articles/delete", middlewareAuth, (req, res)=>{
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


router.get('/admin/articles/edit/:id', middlewareAuth, (req, res)=>{
    let id = req.params.id;
    isNaN(id) ? res.redirect('/admin/articles') : console.info('user pass NAN')
    try{
        modelArticle.findOne({
            where: {
                id: id
            },
            include:[{model: modelCategory}]
        }).then( findArticle => {
            if(findArticle != undefined){
                modelCategory.findAll().then(articlesFind =>{
                    res.render('views/admin/articles/editArticles', {
                        article: findArticle,
                        categories: articlesFind
                    });
                })
            }
            else{
                res.redirect('/admin/articles')
            }
        })

    }
    catch(err){
        console.info(err)
        res.redirect('/admin/articles')
    }
})


router.post('/articles/update', middlewareAuth, (req,res)=>{
    let updateArticle = {
        id: req.body.id,
        title: req.body.title,
        message: req.body.message,
        categoryId: req.body.categorySelected
    }
    modelArticle.update({
        title: updateArticle.title,
        slug: slugify(updateArticle.title),
        message: updateArticle.message,
        categoryId: updateArticle.categoryId
    }, {
        where: {id: updateArticle.id}
    }).then(()=> {
        res.redirect('/admin/articles')
    })
})

router.get('/articles/pagination/:num', (req, res)=>{
    let page = req.params.num;
    let pagination = 0

    if(isNaN(page) || page == 1){
        pagination = 0 
    }
    else{
        pagination = (parseInt(page) -1) * 3
    }

    modelArticle.findAndCountAll({
        limit: 3,
        offset: pagination,
        order:[
            ['id', 'DESC']
        ]
    }).then( articlesRecived =>{
        let next;
        if(pagination + 3 >= articlesRecived.count){
            next = false
        }
        else{
            next = true
        }

        let resultPage = {
            currentPage: parseInt(page),
            nextPage: next,
            search: articlesRecived,

        }
        modelCategory.findAll().then( categoriesFind =>{
            res.render('views/admin/articles/pages', {
                result: resultPage, 
                categories: categoriesFind
            })        
        })
    })
})


module.exports = router