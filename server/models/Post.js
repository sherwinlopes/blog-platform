const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Anonymous' },
    created: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Post', PostSchema);