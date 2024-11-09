const express = require('express');

const router = express.Router();

// Import user controller
const foodController = require('../controllers/food.controllers')

// Define routes
router.post('/add', foodController.addFoodItem);
router.get('/all', foodController.getFoodInventory);
router.delete('/delete/:id', foodController.deleteFoodItem);

module.exports = router;