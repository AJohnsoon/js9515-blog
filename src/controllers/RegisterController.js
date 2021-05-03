const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const modelRegister = require('../models/Register');

router.get('/register', (req, res)=>{
    res.render('register', {})
})


router.post('/account/save',(req, res)=>{

    const user = req.body.username
    const pwdHash = crypto.createHash('sha256').update(req.body.password).digest('base64')+ ''+ crypto.createHash('sha256').update(req.body.username).digest('base64')
    const pwdConfHash = crypto.createHash('sha256').update(req.body.confirmpwd).digest('base64')+ ''+ crypto.createHash('sha256').update(req.body.username).digest('base64')

    const createAccount = {
        username: user,
        pwd: pwdHash,
        confpwd: pwdConfHash
    }

    if(createAccount.username === '' || createAccount.pwd === '' || createAccount.confpwd === ''){
        res.redirect('/register')
    }
    else if(createAccount.pwd !== createAccount.confpwd){
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