const express = require('express')
const router = express.Router()
const { findAllReservations, createReservation, findReservationByPk, updateReservation, deleteReservation } = require('../controllers/reservationControllers')



router 
    .route('/')
    .get(findAllReservations)
    .post(createReservation)

router
    .route('/:id')
    .get(findReservationByPk)
    .put(updateReservation)
    .delete(deleteReservation)

module.exports = router