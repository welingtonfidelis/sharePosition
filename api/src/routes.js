const express = require('express');
const routes = express.Router();

routes.get('/test', (req, res) => {
    res.send({message: 'Hello world!'});
});

routes.post('/change-position/:room', (req, res) => {
    const { room } = req.params;
    const { latitude, longitude } = req.body;
    const { io } = req;

    io.to(room).emit('changePosition', { latitude, longitude });

    res.send({ ok: true });
});

module.exports = routes;