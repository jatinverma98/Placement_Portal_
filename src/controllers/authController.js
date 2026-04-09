const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/appConfig'); // Ensure ye file aur path sahi ho

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "Email already registered" });
        }

        // 2. Hash Password (Security)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create User
        user = await User.create({
            name,
            email,
            password,
            role: role || 'student'
        });

        res.status(201).json({
            success: true,
            message: "Registration successful!",
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check user exists (select password because it's hidden in model)
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // 2. Check password match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // 3. Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            config.jwtSecret,
            { expiresIn: config.jwtExpire }
        );

        // 4. Send Cookie (Optional but good)
        const options = {
            expires: new Date(Date.now() + config.cookieExpire * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200).cookie('token', token, options).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update profile (Skills & Resume)
// @route   PUT /api/auth/profile/update
exports.updateProfile = async (req, res) => {
    try {
        const { bio, skills } = req.body;
        let updateData = { bio };

        if (skills) {
            updateData.skills = skills.split(',').map(s => s.trim());
        }

        if (req.file) {
            updateData.resume = `/uploads/${req.file.filename}`;
        }

        const user = await User.findByIdAndUpdate(req.user._id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Logout user
// @route   GET /api/auth/logout
exports.logout = async (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ success: true, message: "Logged out" });
};