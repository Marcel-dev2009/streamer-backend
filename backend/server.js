const connectDB = require('./config/db');
const dotenv = require('dotenv')
const express = require('express');
const cors = require('cors');
const routes = require('./route/AuthRoutes')
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors({
   origin : "http://localhost:5173",
    credentials : true      
}));
app.use('/api/auth' , routes)
app.get('' , (req , res) => {
   res.send('Muse Streamer backend is live and running')
});
const port = process.env.PORT || 5000
connectDB().then(() => {
   app.listen(port , () => {
        console.log(`app is live and running at localhost: ${port}`);  
   })
})