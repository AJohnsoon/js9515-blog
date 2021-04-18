const express = require("express")
const router = express()

router.set('view engine', 'ejs')
router.use(express.static(__dirname+ '/views'))
router.use(express.urlencoded({extended: false}))


router.get('/', (req, res)=>{
    res.render('index', {})
})

router.get('/about', (req, res)=>{
    res.render('about', {})
})

router.get('/profile', (req, res)=>{
    res.render('profile', {})
})


module.exports = router