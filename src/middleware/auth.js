const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { asyncHandler } = require('../utils/helpers'); // Agar tune asyncHandler banaya hai

/**
 * @desc    Protect Routes - Sirf logged in users ke liye
 */
const protect = async (req, res, next) => {
    let token;

    // 1. Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from string "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to req object (minus password)
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ success: false, message: 'User no longer exists' });
            }

            next();
        } catch (error) {
            console.error("Auth Error:", error.message);
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    // 2. If no token found
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

/**
 * @desc    Authorize Roles - Specific roles ko permission dene ke liye
 * @usage   authorize('admin', 'company')
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: `User role '${req.user.role}' is not authorized to access this route` 
            });
        }
        next();
    };
};

module.exports = { protect, authorize };