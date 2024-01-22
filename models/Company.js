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
    // sentReports: [
    //     {
    //         type: mongoose.SchemaTypes.ObjectId,
    //         ref: 'Report'
    //     }
    // ]
    //email, password
});

module.exports = mongoose.model('Company', companySchema);