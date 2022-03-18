const express = require('express');
const router = express.Router();
const userContoller = require('../controllers/userController');

module.exports = () => {
    router.post('/users', userContoller.saveUser);
    return router;
}