const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    nombre: {
        type: String,
        required: [true]
    },
    apellido: {
        type: String,
        required: [true]
    }
});

const userExport = mongoose.model('User', userSchema);
userExport.createIndexes();

module.exports = userExport;