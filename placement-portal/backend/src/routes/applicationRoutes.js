const express = require('express');
const router = express.Router();
const { applyToJob, getJobApplications, updateApplicationStatus} = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

// POST request to apply (Sirf Students ke liye)
router.post('/apply/:jobId', protect, authorize('student'), applyToJob);

// Company can see who applied to their job
router.get('/job/:jobId', protect, authorize('company', 'admin'), getJobApplications);

// Add this line at the bottom
router.put('/:id/status', protect, authorize('company', 'admin'), updateApplicationStatus);

module.exports = router;