const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameDataSchema = new Schema({
    name: String,
    time: String,
    errors: String
});

module.exports = mongoose.model('Games', gameDataSchema);