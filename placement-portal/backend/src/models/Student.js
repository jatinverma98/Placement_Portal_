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
        unique: true,
        sparse: true, // Allows nulls while keeping unique constraint
        trim: true 
    },
    department: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Department',
    },
    cgpa: { 
        type: Number, 
        min: [0, 'CGPA cannot be less than 0'],
        max: [10, 'CGPA cannot be more than 10']
    },
    skills: {
        type: [String], 
        default: []
    },
    bio: {
        type: String,
        trim: true
    },
    college: {
        type: String,
        trim: true
    },
    age: {
        type: Number
    },
    currentSemester: {
        type: Number
    },
    previousSemesterMarks: {
        type: [Number], // Storing as simple list of pointers for now
        default: []
    },
    profilePicUrl: {
        type: String,
        default: ""
    },
    resumeUrl: { 
        type: String, 
        default: "" 
    },
    batch: {
        type: Number,
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    }
}, { 
    timestamps: true // CreatedAt aur UpdatedAt tracks ke liye
});

module.exports = mongoose.model('Student', studentSchema);