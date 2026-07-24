const express = require('express');
const router = express.Router();
const { 
    getPlacementStats, 
    markStudentAsPlaced, 
    getPlacementHistory 
} = require('../controllers/placementController');

const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

// Sabhi routes ke liye login zaroori hai
router.use(protect);

/**
 * @route   GET /api/placements/stats
 * @desc    General placement statistics (Current year vs Previous year)
 */
router.get('/stats', getPlacementStats);

/**
 * @route   GET /api/placements/history
 * @desc    Get list of all placed students (Public/Student view)
 */
router.get('/history', getPlacementHistory);

/**
 * @route   POST /api/placements/mark-placed
 * @desc    Admin manually marking a student as placed in a company
 */
router.post('/mark-placed', protect, authorize('admin'), markStudentAsPlaced);

module.exports = router;