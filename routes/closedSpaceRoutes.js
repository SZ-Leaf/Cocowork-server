const express = require('express')
const { findAllClosedSpaces, findClosedSpaceByPk } = require('../controllers/closedSpaceControllers')
const router = express.Router()


router 
    .route('/')
    .get(findAllClosedSpaces)

router
    .route('/:id')
    .get(findClosedSpaceByPk)

module.exports = router