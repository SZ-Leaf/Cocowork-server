const express = require('express')
const router = express.Router()
const multer = require('../middleware/multer-config')
const { findAllMeetingRooms, createMeetingRoomWithImg, findMeetingRoomByPk, updateMeetingRoomWithImg, deleteMeetingRoom } = require('../controllers/meetingRoomControllers')
const { protect } = require('../controllers/authControllers')


router 
    .route('/')
    .get(findAllMeetingRooms)
    .post(protect, multer, createMeetingRoomWithImg)  //admin

router
    .route('/:id')
    .get(findMeetingRoomByPk)
    .put(protect, multer, updateMeetingRoomWithImg)      //admin
    .delete(deleteMeetingRoom)   //admin

module.exports = router