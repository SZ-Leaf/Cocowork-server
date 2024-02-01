const express = require('express')
const router = express.Router()
const multer = require('../middleware/multer-config')
const { findAllMeetingRooms, createMeetingRoomWithImg, findMeetingRoomByPk, updateMeetingRoomWithImg, deleteMeetingRoom } = require('../controllers/meetingRoomControllers')
const { protect, restrict } = require('../controllers/authControllers')


router 
    .route('/')
    .get(findAllMeetingRooms)
    .post(protect, restrict('admin'), multer, createMeetingRoomWithImg)  //admin

router
    .route('/:id')
    .get(findMeetingRoomByPk)
    .put(protect, restrict('admin'), multer, updateMeetingRoomWithImg)      //admin
    .delete(protect, restrict('admin'), deleteMeetingRoom)   //admin

module.exports = router