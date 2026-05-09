const Student = require('../models/Student');
const Application = require('../models/Application');
const User = require('../models/User');

/**
 * @desc    Get Student Profile (Self)
 * @route   GET /api/student/profile
 * @access  Private (Student)
 */
exports.getStudentProfile = async (req, res) => {
    try {
        // req.user._id auth middleware (protect) se aa raha hai
        const student = await Student.findOne({ user: req.user._id })
            .populate('user', 'name email role');
        
        if (!student) {
            return res.status(404).json({ 
                success: false, 
                message: "Student profile create nahi hui hai abhi." 
            });
        }

        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Update or Create Student Profile
 * @route   POST /api/student/profile
 */
exports.updateStudentProfile = async (req, res) => {
    try {
        const { bio, skills, college, graduationYear, cgpa, department } = req.body;
        
        const profileFields = {
            user: req.user._id,
            bio,
            skills: skills ? skills.split(",").map(s => s.trim()) : [],
            college,
            graduationYear,
            cgpa,
            department // Dept ID from Department model
        };

        // Resume upload logic (agar req.file exist karti hai)
        if (req.file) {
            profileFields.resume = req.file.path;
        }

        const student = await Student.findOneAndUpdate(
            { user: req.user._id },
            { $set: profileFields },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            data: student
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get All Applied Jobs for Student
 * @route   GET /api/student/my-applications
 */
exports.getStudentApplications = async (req, res) => {
    try {
        const applications = await Application.find({ student: req.user._id })
            .populate({
                path: 'job',
                select: 'title location salary',
                populate: { path: 'company', select: 'name' } // Company ka naam nikalne ke liye
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};