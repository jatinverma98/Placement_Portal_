const PlacementDrive = require('../models/PlacementDrive');
const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

/**
 * @desc    Naya Placement Drive create karna (Only for Admin/Placement Cell)
 * @route   POST /api/placements/drive
 */
exports.createPlacementDrive = async (req, res) => {
    try {
        const { name, companyName, date, venue, description, eligibleDepartments, package } = req.body;

        const drive = await PlacementDrive.create({
            name,
            companyName,
            date,
            venue,
            description,
            eligibleDepartments, // Array of Dept IDs
            package,
            createdBy: req.user._id
        });

        res.status(201).json({ success: true, data: drive });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Sare Upcoming Placement Drives nikalna (For Students)
 * @route   GET /api/placements/drives
 */
exports.getAllDrives = async (req, res) => {
    try {
        const today = new Date();
        const drives = await PlacementDrive.find({ date: { $gte: today } })
            .populate('eligibleDepartments', 'name')
            .sort({ date: 1 });

        res.status(200).json({
            success: true,
            count: drives.length,
            data: drives
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Placement Stats nikalna (For Reports/PlacementStats.jsx)
 * @route   GET /api/placements/stats
 */
exports.getPlacementStats = async (req, res) => {
    try {
        const totalPlaced = await Application.countDocuments({ status: 'accepted' });
        const totalDrives = await PlacementDrive.countDocuments();
        const topJob = await Job.findOne().sort({ salary: -1 }).select('title salary company');

        res.status(200).json({
            success: true,
            data: {
                totalPlaced,
                totalDrives,
                highestPackage: topJob ? topJob.salary : 0,
                topRecruiter: topJob ? topJob.company : 'N/A'
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Admin manually marking a student as placed in a company
 * @route   POST /api/placements/mark-placed
 */
exports.markStudentAsPlaced = async (req, res) => {
    try {
        const { applicationId, companyName, packageOffered } = req.body;
        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        application.status = 'accepted';
        await application.save();

        res.status(200).json({
            success: true,
            message: "Student successfully marked as placed!",
            data: application
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get list of all placed students
 * @route   GET /api/placements/history
 */
exports.getPlacementHistory = async (req, res) => {
    try {
        const placedApplications = await Application.find({ status: 'accepted' })
            .populate('student', 'name email profilePicUrl')
            .populate('job', 'title salary location')
            .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            count: placedApplications.length,
            data: placedApplications
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};