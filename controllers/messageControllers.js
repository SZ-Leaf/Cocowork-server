const { token } = require('morgan');
const { Message, User } = require('../db/sequelizeSetup')
const {UniqueConstraintError, ValidationError} = require ('sequelize')

const findAllMessages = (req, res) => {
    Message.findAll({ include: User })
       .then((result) => {
          console.log(result);
          res.json(result);
       }).catch((err) => {
          res.status(500).json(err.message)
       });
 }

const findMessageByPk = (req, res) => {
    Message.findByPk(parseInt(req.params.id))
        .then((result) => {
            console.log(result)
            if (result) {
                res.json({ message: 'Message has been found', data: result })
            } else {
                res.status(404).json({ message: `No message found.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error encountered', data: error.message })
        })
}

const createMessage = (req, res) => {
    const newMessage = { ...req.body, UserId: req.userId }
    console.log(req.userId );
    Message.create(newMessage)
        .then(message => {
            res.status(201).json({ message: 'Message Created', data: message });
        })
        .catch((error) =>{
            res.status(500).json({ message: `Could not create message`, data: error.message });
        })
}

const updateMessage = (req, res) => {
    Message.findByPk(req.params.id)
        .then ((result) =>{
            if (result){
                return result.update(req.body)
                .then (() => {
                    res.status(201).json({ message: 'Message has been updated', data: result })
                }) 
        } else {
            res.status(404).json({ message: `No message found`, data: error.message })
        } 
    })
    .catch(error => {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message })
        }
        res.status(500).json({ message: 'Error encountered', data: error.message })
    })
}

const deleteMessage = (req, res) => {
    Message.findByPk(req.params.id)
        .then ((result)=>{
            if (result) {
                return result.destroy()
                    .then((result) => {
                        res.json({ message: `Message has been delete`, data: result})
                    })          
            } else {
                res.status(404).json({ message: `No message found`})
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error encountered', data: error.message })

        })
}

module.exports = {findAllMessages, findMessageByPk, createMessage, updateMessage, deleteMessage}