const multer = require('multer');
const path = require('path');

// 1. Storage Setting: File kahan aur kis naam se save hogi?
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 'uploads' naam ka folder root mein hona chahiye
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// 2. File Filter: Sirf PDF allow karenge
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 } // Max 2MB
});

// Ensure 'uploads' folder exists

const fs = require('fs');

// Folder path check karein
const uploadDir = 'uploads';

// Agar folder nahi hai, toh usey bana do
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

module.exports = upload;