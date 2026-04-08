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
exports.verifyCompany = async (req, res) => {
    try {
        const company = await User.findByIdAndUpdate(
            req.params.id,
            { isVerified: true },
            { new: true }
        );
        res.status(200).json({success: true, data: company});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });   
    }
};

// stats logic
exports.getPlacementStats = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "Stats logic goes here" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });   
    }
};