const express = require('express');
const router = express.Router();
const userModel = require('../models/User')


router.get('/admin/users', (req, res)=>{
    res.send("User router ");
})


router.get('/admin/users/create',(req, res)=>{
    res.render('views/admin/users/create');
})

router.post('/user/create', (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    res.json({username, password})

})

module.exports = router;