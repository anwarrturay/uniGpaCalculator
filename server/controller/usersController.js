const User = require("../models/User");
const path = require("path");
const fs = require("fs")

const getSpecificUser = async (req, res) =>{
    const { id } = req.params;
    if(!id) return res.sendStatus(404) // Not Found
    
    const user = await User.findById(id);
    if(!user){
        return res.status(204).json({message: `No User with ID: ${id} found.`});
    }
    res.status(200).json(user);
}

const updateUserDetails = async (req, res)=>{
    try{

        const { id } = req.params;
        if(!id) return res.status(404).json({message: "User Id Not found"});
    
        const specificUser = await User.findById(id);
        if(!specificUser) return res.sendStatus(404);
    
        const { firstname, lastname, email, idNumber, department, level } = req.body;
        // const hashedPwd = await bcrypt.hash(password, 10)
    
        const newData = {firstname, lastname, email, idNumber, department, level}
    
        if(req.file){
            if(specificUser?.image){
                const oldImagePath = path.join(__dirname, "..", "uploads", specificUser.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                newData.image = `/uploads/${req.file.filename}`
            }
        }
    
        const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true, runValidators: true })
        if(!updatedUser) return res.sendStatus(400);
    
        res.status(200).json({ message: "User updated successfully", data: updatedUser });
    }catch(err){
        console.error(err)
        return res.status(500).json({ message: "Server error", error: err.message });
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

// const getUserImage = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const user = await User.findById(id);
//         if (!user || !user.image) {
//             return res.status(404).json({ message: "Image not found" });
//         }
//         res.contentType(user.image.contentType);
//         res.send(user.image.data);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

module.exports = { getSpecificUser, updateUserDetails, isNewController };