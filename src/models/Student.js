const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // This connects the profile to a specific login account
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    rollNumber: { 
        type: String, 
        required: [true, 'Roll number is required'], 
        unique: true,
        trim: true 
    },
    department: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Department', // String ke bajaye Department model se link kiya hai
        required: [true, 'Department is required'] 
    },
    cgpa: { 
        type: Number, 
        required: [true, 'CGPA is required'],
        min: [0, 'CGPA cannot be less than 0'],
        max: [10, 'CGPA cannot be more than 10']
    },
    skills: {
        type: [String], // Example: ["React", "Node.js", "Python"]
        default: []
    },
    resumeUrl: { 
        type: String, 
        default: "" // Isme upload.js middleware se aaya path save hoga
    },
    batch: {
        type: Number, // Example: 2026
        required: true
    },
    isVerified: { 
        type: Boolean, 
        default: false // Admin verify karega tabhi placement mein baith payega
    }
}, { 
    timestamps: true // CreatedAt aur UpdatedAt tracks ke liye
});

module.exports = mongoose.model('Student', studentSchema);