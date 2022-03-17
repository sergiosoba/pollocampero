const mongoose = require('mongoose');
const User = mongoose.model('users');

const argon2i = require('argon2-ffi').argon2i;
const crypto = require('crypto');

module.exports = app => {

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

    app.post('/login', async (req, res) => {

        var reponse = {};

        const { rEmail, rPassword } = req.body;
        if (rEmail == null || rPassword == null) {
            reponse.code = 1;
            reponse.msg = "Invalid credentials";
            res.send(reponse);
            return;
        }

        var userAccount = await User.findOne({ email: rEmail });
        if (userAccount != null) {

            /*try {
                if (await argon2.verify("<big long hash>", "password")) {
                    // password match
                } else {
                    // password did not match
                }
            } catch (err) {
                // internal failure
            }*/

            argon2i.verify(userAccount.password, rPassword).then(async (success) => {
                if (success) {
                    userAccount.lastAuthentication = Date.now();
                    await userAccount.save();

                    console.log("Retrieving account...");

                    reponse.code = 0;
                    reponse.msg = "Account found";
                    reponse.data = userAccount;
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
    });

    app.post('/create', async (req, res) => {

        var reponse = {};

        const { rEmail, rPassword, rFirstName, rLastName } = req.body;
        if (rEmail == null || rPassword == null) {
            reponse.code = 1;
            reponse.msg = "Invalid credentials";
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
                    reponse.data = newAccount;
                    res.send(reponse);
                    return;
                });
            });
        } else {
            reponse.code = 1;
            reponse.msg = "Email is already taken";
            res.send(reponse);
        }
    });
}