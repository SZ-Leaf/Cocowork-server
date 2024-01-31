module.exports = (sequelize, DataTypes) => {

    // creating a new Messages model table through sequelize.define to be used in sequelize setup when starting our server
    return sequelize.define('Messages', {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            content: {
                type: DataTypes.STRING,
                allowNull: false,
                      // name value validation
               validate: {
                len: {
                    // max lengh 500 for message's content
                    msg: "Message can't be more than 500 characters",
                    args: [1, 500]
                }
            },
        },
        }
    )
}