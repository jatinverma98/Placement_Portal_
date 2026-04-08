const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('⏳ Connecting to MongoDB...'); // Yeh dikhna chahiye terminal mein
        
        const connectionOptions = {
            tls: true,
            family: 4, 
        };

        // Yahan MONGO_URI check hoga
        if (!process.env.MONGO_URI) {
            console.error('❌ Error: MONGO_URI is not defined in .env file');
            return;
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, connectionOptions);
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;