const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
dotenv.config();
const JWT = process.env.JWT_SECRET;
if(!JWT){
console.log('JWT secret is missing as an environment variable');
};
// signup 
const signup = async (req , res) => {
    try{
      const {firstname, lastname , email , password} = req.body;
      const existingUser = await User.findOne({ email });
      if(existingUser){
        return res.status(400).json({message : "user already exists"})  
      }
      const hashedPassword = await bcrypt.hash(password , 10);
      const user = await  User.create({
        firstname ,
        lastname, 
        email , 
        password : hashedPassword  
      });
      const token = jwt.sign(
        {id : user._id},
        JWT ,
        {expiresIn : "7d"}  
      );
      res.status(201).json({
         message : "user created sucessfully",
         user : {id : user._id ,  email:user.email},
         token
      })
      console.log("SIGNUP HIT");
       console.log(req.body);
    } catch(err){
      return res.status(500).json({error : err.message})
    }      
};
//login 
const login = async (req , res) => {
   try{
   const {email , password} = req.body;
   const user = await User.findOne({email})
   if(!user) {
  return res.status(400).json({message:"Invalid Credentials"}) 
 }
     const isPasswordValid = await  bcrypt.compare(password , user.password);
 if(!isPasswordValid) {
          return res.status(400).json({ message : "Wrong password"})
 }
    const token = jwt.sign({id :user._id} , JWT , {expiresIn : "7d"}) 
     res.status(200).json(
         {
           message : "Login Sucessful",
           user : {id : user._id ,  email:user.email},
           token
         } 
     );    
   } catch(err){
      return res.status(500).json({error : err.message})     
   }      
};
//saveProfileUrl

  const updateProfile = async (req , res) => {
  try{
     const {photoUrl , genres , artists} = req.body;
   const user = await User.findById(req.user);
   if(!user) {
    return res.status(404).json({
      message : "user not found"
    });
    console.log("user not found")
   }
    user.savedSelectedGenres = genres || user.savedSelectedGenres;
    user.savedSelectedArtists = artists || user.savedSelectedArtists;
    user.savedPhotoUrl = photoUrl || user.savedPhotoUrl;
    await user.save();
    res.status(200).json({
      message : "user updated successfully"
    });
    console.log("user update sucessfull")
  } catch(err){
    return res.status(500).json({error : err.message});
  }
 } 
module.exports = {signup , login , updateProfile};