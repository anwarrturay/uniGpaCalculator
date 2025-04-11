const User = require("../models/User");
const bcrypt = require("bcrypt");
const resetPassword = async (req, res) => {
    const { token } = req.params;
    if(!token) return res.status(404).json({message: "Token not Found"})
    const { password } = req.body;
    if(!password) return res.status(404).json({message: "Password is required"});
  
    const user = await User.findOne({
      resetToken: token,
      tokenExpiry: { $gt: Date.now() }
    });
    console.log("Found User: ", user)
  
    if (!user) return res.status(400).json({ message: 'Token is invalid or expired' });
  
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.tokenExpiry = undefined;
    await user.save();
  
    res.status(200).json({ message: 'Password reset successful' });
}

module.exports = resetPassword;