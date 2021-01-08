const axios = require('axios')

class WeatherController {
  static currentWeather(req, res, next) {
    const currentWeather = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_DB_API_KEY}&query=Jakarta`

    axios.get(currentWeather)
      .then(response => {
        let currentWeather = {
          location: response.data.location,
          current: response.data.current 
        }
        res.status(200).json(currentWeather)
      })
        .catch(err => {
          next(err)
        })
  }
}

module.exports = WeatherController