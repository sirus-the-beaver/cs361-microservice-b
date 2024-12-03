const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    dietaryRestrictions: {
        type: [String],
        default: []
    },
    allergies: {
        type: [String],
        default: []
    },
});

module.exports = mongoose.model('Preference', preferenceSchema);