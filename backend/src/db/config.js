const mongoose = require('mongoose');

const configureDB = () => {
    // Deprecation warnings se bachne ke liye
    mongoose.set('strictQuery', true);
    
    // Connection events monitor karne ke liye (Optional but good for debugging)
    mongoose.connection.on('disconnected', () => {
        console.log('⚠️ MongoDB disconnected!');
    });

    mongoose.connection.on('error', (err) => {
        console.error(`🔴 Mongoose connection error: ${err}`);
    });
};

module.exports = configureDB;