const express = require('express')
const router = express.Router()
const { findAllMessages, createMessage, findMessageByPk, updateMessage, deleteMessage } = require('../controllers/messageControllers')
const { protect } = require('../controllers/authControllers')

router 
    .route('/')
    .get(findAllMessages)
    .post(protect, createMessage)

router
    .route('/:id')
    .get(findMessageByPk)
    .put(protect, updateMessage)
    .delete(protect, deleteMessage)

module.exports = router