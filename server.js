var express = require("express");
const bodyParser = require('body-parser');
const User = require('./user');
var mongoose = require('mongoose');


var app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://sergiosoba:Q1oUW7NajEZkvjJQ@cluster0.0dwxx.mongodb.net/pollocampero', { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.get("/user/:id", (req, res) => {

    var dummyData = {
        "id": req.params["id"],
        "username": "Sergiosoba",
        "level": 5
    }

    // JSON
    res.json(dummyData);
    //res.send(dummyData.username);
})

app.post('/user', async (req, res) => {
    let user = User(req.body);
    try {
        const nuevoUsuario = await user.save();
        return res.status(201).json({
            mensajes: "ok"
        });
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.get('/users', async (req, res) => {
    try {
        const userList = await User.find();
        return res.status(201).json({
            userList
        });
    } catch (error) {
        return res.status(500);
    }
});

app.listen(process.env.PORT || 5555, () => {
    console.log("Server has started!");
});