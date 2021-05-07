const express = require('express');
const router = express.Router();

router.get('/admin/articles/new', (req, res) => {
    res.render('views/admin/articles/article', {})
});

router.get('/admin/articles/', (req, res)=>{
    res.render('views/admin/articles/index', {})
})




module.exports = router