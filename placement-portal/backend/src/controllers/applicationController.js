const Application = require('../models/Application');
const Job = require('../models/Job');
const Student = require('../models/Student');

// @desc    Apply to a Job
// @route   POST /api/application/apply/:jobId
exports.applyToJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const studentId = req.user._id;

        // 1. Check karo ki job exist karti hai ya nahi
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        // 2. Check karo ki student ne pehle hi apply toh nahi kar diya
        const alreadyApplied = await Application.findOne({ job: jobId, student: studentId });
        if (alreadyApplied) {
            return res.status(400).json({ success: false, message: "Pehle hi apply kar chuke ho bhai!" });
        }

        // 3. Eligibility Check (CGPA logic)
        const studentProfile = await Student.findOne({ user: studentId });
        if (!studentProfile) {
            return res.status(404).json({ success: false, message: "Pehle profile complete karo" });
        }

        if (studentProfile.cgpa < job.eligibility.minCGPA) {
            return res.status(403).json({ 
                success: false, 
                message: `Eligible nahi ho. Minimum CGPA required: ${job.eligibility.minCGPA}` 
            });
        }

        // 4. Create Application
        const application = await Application.create({
            job: jobId,
            student: studentId,
            company: job.company, // Fix: Added company ID from the job
            resume: studentProfile.resumeUrl || "No resume"
        });

        res.status(201).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get Applications for a Specific Job (For Companies)
// @route   GET /api/application/job/:jobId
exports.getJobApplications = async (req, res) => {
    try {
        const applications = await Application.find({ job: req.params.jobId })
            .populate('student', 'name email profilePicUrl');

        // We also need student profile details (CGPA, etc. which are in Student model)
        const detailedApplications = await Promise.all(applications.map(async (app) => {
            const studentProfile = await Student.findOne({ user: app.student._id });
            return {
                ...app._doc,
                studentProfile
            };
        }));

        res.status(200).json({ success: true, count: detailedApplications.length, data: detailedApplications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update Application Status (Shortlisted/Rejected/etc)
// @route   PUT /api/application/:id/status
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        let application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ success: false, message: "Application nahi mili" });
        }

        application.status = status;
        await application.save();

        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};