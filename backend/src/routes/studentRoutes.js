const express = require('express');
const router = express.Router();

// Controllers import
const { 
    getStudentProfile, 
    updateStudentProfile, 
    getStudentApplications 
} = require('../controllers/studentController');

// Middleware import
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const upload = require('../middleware/upload'); // Resume upload handle karne ke liye

// --- SARE ROUTES PROTECTED HAIN ---
// 1. Pehle check karega token (protect)
// 2. Phir check karega ki user 'student' hi hai na (authorize)
router.use(protect);
router.use(authorize('student'));

/**
 * @route   GET /api/students/profile
 * @desc    Student apni profile details dekhega
 */
router.get('/profile', getStudentProfile);

/**
 * @route   PUT /api/students/profile
 * @desc    Profile update + Resume upload logic
 * Note: 'resume' wahi key honi chahiye jo frontend/Postman se bhejoge
 */
router.put('/profile', upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'profilePic', maxCount: 1 }
]), updateStudentProfile);

/**
 * @route   GET /api/students/my-applications
 * @desc    Student ki saari job applications ki history
 */
router.get('/my-applications', getStudentApplications);

module.exports = router;