const User = require('../models/User')

const updateRoles = async (req, res) => {
    const {id, update} = req.body;
    if(!id || !update) return res.status(400).json({"message" : "Id and update type is required!"});
    console.log(id)
    const foundUser = await User.findById(id).exec();
    if(!foundUser) return res.status(404).json({"message": "User does not exist"})
    console.log(foundUser);
    if(update === "makeAdmin"){
        foundUser.roles = { USER: 2004, ADMIN: 1987 }
        await foundUser.save()
    }
    if(update === "removeAdmin"){
        foundUser.roles = { USER: 2004, ADMIN: null }
        await foundUser.save()
    }
    const newUsers = await User.find().lean().exec();
    res.status(200).json({newUsers})
}

module.exports = {updateRoles};