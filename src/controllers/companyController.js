const Company = require('../models/Company');
const Job = require('../models/Job');
const Application = require('../models/Application');

/**
 * @desc    Get Company Profile
 * @route   GET /api/company/profile
 */
exports.getCompanyProfile = async (req, res) => {
    try {
        // req.user._id humein auth middleware se milega
        const company = await Company.findOne({ user: req.user._id });
        
        if (!company) {
            return res.status(404).json({ success: false, message: "Company profile not found" });
        }

        res.status(200).json({ success: true, data: company });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Create or Update Company Profile
 * @route   POST /api/company/profile
 */
exports.updateCompanyProfile = async (req, res) => {
    try {
        const { name, description, website, location, contactEmail } = req.body;
        
        const profileFields = {
            user: req.user._id,
            name,
            description,
            website,
            location,
            contactEmail
        };

        let company = await Company.findOne({ user: req.user._id });

        if (company) {
            // Update existing profile
            company = await Company.findOneAndUpdate(
                { user: req.user._id },
                { $set: profileFields },
                { new: true }
            );
            return res.status(200).json({ success: true, message: "Profile updated", data: company });
        }

        // Create new profile
        company = new Company(profileFields);
        await company.save();
        
        res.status(201).json({ success: true, data: company });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get all jobs posted by this company
 * @route   GET /api/company/jobs
 */
exports.getCompanyJobs = async (req, res) => {
    try {
        // Job model mein 'company' field user ID (HR/Admin) store karti hai
        const jobs = await Job.find({ company: req.user._id });
        
        res.status(200).json({ 
            success: true, 
            count: jobs.length, 
            data: jobs 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc    Get Stats for Company Dashboard
 * @route   GET /api/company/stats
 */
exports.getCompanyStats = async (req, res) => {
    try {
        const totalJobs = await Job.countDocuments({ company: req.user._id });
        
        // Un jobs ki applications count karna jo is company ne post ki hain
        const jobs = await Job.find({ company: req.user._id }).select('_id');
        const jobIds = jobs.map(job => job._id);
        
        const totalApplications = await Application.countDocuments({ job: { $in: jobIds } });
        const pendingApplications = await Application.countDocuments({ 
            job: { $in: jobIds }, 
            status: 'pending' 
        });

        res.status(200).json({
            success: true,
            data: {
                totalJobs,
                totalApplications,
                pendingApplications
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};