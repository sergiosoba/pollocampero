const express = require('express');
const router = express.Router();
const userContoller = require('../controllers/userController');
const gameDataContoller = require('../controllers/gameDataController');

module.exports = () => {
    router.get('/', userContoller.index);
    router.get('/test/:id', userContoller.test);

    router.get('/list', userContoller.list);
    router.post('/login', userContoller.login);
    router.post('/create', userContoller.create);

    router.post('/addData', gameDataContoller.addData);
    return router;
}