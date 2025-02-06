const Registration = require("../models/Registration");
const bcrypt = require('bcrypt');
const handleNewUser = async (req, res) => {
    const { firstname, lastname, email, idNumber, password, department, level } = req.body;
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
            "image": {
                data: req.file.buffer, // Store image as binary data
                contentType: req.file.mimetype, // Store image type (e.g., "image/png")
            }, 
        });
        const result = await newUser.save();
        console.log(result);
        res.status(201).json({ 'success': `New user ${firstname}/t${lastname} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };