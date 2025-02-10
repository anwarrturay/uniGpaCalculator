const Registration = require('../models/Registration');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { idNumber, password } = req.body;
    if (!idNumber || !password) return res.status(400).json({ 'message': 'student ID and password are required.' });

    const foundUser = await Registration.findOne({ idNumber: idNumber }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized.
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            {
                "userId": foundUser._id,
                "idNumber": idNumber
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { "idNumber": foundUser.idNumber },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user authorization header in the web browser.
        res.json({ accessToken });

    } else {
        res.sendStatus(401); // Unauthorised
    }
}

module.exports = { handleLogin };