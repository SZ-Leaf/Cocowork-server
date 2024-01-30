const { Cowork} = require('../db/sequelizeSetup')

const findAllCoworks = (req, res) => {
    Cowork.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findCoworkByPk = (req, res) => {
    Cowork.findByPk(parseInt(req.params.id))
        .then((result) => {
            console.log(result)
            if (result) {
                res.json({ message: 'Coworking has been found..', data: result })
            } else {
                res.status(404).json({ message: `No Coworking found.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error encountered.', data: error.message })
        })
}

module.exports= {findAllCoworks, findCoworkByPk}