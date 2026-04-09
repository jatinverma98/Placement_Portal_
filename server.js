require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/connection'); 
const dotenv = require('dotenv');
const configureDB = require('./src/db/config'); 
const errorHandler = require('./src/middleware/errorHandler'); // Import sahi hai



// 2. DB Config & Connect
configureDB(); 
connectDB();

// 3. Error Handler (Ye hamesha routes ke BAAD aana chahiye)
// Kyunki routes 'app.js' mein hain, toh hum ise yahan bhi connect kar sakte hain
app.use(errorHandler); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

const sendEmail = require('./src/utils/sendEmail');

