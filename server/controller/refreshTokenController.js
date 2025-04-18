const User = require("../models/User");
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); 
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403); 
            const roles = Object.values(foundUser.roles);
            const userId = foundUser._id
            const {isNewUser} = foundUser
            const accessToken = jwt.sign(
                { 
                    "email": decoded.email,
                    "roles": roles,
                    "userId": userId,
                    "isNewUser": isNewUser
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5h' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }