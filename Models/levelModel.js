const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    levelId: {
        type: Number,
        required: true,
        unique: true
    },

    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard']
    },

    type: {
        type: String,
        required: true,
        enum: ['boolean', 'multiple', 'input', 'code']
    },

    category: {
        type: String,
        required: true,
        enum: ['general', 'web', 'mobile', 'data', 'devops', 'security']
    },

    question: {
        type: String,
        required: true
    },

    answer: {
        type: String,
        required: true
    }
});

const levelModel = mongoose.model('Level', levelSchema);
module.exports = levelModel;