const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const axios = require("axios");
const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction ? "/api/" : "http://10.126.111.73:3001/api/";

let users = []; // this will hold a local copy of the active users.

io.on("connection", (socket) => {
  console.log(`${socket.id} user just connected`);

  socket.on("message", async (data) => {
    console.log(data);
    io.to(data.chatId).emit("messageResponse", data);

    try {
      await axios.post(`${baseURL}groups/${data.chatId}/post`, data.newMessage);
      console.log("Message stored successfully");
    } catch (error) {
      console.error("Error storing the message: ", error);
    }
  });
  socket.on("join_chat", (data) => {
    console.log("Joined chat", data);
    socket.join(data);
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  socket.on("newUser", (data) => {
    users.push(data);
    socket.emit("newUserResponse", users); // fixed typo here (was 'emnit')
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} user just disconnected`);
    users = users.filter((user) => user.socketID !== socket.id);
    socket.emit("newUserResponse", users);
  });

  socket.on("new_chat", () => {
    console.log("New Chat created")
    io.emit("new_chat_event");
  })
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Socket server is listening at port ${PORT}`);
});
