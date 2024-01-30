const { User, Role } = require('../db/sequelizeSetup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../secret/secretkey')

const rolesHierarchy = {
   edit: ["edit"],
   admin: ["admin", "edit"],
}

const login = (req, res) => {
   // A. On vérifie que l'utilisateur qui tente de se connecter existe bel et bien dans notre BDD
   User.scope('withPassword').findOne({ where: { email: req.body.email } })
      .then((result) => {
         // console.log("test");
         // B. Si l'utilisateur n'existe pas, on renvoie une réponse erreur Client
         if (!result) {
            console.log("erreureee");
            return res.status(404).json({ message: `User does not exist.` })
         }

         return bcrypt.compare(req.body.password, result.password)
            .then((isValid) => {
                  if (!isValid) {
                     return res.status(401).json({ message: `Password incorrect.` })
                  }
                  const token = jwt.sign({
                     data: result.username
                  }, SECRET_KEY, { expiresIn: '10h' });

                  // Possibilité de stocker le jwt dans un cookie côté client
                  // res.cookie('coworkingapi_jwt', token)
                  res.json({ message: `Login successful`, data: token })
            })
      })
      .catch((error) => {
         res.status(500).json({ data: error.message })
      })
}


module.exports = { login }