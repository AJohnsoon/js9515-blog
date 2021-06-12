const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const userModel = require('../models/User')


router.get('/admin/users', (req, res)=>{
    userModel.findAll().then(receivedUser => {       
        res.render("views/admin/users/listUsers", {
            users: receivedUser
        });
    })

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
                res.redirect('/admin/users');
            }).catch(err=>{
                res.redirect('/', err);
            })
        }else{
            res.redirect('/admin/users/create')
        }
    })

    
})

router.post('/users/delete', (req, res)=>{
    let id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)){
            userModel.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect('/admin/users');
            })
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }
})

module.exports = router;