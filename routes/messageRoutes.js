const express = require('express')
const router = express.Router()
const { findAllMessages, createMessage, findMessageByPk, updateMessage, deleteMessage } = require('../controllers/messageControllers')

router 
    .route('/')
    .get(findAllMessages)
    .post(createMessage)

router
    .route('/:id')
    .get(findMessageByPk)
    .put(updateMessage)
    .delete(deleteMessage)

module.exports = router