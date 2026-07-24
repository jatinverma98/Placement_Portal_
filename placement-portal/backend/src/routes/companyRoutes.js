const express = require('express');
const router = express.Router();
const { 
    getCompanyProfile, 
    updateCompanyProfile, 
    getCompanyJobs 
} = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload'); // Logo upload ke liye

router.use(protect);
router.use(authorize('company', 'admin'));

// Profile fetch
router.get('/profile', getCompanyProfile);

// Profile update (Logo upload support ke saath)
// 'logo' wahi key hogi jo Postman/Frontend se aayegi
router.put('/profile', upload.single('logo'), updateCompanyProfile);

// Company ki post ki hui jobs
router.get('/jobs', getCompanyJobs);

module.exports = router;