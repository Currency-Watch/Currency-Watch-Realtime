'use strict';
const {
  Model
} = require('sequelize');
const { hashpassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "You have entered an invalid email address"
        },
        notEmpty: {
          args: true,
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is required"
        },
        len: {
          args: [6],
          msg: "Password at least 6 characters"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'user',
  });

  user.beforeCreate((user, options) => {
    user.password = hashpassword(user.password)
  })

  return user;
};