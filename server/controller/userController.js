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
        console.log(user)
        if (!user) {
          next({ name: 'unauthorized' })
        }

        const match = comparePassword(loginObj.password, user.password)
        if (match) {
          console.log(match);
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
        console.log(err);
        next(err)
      })
  }
  }
  

module.exports = userController