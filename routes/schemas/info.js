const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
        unique: true
    },
    cv: {
        type: String,
        required: true,
        unique: true
    }
})
const infoModel = mongoose.model('personalInfo', infoSchema);
module.exports = infoModel;