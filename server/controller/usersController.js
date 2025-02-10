const Registration = require("../models/Registration")


const getSpecificUser = async (req, res) =>{
    if(!req?.params?.id) return res.status(400).json({message: "No user found"});
    
    const user = await Registration.findOne({_id: req.params.id});
    if(!user){
        return res.status(204).json({message: `No User with ID: ${req.params.id} found.`});
    }
    res.status(200).json(user);
}

module.exports = { getSpecificUser };