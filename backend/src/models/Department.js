const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Department name is required'],
        unique: true, // Ek hi naam ke do departments nahi ho sakte
        trim: true
    },
    code: {
        type: String,
        required: [true, 'Department code (e.g., CSE, IT, MECH) is required'],
        unique: true,
        uppercase: true,
        trim: true
    },
    description: {
        type: String,
        trim: true // Department ke baare mein thoda intro
    },
    hodName: {
        type: String,
        trim: true // Head of Department ka naam
    },
    active: {
        type: Boolean,
        default: true // Agar department temporarily band hai toh false kar sakte hain
    }
}, { 
    timestamps: true // CreatedAt aur UpdatedAt tracks ke liye
});

module.exports = mongoose.model('Department', departmentSchema);