const jwt = require('jsonwebtoken');

//Generate JWT Token
const generateToken = (id, role) => {
    // JWT_SECRET environment variable se aana chahiye
    // expiresIn ko 30d se thoda kam rakhna secure hota hai, par dev ke liye 30d thik hai
    return jwt.sign(
        { id, role }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );
};

module.exports = generateToken;