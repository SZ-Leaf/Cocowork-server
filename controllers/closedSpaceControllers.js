const { ClosedSpace} = require('../db/sequelizeSetup')

const findAllClosedSpaces = (req, res) => {
    ClosedSpace.findAll()
        .then((results) => {
            res.json(results)
        })
        .catch(error => {
            res.status(500).json(error.message)
        })
}

const findClosedSpaceByPk = (req, res) => {
    ClosedSpace.findByPk(parseInt(req.params.id))
        .then((result) => {
            console.log(result)
            if (result) {
                res.json({ message: 'Closed space has been found..', data: result })
            } else {
                res.status(404).json({ message: `No Closed space found.` })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error encountered.', data: error.message })
        })
}

module.exports= {findAllClosedSpaces, findClosedSpaceByPk}