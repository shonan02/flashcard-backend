const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
})

module.exports = mongoose.model('Flashcard', schema);