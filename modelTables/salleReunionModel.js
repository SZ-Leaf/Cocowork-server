module.exports = (sequelize, DataTypes) => {

   return sequelize.define('Salles de Reunion', {
      name:{
         type: DataTypes.STRING,
         allowNull: false,
         unique: {
               msg: "Nom de salle existent."
         },
      },
      image:{
         type: DataTypes.image,
         allowNull: false,
      },
      description: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: {
               max: 300,
               msg: 'Description must be 300 characters max.'
            }
         }
      },
      price: {
         type: DataTypes.INTEGER,
         allowNull: false,

         validate:{
            len:{
               args: [1, 10],
               msg: 'Price cannot be null.'
            }
         }
      }
   })

}