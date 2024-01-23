const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String
    },
    phone: Number,
    //email, password
});

module.exports = mongoose.model('Company', companySchema);