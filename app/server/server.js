//require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const DataBase = require("./DBapi");
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(DataBase);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Use the PORT from environment variables if available, otherwise fallback to 3001
const PORT = process.env.PORT || 3001;

const axios = require("axios");
const isProduction = process.env.NODE_ENV === "production";
const baseURL = `http://localhost:${PORT}/api/`;
io.on("connection", (socket) => {
  console.log(`${socket.id} user just connected`);

  socket.on("message", async (data) => {
    console.log(data);
    io.to(data.chatId).emit("messageResponse", data);

    try {
      await axios.post(`${baseURL}groups/${data.chatId}/post`, data.newMessage);
      //console.log(baseURL)
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

  // socket.on("newUser", (data) => {
  //   users.push(data);
  //   socket.emit("newUserResponse", users); // fixed typo here (was 'emnit')
  // });

  // socket.on("disconnect", () => {
  //   console.log(`${socket.id} user just disconnected`);
  //   users = users.filter((user) => user.socketID !== socket.id);
  //   socket.emit("newUserResponse", users);
  // });

  socket.on("new_chat", () => {
    console.log("New Chat created")
    socket.broadcast.emit("new_chat_event");
  })
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

// Mongo connection code -> unused


//Routes
// const chatRouter = require("./routes/chat");
// app.use("/chats", chatRouter);
//const uri = process.env.MONGODB_URI_LOCAL;

// Check values before using them in your database connection
//console.log(`URI: ${uri}`);

//Database libraries
// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGODB_URI_LOCAL, {
//   dbName: "ChatDB",
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

// mongoose.connection.on("error", (err) => {
//   console.log("Mongoose Connection ERROR: " + err.message);
// });

// mongoose.connection.once("open", () => {
//   console.log("MongoDB Connected!");
// });