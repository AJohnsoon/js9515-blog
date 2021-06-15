const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const userModel = require('../models/User');

router.get('/admin/login', (req, res)=>{
   res.render('views/admin/users/login' )
})

router.post('/authenticate', (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    userModel.findOne({where: {username: username}}).then(user =>{
        if(user != undefined){
            let validPWD = bcrypt.compareSync(password, user.password)
            if(validPWD){
                req.session.user = {
                    id: user.id,
                    username: user.username
                }
                res.redirect('/')
            }
            else{
                res.redirect('/admin/login')
            }
        }
        else{
            res.redirect('/admin/login')
        }
    })
})

router.get('/admin/logout', (req,res)=>{
    req.session.user = undefined
    res.redirect('/')
})

module.exports = router