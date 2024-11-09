const express = require('express');

const router = express.Router();

// Import user controller
const userController = require('../controllers/user.controllers');

// Define routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userController.getUserProfile);

module.exports = router;