const express = require('express');
const keys = require('./config/keys.js');
const bodyParser = require('body-parser'); // npm i body-parser --save

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); // app.use(bodyParser.json());

// Setup Database
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Setup models
require('./model/User');

// Setup routes
require('./routes/authentication')(app);

app.listen(keys.port, () => {
    console.log("Server has started at port: " + keys.port);
});