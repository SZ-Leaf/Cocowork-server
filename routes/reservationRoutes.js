const express = require('express')
const router = express.Router()
const { findAllReservations, createReservation, findReservationByPk, updateReservation, deleteReservation, validateReservation, findAllValidReservations } = require('../controllers/reservationControllers')
const { protect, restrictToOwnUser, restrict } = require('../controllers/authControllers')


router 
    .route('/')
    .get(findAllReservations)
    .post(protect, createReservation)

router
    .route('/valid')
    .get(findAllValidReservations)

router
    .route('/:id')
    .get(findReservationByPk)
    .put(protect, restrict('admin') , validateReservation)
    .delete(protect, restrict('admin'), deleteReservation)

module.exports = router