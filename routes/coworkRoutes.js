const express = require('express')
const router = express.Router()
const { findAllCoworks, findCoworkByPk } = require('../controllers/coworkControllers')

router 
    .route('/')
    .get(findAllCoworks)

router
    .route('/:id')
    .get(findCoworkByPk)

module.exports = router