const express = require('express')
const router = express.Router()
// const {findAllUsers, createUser, login, findUserByPk, updateUser, deleteUser} = 

const {login} = require('../controllers/authControllers')
const {findAllUsers, findUserbyPk, createUser, deleteUser, updateUser} = require('../controllers/userControllers')

router 
    .route('/')
    .get(findAllUsers)
    .post(createUser)

router
    .route('/login')
    .post (login)

router
    .route('/:id')
    .get(findUserbyPk)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router