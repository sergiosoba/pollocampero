const mongoose = require('mongoose');
const User = require('../model/User'); // const User = mongoose.model('users');

const argon2i = require('argon2-ffi').argon2i;
const crypto = require('crypto');

const passwordRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,24})");

exports.index = (req, res) => {
    res.send("Hello World");
}

exports.test = (req, res) => {

    var dummyData = {
        "id": req.params["id"],
        "username": "Sergiosoba",
        "level": 5
    }

    // JSON
    res.json(dummyData);
    //res.send(dummyData.username);
}

exports.saveUser = async (req, res) => {
    console.log("save");

    let user = User(req.body);
    try {
        const nuevoUsuario = await user.save();
        return res.status(201).json({
            mensajes: "ok"
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.list = async (req, res) => {
    try {
        const userList = await User.find();
        return res.status(201).json({
            userList
        });
    } catch (error) {
        return res.status(500);
    }
}

exports.login = async (req, res) => {
    console.log("login");

    var reponse = {};
    const { rEmail, rPassword } = req.body;

    if (rEmail == null || !passwordRegex.test(rPassword)) {
        reponse.code = 1;
        reponse.msg = "Invalid credentials";
        res.send(reponse);
        return;
    }

    var userAccount = await User.findOne({ email: rEmail }, 'password firstName lastName');
    if (userAccount != null) {

        argon2i.verify(userAccount.password, rPassword).then(async (success) => {
            if (success) {
                userAccount.lastAuthentication = Date.now();
                await userAccount.save();

                console.log("Retrieving account...");

                reponse.code = 0;
                reponse.msg = "Account found";
                reponse.data = (({ firstName, lastName }) => ({ firstName, lastName }))(userAccount); //userAccount;
                res.send(reponse);
                return;
            }
            else {
                reponse.code = 1;
                reponse.msg = "Invalid credentials";
                res.send(reponse);
                return;
            }
        });
    } else {
        reponse.code = 1;
        reponse.msg = "Invalid credentials";
        res.send(reponse);
        return;
    }
}

exports.create = async (req, res) => {

    var reponse = {};
    const { rEmail, rPassword, rFirstName, rLastName } = req.body;

    if (rEmail == null) {
        reponse.code = 1;
        reponse.msg = "Invalid credentials";
        res.send(reponse);
        return;
    }

    if (!passwordRegex.test(rPassword)) {
        reponse.code = 1;
        reponse.msg = "Unsafe password";
        res.send(reponse);
        return;
    }

    var userAccount = await User.findOne({ email: rEmail });
    if (userAccount == null) {
        console.log("Create new account...");

        crypto.randomBytes(32, function (err, salt) {
            argon2i.hash(rPassword, salt).then(async (hash) => {

                var newAccount = new User({
                    email: rEmail,
                    password: hash,
                    salt: salt,

                    firstName: rFirstName,
                    lastName: rLastName,

                    lastAuthentication: Date.now()
                });

                await newAccount.save();

                reponse.code = 0;
                reponse.msg = "Account created";
                reponse.data = (({ firstName, lastName }) => ({ firstName, lastName }))(newAccount);
                res.send(reponse);
                return;
            });
        });
    } else {
        reponse.code = 1;
        reponse.msg = "Email is already taken";
        res.send(reponse);
    }
}