const router = require('express').Router()
const CurrencyController = require('../controller/currencyController')

router.get('/', CurrencyController.getRates)

module.exports = router