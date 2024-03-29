const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        requried: true,
        default: () => Date.now()
    },
    company: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Company',
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'wysłane'
    }
});

module.exports = mongoose.model('Report', reportSchema);