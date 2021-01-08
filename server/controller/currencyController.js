const axios = require('axios')

class CurrencyController {
  static getRates(req, res, next) {
    const options = 'https://api.exchangeratesapi.io/latest?base=EUR'

    axios.request(options)
      .then(data => {
        res.status(200).json(data.data)
      })
      .catch(err => {
        // console.log(err.message);
        res.status(500).json(err)
      })
  }
}

module.exports = CurrencyController