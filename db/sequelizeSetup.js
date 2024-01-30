const RoleModel = require('../modelTables/roleModel')
const UserModel = require('../modelTables/userModel')
const CoworkModel = require('../modelTables/coworksModel')
const ClosedSpaceModel = require('../modelTables/closedSpacesModel')
const SalleReunionModel = require('../modelTables/salleReunionModel')
const ReservationModel = require('../modelTables/reservationsModel')
const MessageModel = require('../modelTables/messagesModel')
const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize ('cocowork', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,
});

const Role = RoleModel (sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Cowork = CoworkModel (sequelize, DataTypes)
const ClosedSpace = ClosedSpaceModel (sequelize, DataTypes)
const SalleReunion = SalleReunionModel (sequelize, DataTypes)
const Reservation = ReservationModel (sequelize, DataTypes)
const Message = MessageModel (sequelize, DataTypes)

Role.hasMany(User)
User.belongsTo(Role)



sequelize.sync({ force: true })
    .then (async()=> {
        
    })
       
    .catch(error => {
        console.log (error)
    })

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = { User, Role, Cowork, ClosedSpace, SalleReunion, Reservation, Message, sequelize }
