const express = require('express')
const router = express.Router()
// const {findAllUsers, createUser, login, findUserByPk, updateUser, deleteUser} = 

const {login, restrict, protect, restrictToOwnUser} = require('../controllers/authControllers')
const {findAllUsers, findUserbyPk, createUser, deleteUser, updateUser, validateUser, findAllValidUsers} = require('../controllers/userControllers')
const { User } = require('../db/sequelizeSetup')

router 
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router 
    .route('/valid')
    .get(findAllValidUsers)

router
    .route('/login')
    .post (login)

router
    .route('/:id')
    .get(findUserbyPk)
    .put(protect, restrictToOwnUser(User) , updateUser)
    .delete(protect, restrictToOwnUser(User), deleteUser)

router
    .route('/:id/validate')
    .put(protect, restrict('admin'), validateUser)

module.exports = router