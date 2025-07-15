const express = require('express');
const mongoose = require("./db");
require("dotenv").config();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res)=>{
  res.end('Hey Welcome to our Book Store!');
})

app.use(authRoutes);
app.use('/books', bookRoutes);

app.listen(3000, ()=>{
  console.log("Server started on port 3000");
})