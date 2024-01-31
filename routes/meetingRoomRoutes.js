const express = require('express')
const router = express.Router()
const { findAllMeetingRooms, createMeetingRoomWithImg, findMeetingRoomByPk, updateMeetingRoomWithImg, deleteMeetingRoom } = require('../controllers/meetingRoomControllers')


router 
    .route('/')
    .get(findAllMeetingRooms)
    .post(createMeetingRoomWithImg)  //admin

router
    .route('/:id')
    .get(findMeetingRoomByPk)
    .put(updateMeetingRoomWithImg)      //admin
    .delete(deleteMeetingRoom)   //admin

module.exports = router