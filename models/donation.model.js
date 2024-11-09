const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    amountOfFood: {
      type: Number,
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
      required: true
    },
    donatedAt: {
      type: Date,
      default: Date.now
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Donation', donationSchema);
  