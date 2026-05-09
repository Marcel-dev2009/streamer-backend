const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');
const routes = require('./route/AuthRoutes')
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(express.json()); //To parse incoming json requests;
app.use(express.urlencoded({extended : true}));
app.use(cors({
   origin : "http://localhost:5173",
   credentials : true       
}));
app.use('/api/auth' , routes);
app.get('/' , (req , res) => {
    res.send('Muse Streamer Backend is live and running');
})
const PORT = process.env.PORT || 5000 ;

connectDB().then(() =>{
  app.listen(PORT , () => {
     console.log(`app is live and running at http://localhost ${PORT}`)      
  })
})
