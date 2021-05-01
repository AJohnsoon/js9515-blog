const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const modelRegister = require('../models/Register');

router.get('/register', (req, res)=>{
    res.render('register', {})
})


router.post('/account/save',(req, res)=>{
    const createAccount = {
        username: req.body.username,
        pwd: crypto.createHash('md5').update(req.body.password).digest('hex'),
        confpwd: crypto.createHash('md5').update(req.body.confirmpwd).digest('hex')
    }


    if(createAccount.username === '' || createAccount.password === '' || createAccount.confpwd === ''){
        res.redirect('/register')
    }
    else{
        modelRegister.create({
            username: createAccount.username,
            password: createAccount.pwd,
            confirmpwd: createAccount.confpwd
        }).then(()=>{
            res.redirect('/signin')
        })
    }



})

module.exports = router