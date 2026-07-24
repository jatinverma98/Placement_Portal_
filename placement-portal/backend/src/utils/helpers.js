/*
 * Async Handler:
 * Har controller mein try-catch likhne ki jhanjhat khatam karta hai.
 */
exports.asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};

/*
 * Standard API Response:
 * Poore project mein ek jaisa response format rakhne ke liye helper.
 */
exports.sendResponse = (res, statusCode, success, message, data = null) => {
    return res.status(statusCode).json({
        success,
        message,
        data,
    });
};
