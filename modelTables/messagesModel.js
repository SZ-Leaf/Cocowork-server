module.exports = (sequelize, DataTypes) => {

    // creating a new Messages model table through sequelize.define to be used in sequelize setup when starting our server
    return sequelize.define('Messages', {
 
            // defining Message model attributes
            lastname: {
                // cannot be null
                type: DataTypes.STRING,
                allowNull: false,
            },

            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                  isEmail: {
                    args: true,
                    msg: 'Enter valid email'
                  }
                }
            },

            phoneNumber: {
                type: DataTypes.INTEGER,
            },

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
                    args: [null, 500]
                }
            },
        },
        }
    )
}