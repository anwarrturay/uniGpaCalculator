const Registration = require("../models/Registration");
const bcrypt = require('bcrypt');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Save uploaded files to the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
    console.log("Saving file:", file.filename);
    cb(null, file.filename)
  },
});

const upload = multer({ storage });

const handleNewUser = async (req, res) => {
    const { firstname, lastname, email, idNumber, password, department, level } = req.body;
    console.log("upload image", req.file)
    if (!req.file) {
      return res.status(400).json({ message: "Image upload is required" });
    }
    if (!firstname || !lastname || !email || !idNumber || !password || !department || !level || !req.file) return res.status(400).json({ 'message': 'All fields, including an image is required.' });
    // check for duplicate usernames in the db
    const duplicate = await Registration.findOne({email: email}).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        //store the new user
        const newUser = new Registration({ 
            "firstname": firstname,
            "lastname": lastname, 
            "email": email,
            "idNumber": idNumber,
            "password": hashedPwd,
            "department": department,
            "level": level, 
            "image": req.file.path, 
        });
        console.log("Saved file path:", req.file.path);
        const result = await newUser.save();
        console.log(result);
        res.status(201).json({ 'success': `New user ${firstname}/t${lastname} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser, upload };