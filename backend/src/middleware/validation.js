const Joi = require('joi');

// 1. Register Validation Schema
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required().messages({
            'string.min': 'Name should be at least 3 characters long',
            'any.required': 'Name is required'
        }),
        email: Joi.string().email().required().messages({
            'string.email': 'Please enter a valid email address'
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'Password should be at least 6 characters long'
        }),
        role: Joi.string().valid('student', 'company', 'admin').default('student')
    });

    return schema.validate(data);
};

// 2. Login Validation Schema
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    return schema.validate(data);
};

// 3. Job Posting Validation (For Companies)
const jobValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().min(20).required(),
        requirements: Joi.string().required(),
        salary: Joi.number().required(),
        location: Joi.string().required(),
        jobType: Joi.string().valid('Full-time', 'Part-time', 'Internship').required()
    });

    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation,
    jobValidation
};