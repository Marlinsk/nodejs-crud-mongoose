const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mythology: {
        type: String,
        default: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Posts', PostSchema);