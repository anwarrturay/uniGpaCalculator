const User = require("../models/User");
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); 
    console.log("User cookie: ", cookies)

    const refreshToken = cookies.jwt;
    console.log("Refresh Token:", refreshToken);
    const foundUser = await User.findOne({ refreshToken }).exec();
    console.log("FoundUser: ",foundUser)
    if (!foundUser) return res.sendStatus(403); 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log("Decoded: ", decoded);
            if (err || foundUser.idNumber !== decoded.idNumber) return res.sendStatus(403); 
            const roles = Object.values(foundUser.roles);
            const userId = foundUser._id
            console.log(userId)
            const accessToken = jwt.sign(
                { 
                    "id": decoded.idNumber,
                    "roles": roles,
                    "userId": userId
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '5h' }
            );
            console.log("New accessToken: ", accessToken)
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }