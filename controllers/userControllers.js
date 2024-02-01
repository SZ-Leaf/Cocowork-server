const { User, Role } = require('../db/sequelizeSetup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../secret/secretkey')
const {UniqueConstraintError, ValidationError } = require('sequelize')
const sendEmail = require('../middleware/nodeMailerConfig')

const findAllUsers = (req, res) => {
   User.findAll( {where: {status: false,},})
      .then((result) => {
         res.json(result);
      }).catch((err) => {
         res.status(500).json(err.message)
      });
}

const findAllValidUsers = (req, res) => {
   User.findAll( {where: {status: true,},})
      .then((result) => {
         res.json(result);
      }).catch((err) => {
         res.status(500).json(err.message)
      });
}

const findUserbyPk = (req, res) =>{
   User.findByPk((parseInt(req.params.id)))
      .then((result) => {
         if (result) {
            res.json({Message: 'User has been found.', data: result})
         }
         else{
            res.status(400).json({message: 'No user found.'})
         }
      }).catch((error) => {
         res.status(500).json({message: 'Error encountered', data: error.message})
      });
}

const createUser = (req, res)=>{
    bcrypt.hash(req.body.password,10)
      .then((hash)=> {
         User.create({...req.body, password:hash, RoleId: "2" })
               .then ((user)=> {
                  user.password = ""
                  res.status(201).json ({message:`User has been created.`, data: user})

                  const recipientEmail = 'cocoworka@gmail.com';
                  const emailSubject = 'New User Created';
                  const emailText = `A new user has been created.\n\nUser Details:\nName: ${user.name}
                  \n Lasname: ${user.lastname}
                  \n Email: ${user.email}
                  \n Address: ${user.address}
                  \n PostCode: ${user.postcode}
                  \n Town: ${user.town}`;

                  sendEmail(recipientEmail, emailSubject, emailText)
                        .then(info => console.log('Email sent:', info))
                        .catch(error => console.error('Error sending email:', error));
               })
               .catch((error) => {
                  if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                     return res.status(400).json({ message: error.message })
                  }
                  res.status(500).json({ message: `Error encountered.`, data: error.message })
               })
      })
      .catch(error => {
         console.log(error.message)
      })
}

const deleteUser= (req,res)=>{
    User.findByPk(req.params.id)
        .then((result)=>{
            if(result){
                return result.destroy()
                    .then((result) => {
                        res.json({ message: `User has been delete.`, data: result})
                })
        } else {
            res.status(404).json({ message: `No user found.`})
        }
    })
    .catch(error => {
        res.status(500).json({ message: `Error encountered`, data: error.message })
    })   
}

const updateUser = (req, res) => {
   User.findByPk(req.params.id)
      .then((result) => {
         if (result) {
            if (req.body.password) {
               // Hashing password given before saving it
               return bcrypt.hash(req.body.password, 10)
                  .then((hash) => {
                     req.body.password = hash;
                     return result.update(req.body)
                        .then(() => {
                           res.status(201).json({ message: `User updated.`, data: result });
                        });
                  });
            } else {
               // If password is not given in the request body, keep the current value
               req.body.password = result.password;
               return result.update(req.body)
                  .then(() => {
                     res.status(201).json({ message: `User updated.`, data: result });
                  });
            }
         } else {
               res.status(404).json({ message: `User not found.` })
         }
      })
      .catch(error => {
         if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
               return res.status(400).json({ message: error.message })
         }
         res.status(500).json({ message: 'Error.', data: error.message })
      })
}

const validateUser = (req, res) => {
   User.findByPk(req.params.id)
      .then((result) => {
         if (result) {
            // Update the user's status to true
            result.update({ status: true })
               .then(() => {
                  res.json({ message: 'User status updated successfully.' });
               })
               .catch((error) => {
                  res.status(500).json({ message: 'Error updating user status.', data: error.message });
               });
         } else {
               res.status(404).json({ message: `User not found.` })
         }
      })
      .catch(error => {
         res.status(500).json({ message: 'Error.', data: error.message })
      })
}
                
module.exports = {findUserbyPk, findAllUsers, findAllValidUsers, createUser, deleteUser, updateUser, validateUser}