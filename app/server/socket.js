const socketIO = require('socket.io');

const setupSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    let users = []; // this will hold a local copy of the active users.

    io.on('connection', (socket) => {
        console.log(`${socket.id} user just connected`);

        socket.on('message', (data) => {
            io.emit('messageResponse', data);
        });

        socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

        socket.on('newUser', (data) => {
            users.push(data);
            io.emit('newUserResponse', users); // fixed typo here (was 'emnit')
        });

        socket.on('disconnect', () => {
            console.log(`${socket.id} user just disconnected`);
            users = users.filter((user) => user.socketID !== socket.id);
            io.emit('newUserResponse', users);
        });
    });

    return io;
};

module.exports = { setupSocket };
