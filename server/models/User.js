const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
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
    isNewUser: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    },
    roles: {
        USER: {
            type:Number,
            default: 2004
        },
        ADMIN: {
            type: Number,
            default: null
        }
    },
    resetToken: {
        type: String,
        required: false,
        default: null
    },
    tokenExpiry:{
        type: Date,
        required: false,
        default: null
    },
    refreshToken: { type: String }
})

module.exports = mongoose.model("User", User);