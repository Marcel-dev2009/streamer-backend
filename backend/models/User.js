const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
   name : {
     type : String,
     required : true,     
   },
   email : {
     type : String, 
     required : [true , "Email is missing"],
     unique : true,
     lowercase : true,     
   },
   password : {
    type : String,
    required : [true , "Password is required"],
    minlength : 8,
    maxlenght : 10,
   },
   createdAt : {
     type : Date ,
     default : Date.now,     
   },
} , {timestamps : true});
const User = /* mongoose.models.User || */ mongoose.model("User" ,  UserSchema);
module.exports = User