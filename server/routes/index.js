const router = require('express').Router()
const userRouter = require('../routes/routerUser')
const weatherRouter = require('./weatherRouter')
const currenyRouter = require('./currencyRouter')

router.use(userRouter)
router.use('/weather', weatherRouter)
router.use('/currency', currenyRouter)

module.exports = router