const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    unique:true
  },
  password:{
    type:String
  },
  role:{
    type:String,
    enum: ['user', 'admin'],
    default:'user'
  }
})

const User = mongoose.model('User', userSchema);
module.exports = User;