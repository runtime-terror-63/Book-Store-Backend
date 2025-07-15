const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser:true,
  useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('connected', ()=>{
  console.log('MongoDB connected');
})

db.on('disconnected', ()=>{
  console.log('mongoDB disconnected');
})

db.on('error', (err)=>{
  console.log('MongoDB connection error ', err);
})

module.exports = db;