/*
 * Job Controller
 * Handles job creation, deletion, and advanced filtering/searching
 */

const Job = require('../models/Job');

// @desc    Create a new Job (Only for Companies)
// @route   POST /api/job/create
exports.createJob = async (req, res) => {
    try {
        const { 
            title, description, location, salary, 
            requirements, jobType, eligibility, deadline 
        } = req.body;

        // Company check model se link hai
        const job = await Job.create({
            title,
            description,
            location,
            salary,
            requirements,
            jobType,
            eligibility, // CGPA aur Branches eligibility add kari hai
            deadline,    // Application kab band hogi
            company: req.user._id // 'protect' middleware se user ID mil rahi hai
        });

        res.status(201).json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a Job (Admins & The Company who posted it)
// @route   DELETE /api/job/:id
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        // Security Check: Sirf Owner ya Admin hi delete kar sakta hai
        if (job.company.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ 
                success: false, 
                message: "You are not authorized to delete this job" 
            });
        }

        await job.deleteOne();
        res.status(200).json({ success: true, message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all jobs with Search, Filters and Pagination
// @route   GET /api/job
exports.getJobs = async (req, res) => {
    try {
        let query = {};

        // 1. Search Logic: Title ya Description mein keyword dhundne ke liye
        if (req.query.keyword) {
            query.$or = [
                { title: { $regex: req.query.keyword, $options: 'i' } },
                { description: { $regex: req.query.keyword, $options: 'i' } }
            ];
        }

        // 2. Filters: Location, JobType, aur MinCGPA
        if (req.query.location) {
            query.location = { $regex: req.query.location, $options: 'i' };
        }
        
        if (req.query.jobType) {
            query.jobType = req.query.jobType;
        }

        // CGPA Filter: Sirf wahi jobs dikhao jahan student eligible ho sake
        if (req.query.minCGPA) {
            query['eligibility.minCGPA'] = { $lte: req.query.minCGPA };
        }

        // 3. Pagination Setup
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const total = await Job.countDocuments(query);

        // 4. Execution
        const jobs = await Job.find(query)
            .populate('company', 'name email logo') // Company ki basic details fetch karne ke liye
            .sort({ createdAt: -1 }) // Nayi jobs pehle dikhengi
            .skip(startIndex)
            .limit(limit);

        // 5. Response with MetaData
        res.status(200).json({
            success: true,
            count: jobs.length,
            totalJobs: total,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                hasNext: startIndex + jobs.length < total,
                hasPrev: startIndex > 0
            },
            data: jobs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Jobs by Current Company
// @route   GET /api/job/my-jobs
exports.getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ company: req.user._id }).sort({ createdAt: -1 });
        
        // For each job, count applications
        const Application = require('../models/Application');
        const jobsWithStats = await Promise.all(jobs.map(async (job) => {
            const applicantsCount = await Application.countDocuments({ job: job._id });
            return {
                ...job._doc,
                applicantsCount
            };
        }));

        res.status(200).json({
            success: true,
            count: jobsWithStats.length,
            data: jobsWithStats
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Single Job by ID (For Job Details Page)
// @route   GET /api/job/:id
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('company', 'name email logo');
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }   

        res.status(200).json({ success: true, data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }                       
};

// @desc    Update Job (Only for the Company who posted it or Admin)
// @route   PUT /api/jobs/:id
exports.updateJob = async (req, res) => {
    try {
        let job = await Job.findById(req.params.id);  
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        } 

        // Security check: Only company owner or admin can update
        if (job.company.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to update this job listing"
            });
        }

        job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, message: "Job updated successfully", data: job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

