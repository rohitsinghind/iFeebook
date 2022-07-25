const express = require('express')
var cors = require('cors')
const path = require("path");
const { connectDatabase } = require("./config/database");
const PORT = 4000;

connectDatabase();

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1/auth',require('./routes/auth'))
app.use('/api/v1/students',require('./routes/students'))

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });