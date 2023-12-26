const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Flashcard'
        }
    ],
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }
})

module.exports = mongoose.model('Set', schema);