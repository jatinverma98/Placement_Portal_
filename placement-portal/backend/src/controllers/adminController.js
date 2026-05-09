const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

/**
 * @desc    Sare users (Students/Companies) ki list nikalne ke liye
 * @route   GET /api/admin/users
 */
exports.getAllUsers = async (req, res) => {
    try {
        // Password ko hide kar diya hai security ke liye
        const users = await User.find().select('-password');
        
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error: " + error.message 
        });
    }
};

/**
 * @desc    Kisi specific user ko delete karne ke liye
 * @route   DELETE /api/admin/user/:id
 */
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User nahi mila!'
            });
        }

        await user.deleteOne();
        
        res.status(200).json({
            success: true,
            message: 'User successfully delete ho gaya'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Deletion Error: " + error.message 
        });
    }
};

/**
 * @desc    Sari jobs ki list (with company details) nikalne ke liye
 * @route   GET /api/admin/jobs
 */
exports.getAllJobs = async (req, res) => {
    try {
        // Company name aur email bhi saath mein fetch karega
        const jobs = await Job.find().populate('company', 'name email');
        
        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Jobs fetch karne mein error: " + error.message 
        });
    }
};

//verify company logic
// toggle verify company logic
exports.verifyCompany = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.isVerified = !user.isVerified; // Toggle status
        await user.save();

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });   
    }
};

// stats logic
exports.getPlacementStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalCompanies = await User.countDocuments({ role: 'company' });
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();
        
        // Status breakdown
        const appliedCount = await Application.countDocuments({ status: 'applied' });
        const shortlistedCount = await Application.countDocuments({ status: 'shortlisted' });
        const acceptedCount = await Application.countDocuments({ status: 'accepted' });
        const rejectedCount = await Application.countDocuments({ status: 'rejected' });

        res.status(200).json({ 
            success: true, 
            data: {
                counts: {
                    students: totalStudents,
                    companies: totalCompanies,
                    jobs: totalJobs,
                    applications: totalApplications
                },
                breakdown: {
                    applied: appliedCount,
                    shortlisted: shortlistedCount,
                    accepted: acceptedCount,
                    rejected: rejectedCount
                }
            } 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });   
    }
};