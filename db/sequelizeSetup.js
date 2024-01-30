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