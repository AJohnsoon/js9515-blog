const express = require('express')
const path = require('path');
const router = express()

router.use(express.static(path.join(__dirname+ '/..', 'public')))
router.set('views', path.join(__dirname+ '/..', 'public'))
router.use(express.urlencoded({extended: false}))
router.set('view engine', 'ejs')


router.get('/', (req, res)=>{
    res.render('index', {})
})

router.get('/about', (req, res)=>{
    res.render('about', {})
})

router.get('/signin', (req, res)=>{
    res.render('signin', {})
})


module.exports = router