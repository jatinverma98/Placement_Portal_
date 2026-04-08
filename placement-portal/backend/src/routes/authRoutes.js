const express = require('express');
const router = express.Router();

// --- 1. Imports (Saare ek saath) ---
const { 
    register, 
    login, 
    logout, 
    updateProfile 
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const upload = require('../middleware/upload');

// --- 2. PUBLIC ROUTES ---
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout); // Logout public ho sakta hai ya protected, dono chalta hai

// --- 3. PROTECTED ROUTES ---

// User details check karne ke liye
router.get('/me', protect, (req, res) => {
    res.json({ success: true, user: req.user });
});

// Profile update (With Resume Upload)
// Note: 'resume' wahi field name hona chahiye jo Postman/Frontend se aayega
router.put('/profile/update', protect, upload.single('resume'), updateProfile);

// Admin Access Test
router.get('/admin-test', protect, authorize('admin'), (req, res) => {
    res.json({ success: true, message: "Welcome Admin! High-level access granted." });
});

module.exports = router;