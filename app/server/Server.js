//require("dotenv").config({ path: "./.env" });

const express = require("express");
const http = require("http");
const cors = require("cors");
const DataBase = require("./DBapi");
const setupSocket = require("./socket"); // import the Socket.IO setup function

const app = express();
const server = http.createServer(app); // create an HTTP server instance

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(DataBase);

// Use the PORT from environment variables if available, otherwise fallback to 3001
const PORT = process.env.PORT || 3001;

// Set up Socket.IO
const io = setupSocket(server); // Pass the HTTP server instance to your setup function

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

// ... rest of your server logic ...


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