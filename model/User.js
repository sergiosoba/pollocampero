const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    email: String,
    password: String,

    firstName: String,
    lastName: String,

    lastAuthentication: Date
});

mongoose.model('users', accountSchema); 