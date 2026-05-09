const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const connectDB = async () => {
        const uri = process.env.MONGODB_URI;   
     try{
       if(!uri) {
         throw new Error('MONGODB_URI is missing as an environment variable'); 
       }
       await mongoose.connect(uri);
     console.log('Database connected sucessfully');
     } catch(err){
       console.log('Database connection failed :', err.message);
       process.exit(1); 
     }    
}
module.exports = connectDB;