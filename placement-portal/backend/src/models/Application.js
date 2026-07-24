const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // job model ko reference dena
        required: [true, 'Job reference is required']
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // user model jisme role 'student' hai, isliye direct User ko reference dena
        required: [true, 'Student reference is required']
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // company ko direct reference dena (User model jisme role 'company' hai)
        required: true
    },
    resume: {
        type: String, // resume file ka path ya URL
        required: [true, 'Resume is required for application']
    },
    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'accepted', 'rejected'],
        default: 'applied'
    },
    feedback: {
        type: String, 
        trim: true
    }
}, { 
    timestamps: true 
});

// student ek job ke liye sirf ek baar apply kar sakta hai - unique index on combination of job and student
applicationSchema.index({ job: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);