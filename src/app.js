const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan'); // Logs ke liye naya add kiya
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const studentRoutes = require('./routes/studentRoutes');
const companyRoutes = require('./routes/companyRoutes');

dotenv.config();

const app = express();

// --- 1. GLOBAL MIDDLEWARES ---
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Form data handle karne ke liye

// Request logging (Ab tujhe terminal mein dikhega kaunsa URL hit hua hai)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// --- 2. ROUTES MOUNTING ---
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 404 Route (Agar koi galat URL daale toh)
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// --- 3. ERROR HANDLER ---
app.use(errorHandler);

module.exports = app;