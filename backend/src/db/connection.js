const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('⏳ Connecting to MongoDB...');

        if (!process.env.MONGO_URI) {
            console.error('❌ Error: MONGO_URI is not defined in .env file');
            return;
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            family: 4
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        console.log('⚠️ Server will continue running, but MongoDB features will require valid connection string.');
    }
};

module.exports = connectDB;