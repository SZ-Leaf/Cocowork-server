const { User, Role } = require('../db/sequelizeSetup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../secret/secretkey')

const rolesHierarchy = {
   edit: ["edit"],
   admin: ["admin", "edit"],
}

const login = (req, res) => {
   User.scope('withPassword').findOne({ where: { email: req.body.email } })
      .then((result) => {
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
                     id: result.id,
                     email: result.email
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

const protect = (req, res, next) => {
   if (!req.headers.authorization) {
      return res.status(401).json({ message: `You are not logged in.` })
  }

  const token = req.headers.authorization.split(' ')[1]

   if(token){
      try {
         const decoded = jwt.verify(token, SECRET_KEY);
         req.username = decoded.data;
         req.userId = decoded.id;
         next()
      } catch (error) {
         return res.status(403).json({ message: `Invalid token.` })
      }
   }
}




module.exports = { login, protect }