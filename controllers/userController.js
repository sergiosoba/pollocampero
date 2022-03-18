const mongoose = require('mongoose');
const User = mongoose.model('users');

const argon2i = require('argon2-ffi').argon2i;
const crypto = require('crypto');

exports.saveUser = async (req, res) => {
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