const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    level: {
        type: Number,
        required: true,
        default: 1
    },

    streak: {
        type: Number,
        required: true,
        default: 0
    },

    bestStreak: {
        type: Number,
        required: true,
        default: 0
    },

});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;