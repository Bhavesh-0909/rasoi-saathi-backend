const Donation = require('../models/donation.model');
const User = require('../models/user.model');
const FoodBank = require('../models/foodBank.model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Create a new donation listing
exports.createDonation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { amountOfFood, userId } = req.body;

    // Ensure the user is authenticated
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const donation = new Donation({
      amountOfFood,
      user: user._id,
    });

    await donation.save();
    user.donations.push(donation._id);
    await user.save();

    res.status(201).json({ message: 'Donation created successfully', donation });
  } catch (error) {
    res.status(500).json({ message: 'Error creating donation', error });
  }
};

// List donations available for food banks
exports.listDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('user', 'name location contact').exec();
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error listing donations', error });
  }
};

// Food bank requests pickup for a donation
exports.requestPickup = async (req, res) => {
  try {
    const { foodBankId, donationId } = req.body;

    // Verify the food bank exists and is verified
    const foodBank = await FoodBank.findById(foodBankId);
    if (!foodBank || !foodBank.isVerified) return res.status(403).json({ message: 'Food Bank not verified' });

    // Update donation to mark pickup request
    const donation = await Donation.findById(donationId);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    donation.requestedBy = foodBank._id;
    donation.status = 'Pickup Requested';
    await donation.save();

    res.status(200).json({ message: 'Pickup requested', donation });
  } catch (error) {
    res.status(500).json({ message: 'Error requesting pickup', error });
  }
};

// Food bank confirms drop-off or pickup arrangement
exports.confirmDonationReceipt = async (req, res) => {
  try {
    const { foodBankId, donationId } = req.body;

    // Ensure food bank exists and is verified
    const foodBank = await FoodBank.findById(foodBankId);
    if (!foodBank || !foodBank.isVerified) return res.status(403).json({ message: 'Food Bank not verified' });

    const donation = await Donation.findById(donationId);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    donation.status = 'Completed';
    donation.receivedBy = foodBank._id;
    await donation.save();

    foodBank.donationsGot.push(donation._id);
    await foodBank.save();

    res.status(200).json({ message: 'Donation received successfully', donation });
  } catch (error) {
    res.status(500).json({ message: 'Error confirming donation receipt', error });
  }
};
