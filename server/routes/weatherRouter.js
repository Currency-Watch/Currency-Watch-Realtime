const router = require('express').Router()
const WeatherController = require('../controller/weatherController')

router.get('/', WeatherController.currentWeather)

module.exports = router