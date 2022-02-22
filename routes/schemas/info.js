const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    image: String,
    cv: String
})
const infoModel = mongoose.model('personalInfo', infoSchema);
module.exports = infoModel;