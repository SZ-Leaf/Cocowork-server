module.exports = (sequelize, DataTypes) => {

    // creating a new closed space model table through sequelize.define to be used in sequelize setup when starting our server
    return sequelize.define('ClosedSpace', {
 
            // defining Closed Space model attributes
            name: {
                type: DataTypes.STRING,
                // cannot be null
                allowNull: false,
                unique: {
                    msg: "Name already taken."
                },
            },
        }
    )
}