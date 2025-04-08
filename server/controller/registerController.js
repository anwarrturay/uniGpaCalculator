const User = require("../models/User");
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { firstname, lastname, email, idNumber, password, department, level } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image upload is required" });
    }
    if (!firstname || !lastname || !email || !idNumber || !password || !department || !level) {
      return res.status(400).json({ message: "All fields, including an image, are required." });
    }
    
    // Check for duplicate email or ID number
    const duplicateEmail = await User.findOne({ email }).exec();
    const duplicateIdNumber = await User.findOne({ idNumber }).exec();
    if (duplicateEmail || duplicateIdNumber) {
      return res.status(409).json({ message: "Email or ID number already exists" });
    }

    try {
        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = new User({ 
            firstname,
            lastname, 
            email,
            idNumber,
            password: hashedPwd,
            department,
            level, 
            image: `/uploads/${req.file.filename}`
        });

        const result = await newUser.save();
        console.log("New user created:", result);

        res.status(201).json({ success: `New user ${firstname} ${lastname} created!` });
    } catch (err) {
      console.error("Error in creating a new user:", err);
      res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewUser };