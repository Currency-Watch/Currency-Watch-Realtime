const router = require('express').Router()
const userController = require('../controller/userController.js')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/rates', userController.getRates)
router.get('/news', userController.getNews)


module.exports = router