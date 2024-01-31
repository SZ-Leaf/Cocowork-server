const { MeetingRoom, User } = require('../db/sequelizeSetup')

const findAllMeetingRooms = (req, res) => {
    MeetingRoom.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findMeetingRoomByPk = (req, res) => {
    MeetingRoom.findByPk(parseInt(req.params.id))
        .then((result) => {
            // console.log(result)
            if (result) {
                res.json({ message: 'Meeting room has been found.', data: result })
            } else {
                res.status(404).json({ message: `No Meeting room found.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error encountered.', data: error.message })
        })
}

const createMeetingRoomWithImg = (req, res) => {
    const newMeetingRoom = { ...req.body, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }
    MeetingRoom.create(newMeetingRoom)
    .then((meetingRoom) => {
        res.status(201).json({ message: 'Meeting Room Created', data: meetingRoom })
     })
     .catch((error) => {
        res.status(500).json({ message: `Could not create Meeting Room`, data: error.message })
     })
} 

const updateMeetingRoomWithImg = (req, res) => {
    MeetingRoom.findByPk(req.params.id)
        .then ((result) =>{
            if (result){
                console.log(result)
                return result.update({ ...req.body, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` })
                .then (() => {
                    res.status(201).json({ message: 'Meeting room has been updated.', data: result })
                }) 
        } else {
            res.status(404).json({ message: `No Meeting room can't be update.`, data: error.message })
        } 
    })
    .catch(error => {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message })
        }
        res.status(500).json({ message: 'Error encountered.', data: error.message })
    })
}

const deleteMeetingRoom = (req, res) => {
    MeetingRoom.findByPk(req.params.id)
        .then ((result)=>{
            if (result) {
                return result.destroy()
                    .then((result) => {
                        res.json({ message: `Meeting room has been delete.`, data: result})
                    })
                    
            } else {
                res.status(404).json({ message: `No Meeting room has been found`})
            }

        })
        .catch((error) => {
            res.status(500).json({ message: `Error encountered.`, data: error.message })

        })
    
}


module.exports= {findAllMeetingRooms, findMeetingRoomByPk, createMeetingRoomWithImg, updateMeetingRoomWithImg, deleteMeetingRoom}