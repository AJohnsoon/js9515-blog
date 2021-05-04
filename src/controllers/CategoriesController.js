const express = require('express');
const router = express.Router();
const modelCategory = require('../models/Category')
const slugify = require('slugify')

router.get('/admin/categories/new', (req, res)=>{    
    res.render('views/admin/category', {})
})

router.post('/categories/save', (req, res)=>{
    let title = req.body.title;
    if( title === undefined || title === '' || title === null){
        res.redirect("/admin/categories/new")                
    }else{
        modelCategory.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect('/admin/categories/')
        })
    }
})

router.get('/admin/categories/', (req, res)=>{
    modelCategory.findAll().then(( categories)=>{
        res.render('views/admin/index', {showCategories: categories})
    })
})

module.exports = router