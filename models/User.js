const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
});

userSchema.pre('save', async function (next){
  if (!this.isModified('password')) return next();
  try{
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }catch(err){
    throw next(err);
  }
})

userSchema.methods.comparePassword = async function (candidatePassword){
  try{
    const isMatch = await bcrypt.compare(this.password, candidatePassword);
    return isMatch;
  }catch(err){
    throw err;
  }
}

const User = mongoose.model('User', userSchema);
module.exports = User;