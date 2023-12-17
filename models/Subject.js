const mongoose = require('mongoose');

const schema = new mongoose.schema({
    name: {
       type: String,
       required: true 
    }
})


module.exports = mongoose.model('Subject', schema);