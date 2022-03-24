const mongoose = require('mongoose');
const GameData = require('../model/GameData');

exports.addData = async (req, res) => {

    let gameData = GameData(req.body);
    try {
        const newData = await gameData.save();
        return res.status(201).json({
            mensajes: "ok"
        });
    } catch (error) {
        return res.status(500).json(error);
    }

    /*var reponse = {};
    const { rEmail, rKey, rValue } = req.body;

    if (rEmail == null) {
        reponse.code = 1;
        reponse.msg = "Invalid credentials";
        res.send(reponse);
        return;
    }

    const filter = { email: rEmail };
    const update = { $set: { gameData: rValue } };

    await User.updateOne(filter, update, { multi: true }, function (err, numberAffected) { });
    const doc = await User.findOne();
    if (doc != null) {
        reponse.code = 0;
        reponse.msg = "Success";
        reponse.data = doc;
        res.send(reponse);
    } else {
        reponse.code = 1;
        reponse.msg = "No user";
        res.send(reponse);
    }*/
}