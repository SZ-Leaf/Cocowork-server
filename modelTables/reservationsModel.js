module.exports = (sequelize, DataTypes) => {

   return sequelize.define('Reservations', {
      totalHalfDays: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            min: {
               args: [1],
               msg: 'Please select at least 1 half day for the reservation.'
            },
         },
      },
      reservationDate: {
         type: DataTypes.DATE,
         allowNull: false,
         validate: {
            isDate: {
               msg: 'Please provide a valid date format for the reservation.'
            },
         },
      },
   })

}