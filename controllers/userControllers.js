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

const createUser = (req, res)=>{
    bcrypt.hash(req.body.password,10)
        .then((hash)=> {
            User.create({...req.body, password:hash, RoleId: "2" })
                .then ((user)=> {
                    user.password = ""
                    res.status(201).json ({message:`User has been created.`, data: user})
                })
                .catch((error) => {
                    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message })
                    }
                    res.status(500).json({ message: `Error encountered.`, data: error.message })
                })
        })
        .catch(error => {
            console.log(error.message)
        })
}

const deleteUser= (req,res)=>{
    User.findByPk(req.params.id)
        .then((result)=>{
            if(result){
                return result.destroy()
                    .then((result) => {
                        res.json({ message: `User has been delete.`, data: result})
                })
        } else {
            res.status(404).json({ message: `No user found.`})
        }
    })
    .catch(error => {
        res.status(500).json({ message: `Error encountered`, data: error.message })
    })   
}

                
module.exports = {findUserbyPk, findAllUsers, createUser, deleteUser}