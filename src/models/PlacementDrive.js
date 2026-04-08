const mongoose = require('mongoose');

const placementDriveSchema = new mongoose.Schema({
    driveName: {
        type: String,
        required: [true, 'mention drive name'],
        trim: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', // Company model se link hai
        required: true
    },
    date: {
        type: Date,
        required: [true, 'set date for the drive']
    },
    venue: {
        type: String,
        required: [true, 'Venue (e.g., Aryabatta Hall) is required'],
    },
    type: {
        type: String,
        enum: ['On-Campus', 'Off-Campus', 'Pool-Campus'],
        default: 'On-Campus'
    },
    eligibleBranches: [{
        type: String, // e.g., ["CSE", "IT", "ECE"]
        required: true
    },],
    minCGPA: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        trim: true // Drive ke rules aur details ke liye like "Round 1: Written Test, Round 2: Technical Interview"
    },
    status: {
        type: String,
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
        default: 'Upcoming'
    }
}, { 
    timestamps: true // Drive kab create hui uska record rakhne ke liye
});

module.exports = mongoose.model('PlacementDrive', placementDriveSchema);