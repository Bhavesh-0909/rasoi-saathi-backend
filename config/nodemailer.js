const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Replace with your SMTP server
    port: 587, // Replace with your SMTP port
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.NODEMAILER_EMAIL, // Replace with your email
        pass: process.env.NODEMAILER_PASS // Replace with your email password
    }
});

// Verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

module.exports = transporter;