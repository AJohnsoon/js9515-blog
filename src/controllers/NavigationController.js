const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
    res.render('index',{})
})

router.get('/about', (req, res)=>{
    res.render('about')
})

router.get('/signin', (req, res)=>{
    res.render('signin', {})
})



module.exports = router