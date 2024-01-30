const RoleModel = require('../modelTables/roleModel')
const UserModel = require('../modelTables/userModel')
const CoworkModel = require('../modelTables/coworksModel')
const ClosedSpaceModel = require('../modelTables/closedSpacesModel')
const SalleReunionModel = require('../modelTables/salleReunionModel')
const ReservationModel = require('../modelTables/reservationsModel')
const MessageModel = require('../modelTables/messagesModel')
const {Sequelize, DataTypes} = require('sequelize')

const { setRoles, setUsers, setCoworkings, setClosedSpaces, setSallesReunion } = require('./setDataSamples')

const sequelize = new Sequelize('cocowork', 'root', '', {
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



sequelize.sync({force: true})
    .then(async() => {
        await setRoles(Role)
        await setUsers(User)
        await setCoworkings(Cowork)
        await setClosedSpaces(ClosedSpace)
        await setSallesReunion(SalleReunion)
        // console.log('Database and tables synced successfully.');
    })
    .catch((error) => {
        console.error('Error syncing database and tables:', error);
    });


sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))


module.exports = { User, Role, Cowork, ClosedSpace, SalleReunion, Reservation, Message, sequelize }
