const express = require('express');
const { createServer } = require('node:http');
const cors = require('cors');

const PORT = 4000
const app = express();
const http = require('http').Server(app);
const server =  createServer(app);

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user just connected`);
    socket.on('disconnect', () => {
        console.log(`${socket.id} user just disconnected`);
    });
});


app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

