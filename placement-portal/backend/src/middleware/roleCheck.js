const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if the user's role (from the protect middleware) is in the allowed list
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Role (${req.user.role}) is not authorized to access this resource` 
      });
    }
    next();
  };
};

module.exports = { authorize };