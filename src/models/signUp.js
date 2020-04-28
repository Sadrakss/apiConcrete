const mongoose = require('mongoose')

const SignUpSchema = new mongoose.Schema({
  id:{
    type:String,
    required:true
  },
  name: String,
  email: String,
  password: String,
  createDate:{
    type:Date,
    require:true,
    default:Date.now
  },
  lastUpdate:{
    type:Date,
    require:true,
    default:Date.now
  },
  lastLogin:{
    type:Date,
    require:true,
    default:Date.now
  },
  phone:[{
    number:String,
    ddd: String,
  }]
});
module.exports = mongoose.model('SignUp', SignUpSchema);
