const express = require('express');
const router = express.Router();
const { 
    createJob, 
    getJobs, 
    getJobById,      // Naya: Single job dekhne ke liye
    updateJob,       // Naya: Job edit karne ke liye
    deleteJob 
} = require('../controllers/jobController');

const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

// 1. Sabhi logged-in users jobs dekh sakte hain
router.get('/', protect, getJobs);

// 2. Specific job ki detail dekhne ke liye (Frontend pe click karne par)
router.get('/:id', protect, getJobById);

// 3. ONLY Company can POST a job
router.post('/create', protect, authorize('company'), createJob);

// 4. Company apni job UPDATE bhi kar sakti hai
router.put('/:id', protect, authorize('company', 'admin'), updateJob);

// 5. Admin aur Company DELETE kar sakte hain
router.delete('/:id', protect, authorize('admin', 'company'), deleteJob);

module.exports = router;