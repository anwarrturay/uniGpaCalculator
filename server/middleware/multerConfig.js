const multer = require("multer");

// Configure Multer to store images in memory as a buffer
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit image size to 10MB
});

module.exports = upload;
