const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const {token} = req?.params
    console.log("Token:", token)
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'student ID and password are required.' });

    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401);

    if(token){
        foundUser.isVerified = true;
    }

    // Only verified can be able to access the system.
    if(foundUser.isVerified === true){
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            const roles = Object.values(foundUser.roles).filter(Boolean);
            const accessToken = jwt.sign(
                {
                    "userId": foundUser._id,
                    "email": email,
                    "roles": roles,
                    "isNewUser": foundUser.isNewUser
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            const refreshToken = jwt.sign(
                { "email": foundUser.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            console.log(result);
    
            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, SameSite: "None", Secure: true, maxAge: 24 * 60 * 60 * 1000 });
    
            res.status(200).json({ roles, accessToken });
    
        } else {
            res.sendStatus(401);
        }
    }else{
        res.sendStatus(404);
    }
}

module.exports = { handleLogin };