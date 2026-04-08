/*
   Application Configuration Manager
   Centralized settings for JWT, Cookies, and Environment
 */
module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'fallback_secret_key',
    jwtExpire: process.env.JWT_EXPIRE || '30d',
    cookieExpire: parseInt(process.env.COOKIE_EXPIRE, 10) || 30, // 30 days
    nodeEnv: process.env.NODE_ENV || 'development'
};