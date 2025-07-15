const express = require('express');
const mongoose = require("./db");
require("dotenv").config();
const app = express();

app.get('/', (req, res)=>{
  res.end('Hey Welcome to our Book Store!');
})

app.listen(3000, ()=>{
  console.log("Server started on port 3000");
})