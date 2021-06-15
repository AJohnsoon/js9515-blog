const express = require('express');
const router = express.Router();
const modelCategory = require('../models/Category')
const slugify = require('slugify')
const middlewareAuth = require('../middlewares/authenticate');


router.get('/admin/categories/new', middlewareAuth, (req, res) => {
    res.render('views/admin/categories/category', {})
});

router.post('/categories/save', middlewareAuth, (req, res) => {
    let title = req.body.title;
    if (title === undefined || title === '' || title === null) {
        res.redirect("/admin/categories/new")
    } else {
        modelCategory.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect('/admin/categories/')
        })
    }
});

router.get('/admin/categories/', middlewareAuth, (req, res) => {
    modelCategory.findAll().then((categories) => {
        res.render('views/admin/categories/index', {
            showCategories: categories
        })
    })
});


router.post("/categories/delete", middlewareAuth, (req, res) => {
    let id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            modelCategory.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin/categories')
            })
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
});




router.get('/admin/categories/edit/:id', middlewareAuth, (req, res) => {
    let id = req.params.id;
    isNaN(id) ? res.redirect('/admin/categories') : console.log('user pass NAN')
    try {
        modelCategory.findByPk(id).then(category => {
            if (category != undefined) {
                res.render('views/admin/categories/editCategory', {
                    category: category
                })
            } else {
                res.redirect('/admin/categories')
            }
        })
    } catch (err) {
        console.log(err)
        res.redirect('/admin/categories')
    }
});


router.post('/categories/update', middlewareAuth, (req, res) => {
    let updateCategorie = {
        id: req.body.id,
        title: req.body.title
    }
    modelCategory.update({
        title: updateCategorie.title,
        slug: slugify(updateCategorie.title)
    }, {
        where: {
            id: updateCategorie.id
        }
    }).then(() => {
        res.redirect('/admin/categories')
    })
})




module.exports = router