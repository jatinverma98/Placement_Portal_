const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    console.error(`Error Stack: ${err.stack}`);

    // 1. Mongoose bad ObjectId (Cast Error) - e.g., /api/job/123 (invalid ID)
    if (err.name === 'CastError') {
        error.message = `Resource not found with id of ${err.value}`;
        error.statusCode = 404;
    }

    // 2. Mongoose Duplicate Key (Code 11000) - e.g., Email already exists
    if (err.code === 11000) {
        error.message = 'Duplicate field value entered. This email is already registered.';
        error.statusCode = 400;
    }

    // 3. Mongoose Validation Error - e.g., required: true fields missing
    if (err.name === 'ValidationError') {
        error.message = Object.values(err.errors).map(val => val.message);
        error.statusCode = 400;
    }

    // 4. JWT Errors (Optional but helpful)
    if (err.name === 'JsonWebTokenError') {
        error.message = 'Not authorized, invalid token';
        error.statusCode = 401;
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
};

module.exports = errorHandler;