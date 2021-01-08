const { user } = require('../models/index')
const axios = require('axios').default
const { comparePassword } = require('../helpers/bcrypt')
const {generateToken} = require("../helpers/jwt")

class userController {
  static register(req, res, next) {
    const newUser = {
      email: req.body.email,
      password: req.body.password
    }

    user.create(newUser)
      .then(user => {
        const response = {
          id: user.id,
          email: user.email
        }
        return res.status(201).json(response)
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const loginObj = {
      email: req.body.email,
      password: req.body.password
    }

    user.findOne({
      where: {
        email: loginObj.email
      }
    })
      .then(user => {

        if (!user) {
          next({ name: 'unauthorized' })
        }

        const match = comparePassword(loginObj.password, user.password)
        if (match) {
          // console.log(match);
          const payload = {
            id: user.id,
            email: user.email
          }

          const access_token = generateToken(payload)
          return res.status(200).json({access_token})
        } else {
          next({ name: 'unauthorized' })
        }
        // return res.status(200).json(user)
      })
      .catch(err => {
        // console.log(err.message);
        next(err)
      })
    }

    static getNews(req,res,next){
      const options = {
              method: 'GET',
              url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/list',
              params: {category: 'generalnews', region: 'US'},
              headers: {
              'x-rapidapi-key': 'dfbdd7fbd9mshe00a75467674f9bp1c5c61jsn4b416ce1a4fb',
              'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
              }
          };

      axios.request(options).then(response=>{
      console.log(response.data.items.result)
        res.status(200).json(response.data.items.result)
      }).catch(err=>{
        res.status(500).json(err)
      });
    }

    static getRates(req,res,next){
      const options = 'https://api.exchangeratesapi.io/latest?base=EUR'

        axios.request(options)
        .then(data=>{
            console.log(data.data);
            res.status(200).json(data.data)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err)
        })
    } 
  }
  

module.exports = userController