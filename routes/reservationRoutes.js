const express = require('express')
const router = express.Router()
const { findAllReservations, createReservation, findReservationByPk, updateReservation, deleteReservation } = require('../controllers/reservationControllers')
const { protect, restrictToOwnUser } = require('../controllers/authControllers')


router 
    .route('/')
    .get(findAllReservations)
    .post(protect, createReservation)

router
    .route('/:id')
    .get(findReservationByPk)
    .put(updateReservation)
    .delete(deleteReservation)

module.exports = router