const nodemailer = require('nodemailer');

// Create and export the nodemailer transporter
const appPassword = 'pauq ladw broa obpl';
const mailSender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cocoworka@gmail.com',
        pass: appPassword
    }
});

const sendEmail = (to, subject, text) => {
   const mailOptions = {
      from: 'cocoworka@gmail.com',
      to: to,
      subject: subject,
      text: text
   };

   return new Promise((resolve, reject) => {
      mailSender.sendMail(mailOptions, (error, info) => {
         if (error) {
            reject(error);
         } else {
            resolve(info);
         }
      });
   });
};

module.exports = sendEmail;