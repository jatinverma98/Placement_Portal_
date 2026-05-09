const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // User model se link hai (jahan email/password hai)
        required: true
    },
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Company description is required']
    },
    website: {
        type: String,
        match: [/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, 'correct URL format is required']
    },
    logo: {
        type: String, // Logo ka file path ya URL yahan save hoga
        default: 'default-logo.png'
    },
    industry: {
        type: String, // e.g., IT, Finance, Manufacturing
        required: true
    },
    address: {
        type: String,
        required: [true, 'Office address is required']
    },
    contactEmail: {
        type: String, // Agar main user email se alag koi HR email ho
        lowercase: true
    },
    isVerified: {
        type: Boolean,
        default: false // Admin verify karega tabhi jobs post ho payengi
    }
}, { 
    timestamps: true // CreatedAt aur UpdatedAt tracks ke liye
});

module.exports = mongoose.model('Company', companySchema);