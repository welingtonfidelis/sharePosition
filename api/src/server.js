const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');

const app = express();
const port = 3001;
const routes = require('./routes');

// require('dotenv/config');

const listener = app.listen(process.env.PORT || port, function () {
    console.log(`Server running in ${port}\n`);
});

const io = socketio.listen(listener);

io.on('connection', socket => {
    const { room } = socket.handshake.query;

    socket.join(room);

    console.log(`Socket ${socket.id} connected in ${room}`);
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

//Aceita dados do tipo json
app.use(express.json());

//permite acesso à api de qualquer dominio 
app.use(cors());

//roteamento
app.use(routes);
