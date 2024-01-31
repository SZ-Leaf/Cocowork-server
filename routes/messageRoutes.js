const express = require('express')
const router = express.Router()
const { findAllMessages, createMessage, findMessageByPk, updateMessage, deleteMessage } = require('../controllers/messageControllers')
const { protect, restrictToOwnUser } = require('../controllers/authControllers')
const { Message } = require('../db/sequelizeSetup')

router 
    .route('/')
    .get(findAllMessages)
    .post(protect, createMessage)

router
    .route('/:id')
    .get(findMessageByPk)
    .put(protect, restrictToOwnUser(Message), updateMessage)
    .delete(protect, restrictToOwnUser(Message), deleteMessage)

module.exports = router