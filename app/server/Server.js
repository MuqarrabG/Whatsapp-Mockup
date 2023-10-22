require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const DataBase = require("./DBapi");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(DataBase);

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

//Routes
const chatRouter = require("./routes/chat");
app.use("/chats", chatRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log("server running at http://localhost:", PORT);
});
