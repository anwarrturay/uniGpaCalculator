const mongoose = require("mongoose");
const { Schema } = mongoose;

const semesterGpaSchema = new Schema({
    semester: {
        type: Number,
        required: true,
        unique: true
    },
    gpa: {
        type: Float,
        required: true
    },
})

module.exports = mongoose.model("semester_gpa", semesterGpaSchema);