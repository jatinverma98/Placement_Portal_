const express = require('express');
const router = express.Router();
const { getAdminStats } = require('../controllers/dashboardController');

const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck'); // Role check zaroori hai

// Sabhi dashboard routes ke liye login hona zaroori hai
router.use(protect);

/**
 * @route   GET /api/dashboard/admin
 * @desc    Admin stats (Total Students, Placed vs Unplaced, Companies)
 */
router.get('/admin',protect, authorize('admin'), getAdminStats);

module.exports = router;