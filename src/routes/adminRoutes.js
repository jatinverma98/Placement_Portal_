const express = require('express');
const router = express.Router();
const { 
    getAllUsers, 
    deleteUser, 
    getAllJobs, 
    verifyCompany, // Naya: Company ko verify karne ke liye
    getPlacementStats // Naya: Dashboard analytics ke liye
} = require('../controllers/adminController');

// 'protect' login check karta hai, 'authorize' role check karta hai
const { protect, authorize } = require('../middleware/auth'); 

// --- Saare routes sirf Admin access kar sakega ---
router.use(protect);
router.use(authorize('admin'));

// User Management
router.get('/users', getAllUsers);
router.delete('/user/:id', deleteUser);

// Job & Company Management
router.get('/jobs', getAllJobs);
router.put('/verify-company/:id', verifyCompany); // Company ko active status dene ke liye

// Analytics
router.get('/stats', getPlacementStats); // Kitne placements hue, ye dekhne ke liye

module.exports = router;