const mockUsers = require('../mockTables/userMock')
const mockCoworks = require('../mockTables/coworkMock')
const mockClosedSpaces = require('../mockTables/closedSpacesMock')
const mockSallesReunion = require('../mockTables/salleReunionMock')

const bcrypt = require('bcrypt')

const setCoworkings = (Coworking) => {
   return Promise.all(mockCoworks.map((element) => {
      const newCoworking = { ...element, id: null }
      return Coworking.create(newCoworking)
         .then(() => { })
         .catch((error) => {
               console.log(error.message)
         })
   }))
}

const setUsers = (User) => {
   return Promise.all(mockUsers.map(user => {
      return bcrypt.hash(user.password, 10)
         .then(hashResult => {
               return User.create({ ...user, password: hashResult })
                  .then(() => { })
                  .catch((error) => {
                     console.log(error.message)
                  })
         })
   }))
}

const setClosedSpaces = (ClosedSpace) => {
   return Promise.all(mockClosedSpaces.map(element => {
      const newClosedSpace = {...element}
      return ClosedSpace.create(newClosedSpace)
            .then(() => { })
            .catch((error) => {
               console.log(error.message)
            })
   }))
}

const setSallesReunion = (SalleReunion) => {
   return Promise.all(mockSallesReunion.map(element => {
      const newSalleReunion = {...element}
      return SalleReunion.create(newSalleReunion)
         .then(() => {}).catch((error) => {
            console.log(error.message)
         });
   }))
}

// Définition de la fonction setRoles prenant en paramètre le modèle Role
const setRoles = async (Role) => {
   // Check if roles already exist
   const adminRole = await Role.findOne({ where: { label: 'admin' } });
   const nonAdminRole = await Role.findOne({ where: { label: 'nonadmin' } });

   // Create roles if they don't exist
   if (!adminRole) {
       await Role.create({ label: 'admin' });
   }

   if (!nonAdminRole) {
       await Role.create({ label: 'nonadmin' });
   }
};


module.exports = {setCoworkings, setUsers, setRoles, setClosedSpaces, setSallesReunion}