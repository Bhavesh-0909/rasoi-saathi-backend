const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    foodType: {
      type: String,
      required: true
    },
    noOfPeopleFed: {
      type: Number,
      required: true
    },
    amountOfFood: {
      type: String,
      required: true
    },
    donatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoodBank',
    },
    donatedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      default: 'pending'
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Donation', donationSchema);
  