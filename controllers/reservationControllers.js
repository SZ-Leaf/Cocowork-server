const { Reservation, User, MeetingRoom } = require('../db/sequelizeSetup')

const findAllReservations = (req, res) => {
    Reservation.findAll({ 
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
    User.findOne({ where: { username: req.username} })
        .then(user => {
            if(!user){
                return res.status(404).json({message:`User has not been found.`})
            }
            const newReservation = { ...req.body, UserId:user.id }

            Reservation.create(newReservation)
                .then((reservation) => {
                    res.status(201).json({ message: 'Reservation has been created.', data: message })
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
                return result.destroy()
                    .then((result) => {
                        res.json({ message: `Reservation has been delete`, data: result})
                    })          
            } else {
                res.status(404).json({ message: `No message found`})
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error encountered', data: error.message })

        })
    
}

module.exports = {findAllReservations, findReservationByPk, createReservation, updateReservation, deleteReservation}