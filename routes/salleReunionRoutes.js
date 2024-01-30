const express = require('express')
const router = express.Router()
// const {findAllSalleReunions, createSalleReunion, findSalleReunionByPk, updateSalleReunion, deleteSalleReunion} = 

router 
    .route('/')
    .get(findAllSalleReunions)
    .post(createSalleReunion)  //admin

router
    .route('/:id')
    .get(findSalleReunionByPk)
    .put(updateSalleReunion)      //admin
    .delete(deleteSalleReunion)   //admin

module.exports = router