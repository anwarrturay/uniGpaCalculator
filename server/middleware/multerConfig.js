const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure disk storage (store files in "uploads/" folder)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Saving to path:', uploadDir); // Debugging the path
        cb(null, uploadDir); // Save images in "uploads" directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// File filter (accept images only)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};

// Initialize multer
const upload = multer({
    storage, // Use diskStorage
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter
});

module.exports = upload;