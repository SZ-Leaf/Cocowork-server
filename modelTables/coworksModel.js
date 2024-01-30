module.exports = (sequelize, DataTypes) => {

    // creating a new cowork model table through sequelize.define to be used in sequelize setup when starting our server
    return sequelize.define('Coworks', {
 
            // defining Cowork model attributes
            name: {
                type: DataTypes.STRING,
                // cannot be null
                allowNull: false,
                unique: {
                    msg: "Name already taken."
                },
            },
            image: {
                type: DataTypes.STRING,
                allownull:false,

            },
        }
    )
}