module.exports = (sequelize, DataTypes) => {

    // creating a new Messages model table through sequelize.define to be used in sequelize setup when starting our server
    return sequelize.define('Messages', {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email:{
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                }
            },
            phoneNumber:{
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isNumeric: {
                        msg: 'Le numéro de téléphone doit contenir uniquement des chiffres.'
                    },
                    isExactlyTenCharacters: function (value) {
                        if (value !== null && value.toString().length !== 10) {
                            throw new Error('Le numéro de téléphone doit contenir 10 chiffres.');
                        }
                    },
                },
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
                        args: [1, 500]
                    }
                },
            },
        }
    )
}