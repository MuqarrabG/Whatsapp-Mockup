const express = require('express')
const cors = require("cors")
const DataBase = require("./DBapi")
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("build"))
app.use(DataBase)
const PORT = 3001

app.listen(PORT, () => {
  console.log('server running at http://localhost:', PORT);
});