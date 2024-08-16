const mongoose = require('mongoose');
const schema = mongoose.Schema;
const postSchema = new schema({
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        CreatedAt: {
            type: Date,
            default: Date.now
        },
        UpdatedAt: {
            type: Date,
            default: Date.now
        }
});


module.exports = mongoose.model('Post', postSchema);