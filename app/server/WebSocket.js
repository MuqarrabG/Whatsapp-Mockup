const express = require('express')
const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = []; //this will hold a local copy of the actives users gathered from socket.io.

socketIO.on('connection', (socket) => {
    console.log(`${socket.id} user just connected`); // shows when a user connects to the socket server.

    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data); // emits message via socket.io server.
    });

    socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

    socket.on('newUser', (data) => {
        users.push(data); // add now active user to local user list.
        socketIO.emnit('newUserResponse', users);
    });

    socket.on('disconnect', () => {
        console.log(`${socket.id} user just disconnected`);
        users = users.filter((user) => user.socketID !== socket.id); //removes now non-active user from local user list.
        socketIO.emit('newUserResponse', users);
        socket.disconnect();
    });
});

http.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})