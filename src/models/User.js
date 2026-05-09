const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Password hash karne ke liye
const jwt = require('jsonwebtoken'); // Token generate karne ke liye

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Please add a name"] 
  },
  email: { 
    type: String, 
    required: [true, "Please add an email"], 
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: { 
    type: String, 
    required: [true, "Please add a password"],
    minlength: 6,
    select: false // Find query mein password hide rahega (Security)
  },
  role: { 
    type: String, 
    enum: ['student', 'company', 'admin'], 
    default: 'student' 
  },
  // Profile check karne ke liye flag
  profileFetched: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

// --- Pre-save middleware: Password ko hash karne ke liye ---
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// --- Method: JWT token generate karne ke liye ---
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// --- Method: Login ke waqt password match karne ke liye ---
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);