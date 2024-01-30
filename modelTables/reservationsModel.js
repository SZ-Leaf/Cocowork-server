module.exports = (sequelize, DataTypes) => {

   return sequelize.define('Reservations', {
      start_date: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      end_date: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      is_cancelled: {
         type: DataTypes.BOOLEAN,
         defaultValue: false,
      },
   })
}