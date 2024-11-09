const express = require('express');

const router = express.Router();

// Import user controller
const foodBankController = require('../controllers/foodBank.controllers');

// Define routes
router.post('/register', foodBankController.registerFoodBank);
router.post('/login', foodBankController.loginFoodBank);
router.get('/profile', foodBankController.getFoodBankProfile);

module.exports = router;