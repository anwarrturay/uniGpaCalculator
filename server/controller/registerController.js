const Registration = require("../models/Registration");
const bcrypt = require('bcrypt');
const multer = require("multer");

// Multer configuration to store images in memory instead of saving to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

const handleNewUser = async (req, res) => {
    const { firstname, lastname, email, idNumber, password, department, level } = req.body;
    console.log("Uploaded image:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "Image upload is required" });
    }
    if (!firstname || !lastname || !email || !idNumber || !password || !department || !level) {
      return res.status(400).json({ message: "All fields, including an image, are required." });
    }
    
    // Check for duplicate email or ID number
    const duplicateEmail = await Registration.findOne({ email }).exec();
    const duplicateIdNumber = await Registration.findOne({ idNumber }).exec();
    if (duplicateEmail || duplicateIdNumber) {
      return res.status(409).json({ message: "Email or ID number already exists" });
    }

    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Store user with image in MongoDB
        const newUser = new Registration({ 
            firstname,
            lastname, 
            email,
            idNumber,
            password: hashedPwd,
            department,
            level, 
            image: { data: req.file.buffer, contentType: req.file.mimetype }
        });

        const result = await newUser.save();
        console.log("New user created:", result);

        res.status(201).json({ success: `New user ${firstname} ${lastname} created!` });
    } catch (err) {
      console.error("Error in creating a new user:", err);
      res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewUser, upload };