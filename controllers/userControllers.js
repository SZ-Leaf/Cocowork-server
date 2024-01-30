const { User, Role } = require('../db/sequelizeSetup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../secret/secretkey')
const {UniqueConstraintError, ValidationError } = require('sequelize')

const findAllUsers = (req, res) => {
   User.findAll()
      .then((result) => {
         res.json(result);
      }).catch((err) => {
         res.status(500).json(err.message)
      });
}

const findUserbyPk = (req, res) =>{
   User.findByPk((parseInt(req.params.id)))
      .then((result) => {
         if (result) {
            res.json({Message: 'User has been found.', data: result})
         }
         else{
            res.status(400).json({message: 'No user found.'})
         }
      }).catch((error) => {
         res.status(500).json({message: 'Error encountered', data: error.message})
      });
}

module.exports = {findUserbyPk, findAllUsers}