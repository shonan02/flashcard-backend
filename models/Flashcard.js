const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    Prompt: {
        type: String,
        required: true
    },
    Definition: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Flashcard', schema);