const express = require('express');
const bcrypt = require('bcryptjs');
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
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    userModel.findOne({where: {username: username}}).then(user => {
        if(user == undefined){
            userModel.create({
                username: username,
                password:  hash
            }).then(()=>{
                res.redirect('/admin/articles');
            }).catch(err=>{
                res.redirect('/');
            })
        }else{
            res.redirect('/admin/users/create')
        }
    })

    
})

module.exports = router;