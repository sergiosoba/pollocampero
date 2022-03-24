const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    email: String,
    password: String,
    salt: String,

    firstName: String,
    lastName: String,

    gameData: [{
        type: Schema.Types.ObjectId,
        ref: 'Games'
    }],

    lastAuthentication: Date
});

module.exports = mongoose.model('Users', accountSchema);