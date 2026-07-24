const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @desc    Protect Routes - Sirf logged in users ke liye
 */
const protect = async (req, res, next) => {
    let token;
    console.log("Headers Auth:", req.headers.authorization); 

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log("Extracted Token:", token); 
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Data:", decoded); 

            // Yahan dhyan de: decoded.id ya decoded._id (jo tune payload mein dala tha)
            req.user = await User.findById(decoded.id || decoded._id).select('-password');
            console.log("User Found in DB:", req.user ? "YES" : "NO"); 

            if (!req.user) {
                return res.status(401).json({ success: false, message: 'User no longer exists' });
            }
            next();
        } catch (error) {
            console.error("Auth Error Trace:", error.message); 
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

/**
 * @desc    Authorize Roles - Ye wala function tere code se MISSING tha
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ 
                success: false, 
                message: `User role '${req.user?.role}' is not authorized to access this route` 
            });
        }
        next();
    };
};

// Ab dono mil jayenge Node ko
module.exports = { protect, authorize };