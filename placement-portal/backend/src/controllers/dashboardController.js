/**
 * Dashboard Controller
 * Admin ke liye pure system ke summary stats fetch karta hai
 */

const Job = require('../models/Job');
const User = require('../models/User');
const Application = require('../models/Application');
const { asyncHandler } = require('../utils/helpers'); 

// @desc    Get Stats for Admin Dashboard
// @route   GET /api/dashboard/admin
// @access  Private/Admin
exports.getAdminStats = asyncHandler(async (req, res, next) => {
    
    // Performance optimization: Sari queries ek sath parallel mein chalengi
    const [
        totalJobs, 
        totalStudents, 
        totalCompanies, 
        totalApplications
    ] = await Promise.all([
        Job.countDocuments(),
        User.countDocuments({ role: 'student' }),
        User.countDocuments({ role: 'company' }),
        Application.countDocuments()
    ]);

    res.status(200).json({
        success: true,
        data: {
            jobs: totalJobs,
            students: totalStudents,
            companies: totalCompanies,
            applications: totalApplications
        }
    });
});