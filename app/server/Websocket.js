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
const baseURL = isProduction ? "/api/" : "https://hi-five-limited.onrender.com/api/";

let users = []; // this will hold a local copy of the active users.

io.on("connection", (socket) => {
  console.log(`${socket.id} user just connected`);

  socket.on("message", async (data) => {
    console.log(data);
    io.to(data.chatId).emit("messageResponse", data); // Sends message to correct users/group chat.

    try {
      await axios.post(`${baseURL}groups/${data.chatId}/post`, data.newMessage); // Gets particular group chat/user to send messages over.
      console.log("Message stored successfully");
    } catch (error) {
      console.error("Error storing the message: ", error);
    }
  });
  socket.on("join_chat", (data) => { // Joins the particular group chat/user joined before.
    console.log("Joined chat", data);
    socket.join(data); 
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data)); // Emits when a user is typing over the socket server.

  socket.on("newUser", (data) => {
    users.push(data); // Addes new user to the list of active users.
    socket.emit("newUserResponse", users); // Handles when a new user logs into the app and connects to the socket server.
  });

  socket.on("disconnect", () => {
    // Handles when a user closes the application and disconnects from the socket server.
    console.log(`${socket.id} user just disconnected`);
    users = users.filter((user) => user.socketID !== socket.id); // Removes user from the active users list.
    socket.emit("newUserResponse", users);
  });

  socket.on("new_chat", () => { 
    // Create a new chat (or group chat) over web socket so when a new group displays on the users screen they do not
    // have to reload.
    console.log("New Chat created")
    socket.broadcast.emit("new_chat_event");
  })
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Socket server is listening at port ${PORT}`);
});
