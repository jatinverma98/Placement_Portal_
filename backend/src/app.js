const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const studentRoutes = require('./routes/studentRoutes');
const companyRoutes = require('./routes/companyRoutes');
const placementRoutes = require('./routes/placementRoutes');

dotenv.config();

const app = express();

// ─── CORS CONFIGURATION ─────────────────────────────────────────────────────
// Must come BEFORE all routes and other middleware.
// No withCredentials on frontend (JWT is in localStorage), so credentials:false is safe.
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Authorization'],
    credentials: false,
    optionsSuccessStatus: 204   // Some browsers (IE11) choke on 204
};

// Explicitly handle OPTIONS preflight for ALL routes BEFORE anything else
app.options('*', cors(corsOptions));

// Apply CORS to all subsequent requests
app.use(cors(corsOptions));
// ─────────────────────────────────────────────────────────────────────────────

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Form data handling

// Request logging (terminal me error mil jyega)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//SARE ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/placements', placementRoutes);

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ROUTE KA ERROR 
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

//OVER ALL ERROR HANDLER
app.use(errorHandler);

module.exports = app;