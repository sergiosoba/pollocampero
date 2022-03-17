const mongoose = require('mongoose');
const User = mongoose.model('users');

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

        const { rEmail, rPassword } = req.body;
        if (rEmail == null || rPassword == null) {
            res.send('Invalid credentials');
            return;
        }

        var userAccount = await User.findOne({ email: rEmail });
        if (userAccount != null) {
            if (rPassword == userAccount.password) {

                userAccount.lastAuthentication = Date.now();
                await userAccount.save();

                console.log("Retrieving account...");
                res.send(userAccount);
                return;
            }
        }

        res.send('Invalid credentials');
        return;
    });

    app.post('/create', async (req, res) => {

        const { rEmail, rPassword, rFirstName, rLastName } = req.body;
        if (rEmail == null || rPassword == null) {
            res.send('Invalid credentials');
            return;
        }

        var userAccount = await User.findOne({ email: rEmail });
        if (userAccount == null) {
            console.log("Create new account...");

            var newAccount = new User({
                email: rEmail,
                password: rPassword,

                firstName: rFirstName,
                lastName: rLastName,

                lastAuthentication: Date.now()
            });

            await newAccount.save();

            res.send(newAccount);
            return;
        } else {
            res.send('Email is already taken');
        }
    });
}