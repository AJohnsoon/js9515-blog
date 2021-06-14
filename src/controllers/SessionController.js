const express = require('express');
const router = express.Router();


router.get('/session/read', (req, res)=>{
    req.session.user = {
        username: 'allaNascimento',
        email: 'email@email.test.br',
        id: 13
    }
    res.send('Session started')
})

router.get('/session/write', (req,res)=>{
    res.json({
        user: req.session.user        
    })
})



module.exports = router