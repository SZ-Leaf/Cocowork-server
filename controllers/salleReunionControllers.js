const { SalleReunion, sequelize} = require('../db/sequelizeSetup')

const findAllSalleReunions = (req, res) => {
    SalleReunion.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findSalleReunionByPk = (req, res) => {
    SalleReunion.findByPk(parseInt(req.params.id))
        .then((result) => {
            console.log(result)
            if (result) {
                res.json({ message: 'Salle de Reunion has been found.', data: result })
            } else {
                res.status(404).json({ message: `No Salle de reunion found.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error encountered.', data: error.message })
        })
}

const createSalleReunionWithImg = (req, res) => {
    User.findOne({ where: { username: req.username } })
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: `User has not been found.` })
        }
        const newSalleReunion = { ...req.body, UserId: user.id, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }

        SalleReunion.create(newSalleReunion)
            .then((result) => {
                res.status(201).json({ message: 'Salle de reunion has been created', data: result })
            })
            .catch((error) => {
                if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message })
                }
                res.status(500).json({ message: `Salle de reunion can't be create`, data: error.message })
            })
    })
    .catch(error => {
        res.status(500).json(error.message)
    })
} 

const updateSalleReunionWithImg = (req, res) => {
    SalleReunion.findByPk(req.params.id)
        .then ((result) =>{
            if (result){
                console.log(result)
                return result.update({...req.body, imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
                .then (() => {
                    res.status(201).json({ message: 'SalleReunion has been updated.', data: result })
                }) 
        } else {
            res.status(404).json({ message: `No salle de reunion can't be update.`, data: error.message })
        } 
    })
    .catch(error => {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message })
        }
        res.status(500).json({ message: 'Error encountered.', data: error.message })
    })
}





module.exports= {findAllSalleReunions, findSalleReunionByPk, createSalleReunionWithImg, updateSalleReunionWithImg  }