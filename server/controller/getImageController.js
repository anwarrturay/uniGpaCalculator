const Registration = require("../models/Registration")

const getUserImage = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Registration.findById(id);
        if (!user || !user.image) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.contentType(user.image.contentType);
        res.send(user.image.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getUserImage };
