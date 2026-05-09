const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Job title is required'],
        trim: true 
    },
    description: { 
        type: String, 
        required: [true, 'Description is required'] 
    },
    company: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Linking the job to the Company/User
        required: true 
    },
    location: { 
        type: String, 
        required: [true, 'Location is required'] 
    },
    salary: { 
        type: String // Format: "12 LPA" or "50,000/month"
    },
    requirements: [String], // Array of skills: ["React", "Node.js"]
    
    // Nayi fields eligibility check ke liye
    eligibility: {
        minCGPA: { type: Number, default: 0 },
        branches: [{ type: String }] // e.g., ["CSE", "IT"]
    },
    
    jobType: { 
        type: String, 
        enum: ['Full-time', 'Part-time', 'Internship'], 
        default: 'Full-time' 
    },
    
    // Applicants ko array mein rakhne ke bajaye sirf counting ya reference
    // kyunki humne alag 'Application' model banaya hai
    applicantsCount: {
        type: Number,
        default: 0
    },
    
    deadline: {
        type: Date,
        required: [true, 'Application deadline is important to set']
    }
}, { 
    timestamps: true // CreatedAt aur UpdatedAt tracks ke liye
});

module.exports = mongoose.model('Job', jobSchema);