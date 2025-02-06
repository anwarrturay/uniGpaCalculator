const mongoose = require("mongoose");
const { Schema } = mongoose;

const RegistrationSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    idNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model("Registration", RegistrationSchema);