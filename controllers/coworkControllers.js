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
                res.json({ message: 'Un coworking a été trouvé.', data: result })
            } else {
                res.status(404).json({ message: `Aucun coworking n'a été trouvé.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Une erreur est survenue.', data: error.message })
        })
}

module.exports= {findAllCoworks, findCoworkByPk}