module.exports = (sequelize, DataTypes) => {

   return sequelize.define('Reservations', {
      date: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      duration: {
         type: DataTypes.ENUM('half-day', 'full-day'),
         allowNull: false,
      },
      status: {
         type: DataTypes.BOOLEAN,
         defaultValue: false,
      },
   })
}