// To connect my auth controllers to my express route
const express = require('express');
const {signup , login , updateProfile} = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware')
const router = express.Router();
// Auth Routes
router.post('/signup' , signup);
router.post('/login', login);
router.patch('/profile' ,  protect , updateProfile );
module.exports =  router; 