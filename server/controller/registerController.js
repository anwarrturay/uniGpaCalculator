const User = require("../models/User");
const bcrypt = require('bcrypt');
const generateToken = require("./generateTokenController");
const verifyEmail = require("../service/verifyEmail");
const cloudinary = require("../config/cloudinary");
const { v4: uuidv4 } = require('uuid'); 

const handleNewUser = async (req, res) => {
  const { firstname, lastname, email, idNumber, password, department, level } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Image upload is required" });
  }

  if (!firstname || !lastname || !email || !idNumber || !password || !department || !level) {
    return res.status(400).json({ message: "All fields, including an image, are required." });
  }

  try {

    // setting up the cloudinary upload.
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_profiles",
      public_id: uuidv4(),
    });

    console.log(cloudinaryResult);

    const duplicateEmail = await User.findOne({ email }).exec();
    const duplicateIdNumber = await User.findOne({ idNumber }).exec();
    if (duplicateEmail || duplicateIdNumber) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      idNumber,
      password: hashedPwd,
      department,
      level,
      image: cloudinaryResult.secure_url,
      cloudinaryId: cloudinaryResult.public_id
    });

    // Generate email verification token
    const token = generateToken();
    const verificationLink = `${process.env.CLIENT_URL}/${token}`;
    await verifyEmail(email, "Verify Your Email", verificationLink);

    const result = await newUser.save();
    console.log("New user created:", result);

    res.status(201).json({
      success: `New user ${firstname} ${lastname} created!`,
      link: verificationLink
    });

  } catch (err) {
    console.error("Error in creating a new user:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
