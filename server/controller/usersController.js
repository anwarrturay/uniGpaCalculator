const User = require("../models/User");
const path = require("path");
const fs = require("fs")
const generateToken = require("./generateTokenController");
const sendEmail = require("../service/sendEmail");
const sendFeedBacks = require("../service/sendFeedBacks")
const cloudinary = require("../config/cloudinary");
const { v4: uuidv4 } = require("uuid");

const getUsers = async (req, res) =>{
    const users = await User.find();
    if(!users){
        return res.status(204).json({message: `No User found.`});
    }
    res.status(200).json(users);
}           
const getSpecificUser = async (req, res) =>{
    const { id } = req.params;
    if(!id) return res.sendStatus(404) // Not Found
    
    const user = await User.findById(id);
    if(!user){
        return res.status(204).json({message: `No User with ID: ${id} found.`});
    }
    res.status(200).json(user);
}

const updateUserDetails = async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(404).json({ message: "User ID not found" });
  
      const specificUser = await User.findById(id);
      if (!specificUser) return res.sendStatus(404);
  
      const { firstname, lastname, email, idNumber, department, level } = req.body;
  
      const newData = { firstname, lastname, email, idNumber, department, level };
  
      // If image file is uploaded
      if (req.file) {
        // Upload new image to Cloudinary
        const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "user_profiles",
          public_id: uuidv4()
        });
  
        // Clean up local file
        fs.unlinkSync(req.file.path);
  
        // Delete old Cloudinary image if you're storing the public_id
        if (specificUser.cloudinaryId) {
          await cloudinary.uploader.destroy(specificUser.cloudinaryId);
        }
  
        // Save the new Cloudinary image URL
        newData.image = cloudinaryResult.secure_url;
  
        // Optional: Save the public_id if you plan to delete old images in the future
        newData.cloudinaryId = cloudinaryResult.public_id;
      }
  
      const updatedUser = await User.findByIdAndUpdate(id, newData, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedUser) return res.sendStatus(400);
  
      res.status(200).json({ message: "User updated successfully", data: updatedUser });
    } catch (err) {
      console.error("Update Error:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
};

const forgotPassword = async (req, res)=>{
    console.log(req?.body?.email)
    try{
        const { email } = req.body;
        console.log("Found email: ", email)
        if(!email) return res.sendStatus(404);

        const foundUser = await User.findOne({ email }).exec();
        if(!foundUser) return res.status(404).json({message: "User with email Not Found"})

        const token = generateToken();
        console.log("TOKEN: ", token)

        foundUser.resetToken = token;
        foundUser.tokenExpiry = Date.now() + 3600000;
        // Saving the user with new resetToken and tokenExpiry date.
        const savedUser = await foundUser.save()

        console.log("Saved User", savedUser);

        const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

        await sendEmail(email, 'Password Reset', resetLink)

        res.status(200).json({ message: 'Password reset link sent to your email' });
    }catch(err){
        console.error("error: ", err)
    }
}

const isNewController = async (req, res) => {
    const {id} = req?.body;
    if(!id) return res.status(400).json({"message": "Id is required!"});
    const user = await User.findById(id).exec();
    if(!user) return res.status(404).json({"message": `User with id ${id} does not exist!`});
    user.isNewUser = false;
    const result = await user.save()
    res.status(200).json(result)
}

const contactUs = async (req, res)=>{
    try{
        const { issue, message, email } = req.body;
        if (!issue || !message || !email ) return res.status(404).json({message: 'All fields are required'});

        await sendFeedBacks(email, issue, message)
        res.status(200).json({message: "Feedback sent successfully"})
    }catch(err){
        console.error(err)
    }
}

module.exports = { getUsers, getSpecificUser, updateUserDetails, forgotPassword, isNewController, contactUs };
