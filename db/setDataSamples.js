const mockUsers = require('../mockTables/userMock')
const mockCowork = require('../mockTables/coworkMock')
const bcrypt = require('bcrypt')

const setCoworkings = (Coworking) => {
    return Promise.all(mockCowork.map((element) => {
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
// Définition de la fonction setRoles prenant en paramètre le modèle Role
const setRoles = (Role) => {
    // Utilisation de Promise.all pour exécuter plusieurs opérations asynchrones en parallèle
    // Création d'un rôle avec le label "admin" et retourne la promesse résultante
    // Création d'un rôle avec le label "member" et retourne la promesse résultante
    Promise.all ([Role.create({ label: "admin" }),Role.create({ label: "member" })])
}


module.exports = {setCoworkings, setUsers, setRoles}

