const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Kis user ko notification dikhani hai (Student/Company/Admin)
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Notification kisne bheji (Optional, e.g., Admin ya System)
    },
    title: {
        type: String,
        required: [true, 'Notification title is required'],
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Notification message is required']
    },
    type: {
        type: String,
        enum: ['Job_Alert', 'Application_Status', 'Admin_Message', 'System_Update'],
        default: 'System_Update'
    },
    isRead: {
        type: Boolean,
        default: false // Check karne ke liye ki user ne notification dekh li ya nahi
    },
    link: {
        type: String, // Optional: Notification par click karke kahan jana hai (e.g., /jobs/id)
    }
}, { 
    timestamps: true // Kab notification aayi, uska record rakhne ke liye
});

// Indexing for faster queries (User apni notifications jaldi dekh payega)
notificationSchema.index({ recipient: 1, isRead: 1 });

module.exports = mongoose.model('Notification', notificationSchema);