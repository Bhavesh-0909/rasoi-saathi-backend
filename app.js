const express = require('express');
const app = express();

//configure
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const foodRoutes = require('./routes/food.route');
const donationRoutes = require('./routes/donation.route');
const userRoutes = require('./routes/user.route');
const foodBankRoutes = require('./routes/foodbank.route');

//use routes
app.use('api/v1/food', foodRoutes);
app.use('api/v1/donation', donationRoutes);
app.use('api/v1/user', userRoutes);
app.use('api/v1/foodbank', foodBankRoutes);

module.exports = app;