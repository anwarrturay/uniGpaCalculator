const User = require("../models/User");

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    const user = await User.findOne({
      resetToken: token,
      tokenExpiry: { $gt: Date.now() }
    });
  
    if (!user) return res.status(400).json({ message: 'Token is invalid or expired' });
  
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.tokenExpiry = undefined;
    await user.save();
  
    res.status(200).json({ message: 'Password reset successful' });
}

module.exports = resetPassword;