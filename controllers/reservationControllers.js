const { UniqueConstraintError, ValidationError } = require('sequelize');
const { Reservation, User, MeetingRoom } = require('../db/sequelizeSetup');
const sendEmail = require('../middleware/nodeMailerConfig');

const findAllReservations = (req, res) => {
    Reservation.findAll({ 
        where: { status: false },
        include: [User, MeetingRoom]
     })
       .then((result) => {
          res.json(result);
       }).catch((err) => {
          res.status(500).json(err.reservation)
       });
}

const findAllValidReservations = (req, res) => {
    Reservation.findAll({ 
        where: { status: true },
        include: [User, MeetingRoom]
     })
       .then((result) => {
          res.json(result);
       }).catch((err) => {
          res.status(500).json(err.reservation)
       });
}

const findReservationByPk = (req, res) => {
    Reservation.findByPk(parseInt(req.params.id))
        .then((result) => {
            console.log(result)
            if (result) {
                res.json({ message: 'Reservation has been found', data: result })
            } else {
                res.status(404).json({ message: `No reservation found.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error encountered', data: error.message })
        })
}

const createReservation = (req, res) => {
    User.findOne({ where: { id: req.userId} })
        .then(user => {
            if(!user){
                return res.status(404).json({message:`User has not been found.`})
            }
            console.log(req.role);
            const newReservation = { ...req.body, UserId: req.userId }

            Reservation.create(newReservation)
                .then((reservation) => {
                    res.status(201).json({ message: 'Reservation has been created.', data: reservation })

                    const recipientEmail = 'cocoworka@gmail.com';
                    const emailSubject = 'New Reservation Request';
                    const emailText = `A new reservation has been requested.`;

                    sendEmail(recipientEmail, emailSubject, emailText)
                            .then(info => console.log('Email sent:', info))
                            .catch(error => console.error('Error sending email:', error));
                })
                .catch((error) => {
                if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message })
                }
                res.status(500).json({ message: `Reservation can't be created.`, data: error.message })
            })
        })
}

const updateReservation = (req, res) => {
    Reservation.findByPk(req.params.id)
        .then ((result) =>{
            if (result){
                return result.update(req.body)
                .then (() => {
                    res.status(201).json({ message: 'Reservation has been updated', data: result })
                }) 
        } else {
            res.status(404).json({ message: `No reservation found`, data: error.message })
        } 
    })
    .catch(error => {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message })
        }
        res.status(500).json({ message: 'Error encountered', data: error.message })
    })
}

const deleteReservation = (req, res) => {
    Reservation.findByPk(req.params.id)
        .then ((result)=>{
            if (result) {
                result.destroy()
                    .then(() => {
                        User.findOne({ where: { id: result.UserId } })
                            .then((user) => {

                                if(user) {

                                    const { name, email } = user;
                                    res.json({ message: 'Reservation deleted successfully.' });

                                    const recipientEmail = email;
                                    const emailSubject = 'CoCowork Reservation Denial';
                                    const emailText = `Your reservation has been denied.`

                                    sendEmail(recipientEmail, emailSubject, emailText)
                                        .then(info => console.log('Email sent:', info))
                                        .catch(error => console.error('Error sending email:', error));
                                }
                            })
                    })          
            } else {
                res.status(404).json({ message: `No message found`})
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error encountered', data: error.message })

        })
    
}

const validateReservation = (req, res) => {
    Reservation.findByPk(req.params.id)
        .then((result) => {
            if(result){
                result.update({status: true})
                    .then(() => {
                        User.findOne({ where: { id: result.UserId } })
                            .then(user => {
                                if (user) {
                                    // Extract user details and include them in the response
                                    const { name, email } = user;
                                    res.json({ message: 'Reservation status updated successfully.' });

                                    const recipientEmail = email;
                                    const emailSubject = 'CoCowork Reservation Approval';
                                    const emailText = `Your reservation has been approved.`

                                    sendEmail(recipientEmail, emailSubject, emailText)
                                        .then(info => console.log('Email sent:', info))
                                        .catch(error => console.error('Error sending email:', error));
                                } else {
                                    res.status(404).json({ message: `User not found.` });
                                }
                            })
                            .catch(error => {
                                res.status(500).json({ message: 'Error finding user.', data: error.message });
                            });
                    })
                    .catch((error) => {
                    res.status(500).json({ message: 'Error updating resrvation status.', data: error.message });
                    });
            } else {
                res.status(404).json({ message: `Reservation not found.` })
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error.', data: error.message })
        })
}

module.exports = {findAllReservations, findReservationByPk, createReservation, updateReservation, deleteReservation, validateReservation, findAllValidReservations}