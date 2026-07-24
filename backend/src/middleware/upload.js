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

// 2. File Filter: allow PDF for resumes and Images for profile pics
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and Image (JPEG/PNG) files are allowed!'), false);
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