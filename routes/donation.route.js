const express = require('express');

const router = express.Router();

// Import user controller
const donationController = require('../controllers/donation.controllers')

// Define routes
router.post('/add', donationController.createDonation);
router.get('/all/:userId', donationController.listDonations);
router.post('/request', donationController.requestPickup);
router.post('/approve', donationController.confirmDonationReceipt);

module.exports = router;