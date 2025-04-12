const mongoose = require('mongoose');
const {Schema} = mongoose;

const ModuleSchema = new Schema({
    module_name: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true
    }
})

const ScoreSchema = new Schema({
    totalGrade: {
        type: Number,
        required: true
    },
    gpa: {
        type: String,
        required: true
    }
})

const ResultHistorySchema = new Schema({
    level: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['semester1', 'semester2', 'both'],
        required: true
    },
    semester1Modules: [ModuleSchema],
    semester1Score: ScoreSchema,
    semester2Modules: [ModuleSchema],
    semester2Score: ScoreSchema,
    bothSemestersScore: ScoreSchema
}, {
    timestamps: true
})

module.exports = mongoose.model('ResultHistory', ResultHistorySchema)