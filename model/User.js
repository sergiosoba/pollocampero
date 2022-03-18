const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    email: String,
    password: String,
    salt: String,

    firstName: String,
    lastName: String,

    lastAuthentication: Date
});

module.exports = mongoose.model('users', accountSchema);