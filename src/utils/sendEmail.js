const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Email bhejne wala setup (Transporter)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Woh 16-digit code jo tune .env mein dala hai
        },
    });

    // 2. Email ki details
    const mailOptions = {
        from: `"Placement Cell" <${process.env.EMAIL_USER}>`,
        to: options.email,      // Kise bhejna hai
        subject: options.subject, // Subject kya hai
        text: options.message,    // Message kya hai
    };

    // 3. Email bhej do!
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;