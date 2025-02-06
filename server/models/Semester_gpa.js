const mongoose = require("mongoose");
const { Schema } = mongoose;

const gpaRecordSchema = new Schema({
    semester: {
        type: String,
        required: true
    },
    module_name: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    creditHrs: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
 
})

module.exports = mongoose.model("gpaRecord", gpaRecordSchema);