const express = require('express')
const router = express.Router()
// const {findAllUsers, createUser, login, findUserByPk, updateUser, deleteUser} = 

const {login, restrict, protect} = require('../controllers/authControllers')
const {findAllUsers, findUserbyPk, createUser, deleteUser, updateUser, validateUser, findAllValidUsers} = require('../controllers/userControllers')

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
    .put(updateUser)
    .delete(deleteUser)
    // .put(protect, restrict('admin') , validateUser)

router
    .route('/:id/validate')
    .put(protect, restrict('admin'), validateUser)

module.exports = router