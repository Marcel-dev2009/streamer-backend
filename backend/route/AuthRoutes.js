// To connect my auth controllers to my express route
const express = require('express')
const {signup , login} = require('../controllers/authController');
const router = express.Router();
// Auth Routes
router.post('/signup' , signup);
router.post('/login', login);
module.exports =  router;