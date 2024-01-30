const express = require('express')
const { findAllSalleReunions, createSalleReunionWithImg, findSalleReunionByPk, updateSalleReunionWithImg, deleteSalleReunion } = require('../controllers/salleReunionControllers')
const router = express.Router()


router 
    .route('/')
    .get(findAllSalleReunions)
    .post(createSalleReunionWithImg)  //admin

router
    .route('/:id')
    .get(findSalleReunionByPk)
    .put(updateSalleReunionWithImg)      //admin
    .delete(deleteSalleReunion)   //admin

module.exports = router