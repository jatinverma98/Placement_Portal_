const PlacementDrive = require('../models/PlacementDrive');
const Application = require('../models/Application');
const Job = require('../models/Job');

/**
 * @desc    Naya Placement Drive create karna (Only for Admin/Placement Cell)
 * @route   POST /api/placement/drive
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
 * @route   GET /api/placement/drives
 */
exports.getAllDrives = async (req, res) => {
    try {
        // Sirf wahi drives dikhao jo aaj ya aaj ke baad hain
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
 * @route   GET /api/placement/stats
 */
exports.getPlacementStats = async (req, res) => {
    try {
        // 1. Total Placed Students (Accepted Applications)
        const totalPlaced = await Application.countDocuments({ status: 'accepted' });

        // 2. Drive Wise count
        const totalDrives = await PlacementDrive.countDocuments();

        // 3. Sabse high package wali job (Example logic)
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