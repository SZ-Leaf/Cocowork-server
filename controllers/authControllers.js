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
                     email: result.email,
                     role : result.RoleId,
                     name : result.name
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
         req.userId = decoded.id;
         req.email = decoded.email;
         req.role = decoded.role
         next()
      } catch (error) {
         return res.status(403).json({ message: `Invalid token.` })
      }
   }
}

const restrictToOwnUser = (model) => {
   return (req, res, next) => {
      User.findByPk(req.userId)
         .then(user => {
            if (!user) {
               return res.status(404).json({ message: `Pas d'utilisateur trouvé.` });
            }

            Role.findByPk(user.RoleId)
               .then(role => {
                  if (!role) {
                     return res.status(500).json({ message: `Role not found for the user.` });
                  }

                  const roleLabel = role.label;
                  if (rolesHierarchy[roleLabel] && rolesHierarchy[roleLabel].includes('admin')) {
                     return next();
                  }

                  model.findByPk(req.params.id)
                     .then(resource => {
                           if (!resource) {
                              return res.status(404).json({ message: `La ressource n'existe pas.` });
                           }
                           console.log(user.id);
                           console.log(resource);
                           if (user.id === resource.id) {
                              return next();
                           } else {
                              return res.status(403).json({ message: `Vous n'êtes pas l'auteur de la ressource.` });
                           }
                     })
                     .catch(error => {
                           return res.status(500).json({ message: `Error finding resource: ${error.message}` });
                     });
               })
               .catch(error => {
                  return res.status(500).json({ message: `Error finding user role: ${error.message}` });
               });
         })
         .catch(error => {
            return res.status(500).json({ message: `Error finding user: ${error.message}` });
         });
   };
};

const restrict = (roleParam) => {
   return (req, res, next) => {
      const token = req.headers.authorization.split(' ')[1];

      try {
         const decoded = jwt.verify(token, SECRET_KEY);
         // const { id, role } = decoded;

         User.findOne({
            where: {
               id: req.userId
            }
         })
            .then(user => {
               Role.findByPk(user.RoleId)
                  .then(userRole  => {
                     // console.log('userRole:', userRole);
                     
                     // console.log('role.label:', userRole.label);
                     // console.log('roleParam:', roleParam);
                     // console.log('rolesHierarchy:', rolesHierarchy);
                     
                     const userRoles = rolesHierarchy[userRole.label];

                     if (!userRoles) {
                        console.log('User roles not defined in rolesHierarchy.');
                        return res.status(403).json({ message: `Insufficient rights.` });
                     }

                     if (userRoles.includes(roleParam)) {
                        next();
                     } else {
                        console.log('RoleParam not found in userRoles.');
                        res.status(403).json({ message: `Insufficient rights.` });
                     }
                  })
                  .catch(error => {
                     console.log(error.message)
                  })
            })
            .catch(error => {
               console.log(error)
            })
      }
      catch (error) {
         console.error(error.message);
         res.status(403).json({ message: "Invalid token." });
      }
   }
}


module.exports = { login, protect, restrictToOwnUser, restrict }