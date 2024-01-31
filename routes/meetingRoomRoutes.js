const express = require('express')
const router = express.Router()
const multer = require('../middleware/multer-config')
const { findAllMeetingRooms, createMeetingRoomWithImg, findMeetingRoomByPk, updateMeetingRoomWithImg, deleteMeetingRoom } = require('../controllers/meetingRoomControllers')


router 
    .route('/')
    .get(findAllMeetingRooms)
    .post(multer, createMeetingRoomWithImg)  //admin

router
    .route('/:id')
    .get(findMeetingRoomByPk)
    .put(multer, updateMeetingRoomWithImg)      //admin
    .delete(deleteMeetingRoom)   //admin

module.exports = router