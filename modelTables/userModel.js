module.exports = (sequelize, DataTypes) => {

    // creating a new Users model table through sequelize.define to be used in sequelize setup when starting our server
    return sequelize.define('Users', {

            // defining User model attributes
            name: {

                // cannot be null
                type: DataTypes.STRING,
                allowNull: false,

                // name value validation
                validate: {
                    len: {

                        // min lengh 3 for username
                        msg: "Name must be at least 3 characters long.",
                        args: [3, 20]
                    }
                },
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,

                validate:{
                    len: {

                        // min lengh 3 for username
                        msg: "Name must be at least 3 characters long.",
                        args: [3, 20]
                    }
                }
            },
            email:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "Email already taken."
                },
                validate: {
                    isEmail: true,
                }
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            postcode:{
                type: DataTypes.INTEGER,
                allowNull: false,
                validate:{
                    isExactlyFiveCharacters: function (value) {
                        if (value !== null && value.toString().length !== 5) {
                            throw new Error('Code postale doit contenir 5 caractères.');
                        }
                    },
                }
            },
            town:{
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    len: {
                        args: 2,
                        msg: 'Town name must be at least 2 characters long.'
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,

                validate: {
                    len: {

                        // min lengh 3 for username
                        msg: "Password must be at least 3 characters long.",
                        min: 3
                    }
                },
            },
        },{
            onDelete: 'SET NULL',
            defaultScope: {
                attributes: { exclude: ['password'] }
            },
            scopes: {
                withPassword: {
                    attributes: {}
                }
            }
        }
    );
}