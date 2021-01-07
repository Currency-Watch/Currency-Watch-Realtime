const router = require('express').Router()
const userController = require('../controller/userController.js')

router.post('/register', userController.register)
router.post('/login', userController.login)
// router.get('/home', userController)


module.exports = router